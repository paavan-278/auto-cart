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
import { Settings } from 'src/core/config/settings';
import { ERROR_MESSAGES, MESSAGES } from 'src/constant/string';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
    private readonly settings: Settings,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
    @Inject('SUPABASE') private readonly supabase: SupabaseClient,
  ) {}

  async signup(payload: SignUpSchema, file?: Express.Multer.File) {
    const email = payload.email.toLowerCase().trim();

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGES.EMAIL_EXISTS);
    }

    const trustedSeller = String(payload.trusted_seller) === 'true';
    const freeAdUsed = String(payload.free_ad_used) === 'true';

    let businessLogoUrl: string | undefined;

    if (file) {
      const filePath = `${Date.now()}-${file.originalname}`;
      const bucket = 'auto-cart';

      const { error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        throw new BadRequestException(error.message);
      }

      const { data } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      businessLogoUrl = data.publicUrl;
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = this.userRepository.create({
      ...payload,
      email,
      trusted_seller: trustedSeller,
      free_ad_used: freeAdUsed,
      password: hashedPassword,
      business_logo_url: businessLogoUrl,
    });

    const savedUser = await this.userRepository.save(user);
    delete (savedUser as any).password;

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
        secret: this.settings.SECRET_KEY,
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
        secret: this.settings.SECRET_KEY,
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
        secret: this.settings.SECRET_KEY,
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
}
