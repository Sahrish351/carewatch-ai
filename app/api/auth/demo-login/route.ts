import { NextResponse } from "next/server";

export interface DemoUserPersona {
  id: string;
  email: string;
  name: string;
  role: "citizen" | "clinician" | "admin";
  title: string;
  department?: string;
}

const DEMO_PERSONAS: Record<string, DemoUserPersona> = {
  citizen: {
    id: "demo-user-citizen",
    email: "patient@carewatch.ai",
    name: "Sarah Jenkins",
    role: "citizen",
    title: "Registered Patient (Active Care Episode)",
  },
  clinician: {
    id: "demo-user-clinician",
    email: "dr.thorne@carewatch.ai",
    name: "Dr. Aris Thorne, MD",
    role: "clinician",
    title: "Triage & Emergency Medicine Lead",
    department: "Virtual Urgent Care & Triage",
  },
  admin: {
    id: "demo-user-admin",
    email: "admin@carewatch.ai",
    name: "CareWatch AI Admin",
    role: "admin",
    title: "Healthcare System & Safety Architect",
    department: "System Governance & Safety",
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const requestedRole = (body.role as string) || "citizen";
    const persona = DEMO_PERSONAS[requestedRole] || DEMO_PERSONAS.citizen;

    const redirectPath =
      persona.role === "admin"
        ? "/admin"
        : persona.role === "clinician"
        ? "/clinician"
        : "/dashboard";

    const response = NextResponse.json({
      success: true,
      user: persona,
      role: persona.role,
      redirect: redirectPath,
      message: `Signed in as demo ${persona.role} (${persona.name})`,
    });

    const sessionPayload = encodeURIComponent(
      JSON.stringify({
        id: persona.id,
        email: persona.email,
        name: persona.name,
        role: persona.role,
        isDemo: true,
        loginAt: new Date().toISOString(),
      })
    );

    // Set secure cookies for both middleware and client
    response.cookies.set("carewatch_session", sessionPayload, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: false,
      sameSite: "lax",
    });

    response.cookies.set("carewatch_auth_token", "demo-token-session", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to establish demo session" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete("carewatch_session");
  response.cookies.delete("carewatch_auth_token");
  return response;
}
