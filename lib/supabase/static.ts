import { createClient } from "@supabase/supabase-js";

// Used only in generateStaticParams and other build-time calls
// Does NOT use cookies — safe outside request scope
export function createStaticClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
