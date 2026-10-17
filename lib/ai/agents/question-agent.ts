import { QuestionSchema, type QuestionResult } from "../schemas/agent-schemas";
import { generateStructuredAI } from "../gemini-client";

export async function questionAgent(params: {
  primaryConcern: string;
  extractedSymptoms: Array<{ name: string; duration: string; severity?: number | null }>;
  previousAnswers: Array<{ question: string; answer: string; question_type: string }>;
  language?: "en" | "ur_roman";
}): Promise<QuestionResult> {
  const { primaryConcern, extractedSymptoms, previousAnswers, language = "en" } = params;

  const currentCount = previousAnswers.length;

  // Maximum recommended questions is 5-6
  if (currentCount >= 5) {
    return {
      question: "Thank you. We have gathered sufficient details to evaluate your next steps.",
      reason: "Maximum question limit reached for safety triage.",
      question_type: "general",
      sufficient_information_gathered: true,
      options: ["View Assessment"],
    };
  }

  const systemInstruction = `You are the CareWatch Adaptive Clinical Questioning Agent.
Your goal is to safely triage the user's condition by asking ONE targeted clinical question at a time.
User's primary concern: "${primaryConcern}"
Extracted symptoms: ${JSON.stringify(extractedSymptoms)}

CRITICAL RULES:
1. Tailor the question DIRECTLY to what the user reported ("${primaryConcern}").
   - If abdominal/stomach: ask about location, eating, nausea, fever.
   - If respiratory/cough/throat: ask about breathing difficulty, fever, phlegm.
   - If musculoskeletal/injury: ask about swelling, ability to bear weight, mechanism.
   - If headache: ask about vision changes, neck stiffness, light sensitivity.
2. Ask only ONE clear, empathetic question at a time.
3. Provide 3-4 sensible quick-choice options in the "options" array for mobile taps.
4. If this is question 3 or 4, or if key red flags and severity have been covered, set sufficient_information_gathered to true.
5. Respond in ${language === "ur_roman" ? "Roman Urdu where user-facing, but keep keys in English" : "English"}.
6. Output valid JSON with fields: question, reason, question_type, options, sufficient_information_gathered.`;

  const userPrompt = `
Primary concern: "${primaryConcern}"
Identified symptoms: ${JSON.stringify(extractedSymptoms)}
Previous questions and answers:
${previousAnswers.map((qa, i) => `Q${i + 1}: ${qa.question} -> A: ${qa.answer}`).join("\n")}

Generate the single next best clinical question.`;

  return generateStructuredAI<QuestionResult>({
    systemInstruction,
    userPrompt,
    schema: QuestionSchema,
    fallback: () => {
      const concernName = extractedSymptoms[0]?.name || primaryConcern.slice(0, 35);

      if (currentCount === 0) {
        return {
          question: language === "ur_roman" 
            ? `1 se 10 ke scale par aap is takleef (${concernName}) ki shiddat ko kya number dein ge?`
            : `On a scale of 1 to 10, how intense is your ${concernName.toLowerCase()} right now?`,
          reason: "Assessing baseline clinical severity",
          question_type: "severity",
          options: ["1-3 (Mild)", "4-6 (Moderate)", "7-8 (Severe)", "9-10 (Very severe)"],
          sufficient_information_gathered: false,
        };
      }

      if (currentCount === 1) {
        return {
          question: language === "ur_roman"
            ? `Yeh takleef kab shuru hui, aur kya bukhar ya achanak kamzori jese alamaat sath hain?`
            : `How long have you had this ${concernName.toLowerCase()}, and have you noticed any fever or sudden weakness?`,
          reason: "Evaluating duration and acute red flags",
          question_type: "red_flag_check",
          options: ["Started today", "Past 2-3 days", "Fever or chills present", "No red flags, just steady pain"],
          sufficient_information_gathered: false,
        };
      }

      if (currentCount === 2) {
        return {
          question: language === "ur_roman"
            ? `Kya aaraam karne, khane peene ya chalne phirne se is mein behtari ya kami aati hai?`
            : `Does resting, moving, eating, or changing positions make the discomfort better or worse?`,
          reason: "Assessing triggers and relieving factors",
          question_type: "triggers",
          options: ["Better with rest", "Worse with movement or exertion", "No change with anything", "Getting progressively worse"],
          sufficient_information_gathered: false,
        };
      }

      if (currentCount === 3) {
        return {
          question: language === "ur_roman"
            ? `Kya aap ne koi dawa li hai ya pehle se koi mutaliqa bemari hai?`
            : `Have you taken any medication for this, or do you have any relevant medical history?`,
          reason: "Checking medication response and baseline risk",
          question_type: "associated_symptoms",
          options: ["Took over-the-counter medicine", "No medication taken", "Pre-existing related condition", "First time experiencing this"],
          sufficient_information_gathered: true,
        };
      }

      return {
        question: "We have gathered enough clinical context to evaluate your condition and guide next steps.",
        reason: "Sufficient data gathered",
        question_type: "general",
        sufficient_information_gathered: true,
        options: ["Proceed to Assessment"],
      };
    },
  });
}

