import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ad } from './entity/ad.entity';
import { Category } from 'src/category/entity/category.entity';
import { Media } from './entity/media.entity';

import { AddController } from './ad.controller';
import { AdService } from './ad.service';
import { SupabaseService } from '../service/supabase-upload.service';

import { SupabaseProvider } from 'src/core/provider/supabase.provider';
import { TokenDependency } from 'src/user/dependencies/token.dependency';
import { VehicleDetails } from './entity/vehicle_details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ad,
      Media,
      Category,
      VehicleDetails,
    ]),
  ],
  controllers: [AddController],
  providers: [
    AdService,
    SupabaseService,
    SupabaseProvider,
    TokenDependency,
  ],
  exports: [AdService],
})
export class AdModule {}
