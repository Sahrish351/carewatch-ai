import { NextResponse } from "next/server";
import { questionAgent } from "@/lib/ai/agents/question-agent";
import { createClient } from "@/lib/supabase/server";
import { SupabaseHealthService } from "@/lib/services/supabase-service";
import { healthStore } from "@/lib/services/storage-service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { assessmentId, question, answer, questionType = "general", language = "en" } = body;

    if (!assessmentId || !question || !answer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Record the Answer
    await SupabaseHealthService.saveAnswer(
      supabase,
      assessmentId,
      question,
      answer,
      questionType
    );

    const assessment = healthStore.getAssessmentById(assessmentId);
    const symptoms = healthStore.getSymptoms(assessmentId);
    const answers = healthStore.getAnswers(assessmentId);

    // 2. Generate next adaptive question using Gemini
    const nextQuestion = await questionAgent({
      primaryConcern: assessment?.primary_concern || question,
      extractedSymptoms: symptoms,
      previousAnswers: answers,
      language,
    });

    return NextResponse.json({
      success: true,
      nextQuestion,
      totalAnswered: answers.length,
      aiSource: (nextQuestion as any)._provenance || { source: "gemini_live", model: "gemini-3.8-flash" },
    });
  } catch (error) {
    console.error("[API Question Error]:", error);
    return NextResponse.json(
      { error: "Failed to generate next question." },
      { status: 500 }
    );
  }
}
