import type { EvidenceSource } from "@/types/database";

const CURATED_EVIDENCE_STORE: EvidenceSource[] = [
  {
    id: "ev-headache-nice",
    topic: "headache",
    title: "Headaches in over 12s: diagnosis and management",
    source_name: "National Institute for Health and Care Excellence (NICE CG150)",
    source_url: "https://www.nice.org.uk/guidance/cg150",
    summary: "Clinical guidelines on identifying primary headache disorders (migraine, tension) versus secondary red-flag warning signs.",
    content: "Examines red flags including sudden thunderclap headache, systemic symptoms, neurological deficit, new onset after 50 years of age, or progression over several days.",
    last_reviewed: "2025-08-15",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ev-dizziness-aafp",
    topic: "dizziness",
    title: "Clinical Evaluation and Triage of Acute Dizziness and Vertigo",
    source_name: "American Academy of Family Physicians (AAFP)",
    source_url: "https://www.aafp.org/pubs/afp/issues/2017/0201/p154.html",
    summary: "Distinguishing benign peripheral conditions from central neurological emergencies.",
    content: "Emphasizes observing temporal pattern (constant vs episodic), postural provocation, and screening for focal neurological deficits.",
    last_reviewed: "2025-09-10",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ev-respiratory-cdc",
    topic: "respiratory",
    title: "Adult Respiratory Illness Guidance and Monitoring",
    source_name: "Centers for Disease Control and Prevention (CDC)",
    source_url: "https://www.cdc.gov/respiratory-viruses/guidance/",
    summary: "Self-care and symptom observation timelines for uncomplicated upper respiratory viral infections.",
    content: "Guidance on hydration, rest, and monitoring for secondary bacterial progression or shortness of breath.",
    last_reviewed: "2025-10-01",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ev-fever-mayo",
    topic: "fever",
    title: "Adult Fever Thresholds and Hydration Management",
    source_name: "Mayo Clinic Clinical Guidance",
    source_url: "https://www.mayoclinic.org/diseases-conditions/fever/symptoms-causes/syc-20352940",
    summary: "Evidence-informed temperature thresholds for home observation versus in-person medical evaluation.",
    content: "Guidance on temperature monitoring intervals, maintaining fluid balance, and warning signs requiring clinical escalation.",
    last_reviewed: "2025-09-25",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ev-abdominal-who",
    topic: "abdominal",
    title: "Evaluation of Acute Abdominal Symptoms in Primary Care",
    source_name: "World Health Organization (WHO) Clinical Practice Guidelines",
    source_url: "https://www.who.int/publications/i/item/acute-abdomen-guidelines",
    summary: "Safety rules for non-specific abdominal discomfort and screening for acute surgical conditions.",
    content: "Red flags include severe localized pain, board-like abdominal rigidity, continuous vomiting, or fever with peritoneal irritation.",
    last_reviewed: "2025-07-20",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function evidenceAgent(params: {
  primaryConcern: string;
  symptoms: Array<{ name: string }>;
  tier: string;
}): Promise<EvidenceSource[]> {
  const { primaryConcern, symptoms } = params;
  const searchTerms = [primaryConcern, ...symptoms.map((s) => s.name)].join(" ").toLowerCase();

  const matched = CURATED_EVIDENCE_STORE.filter((source) => {
    return (
      searchTerms.includes(source.topic) ||
      source.title.toLowerCase().includes(source.topic) ||
      searchTerms.includes(source.topic.slice(0, 4))
    );
  });

  if (matched.length > 0) {
    return matched;
  }

  // Fallback to top 2 general evidence sources
  return CURATED_EVIDENCE_STORE.slice(0, 2);
}

