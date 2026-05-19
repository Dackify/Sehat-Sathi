import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { AppContext } from '../state/AppContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OutcomeState'>;
};

const COMPARISON_DATA = [
  {
    label: 'Risk Status',
    before: 'UNKNOWN',
    after: 'HIGH',
    isHighRisk: true
  },
  {
    label: 'Care Coordination Status',
    before: 'No active care coordination plan',
    after: 'Escalated for urgent follow-up'
  },
  {
    label: 'Appointment',
    before: 'Not scheduled',
    after: 'Nephrology review scheduled — Tomorrow 10:30 AM'
  },
  {
    label: 'Caregiver Alert',
    before: 'Not sent',
    after: 'Sent — High renal risk warning'
  },
  {
    label: 'Dashboard Flag',
    before: 'Inactive',
    after: 'HIGH RISK ACTIVE',
    isHighRisk: true
  },
  {
    label: 'Follow-Up Reminder',
    before: 'Not created',
    after: '24-hour follow-up reminder created'
  },
  {
    label: 'Medication Safety Review',
    before: 'Not flagged',
    after: 'Medication safety review required'
  },
  {
    label: 'Specialist Follow-Up Gap',
    before: 'Unresolved — no nephrology review in 8 months',
    after: 'Escalation ticket created for nephrology review'
  }
];

export default function OutcomeStateScreen({ navigation }: Props) {
  const { isWorkflowExecuted } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Outcome State</Text>
          <Text style={styles.headerSubtitle}>Visible system change after simulated clinical workflow execution.</Text>
        </View>

        {!isWorkflowExecuted && (
          <View style={styles.warningCard}>
            <Text style={styles.warningText}>Note: You bypassed the execution step. The data below shows the theoretical outcome if the workflow was executed.</Text>
          </View>
        )}

        {/* Section 1 — Before vs After Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Before vs After Execution</Text>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.beforeColumn]}>BEFORE</Text>
            <Text style={[styles.columnHeader, styles.afterColumn]}>AFTER</Text>
          </View>

          {COMPARISON_DATA.map((row, index) => (
            <View key={index} style={styles.comparisonRow}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <View style={styles.columnsContainer}>
                <View style={styles.beforeCell}>
                  <Text style={styles.beforeText}>{row.before}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>→</Text>
                </View>
                <View style={styles.afterCell}>
                  <Text style={[
                    styles.afterText, 
                    row.isHighRisk ? styles.afterTextDanger : styles.afterTextSuccess
                  ]}>
                    {row.after}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Section 2 — Impact Summary */}
        <View style={styles.section}>
          <View style={styles.impactCard}>
            <Text style={styles.impactTitle}>What changed?</Text>
            <Text style={styles.impactText}>
              Shifa Sathi converted fragmented synthetic clinical information into a coordinated care workflow. The system identified renal deterioration, high potassium risk, repeated admissions, medication safety concern, and missed specialist follow-up, then simulated escalation through appointment scheduling, caregiver alerting, dashboard flagging, and follow-up reminder creation.
            </Text>
          </View>
        </View>

        {/* Section 3 — Outcome Simulation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simulated 24-Hour Outcome</Text>
          <View style={styles.outcomeCard}>
            <Text style={styles.outcomeItem}>• Patient risk is now visible to the care team</Text>
            <Text style={styles.outcomeItem}>• Caregiver has been notified</Text>
            <Text style={styles.outcomeItem}>• Nephrology review has been scheduled</Text>
            <Text style={styles.outcomeItem}>• Follow-up reminder has been created</Text>
            <Text style={styles.outcomeItem}>• Medication safety concern has been flagged</Text>
            <Text style={styles.outcomeItem}>• Case status changed from passive record to active care coordination</Text>
          </View>
        </View>

        <Text style={styles.disclaimerText}>
          This is a simulated outcome for hackathon demonstration only. No real clinical action was performed.
        </Text>

        {/* Section 4 — Final CTA */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={() => navigation.navigate('PatientIntake')}
          >
            <Text style={styles.buttonText}>Back to Patient Intake</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => navigation.navigate('AgentTrace')}
          >
            <Text style={styles.secondaryButtonText}>View Agent Trace</Text>
          </TouchableOpacity>
        </View>
        
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
  
  warningCard: { backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#F59E0B' },
  warningText: { color: '#F59E0B', fontSize: 13 },
  
  section: { marginBottom: 32 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 8 },
  
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 4 },
  columnHeader: { flex: 1, fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  beforeColumn: { color: colors.textMuted, textAlign: 'left', paddingLeft: 12 },
  afterColumn: { color: colors.primaryLight, textAlign: 'left', paddingLeft: 24 },
  
  comparisonRow: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  rowLabel: { color: colors.text, fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, opacity: 0.9 },
  columnsContainer: { flexDirection: 'row', alignItems: 'center' },
  
  beforeCell: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 8, justifyContent: 'center' },
  beforeText: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  
  arrowContainer: { width: 30, alignItems: 'center', justifyContent: 'center' },
  arrow: { color: colors.textMuted, fontSize: 18 },
  
  afterCell: { flex: 1, backgroundColor: 'rgba(13, 148, 136, 0.08)', padding: 12, borderRadius: 8, justifyContent: 'center' },
  afterText: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  afterTextSuccess: { color: colors.success },
  afterTextDanger: { color: colors.danger },
  
  impactCard: { backgroundColor: 'rgba(13, 148, 136, 0.1)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.primary },
  impactTitle: { color: colors.primaryLight, fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  impactText: { color: colors.text, fontSize: 14, lineHeight: 24 },
  
  outcomeCard: { backgroundColor: colors.card, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  outcomeItem: { color: colors.text, fontSize: 14, lineHeight: 26, marginBottom: 6 },
  
  disclaimerText: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 24, fontStyle: 'italic', opacity: 0.7 },
  
  ctaContainer: { gap: 12 },
  button: { borderRadius: 12, padding: 18, alignItems: 'center' },
  primaryButton: { backgroundColor: colors.primary, shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  secondaryButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  secondaryButtonText: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
});
