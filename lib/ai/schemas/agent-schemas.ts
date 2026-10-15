import { z } from "zod";

// 1. Intake Agent Schema
export const IntakeSchema = z.object({
  extracted_concern: z.string().describe("Clean concise summary of the primary concern"),
  symptoms: z.array(
    z.object({
      name: z.string(),
      duration: z.string(),
      severity: z.number().min(1).max(10).nullable().optional(),
      description: z.string().optional(),
    })
  ),
  context_factors: z.array(z.string()).describe("Pertinent triggers, context, or medical background"),
  missing_critical_info: z.array(z.string()).describe("Information needed before safe triage can occur"),
  initial_safety_flag: z.boolean().describe("True if overt emergency signs like severe chest pain, breathing stop are present"),
});
export type IntakeResult = z.infer<typeof IntakeSchema>;

// 2. Question Agent Schema
export const QuestionSchema = z.object({
  question: z.string().describe("A single, clear, empathetic question in plain language"),
  reason: z.string().describe("Why this clinical question is necessary"),
  question_type: z.enum(["duration", "severity", "triggers", "associated_symptoms", "red_flag_check", "general"]),
  options: z.array(z.string()).optional().describe("Optional quick selection choices for mobile ease"),
  sufficient_information_gathered: z.boolean().describe("Whether enough info is gathered to proceed to triage"),
});
export type QuestionResult = z.infer<typeof QuestionSchema>;

// 3. Triage Agent Schema
export const TriageSchema = z.object({
  tier: z.enum(["self-care", "monitor", "see-a-doctor", "urgent"]),
  summary: z.string().describe("Clear, plain-language non-diagnostic summary of the clinical picture"),
  key_factors: z.array(z.string()).describe("Top 3-5 observable factors provided by the user that led to this tier"),
  uncertainties: z.array(z.string()).describe("Crucial clinical unknowns or diagnostic limitations"),
  safety_message: z.string().describe("Immediate warning signs that mandate immediate medical escalation"),
  recommended_next_step: z.string().describe("The primary actionable recommendation"),
  follow_up_hours: z.number().min(1).max(168).describe("Scheduled follow-up check-in interval in hours"),
});
export type TriageResult = z.infer<typeof TriageSchema>;

// 4. Action Plan Agent Schema
export const ActionPlanSchema = z.object({
  summary: z.string(),
  immediate_steps: z.array(z.string()).describe("Practical, non-pharmacological comfort and safety steps"),
  monitoring_guidance: z.array(z.string()).describe("What to observe and check regularly"),
  when_to_seek_care: z.array(z.string()).describe("Red flag symptoms that require escalation to clinic or ER"),
  follow_up_timing: z.string().describe("Plain language time window for check-in"),
  safety_note: z.string().describe("Clear disclaimer that this is navigation advice, not diagnosis"),
});
export type ActionPlanResult = z.infer<typeof ActionPlanSchema>;

// 5. Follow-up / Check-in Agent Schema
export const FollowUpCheckInSchema = z.object({
  interpretation: z.string().describe("AI analysis of current state versus initial baseline"),
  change_direction: z.enum(["improving", "stable", "worsening", "new_symptoms"]),
  reassessment_needed: z.boolean().describe("True if condition worsened, new red flags appeared, or plateaued dangerously"),
  clinical_notes: z.string(),
});
export type FollowUpCheckInResult = z.infer<typeof FollowUpCheckInSchema>;

// 6. Reassessment Agent Schema
export const ReassessmentSchema = z.object({
  change_summary: z.string().describe("Clear summary comparing initial state with current check-in state"),
  change_direction: z.enum(["improving", "stable", "worsening", "new_symptoms"]),
  new_information: z.array(z.string()),
  updated_tier: z.enum(["self-care", "monitor", "see-a-doctor", "urgent"]),
  updated_next_step: z.string().describe("Updated actionable clinical pathway"),
  escalation_reason: z.string().describe("Why the recommendation escalated or shifted"),
  updated_monitoring_guidance: z.array(z.string()),
});
export type ReassessmentResult = z.infer<typeof ReassessmentSchema>;

