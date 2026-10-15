import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SupabaseHealthService } from "@/lib/services/supabase-service";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id || "demo-user-carewatch";

  const { data: passport, source } = await SupabaseHealthService.getHealthPassport(supabase, userId);
  return NextResponse.json({ passport, persistence: source });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || "demo-user-carewatch";

    const { data: updated, source } = await SupabaseHealthService.updateHealthPassport(
      supabase,
      userId,
      body
    );
    return NextResponse.json({ success: true, passport: updated, persistence: source });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update health passport" }, { status: 500 });
  }
}
