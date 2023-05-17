import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = 'https://byfernawhgsnygireuno.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZmVybmF3aGdzbnlnaXJldW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNjI5MjMsImV4cCI6MTk5NjczODkyM30.LXH-A9bPEA_rCTaJsCncwmzloAIq2Nmg_qQE36ScG2g"
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {storage: AsyncStorage, detectSessionInUrl: false}
});

export default supabase;