from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
import os

from services.agent_pipeline import (
    run_clinical_intake,
    run_extraction_and_intelligence,
    run_impact_and_action_planning,
    run_execution_preview,
    build_agent_trace,
    get_pipeline_source,
    reset_pipeline_source
)

app = FastAPI(title="Shifa Sathi Agentic Pipeline")

# Enable CORS for Expo app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientCase(BaseModel):
    patient_id: str
    age: str
    sex: str
    chief_complaint: str
    presenting_history: str
    medical_history: str
    current_medications: str
    vitals: str
    lab_notes: str
    clinical_context: str

class AnalyzeRequest(BaseModel):
    patient_case: PatientCase

class ExecuteRequest(BaseModel):
    patient_id: str
    action_plan: List[Dict[str, Any]]

@app.get("/health")
def health_check():
    from dotenv import load_dotenv
    load_dotenv()
    gemini_ready = bool(os.getenv("GEMINI_API_KEY"))
    return {
        "status": "ok",
        "service": "Shifa Sathi backend",
        "gemini_ready": gemini_ready
    }

@app.post("/analyze-patient")
def analyze_patient(request: AnalyzeRequest):
    # Reset tracking before run
    reset_pipeline_source()
    
    # 1. Clinical Intake
    unstructured_text = run_clinical_intake(request.patient_case.dict())
    
    # 2. Medical Extraction & Deterioration Intelligence
    stage1 = run_extraction_and_intelligence(unstructured_text)
    
    # 3. Clinical Impact & Care Planning
    stage2 = run_impact_and_action_planning(stage1)
    
    # 4. Preview execution (for frontend context)
    execution_preview = run_execution_preview()
    
    # 5. Agent Trace
    trace = build_agent_trace()
    
    return {
        "source": get_pipeline_source(),
        "extraction": stage1.get("extraction", {}),
        "intelligence": stage1.get("intelligence", {}),
        "impact": stage2.get("impact", {}),
        "action_plan": stage2.get("action_plan", []),
        "execution_preview": execution_preview,
        "trace": trace
    }

@app.post("/execute-workflow")
def execute_workflow(request: ExecuteRequest):
    # Actual execution of the workflow
    execution_result = run_execution_preview()
    
    return {
        "before_state": execution_result["before_state"],
        "execution_logs": execution_result["execution_logs"],
        "after_state": execution_result["after_state"],
        "simulated_actions": execution_result["simulated_actions"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
