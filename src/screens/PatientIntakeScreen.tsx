import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, PatientCase } from '../navigation/types';
import { colors } from '../theme/colors';
import { AppContext } from '../state/AppContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PatientIntake'>;
};

const DEMO_CASE: PatientCase = {
  patientId: 'Synthetic Patient SS-204',
  age: '68 years',
  sex: 'Male',
  chiefComplaint: 'Swollen feet, reduced urine output, extreme fatigue, poor appetite, and shortness of breath on exertion.',
  presentingHistory: 'A 68-year-old synthetic male patient with long-standing diabetes and hypertension presents with progressively worsening bilateral pedal edema, reduced urine output, severe fatigue, poor appetite, and shortness of breath on walking. Symptoms have gradually worsened over the last several weeks. He has had three hospital admissions in the last six months for edema, uncontrolled blood pressure, weakness, and breathlessness. The family reports irregular medication use and missed specialist follow-up.',
  medicalHistory: '- Type 2 diabetes mellitus for 12 years\n- Hypertension for 9 years\n- Three hospital admissions in the last 6 months\n- Recurrent pedal edema\n- Reduced urine output\n- Irregular medication compliance\n- No documented nephrology review in the last 8 months\n- No documented dietitian referral\n- No documented dialysis planning discussion\n- No structured caregiver follow-up plan documented',
  currentMedications: '- Metformin 1000 mg twice daily\n- Amlodipine 10 mg once daily\n- Irregular compliance documented',
  vitals: '- Blood Pressure: 168/102 mmHg\n- Heart Rate: 94/min\n- SpO2: 94%\n- Shortness of breath on exertion\n- Weak and fatigued general condition',
  labNotes: '- Creatinine: 3.2 mg/dL, previously 1.8 mg/dL six months ago\n- eGFR: 22 mL/min/1.73m²\n- HbA1c: 10.1%\n- Potassium: 5.8 mEq/L\n- Hemoglobin: 8.4 g/dL\n- Last nephrology review: 8 months ago\n- No dialysis planning discussion documented\n- No renal diet counseling documented\n- No caregiver escalation plan documented',
  clinicalContext: 'This synthetic case is designed to demonstrate clinical content-to-action reasoning. It contains multiple risk signals:\n- Worsening renal function\n- Possible advanced chronic kidney disease\n- Hyperkalemia risk\n- Fluid overload symptoms\n- Poor diabetes control\n- Uncontrolled hypertension\n- Anemia\n- Repeated hospital admissions\n- Medication safety concern because metformin is documented despite very low eGFR\n- Missed nephrology follow-up\n- No dialysis planning discussion despite advanced renal risk'
};

export default function PatientIntakeScreen({ navigation }: Props) {
  const [formData, setFormData] = useState<PatientCase>({
    patientId: '', age: '', sex: '', chiefComplaint: '', presentingHistory: '', 
    medicalHistory: '', currentMedications: '', vitals: '', labNotes: '', clinicalContext: ''
  });

  const { setPatientCase } = React.useContext(AppContext);

  const loadDemoCase = () => setFormData(DEMO_CASE);

  const simulateUpload = () => loadDemoCase();

  const initiateAssessment = () => {
    setPatientCase(formData);
    navigation.navigate('AgentProcessing', { patientCase: formData });
  };

  const updateField = (field: keyof PatientCase, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Shifa Sathi</Text>
          <Text style={styles.subtitle}>Agentic Clinical Content-to-Action System</Text>
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ PROTOTYPE SAFETY NOTICE</Text>
          <Text style={styles.warningText}>
            Synthetic demo only. Do not upload real patient data. This prototype does not provide diagnosis or treatment.
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={loadDemoCase}>
            <Text style={styles.secondaryButtonText}>Use Demo Case</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButtonOutline} onPress={simulateUpload}>
            <Text style={styles.secondaryButtonTextOutline}>Upload Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Patient ID / Name</Text>
            <TextInput style={styles.input} value={formData.patientId} onChangeText={(v) => updateField('patientId', v)} placeholder="e.g. Synthetic Patient SS-001" placeholderTextColor={colors.textMuted} />
          </View>
          
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput style={styles.input} value={formData.age} onChangeText={(v) => updateField('age', v)} placeholder="e.g. 68 years" placeholderTextColor={colors.textMuted} />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Sex</Text>
              <TextInput style={styles.input} value={formData.sex} onChangeText={(v) => updateField('sex', v)} placeholder="e.g. Male" placeholderTextColor={colors.textMuted} />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chief Complaint</Text>
            <TextInput style={styles.textArea} value={formData.chiefComplaint} onChangeText={(v) => updateField('chiefComplaint', v)} multiline numberOfLines={3} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Presenting History</Text>
            <TextInput style={styles.textArea} value={formData.presentingHistory} onChangeText={(v) => updateField('presentingHistory', v)} multiline numberOfLines={5} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medical History</Text>
            <TextInput style={styles.textArea} value={formData.medicalHistory} onChangeText={(v) => updateField('medicalHistory', v)} multiline numberOfLines={5} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Medications</Text>
            <TextInput style={styles.textArea} value={formData.currentMedications} onChangeText={(v) => updateField('currentMedications', v)} multiline numberOfLines={3} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vitals</Text>
            <TextInput style={styles.textArea} value={formData.vitals} onChangeText={(v) => updateField('vitals', v)} multiline numberOfLines={3} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lab Notes</Text>
            <TextInput style={styles.textArea} value={formData.labNotes} onChangeText={(v) => updateField('labNotes', v)} multiline numberOfLines={5} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Clinical Context</Text>
            <TextInput style={styles.textArea} value={formData.clinicalContext} onChangeText={(v) => updateField('clinicalContext', v)} multiline numberOfLines={5} placeholderTextColor={colors.textMuted} />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={initiateAssessment}>
          <Text style={styles.buttonText}>INITIATE ASSESSMENT</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20 },
  header: { marginTop: 10, marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primaryLight, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  warningCard: { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderWidth: 1, borderColor: colors.danger, borderRadius: 12, padding: 16, marginBottom: 20 },
  warningTitle: { color: colors.danger, fontWeight: 'bold', fontSize: 14, marginBottom: 8 },
  warningText: { color: colors.text, fontSize: 13, lineHeight: 20 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  secondaryButton: { flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginRight: 8 },
  secondaryButtonText: { color: colors.primaryLight, fontWeight: '600', fontSize: 14 },
  secondaryButtonOutline: { flex: 1, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginLeft: 8 },
  secondaryButtonTextOutline: { color: colors.text, fontWeight: '600', fontSize: 14 },
  formContainer: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.border },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: colors.textMuted, fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, color: colors.text, fontSize: 14 },
  textArea: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, color: colors.text, fontSize: 14, minHeight: 80, textAlignVertical: 'top' },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 18, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
