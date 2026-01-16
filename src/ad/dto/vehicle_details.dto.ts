import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class VehicleDetailsDto {
  @ApiPropertyOptional({
    description: 'Vehicle trim level or variant',
    example: 'Highline',
  })
  @IsOptional()
  @IsString()
  trimLevel?: string;

  @ApiPropertyOptional({
    description: 'Vehicle model name',
    example: 'X5',
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({
    description: 'Fuel type of the vehicle',
    example: 'Diesel',
  })
  @IsOptional()
  @IsString()
  fuelType?: string;

  @ApiPropertyOptional({
    description: 'Vehicle manufacturer',
    example: 'BMW',
  })
  @IsOptional()
  @IsString()
  make?: string;

  @ApiPropertyOptional({
    description: 'Manufacturing year',
    example: 2020,
  })
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiPropertyOptional({
    description: 'Transmission type',
    example: 'Automatic',
  })
  @IsOptional()
  @IsString()
  transmission?: string;

  @ApiPropertyOptional({
    description: 'Trim or edition name',
    example: 'M Sport',
  })
  @IsOptional()
  @IsString()
  trim?: string;

  @ApiPropertyOptional({
    description: 'Number of doors',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  doors?: number;

  @ApiPropertyOptional({
    description: 'Body type of the vehicle',
    example: 'SUV',
  })
  @IsOptional()
  @IsString()
  bodyType?: string;

  @ApiPropertyOptional({
    description: 'Mileage driven in kilometers',
    example: 45000,
  })
  @ApiPropertyOptional({
    description: 'Vehicle color',
    example: 'Black',
  })
  @IsOptional()
  @IsString()
  colour?: string;

  @ApiPropertyOptional({
    description: 'Number of seats',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  seats?: number;

  @ApiPropertyOptional({
    description: 'Current country of registration',
    example: 'India',
  })
  @IsOptional()
  @IsString()
  currentCountryOfReg?: string;

  @ApiPropertyOptional({
    description: 'Is the vehicle imported',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  imported?: boolean;

  @ApiPropertyOptional({
    description: 'Total number of previous owners',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  totalOwner?: number;

  @ApiPropertyOptional({
    description: 'NCT expiry date',
    example: '2026-08-15',
  })
  @IsOptional()
  @IsDateString()
  nctExpiry?: string;

  @ApiPropertyOptional({
    description: 'Road tax details',
    example: 'Paid till March 2026',
  })
  @IsOptional()
  @IsString()
  roadTax?: string;

  @ApiPropertyOptional({
    description: 'Combined fuel consumption',
    example: '15 km/l',
  })
  @IsOptional()
  @IsString()
  combFuel?: string;

  @ApiPropertyOptional({
    description: 'Rural fuel consumption',
    example: '18 km/l',
  })
  @IsOptional()
  @IsString()
  ruralFuel?: string;

  @ApiPropertyOptional({
    description: 'Urban fuel consumption',
    example: '12 km/l',
  })
  @IsOptional()
  @IsString()
  urbanFuel?: string;

  @ApiPropertyOptional({
    description: 'Engine size',
    example: '2993 cc',
  })
  @IsOptional()
  @IsString()
  engineSize?: string;

  @ApiPropertyOptional({
    description: '0–100 km/h acceleration time',
    example: '5.5 sec',
  })
  @IsOptional()
  @IsString()
  zeroToHundred?: string;

  @ApiPropertyOptional({
    description: 'Engine power output',
    example: '265 bhp',
  })
  @IsOptional()
  @IsString()
  power?: string;

  @ApiPropertyOptional({
    description: 'Top speed',
    example: '250 km/h',
  })
  @IsOptional()
  @IsString()
  topSpeed?: string;

  @ApiPropertyOptional({
    description: 'Torque output',
    example: '620 Nm',
  })
  @IsOptional()
  @IsString()
  torque?: string;

  @ApiPropertyOptional({
    description: 'EURO NCAP safety rating',
    example: '5 Star',
  })
  @IsOptional()
  @IsString()
  euroNCASSafety?: string;

  @ApiPropertyOptional({
    description: 'Adult protection rating',
    example: '89%',
  })
  @IsOptional()
  @IsString()
  adultProtection?: string;

  @ApiPropertyOptional({
    description: 'Child protection rating',
    example: '87%',
  })
  @IsOptional()
  @IsString()
  childProtection?: string;

  @ApiPropertyOptional({
    description: 'Pedestrian protection rating',
    example: '75%',
  })
  @IsOptional()
  @IsString()
  pedestrianProtection?: string;

  @ApiPropertyOptional({
    description: 'Safety assistance rating',
    example: '82%',
  })
  @IsOptional()
  @IsString()
  safetyAssistance?: string;

  @ApiPropertyOptional({
    description: 'External length of vehicle',
    example: '4922 mm',
  })
  @IsOptional()
  @IsString()
  externalLength?: string;

  @ApiPropertyOptional({
    description: 'External width of vehicle',
    example: '2004 mm',
  })
  @IsOptional()
  @IsString()
  externalWidth?: string;

  @ApiPropertyOptional({
    description: 'External height of vehicle',
    example: '1745 mm',
  })
  @IsOptional()
  @IsString()
  externalHeight?: string;

  @ApiPropertyOptional({
    description: 'Boot / luggage volume',
    example: '650 L',
  })
  @IsOptional()
  @IsString()
  bootVolume?: string;

  @ApiPropertyOptional({
    description: 'Fuel tank capacity',
    example: '80 L',
  })
  @IsOptional()
  @IsString()
  fuelTankCapacity?: string;
}
