import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  Length,
  MinLength,
} from 'class-validator';
import { AccountType, TradeStatus, UserStatus } from '../enum/user_enum';

export class SignupSchema {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({ enum: AccountType })
  @IsEnum(AccountType)
  account_type: AccountType;

  @ApiProperty({ enum: TradeStatus, required: false })
  @IsOptional()
  @IsEnum(TradeStatus)
  trade_status?: TradeStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  trusted_seller?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  free_ad_used?: boolean;

  @ApiProperty({ enum: UserStatus, required: false })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  business_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact_person_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vat_number?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  business_logo?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dealer_license?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  instagram_link?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  facebook_link?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website_link?: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SigninSchema {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SendOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 6)
  otp: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @MinLength(6)
  new_password: string;
}
