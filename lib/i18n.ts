export type Language = "en" | "ur_roman";

export interface Translations {
  appName: string;
  tagline: string;
  startHealthCheck: string;
  seeHowItWorks: string;
  dashboard: string;
  myJourneys: string;
  timeline: string;
  followUps: string;
  actionPlans: string;
  healthPassport: string;
  documents: string;
  settings: string;
  logOut: string;
  logIn: string;
  register: string;
  goodDay: string;
  howFeelingToday: string;
  activeJourney: string;
  upcomingCheckIn: string;
  recentAssessments: string;
  quickActions: string;
  tierSelfCare: string;
  tierMonitor: string;
  tierSeeDoctor: string;
  tierUrgent: string;
  whyRecommendation: string;
  whatIsUncertain: string;
  whatCouldChange: string;
  evidenceAndSources: string;
  whatToDoNow: string;
  whatToMonitor: string;
  whenToSeekHelp: string;
  howFeelingNow: string;
  better: string;
  same: string;
  worse: string;
  newSymptoms: string;
  reassessmentTriggered: string;
  disclaimer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "CareWatch AI",
    tagline: "Understand today. Check in tomorrow. Act when it matters.",
    startHealthCheck: "Start a Health Check",
    seeHowItWorks: "See How It Works",
    dashboard: "Dashboard",
    myJourneys: "My Journeys",
    timeline: "Timeline",
    followUps: "Follow-ups",
    actionPlans: "Action Plans",
    healthPassport: "Health Passport",
    documents: "Documents",
    settings: "Settings",
    logOut: "Log out",
    logIn: "Log in",
    register: "Register",
    goodDay: "Good day",
    howFeelingToday: "How are you feeling today?",
    activeJourney: "Active Health Journey",
    upcomingCheckIn: "Upcoming Check-in",
    recentAssessments: "Recent Assessments",
    quickActions: "Quick Actions",
    tierSelfCare: "Self-Care",
    tierMonitor: "Monitor Closely",
    tierSeeDoctor: "See a Healthcare Professional",
    tierUrgent: "Urgent Attention Needed",
    whyRecommendation: "Why this recommendation?",
    whatIsUncertain: "What is uncertain?",
    whatCouldChange: "What could change this?",
    evidenceAndSources: "Evidence & Sources",
    whatToDoNow: "What to do now",
    whatToMonitor: "What to monitor",
    whenToSeekHelp: "When to seek emergency help",
    howFeelingNow: "How are you feeling now?",
    better: "Better / Improving",
    same: "About the same",
    worse: "Worse",
    newSymptoms: "New symptoms noticed",
    reassessmentTriggered: "Reassessment Triggered",
    disclaimer:
      "CareWatch provides AI-generated health guidance for informational and navigation purposes. It does not diagnose conditions or replace professional medical care.",
  },
  ur_roman: {
    appName: "CareWatch AI",
    tagline: "Aaj samjhein. Kal check-in karein. Zaroori waqt par qadam uthayein.",
    startHealthCheck: "Sehat Ki Jaanch Shuru Karein",
    seeHowItWorks: "Yeh Kaise Kaam Karta Hai",
    dashboard: "Dashboard",
    myJourneys: "Meri Sehat Ka Safar",
    timeline: "Timeline",
    followUps: "Follow-ups",
    actionPlans: "Amal Ka Mansooba",
    healthPassport: "Health Passport",
    documents: "Dastavezaat",
    settings: "Settings",
    logOut: "Log out karein",
    logIn: "Log in karein",
    register: "Register karein",
    goodDay: "Khushamdeed",
    howFeelingToday: "Aaj aap ki tabiyat kaisi hai?",
    activeJourney: "Mojooda Sehat Ka Safar",
    upcomingCheckIn: "Agla Check-in",
    recentAssessments: "Haaliya Jaanch",
    quickActions: "Fauri Iqdaamaat",
    tierSelfCare: "Gharelu Dekhbhal",
    tierMonitor: "Nigraani Karein",
    tierSeeDoctor: "Doctor Se Mashwara Karein",
    tierUrgent: "Fauri Tawajjah Zaroori",
    whyRecommendation: "Yeh tajweez kyun di gayi?",
    whatIsUncertain: "Kya cheez ghair-yaqeeni hai?",
    whatCouldChange: "Kya cheez isay tabdeel kar sakti hai?",
    evidenceAndSources: "Tibb-i Hawala-jaat",
    whatToDoNow: "Ab kya karna hai",
    whatToMonitor: "Kin alamat par nazar rakhni hai",
    whenToSeekHelp: "Emergency madad kab leni hai",
    howFeelingNow: "Ab aap ki tabiyat kaisi hai?",
    better: "Behtar / Faida hua hai",
    same: "Taqreeban waisi hi hai",
    worse: "Kharab ho gayi hai",
    newSymptoms: "Nayi alamaat zahir hui hain",
    reassessmentTriggered: "Dobara Jaanch Shuru Hui",
    disclaimer:
      "CareWatch AI sirf rehnumai aur maloomat faraham karta hai. Yeh kisi bimari ki tashkhees nahi karta aur na hi doctor ka mutabadil hai.",
  },
};

