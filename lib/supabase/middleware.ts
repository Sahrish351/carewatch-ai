import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let activeUser: any = null;
  let userRole = "citizen";

  // 1. Try real Supabase session if configured
  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("demo.")) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        activeUser = user;
        userRole = user.user_metadata?.role || "citizen";
      }
    } catch {
      // Fall through to cookie checks
    }
  }

  // 2. Check for active demo session cookie
  const demoCookie = request.cookies.get("carewatch_session")?.value;
  if (demoCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(demoCookie));
      if (parsed) {
        if (!activeUser) activeUser = parsed;
        if (parsed.role) userRole = parsed.role;
      }
    } catch {}
  }

  if (!activeUser) {
    const legacyToken = request.cookies.get("carewatch_auth_token")?.value;
    if (legacyToken) {
      activeUser = {
        id: "demo-user-citizen",
        email: "patient@carewatch.ai",
        name: "Sarah Jenkins",
        role: "citizen",
      };
      userRole = "citizen";
    }
  }

  const pathname = request.nextUrl.pathname;
  const isProtected = isProtectedRoute(pathname);

  // 3. Block unauthorized access to protected routes
  if (isProtected && !activeUser) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 4. Strict Role-based enforcement
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/clinician") && userRole !== "clinician") {
    const url = request.nextUrl.clone();
    url.pathname = userRole === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirect admins and clinicians visiting the patient dashboard directly to their workspaces
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    if (userRole === "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    if (userRole === "clinician") {
      const url = request.nextUrl.clone();
      url.pathname = "/clinician";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

function isProtectedRoute(pathname: string): boolean {
  const protectedPrefixes = [
    "/dashboard",
    "/assessment",
    "/journeys",
    "/timeline",
    "/follow-ups",
    "/action-plans",
    "/health-passport",
    "/documents",
    "/settings",
    "/admin",
    "/clinician",
  ];
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}
