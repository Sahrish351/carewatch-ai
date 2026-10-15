-- CareWatch AI Complete Database Schema & Seed Data
-- PostgreSQL / Supabase
-- Clean, idempotent, and rerun-safe migration

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Assessments
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'started',
  primary_concern TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Symptoms
CREATE TABLE IF NOT EXISTS public.symptoms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  severity INT CHECK (severity >= 1 AND severity <= 10),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Assessment Answers
CREATE TABLE IF NOT EXISTS public.assessment_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Agent Events
CREATE TABLE IF NOT EXISTS public.agent_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  input_reference TEXT,
  output_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Risk Assessments
CREATE TABLE IF NOT EXISTS public.risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('self-care', 'monitor', 'see-a-doctor', 'urgent')),
  summary TEXT NOT NULL,
  key_factors JSONB NOT NULL DEFAULT '[]'::jsonb,
  uncertainties JSONB NOT NULL DEFAULT '[]'::jsonb,
  safety_message TEXT NOT NULL,
  recommended_next_step TEXT NOT NULL,
  follow_up_hours INT NOT NULL DEFAULT 24,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Evidence Sources
CREATE TABLE IF NOT EXISTS public.evidence_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  last_reviewed TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT uq_evidence_sources_topic_title UNIQUE (topic, title)
);

-- 8. Action Plans
CREATE TABLE IF NOT EXISTS public.action_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  immediate_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  monitoring_guidance JSONB NOT NULL DEFAULT '[]'::jsonb,
  when_to_seek_care JSONB NOT NULL DEFAULT '[]'::jsonb,
  follow_up_timing TEXT NOT NULL,
  safety_note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Follow Ups
CREATE TABLE IF NOT EXISTS public.follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  scheduled_for TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'due', 'completed', 'missed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ
);

-- 10. Follow Up Responses
CREATE TABLE IF NOT EXISTS public.follow_up_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follow_up_id UUID NOT NULL REFERENCES public.follow_ups(id) ON DELETE CASCADE,
  outcome TEXT NOT NULL CHECK (outcome IN ('better', 'same', 'worse', 'new_symptoms')),
  severity INT NOT NULL CHECK (severity >= 1 AND severity <= 10),
  notes TEXT NOT NULL,
  new_symptoms JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. Reassessments
CREATE TABLE IF NOT EXISTS public.reassessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  previous_follow_up_id UUID NOT NULL REFERENCES public.follow_ups(id) ON DELETE CASCADE,
  change_summary TEXT NOT NULL,
  change_direction TEXT NOT NULL CHECK (change_direction IN ('improving', 'stable', 'worsening', 'new_symptoms')),
  previous_severity INT NOT NULL,
  current_severity INT NOT NULL,
  new_information JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_tier TEXT NOT NULL CHECK (updated_tier IN ('self-care', 'monitor', 'see-a-doctor', 'urgent')),
  updated_next_step TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Timeline Events
CREATE TABLE IF NOT EXISTS public.timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. Health Passport
CREATE TABLE IF NOT EXISTS public.health_passport (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  allergies JSONB NOT NULL DEFAULT '[]'::jsonb,
  medications JSONB NOT NULL DEFAULT '[]'::jsonb,
  conditions JSONB NOT NULL DEFAULT '[]'::jsonb,
  important_information TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Health Documents
CREATE TABLE IF NOT EXISTS public.health_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'uploaded',
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. User Preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'ur_roman')),
  timezone TEXT NOT NULL DEFAULT 'UTC',
  notifications_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON public.assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON public.assessments(status);
CREATE INDEX IF NOT EXISTS idx_symptoms_assessment ON public.symptoms(assessment_id);
CREATE INDEX IF NOT EXISTS idx_answers_assessment ON public.assessment_answers(assessment_id);
CREATE INDEX IF NOT EXISTS idx_agent_events_assessment ON public.agent_events(assessment_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessment ON public.risk_assessments(assessment_id);
CREATE INDEX IF NOT EXISTS idx_action_plans ON public.action_plans(assessment_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups ON public.follow_ups(assessment_id);
CREATE INDEX IF NOT EXISTS idx_timeline_events_user ON public.timeline_events(user_id);
CREATE INDEX IF NOT EXISTS idx_evidence_topic ON public.evidence_sources(topic);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reassessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_passport ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_sources ENABLE ROW LEVEL SECURITY;

-- Idempotent RLS Policies: Safely drop prior policies if they exist, then recreate

-- 1. Evidence sources (Public curated reference)
DROP POLICY IF EXISTS "Allow authenticated read on evidence_sources" ON public.evidence_sources;
CREATE POLICY "Allow authenticated read on evidence_sources"
  ON public.evidence_sources FOR SELECT TO authenticated, anon USING (true);

-- 2. Profiles (Owner restricted visibility and write)
DROP POLICY IF EXISTS "Users can view and manage own profile" ON public.profiles;
CREATE POLICY "Users can view and manage own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Assessments (Owner restricted visibility and write)
DROP POLICY IF EXISTS "Users can view and manage own assessments" ON public.assessments;
CREATE POLICY "Users can view and manage own assessments"
  ON public.assessments FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. Timeline Events (Owner restricted visibility and write)
DROP POLICY IF EXISTS "Users can view and manage own timeline" ON public.timeline_events;
CREATE POLICY "Users can view and manage own timeline"
  ON public.timeline_events FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Health Passport (Owner restricted visibility and write)
DROP POLICY IF EXISTS "Users can view and manage own health_passport" ON public.health_passport;
CREATE POLICY "Users can view and manage own health_passport"
  ON public.health_passport FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Health Documents (Owner restricted visibility and write)
DROP POLICY IF EXISTS "Users can view and manage own documents" ON public.health_documents;
CREATE POLICY "Users can view and manage own documents"
  ON public.health_documents FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 7. User Preferences (Owner restricted visibility and write)
DROP POLICY IF EXISTS "Users can view and manage own preferences" ON public.user_preferences;
CREATE POLICY "Users can view and manage own preferences"
  ON public.user_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 8. Symptoms (Child table restricted through assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own symptoms" ON public.symptoms;
CREATE POLICY "Users can view and manage own symptoms"
  ON public.symptoms FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()))
  WITH CHECK (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()));

-- 9. Assessment Answers (Child table restricted through assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own answers" ON public.assessment_answers;
CREATE POLICY "Users can view and manage own answers"
  ON public.assessment_answers FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()))
  WITH CHECK (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()));

-- 10. Agent Events (Child table restricted through assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own agent_events" ON public.agent_events;
CREATE POLICY "Users can view and manage own agent_events"
  ON public.agent_events FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()))
  WITH CHECK (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()));

-- 11. Risk Assessments (Child table restricted through assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own risk_assessments" ON public.risk_assessments;
CREATE POLICY "Users can view and manage own risk_assessments"
  ON public.risk_assessments FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()))
  WITH CHECK (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()));

-- 12. Action Plans (Child table restricted through assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own action_plans" ON public.action_plans;
CREATE POLICY "Users can view and manage own action_plans"
  ON public.action_plans FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()))
  WITH CHECK (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()));

-- 13. Follow Ups (Child table restricted through assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own follow_ups" ON public.follow_ups;
CREATE POLICY "Users can view and manage own follow_ups"
  ON public.follow_ups FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()))
  WITH CHECK (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()));

-- 14. Follow Up Responses (Child table restricted through follow_up -> assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own follow_up_responses" ON public.follow_up_responses;
CREATE POLICY "Users can view and manage own follow_up_responses"
  ON public.follow_up_responses FOR ALL
  USING (follow_up_id IN (
    SELECT f.id FROM public.follow_ups f 
    JOIN public.assessments a ON f.assessment_id = a.id 
    WHERE a.user_id = auth.uid()
  ))
  WITH CHECK (follow_up_id IN (
    SELECT f.id FROM public.follow_ups f 
    JOIN public.assessments a ON f.assessment_id = a.id 
    WHERE a.user_id = auth.uid()
  ));

-- 15. Reassessments (Child table restricted through assessment ownership)
DROP POLICY IF EXISTS "Users can view and manage own reassessments" ON public.reassessments;
CREATE POLICY "Users can view and manage own reassessments"
  ON public.reassessments FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()))
  WITH CHECK (assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid()));

-- Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email))
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert Curated Evidence Sources (Idempotent with ON CONFLICT)
INSERT INTO public.evidence_sources (topic, title, source_name, source_url, summary, content, last_reviewed)
VALUES 
(
  'headache',
  'Headache Assessment and Red Flags Guidance',
  'National Institute for Health and Care Excellence (NICE)',
  'https://www.nice.org.uk/guidance/cg150',
  'Clinical guidance on distinguishing benign tension and migraine episodes from secondary headaches requiring urgent evaluation.',
  'Most headaches are primary disorders (tension, migraine, cluster). Warning red flags include sudden thunderclap onset, focal neurological symptoms, fever with neck stiffness, postural worsening, or progressive worsening over days to weeks.',
  '2025-08-15'
),
(
  'dizziness',
  'Evaluation of Acute Dizziness and Vertigo',
  'American Academy of Family Physicians (AAFP)',
  'https://www.aafp.org/pubs/afp/issues/2017/0201/p154.html',
  'Evidence-informed evaluation of central vs peripheral vertigo, dehydration causes, orthostatic hypotension, and warning criteria.',
  'Dizziness accompanied by new headache, difficulty walking, speech alteration, or unilateral weakness requires immediate clinical escalation. Isolated dizziness that worsens on position change often reflects benign vestibular or postural origins.',
  '2025-09-10'
),
(
  'respiratory',
  'Adult Cough and Upper Respiratory Tract Infection Guidance',
  'Centers for Disease Control and Prevention (CDC)',
  'https://www.cdc.gov/respiratory-viruses/guidance/',
  'Guidance for managing viral respiratory symptoms, distinguishing self-limiting infections from severe lower respiratory infections.',
  'Acute cough with mild fever and nasal congestion is typically self-limiting within 7 to 10 days. Escalation is indicated if dyspnea, resting pulse elevation, oxygen desaturation, or persistent fever beyond 3 days emerges.',
  '2025-10-01'
),
(
  'abdominal',
  'Clinical Guidance on Acute Abdominal Presentations',
  'World Health Organization (WHO)',
  'https://www.who.int/teams/integrated-health-services/clinical-services-and-systems/surgical-care',
  'Triage protocol for abdominal pain: distinguishing diffuse mild discomfort from localized surgical acute abdomen indicators.',
  'Critical red flags include acute severe localized pain (particularly right lower quadrant), rigid abdomen, persistent vomiting, high fever, or gastrointestinal bleeding.',
  '2025-07-20'
),
(
  'fever',
  'Adult Fever Causes and Home Care Thresholds',
  'Mayo Clinic',
  'https://www.mayoclinic.org/diseases-conditions/fever/symptoms-causes/syc-20352940',
  'Safe monitoring intervals, fluid replenishment targets, and threshold indicators for non-emergent vs urgent medical consultations.',
  'Fevers up to 38.9C (102F) in adults without distress are often immune responses to viral illness. Prompt clinical attention is needed if fever exceeds 39.4C (103F), lasts >72 hours, or fails to respond to antipyretics.',
  '2025-09-25'
)
ON CONFLICT (topic, title) DO NOTHING;
