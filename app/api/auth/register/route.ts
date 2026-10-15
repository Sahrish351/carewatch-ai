import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, password, confirmPassword } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match. Please verify your password entry." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Call Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: name.trim(),
          role: "citizen",
        },
      },
    });

    if (error) {
      // User-friendly error mapping
      let message = error.message;
      if (message.toLowerCase().includes("already registered") || message.toLowerCase().includes("user already exists")) {
        message = "An account with this email address already exists. Please sign in instead.";
      } else if (message.toLowerCase().includes("weak password")) {
        message = "Password is too weak. Please include letters and numbers.";
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    // Determine if confirmation email is required
    const isEmailConfirmed = !!data.session || data.user?.confirmed_at;

    return NextResponse.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: name.trim(),
        role: "citizen",
      },
      requiresEmailConfirmation: !isEmailConfirmed,
      message: isEmailConfirmed
        ? "Account created successfully! Welcome to CareWatch AI."
        : "Account created! A confirmation link has been sent to your email. Please verify before signing in, or use 1-Click Demo to explore.",
    });
  } catch (err: any) {
    console.error("[Register Error]:", err);
    return NextResponse.json(
      { error: "Unable to process registration at this time. Please check your network connection or try again." },
      { status: 500 }
    );
  }
}

