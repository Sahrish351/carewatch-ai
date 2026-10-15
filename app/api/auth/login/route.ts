import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      const msg = error.message || "";
      if (msg.toLowerCase().includes("email not confirmed")) {
        return NextResponse.json(
          {
            error: "Your email address has not been confirmed yet. Please check your inbox for the activation link, or use the 1-Click Demo Login to explore immediately.",
            code: "email_not_confirmed",
          },
          { status: 400 }
        );
      }

      if (msg.toLowerCase().includes("invalid login credentials")) {
        return NextResponse.json(
          {
            error: "Invalid email or password. Please verify your credentials or register a new account.",
            code: "invalid_credentials",
          },
          { status: 401 }
        );
      }

      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // Role resolution
    const role = data.user?.user_metadata?.role || "citizen";
    const name = data.user?.user_metadata?.display_name || data.user?.email?.split("@")[0] || "User";

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name,
        role,
      },
      role,
      redirect: role === "admin" ? "/admin" : role === "clinician" ? "/clinician" : "/dashboard",
    });
  } catch (err: any) {
    console.error("[Login Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication. Please check your connection." },
      { status: 500 }
    );
  }
}

