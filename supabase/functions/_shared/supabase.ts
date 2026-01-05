// Shared Supabase & Auth Utilities for Edge Functions
declare const Deno: any;

import { createClient } from "npm:@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

export const getAdminClient = () => {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Internal Server Error: Database configuration missing");
  return createClient(url, key);
};

export async function validateUser(req: Request, orgId?: string) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new Error("Unauthorized: No session found");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized: Invalid session");

  if (orgId) {
    const admin = getAdminClient();
    const { data: membership, error: mError } = await admin
      .from("org_members")
      .select("role")
      .eq("org_id", orgId)
      .eq("user_id", user.id)
      .single();

    if (mError || !membership) throw new Error("Forbidden: Access to this organization is denied");
  }

  return user;
}

/**
 * Basic rate limiting check (v1)
 */
export async function checkRateLimit(orgId: string) {
  const admin = getAdminClient();
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  
  const { count, error } = await admin
    .from("ai_run_logs")
    .select("*", { count: 'exact', head: true })
    .eq("org_id", orgId)
    .gte("created_at", oneHourAgo);

  if (error) throw new Error("Internal Server Error: Limit check failed");
  if (count && count > 100) throw new Error("Too Many Requests: Hourly limit reached for this organization");
}

/**
 * Standardized error response
 */
export function createErrorResponse(error: Error) {
  const message = error.message;
  let status = 500;
  
  if (message.includes("Unauthorized")) status = 401;
  else if (message.includes("Forbidden")) status = 403;
  else if (message.includes("Invalid JSON") || message.includes("Missing required")) status = 400;
  else if (message.includes("Too Many Requests")) status = 429;

  console.error(`[Error] ${status}: ${message}`);

  return new Response(
    JSON.stringify({ error: status === 500 ? "Internal Server Error" : message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
