import { PartialType, OmitType } from '@nestjs/swagger';
import { SignUpSchema } from './user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(SignUpSchema, ['password'] as const),
) {}
