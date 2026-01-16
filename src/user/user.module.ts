import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './entity/user.entity';
import { UserOtp } from './entity/otp.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { TokenDependency } from './dependencies/token.dependency';
import { MailModule } from 'src/mail/mail.module';
import { JwtStrategy } from 'src/core/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserOtp]),
    MailModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    TokenDependency,
    JwtStrategy,
  ],
  exports: [PassportModule, JwtModule],
})
export class UserModule {}
