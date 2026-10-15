import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

export interface AIProvenance {
  source: "gemini_live" | "safety_simulation";
  model: string;
  timestamp: string;
}

export type StructuredAIResponse<T> = T & {
  _provenance?: AIProvenance;
};

// In-memory rate limiting / throttle protection
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL_MS = 250; // Max 4 requests/sec

export function getAIConfigurationStatus(): {
  isConfigured: boolean;
  model: string;
} {
  return {
    isConfigured: Boolean(process.env.GEMINI_API_KEY),
    model: "gemini-3.8-flash",
  };
}

export async function generateStructuredAI<T>(params: {
  systemInstruction: string;
  userPrompt: string;
  schema: z.ZodSchema<T>;
  fallback: () => T;
  modelName?: string;
}): Promise<StructuredAIResponse<T>> {
  const {
    systemInstruction,
    userPrompt,
    schema,
    fallback,
    modelName = "gemini-3.8-flash",
  } = params;

  const genAI = getGenAI();

  if (!genAI) {
    console.warn(
      "[CareWatch AI] GEMINI_API_KEY not configured. Using deterministic clinical safety simulation."
    );
    await new Promise((r) => setTimeout(r, 400));
    const fallbackData = fallback();
    return {
      ...fallbackData,
      _provenance: {
        source: "safety_simulation",
        model: "clinical_rules_engine",
        timestamp: new Date().toISOString(),
      },
    };
  }

  // Throttle consecutive rapid calls
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < MIN_REQUEST_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_REQUEST_INTERVAL_MS - timeSinceLast));
  }
  lastRequestTime = Date.now();

  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2, // Low temperature for clinical accuracy and determinism
      },
      systemInstruction: `${systemInstruction}
CRITICAL SAFETY & MEDICAL BOUNDARIES:
1. You are a healthcare navigation and triage assistant, NOT a medical doctor.
2. DO NOT diagnose diseases or state that the user has a specific condition.
3. DO NOT prescribe or recommend specific prescription dosages.
4. DO NOT reveal internal raw chain of thought or tokens.
5. Provide strict structured JSON matching the requested schema.`,
    });

    const result = await Promise.race([
      model.generateContent(userPrompt),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API call timed out after 12s")), 12000)
      ),
    ]);

    const text = result.response.text();
    const parsedJson = JSON.parse(text);
    const validated = schema.parse(parsedJson);

    return {
      ...validated,
      _provenance: {
        source: "gemini_live",
        model: modelName,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error: any) {
    console.error("[CareWatch AI] Gemini live inference failed or rejected by schema:", error?.message || error);
    const fallbackData = fallback();
    return {
      ...fallbackData,
      _provenance: {
        source: "safety_simulation",
        model: "clinical_rules_engine_fallback",
        timestamp: new Date().toISOString(),
      },
    };
  }
}
