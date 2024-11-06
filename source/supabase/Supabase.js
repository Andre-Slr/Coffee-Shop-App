import { AppState }  from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient} from '@supabase/supabase-js';
// Instalar AsyncStorage
// https://supabase.com/docs/guides/auth
const supabaseUrl = 'https://ihwomkltpmylslgpggqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlod29ta2x0cG15bHNsZ3BnZ3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5OTgyNTYsImV4cCI6MjA0MzU3NDI1Nn0.eA1vY87TwRQE6fw9W3UlpwpZiczTfknC2zo1qfxDMxI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
});