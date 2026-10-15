import { NextResponse } from "next/server";
import { followUpAgent } from "@/lib/ai/agents/follow-up-agent";
import { reassessmentAgent } from "@/lib/ai/agents/reassessment-agent";
import { createClient } from "@/lib/supabase/server";
import { SupabaseHealthService } from "@/lib/services/supabase-service";
import { healthStore } from "@/lib/services/storage-service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      followUpId,
      outcome,
      severity,
      notes,
      newSymptoms = [],
      language = "en",
    } = body;

    if (!followUpId || !outcome || typeof severity !== "number") {
      return NextResponse.json({ error: "Missing required check-in fields" }, { status: 400 });
    }

    const supabase = await createClient();
    const followUp = healthStore.getFollowUpById(followUpId);
    if (!followUp) {
      return NextResponse.json({ error: "Follow-up record not found" }, { status: 404 });
    }

    const assessment = healthStore.getAssessmentById(followUp.assessment_id);
    if (!assessment) {
      return NextResponse.json({ error: "Associated assessment not found" }, { status: 404 });
    }

    const risk = healthStore.getRiskAssessment(assessment.id);
    const symptoms = healthStore.getSymptoms(assessment.id);
    const initialSeverity = symptoms[0]?.severity || 4;

    // 1. Complete the follow-up record in Supabase
    const { data: responseRecord } = await SupabaseHealthService.completeFollowUp(
      supabase,
      followUpId,
      outcome,
      severity,
      notes,
      newSymptoms
    );

    // 2. Run Follow-up Agent (evaluating progression vs baseline)
    const checkInAnalysis = await followUpAgent({
      initialConcern: assessment.primary_concern,
      previousTier: risk?.tier || "monitor",
      previousSeverity: initialSeverity,
      checkInOutcome: outcome,
      currentSeverity: severity,
      userNotes: notes,
      newSymptomsReported: newSymptoms,
      language,
    });

    let reassessmentResult = null;

    // 3. If Reassessment needed, trigger Reassessment Agent
    if (checkInAnalysis.reassessment_needed) {
      const reassessment = await reassessmentAgent({
        initialConcern: assessment.primary_concern,
        previousTier: risk?.tier || "monitor",
        previousSeverity: initialSeverity,
        currentSeverity: severity,
        outcome,
        userNotes: notes,
        newSymptoms,
        language,
      });

      const { data: savedReassessment } = await SupabaseHealthService.saveReassessment(
        supabase,
        {
          assessment_id: assessment.id,
          previous_follow_up_id: followUpId,
          change_summary: reassessment.change_summary,
          change_direction: reassessment.change_direction,
          previous_severity: initialSeverity,
          current_severity: severity,
          new_information: reassessment.new_information,
          updated_tier: reassessment.updated_tier,
          updated_next_step: reassessment.updated_next_step,
          escalation_reason: reassessment.escalation_reason,
          updated_monitoring_guidance: reassessment.updated_monitoring_guidance,
        }
      );

      await SupabaseHealthService.updateAssessmentStatus(supabase, assessment.id, "reassessing");
      reassessmentResult = savedReassessment;
    } else if (outcome === "better") {
      await SupabaseHealthService.updateAssessmentStatus(supabase, assessment.id, "resolved");
    }

    return NextResponse.json({
      success: true,
      checkInResponse: responseRecord,
      analysis: checkInAnalysis,
      reassessment: reassessmentResult,
      aiSource: (checkInAnalysis as any)._provenance || { source: "gemini_live", model: "gemini-3.8-flash" },
    });
  } catch (error) {
    console.error("[API Follow-up Error]:", error);
    return NextResponse.json(
      { error: "Failed to process follow-up check-in." },
      { status: 500 }
    );
  }
}
