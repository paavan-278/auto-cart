import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import FormData from 'form-data';

import { PlateEntity } from './entity/plate.entity';

@Injectable()
export class PlateService {
  constructor(
    @InjectRepository(PlateEntity)
    private readonly plateRepository: Repository<PlateEntity>,
  ) {}

  async detectPlate(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }

    const formData = new FormData();
    formData.append('upload', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const { data } = await axios.post(
      'https://api.platerecognizer.com/v1/plate-reader/',
      formData,
      {
        headers: {
          Authorization: `Token ${process.env.SNAPSHOT_API_KEY}`,
          ...formData.getHeaders(),
        },
      },
    );

    const r = data?.results?.[0];
    const v = r?.vehicle || {};

    const plate = this.plateRepository.create({
      number_plate: r?.plate ?? null,
      vehicle_color: v?.color?.name ?? 'unknown',
      body_type: v?.body_type ?? 'unknown',
      make: v?.make ?? 'unknown',
      model: v?.model ?? 'unknown',
      confidence: r?.score ?? null,
    });

    const savedPlate = await this.plateRepository.save(plate);

    return savedPlate;
  }
}
