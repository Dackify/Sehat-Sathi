import json
from .gemini_service import call_gemini_structured
from prompts.agent_prompts import EXTRACTION_INTELLIGENCE_PROMPT, IMPACT_ACTION_PROMPT, WORKFLOW_EXECUTION_PROMPT
from .mock_execution import (
    create_escalation_ticket,
    schedule_mock_appointment,
    send_mock_caregiver_alert,
    update_patient_risk_state,
    create_follow_up_reminder
)

# Mock fallback data for stable demo
MOCK_EXTRACTION_DATA = {
    "diagnoses": ["Type 2 diabetes mellitus", "Hypertension", "Advanced chronic kidney disease risk", "Anemia"],
    "symptoms": ["Bilateral pedal edema", "Reduced urine output", "Extreme fatigue", "Poor appetite", "Shortness of breath on exertion"],
    "abnormal_labs": ["Creatinine 3.2 mg/dL, worsened from 1.8 mg/dL six months ago", "eGFR 22 mL/min/1.73m²", "HbA1c 10.1%", "Potassium 5.8 mEq/L", "Hemoglobin 8.4 g/dL"],
    "medications": ["Metformin 1000 mg twice daily", "Amlodipine 10 mg once daily"],
    "follow_up_gaps": ["Last nephrology review 8 months ago", "No dialysis planning discussion documented", "No renal diet counseling documented", "No caregiver escalation plan documented"]
}

MOCK_DETERIORATION_DATA = {
    "deterioration_patterns": [
        "Creatinine worsened from 1.8 to 3.2 mg/dL in six months",
        "eGFR 22 suggests severely reduced kidney function",
        "Potassium 5.8 is a high-risk electrolyte abnormality",
        "Three admissions in six months suggest unstable disease control",
        "HbA1c 10.1% suggests poor glycemic control",
        "Metformin safety concern due to low eGFR",
        "No nephrology review for 8 months despite progressive renal risk"
    ],
    "confidence": 93,
    "top_insight": "This synthetic patient shows progressive renal deterioration with high potassium risk, repeated admissions, poor diabetes control, and missed specialist follow-up."
}

MOCK_IMPACT_DATA = {
    "risk_level": "HIGH",
    "urgency": "Urgent clinician/nephrology review required in a real healthcare setting.",
    "why_it_matters": "The combination of worsening creatinine, eGFR 22, high potassium, edema, reduced urine output, anemia, uncontrolled diabetes, and missed nephrology follow-up suggests high risk of avoidable deterioration if the patient is not escalated.",
    "possible_consequences": [
        "Worsening kidney failure",
        "Hyperkalemia-related cardiac rhythm disturbance",
        "Fluid overload and worsening breathlessness",
        "Avoidable emergency admission",
        "Delayed dialysis planning",
        "Continued medication safety risk"
    ]
}

MOCK_CARE_PLAN_DATA = [
    { "priority": "Critical", "action": "Urgent physician/nephrology review", "reason": "eGFR 22, rising creatinine, reduced urine output, edema, and high potassium", "timeline": "Same day / within 24 hours" },
    { "priority": "Critical", "action": "Medication safety review", "reason": "Metformin is documented despite very low eGFR and requires clinician review", "timeline": "Immediate" },
    { "priority": "High", "action": "Repeat renal profile and potassium", "reason": "Hyperkalemia and renal deterioration require reassessment", "timeline": "Same day" },
    { "priority": "High", "action": "Caregiver alert and follow-up reminder", "reason": "Repeated admissions and missed follow-up suggest continuity failure", "timeline": "Today" },
    { "priority": "Medium", "action": "Dietitian referral and renal diet education", "reason": "Advanced CKD risk requires dietary counseling", "timeline": "Within 1 week" }
]

# Track source globally for the duration of the pipeline execution
PIPELINE_SOURCE = "gemini"

def run_clinical_intake(patient_case: dict):
    # Combines patient case into structured block
    unstructured_text = "\\n".join([f"{k}: {v}" for k, v in patient_case.items()])
    return unstructured_text

def run_extraction_and_intelligence(unstructured_text: str):
    global PIPELINE_SOURCE
    gemini_result = call_gemini_structured(EXTRACTION_INTELLIGENCE_PROMPT, unstructured_text)
    if gemini_result and "extraction" in gemini_result and "intelligence" in gemini_result:
        return gemini_result
    
    # Fallback to mock data
    PIPELINE_SOURCE = "mock_fallback"
    return {
        "extraction": MOCK_EXTRACTION_DATA,
        "intelligence": MOCK_DETERIORATION_DATA
    }

def run_impact_and_action_planning(stage1_output: dict):
    global PIPELINE_SOURCE
    gemini_result = call_gemini_structured(IMPACT_ACTION_PROMPT, json.dumps(stage1_output))
    if gemini_result and "impact" in gemini_result and "action_plan" in gemini_result:
        return gemini_result
    
    # Fallback to mock data
    PIPELINE_SOURCE = "mock_fallback"
    return {
        "impact": MOCK_IMPACT_DATA,
        "action_plan": MOCK_CARE_PLAN_DATA
    }

def run_execution_preview():
    # Simulate execution using mock APIs deterministically.
    # We do not use Gemini for this to keep the demo execution reliable and timestamped cleanly.
    logs = [
        f"[{create_escalation_ticket()['timestamp']}] POST /mock-care-tickets -> Urgent nephrology review ticket created: SS-TKT-8841",
        f"[{schedule_mock_appointment()['timestamp']}] POST /mock-appointments -> Nephrology review scheduled: Tomorrow 10:30 AM",
        f"[{send_mock_caregiver_alert()['timestamp']}] POST /mock-alerts -> Caregiver alert generated: HIGH renal risk detected",
        f"[{update_patient_risk_state()['timestamp']}] PATCH /mock-dashboard/patient/SS-204 -> Risk flag updated to HIGH",
        f"[{create_follow_up_reminder()['timestamp']}] POST /mock-reminders -> 24-hour follow-up reminder created"
    ]
    
    return {
        "before_state": {
            "risk": "UNKNOWN",
            "care_status": "No active care coordination plan",
            "appointment": "Not scheduled",
            "caregiver_alert": "Not sent",
            "dashboard_flag": "Inactive",
            "follow_up": "Not created"
        },
        "execution_logs": logs,
        "after_state": {
            "risk": "HIGH",
            "care_status": "Escalated for urgent follow-up",
            "appointment": "Nephrology review scheduled — Tomorrow 10:30 AM",
            "caregiver_alert": "Sent — High renal risk warning",
            "dashboard_flag": "HIGH RISK ACTIVE",
            "follow_up": "24-hour follow-up reminder created"
        },
        "simulated_actions": [
            create_escalation_ticket(),
            schedule_mock_appointment(),
            send_mock_caregiver_alert(),
            update_patient_risk_state(),
            create_follow_up_reminder()
        ]
    }

def build_agent_trace():
    return [
        "Workplan created",
        "Clinical Intake Agent executed",
        "Medical facts extracted",
        "Deterioration patterns detected",
        "Risk classified as HIGH",
        "Care plan generated",
        "Workflow execution simulated",
        "Patient state updated"
    ]

def get_pipeline_source():
    global PIPELINE_SOURCE
    return PIPELINE_SOURCE

def reset_pipeline_source():
    global PIPELINE_SOURCE
    PIPELINE_SOURCE = "gemini"
