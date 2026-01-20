import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Settings } from '../core/config/settings';

export const typeOrmConfig = (settings: Settings): TypeOrmModuleOptions => ({
  type: 'postgres',

  url: settings.DATABASE_URL,

  autoLoadEntities: true,

  synchronize: true,

  logging: false,

  extra: {
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
});
