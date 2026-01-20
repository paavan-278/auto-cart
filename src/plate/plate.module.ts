import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateController } from './plate.controller';
import { PlateService } from './plate.service';
import { PlateEntity } from './entity/plate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlateEntity]),
  ],
  controllers: [PlateController],
  providers: [PlateService],
})
export class PlateModule {}
