import { IntakeSchema, type IntakeResult } from "../schemas/agent-schemas";
import { generateStructuredAI } from "../gemini-client";

export async function intakeAgent(params: {
  userInput: string;
  language?: "en" | "ur_roman";
}): Promise<IntakeResult> {
  const { userInput, language = "en" } = params;

  const systemInstruction = `You are the CareWatch Intake Agent.
Analyze the user's initial health concern carefully.
Extract:
1. "extracted_concern": Clean concise title/summary of what the user is experiencing.
2. "symptoms": Array of objects: [{ name: string, duration: string, severity: number (1-10), description: string }]
3. "context_factors": Array of contextual strings (e.g. onset, activity, medical history if mentioned)
4. "missing_critical_info": Array of strings representing what needs to be asked next.
5. "initial_safety_flag": boolean (true if severe chest pain, inability to breathe, slurred speech, acute emergency signs).

Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep JSON keys in English" : "English"}.
Return ONLY valid JSON matching this schema.`;

  const userPrompt = `User's reported concern: "${userInput}"`;

  return generateStructuredAI<IntakeResult>({
    systemInstruction,
    userPrompt,
    schema: IntakeSchema,
    fallback: () => {
      const lower = userInput.toLowerCase();
      const hasEmergency = lower.includes("chest pain") || lower.includes("breathing") || lower.includes("unconscious") || lower.includes("fainted");

      // Extract primary symptom from text
      let symptomName = "Health Concern";
      if (lower.includes("headache") || lower.includes("head") || lower.includes("sar dard")) symptomName = "Headache";
      else if (lower.includes("stomach") || lower.includes("abdominal") || lower.includes("pet") || lower.includes("belly")) symptomName = "Abdominal / Stomach Discomfort";
      else if (lower.includes("fever") || lower.includes("bukhar") || lower.includes("temp")) symptomName = "Fever";
      else if (lower.includes("throat") || lower.includes("gala") || lower.includes("cough") || lower.includes("khansi")) symptomName = "Throat / Respiratory Discomfort";
      else if (lower.includes("back") || lower.includes("kamar")) symptomName = "Back Discomfort";
      else if (lower.includes("dizzy") || lower.includes("chakkar")) symptomName = "Dizziness / Lightheadedness";
      else if (lower.includes("nausea") || lower.includes("vomit") || lower.includes("ulti")) symptomName = "Nausea / Digestive Discomfort";
      else {
        // Use user's input as the symptom name directly
        symptomName = userInput.length > 35 ? userInput.slice(0, 32) + "..." : userInput;
      }

      return {
        extracted_concern: userInput,
        symptoms: [
          {
            name: symptomName,
            duration: lower.includes("day") || lower.includes("din") ? "Multiple days" : "Recent onset",
            severity: 5,
            description: userInput.slice(0, 100),
          },
        ],
        context_factors: ["Reported by patient in initial intake"],
        missing_critical_info: [
          "Exact duration and onset pattern",
          "Associated red flag symptoms",
          "Aggravating or relieving factors",
        ],
        initial_safety_flag: hasEmergency,
      };
    },
  });
}

