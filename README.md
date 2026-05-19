# Shifa Sathi
Agentic Clinical Content-to-Action and Care Coordination System

## Challenge
Challenge 1 — Autonomous Content-to-Action Agent

## Project Overview
Shifa Sathi is a mobile-first agentic AI prototype that transforms synthetic unstructured clinical content into structured insight, detects deterioration patterns, generates care coordination actions, simulates workflow execution, and shows visible before/after outcome state change.

It is designed around the Challenge 1 flow:
unstructured input → insight extraction → impact analysis → action generation → simulated execution → outcome visualization.

## Problem
In Pakistan and similar healthcare settings, patient records are often fragmented across prescriptions, lab slips, discharge summaries, WhatsApp images, and verbal history. Important risk signals such as worsening labs, medication safety concerns, missed follow-ups, and repeated admissions can be buried inside scattered information.

Most AI tools stop at summarization. Shifa Sathi demonstrates what happens when clinical content is converted into action.

## Solution
Shifa Sathi uses a multi-agent workflow to:
1. receive synthetic patient intake data
2. structure the case
3. extract clinical facts
4. detect deterioration patterns
5. analyze clinical impact
6. generate prioritized care actions
7. simulate workflow execution
8. update visible patient system state

## Core Demo Flow
Synthetic patient intake
→ Clinical Intake Agent
→ Medical Extraction Agent
→ Deterioration Intelligence Agent
→ Clinical Impact Agent
→ Care Planning Agent
→ Workflow Execution Agent
→ Risk Dashboard
→ Action Execution Center
→ Outcome State

## Synthetic Demo Case
The demo uses Synthetic Patient SS-204, a 68-year-old male with diabetes, hypertension, repeated admissions, worsening renal function, high potassium risk, anemia, missed nephrology follow-up, and medication safety concern.

Important:
All patient data is synthetic/anonymized. No real patient record, MR number, phone number, hospital identifier, or sensitive personal information is used.

## Agent Architecture

### 1. Clinical Intake Agent
Combines patient history, vitals, medication data, lab notes, and follow-up gaps into a structured case package.

### 2. Medical Extraction Agent
Extracts diagnoses, symptoms, medications, vitals, abnormal labs, and follow-up gaps.

### 3. Deterioration Intelligence Agent
Detects renal deterioration, hyperkalemia risk, repeated admissions, poor diabetes control, medication safety concern, and missed specialist follow-up.

### 4. Clinical Impact Agent
Classifies urgency, explains why the findings matter, and identifies possible consequences if follow-up is missed.

### 5. Care Planning Agent
Generates prioritized care coordination actions.

### 6. Workflow Execution Agent
Simulates appointment scheduling, caregiver alert, escalation ticket creation, dashboard update, and follow-up reminder creation.

## Action Simulation
The system simulates:
- urgent care ticket creation
- nephrology appointment scheduling
- caregiver alert generation
- dashboard HIGH-risk flag update
- follow-up reminder creation

No real appointment, message, or clinical action is performed.

## Before/After Outcome
Before execution:
- risk unknown
- no appointment scheduled
- no caregiver alert sent
- dashboard inactive
- no follow-up reminder

After execution:
- risk updated to HIGH
- nephrology review scheduled
- caregiver alert sent
- dashboard flag updated to HIGH RISK ACTIVE
- follow-up reminder created
- care coordination status changed to active escalation

## Technical Architecture
Frontend:
- Expo Go
- React Native
- Mobile-first UI

Backend:
- FastAPI
- Structured JSON response design
- Mock workflow execution APIs

AI / Agent Layer:
- Gemini-ready prompt architecture
- Three-stage structured JSON design
- Mock fallback responses for stable demo

Google Antigravity:
Used as the core development and orchestration environment for:
- challenge interpretation
- project planning
- agent workflow design
- task planning
- code generation
- reasoning structure
- tool/API simulation design
- trace/log artifact creation
- debugging and iteration

## Gemini-Ready 3-Call Architecture
Call 1:
Extraction + Intelligence

Call 2:
Impact Analysis + Action Planning

Call 3:
Workflow Execution Simulation

The current prototype uses deterministic mock output for demo stability. The service layer is structured so Gemini structured JSON calls can replace the mock pipeline.

## Safety and Ethics
This is a hackathon prototype only.
All records are synthetic/anonymized.
No real patient data should be uploaded.
No real clinical action is executed.
The system does not provide diagnosis or treatment.
Final clinical decisions require qualified healthcare professionals.

## How to Run

### Frontend
```bash
npm install
npx expo start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Submission Artifacts
Mandatory:
- Mobile app link
- GitHub repository
- 3–5 minute demo video
- 2–3 minute Antigravity usage video
- README / documentation
- Antigravity trace/logs zip

Optional:
- Web app link
- Additional PDF / MD / PPTX support file

## Evaluation Alignment
This project demonstrates:
- content understanding
- insight extraction
- impact analysis
- action generation
- action simulation
- outcome visualization
- traceable agentic workflow
- innovation in healthcare continuity of care
