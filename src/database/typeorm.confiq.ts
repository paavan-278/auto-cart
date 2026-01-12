import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Settings } from '../core/config/settings';

export const typeOrmConfig = (
  settings: Settings,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: settings.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: true,  
  logging: false,
});
