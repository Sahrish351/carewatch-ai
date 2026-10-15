"use client";

import React from "react";
import Link from "next/link";
import { HeartPulse, Shield, ExternalLink } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-[#EDE8DF] bg-[#FAF8F5] text-[#173737] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2A6F6F] flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5 text-[#8FB996]" />
              </div>
              <span className="font-display text-xl font-bold text-[#173737]">
                CareWatch<span className="text-[#2A6F6F]">.AI</span>
              </span>
            </Link>
            <p className="text-sm text-[#657777] max-w-sm leading-relaxed">
              &quot;Understand today. Check in tomorrow. Act when it matters.&quot;
              CareWatch AI creates a continuous, adaptive follow-up loop that ensures health concerns are never left hanging after a single search.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#2A6F6F] font-medium bg-[#EBF3ED] px-3 py-1.5 rounded-lg w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>Evidence-Informed Clinical Navigation Protocol</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-sm text-[#173737] mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-[#657777]">
              <li>
                <Link href="/assessment/new" className="hover:text-[#2A6F6F] transition-colors">
                  Start Health Check
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#2A6F6F] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-[#2A6F6F] transition-colors">
                  Agentic AI Engine
                </Link>
              </li>
              <li>
                <Link href="/follow-ups" className="hover:text-[#2A6F6F] transition-colors">
                  Follow-up Loop
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-[#2A6F6F] transition-colors">
                  Health Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Ethics */}
          <div>
            <h4 className="font-semibold text-sm text-[#173737] mb-4 uppercase tracking-wider">
              Safety & Clinical
            </h4>
            <ul className="space-y-2.5 text-sm text-[#657777]">
              <li>
                <Link href="/safety" className="hover:text-[#2A6F6F] transition-colors">
                  Clinical Safety Rules
                </Link>
              </li>
              <li>
                <Link href="/safety#evidence" className="hover:text-[#2A6F6F] transition-colors">
                  Curated Evidence Sources
                </Link>
              </li>
              <li>
                <Link href="/safety#disclaimer" className="hover:text-[#2A6F6F] transition-colors">
                  Medical Limitations
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#2A6F6F] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization & Transparency */}
          <div>
            <h4 className="font-semibold text-sm text-[#173737] mb-4 uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2.5 text-sm text-[#657777]">
              <li>
                <Link href="/about" className="hover:text-[#2A6F6F] transition-colors">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-[#2A6F6F] transition-colors">
                  Privacy & Data Controls
                </Link>
              </li>
              <li>
                <span className="text-xs bg-[#FAF7F2] border border-[#EDE8DF] px-2.5 py-1 rounded inline-block text-[#657777]">
                  Hackathon Edition 2026
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Safety Bar */}
        <div className="pt-8 border-t border-[#EDE8DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#657777]">
          <p>
            CareWatch AI is an informational decision-support and recovery tracking tool. It does not provide medical diagnoses or prescriptions.
          </p>
          <p>© 2026 CareWatch AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

