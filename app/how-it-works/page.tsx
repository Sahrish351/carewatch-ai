import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MessageSquare,
  Sparkles,
  Clock,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Tell Us What Is Going On",
      desc: "Describe your health concern in your own natural words in English or Roman Urdu. There are no rigid forms or confusing medical jargon.",
      icon: Search,
      output: "Intake Agent extracts symptoms, duration, and contextual history.",
    },
    {
      num: "02",
      title: "Targeted Adaptive Questions",
      desc: "Instead of asking 30 irrelevant questions, the Question Agent identifies exact clinical gaps and asks one focused question at a time.",
      icon: MessageSquare,
      output: "4 to 5 concise questions clarify severity, duration, and red flags.",
    },
    {
      num: "03",
      title: "Urgency Triage & Action Plan",
      desc: "The Triage Agent assigns a safety tier (Self-Care, Monitor, See-a-Doctor, or Urgent Attention) backed by curated clinical guidelines from NICE, CDC, and WHO.",
      icon: Sparkles,
      output: "Scannable steps: What to do now, what to monitor, and when to seek emergency care.",
    },
    {
      num: "04",
      title: "Scheduled Follow-up Check-in",
      desc: "This is where traditional symptom checkers abandon you. CareWatch automatically schedules an in-app follow-up in 12, 24, or 48 hours.",
      icon: Clock,
      output: "30-second check-in: Report 'Better', 'Same', 'Worse', or 'New symptoms'.",
    },
    {
      num: "05",
      title: "Delta Comparison & Reassessment",
      desc: "If your symptoms worsen or new concerns appear (like dizziness or persistent vomiting), the Reassessment Agent immediately evaluates the change.",
      icon: RefreshCw,
      output: "Dynamic care pathway updates ensure you are safely escalated when it matters.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#173737]">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="default">The CareWatch Pathway</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#173737]">
            How CareWatch AI Works
          </h1>
          <p className="text-base sm:text-lg text-[#657777] max-w-2xl mx-auto leading-relaxed">
            From your first message to complete recovery, discover how our continuous follow-up loop keeps you safe.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-8 rounded-3xl bg-white border border-[#EDE8DF] flex flex-col md:flex-row items-start md:items-center gap-6 shadow-xs hover:border-[#2A6F6F]/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0F7F7] border border-[#BDDEDC] flex items-center justify-center text-[#2A6F6F] font-display text-xl font-bold shrink-0">
                  {step.num}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#2A6F6F]" />
                    <h3 className="font-display text-xl font-bold text-[#173737]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#657777] leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-xs font-medium text-[#24542E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6F6F]" />
                    <span>{step.output}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-[#2A6F6F] text-white text-center space-y-4">
          <h2 className="font-display text-2xl font-bold">Ready to check your symptoms?</h2>
          <p className="text-white/80 text-sm max-w-md mx-auto">
            Take a 2-minute assessment and get an evidence-informed next-step plan with an active follow-up loop.
          </p>
          <div className="pt-2">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-white text-[#2A6F6F] hover:bg-neutral-100 font-semibold">
                Start a Health Check <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

