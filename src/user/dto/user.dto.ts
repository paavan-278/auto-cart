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

export class SignUpSchema {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Rahul Sharma',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the user (must be unique)',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mobile phone number of the user',
    example: '9876543210',
  })
  @IsString()
  @MinLength(10, { message: 'Phone number must be at least 10 digits' })
  phone: string;

  @ApiProperty({
    description: 'Type of user account',
    enum: AccountType,
    example: AccountType.GUEST,
  })
  @IsEnum(AccountType)
  account_type: AccountType;

  @ApiProperty({
    description: 'Trade status of the user (optional)',
    enum: TradeStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TradeStatus)
  trade_status?: TradeStatus;

  @ApiProperty({
    description: 'Whether the user is a trusted seller',
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  trusted_seller?: boolean;

  @ApiProperty({
    description: 'Indicates if the free advertisement quota is already used',
    required: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  free_ad_used?: boolean;

  @ApiProperty({
    description: 'Current status of the user account',
    enum: UserStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({
    description: 'Registered business name of the seller',
    example: 'AutoCart Motors',
  })
  @IsOptional()
  @IsString()
  business_name?: string;

  @ApiPropertyOptional({
    description: 'Business or residential address',
    example: 'Sector 22, Chandigarh',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Name of the contact person for the business',
    example: 'Amit Verma',
  })
  @IsOptional()
  @IsString()
  contact_person_name?: string;

  @ApiPropertyOptional({
    description: 'VAT / GST number of the business',
    example: 'GSTIN123456789',
  })
  @IsOptional()
  @IsString()
  vat_number?: string;

  @ApiProperty({
    description: 'Business logo image file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  business_logo?: any;

  @ApiProperty({
    description: 'Background image for business profile',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  background_image?: any;

  @ApiPropertyOptional({
    description: 'Dealer license number',
    example: 'DL-2024-8899',
  })
  @IsOptional()
  @IsString()
  dealer_license?: string;

  @ApiPropertyOptional({
    description: 'Instagram profile link',
    example: 'https://instagram.com/autocart',
  })
  @IsOptional()
  @IsString()
  instagram_link?: string;

  @ApiPropertyOptional({
    description: 'Facebook page link',
    example: 'https://facebook.com/autocart',
  })
  @IsOptional()
  @IsString()
  facebook_link?: string;

  @ApiPropertyOptional({
    description: 'Official website link',
    example: 'https://www.autocart.com',
  })
  @IsOptional()
  @IsString()
  website_link?: string;

  @ApiProperty({
    description: 'Password for the account (minimum 6 characters)',
    example: 'Password@123',
  })
  @IsString()
  password: string;
}

export class SignInSchema {
  @ApiProperty({
    description: 'Registered email address',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'Password@123',
  })
  @IsString()
  password: string;
}

export class SendOtpDto {
  @ApiProperty({
    description: 'Email address to send OTP',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Registered email address',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '6-digit OTP sent to email',
    example: '123456',
  })
  @IsString()
  @Length(6, 6)
  otp: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'New password (minimum 6 characters)',
    example: 'NewPass@123',
  })
  @MinLength(6)
  new_password: string;
}
