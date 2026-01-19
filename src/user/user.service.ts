import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';

import { UserRepository } from './repository/user.repository';
import { SignUpSchema } from './dto/user.dto';
import { ERROR_MESSAGES, MESSAGES } from 'src/constant/string';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { SUPABASE_CLIENT } from '../core/provider/supabase.provider';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
    @Inject(SUPABASE_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async signup(
    payload: SignUpSchema,
    businessLogo?: Express.Multer.File,
    backgroundImage?: Express.Multer.File,
  ) {
    const email = payload.email.toLowerCase().trim();

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGES.EMAIL_EXISTS);
    }

    const trustedSeller = String(payload.trusted_seller) === 'true';
    const freeAdUsed = String(payload.free_ad_used) === 'true';

    let businessLogoUrl: string | undefined;
    let backgroundImageUrl: string | undefined;

    const bucket = 'auto-cart';

    if (businessLogo) {
      const filePath = `business-logo/${Date.now()}-${businessLogo.originalname}`;

      const { error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, businessLogo.buffer, {
          contentType: businessLogo.mimetype,
          upsert: true,
        });

      if (error) throw new BadRequestException(error.message);

      const { data } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      businessLogoUrl = data.publicUrl;
    }

    if (backgroundImage) {
      const filePath = `background-image/${Date.now()}-${backgroundImage.originalname}`;

      const { error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, backgroundImage.buffer, {
          contentType: backgroundImage.mimetype,
          upsert: true,
        });

      if (error) throw new BadRequestException(error.message);

      const { data } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      backgroundImageUrl = data.publicUrl;
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = this.userRepository.create({
      ...payload,
      email,
      trusted_seller: trustedSeller,
      free_ad_used: freeAdUsed,
      password: hashedPassword,
      business_logo_url: businessLogoUrl,
      background_image_url: backgroundImageUrl,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      message: MESSAGES.USER_CREATED,
      user: savedUser,
    };
  }
  async signin(email: string, password: string) {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await this.userRepository.findByEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const token = this.jwt.sign(
      {
        sub: user.id,
        email: user.email,
        type: 'ACCESS',
      },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '7d',
      },
    );

    const { password: _, ...safeUser } = user;

    return {
      message: MESSAGES.LOGIN_SUCCESS,
      token,
      user: safeUser,
    };
  }

  async sendOtp(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.userRepository.createOtp(normalizedEmail, otp);
    await this.mailService.sendOtpMail(normalizedEmail, otp);

    return {
      message: MESSAGES.OTP_SEND,
      email: normalizedEmail,
      expires_in_minutes: this.config.get<number>('OTP_EXPIRE_MINUTES', 5),
    };
  }

  async verifyOtp(email: string, otp: string | number) {
    const normalizedEmail = email.toLowerCase().trim();
    const inputOtp = String(otp);

    const record = await this.userRepository.findLatestOtp(normalizedEmail);
    if (!record) {
      throw new BadRequestException(ERROR_MESSAGES.OTP_NOT_FOUND);
    }

    if (record.otp !== inputOtp) {
      throw new BadRequestException(ERROR_MESSAGES.OTP_INVALID);
    }

    const createdAt = new Date(record.created_at).getTime();
    const expireMs =
      this.config.get<number>('OTP_EXPIRE_MINUTES', 5) * 60 * 1000;

    if (Date.now() - createdAt > expireMs) {
      throw new BadRequestException(ERROR_MESSAGES.OTP_EXPIRED);
    }

    await this.userRepository.markUsed(record.id);

    const resetToken = this.jwt.sign(
      {
        email: normalizedEmail,
        type: 'RESET_PASSWORD',
      },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      },
    );

    return {
      message: MESSAGES.OTP_VERIFIED,
      token: resetToken,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    let payload: any;

    try {
      payload = this.jwt.verify(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException(
        ERROR_MESSAGES.INVALI_RESETPASSWORD_TOKEN,
      );
    }

    if (payload.type !== 'RESET_PASSWORD') {
      throw new UnauthorizedException(
        ERROR_MESSAGES.INVALI_RESETPASSWORD_TOKEN,
      );
    }

    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    return {
      message: MESSAGES.PASSWORD_RESET_SUCCES,
    };
  }

  async updateUser(
    userId: string,
    updateDto: UpdateUserDto,
    businessLogo?: Express.Multer.File,
    backgroundImage?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const trustedSeller =
      updateDto.trusted_seller !== undefined
        ? String(updateDto.trusted_seller) === 'true'
        : user.trusted_seller;

    const freeAdUsed =
      updateDto.free_ad_used !== undefined
        ? String(updateDto.free_ad_used) === 'true'
        : user.free_ad_used;

    let businessLogoUrl = user.business_logo_url;
    let backgroundImageUrl = user.background_image_url;

    const bucket = 'auto-cart';

    if (businessLogo) {
      const filePath = `business-logo/${userId}-${Date.now()}-${businessLogo.originalname}`;
      const { error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, businessLogo.buffer, {
          contentType: businessLogo.mimetype,
          upsert: true,
        });
      if (error) throw new BadRequestException(error.message);

      businessLogoUrl = this.supabase.storage
        .from(bucket)
        .getPublicUrl(filePath).data.publicUrl;
    }

    if (backgroundImage) {
      const filePath = `background-image/${userId}-${Date.now()}-${backgroundImage.originalname}`;
      const { error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, backgroundImage.buffer, {
          contentType: backgroundImage.mimetype,
          upsert: true,
        });
      if (error) throw new BadRequestException(error.message);

      backgroundImageUrl = this.supabase.storage
        .from(bucket)
        .getPublicUrl(filePath).data.publicUrl;
    }

    if (updateDto.email) {
      updateDto.email = updateDto.email.toLowerCase().trim();
    }

    const { business_logo, background_image, ...safeUpdateDto } =
      updateDto as any;

    await this.userRepository.update(userId, {
      ...safeUpdateDto,
      trusted_seller: trustedSeller,
      free_ad_used: freeAdUsed,
      business_logo_url: businessLogoUrl,
      background_image_url: backgroundImageUrl,
    });

    return {
      message: MESSAGES.USER_UPDATE_SUCCESS,
      user: await this.userRepository.findById(userId),
    };
  }
}
