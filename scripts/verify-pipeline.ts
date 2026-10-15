import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { intakeAgent } from "../lib/ai/agents/intake-agent";
import { questionAgent } from "../lib/ai/agents/question-agent";
import { triageAgent } from "../lib/ai/agents/triage-agent";
import { followUpAgent } from "../lib/ai/agents/follow-up-agent";
import { reassessmentAgent } from "../lib/ai/agents/reassessment-agent";

async function runVerification() {
  console.log("=== CareWatch AI Pipeline Verification ===");
  console.log("Time:", new Date().toISOString());
  console.log("API Key configured:", Boolean(process.env.GEMINI_API_KEY));

  try {
    // 1. INTAKE AGENT
    console.log("\n[1/5] Testing Intake Agent...");
    const intakeStart = Date.now();
    const intake = await intakeAgent({
      userInput: "I have had a throbbing headache for 3 days and I feel dizzy today.",
    });
    console.log(`✓ Intake Agent completed in ${Date.now() - intakeStart}ms`);
    console.log("  Extracted concern:", intake.extracted_concern);
    console.log("  Identified symptoms:", intake.symptoms.map((s) => `${s.name} (${s.duration})`).join(", "));
    console.log("  Emergency flag:", intake.initial_safety_flag);
    console.log("  Provenance:", (intake as any)._provenance?.source, `(${(intake as any)._provenance?.model})`);

    // 2. ADAPTIVE QUESTION AGENT
    console.log("\n[2/5] Testing Adaptive Question Agent...");
    const qStart = Date.now();
    const q1 = await questionAgent({
      primaryConcern: intake.extracted_concern,
      extractedSymptoms: intake.symptoms,
      previousAnswers: [],
    });
    console.log(`✓ Question Agent completed in ${Date.now() - qStart}ms`);
    console.log("  Generated Question:", q1.question);
    console.log("  Clinical Intent:", q1.reason);
    console.log("  Question Type:", q1.question_type);
    console.log("  Options:", q1.options?.join(" | ") || "None");
    console.log("  Sufficient Info Gathered:", q1.sufficient_information_gathered);

    // 3. TRIAGE AGENT
    console.log("\n[3/5] Testing Triage Agent...");
    const triageStart = Date.now();
    const triage = await triageAgent({
      primaryConcern: intake.extracted_concern,
      symptoms: intake.symptoms,
      answers: [
        {
          question: q1.question,
          answer: "Discomfort is around 4/10, dull ache with intermittent dizziness.",
          question_type: q1.question_type,
        },
      ],
    });
    console.log(`✓ Triage Agent completed in ${Date.now() - triageStart}ms`);
    console.log("  Urgency Tier Assigned:", triage.tier);
    console.log("  Summary:", triage.summary);
    console.log("  Recommended Next Step:", triage.recommended_next_step);
    console.log("  Follow-up Window:", triage.follow_up_hours, "hours");
    console.log("  Key Factors:", triage.key_factors.length, "factors identified");

    // 4. FOLLOW-UP AGENT
    console.log("\n[4/5] Testing Follow-Up Agent (Check-in)...");
    const fuStart = Date.now();
    const checkIn = await followUpAgent({
      initialConcern: intake.extracted_concern,
      previousTier: triage.tier,
      previousSeverity: 4,
      checkInOutcome: "worse",
      currentSeverity: 8,
      userNotes: "Headache worsened significantly and feeling off-balance when walking.",
      newSymptomsReported: ["Dizziness / Unsteadiness"],
    });
    console.log(`✓ Follow-up Agent completed in ${Date.now() - fuStart}ms`);
    console.log("  Change Direction:", checkIn.change_direction);
    console.log("  Reassessment Needed:", checkIn.reassessment_needed);
    console.log("  Interpretation:", checkIn.interpretation);

    // 5. REASSESSMENT AGENT
    console.log("\n[5/5] Testing Reassessment Agent...");
    const reassessStart = Date.now();
    const reassess = await reassessmentAgent({
      initialConcern: intake.extracted_concern,
      previousTier: triage.tier,
      previousSeverity: 4,
      currentSeverity: 8,
      outcome: "worse",
      userNotes: "Headache worsened significantly and feeling off-balance when walking.",
      newSymptoms: ["Dizziness / Unsteadiness"],
    });
    console.log(`✓ Reassessment Agent completed in ${Date.now() - reassessStart}ms`);
    console.log("  Previous Tier:", triage.tier, "(Severity: 4/10)");
    console.log("  Updated Tier:", reassess.updated_tier, "(Severity: 8/10)");
    console.log("  Change Summary:", reassess.change_summary);
    console.log("  Escalation Reason:", reassess.escalation_reason);
    console.log("  Updated Care Step:", reassess.updated_next_step);

    console.log("\n>>> ALL 5 AI AGENTS AND THE COMPLETE FOLLOW-UP LOOP VERIFIED SUCCESSFULLY <<<");
  } catch (error: any) {
    console.error("Verification failed:", error.message || error);
    process.exit(1);
  }
}

runVerification();

