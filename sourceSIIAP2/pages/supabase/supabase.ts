import {AppState} from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://luaoebbsygqsclllcfpz.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1YW9lYmJzeWdxc2NsbGxjZnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMDA2OTgsImV4cCI6MjA0NzY3NjY5OH0.cQ_ptTH9lkgtQU9zXHswgGzn8HzmIsh4sKtscoW9ZnA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

