import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { healthStore } from "@/lib/services/storage-service";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));

    const userId = user?.id || "demo-user-carewatch";

    // 1. Get local in-memory store data
    const localAssessments = healthStore.getAssessments(userId);
    const localRisks = healthStore.getAllRiskAssessments();
    const localPlans = healthStore.getAllActionPlans();
    const localFollowUps = healthStore.getFollowUps();
    const localTimeline = healthStore.getTimelineEvents(userId);

    // 2. If real Supabase session, try fetching from Supabase
    let dbAssessments = [];
    if (supabase && user && !user.id.startsWith("demo-")) {
      try {
        const { data, error } = await supabase
          .from("assessments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (!error && data) {
          dbAssessments = data;
        }
      } catch (err) {
        console.warn("[API List] Supabase query fallback to local:", err);
      }
    }

    // Combine and deduplicate assessments
    const assessmentMap = new Map();
    // In-memory newest first
    localAssessments.forEach((a) => assessmentMap.set(a.id, a));
    dbAssessments.forEach((a) => assessmentMap.set(a.id, a));

    const combinedAssessments = Array.from(assessmentMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      success: true,
      assessments: combinedAssessments,
      riskAssessments: localRisks,
      actionPlans: localPlans,
      followUps: localFollowUps,
      timelineEvents: localTimeline,
    });
  } catch (error: any) {
    console.error("[API Assessment List Error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve assessments" },
      { status: 500 }
    );
  }
}
