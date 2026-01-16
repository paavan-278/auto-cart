import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Settings } from './config/settings';
import { SupabaseProvider } from './provider/supabase.provider';
import { TokenDependency } from '../user/dependencies/token.dependency';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [Settings, SupabaseProvider, TokenDependency],
  exports: [Settings, SupabaseProvider, TokenDependency],
})
export class CoreModule {}
