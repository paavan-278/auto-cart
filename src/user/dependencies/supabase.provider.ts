import { createClient } from '@supabase/supabase-js';
import { Settings } from '../../core/config/settings';

export const SupabaseProvider = {
  provide: 'SUPABASE',
  inject: [Settings],
  useFactory: async (settings: Settings) => {
    const supabase = createClient(settings.SUPABASE_URL, settings.SUPABASE_KEY);

    const { error } = await supabase.storage.listBuckets();
    if (error) throw new Error('Supabase connection failed');
    return supabase;
  },
};
