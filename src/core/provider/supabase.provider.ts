import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Settings } from '../config/settings';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

export const SupabaseProvider = {
  provide: SUPABASE_CLIENT,
  inject: [Settings],
  useFactory: async (settings: Settings): Promise<SupabaseClient> => {
    const client = createClient(
      settings.SUPABASE_URL,
      settings.SUPABASE_KEY,
    );

    const { error } = await client.storage.listBuckets();
    if (error) {
      throw new Error('Supabase connection failed');
    }

    return client;
  },
};
