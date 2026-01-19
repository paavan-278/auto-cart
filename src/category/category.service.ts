import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/category.dto';
import { SupabaseService } from 'src/service/supabase-upload.service';
import { ERROR_MESSAGES } from 'src/constant/string';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(dto: CreateCategoryDto, file: Express.Multer.File, user: User) {
    if (!file) {
      throw new BadRequestException(ERROR_MESSAGES.CATEGORY_IMAGE_REQUIRED);
    }

    const imageUrl = await this.supabaseService.uploadCategoryImage(
      file,
      dto.categoryName,
    );

    const category = this.categoryRepo.create({
      categoryName: dto.categoryName,
      imageUrl,
      createdBy: user,
    });

    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find({
      relations: ['createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!category) {
      throw new NotFoundException(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
    }

    return category;
  }
}
