"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is CareWatch AI and how is it different from a symptom checker?",
      a: "Most symptom checkers give you a single list of conditions and disappear. CareWatch AI creates a continuous health journey: it understands your concern, provides an evidence-informed action plan, schedules an automated follow-up check-in, compares your new symptoms against your baseline, and reassesses your care pathway if symptoms worsen.",
    },
    {
      q: "Does CareWatch AI diagnose illnesses?",
      a: "No. CareWatch AI does not diagnose illnesses or diseases. It assigns clinical urgency tiers (Self-Care, Monitor, See-a-Doctor, Urgent) to help you decide when to consult healthcare professionals.",
    },
    {
      q: "Does CareWatch AI prescribe medications?",
      a: "No. We never prescribe medications or alter prescribed regimens. All medical prescriptions require in-person consultation with a licensed healthcare physician.",
    },
    {
      q: "How does the automated follow-up check-in work?",
      a: "Based on the urgency and nature of your initial assessment, CareWatch AI schedules a personalized follow-up window (e.g. 12, 24, or 48 hours). When the check-in is due, the system prompts you to report your current severity and any new symptoms. It calculates trajectory delta and flags deterioration automatically.",
    },
    {
      q: "Can clinicians and administrators use CareWatch AI?",
      a: "Yes. CareWatch AI is built with dedicated role-specific workspaces: Patients manage their recovery episodes and Health Passport; Clinicians access a priority triage queue with red-flag escalation alerts; Administrators monitor AI model latency (Gemini 3.8 Flash), database health, and safety audit logs.",
    },
    {
      q: "How is my personal health data protected?",
      a: "Your data is stored in a dedicated Supabase PostgreSQL database protected by strict Row-Level Security (RLS). Only your authenticated account can read or write your assessments, follow-ups, and health records. We never sell your data, use third-party advertising trackers, or share records without your explicit consent.",
    },
    {
      q: "Can I track multiple health journeys over time?",
      a: "Yes. Every health concern you start is preserved as an episode in your private health timeline. You can review past check-ins, symptom trend graphs, action plans, and access your personal Health Passport.",
    },
    {
      q: "Can I use CareWatch AI in Roman Urdu?",
      a: "Yes. CareWatch supports Roman Urdu, enabling Urdu-speaking users to describe their symptoms naturally (e.g. 'Sar mein 3 din se dard hai aur chakkar aa rahe hain') and receive structured clinical triage guidance.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#263735] selection:bg-[#DDEBE2] antialiased">
      <PublicNav />

      <main className="flex-1 py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#174E4A]" />
            <span>CareWatch Knowledge Base</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#263735] leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#627472] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our technology, clinical safety principles, and continuous follow-up system.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#EDE8DF] bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#263735] hover:bg-[#FAF8F3] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#174E4A] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#174E4A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#627472] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#627472] leading-relaxed border-t border-[#EDE8DF] pt-3 pl-11">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl bg-[#174E4A] text-white text-center space-y-4 shadow-md">
          <h2 className="font-display text-2xl font-bold">Still have questions?</h2>
          <p className="text-white/80 text-xs sm:text-sm max-w-md mx-auto">
            Experience the continuous care loop yourself with a free, confidential health check.
          </p>
          <div className="pt-2">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-white text-[#174E4A] hover:bg-[#FAF8F3] text-xs font-bold">
                Start Live Assessment <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
