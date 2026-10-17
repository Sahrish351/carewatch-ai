"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AgentStatus } from "@/components/ui/agent-status";
import { Disclaimer } from "@/components/ui/disclaimer";
import { healthStore } from "@/lib/services/storage-service";
import {
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle,
  Clock,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  reason?: string;
  options?: string[];
  timestamp: string;
}

export default function NewAssessmentPage() {
  const router = useRouter();

  // Step state: "concern" | "questioning" | "triaging"
  const [currentStep, setCurrentStep] = useState<"concern" | "questioning" | "triaging">("concern");
  const [concernInput, setConcernInput] = useState("");
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  // Chat message history
  const [messages, setMessages] = useState<Message[]>([]);
  const [answerInput, setAnswerInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    reason: string;
    question_type: string;
    options?: string[];
    sufficient_information_gathered: boolean;
  } | null>(null);

  // Agent State
  const [agentStatus, setAgentStatus] = useState<
    "idle" | "intake" | "questioning" | "triage" | "evidence" | "planning"
  >("idle");
  const [isLoading, setIsLoading] = useState(false);

  // Handler for initial concern submission
  const handleStartIntake = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!concernInput.trim() || isLoading) return;

    setIsLoading(true);
    setAgentStatus("intake");

    const userMessage: Message = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: concernInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([userMessage]);

    try {
      const res = await fetch("/api/assessment/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ primaryConcern: concernInput }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setAssessmentId(data.assessmentId);

      // Immediately sync new assessment and symptoms to client healthStore
      const title = concernInput.length > 40 ? concernInput.slice(0, 37) + "..." : concernInput;
      healthStore.syncFromServer({
        assessments: [
          {
            id: data.assessmentId,
            user_id: "demo-user-carewatch",
            title,
            status: "questioning",
            primary_concern: concernInput,
            started_at: new Date().toISOString(),
            completed_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
      });
      if (data.intake?.symptoms) {
        healthStore.addSymptoms(data.assessmentId, data.intake.symptoms);
      }

      setCurrentStep("questioning");
      setAgentStatus("questioning");

      const q = data.firstQuestion;
      setCurrentQuestion(q);

      const aiMsg: Message = {
        id: "msg-ai-" + Date.now(),
        sender: "ai",
        text: q.question,
        reason: q.reason,
        options: q.options,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      alert("Error starting intake: " + (err.message || "Please try again"));
    } finally {
      setIsLoading(false);
      setAgentStatus("idle");
    }
  };

  // Handler for adaptive question answers
  const handleSendAnswer = async (selectedAnswer?: string) => {
    const textToSend = selectedAnswer || answerInput;
    if (!textToSend.trim() || !assessmentId || !currentQuestion || isLoading) return;

    setAnswerInput("");
    setIsLoading(true);

    const userMsg: Message = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Save answer to client store
    healthStore.addAnswer({
      assessmentId,
      question: currentQuestion.question,
      answer: textToSend,
      questionType: currentQuestion.question_type,
    });

    try {
      // Check if current question indicated sufficient info gathered
      if (currentQuestion.sufficient_information_gathered) {
        triggerTriage(assessmentId);
        return;
      }

      setAgentStatus("questioning");
      const res = await fetch("/api/assessment/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId,
          question: currentQuestion.question,
          answer: textToSend,
          questionType: currentQuestion.question_type,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const nextQ = data.nextQuestion;
      setCurrentQuestion(nextQ);

      if (nextQ.sufficient_information_gathered) {
        triggerTriage(assessmentId);
      } else {
        const nextAiMsg: Message = {
          id: "msg-ai-" + Date.now(),
          sender: "ai",
          text: nextQ.question,
          reason: nextQ.reason,
          options: nextQ.options,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, nextAiMsg]);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setAgentStatus("idle");
    }
  };

  // Trigger Triage Synthesis
  const triggerTriage = async (id: string) => {
    setCurrentStep("triaging");
    setAgentStatus("triage");

    try {
      const res = await fetch("/api/assessment/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId: id }),
      });

      if (!res.ok) throw new Error("Triage failed");
      const data = await res.json();

      // Persist full result bundle to local store so results page and dashboard immediately see it
      if (data.riskAssessment) {
        healthStore.saveRiskAssessment(data.riskAssessment);
      }
      if (data.actionPlan) {
        healthStore.saveActionPlan(data.actionPlan);
      }
      if (data.followUp) {
        healthStore.scheduleFollowUp({
          assessmentId: id,
          hours: data.riskAssessment?.follow_up_hours || 24,
        });
      }
      healthStore.updateAssessmentStatus(
        id,
        data.riskAssessment?.tier === "urgent" ? "completed" : "monitoring"
      );

      // Smooth animated delay before redirecting to reveal
      setTimeout(() => {
        router.push(`/assessment/${id}/result`);
      }, 1200);
    } catch (err) {
      console.error(err);
      alert("Error in triage assessment. Redirecting to dashboard.");
      router.push("/dashboard");
    }
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress Header */}
        <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-[#2A6F6F] flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4" />
              {currentStep === "concern" && "Step 1: Primary Concern"}
              {currentStep === "questioning" && "Step 2: Adaptive Clinical Questions"}
              {currentStep === "triaging" && "Step 3: Synthesizing Urgency & Action Plan"}
            </span>
            <span className="text-[#657777]">
              {currentStep === "concern" && "Stage 1 of 3"}
              {currentStep === "questioning" && "Stage 2 of 3"}
              {currentStep === "triaging" && "Stage 3 of 3"}
            </span>
          </div>

          {/* Stepper bar */}
          <div className="w-full bg-[#EDE8DF] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#2A6F6F] h-full transition-all duration-500 rounded-full"
              style={{
                width:
                  currentStep === "concern"
                    ? "33%"
                    : currentStep === "questioning"
                    ? "66%"
                    : "100%",
              }}
            />
          </div>
        </div>

        {/* STEP 1: CONCERN INPUT */}
        {currentStep === "concern" && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Tell us what&apos;s going on
              </CardTitle>
              <p className="text-sm text-[#657777] leading-relaxed">
                Describe your symptoms in plain words. Include how long you&apos;ve noticed them and how severe they feel. You can also type in Roman Urdu.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStartIntake} className="space-y-4">
                <textarea
                  rows={4}
                  required
                  value={concernInput}
                  onChange={(e) => setConcernInput(e.target.value)}
                  placeholder="e.g., I've had a dull headache for three days and today I also feel slightly dizzy when standing up."
                  className="w-full p-4 rounded-xl border border-[#EDE8DF] bg-white text-sm text-[#173737] focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 leading-relaxed resize-none"
                />

                {/* Example quick scenario pills */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#657777] block">
                    Quick test scenarios:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "I've had a headache for three days and today I also feel dizzy.",
                      "Mild dry cough and throat tickle for 2 days, no fever.",
                      "Stomach cramps after eating dinner last night with nausea.",
                    ].map((example, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setConcernInput(example)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF] text-[#173737] hover:border-[#2A6F6F]/40 hover:bg-[#F0F7F7] transition-all text-left"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Disclaimer variant="inline" />
                  <Button type="submit" size="md" isLoading={isLoading}>
                    Begin Health Check <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* STEP 2: CONVERSATIONAL ADAPTIVE QUESTIONING */}
        {currentStep === "questioning" && (
          <div className="space-y-4">
            {/* Live Agent Status */}
            <AgentStatus
              status={agentStatus}
              customMessage={
                agentStatus === "questioning"
                  ? "Question Agent identifying critical clinical gaps..."
                  : undefined
              }
            />

            {/* Chat Thread */}
            <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[#EDE8DF] space-y-4 min-h-[360px] max-h-[520px] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-[#2A6F6F] text-white rounded-br-xs"
                        : "bg-[#FAF8F5] text-[#173737] border border-[#EDE8DF] rounded-bl-xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.reason && (
                      <div className="mt-2 pt-2 border-t border-[#EDE8DF]/60 text-[11px] text-[#657777] flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-[#2A6F6F]" />
                        <span>Clinical intent: {msg.reason}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#657777] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-[#FAF8F5] rounded-2xl border border-[#EDE8DF] text-xs text-[#657777] w-fit">
                  <div className="w-2 h-2 rounded-full bg-[#2A6F6F] animate-ping" />
                  <span>Clinical agent reviewing your response...</span>
                </div>
              )}
            </div>

            {/* Answer Options & Custom Input */}
            {currentQuestion && (
              <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
                {currentQuestion.options && currentQuestion.options.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-[#657777]">
                      Quick selection:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.options.map((opt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSendAnswer(opt)}
                          disabled={isLoading}
                          className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#FAF8F5] border border-[#EDE8DF] hover:border-[#2A6F6F] hover:bg-[#F0F7F7] text-[#173737] transition-all cursor-pointer text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendAnswer()}
                    placeholder="Or type your specific response..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                  />
                  <Button
                    type="button"
                    onClick={() => handleSendAnswer()}
                    disabled={!answerInput.trim() || isLoading}
                    size="md"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: TRIAGING ANIMATION */}
        {currentStep === "triaging" && (
          <div className="p-12 rounded-3xl bg-white border border-[#EDE8DF] text-center space-y-6 shadow-md">
            <div className="w-16 h-16 rounded-3xl bg-[#F0F7F7] border border-[#BDDEDC] flex items-center justify-center text-[#2A6F6F] mx-auto animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-[#173737]">
                Synthesizing Your Clinical Assessment
              </h2>
              <p className="text-sm text-[#657777] max-w-md mx-auto">
                Triage Agent, Evidence Agent, and Action Plan Agent are evaluating clinical guidelines to prepare your personalized care pathway.
              </p>
            </div>
            <div className="max-w-xs mx-auto">
              <AgentStatus status="triage" />
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

