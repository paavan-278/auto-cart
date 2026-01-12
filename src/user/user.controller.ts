import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ApiConsumes, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import {
  SignUpSchema,
  SignInSchema,
  SendOtpDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './dto/user.dto';
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
  @UseInterceptors(FileInterceptor('business_logo'))
  signup(
    @Body() body: SignUpSchema,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userservice.signup(body, file);
  }

  @Post('signin')
  signin(@Body() body: SignInSchema) {
    return this.userservice.signin(body.email, body.password);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: SendOtpDto) {
    return this.userservice.sendOtp(body.email);
  }

  @Post('verifyotp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.userservice.verifyOtp(body.email, body.otp);
  }

  @ApiBearerAuth()
  @Post('reset-password')
  resetPassword(@Req() req: Request, @Body() dto: ResetPasswordDto) {
    const token = this.tokenDependancy.getCurrentUser(req);

    return this.userservice.resetPassword(token, dto.new_password);
  }
}
``;
