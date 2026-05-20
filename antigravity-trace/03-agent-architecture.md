# Agent Architecture

## Agent 1 — Clinical Intake Agent
**Purpose:**
Organizes patient intake data into a structured case package.

**Input:**
Patient history, vitals, medications, lab notes, clinical context.

**Output:**
Structured synthetic patient case.

**Next step:**
Medical Extraction Agent.

---

## Agent 2 — Medical Extraction Agent
**Purpose:**
Extracts clinical facts.

**Input:**
Structured patient case.

**Output:**
Diagnoses, symptoms, medications, abnormal labs, vitals, follow-up gaps.

**Next step:**
Deterioration Intelligence Agent.

---

## Agent 3 — Deterioration Intelligence Agent
**Purpose:**
Detects non-trivial risk signals and deterioration patterns.

**Input:**
Extracted clinical facts.

**Output:**
Renal deterioration, hyperkalemia risk, repeated admissions, poor diabetes control, medication safety concern, missed nephrology follow-up.

**Next step:**
Clinical Impact Agent.

---

## Agent 4 — Clinical Impact Agent
**Purpose:**
Explains urgency and consequences.

**Input:**
Detected deterioration patterns.

**Output:**
Risk level HIGH, urgency explanation, possible consequences.

**Next step:**
Care Planning Agent.

---

## Agent 5 — Care Planning Agent
**Purpose:**
Generates prioritized care coordination actions.

**Input:**
Impact analysis.

**Output:**
Urgent nephrology review, medication safety review, repeat renal profile, caregiver alert, dietitian referral.

**Next step:**
Workflow Execution Agent.

---

## Agent 6 — Workflow Execution Agent
**Purpose:**
Simulates execution of the recommended actions.

**Input:**
Prioritized action plan.

**Output:**
Mock escalation ticket, mock appointment, mock caregiver alert, mock dashboard update, mock follow-up reminder.

**Next step:**
Outcome State updated.
