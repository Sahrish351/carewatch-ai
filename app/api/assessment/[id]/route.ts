import { NextResponse } from "next/server";
import { healthStore } from "@/lib/services/storage-service";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing assessment id" }, { status: 400 });
    }

    const assessment = healthStore.getAssessmentById(id);
    const symptoms = healthStore.getSymptoms(id);
    const answers = healthStore.getAnswers(id);
    const riskAssessment = healthStore.getRiskAssessment(id);
    const actionPlan = healthStore.getActionPlan(id);
    const followUps = healthStore.getFollowUps().filter((f) => f.assessment_id === id);

    if (assessment) {
      return NextResponse.json({
        success: true,
        assessment,
        symptoms,
        answers,
        riskAssessment,
        actionPlan,
        followUp: followUps[0] || null,
      });
    }

    // Try Supabase if not found locally
    const supabase = await createClient();
    const { data: dbAssessment } = await supabase
      .from("assessments")
      .select("*")
      .eq("id", id)
      .single();

    if (!dbAssessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    const { data: dbRisk } = await supabase
      .from("risk_assessments")
      .select("*")
      .eq("assessment_id", id)
      .single();

    const { data: dbPlan } = await supabase
      .from("action_plans")
      .select("*")
      .eq("assessment_id", id)
      .single();

    const { data: dbFollowUps } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("assessment_id", id);

    return NextResponse.json({
      success: true,
      assessment: dbAssessment,
      symptoms: [],
      answers: [],
      riskAssessment: dbRisk || null,
      actionPlan: dbPlan || null,
      followUp: dbFollowUps?.[0] || null,
    });
  } catch (error: any) {
    console.error("[API Assessment By ID Error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve assessment" },
      { status: 500 }
    );
  }
}
