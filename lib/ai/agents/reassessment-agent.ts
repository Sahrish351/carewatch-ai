import { ReassessmentSchema, type ReassessmentResult } from "../schemas/agent-schemas";
import { generateStructuredAI } from "../gemini-client";
import type { TriageTier } from "@/types/database";

export async function reassessmentAgent(params: {
  initialConcern: string;
  previousTier: TriageTier;
  previousSeverity: number;
  currentSeverity: number;
  outcome: "better" | "same" | "worse" | "new_symptoms";
  userNotes: string;
  newSymptoms: string[];
  language?: "en" | "ur_roman";
}): Promise<ReassessmentResult> {
  const {
    initialConcern,
    previousTier,
    previousSeverity,
    currentSeverity,
    outcome,
    userNotes,
    newSymptoms,
    language = "en",
  } = params;

  const systemInstruction = `You are the CareWatch Reassessment Agent.
Compare the previous assessment with the latest follow-up report.
Evaluate the severity change, any newly emerged symptoms, and update the urgency tier safely.
Do not diagnose diseases. Explain why the pathway shifted and outline the new recommended next step.
Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep keys in English" : "English"}.`;

  const userPrompt = `
Initial Concern: "${initialConcern}"
Previous Assessment Tier: "${previousTier}" (Severity: ${previousSeverity}/10)
Latest Follow-up:
- Outcome: ${outcome}
- Current Severity: ${currentSeverity}/10 (Change: ${currentSeverity - previousSeverity > 0 ? "+" : ""}${currentSeverity - previousSeverity})
- User Notes: "${userNotes}"
- New Symptoms: ${JSON.stringify(newSymptoms)}
`;

  return generateStructuredAI<ReassessmentResult>({
    systemInstruction,
    userPrompt,
    schema: ReassessmentSchema,
    fallback: () => {
      // Demo scenario logic matching the specification:
      // "Headache 3 days -> Check-in: Severity 4/10 to 7/10 + dizziness -> Reassessment: See a doctor"
      const delta = currentSeverity - previousSeverity;
      const hasDizziness = newSymptoms.some((s) => s.toLowerCase().includes("dizz")) || userNotes.toLowerCase().includes("dizz") || userNotes.toLowerCase().includes("chakkar");
      const isUrgent = currentSeverity >= 8 || userNotes.toLowerCase().includes("chest") || userNotes.toLowerCase().includes("stiff neck");

      let updated_tier: TriageTier = "see-a-doctor";
      let updated_next_step = "Arrange an in-person clinical evaluation with a primary care doctor or urgent care clinic today.";
      let escalation_reason = "Symptoms escalated in severity and duration without expected improvement.";

      if (isUrgent) {
        updated_tier = "urgent";
        updated_next_step = "Proceed to the nearest urgent care or emergency medical center for comprehensive evaluation.";
        escalation_reason = "Severe symptom escalation or high-risk features detected.";
      } else if (hasDizziness || delta >= 2) {
        updated_tier = "see-a-doctor";
        updated_next_step = "Consult a healthcare provider today for an in-person physical assessment.";
        escalation_reason = `Symptom severity escalated from ${previousSeverity}/10 to ${currentSeverity}/10 with newly reported dizziness and persistence over multiple days.`;
      }

      return {
        change_summary: `Condition progressed from baseline severity of ${previousSeverity}/10 to ${currentSeverity}/10 with additional symptoms noted (${newSymptoms.join(", ") || userNotes || "increased intensity"}).`,
        change_direction: outcome === "new_symptoms" ? "new_symptoms" : "worsening",
        new_information: [
          `Severity escalated by +${delta} points (currently ${currentSeverity}/10)`,
          ...(newSymptoms.length > 0 ? [`New symptoms: ${newSymptoms.join(", ")}`] : []),
          ...(userNotes ? [`Patient notes: "${userNotes}"`] : []),
        ],
        updated_tier,
        updated_next_step,
        escalation_reason,
        updated_monitoring_guidance: [
          "Avoid driving or walking unassisted if dizziness or unsteadiness is present",
          "Maintain seated or reclined position while awaiting medical consultation",
          "Escalate immediately to emergency care if vision changes, severe vomiting, or limb weakness occur",
        ],
      };
    },
  });
}

