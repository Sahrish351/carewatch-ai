import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json().catch(() => ({ email: "demo@carewatch.ai" }));
    const response = NextResponse.json({
      success: true,
      user: {
        id: "demo-user-carewatch",
        email: email || "demo@carewatch.ai",
        name: "Dr. Sarah Khan (Demo Patient)",
      },
    });

    // Set cookie for protected route middleware
    response.cookies.set("carewatch_auth_token", "demo-token-session", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to create demo session" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("carewatch_auth_token");
  return response;
}

