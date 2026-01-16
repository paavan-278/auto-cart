import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';
import { SUPABASE_CLIENT } from '../core/provider/supabase.provider';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const fileName = `${uuid()}.${ext}`;
    const path = `${folder}/${fileName}`;

    const { error } = await this.supabase.storage
      .from('auto-cart')
      .upload(path, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new Error(error.message);
    }

    return this.supabase.storage
      .from('auto-cart')
      .getPublicUrl(path).data.publicUrl;
  }

 async uploadCategoryImage(
  file: Express.Multer.File,
  categoryName: string,
): Promise<string> {
  const safeCategory = categoryName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const filePath = `${safeCategory}/${Date.now()}-${file.originalname}`;

  const { error } = await this.supabase.storage
    .from('auto-cart')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = this.supabase.storage
    .from('auto-cart')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
}
