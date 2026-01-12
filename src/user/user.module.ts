import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { CoreModule } from '../core/core.module';

import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { SupabaseProvider } from './dependencies/supabase.provider';
import { TokenDependency } from './dependencies/token.dependency';
import { MailModule } from 'src/mail/mail.module';
import { UserOtp } from './entity/otp.entity';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([User, UserOtp]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, SupabaseProvider, TokenDependency],
})
export class UserModule {}
