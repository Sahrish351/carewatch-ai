import { IntakeSchema, type IntakeResult } from "../schemas/agent-schemas";
import { generateStructuredAI } from "../gemini-client";

export async function intakeAgent(params: {
  userInput: string;
  language?: "en" | "ur_roman";
}): Promise<IntakeResult> {
  const { userInput, language = "en" } = params;

  const systemInstruction = `You are the CareWatch Intake Agent.
Analyze the user's initial health concern.
Extract primary symptoms, duration, severity if mentioned, context factors, and identify what critical clinical information is missing.
Identify if any immediate red flags are present (e.g. crushing chest pain, difficulty breathing, sudden face drooping).
Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep keys in English" : "English"}.`;

  const userPrompt = `User's reported concern: "${userInput}"`;

  return generateStructuredAI<IntakeResult>({
    systemInstruction,
    userPrompt,
    schema: IntakeSchema,
    fallback: () => {
      // Clinical deterministic fallback based on keywords
      const lower = userInput.toLowerCase();
      const hasHeadache = lower.includes("headache") || lower.includes("sar dard") || lower.includes("head");
      const hasDizziness = lower.includes("dizzy") || lower.includes("chakkar") || lower.includes("dizziness");
      const hasFever = lower.includes("fever") || lower.includes("bukhar") || lower.includes("temp");
      const hasEmergency = lower.includes("chest pain") || lower.includes("breathing") || lower.includes("unconscious");

      const symptoms = [];
      if (hasHeadache) {
        symptoms.push({
          name: "Headache",
          duration: lower.includes("three days") || lower.includes("3 days") ? "3 days" : "Several hours to days",
          severity: 5,
          description: "Pain or discomfort in head region",
        });
      }
      if (hasDizziness) {
        symptoms.push({
          name: "Dizziness / Lightheadedness",
          duration: "Recent onset",
          severity: 6,
          description: "Unsteadiness or vertigo",
        });
      }
      if (hasFever) {
        symptoms.push({
          name: "Fever",
          duration: "1-2 days",
          severity: 6,
          description: "Elevated body temperature",
        });
      }
      if (symptoms.length === 0) {
        symptoms.push({
          name: "Reported discomfort",
          duration: "Unspecified",
          severity: 4,
          description: userInput.slice(0, 80),
        });
      }

      return {
        extracted_concern: userInput,
        symptoms,
        context_factors: ["Onset described by patient", "Awaiting adaptive questioning"],
        missing_critical_info: [
          "Exact onset pattern and progression",
          "Presence of visual changes, fever, or neck stiffness",
          "Hydration, sleep, or stress factors",
        ],
        initial_safety_flag: hasEmergency,
      };
    },
  });
}

