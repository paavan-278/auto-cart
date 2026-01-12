import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { Settings } from './core/config/settings';
import { typeOrmConfig } from './database/typeorm.confiq';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CoreModule,

    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      inject: [Settings],
      useFactory: typeOrmConfig,
    }),

    UserModule,
  ],
})
export class AppModule {}
