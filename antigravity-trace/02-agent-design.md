# Agent Design

## 1. Clinical Intake Agent
**Purpose:** Combines fragmented data into a cohesive package.
**Input:** Raw patient intake fields.
**Reasoning Task:** Organize history, vitals, labs, medications, and follow-up gaps.
**Output:** Structured synthetic case package.
**Next Step:** Medical Extraction Agent triggered.

## 2. Medical Extraction Agent
**Purpose:** Extracts structured clinical facts from unstructured data.
**Input:** Structured case package.
**Reasoning Task:** Extract relevant diagnoses, symptoms, abnormal labs, and gaps.
**Output:** Diagnoses, symptoms, medications, vitals, abnormal labs, follow-up gaps.
**Next Step:** Deterioration Intelligence Agent triggered.

## 3. Deterioration Intelligence Agent
**Purpose:** Detects progressive risk signals.
**Input:** Extracted clinical facts.
**Reasoning Task:** Identify worsening trends and continuity-of-care failures.
**Output:** Renal deterioration, hyperkalemia risk, repeated admissions, medication safety concern, missed specialist follow-up.
**Next Step:** Clinical Impact Agent triggered.

## 4. Clinical Impact Agent
**Purpose:** Assesses severity and possible consequences.
**Input:** Detected deterioration patterns.
**Reasoning Task:** Classify risk level and explain why findings matter.
**Output:** Risk level classified as HIGH; urgency and possible consequences generated.
**Next Step:** Care Planning Agent triggered.

## 5. Care Planning Agent
**Purpose:** Generates prioritized care coordination actions.
**Input:** Impact analysis and risk level.
**Reasoning Task:** Decide what actions must be taken to mitigate the identified risks.
**Output:** Five prioritized actions generated.
**Next Step:** Workflow Execution Agent triggered.

## 6. Workflow Execution Agent
**Purpose:** Simulates the clinical workflow execution.
**Input:** Prioritized action plan.
**Reasoning Task:** Initiate simulated execution workflow.
**Output:** Mock appointment, caregiver alert, escalation ticket, dashboard update, follow-up reminder.
**Next Step:** Outcome State updated.
