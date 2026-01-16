import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { SupabaseService } from 'src/service/supabase-upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    SupabaseService,
  ],
})
export class CategoryModule {}
