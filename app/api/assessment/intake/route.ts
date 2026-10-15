import { NextResponse } from "next/server";
import { intakeAgent } from "@/lib/ai/agents/intake-agent";
import { questionAgent } from "@/lib/ai/agents/question-agent";
import { createClient } from "@/lib/supabase/server";
import { SupabaseHealthService } from "@/lib/services/supabase-service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { primaryConcern, language = "en" } = body;

    if (!primaryConcern || typeof primaryConcern !== "string" || primaryConcern.trim().length === 0) {
      return NextResponse.json({ error: "Primary concern is required" }, { status: 400 });
    }

    // Get active user from Supabase session if logged in
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || "demo-user-carewatch";

    // 1. Create Assessment Record in Supabase (with fallback)
    const title = primaryConcern.length > 40 ? primaryConcern.slice(0, 37) + "..." : primaryConcern;
    const { data: assessment, source: persistenceSource } = await SupabaseHealthService.createAssessment(
      supabase,
      userId,
      title,
      primaryConcern
    );

    // 2. Run Intake Agent (Gemini live with structured output + fallback)
    const intakeResult = await intakeAgent({
      userInput: primaryConcern,
      language,
    });

    // 3. Save extracted symptoms
    await SupabaseHealthService.saveSymptoms(
      supabase,
      assessment.id,
      intakeResult.symptoms.map((s) => ({
        name: s.name,
        duration: s.duration,
        severity: s.severity || null,
        description: s.description || null,
      }))
    );

    await SupabaseHealthService.updateAssessmentStatus(supabase, assessment.id, "questioning");

    // 4. Generate first adaptive question
    const firstQuestion = await questionAgent({
      primaryConcern,
      extractedSymptoms: intakeResult.symptoms,
      previousAnswers: [],
      language,
    });

    return NextResponse.json({
      assessmentId: assessment.id,
      intake: intakeResult,
      firstQuestion,
      persistence: persistenceSource,
      aiSource: (intakeResult as any)._provenance || { source: "gemini_live", model: "gemini-3.8-flash" },
    });
  } catch (error: any) {
    console.error("[API Intake Error]:", error);
    return NextResponse.json(
      { error: "Failed to process health intake. Please try again." },
      { status: 500 }
    );
  }
}
