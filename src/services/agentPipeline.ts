import { PatientCase } from '../navigation/types';
import { formatPatientCase } from '../utils/formatPatientCase';
import { 
  EXTRACTION_INTELLIGENCE_PROMPT, 
  IMPACT_ACTION_PROMPT, 
  WORKFLOW_EXECUTION_PROMPT 
} from './agentPrompts';

// Mock Output Data to ensure stable hackathon demo
const MOCK_EXTRACTION_DATA = {
  diagnoses: ['Type 2 diabetes mellitus', 'Hypertension', 'Advanced chronic kidney disease risk', 'Anemia'],
  symptoms: ['Bilateral pedal edema', 'Reduced urine output', 'Extreme fatigue', 'Poor appetite', 'Shortness of breath on exertion'],
  abnormalLabs: ['Creatinine 3.2 mg/dL, worsened from 1.8 mg/dL six months ago', 'eGFR 22 mL/min/1.73m²', 'HbA1c 10.1%', 'Potassium 5.8 mEq/L', 'Hemoglobin 8.4 g/dL'],
  medications: ['Metformin 1000 mg twice daily', 'Amlodipine 10 mg once daily'],
  followUpGaps: ['Last nephrology review 8 months ago', 'No dialysis planning discussion documented', 'No renal diet counseling documented', 'No caregiver escalation plan documented']
};

const MOCK_DETERIORATION_DATA = {
  deteriorationPatterns: [
    'Creatinine worsened from 1.8 to 3.2 mg/dL in six months',
    'eGFR 22 suggests severely reduced kidney function',
    'Potassium 5.8 is a high-risk electrolyte abnormality',
    'Three admissions in six months suggest unstable disease control',
    'HbA1c 10.1% suggests poor glycemic control',
    'Metformin safety concern due to low eGFR',
    'No nephrology review for 8 months despite progressive renal risk'
  ],
  confidence: '93%',
  topInsight: 'This synthetic patient shows progressive renal deterioration with high potassium risk, repeated admissions, poor diabetes control, and missed specialist follow-up.'
};

const MOCK_IMPACT_DATA = {
  riskLevel: 'HIGH',
  urgency: 'Urgent clinician/nephrology review required in a real healthcare setting.',
  whyItMatters: 'The combination of worsening creatinine, eGFR 22, high potassium, edema, reduced urine output, anemia, uncontrolled diabetes, and missed nephrology follow-up suggests high risk of avoidable deterioration if the patient is not escalated.',
  possibleConsequences: [
    'Worsening kidney failure',
    'Hyperkalemia-related cardiac rhythm disturbance',
    'Fluid overload and worsening breathlessness',
    'Avoidable emergency admission',
    'Delayed dialysis planning',
    'Continued medication safety risk'
  ]
};

const MOCK_CARE_PLAN_DATA = [
  { priority: 'Critical', action: 'Urgent physician/nephrology review', reason: 'eGFR 22, rising creatinine, reduced urine output, edema, and high potassium', timeline: 'Same day / within 24 hours', colorLevel: 'critical' },
  { priority: 'Critical', action: 'Medication safety review', reason: 'Metformin is documented despite very low eGFR and requires clinician review', timeline: 'Immediate', colorLevel: 'critical' },
  { priority: 'High', action: 'Repeat renal profile and potassium', reason: 'Hyperkalemia and renal deterioration require reassessment', timeline: 'Same day', colorLevel: 'high' },
  { priority: 'High', action: 'Caregiver alert and follow-up reminder', reason: 'Repeated admissions and missed follow-up suggest continuity failure', timeline: 'Today', colorLevel: 'high' },
  { priority: 'Medium', action: 'Dietitian referral and renal diet education', reason: 'Advanced CKD risk requires dietary counseling', timeline: 'Within 1 week', colorLevel: 'medium' }
];

const MOCK_EXECUTION_DATA = {
  logs: [
    'POST /mock-care-tickets → Urgent nephrology review ticket created: SS-TKT-8841',
    'POST /mock-appointments → Nephrology review scheduled: Tomorrow 10:30 AM',
    'POST /mock-alerts → Caregiver alert generated: HIGH renal risk detected',
    'PATCH /mock-dashboard/patient/SS-204 → Risk flag updated to HIGH',
    'POST /mock-reminders → 24-hour follow-up reminder created'
  ],
  updatedState: {
    risk: 'HIGH',
    careStatus: 'Escalated for urgent follow-up',
    appointment: 'Nephrology review scheduled — Tomorrow 10:30 AM',
    caregiverAlert: 'Sent — High renal risk warning',
    dashboardFlag: 'HIGH RISK ACTIVE',
    followUp: '24-hour follow-up reminder created'
  }
};

/**
 * Stage 1
 */
export const runExtractionAndIntelligence = async (patientCase: PatientCase) => {
  const formatted = formatPatientCase(patientCase);
  // Future Gemini call 1 will be inserted here.
  // Example: await callGemini(EXTRACTION_INTELLIGENCE_PROMPT, formatted.unstructuredText);
  return {
    extractionData: MOCK_EXTRACTION_DATA,
    deteriorationData: MOCK_DETERIORATION_DATA
  };
};

/**
 * Stage 2
 */
export const runImpactAndActionPlanning = async (stage1Output: any) => {
  // Future Gemini call 2 will be inserted here.
  // Example: await callGemini(IMPACT_ACTION_PROMPT, JSON.stringify(stage1Output));
  return {
    impactData: MOCK_IMPACT_DATA,
    carePlanData: MOCK_CARE_PLAN_DATA
  };
};

/**
 * Stage 3
 */
export const runWorkflowExecutionSimulation = async (stage2Output: any) => {
  // Future Gemini call 3 will be inserted here.
  // Example: await callGemini(WORKFLOW_EXECUTION_PROMPT, JSON.stringify(stage2Output));
  return {
    executionData: MOCK_EXECUTION_DATA
  };
};

/**
 * Main Pipeline Orchestrator
 * Calls the FastAPI backend. If unavailable, falls back to the local mock orchestrator.
 */
export const runAgentPipeline = async (patientCase: PatientCase) => {
  try {
    // Attempt to call the FastAPI backend
    const response = await fetch('http://localhost:8000/analyze-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_case: {
          patient_id: patientCase.patientId,
          age: patientCase.age,
          sex: patientCase.sex,
          chief_complaint: patientCase.chiefComplaint,
          presenting_history: patientCase.presentingHistory,
          medical_history: patientCase.medicalHistory,
          current_medications: patientCase.currentMedications,
          vitals: patientCase.vitals,
          lab_notes: patientCase.labNotes,
          clinical_context: patientCase.clinicalContext
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        extractionData: data.extraction,
        deteriorationData: data.intelligence,
        impactData: data.impact,
        carePlanData: data.action_plan,
        executionData: data.execution_preview
      };
    }
  } catch (error) {
    console.warn("Backend unavailable, falling back to local mock pipeline.");
  }

  // Fallback to local mock
  const stage1 = await runExtractionAndIntelligence(patientCase);
  const stage2 = await runImpactAndActionPlanning(stage1);
  const stage3 = await runWorkflowExecutionSimulation(stage2);

  return {
    ...stage1,
    ...stage2,
    ...stage3
  };
};
