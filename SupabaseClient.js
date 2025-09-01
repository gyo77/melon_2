import { createClient } from "@supabase/supabase-js";

// 방금 복사해둔 URL과 API Key
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default supabase;
