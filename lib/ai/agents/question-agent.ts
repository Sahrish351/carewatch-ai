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

  const systemInstruction = `You are the CareWatch Adaptive Questioning Agent.
Your goal is to safely triage the user's condition by asking ONE targeted clinical question at a time.
Do not ask multiple questions at once.
Do not ask repetitive questions.
Probe for: severity (1-10), duration, red flags (fever, visual changes, weakness, neck stiffness), and functional impact.
If 3 to 4 questions have already clarified the key uncertainties, set sufficient_information_gathered to true.
Respond in ${language === "ur_roman" ? "Roman Urdu" : "English"}.`;

  const userPrompt = `
Primary concern: "${primaryConcern}"
Identified symptoms: ${JSON.stringify(extractedSymptoms)}
Previous questions and answers:
${previousAnswers.map((qa, i) => `Q${i + 1}: ${qa.question} -> A: ${qa.answer}`).join("\n")}

Generate the single next best question.`;

  return generateStructuredAI<QuestionResult>({
    systemInstruction,
    userPrompt,
    schema: QuestionSchema,
    fallback: () => {
      // Clinical progressive questions fallback
      if (currentCount === 0) {
        return {
          question: language === "ur_roman" 
            ? "1 se 10 ke pemanay par aap is takleef ki shiddat ko kya number dein ge?"
            : "On a scale of 1 to 10, how intense would you rate this discomfort right now?",
          reason: "Assessing quantitative baseline severity",
          question_type: "severity",
          options: ["1-3 (Mild)", "4-6 (Moderate)", "7-8 (Severe)", "9-10 (Very severe)"],
          sufficient_information_gathered: false,
        };
      }

      if (currentCount === 1) {
        return {
          question: language === "ur_roman"
            ? "Kya aap ko bukhar, gardan mein dard ya achanak chakkar aane ki shikayat hai?"
            : "Have you noticed any fever, neck stiffness, vision changes, or sudden unsteadiness?",
          reason: "Screening for neurological and systemic red flags",
          question_type: "red_flag_check",
          options: ["None of these", "Mild dizziness / lightheadedness", "Fever present", "Visual changes / blurriness"],
          sufficient_information_gathered: false,
        };
      }

      if (currentCount === 2) {
        return {
          question: language === "ur_roman"
            ? "Yeh takleef kab zyada hoti hai aur kya aaraam karne ya paani peene se behtari aati hai?"
            : "Does resting in a quiet dark room, drinking water, or moving around make it better or worse?",
          reason: "Checking aggravating and relieving factors",
          question_type: "triggers",
          options: ["Better with rest and fluids", "Worse when standing or moving", "No change with anything", "Getting progressively worse"],
          sufficient_information_gathered: false,
        };
      }

      if (currentCount === 3) {
        return {
          question: language === "ur_roman"
            ? "Kya aap ne is ke liye koi dawa li hai ya pehle se koi tibbi masla hai?"
            : "Have you taken any pain relievers or do you have any pre-existing health conditions?",
          reason: "Checking medication history and baseline risk",
          question_type: "associated_symptoms",
          options: ["Took over-the-counter pain relief", "No medications taken", "History of migraines / tension headaches", "High blood pressure history"],
          sufficient_information_gathered: true,
        };
      }

      return {
        question: "We have gathered enough clinical context to prepare your safety assessment.",
        reason: "Sufficient data gathered",
        question_type: "general",
        sufficient_information_gathered: true,
        options: ["Proceed to Assessment"],
      };
    },
  });
}

