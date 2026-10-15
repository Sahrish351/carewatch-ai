import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut().catch(() => {});

    const response = NextResponse.json({ success: true, message: "Logged out" });
    response.cookies.delete("carewatch_session");
    response.cookies.delete("carewatch_auth_token");
    response.cookies.delete("sb-access-token");
    response.cookies.delete("sb-refresh-token");

    return response;
  } catch {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("carewatch_session");
    response.cookies.delete("carewatch_auth_token");
    return response;
  }
}

