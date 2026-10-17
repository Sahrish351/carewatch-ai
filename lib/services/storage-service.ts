import {
  Assessment,
  Symptom,
  AssessmentAnswer,
  AgentEvent,
  RiskAssessment,
  ActionPlan,
  FollowUp,
  FollowUpResponse,
  Reassessment,
  TimelineEvent,
  HealthPassport,
  HealthDocument,
  UserPreference,
  EvidenceSource,
} from "@/types/database";

const DEMO_USER_ID = "demo-user-carewatch";

// Local state container for offline / demo resilient operation
class LocalHealthStore {
  private assessments: Assessment[] = [];
  private symptoms: Symptom[] = [];
  private answers: AssessmentAnswer[] = [];
  private agentEvents: AgentEvent[] = [];
  private riskAssessments: RiskAssessment[] = [];
  private actionPlans: ActionPlan[] = [];
  private followUps: FollowUp[] = [];
  private followUpResponses: FollowUpResponse[] = [];
  private reassessments: Reassessment[] = [];
  private timelineEvents: TimelineEvent[] = [];
  private healthPassport: HealthPassport = {
    id: "passport-demo-1",
    user_id: DEMO_USER_ID,
    allergies: ["Penicillin (mild rash)"],
    medications: ["Multivitamin daily"],
    conditions: ["Occasional tension headaches"],
    important_information: "Prefers conservative supportive care when safe; works on computer screens 8 hours daily.",
    updated_at: new Date().toISOString(),
  };
  private documents: HealthDocument[] = [
    {
      id: "doc-demo-1",
      user_id: DEMO_USER_ID,
      file_name: "Annual_Checkup_Summary.pdf",
      storage_path: "/uploads/Annual_Checkup_Summary.pdf",
      file_type: "application/pdf",
      status: "analyzed",
      summary: "Baseline vitals normal. Routine blood panel within normal limits. Mild vitamin D deficiency noted.",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    },
  ];
  private preferences: UserPreference = {
    id: "pref-demo-1",
    user_id: DEMO_USER_ID,
    language: "en",
    timezone: "UTC",
    notifications_enabled: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  constructor() {
    this.seedDemoScenario();
    this.loadFromLocalStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  public saveToLocalStorage() {
    if (!this.isBrowser()) return;
    try {
      const payload = {
        assessments: this.assessments,
        symptoms: this.symptoms,
        answers: this.answers,
        agentEvents: this.agentEvents,
        riskAssessments: this.riskAssessments,
        actionPlans: this.actionPlans,
        followUps: this.followUps,
        followUpResponses: this.followUpResponses,
        reassessments: this.reassessments,
        timelineEvents: this.timelineEvents,
      };
      localStorage.setItem("carewatch_health_store_v1", JSON.stringify(payload));
    } catch {
      // Storage quota or private browsing fallback
    }
  }

  public loadFromLocalStorage() {
    if (!this.isBrowser()) return;
    try {
      const raw = localStorage.getItem("carewatch_health_store_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.assessments && Array.isArray(parsed.assessments) && parsed.assessments.length > 0) {
          this.assessments = parsed.assessments;
          if (parsed.symptoms) this.symptoms = parsed.symptoms;
          if (parsed.answers) this.answers = parsed.answers;
          if (parsed.agentEvents) this.agentEvents = parsed.agentEvents;
          if (parsed.riskAssessments) this.riskAssessments = parsed.riskAssessments;
          if (parsed.actionPlans) this.actionPlans = parsed.actionPlans;
          if (parsed.followUps) this.followUps = parsed.followUps;
          if (parsed.followUpResponses) this.followUpResponses = parsed.followUpResponses;
          if (parsed.reassessments) this.reassessments = parsed.reassessments;
          if (parsed.timelineEvents) this.timelineEvents = parsed.timelineEvents;
        }
      }
    } catch {
      // Ignore
    }
  }

  public clearLocalStorage() {
    if (this.isBrowser()) {
      try {
        localStorage.removeItem("carewatch_health_store_v1");
      } catch {}
    }
  }

  public syncFromServer(serverData: {
    assessments?: Assessment[];
    riskAssessments?: RiskAssessment[];
    actionPlans?: ActionPlan[];
    followUps?: FollowUp[];
    timelineEvents?: TimelineEvent[];
  }) {
    if (serverData.assessments && serverData.assessments.length > 0) {
      const map = new Map<string, Assessment>();
      // Keep server ones first, then local ones
      serverData.assessments.forEach((a) => map.set(a.id, a));
      this.assessments.forEach((a) => {
        if (!map.has(a.id)) map.set(a.id, a);
      });
      this.assessments = Array.from(map.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    if (serverData.riskAssessments) {
      const rMap = new Map<string, RiskAssessment>();
      serverData.riskAssessments.forEach((r) => rMap.set(r.assessment_id, r));
      this.riskAssessments.forEach((r) => {
        if (!rMap.has(r.assessment_id)) rMap.set(r.assessment_id, r);
      });
      this.riskAssessments = Array.from(rMap.values());
    }

    if (serverData.actionPlans) {
      const pMap = new Map<string, ActionPlan>();
      serverData.actionPlans.forEach((p) => pMap.set(p.assessment_id, p));
      this.actionPlans.forEach((p) => {
        if (!pMap.has(p.assessment_id)) pMap.set(p.assessment_id, p);
      });
      this.actionPlans = Array.from(pMap.values());
    }

    if (serverData.followUps) {
      const fMap = new Map<string, FollowUp>();
      serverData.followUps.forEach((f) => fMap.set(f.id, f));
      this.followUps.forEach((f) => {
        if (!fMap.has(f.id)) fMap.set(f.id, f);
      });
      this.followUps = Array.from(fMap.values());
    }

    if (serverData.timelineEvents) {
      const tMap = new Map<string, TimelineEvent>();
      serverData.timelineEvents.forEach((t) => tMap.set(t.id, t));
      this.timelineEvents.forEach((t) => {
        if (!tMap.has(t.id)) tMap.set(t.id, t);
      });
      this.timelineEvents = Array.from(tMap.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    this.saveToLocalStorage();
  }

  // Pre-seed demo scenario for the 3-minute hackathon demo:
  // "Headache 3 days -> Baseline Monitor -> Follow-up: 4/10 to 7/10 with dizziness -> Reassessment"
  public seedDemoScenario() {
    const assessmentId = "assessment-demo-headache";
    const followUpId = "followup-demo-1";

    this.assessments = [
      {
        id: assessmentId,
        user_id: DEMO_USER_ID,
        title: "Persistent Tension Headache",
        status: "reassessing",
        primary_concern: "I've had a headache for three days and today I also feel dizzy.",
        started_at: new Date(Date.now() - 26 * 3600000).toISOString(),
        completed_at: new Date(Date.now() - 25 * 3600000).toISOString(),
        created_at: new Date(Date.now() - 26 * 3600000).toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    this.symptoms = [
      {
        id: "sym-1",
        assessment_id: assessmentId,
        name: "Headache",
        duration: "3 days",
        severity: 4,
        description: "Dull throbbing pain around temples and forehead",
        created_at: new Date(Date.now() - 26 * 3600000).toISOString(),
      },
    ];

    this.answers = [
      {
        id: "ans-1",
        assessment_id: assessmentId,
        question: "On a scale of 1 to 10, how intense would you rate this discomfort right now?",
        answer: "4-6 (Moderate) - about 4/10 initially",
        question_type: "severity",
        created_at: new Date(Date.now() - 25.8 * 3600000).toISOString(),
      },
      {
        id: "ans-2",
        assessment_id: assessmentId,
        question: "Have you noticed any fever, neck stiffness, vision changes, or sudden unsteadiness?",
        answer: "None of these at the start, just persistent dull pain.",
        question_type: "red_flag_check",
        created_at: new Date(Date.now() - 25.6 * 3600000).toISOString(),
      },
      {
        id: "ans-3",
        assessment_id: assessmentId,
        question: "Does resting in a quiet dark room, drinking water, or moving around make it better or worse?",
        answer: "Rest helps slightly, but it keeps returning.",
        question_type: "triggers",
        created_at: new Date(Date.now() - 25.4 * 3600000).toISOString(),
      },
    ];

    this.riskAssessments = [
      {
        id: "risk-1",
        assessment_id: assessmentId,
        tier: "monitor",
        summary: "Persistent headache without overt acute emergency red flags, suitable for structured 24-hour monitoring.",
        key_factors: [
          "Dull headache persisting for 3 days",
          "Initial severity rated 4/10",
          "Absence of high fever, stiff neck, or sudden onset thunderclap pattern",
        ],
        uncertainties: [
          "Actual blood pressure and hydration level unmeasured",
          "Screen time vs cervical muscle tension contribution unknown",
        ],
        safety_message: "Seek immediate medical attention if dizziness, confusion, high fever, or severe sudden pain develops.",
        recommended_next_step: "Hydrate, rest in low-light environment, and complete scheduled 24-hour follow-up.",
        follow_up_hours: 24,
        created_at: new Date(Date.now() - 25 * 3600000).toISOString(),
      },
    ];

    this.actionPlans = [
      {
        id: "plan-1",
        assessment_id: assessmentId,
        summary: "Structured 24-hour recovery and observation pathway for persistent headache.",
        immediate_steps: [
          "Drink 500ml of water and rest in a quiet, darkened room.",
          "Apply a cold compress to the forehead for 15 minutes.",
          "Limit digital screen exposure for at least 2 hours.",
        ],
        monitoring_guidance: [
          "Record severity every 6 hours.",
          "Observe whether light or noise sensitivity emerges.",
        ],
        when_to_seek_care: [
          "Sudden escalation to severe 8+/10 pain.",
          "New dizziness, unsteadiness, or difficulty walking.",
          "High fever or neck stiffness.",
        ],
        follow_up_timing: "Automated check-in scheduled in 24 hours.",
        safety_note: "CareWatch AI provides navigation guidance and does not replace medical diagnosis.",
        created_at: new Date(Date.now() - 25 * 3600000).toISOString(),
        updated_at: new Date(Date.now() - 25 * 3600000).toISOString(),
      },
    ];

    this.followUps = [
      {
        id: followUpId,
        assessment_id: assessmentId,
        scheduled_for: new Date(Date.now() - 1 * 3600000).toISOString(),
        status: "due",
        created_at: new Date(Date.now() - 25 * 3600000).toISOString(),
        completed_at: null,
      },
    ];

    this.timelineEvents = [
      {
        id: "tl-1",
        user_id: DEMO_USER_ID,
        assessment_id: assessmentId,
        event_type: "assessment_started",
        title: "Health Check Initiated",
        description: "Concern reported: 'Persistent headache for 3 days'",
        created_at: new Date(Date.now() - 26 * 3600000).toISOString(),
      },
      {
        id: "tl-2",
        user_id: DEMO_USER_ID,
        assessment_id: assessmentId,
        event_type: "triage_completed",
        title: "Initial Assessment: Monitor Closely",
        description: "Triage assigned Monitor tier. 24-hour follow-up scheduled.",
        created_at: new Date(Date.now() - 25 * 3600000).toISOString(),
      },
      {
        id: "tl-3",
        user_id: DEMO_USER_ID,
        assessment_id: assessmentId,
        event_type: "follow_up_due",
        title: "Follow-up Check-in Due",
        description: "Scheduled 24-hour check-in is now ready for your update.",
        created_at: new Date(Date.now() - 1 * 3600000).toISOString(),
      },
    ];
  }

  // API Methods
  public getAssessments(userId: string = DEMO_USER_ID): Assessment[] {
    // If the user has created their own real assessments, prioritize and show their real assessments
    const realUserAssessments = this.assessments.filter((a) => a.id !== "assessment-demo-headache");
    if (realUserAssessments.length > 0) {
      if (userId && userId !== DEMO_USER_ID) {
        const userSpecific = realUserAssessments.filter((a) => a.user_id === userId);
        if (userSpecific.length > 0) return userSpecific;
      }
      return realUserAssessments;
    }
    return this.assessments;
  }

  public getAssessmentById(id: string): Assessment | undefined {
    return this.assessments.find((a) => a.id === id);
  }

  public createAssessment(params: {
    userId?: string;
    title: string;
    primaryConcern: string;
  }): Assessment {
    const newAssessment: Assessment = {
      id: "assess-" + Math.random().toString(36).substring(2, 9),
      user_id: params.userId || DEMO_USER_ID,
      title: params.title,
      status: "started",
      primary_concern: params.primaryConcern,
      started_at: new Date().toISOString(),
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.assessments.unshift(newAssessment);

    this.addTimelineEvent({
      userId: newAssessment.user_id,
      assessmentId: newAssessment.id,
      eventType: "assessment_started",
      title: "Health Check Started",
      description: `Reported concern: "${newAssessment.primary_concern}"`,
    });

    this.saveToLocalStorage();
    return newAssessment;
  }

  public updateAssessmentStatus(id: string, status: Assessment["status"]): void {
    const a = this.getAssessmentById(id);
    if (a) {
      a.status = status;
      a.updated_at = new Date().toISOString();
      if (status === "completed" || status === "monitoring") {
        a.completed_at = new Date().toISOString();
      }
      this.saveToLocalStorage();
    }
  }

  public addSymptoms(assessmentId: string, symptoms: Omit<Symptom, "id" | "assessment_id" | "created_at">[]): void {
    symptoms.forEach((s) => {
      this.symptoms.push({
        id: "sym-" + Math.random().toString(36).substring(2, 9),
        assessment_id: assessmentId,
        name: s.name,
        duration: s.duration,
        severity: s.severity || null,
        description: s.description || null,
        created_at: new Date().toISOString(),
      });
    });
    this.saveToLocalStorage();
  }

  public getSymptoms(assessmentId: string): Symptom[] {
    return this.symptoms.filter((s) => s.assessment_id === assessmentId);
  }

  public addAnswer(params: {
    assessmentId: string;
    question: string;
    answer: string;
    questionType: string;
  }): AssessmentAnswer {
    const ans: AssessmentAnswer = {
      id: "ans-" + Math.random().toString(36).substring(2, 9),
      assessment_id: params.assessmentId,
      question: params.question,
      answer: params.answer,
      question_type: params.questionType,
      created_at: new Date().toISOString(),
    };
    this.answers.push(ans);
    this.saveToLocalStorage();
    return ans;
  }

  public getAnswers(assessmentId: string): AssessmentAnswer[] {
    return this.answers.filter((a) => a.assessment_id === assessmentId);
  }

  public saveRiskAssessment(risk: Omit<RiskAssessment, "id" | "created_at">): RiskAssessment {
    const newRisk: RiskAssessment = {
      id: "risk-" + Math.random().toString(36).substring(2, 9),
      ...risk,
      created_at: new Date().toISOString(),
    };
    this.riskAssessments.unshift(newRisk);

    const a = this.getAssessmentById(risk.assessment_id);
    this.addTimelineEvent({
      userId: a?.user_id || DEMO_USER_ID,
      assessmentId: risk.assessment_id,
      eventType: "triage_completed",
      title: `Triage Tier: ${risk.tier.toUpperCase()}`,
      description: risk.summary,
    });

    this.saveToLocalStorage();
    return newRisk;
  }

  public getRiskAssessment(assessmentId: string): RiskAssessment | undefined {
    return this.riskAssessments.find((r) => r.assessment_id === assessmentId);
  }

  public getAllRiskAssessments(): RiskAssessment[] {
    return this.riskAssessments;
  }

  public saveActionPlan(plan: Omit<ActionPlan, "id" | "created_at" | "updated_at">): ActionPlan {
    const newPlan: ActionPlan = {
      id: "plan-" + Math.random().toString(36).substring(2, 9),
      ...plan,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.actionPlans.unshift(newPlan);
    this.saveToLocalStorage();
    return newPlan;
  }

  public getActionPlan(assessmentId: string): ActionPlan | undefined {
    return this.actionPlans.find((p) => p.assessment_id === assessmentId);
  }

  public getAllActionPlans(userId: string = DEMO_USER_ID): ActionPlan[] {
    const currentAssessmentIds = new Set(this.getAssessments(userId).map((a) => a.id));
    return this.actionPlans.filter((p) => currentAssessmentIds.has(p.assessment_id));
  }

  public scheduleFollowUp(params: {
    assessmentId: string;
    hours: number;
  }): FollowUp {
    const scheduledFor = new Date(Date.now() + params.hours * 3600000).toISOString();
    const followUp: FollowUp = {
      id: "fu-" + Math.random().toString(36).substring(2, 9),
      assessment_id: params.assessmentId,
      scheduled_for: scheduledFor,
      status: "scheduled",
      created_at: new Date().toISOString(),
      completed_at: null,
    };
    this.followUps.unshift(followUp);

    const a = this.getAssessmentById(params.assessmentId);
    this.addTimelineEvent({
      userId: a?.user_id || DEMO_USER_ID,
      assessmentId: params.assessmentId,
      eventType: "follow_up_scheduled",
      title: "Follow-up Scheduled",
      description: `Automated recovery check-in scheduled for ${new Date(scheduledFor).toLocaleTimeString()} (${params.hours}h).`,
    });

    this.saveToLocalStorage();
    return followUp;
  }

  public getFollowUps(userId: string = DEMO_USER_ID): FollowUp[] {
    const currentAssessmentIds = new Set(this.getAssessments(userId).map((a) => a.id));
    return this.followUps.filter((f) => currentAssessmentIds.has(f.assessment_id));
  }

  public getFollowUpById(id: string): FollowUp | undefined {
    return this.followUps.find((f) => f.id === id);
  }

  public getFollowUpResponses(): FollowUpResponse[] {
    return this.followUpResponses;
  }

  public completeFollowUp(params: {
    followUpId: string;
    outcome: "better" | "same" | "worse" | "new_symptoms";
    severity: number;
    notes: string;
    newSymptoms?: string[];
  }): FollowUpResponse {
    const followUp = this.getFollowUpById(params.followUpId);
    if (followUp) {
      followUp.status = "completed";
      followUp.completed_at = new Date().toISOString();
    }

    const response: FollowUpResponse = {
      id: "fur-" + Math.random().toString(36).substring(2, 9),
      follow_up_id: params.followUpId,
      outcome: params.outcome,
      severity: params.severity,
      notes: params.notes,
      new_symptoms: params.newSymptoms || [],
      created_at: new Date().toISOString(),
    };
    this.followUpResponses.push(response);

    if (followUp) {
      const a = this.getAssessmentById(followUp.assessment_id);
      this.addTimelineEvent({
        userId: a?.user_id || DEMO_USER_ID,
        assessmentId: followUp.assessment_id,
        eventType: "check_in_completed",
        title: `Check-in Completed: ${params.outcome.replace("_", " ").toUpperCase()}`,
        description: `Current reported severity: ${params.severity}/10. Patient note: "${params.notes}"`,
      });
    }

    this.saveToLocalStorage();
    return response;
  }

  public saveReassessment(reassessment: Omit<Reassessment, "id" | "created_at">): Reassessment {
    const item: Reassessment = {
      id: "reassess-" + Math.random().toString(36).substring(2, 9),
      ...reassessment,
      created_at: new Date().toISOString(),
    };
    this.reassessments.push(item);

    const a = this.getAssessmentById(reassessment.assessment_id);
    if (a) {
      a.status = "reassessing";
    }

    this.addTimelineEvent({
      userId: a?.user_id || DEMO_USER_ID,
      assessmentId: reassessment.assessment_id,
      eventType: "reassessment_completed",
      title: `Pathway Reassessed: Escalated to ${item.updated_tier.toUpperCase()}`,
      description: item.escalation_reason || item.change_summary,
    });

    this.saveToLocalStorage();
    return item;
  }

  public getReassessments(assessmentId: string): Reassessment[] {
    return this.reassessments.filter((r) => r.assessment_id === assessmentId);
  }

  public addTimelineEvent(event: {
    userId: string;
    assessmentId: string;
    eventType: string;
    title: string;
    description: string;
    metadata?: Record<string, any>;
  }): TimelineEvent {
    const item: TimelineEvent = {
      id: "tl-" + Math.random().toString(36).substring(2, 9),
      user_id: event.userId,
      assessment_id: event.assessmentId,
      event_type: event.eventType,
      title: event.title,
      description: event.description,
      metadata: event.metadata,
      created_at: new Date().toISOString(),
    };
    this.timelineEvents.unshift(item);
    return item;
  }

  public getTimelineEvents(userId: string = DEMO_USER_ID): TimelineEvent[] {
    const currentAssessmentIds = new Set(this.getAssessments(userId).map((a) => a.id));
    return this.timelineEvents.filter((e) => currentAssessmentIds.has(e.assessment_id) || e.user_id === userId);
  }

  public getHealthPassport(userId: string = DEMO_USER_ID): HealthPassport {
    return this.healthPassport;
  }

  public updateHealthPassport(passport: Partial<HealthPassport>): HealthPassport {
    this.healthPassport = {
      ...this.healthPassport,
      ...passport,
      updated_at: new Date().toISOString(),
    };
    return this.healthPassport;
  }

  public getDocuments(userId: string = DEMO_USER_ID): HealthDocument[] {
    return this.documents.filter((d) => d.user_id === userId);
  }

  public addDocument(doc: Omit<HealthDocument, "id" | "created_at">): HealthDocument {
    const item: HealthDocument = {
      id: "doc-" + Math.random().toString(36).substring(2, 9),
      ...doc,
      created_at: new Date().toISOString(),
    };
    this.documents.unshift(item);
    return item;
  }

  public getPreferences(userId: string = DEMO_USER_ID): UserPreference {
    return this.preferences;
  }

  public updatePreferences(pref: Partial<UserPreference>): UserPreference {
    this.preferences = {
      ...this.preferences,
      ...pref,
      updated_at: new Date().toISOString(),
    };
    return this.preferences;
  }
}

// Global Singleton for in-memory resilience
declare global {
  // eslint-disable-next-line no-var
  var __carewatch_store__: LocalHealthStore | undefined;
}

export const healthStore = globalThis.__carewatch_store__ ?? new LocalHealthStore();
if (process.env.NODE_ENV !== "production") {
  globalThis.__carewatch_store__ = healthStore;
}

