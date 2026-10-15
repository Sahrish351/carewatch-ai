export type TriageTier = "self-care" | "monitor" | "see-a-doctor" | "urgent";

export type AssessmentStatus =
  | "started"
  | "intake_complete"
  | "questioning"
  | "triage_ready"
  | "completed"
  | "monitoring"
  | "reassessing"
  | "resolved";

export type FollowUpStatus = "scheduled" | "due" | "completed" | "missed";

export type ChangeDirection = "improving" | "stable" | "worsening" | "new_symptoms";

export type AgentType =
  | "intake_agent"
  | "question_agent"
  | "triage_agent"
  | "evidence_agent"
  | "action_plan_agent"
  | "explanation_agent"
  | "follow_up_agent"
  | "reassessment_agent";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  title: string;
  status: AssessmentStatus;
  primary_concern: string;
  started_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Symptom {
  id: string;
  assessment_id: string;
  name: string;
  duration: string;
  severity: number | null; // 1-10
  description: string | null;
  created_at: string;
}

export interface AssessmentAnswer {
  id: string;
  assessment_id: string;
  question: string;
  answer: string;
  question_type: string;
  created_at: string;
}

export interface AgentEvent {
  id: string;
  assessment_id: string;
  agent_type: AgentType;
  event_type: string;
  status: "started" | "completed" | "failed";
  input_reference?: string | null;
  output_summary: string;
  created_at: string;
}

export interface RiskAssessment {
  id: string;
  assessment_id: string;
  tier: TriageTier;
  summary: string;
  key_factors: string[];
  uncertainties: string[];
  safety_message: string;
  recommended_next_step: string;
  follow_up_hours: number;
  created_at: string;
}

export interface EvidenceSource {
  id: string;
  topic: string;
  title: string;
  source_name: string;
  source_url: string;
  summary: string;
  content: string;
  last_reviewed: string;
  created_at: string;
  updated_at: string;
}

export interface ActionPlan {
  id: string;
  assessment_id: string;
  summary: string;
  immediate_steps: string[];
  monitoring_guidance: string[];
  when_to_seek_care: string[];
  follow_up_timing: string;
  safety_note: string;
  created_at: string;
  updated_at: string;
}

export interface FollowUp {
  id: string;
  assessment_id: string;
  scheduled_for: string;
  status: FollowUpStatus;
  created_at: string;
  completed_at: string | null;
}

export interface FollowUpResponse {
  id: string;
  follow_up_id: string;
  outcome: "better" | "same" | "worse" | "new_symptoms";
  severity: number; // 1-10
  notes: string;
  new_symptoms?: string[];
  created_at: string;
}

export interface Reassessment {
  id: string;
  assessment_id: string;
  previous_follow_up_id: string;
  change_summary: string;
  change_direction: ChangeDirection;
  previous_severity: number;
  current_severity: number;
  new_information: string[];
  updated_tier: TriageTier;
  updated_next_step: string;
  escalation_reason?: string;
  updated_monitoring_guidance?: string[];
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  user_id: string;
  assessment_id: string;
  event_type: string;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface HealthPassport {
  id: string;
  user_id: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  important_information: string;
  updated_at: string;
}

export interface HealthDocument {
  id: string;
  user_id: string;
  file_name: string;
  storage_path: string;
  file_type: string;
  status: "uploaded" | "indexed" | "analyzed";
  summary?: string;
  created_at: string;
}

export interface UserPreference {
  id: string;
  user_id: string;
  language: "en" | "ur_roman";
  timezone: string;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
}

