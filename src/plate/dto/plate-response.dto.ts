import { ApiProperty } from '@nestjs/swagger';

export class PlateResponseDto {
  @ApiProperty()
  number_plate: string;

  @ApiProperty()
  vehicle_color: string;

  @ApiProperty()
  body_type: string;

  @ApiProperty()
  make: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  confidence: number;
}
