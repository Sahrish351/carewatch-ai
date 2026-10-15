import { ActionPlanSchema, type ActionPlanResult } from "../schemas/agent-schemas";
import { generateStructuredAI } from "../gemini-client";
import type { TriageTier } from "@/types/database";

export async function actionPlanAgent(params: {
  primaryConcern: string;
  tier: TriageTier;
  summary: string;
  keyFactors: string[];
  followUpHours: number;
  language?: "en" | "ur_roman";
}): Promise<ActionPlanResult> {
  const { primaryConcern, tier, summary, keyFactors, followUpHours, language = "en" } = params;

  const systemInstruction = `You are the CareWatch Action Plan Agent.
Create an evidence-informed next-step action plan tailored to the user's situation.
DO NOT PRESCRIBE MEDICATIONS.
Provide concrete, comforting, scannable steps:
1. Immediate steps: What comfort or safety steps to take right now.
2. Monitoring guidance: Specific symptoms or parameters to watch.
3. When to seek care: Explicit warning signs that should trigger immediate clinic or ER contact.
4. Follow-up timing: When the user should complete their scheduled CareWatch check-in.
5. Safety note: A clear, calm safety disclaimer.
Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep keys in English" : "English"}.`;

  const userPrompt = `
Primary Concern: "${primaryConcern}"
Urgency Tier: "${tier}"
Summary: "${summary}"
Key Factors: ${JSON.stringify(keyFactors)}
Recommended Follow-up window: ${followUpHours} hours.
`;

  return generateStructuredAI<ActionPlanResult>({
    systemInstruction,
    userPrompt,
    schema: ActionPlanSchema,
    fallback: () => {
      if (tier === "urgent") {
        return {
          summary: "Immediate medical evaluation is advised due to reported symptoms.",
          immediate_steps: [
            "Stop physical exertion and sit or lie down in a safe, comfortable position.",
            "Contact someone nearby to remain with you.",
            "Arrange immediate transportation to the nearest emergency clinic or call emergency medical services.",
          ],
          monitoring_guidance: [
            "Monitor breathing regularity and state of alertness.",
            "Observe for any sudden speech difficulty, numbness, or visual darkening.",
          ],
          when_to_seek_care: [
            "Any chest tightness or radiating pain to the arm or jaw.",
            "Sudden severe worst-of-life headache or severe vomiting.",
            "Inability to stand, speak clearly, or severe confusion.",
          ],
          follow_up_timing: "Immediate emergency care. Do not wait for standard check-ins.",
          safety_note: "CareWatch AI does not replace emergency medical triage. Seek in-person emergency care immediately.",
        };
      }

      if (tier === "see-a-doctor") {
        return {
          summary: "Schedule an appointment with a primary care provider or visit urgent care.",
          immediate_steps: [
            "Contact your primary care clinic or visit a local walk-in urgent care facility today.",
            "Rest in a quiet, temperate environment and drink small, frequent sips of water.",
            "Note down how long each symptom lasts to share directly with the doctor.",
          ],
          monitoring_guidance: [
            "Check symptom intensity every 4-6 hours.",
            "Record whether position changes worsen or relieve the discomfort.",
          ],
          when_to_seek_care: [
            "Progression of pain beyond 7/10 severity.",
            "New onset of fever, neck stiffness, or sudden unsteady gait.",
          ],
          follow_up_timing: `Within ${followUpHours} hours to confirm whether you have been evaluated or if symptoms shift.`,
          safety_note: "This plan helps prepare you for a physician visit and is not a formal medical diagnosis.",
        };
      }

      if (tier === "monitor") {
        return {
          summary: "Initiate structured supportive care and monitor closely for the next 24 to 48 hours.",
          immediate_steps: [
            "Hydrate steadily with water or electrolyte-balanced fluids.",
            "Rest in a dimly lit, quiet space with minimal screen exposure.",
            "Apply a cool or warm compress to forehead or neck depending on comfort preference.",
          ],
          monitoring_guidance: [
            "Check severity twice daily using a 1-10 scale.",
            "Watch for any new symptoms such as dizziness upon standing, nausea, or visual changes.",
          ],
          when_to_seek_care: [
            "Sudden spike in headache severity or persistent vomiting.",
            "Onset of high fever or stiff neck.",
            "Failure to improve after 48-72 hours.",
          ],
          follow_up_timing: `Scheduled automated check-in in ${followUpHours} hours.`,
          safety_note: "CareWatch is monitoring your recovery trajectory. If your condition deteriorates, seek prompt in-person medical care.",
        };
      }

      return {
        summary: "Supportive home self-care and recovery observation.",
        immediate_steps: [
          "Ensure adequate rest and maintain comfortable hydration.",
          "Avoid excessive screen time, loud noise, and strenuous physical exertion.",
          "Eat light, easily digestible meals.",
        ],
        monitoring_guidance: [
          "Observe if symptoms diminish over the next 24 hours.",
          "Check whether normal energy levels return.",
        ],
        when_to_seek_care: [
          "Symptoms worsen rather than improve over the next 48 hours.",
          "Appearance of any new unexpected symptoms.",
        ],
        follow_up_timing: `Check-in scheduled in ${followUpHours} hours.`,
        safety_note: "Designed for self-monitoring guidance only. Seek professional care whenever in doubt.",
      };
    },
  });
}

