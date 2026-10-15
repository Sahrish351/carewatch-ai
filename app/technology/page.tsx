import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Shield,
  Layers,
  Database,
  Terminal,
  Code2,
  Workflow,
  Lock,
} from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#173737]">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4">
          <Badge variant="default">Agentic Architecture</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#173737]">
            CareWatch AI Technology Stack
          </h1>
          <p className="text-base sm:text-lg text-[#657777] max-w-2xl mx-auto leading-relaxed">
            Engineered with strict clinical boundaries, Google Gemini structured outputs, Zod schema validation, and Supabase PostgreSQL Row-Level Security.
          </p>
        </div>

        {/* Multi-Agent Deep Dive */}
        <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-[#2A6F6F]" />
            <h2 className="font-display text-2xl font-bold text-[#173737]">
              Why Specialized Agents Instead of a Single Prompt?
            </h2>
          </div>
          <p className="text-sm text-[#657777] leading-relaxed">
            In healthcare technology, a monolithic conversational prompt often produces hallucinations, unvetted diagnostic claims, or inconsistent logic. CareWatch decouples the journey into 8 isolated agents with explicit contracts:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              {
                title: "Strict Zod Schema Contracts",
                desc: "Every agent response is parsed against strict TypeScript Zod schemas. Any deviation fails safely without reaching user-facing views.",
              },
              {
                title: "Zero Private Chain-of-Thought Leaks",
                desc: "Users see concise decision factors and observable facts, ensuring trust without exposing internal token sequences or model artifacts.",
              },
              {
                title: "Curated Grounded Knowledge",
                desc: "Evidence Agent retrieves guidelines directly from verified repositories (NICE, CDC, WHO) rather than unconstrained web generation.",
              },
              {
                title: "Stateful Temporal Comparison",
                desc: "Follow-up and Reassessment agents calculate quantitative deltas between baseline and current check-in metrics.",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-1">
                <span className="text-sm font-bold text-[#173737] block">{item.title}</span>
                <span className="text-xs text-[#657777] leading-relaxed">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
            <Terminal className="w-6 h-6 text-[#2A6F6F]" />
            <h3 className="font-display text-lg font-bold">Frontend Architecture</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
            <Database className="w-6 h-6 text-[#2A6F6F]" />
            <h3 className="font-display text-lg font-bold">Data & Security</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              Supabase PostgreSQL with 15 relational tables, strict Row Level Security (RLS), and zero client credential leakage.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
            <Workflow className="w-6 h-6 text-[#2A6F6F]" />
            <h3 className="font-display text-lg font-bold">AI Intelligence</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              Google Gemini with JSON mode, temperature tuned to 0.2 for reproducible medical navigation and fallback resilience.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

