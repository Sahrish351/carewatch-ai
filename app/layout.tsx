import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareWatch AI — Understand today. Check in tomorrow. Act when it matters.",
  description:
    "An AI-powered health-support and recovery-tracking platform. Understand your symptoms, follow an evidence-informed action plan, and check back to track recovery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F3] text-[#263735]">
        {children}
      </body>
    </html>
  );
}
