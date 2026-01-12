import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Settings } from './config/settings';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [Settings],
  exports: [Settings],
})
export class CoreModule {}
