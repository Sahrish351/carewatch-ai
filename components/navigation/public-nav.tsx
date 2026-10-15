"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, HeartPulse } from "lucide-react";

export function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Recovery Journey", href: "/recovery-journey" },
    { label: "Safety", href: "/safety" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EDE8DF] bg-[#FAF8F3]/90 backdrop-blur-md antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-[#174E4A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5 text-[#DDEBE2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-[#263735]">
              CareWatch<span className="text-[#174E4A]">.AI</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#627472] font-semibold">
              Health Navigation & Follow-Up
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-[#263735] hover:text-[#174E4A] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-xs">
              Sign In
            </Button>
          </Link>
          <Link href="/assessment/new">
            <Button size="sm" className="shadow-xs text-xs font-bold bg-[#174E4A] hover:bg-[#103835] text-white">
              Start Health Check <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#263735] hover:bg-[#FAF8F3]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EDE8DF] bg-white px-5 pt-3 pb-6 space-y-3 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-[#263735] hover:bg-[#EFF7F1] hover:text-[#174E4A]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#EDE8DF] flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full text-xs">
                Sign In / 1-Click Demo
              </Button>
            </Link>
            <Link href="/assessment/new" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full text-xs bg-[#174E4A] hover:bg-[#103835] text-white">
                Start Health Check <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
