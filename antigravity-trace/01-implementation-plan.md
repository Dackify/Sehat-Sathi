# Implementation Plan

## Project Name
Shifa Sathi

## Challenge
Challenge 1 — Autonomous Content-to-Action Agent

## Goal of the System
To transform synthetic fragmented clinical records into structured insight, coordinated action, and visible outcome change. The system aims to bridge the gap between passive record summarization and active care coordination.

## Why We Selected This Challenge
In many healthcare settings, particularly in resource-constrained environments like Pakistan, critical patient risk signals are often buried in fragmented notes, verbal histories, and scattered lab results. We selected Challenge 1 to demonstrate that agentic AI can go beyond mere summarization—it can actively recognize deterioration and initiate life-saving workflows before adverse events occur.

## Overall Workflow
synthetic patient input → clinical intake → medical extraction → deterioration intelligence → clinical impact analysis → care planning → workflow execution simulation → outcome state update

## Mobile App Plan
- **Frontend:** React Native with Expo Go.
- **UI/UX:** Dark healthcare dashboard theme with a serious, clinical, modern, and trustworthy aesthetic.
- **Key Screens:** Patient Intake, Agent Processing, Risk Dashboard, Action Execution Center, Outcome State, and Agent Trace.

## Backend Plan
- **Framework:** FastAPI running on Python.
- **Architecture:** Lightweight service layer designed for local execution and Cloud Run deployment readiness.
- **Endpoints:** `/health`, `/analyze-patient`, `/execute-workflow`.

## Gemini-Ready Architecture Plan
- Integrated `google-generativeai` via `gemini_service.py`.
- Designed three distinct, strictly typed system prompts for extraction, impact analysis, and workflow execution.
- Enforced structured JSON generation and error handling to prevent frontend crashes.
- Gemini API key handled exclusively on the backend via `.env`.

## Mock Fallback Plan
- Implemented a robust fail-safe mechanism in both the FastAPI backend and Expo frontend.
- If the `GEMINI_API_KEY` is missing, rate-limited, or unavailable, the system safely falls back to deterministic mock data.
- Ensures the hackathon demonstration remains 100% stable under any networking or API constraint.
- The UI dynamically displays the pipeline source ("Gemini Backend" vs "Mock Fallback").

## Submission Artifact Plan
- Deliver the GitHub repository with clean frontend/backend architecture.
- Provide comprehensive `README.md` documentation including EAS APK build instructions.
- Submit a full Antigravity trace and execution log folder.
- Provide an installable Android APK.
- Provide a demo video and Antigravity usage video.
