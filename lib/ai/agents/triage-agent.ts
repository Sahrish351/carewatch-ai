import { TriageSchema, type TriageResult } from "../schemas/agent-schemas";
import { generateStructuredAI } from "../gemini-client";

export async function triageAgent(params: {
  primaryConcern: string;
  symptoms: Array<{ name: string; duration: string; severity?: number | null; description?: string | null }>;
  answers: Array<{ question: string; answer: string; question_type: string }>;
  language?: "en" | "ur_roman";
}): Promise<TriageResult> {
  const { primaryConcern, symptoms, answers, language = "en" } = params;

  const systemInstruction = `You are the CareWatch Triage Agent.
Assess the clinical urgency tier:
- 'self-care': mild, transient discomfort with clear benign features and low severity (<4/10).
- 'monitor': moderate symptoms without red flags, suitable for close observation with scheduled follow-up (24-48 hours).
- 'see-a-doctor': symptoms persisting beyond typical duration, severity 6-8, or concerning pattern requiring in-person professional evaluation within 12-24 hours.
- 'urgent': red flags detected (sudden neurological deficit, high fever with stiff neck, severe chest pain, blackout) requiring immediate emergency medical evaluation.

NEVER DIAGNOSE. Provide clear key factors derived directly from what the user stated.
Highlight uncertainties and limitations.
Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep keys in English" : "English"}.`;

  const userPrompt = `
Primary Concern: "${primaryConcern}"
Symptoms: ${JSON.stringify(symptoms)}
Question & Answer Record:
${answers.map((a) => `- ${a.question}: ${a.answer}`).join("\n")}
`;

  return generateStructuredAI<TriageResult>({
    systemInstruction,
    userPrompt,
    schema: TriageSchema,
    fallback: () => {
      // Clinical safety rules
      const fullText = (primaryConcern + " " + answers.map((a) => a.answer).join(" ")).toLowerCase();
      const hasSeverePain = fullText.includes("7-8") || fullText.includes("9-10") || fullText.includes("severe") || fullText.includes("worse");
      const hasDizziness = fullText.includes("dizz") || fullText.includes("chakkar") || fullText.includes("unstead");
      const hasStiffNeckOrFever = fullText.includes("stiff") || fullText.includes("fever") || fullText.includes("vision");
      const hasChestPainOrBreathing = fullText.includes("chest") || fullText.includes("breath");

      if (hasChestPainOrBreathing || (hasStiffNeckOrFever && hasSeverePain)) {
        return {
          tier: "urgent",
          summary: "Your symptoms include potential red-flag features that warrant immediate emergency medical evaluation.",
          key_factors: [
            "Reported severe discomfort accompanied by high-risk symptoms",
            "Potential compromise of neurological, cardiovascular, or respiratory baseline",
            "Urgent in-person clinical assessment needed to rule out acute secondary causes",
          ],
          uncertainties: [
            "Cannot measure vital signs (blood pressure, oxygen, core temperature) remotely",
            "Cannot perform a physical neurological exam",
          ],
          safety_message: "Do not wait for scheduled follow-ups. If you experience sudden chest pressure, confusion, or speech changes, contact emergency services immediately.",
          recommended_next_step: "Seek immediate evaluation at the nearest emergency department or urgent care facility.",
          follow_up_hours: 6,
        };
      }

      if (hasDizziness || hasSeverePain || fullText.includes("3 days") || fullText.includes("three days")) {
        return {
          tier: "monitor",
          summary: "Your symptoms indicate moderate discomfort that requires structured monitoring and possible healthcare provider review if symptoms do not improve within 24 hours.",
          key_factors: [
            "Duration extending over multiple days without complete spontaneous resolution",
            "Associated mild dizziness or posture-related unsteadiness reported",
            "Absence of acute emergency red flags such as loss of consciousness or focal weakness",
          ],
          uncertainties: [
            "Underlying hydration status, sleep hygiene, and blood pressure are unmeasured",
            "Exact etiology requires a physical clinical consultation if progression continues",
          ],
          safety_message: "If you develop sudden sharp onset, confusion, repeated vomiting, or fever, escalate immediately to medical attention.",
          recommended_next_step: "Initiate structured rest and hydration. Keep track of symptom progression for our 24-hour check-in.",
          follow_up_hours: 24,
        };
      }

      return {
        tier: "self-care",
        summary: "Your reported symptoms currently align with mild, self-limiting discomfort manageable with conservative supportive care.",
        key_factors: [
          "Mild to moderate intensity with no reported red-flag symptoms",
          "Short duration with stable pattern",
          "Able to maintain daily activities without severe functional impairment",
        ],
        uncertainties: [
          "Remote assessment cannot replace direct clinical observation",
          "Symptoms may evolve over the next 24 to 48 hours",
        ],
        safety_message: "If symptoms worsen, new symptoms appear, or relief does not occur after 48 hours, seek in-person medical guidance.",
        recommended_next_step: "Rest, ensure adequate hydration, and log your status during your scheduled follow-up.",
        follow_up_hours: 48,
      };
    },
  });
}

