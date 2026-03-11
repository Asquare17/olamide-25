import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface BirthdayWish {
  id: string;
  name: string;
  wish: string;
  created_at: string;
}

// Lazy singleton — only creates the client when called, not at module load time
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.startsWith("your_") || key.startsWith("your_")) return null;
  try {
    _client = createClient(url, key);
    return _client;
  } catch {
    return null;
  }
}
