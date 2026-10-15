import { NextResponse } from "next/server";
import { triageAgent } from "@/lib/ai/agents/triage-agent";
import { evidenceAgent } from "@/lib/ai/agents/evidence-agent";
import { actionPlanAgent } from "@/lib/ai/agents/action-plan-agent";
import { explanationAgent } from "@/lib/ai/agents/explanation-agent";
import { createClient } from "@/lib/supabase/server";
import { SupabaseHealthService } from "@/lib/services/supabase-service";
import { healthStore } from "@/lib/services/storage-service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { assessmentId, language = "en" } = body;

    if (!assessmentId) {
      return NextResponse.json({ error: "Assessment ID is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const assessment = healthStore.getAssessmentById(assessmentId);
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    const symptoms = healthStore.getSymptoms(assessmentId);
    const answers = healthStore.getAnswers(assessmentId);

    // 1. Run Triage Agent
    const triageResult = await triageAgent({
      primaryConcern: assessment.primary_concern,
      symptoms,
      answers,
      language,
    });

    // 2. Run Evidence Agent
    const evidenceList = await evidenceAgent({
      primaryConcern: assessment.primary_concern,
      symptoms,
      tier: triageResult.tier,
    });

    // 3. Run Action Plan Agent
    const actionPlanResult = await actionPlanAgent({
      primaryConcern: assessment.primary_concern,
      tier: triageResult.tier,
      summary: triageResult.summary,
      keyFactors: triageResult.key_factors,
      followUpHours: triageResult.follow_up_hours,
      language,
    });

    // 4. Run Explanation Agent (Why / Uncertainties / What could change)
    const explanationResult = await explanationAgent({
      primaryConcern: assessment.primary_concern,
      tier: triageResult.tier,
      symptoms,
      answers,
      language,
    });

    // 5. Persist Risk Assessment & Action Plan to Supabase
    const { data: savedRisk, source: riskSource } = await SupabaseHealthService.saveRiskAssessment(
      supabase,
      {
        assessment_id: assessmentId,
        tier: triageResult.tier,
        summary: triageResult.summary,
        key_factors: explanationResult.why_recommendation,
        uncertainties: explanationResult.what_is_uncertain,
        safety_message: triageResult.safety_message,
        recommended_next_step: triageResult.recommended_next_step,
        follow_up_hours: triageResult.follow_up_hours,
      }
    );

    const { data: savedPlan } = await SupabaseHealthService.saveActionPlan(supabase, {
      assessment_id: assessmentId,
      summary: actionPlanResult.summary,
      immediate_steps: actionPlanResult.immediate_steps,
      monitoring_guidance: actionPlanResult.monitoring_guidance,
      when_to_seek_care: actionPlanResult.when_to_seek_care,
      follow_up_timing: actionPlanResult.follow_up_timing,
      safety_note: actionPlanResult.safety_note,
    });

    // 6. Schedule Follow-up in Supabase
    const { data: scheduledFollowUp } = await SupabaseHealthService.scheduleFollowUp(
      supabase,
      assessmentId,
      triageResult.follow_up_hours
    );

    await SupabaseHealthService.updateAssessmentStatus(
      supabase,
      assessmentId,
      triageResult.tier === "urgent" ? "completed" : "monitoring"
    );

    return NextResponse.json({
      success: true,
      assessmentId,
      riskAssessment: savedRisk,
      actionPlan: savedPlan,
      evidence: evidenceList,
      explanation: explanationResult,
      followUp: scheduledFollowUp,
      persistence: riskSource,
      aiSource: (triageResult as any)._provenance || { source: "gemini_live", model: "gemini-3.8-flash" },
    });
  } catch (error) {
    console.error("[API Triage Error]:", error);
    return NextResponse.json(
      { error: "Failed to perform triage assessment." },
      { status: 500 }
    );
  }
}
