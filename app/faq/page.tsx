import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "What is CareWatch AI?",
      a: "CareWatch AI is an AI-powered health navigation and recovery-tracking platform. It helps you understand the urgency of a health concern, provides an evidence-informed next-step action plan, and checks back later to see if your condition improved or changed.",
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
      q: "How does the follow-up loop work?",
      a: "After you complete an assessment, CareWatch schedules an in-app follow-up (usually in 12 to 48 hours depending on your symptoms). When due, you complete a 30-second check-in. If your symptoms worsen or new symptoms appear, a Reassessment is automatically triggered.",
    },
    {
      q: "Is my health information private?",
      a: "Yes. All health data is protected by Supabase PostgreSQL Row Level Security (RLS) policies. Only you have access to your personal assessments, action plans, and check-ins.",
    },
    {
      q: "Can I use CareWatch in Roman Urdu?",
      a: "Yes. CareWatch supports Roman Urdu, enabling Urdu-speaking users to describe their symptoms naturally (e.g. 'Sar mein 3 din se dard hai aur chakkar aa rahe hain') and receive guidance.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#173737]">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="default">Frequently Asked Questions</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#173737]">
            CareWatch AI Knowledge Base
          </h1>
          <p className="text-base sm:text-lg text-[#657777] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our technology, clinical safety principles, and follow-up system.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-2 shadow-xs">
              <h3 className="font-display text-lg font-bold text-[#173737] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2A6F6F]" />
                {faq.q}
              </h3>
              <p className="text-sm text-[#657777] leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-[#F0F7F7] border border-[#BDDEDC] text-center space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#173737]">Still have questions?</h2>
          <p className="text-sm text-[#657777] max-w-md mx-auto">
            Test the live platform now or start a guided health assessment to see how it works in real-time.
          </p>
          <Link href="/assessment/new">
            <Button size="lg" className="mt-2">
              Start a Health Check <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

