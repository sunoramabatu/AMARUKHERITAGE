import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rpbviojbufxxgvmsxfns.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwYnZpb2pidWZ4eGd2bXN4Zm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTg0NjAsImV4cCI6MjA4ODI3NDQ2MH0.hOul9J3vnjAHfTxq7UQGugmM8ijxvaSilnKhH4p61n4";

export const supabase = createClient(supabaseUrl, supabaseKey);