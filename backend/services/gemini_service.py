import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

# Initialize Gemini SDK if API key is provided
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def call_gemini_structured(prompt: str, input_data: str) -> dict:
    """
    Calls Google Gemini 2.5 Flash for structured JSON extraction.
    - Reads GEMINI_API_KEY from env variables.
    - If missing, safely returns None to trigger the deterministic mock fallback.
    - Expects prompt to heavily constrain output to valid JSON.
    - Parses JSON safely to avoid crashing the hackathon demo.
    """
    if not GEMINI_API_KEY:
        print("GEMINI_API_KEY not found. Falling back to mock data.")
        return None
        
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # We append the input data directly to the prompt
        full_prompt = f"{prompt}\n\nINPUT DATA:\n{input_data}"
        
        # Generation config to encourage JSON output
        response = model.generate_content(
            full_prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json"
            )
        )
        
        response_text = response.text.strip()
        
        # Safely parse JSON
        try:
            parsed_json = json.loads(response_text)
            return parsed_json
        except json.JSONDecodeError as je:
            print(f"Failed to parse Gemini JSON: {je}. Falling back to mock data.")
            return None
            
    except Exception as e:
        print(f"Gemini API call failed: {e}. Falling back to mock data.")
        return None
