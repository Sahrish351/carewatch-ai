import { z } from "zod";

// 1. Intake Agent Schema
export const IntakeSchema = z.object({
  extracted_concern: z.string().describe("Clean concise summary of the primary concern"),
  symptoms: z.array(
    z.object({
      name: z.string().default("Reported symptom"),
      duration: z.string().optional().default("Recent onset"),
      severity: z
        .union([z.number(), z.string()])
        .transform((val) => {
          if (typeof val === "number") return val;
          const parsed = parseInt(val, 10);
          return isNaN(parsed) ? 5 : Math.max(1, Math.min(10, parsed));
        })
        .nullable()
        .optional()
        .default(5),
      description: z.string().optional().default(""),
    })
  ).default([]),
  context_factors: z.array(z.string()).optional().default([]),
  missing_critical_info: z.array(z.string()).optional().default([]),
  initial_safety_flag: z.boolean().optional().default(false),
});
export type IntakeResult = z.infer<typeof IntakeSchema>;

// 2. Question Agent Schema
export const QuestionSchema = z.object({
  question: z.string().describe("A single, clear, empathetic question in plain language"),
  reason: z.string().optional().default("To evaluate clinical urgency and safety"),
  question_type: z.string().optional().default("general"),
  options: z.array(z.string()).optional().default([]),
  sufficient_information_gathered: z.boolean().optional().default(false),
});
export type QuestionResult = z.infer<typeof QuestionSchema>;

// 3. Triage Agent Schema
export const TriageSchema = z.object({
  tier: z.enum(["self-care", "monitor", "see-a-doctor", "urgent"]).catch("monitor"),
  summary: z.string().describe("Clear, plain-language non-diagnostic summary of the clinical picture"),
  key_factors: z.array(z.string()).optional().default([]),
  uncertainties: z.array(z.string()).optional().default([]),
  safety_message: z.string().optional().default("If symptoms worsen significantly or acute pain develops, seek immediate medical care."),
  recommended_next_step: z.string().optional().default("Monitor your symptoms and complete the scheduled check-in."),
  follow_up_hours: z
    .union([z.number(), z.string()])
    .transform((val) => {
      if (typeof val === "number") return val;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 24 : Math.max(1, Math.min(168, parsed));
    })
    .optional()
    .default(24),
});
export type TriageResult = z.infer<typeof TriageSchema>;

// 4. Action Plan Agent Schema
export const ActionPlanSchema = z.object({
  summary: z.string(),
  immediate_steps: z.array(z.string()).optional().default([]),
  monitoring_guidance: z.array(z.string()).optional().default([]),
  when_to_seek_care: z.array(z.string()).optional().default([]),
  follow_up_timing: z.string().optional().default("Automated check-in scheduled in 24 hours"),
  safety_note: z.string().optional().default("CareWatch AI provides navigation guidance and does not replace medical diagnosis."),
});
export type ActionPlanResult = z.infer<typeof ActionPlanSchema>;

// 5. Follow-up / Check-in Agent Schema
export const FollowUpCheckInSchema = z.object({
  interpretation: z.string().describe("AI analysis of current state versus initial baseline"),
  change_direction: z.enum(["improving", "stable", "worsening", "new_symptoms"]).catch("stable"),
  reassessment_needed: z.boolean().optional().default(false),
  clinical_notes: z.string().optional().default(""),
});
export type FollowUpCheckInResult = z.infer<typeof FollowUpCheckInSchema>;

// 6. Reassessment Agent Schema
export const ReassessmentSchema = z.object({
  change_summary: z.string().describe("Clear summary comparing initial state with current check-in state"),
  change_direction: z.enum(["improving", "stable", "worsening", "new_symptoms"]).catch("stable"),
  new_information: z.array(z.string()).optional().default([]),
  updated_tier: z.enum(["self-care", "monitor", "see-a-doctor", "urgent"]).catch("monitor"),
  updated_next_step: z.string().optional().default("Follow updated recovery recommendations."),
  escalation_reason: z.string().optional().default("Updated clinical evaluation."),
  updated_monitoring_guidance: z.array(z.string()).optional().default([]),
});
export type ReassessmentResult = z.infer<typeof ReassessmentSchema>;


