import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AgentTrace'>;
};

const TRACE_DATA = {
  workplan: [
    "1. Receive synthetic patient intake data",
    "2. Organize patient history, vitals, labs, medications, and follow-up gaps",
    "3. Extract structured clinical facts",
    "4. Detect deterioration patterns and continuity-of-care failures",
    "5. Analyze clinical impact and urgency",
    "6. Generate prioritized care coordination actions",
    "7. Simulate workflow execution",
    "8. Update visible patient system state"
  ],
  task_plan: [
    "Build Patient Intake screen",
    "Add synthetic demo case",
    "Run Clinical Intake Agent",
    "Run Medical Extraction Agent",
    "Run Deterioration Intelligence Agent",
    "Run Clinical Impact Agent",
    "Run Care Planning Agent",
    "Run Workflow Execution Agent",
    "Show Risk Dashboard",
    "Show Action Execution Center",
    "Show Outcome State"
  ],
  agent_decision_flow: [
    {
      agent: "Clinical Intake Agent",
      input: "Patient intake fields",
      decision: "Case data is sufficient for structured clinical processing",
      output: "Structured synthetic case package created",
      next_step: "Medical Extraction Agent triggered",
      isHighRisk: false
    },
    {
      agent: "Medical Extraction Agent",
      input: "Structured case package",
      decision: "Clinical facts extracted from synthetic content",
      output: "Diagnoses, symptoms, medications, vitals, abnormal labs, follow-up gaps",
      next_step: "Deterioration Intelligence Agent triggered",
      isHighRisk: false
    },
    {
      agent: "Deterioration Intelligence Agent",
      input: "Extracted clinical facts",
      decision: "Risk signals indicate progressive deterioration",
      output: "Renal deterioration, hyperkalemia risk, repeated admissions, medication safety concern, missed specialist follow-up",
      next_step: "Clinical Impact Agent triggered",
      isHighRisk: true
    },
    {
      agent: "Clinical Impact Agent",
      input: "Detected deterioration patterns",
      decision: "Risk level classified as HIGH",
      output: "Urgency and possible consequences generated",
      next_step: "Care Planning Agent triggered",
      isHighRisk: true
    },
    {
      agent: "Care Planning Agent",
      input: "Impact analysis and risk level",
      decision: "Care coordination actions required",
      output: "Five prioritized actions generated",
      next_step: "Workflow Execution Agent triggered",
      isHighRisk: false
    },
    {
      agent: "Workflow Execution Agent",
      input: "Prioritized action plan",
      decision: "Simulated execution workflow initiated",
      output: "Mock appointment, caregiver alert, escalation ticket, dashboard update, follow-up reminder",
      next_step: "Outcome State updated",
      isHighRisk: false
    }
  ],
  execution_logs: [
    "[10:42:01] POST /mock-care-tickets → Urgent nephrology review ticket created: SS-TKT-8841",
    "[10:42:03] POST /mock-appointments → Nephrology review scheduled: Tomorrow 10:30 AM",
    "[10:42:05] POST /mock-alerts → Caregiver alert generated: HIGH renal risk detected",
    "[10:42:08] PATCH /mock-dashboard/patient/SS-204 → Risk flag updated to HIGH",
    "[10:42:10] POST /mock-reminders → 24-hour follow-up reminder created"
  ],
  orchestration_note: "Google Antigravity is used as the core development and orchestration environment for planning the agent workflow, generating implementation tasks, structuring agent reasoning, designing tool/API simulation, and producing traceable execution artifacts. The current prototype uses mock outputs for stable demonstration, while the service layer is structured for Gemini JSON calls and Antigravity-orchestrated execution.",
  safety_note: "All records in this prototype are synthetic/anonymized. No real patient data is used. No real clinical action is performed. This system does not provide diagnosis or treatment and requires qualified clinician oversight in any real-world setting."
};

export default function AgentTraceScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>System Agent Trace</Text>
          <Text style={styles.headerSubtitle}>Antigravity Orchestration & Reasoning Logs</Text>
        </View>

        {/* Section 1 - Workplan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECTION 1 — Workplan</Text>
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Workplan created for Shifa Sathi:</Text>
            {TRACE_DATA.workplan.map((item, index) => (
              <Text key={index} style={styles.listItem}>{item}</Text>
            ))}
          </View>
        </View>

        {/* Section 2 - Task Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECTION 2 — Task Plan</Text>
          <View style={styles.card}>
            {TRACE_DATA.task_plan.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </View>

        {/* Section 3 - Agent Decision Flow */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECTION 3 — Agent Decision Flow</Text>
          {TRACE_DATA.agent_decision_flow.map((flow, index) => (
            <View key={index} style={[styles.flowCard, flow.isHighRisk && styles.flowCardDanger]}>
              <View style={styles.badgeContainer}>
                <View style={[styles.badge, flow.isHighRisk ? styles.badgeDanger : styles.badgePrimary]}>
                  <Text style={[styles.badgeText, flow.isHighRisk ? styles.badgeTextDanger : styles.badgeTextPrimary]}>
                    {flow.agent}
                  </Text>
                </View>
              </View>
              <Text style={styles.flowItem}><Text style={styles.flowLabel}>Input: </Text>{flow.input}</Text>
              <Text style={styles.flowItem}><Text style={styles.flowLabel}>Decision: </Text>{flow.decision}</Text>
              <Text style={styles.flowItem}><Text style={styles.flowLabel}>Output: </Text>{flow.output}</Text>
              <Text style={styles.flowNext}><Text style={styles.flowLabel}>Next Step: </Text>{flow.next_step}</Text>
            </View>
          ))}
        </View>

        {/* Section 4 - Execution Logs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECTION 4 — Execution Logs</Text>
          <View style={styles.terminal}>
            {TRACE_DATA.execution_logs.map((log, index) => (
              <Text key={index} style={styles.terminalText}>{log}</Text>
            ))}
          </View>
        </View>

        {/* Section 5 - Antigravity Orchestration Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECTION 5 — Antigravity Orchestration Note</Text>
          <View style={styles.cardSecondary}>
            <Text style={styles.noteText}>{TRACE_DATA.orchestration_note}</Text>
          </View>
        </View>

        {/* Section 6 - Safety and Ethics Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECTION 6 — Safety and Ethics Note</Text>
          <View style={styles.cardWarning}>
            <Text style={styles.warningText}>{TRACE_DATA.safety_note}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.buttonMain} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonMainText}>Go Back</Text>
        </TouchableOpacity>

        <Text style={styles.footerDisclaimer}>
          Synthetic demo only. No real clinical action performed.
        </Text>

        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20 },
  
  header: { marginBottom: 24 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  headerSubtitle: { fontSize: 14, color: colors.primaryLight, lineHeight: 20 },
  
  section: { marginBottom: 32 },
  sectionTitle: { color: colors.primaryLight, fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: colors.border },
  cardSecondary: { backgroundColor: 'rgba(13, 148, 136, 0.05)', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: colors.primary },
  cardWarning: { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#F59E0B' },
  
  cardHeader: { color: colors.text, fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  listItem: { color: colors.text, fontSize: 14, lineHeight: 24, marginBottom: 4 },
  
  flowCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  flowCardDanger: { borderColor: colors.danger, backgroundColor: 'rgba(239, 68, 68, 0.05)' },
  
  badgeContainer: { flexDirection: 'row', marginBottom: 12 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
  badgePrimary: { backgroundColor: 'rgba(13, 148, 136, 0.1)', borderColor: colors.primary },
  badgeDanger: { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: colors.danger },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  badgeTextPrimary: { color: colors.primaryLight },
  badgeTextDanger: { color: colors.danger },
  
  flowItem: { color: colors.text, fontSize: 14, lineHeight: 22, marginBottom: 6 },
  flowLabel: { fontWeight: 'bold', color: colors.textMuted },
  flowNext: { color: colors.primaryLight, fontSize: 14, fontWeight: '600', marginTop: 8, fontStyle: 'italic' },
  
  terminal: { backgroundColor: '#020617', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  terminalText: { color: '#10B981', fontFamily: 'monospace', fontSize: 13, marginBottom: 10, lineHeight: 20 },
  
  noteText: { color: colors.text, fontSize: 14, lineHeight: 22 },
  warningText: { color: '#F59E0B', fontSize: 14, lineHeight: 22, fontWeight: '500' },
  
  buttonMain: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 20, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6, marginTop: 10 },
  buttonMainText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  footerDisclaimer: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 24, fontStyle: 'italic', opacity: 0.6 }
});
