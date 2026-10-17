import { z } from "zod";
import { generateStructuredAI } from "../gemini-client";
import type { TriageTier } from "@/types/database";

export const ExplanationSchema = z.object({
  why_recommendation: z
    .union([z.array(z.string()), z.string()])
    .transform((v) => (typeof v === "string" ? [v] : v))
    .default([]),
  what_is_uncertain: z
    .union([z.array(z.string()), z.string()])
    .transform((v) => (typeof v === "string" ? [v] : v))
    .default([]),
  what_could_change_this: z
    .union([z.array(z.string()), z.string()])
    .transform((v) => (typeof v === "string" ? [v] : v))
    .default([]),
});
export type ExplanationResult = z.infer<typeof ExplanationSchema>;

export async function explanationAgent(params: {
  primaryConcern: string;
  tier: TriageTier;
  symptoms: Array<{ name: string; duration: string }>;
  answers: Array<{ question: string; answer: string }>;
  language?: "en" | "ur_roman";
}): Promise<ExplanationResult> {
  const { primaryConcern, tier, symptoms, answers, language = "en" } = params;

  const systemInstruction = `You are the CareWatch Explanation Agent.
Produce clear, transparent, and safe non-technical clinical explanations for the user's recommendation.
RULES:
1. DO NOT reveal private chain-of-thought or claim to reveal internal neural network weights.
2. Formulate 3 distinct sections:
   - 'why_recommendation': specific facts provided by the patient.
   - 'what_is_uncertain': remote assessment limitations (no vitals, no palpation, no imaging).
   - 'what_could_change_this': specific trigger events that require reassessment.
Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep keys in English" : "English"}.`;

  const userPrompt = `
Primary Concern: "${primaryConcern}"
Urgency Tier: "${tier}"
Symptoms: ${JSON.stringify(symptoms)}
Answers: ${JSON.stringify(answers)}
`;

  return generateStructuredAI<ExplanationResult>({
    systemInstruction,
    userPrompt,
    schema: ExplanationSchema,
    fallback: () => {
      return {
        why_recommendation: [
          `Symptoms described: ${symptoms.map((s) => s.name).join(", ") || primaryConcern}.`,
          `Reported timeline and characteristics align with a ${tier.replace("-", " ")} observation pathway.`,
          "No acute emergent indicators (such as loss of consciousness or unilateral paralysis) were reported.",
        ],
        what_is_uncertain: [
          "Actual blood pressure, pulse, temperature, and oxygen saturation are unmeasured.",
          "Physical neurological and abdominal palpation examinations have not been conducted.",
          "Individual medication tolerance and unstated pre-existing conditions may alter risk.",
        ],
        what_could_change_this: [
          "Symptom intensity climbing above 6/10 on the discomfort scale.",
          "Development of dizziness, high fever, neck stiffness, or visual field deficits.",
          "Lack of noticeable improvement after the scheduled follow-up window.",
        ],
      };
    },
  });
}

