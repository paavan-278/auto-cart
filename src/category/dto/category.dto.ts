import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Cars',
    description: 'Category name',
  })
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Category image (required)',
  })
  image: any;
}
