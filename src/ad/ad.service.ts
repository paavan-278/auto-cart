import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ad } from './entity/ad.entity';
import { Media } from './entity/media.entity';
import { VehicleDetails } from './entity/vehicle_details.entity';
import { SupabaseService } from '../service/supabase-upload.service';
import { CreateAdDto } from './dto/ad.dto';
import { ERROR_MESSAGES, MESSAGES } from 'src/constant/string';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,

    @InjectRepository(Media)    
    private readonly mediaRepository: Repository<Media>,

    @InjectRepository(VehicleDetails)
    private readonly vehicalRepository: Repository<VehicleDetails>,

    private readonly supabaseService: SupabaseService,
  ) {}

  async createAd(
    dto: CreateAdDto,
    files: {
      uploadPhoto?: Express.Multer.File[];
      uploadStory?: Express.Multer.File[];
    },
    userId:string
  ) {
    const { categoryId, ...rest } = dto as any;

    const ad = await this.adRepository.save({
      ...rest,
      category: { id: categoryId },
      user: { id: userId}
    });

    await this.vehicalRepository.save({
      ...rest,
      ad: ad,
    });

    const mediaEntities: Media[] = [];
    let urls: string[] | null = null;
    const basePath = `ads/${ad.id}`;

    if (files.uploadPhoto?.length) {
      urls = [];

      for (const file of files.uploadPhoto) {
        const url = await this.supabaseService.uploadFile(
          file,
          `${basePath}/photos`,
        );

        urls.push(url);
        mediaEntities.push(this.mediaRepository.create({ ad, url }));
      }
    }

    if (files.uploadStory?.length) {
      if (!urls) urls = [];

      for (const file of files.uploadStory) {
        const url = await this.supabaseService.uploadFile(
          file,
          `${basePath}/stories`,
        );

        urls.push(url);
        mediaEntities.push(this.mediaRepository.create({ ad, url }));
      }
    }

    if (mediaEntities.length) {
      await this.mediaRepository.save(mediaEntities);
    }

    return {
      message: MESSAGES.AD_CREATED_SUCCESS,
      adId: ad.id,
      data: {
        categoryId,
        ...rest,
        urls,
      },
    };
  }

  async getAll(userId: string) {
  const ads = await this.adRepository.find({
    where: {
      user: { id: userId },
    },
    relations: ['user', 'category', 'media', 'vehicleDetails'],
    order: { createdAt: 'DESC' },
  });

  return {
    message: MESSAGES.AD_FETCH_SUCCESS,
    data: ads,
  };
}

async getAdById(id: string, userId: string) {
  const ad = await this.adRepository.findOne({
    where: {
      id,
      user: { id: userId },
    },
    relations: ['user', 'category', 'media', 'vehicleDetails'],
  });

  if (!ad) {
    throw new NotFoundException(ERROR_MESSAGES.AD_NOT_FOUND);
  }

  return {
    message: MESSAGES.AD_FETCH_SUCCESS,
    data: ad,
  };
}

async deleteAd(id: string, userId: string) {
  const ad = await this.adRepository.findOne({
    where: {
      id,
      user: { id: userId },
    },
  });

  if (!ad) {
    throw new NotFoundException(ERROR_MESSAGES.AD_NOT_FOUND);
  }

  await this.adRepository.delete(id);

  return {
    message: MESSAGES.AD_DELETE_SUCCESS,
    adId: id,
  };
}

}
