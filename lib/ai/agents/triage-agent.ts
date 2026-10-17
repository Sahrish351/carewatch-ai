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
Assess the clinical urgency tier for the user's specific concern: "${primaryConcern}".

URGENCY TIERS:
- 'self-care': mild, transient discomfort (<4/10) with clear benign features.
- 'monitor': moderate symptoms without red flags, suitable for close observation with scheduled follow-up (24-48 hours).
- 'see-a-doctor': symptoms persisting beyond typical duration, severity 6-8, or concerning pattern requiring in-person professional evaluation within 12-24 hours.
- 'urgent': red flags detected (severe chest pressure, breathing failure, acute severe abdominal rigidity, sudden neurological deficit, high fever with stiff neck) requiring immediate emergency medical evaluation.

CRITICAL INSTRUCTIONS:
1. NEVER DIAGNOSE a disease. Provide non-diagnostic clinical navigation.
2. Directly refer to the user's concern ("${primaryConcern}") and answers.
3. Return valid JSON matching the schema:
   - "tier": 'self-care' | 'monitor' | 'see-a-doctor' | 'urgent'
   - "summary": 2-3 sentences non-diagnostic explanation of why this tier was assigned.
   - "key_factors": Array of 3 specific observable factors reported by the patient.
   - "uncertainties": Array of clinical unknowns (e.g. unmeasured vitals, physical exam limitations).
   - "safety_message": Warning signs that necessitate emergency care.
   - "recommended_next_step": Primary actionable navigation step.
   - "follow_up_hours": number (6 for urgent, 12-24 for see-a-doctor/monitor, 48 for self-care).
Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep JSON keys in English" : "English"}.`;

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
      const fullText = (primaryConcern + " " + answers.map((a) => a.answer).join(" ")).toLowerCase();
      const hasEmergency = fullText.includes("chest pain") || fullText.includes("breathing") || fullText.includes("unconscious") || fullText.includes("blackout");
      const hasSevere = fullText.includes("7-8") || fullText.includes("9-10") || fullText.includes("severe") || fullText.includes("worse") || fullText.includes("getting progressively worse");
      const concernTitle = primaryConcern.length > 35 ? primaryConcern.slice(0, 32) + "..." : primaryConcern;

      if (hasEmergency) {
        return {
          tier: "urgent",
          summary: `Your symptoms for "${concernTitle}" include critical warning signs that require immediate emergency evaluation.`,
          key_factors: [
            "Severe discomfort with potential cardiovascular, respiratory, or acute red flags",
            "Urgent in-person clinical assessment needed to rule out serious underlying causes",
            "High risk of rapid clinical progression without immediate intervention",
          ],
          uncertainties: [
            "Cannot measure vital signs (blood pressure, oxygen levels, heart rate) remotely",
            "Cannot perform direct physical diagnostic exams",
          ],
          safety_message: "Do not wait for scheduled follow-ups. Call emergency services (e.g. 911 / 1122) immediately or proceed to the nearest emergency department.",
          recommended_next_step: "Seek immediate emergency medical evaluation.",
          follow_up_hours: 6,
        };
      }

      if (hasSevere) {
        return {
          tier: "see-a-doctor",
          summary: `Your symptoms for "${concernTitle}" indicate persistent or elevated discomfort that warrants an in-person healthcare provider evaluation.`,
          key_factors: [
            "Elevated symptom severity or progression over observation period",
            "Functional impact on daily activities noted in assessment responses",
            "Absence of immediate collapse but requiring formal physical examination",
          ],
          uncertainties: [
            "Exact etiology requires clinical palpation, imaging, or laboratory tests",
            "Underlying vitals and blood chemistry remain unmeasured",
          ],
          safety_message: "If you experience sudden sharp deterioration, difficulty breathing, or severe pain spikes, seek emergency care immediately.",
          recommended_next_step: "Schedule an appointment with your doctor or urgent care clinic for physical evaluation.",
          follow_up_hours: 12,
        };
      }

      if (fullText.includes("day") || fullText.includes("moderate") || fullText.includes("4-6")) {
        return {
          tier: "monitor",
          summary: `Your symptoms for "${concernTitle}" show moderate discomfort suitable for close monitoring with our scheduled follow-up.`,
          key_factors: [
            "Moderate discomfort without immediate red-flag indicators",
            "Duration requires proactive observation to verify steady recovery",
            "Patient remains functionally stable and alert",
          ],
          uncertainties: [
            "Symptom trajectory over the next 24 hours cannot be predicted with certainty",
            "Remote review cannot measure physical baseline parameters",
          ],
          safety_message: "If symptoms worsen, new concerning signs develop, or pain intensifies, escalate to in-person medical care.",
          recommended_next_step: "Rest, maintain adequate hydration, and complete your scheduled check-in.",
          follow_up_hours: 24,
        };
      }

      return {
        tier: "self-care",
        summary: `Your symptoms for "${concernTitle}" currently align with mild, self-limiting discomfort manageable with conservative supportive measures.`,
        key_factors: [
          "Mild intensity with stable baseline",
          "Absence of reported red-flag or systemic warning signs",
          "Able to manage daily activities safely",
        ],
        uncertainties: [
          "Remote check cannot substitute for direct physical assessment",
          "Condition may evolve if exposed to aggravating triggers",
        ],
        safety_message: "If symptoms do not improve within 48 hours or intensify, seek professional medical guidance.",
        recommended_next_step: "Apply supportive comfort measures and update your status in our follow-up check-in.",
        follow_up_hours: 48,
      };
    },
  });
}

