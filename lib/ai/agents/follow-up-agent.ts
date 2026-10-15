import { FollowUpCheckInSchema, type FollowUpCheckInResult } from "../schemas/agent-schemas";
import { generateStructuredAI } from "../gemini-client";
import type { TriageTier } from "@/types/database";

export async function followUpAgent(params: {
  initialConcern: string;
  previousTier: TriageTier;
  previousSeverity: number;
  checkInOutcome: "better" | "same" | "worse" | "new_symptoms";
  currentSeverity: number;
  userNotes: string;
  newSymptomsReported?: string[];
  language?: "en" | "ur_roman";
}): Promise<FollowUpCheckInResult> {
  const {
    initialConcern,
    previousTier,
    previousSeverity,
    checkInOutcome,
    currentSeverity,
    userNotes,
    newSymptomsReported = [],
    language = "en",
  } = params;

  const systemInstruction = `You are the CareWatch Follow-up Agent.
Analyze the user's check-in update in comparison to their original health assessment baseline.
Assess whether the condition is:
- improving
- stable
- worsening
- developing new symptoms
Determine whether a clinical reassessment must be triggered (true if worsening, new symptoms, or severity increased significantly).
Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep keys in English" : "English"}.`;

  const userPrompt = `
Initial Concern: "${initialConcern}"
Initial Tier: "${previousTier}" (Baseline Severity: ${previousSeverity}/10)
Current Check-in Status: "${checkInOutcome}" (Current Severity: ${currentSeverity}/10)
User Notes: "${userNotes}"
New Symptoms: ${JSON.stringify(newSymptomsReported)}
`;

  return generateStructuredAI<FollowUpCheckInResult>({
    systemInstruction,
    userPrompt,
    schema: FollowUpCheckInSchema,
    fallback: () => {
      const isWorsening =
        checkInOutcome === "worse" ||
        checkInOutcome === "new_symptoms" ||
        currentSeverity > previousSeverity ||
        newSymptomsReported.length > 0;

      if (isWorsening) {
        return {
          interpretation: `User reported deterioration or new symptoms. Severity changed from ${previousSeverity}/10 to ${currentSeverity}/10. Clinical reassessment is indicated.`,
          change_direction: checkInOutcome === "new_symptoms" ? "new_symptoms" : "worsening",
          reassessment_needed: true,
          clinical_notes: `Escalation indicated due to worsening trajectory and reported additional factors: ${userNotes}`,
        };
      }

      if (checkInOutcome === "better") {
        return {
          interpretation: `Symptoms are improving as expected. Severity decreased from ${previousSeverity}/10 to ${currentSeverity}/10. Supportive recovery continues.`,
          change_direction: "improving",
          reassessment_needed: false,
          clinical_notes: "Favorable progress. Continue monitoring until full resolution.",
        };
      }

      return {
        interpretation: `Symptoms remain stable at ${currentSeverity}/10. Continued observation advised.`,
        change_direction: "stable",
        reassessment_needed: false,
        clinical_notes: "Plateau noted. Will follow up in the next scheduled cycle if no improvement occurs.",
      };
    },
  });
}

