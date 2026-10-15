import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));

    if (user) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.display_name || user.email?.split("@")[0] || "User",
          role: user.user_metadata?.role || "citizen",
          isDemo: false,
        },
      });
    }

    // Check demo cookie
    const cookieStore = await cookies();
    const demoCookie = cookieStore.get("carewatch_session")?.value;
    if (demoCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(demoCookie));
        return NextResponse.json({
          authenticated: true,
          user: {
            ...parsed,
            isDemo: true,
          },
        });
      } catch {}
    }

    const legacyToken = cookieStore.get("carewatch_auth_token")?.value;
    if (legacyToken) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: "demo-user-citizen",
          email: "patient@carewatch.ai",
          name: "Sarah Jenkins",
          role: "citizen",
          isDemo: true,
        },
      });
    }

    return NextResponse.json({ authenticated: false, user: null });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}

