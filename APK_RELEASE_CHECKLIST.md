# Shifa Sathi - APK Release Checklist

## Before building:
- [ ] App opens with `npx expo start`
- [ ] Use Demo Case works
- [ ] Initiate Assessment works
- [ ] Agent Processing works
- [ ] Risk Dashboard works
- [ ] Execute Workflow works
- [ ] Outcome State works
- [ ] Agent Trace works
- [ ] Mock fallback works
- [ ] Backend URL is correctly configured (via `EXPO_PUBLIC_API_BASE_URL` if not local)
- [ ] No API key in frontend
- [ ] No real patient data

## Build:
- [ ] Run `npx expo-doctor`
- [ ] Fix critical issues
- [ ] Run `eas build -p android --profile preview` (or `npm run android:apk`)
- [ ] Download APK
- [ ] Install APK on Android phone
- [ ] Test complete flow
- [ ] Upload APK to accessible Google Drive folder
- [ ] Set sharing to "anyone with link can view/download"
