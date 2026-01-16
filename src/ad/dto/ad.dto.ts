import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { VehicleDetailsDto } from './vehicle_details.dto';

export class CreateAdDto extends VehicleDetailsDto {
  @ApiProperty({
    description: 'Selected category id',
  })
  @IsUUID()
  categoryId: string;

  @ApiPropertyOptional({
    description: 'Vehicle license number (optional)',
    example: 'RJ14AB1234',
  })
  @IsOptional()
  @IsString()
  vehicleLicenseNumber?: string;

  @ApiProperty({
    description: 'Item name',
    example: 'Toyota Hiace Van',
  })
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @ApiProperty({
    description: 'Ad status',
    example: 'active',
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Ad type',
    example: 'sell',
  })
  @IsString()
  adType: string;

  @ApiPropertyOptional({
    description: 'Mileage in KM',
    example: 85000,
  })
  @IsOptional()
  @IsNumber()
  mileageKM?: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    isArray: true,
    description: 'uploadPhoto – images only (max 20)',
  })
  uploadPhoto?: Express.Multer.File[];

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    isArray: true,
    description: 'uploadStory – images + videos (max 5)',
  })
  uploadStory?: Express.Multer.File[];

  @ApiPropertyOptional({
    description: 'Mileage',
    example: 'Diesel',
  })
  @IsOptional()
  @IsString()
  mileage?: string;

  @ApiPropertyOptional({
    description: 'MOT / NCT status',
    example: 'Valid till 2026',
  })
  @IsOptional()
  @IsString()
  motNctStatus?: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '9876543210',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Currency code',
    example: 'INR',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Amount',
    example: 850000,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Location',
    example: 'Jaipur, Rajasthan',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Ad description',
    example: 'Well maintained van, single owner',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Van make',
    example: 'Toyota',
  })
  @IsOptional()
  @IsString()
  vanMake?: string;

  @ApiPropertyOptional({
    description: 'Van model',
    example: 'Hiace',
  })
  @IsOptional()
  @IsString()
  vanModel?: string;

  @ApiPropertyOptional({
    description: 'Manufacturing year',
    example: 2019,
  })
  @IsOptional()
  @IsNumber()
  vanYear?: number;

  @ApiPropertyOptional({
    description: 'Load capacity',
    example: '1200kg',
  })
  @IsOptional()
  @IsString()
  loadCapacity?: string;
}
