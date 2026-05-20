# Cloud Run and APK Notes

**Backend:**
- FastAPI backend prepared for Cloud Run
- `/health` endpoint
- `/analyze-patient` endpoint
- `/execute-workflow` endpoint
- Gemini key stored on backend only
- mock fallback if Gemini is unavailable

**Mobile:**
- Expo Go / React Native frontend
- EAS build readiness
- preview APK profile
- backend URL configurable through `EXPO_PUBLIC_API_BASE_URL`
- no secrets stored in frontend
