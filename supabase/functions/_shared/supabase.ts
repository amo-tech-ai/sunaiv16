// Add global declaration for Deno to resolve TypeScript errors in Supabase Edge Functions environment.
declare const Deno: any;

import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * Creates a Supabase client with the Service Role key for administrative actions.
 */
export const getAdminClient = () => {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );
};

/**
 * Validates the user's JWT and checks their membership in the specified organization.
 */
export async function validateUser(req: Request, orgId?: string) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new Error("No authorization header");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Invalid token");

  if (orgId) {
    const admin = getAdminClient();
    const { data: membership, error: memberError } = await admin
      .from("org_members")
      .select("role")
      .eq("org_id", orgId)
      .eq("user_id", user.id)
      .single();

    if (memberError || !membership) throw new Error("Unauthorized access to organization");
  }

  return user;
}

/**
 * Standard CORS headers for Edge Functions.
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};