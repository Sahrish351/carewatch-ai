import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeartPulse, ArrowRight, Target, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#173737]">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="default">Our Mission</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#173737]">
            Care That Doesn&apos;t Disappear After One Search
          </h1>
          <p className="text-base sm:text-lg text-[#657777] max-w-2xl mx-auto leading-relaxed">
            CareWatch AI was created to solve one of the most frustrating and dangerous gaps in digital health: the lack of follow-up continuity.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#173737]">
            The Genesis of CareWatch AI
          </h2>
          <p className="text-sm text-[#657777] leading-relaxed">
            Every day, hundreds of millions of people search for their symptoms online. They get a page of search results, perhaps an AI chat response, and then nothing. No one checks back tomorrow to see if they improved. No one notices if the headache developed dizziness.
          </p>
          <p className="text-sm text-[#657777] leading-relaxed">
            CareWatch bridges this gap. By combining multi-agent intelligence with an active follow-up loop, we provide individuals and families with a reliable digital companion that remembers where they started and ensures they take the right next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 text-center">
            <Target className="w-8 h-8 text-[#2A6F6F] mx-auto" />
            <h3 className="font-display text-lg font-bold">Accuracy & Safety</h3>
            <p className="text-xs text-[#657777]">
              Conservative triage tiers grounded in peer-reviewed guidelines.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 text-center">
            <Users className="w-8 h-8 text-[#2A6F6F] mx-auto" />
            <h3 className="font-display text-lg font-bold">Inclusivity</h3>
            <p className="text-xs text-[#657777]">
              Multilingual access including English and Roman Urdu.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 text-center">
            <Sparkles className="w-8 h-8 text-[#2A6F6F] mx-auto" />
            <h3 className="font-display text-lg font-bold">Continuity</h3>
            <p className="text-xs text-[#657777]">
              Automated check-ins, delta severity comparison, and timely reassessment.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

