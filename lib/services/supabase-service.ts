import { SupabaseClient } from "@supabase/supabase-js";
import { healthStore } from "./storage-service";
import type {
  Assessment,
  Symptom,
  AssessmentAnswer,
  RiskAssessment,
  ActionPlan,
  FollowUp,
  FollowUpResponse,
  Reassessment,
  TimelineEvent,
  HealthPassport,
  TriageTier,
} from "@/types/database";

export interface PersistenceResult<T> {
  data: T;
  source: "supabase" | "local_store";
  error?: string;
}

export class SupabaseHealthService {
  /**
   * Save a new assessment
   */
  static async createAssessment(
    supabase: SupabaseClient | null,
    userId: string,
    title: string,
    primaryConcern: string
  ): Promise<PersistenceResult<Assessment>> {
    // Attempt real Supabase insert if client and authenticated user are present
    if (supabase && userId && !userId.startsWith("demo-")) {
      try {
        const { data, error } = await supabase
          .from("assessments")
          .insert({
            user_id: userId,
            title,
            primary_concern: primaryConcern,
            status: "started",
            started_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (!error && data) {
          // Record timeline event
          await this.addTimelineEvent(
            supabase,
            userId,
            data.id,
            "assessment_started",
            "Health Check Initiated",
            `Concern reported: "${primaryConcern}"`
          );

          return {
            data: {
              ...data,
              completed_at: data.completed_at || null,
            },
            source: "supabase",
          };
        }
        console.warn("[Supabase] Insert failed or schema missing, falling back to local store:", error?.message);
      } catch (err: any) {
        console.warn("[Supabase] Network/schema exception:", err?.message);
      }
    }

    // Local demonstration fallback
    const local = healthStore.createAssessment({
      userId,
      title,
      primaryConcern,
    });
    return { data: local, source: "local_store" };
  }

  /**
   * Update assessment status
   */
  static async updateAssessmentStatus(
    supabase: SupabaseClient | null,
    assessmentId: string,
    status: Assessment["status"]
  ): Promise<void> {
    if (supabase && !assessmentId.startsWith("assess-")) {
      try {
        await supabase
          .from("assessments")
          .update({
            status,
            updated_at: new Date().toISOString(),
            ...(status === "completed" || status === "monitoring"
              ? { completed_at: new Date().toISOString() }
              : {}),
          })
          .eq("id", assessmentId);
      } catch (e) {
        // Fallback to local
      }
    }
    healthStore.updateAssessmentStatus(assessmentId, status);
  }

  /**
   * Save extracted symptoms
   */
  static async saveSymptoms(
    supabase: SupabaseClient | null,
    assessmentId: string,
    symptoms: Array<{ name: string; duration: string; severity?: number | null; description?: string | null }>
  ): Promise<void> {
    if (supabase && !assessmentId.startsWith("assess-")) {
      try {
        const records = symptoms.map((s) => ({
          assessment_id: assessmentId,
          name: s.name,
          duration: s.duration,
          severity: s.severity || null,
          description: s.description || null,
        }));
        await supabase.from("symptoms").insert(records);
      } catch (e) {
        // Fallback
      }
    }
    healthStore.addSymptoms(
      assessmentId,
      symptoms.map((s) => ({
        name: s.name,
        duration: s.duration,
        severity: s.severity ?? null,
        description: s.description ?? null,
      }))
    );
  }

  /**
   * Save an answer to an adaptive question
   */
  static async saveAnswer(
    supabase: SupabaseClient | null,
    assessmentId: string,
    question: string,
    answer: string,
    questionType: string
  ): Promise<void> {
    if (supabase && !assessmentId.startsWith("assess-")) {
      try {
        await supabase.from("assessment_answers").insert({
          assessment_id: assessmentId,
          question,
          answer,
          question_type: questionType,
        });
      } catch (e) {
        // Fallback
      }
    }
    healthStore.addAnswer({
      assessmentId,
      question,
      answer,
      questionType,
    });
  }

  /**
   * Save risk triage assessment
   */
  static async saveRiskAssessment(
    supabase: SupabaseClient | null,
    risk: Omit<RiskAssessment, "id" | "created_at">
  ): Promise<PersistenceResult<RiskAssessment>> {
    if (supabase && !risk.assessment_id.startsWith("assess-")) {
      try {
        const { data, error } = await supabase
          .from("risk_assessments")
          .insert({
            assessment_id: risk.assessment_id,
            tier: risk.tier,
            summary: risk.summary,
            key_factors: risk.key_factors,
            uncertainties: risk.uncertainties,
            safety_message: risk.safety_message,
            recommended_next_step: risk.recommended_next_step,
            follow_up_hours: risk.follow_up_hours,
          })
          .select()
          .single();

        if (!error && data) {
          return { data, source: "supabase" };
        }
      } catch (e) {
        // Fallback
      }
    }

    const local = healthStore.saveRiskAssessment(risk);
    return { data: local, source: "local_store" };
  }

  /**
   * Save action plan
   */
  static async saveActionPlan(
    supabase: SupabaseClient | null,
    plan: Omit<ActionPlan, "id" | "created_at" | "updated_at">
  ): Promise<PersistenceResult<ActionPlan>> {
    if (supabase && !plan.assessment_id.startsWith("assess-")) {
      try {
        const { data, error } = await supabase
          .from("action_plans")
          .insert({
            assessment_id: plan.assessment_id,
            summary: plan.summary,
            immediate_steps: plan.immediate_steps,
            monitoring_guidance: plan.monitoring_guidance,
            when_to_seek_care: plan.when_to_seek_care,
            follow_up_timing: plan.follow_up_timing,
            safety_note: plan.safety_note,
          })
          .select()
          .single();

        if (!error && data) {
          return { data, source: "supabase" };
        }
      } catch (e) {
        // Fallback
      }
    }

    const local = healthStore.saveActionPlan(plan);
    return { data: local, source: "local_store" };
  }

  /**
   * Schedule follow-up
   */
  static async scheduleFollowUp(
    supabase: SupabaseClient | null,
    assessmentId: string,
    hours: number
  ): Promise<PersistenceResult<FollowUp>> {
    const scheduledFor = new Date(Date.now() + hours * 3600000).toISOString();

    if (supabase && !assessmentId.startsWith("assess-")) {
      try {
        const { data, error } = await supabase
          .from("follow_ups")
          .insert({
            assessment_id: assessmentId,
            scheduled_for: scheduledFor,
            status: "scheduled",
          })
          .select()
          .single();

        if (!error && data) {
          return { data, source: "supabase" };
        }
      } catch (e) {
        // Fallback
      }
    }

    const local = healthStore.scheduleFollowUp({ assessmentId, hours });
    return { data: local, source: "local_store" };
  }

  /**
   * Complete follow-up check-in
   */
  static async completeFollowUp(
    supabase: SupabaseClient | null,
    followUpId: string,
    outcome: "better" | "same" | "worse" | "new_symptoms",
    severity: number,
    notes: string,
    newSymptoms: string[] = []
  ): Promise<PersistenceResult<FollowUpResponse>> {
    if (supabase && !followUpId.startsWith("fu-") && !followUpId.startsWith("followup-")) {
      try {
        // Mark follow-up as completed
        await supabase
          .from("follow_ups")
          .update({
            status: "completed",
            completed_at: new Date().toISOString(),
          })
          .eq("id", followUpId);

        // Insert response
        const { data, error } = await supabase
          .from("follow_up_responses")
          .insert({
            follow_up_id: followUpId,
            outcome,
            severity,
            notes,
            new_symptoms: newSymptoms,
          })
          .select()
          .single();

        if (!error && data) {
          return { data, source: "supabase" };
        }
      } catch (e) {
        // Fallback
      }
    }

    const local = healthStore.completeFollowUp({
      followUpId,
      outcome,
      severity,
      notes,
      newSymptoms,
    });
    return { data: local, source: "local_store" };
  }

  /**
   * Save reassessment
   */
  static async saveReassessment(
    supabase: SupabaseClient | null,
    reassessment: Omit<Reassessment, "id" | "created_at">
  ): Promise<PersistenceResult<Reassessment>> {
    if (supabase && !reassessment.assessment_id.startsWith("assess-")) {
      try {
        const { data, error } = await supabase
          .from("reassessments")
          .insert({
            assessment_id: reassessment.assessment_id,
            previous_follow_up_id: reassessment.previous_follow_up_id,
            change_summary: reassessment.change_summary,
            change_direction: reassessment.change_direction,
            previous_severity: reassessment.previous_severity,
            current_severity: reassessment.current_severity,
            new_information: reassessment.new_information,
            updated_tier: reassessment.updated_tier,
            updated_next_step: reassessment.updated_next_step,
          })
          .select()
          .single();

        if (!error && data) {
          return {
            data: {
              ...data,
              escalation_reason: reassessment.escalation_reason,
              updated_monitoring_guidance: reassessment.updated_monitoring_guidance,
            },
            source: "supabase",
          };
        }
      } catch (e) {
        // Fallback
      }
    }

    const local = healthStore.saveReassessment(reassessment);
    return { data: local, source: "local_store" };
  }

  /**
   * Add timeline event
   */
  static async addTimelineEvent(
    supabase: SupabaseClient | null,
    userId: string,
    assessmentId: string,
    eventType: string,
    title: string,
    description: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    if (supabase && userId && !userId.startsWith("demo-")) {
      try {
        await supabase.from("timeline_events").insert({
          user_id: userId,
          assessment_id: assessmentId.startsWith("assess-") ? null : assessmentId,
          event_type: eventType,
          title,
          description,
          metadata: metadata || {},
        });
      } catch (e) {
        // Fallback
      }
    }

    healthStore.addTimelineEvent({
      userId,
      assessmentId,
      eventType,
      title,
      description,
      metadata,
    });
  }

  /**
   * Get health passport
   */
  static async getHealthPassport(
    supabase: SupabaseClient | null,
    userId: string
  ): Promise<PersistenceResult<HealthPassport>> {
    if (supabase && userId && !userId.startsWith("demo-")) {
      try {
        const { data, error } = await supabase
          .from("health_passport")
          .select()
          .eq("user_id", userId)
          .single();

        if (!error && data) {
          return { data, source: "supabase" };
        }
      } catch (e) {
        // Fallback
      }
    }

    const local = healthStore.getHealthPassport(userId);
    return { data: local, source: "local_store" };
  }

  /**
   * Update health passport
   */
  static async updateHealthPassport(
    supabase: SupabaseClient | null,
    userId: string,
    passport: Partial<HealthPassport>
  ): Promise<PersistenceResult<HealthPassport>> {
    if (supabase && userId && !userId.startsWith("demo-")) {
      try {
        const { data, error } = await supabase
          .from("health_passport")
          .upsert({
            user_id: userId,
            allergies: passport.allergies || [],
            medications: passport.medications || [],
            conditions: passport.conditions || [],
            important_information: passport.important_information || "",
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (!error && data) {
          return { data, source: "supabase" };
        }
      } catch (e) {
        // Fallback
      }
    }

    const local = healthStore.updateHealthPassport(passport);
    return { data: local, source: "local_store" };
  }
}

