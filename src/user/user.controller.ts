import {
  Controller,
  Post,
  Put,
  Body,
  UseInterceptors,
  Req,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

import { UserService } from './user.service';
import {
  SignUpSchema,
  SignInSchema,
  SendOtpDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './dto/user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { TokenDependency } from './dependencies/token.dependency';

@ApiTags('Auth')
@Controller('auth')
export class UserController {
  constructor(
    private readonly userservice: UserService,
    private readonly tokenDependancy: TokenDependency,
  ) {}

  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'business_logo', maxCount: 1 },
      { name: 'background_image', maxCount: 1 },
    ]),
  )
  async signup(
    @Body() body: SignUpSchema,
    @UploadedFiles()
    files: {
      business_logo?: Express.Multer.File[];
      background_image?: Express.Multer.File[];
    },
  ) {
    return await this.userservice.signup(
      body,
      files?.business_logo?.[0],
      files?.background_image?.[0],
    );
  }

  @Post('signin')
  async signin(@Body() body: SignInSchema) {
    return await this.userservice.signin(body.email, body.password);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: SendOtpDto) {
    return await this.userservice.sendOtp(body.email);
  }

  @Post('verifyotp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return await this.userservice.verifyOtp(body.email, body.otp);
  }

  @ApiBearerAuth()
  @Post('reset-password')
  async resetPassword(@Req() req: Request, @Body() dto: ResetPasswordDto) {
    const token = this.tokenDependancy.getCurrentUser(req);
    return await this.userservice.resetPassword(token, dto.new_password);
  }

  @Put('update')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'business_logo', maxCount: 1 },
      { name: 'background_image', maxCount: 1 },
    ]),
  )
  async updateUser(
    @Req() req: Request & { user: { id: string } },
    @UploadedFiles()
    files: {
      business_logo?: Express.Multer.File[];
      background_image?: Express.Multer.File[];
    },
    @Body() updateDto: UpdateUserDto,
  ) {
    return await this.userservice.updateUser(
      req.user.id,
      updateDto,
      files?.business_logo?.[0],
      files?.background_image?.[0],
    );
  }
}
