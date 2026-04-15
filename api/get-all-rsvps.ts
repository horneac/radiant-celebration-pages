import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminApiKey = process.env.ADMIN_API_KEY;

if (!supabaseUrl || !serviceRoleKey || !adminApiKey) {
  throw new Error(
    "Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or ADMIN_API_KEY environment variable"
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token || token !== adminApiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabase.from("rsvps").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
