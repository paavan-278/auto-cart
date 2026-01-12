import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Settings {
  constructor(private config: ConfigService) {}

  get DATABASE_URL() {
    const database_url = this.config.get('DATABASE_URL');
    if (!database_url) throw new Error('DATABASE_URL missing');
    return database_url;
  }

  get SUPABASE_URL() {
    return this.config.get('SUPABASE_URL');
  }

  get SUPABASE_KEY() {
    return this.config.get('SUPABASE_KEY');
  }

  get SECRET_KEY() {
    return this.config.get('SECRET_KEY');
  }

  get ACCESS_TOKEN_EXPIRE_DAYS() {
    return Number(this.config.get('ACCESS_TOKEN_EXPIRE_DAYS', 7));
  }
}
