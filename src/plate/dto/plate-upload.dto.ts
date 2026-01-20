import { ApiProperty } from '@nestjs/swagger';

export class PlateUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  image: any;
}
