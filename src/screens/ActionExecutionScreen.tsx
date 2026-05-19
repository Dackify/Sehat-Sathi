import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { AppContext } from '../state/AppContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ActionExecution'>;
};

const ACTION_PLAN = [
  {
    priority: 'Critical',
    action: 'Urgent physician/nephrology review',
    reason: 'eGFR 22, rising creatinine, reduced urine output, edema, and high potassium indicate urgent renal risk.',
    timeline: 'Same day / within 24 hours',
    colorLevel: 'critical'
  },
  {
    priority: 'Critical',
    action: 'Medication safety review',
    reason: 'Metformin is documented despite very low eGFR and requires clinician review.',
    timeline: 'Immediate',
    colorLevel: 'critical'
  },
  {
    priority: 'High',
    action: 'Repeat renal profile and potassium',
    reason: 'Hyperkalemia and renal deterioration require reassessment.',
    timeline: 'Same day',
    colorLevel: 'high'
  },
  {
    priority: 'High',
    action: 'Caregiver alert and follow-up reminder',
    reason: 'Repeated admissions and missed follow-up suggest a continuity-of-care failure.',
    timeline: 'Today',
    colorLevel: 'high'
  },
  {
    priority: 'Medium',
    action: 'Dietitian referral and renal diet education',
    reason: 'Advanced CKD risk requires dietary counseling and renal diet education.',
    timeline: 'Within 1 week',
    colorLevel: 'medium'
  }
];

const MOCK_LOGS = [
  '[10:42:01] POST /mock-care-tickets\nUrgent nephrology review ticket created: SS-TKT-8841',
  '[10:42:03] POST /mock-appointments\nNephrology review scheduled: Tomorrow 10:30 AM',
  '[10:42:05] POST /mock-alerts\nCaregiver alert generated: HIGH renal risk detected',
  '[10:42:08] PATCH /mock-dashboard/patient/SS-204\nRisk flag updated to HIGH',
  '[10:42:10] POST /mock-reminders\n24-hour follow-up reminder created'
];

export default function ActionExecutionScreen({ navigation }: Props) {
  const { setIsWorkflowExecuted } = useContext(AppContext);

  const [isExecuting, setIsExecuting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  const handleExecute = async () => {
    setIsExecuting(true);
    setVisibleLogs([]);

    for (let i = 0; i < MOCK_LOGS.length; i++) {
      await new Promise(r => setTimeout(r, 1500));
      setVisibleLogs(prev => [...prev, MOCK_LOGS[i]]);
    }

    await new Promise(r => setTimeout(r, 500));
    setIsFinished(true);
    setIsExecuting(false);
    setIsWorkflowExecuted(true); // Update global state
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Action Execution Center</Text>
          <Text style={styles.headerSubtitle}>Recommended care coordination actions generated from agentic clinical reasoning.</Text>
        </View>

        {/* Section 1 — Priority Action Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Action Plan</Text>
          
          {ACTION_PLAN.map((item, index) => {
            let cardStyle = styles.cardMedium;
            let badgeStyle = styles.badgeMedium;
            let badgeTextStyle = styles.badgeTextMedium;

            if (item.colorLevel === 'critical') {
              cardStyle = styles.cardCritical;
              badgeStyle = styles.badgeCritical;
              badgeTextStyle = styles.badgeTextCritical;
            } else if (item.colorLevel === 'high') {
              cardStyle = styles.cardHigh;
              badgeStyle = styles.badgeHigh;
              badgeTextStyle = styles.badgeTextHigh;
            }

            return (
              <View key={index} style={[styles.actionCard, cardStyle]}>
                <View style={styles.actionHeader}>
                  <Text style={styles.actionTitle}>{item.action}</Text>
                  <View style={[styles.badge, badgeStyle]}>
                    <Text style={[styles.badgeText, badgeTextStyle]}>{item.priority}</Text>
                  </View>
                </View>
                <Text style={styles.actionDetail}><Text style={styles.bold}>Reason: </Text>{item.reason}</Text>
                <Text style={styles.actionDetail}><Text style={styles.bold}>Timeline: </Text>{item.timeline}</Text>
              </View>
            );
          })}
        </View>

        {/* Section 2 — Execute Workflow */}
        {!isExecuting && !isFinished && (
          <View style={styles.executeContainer}>
            <TouchableOpacity style={styles.executeButton} onPress={handleExecute}>
              <Text style={styles.executeButtonText}>EXECUTE WORKFLOW</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logs Console */}
        {(isExecuting || isFinished) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Execution Logs</Text>
            <View style={styles.terminal}>
              {visibleLogs.map((log, index) => (
                <Text key={index} style={styles.terminalText}>{log}</Text>
              ))}
              {isExecuting && (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="small" color={colors.primaryLight} />
                  <Text style={styles.terminalLoadingText}> Executing workflow step...</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Section 3 — Execution Result */}
        {isFinished && (
          <View style={styles.section}>
            <View style={styles.successCard}>
              <Text style={styles.successTitle}>✓ Workflow Executed Successfully</Text>
              <Text style={styles.successSubtitle}>Updated State:</Text>
              <View style={styles.stateList}>
                <Text style={styles.stateItem}>• <Text style={styles.bold}>Risk:</Text> HIGH</Text>
                <Text style={styles.stateItem}>• <Text style={styles.bold}>Care status:</Text> Escalated for urgent follow-up</Text>
                <Text style={styles.stateItem}>• <Text style={styles.bold}>Appointment:</Text> Nephrology review scheduled — Tomorrow 10:30 AM</Text>
                <Text style={styles.stateItem}>• <Text style={styles.bold}>Caregiver alert:</Text> Sent — High renal risk warning</Text>
                <Text style={styles.stateItem}>• <Text style={styles.bold}>Dashboard flag:</Text> HIGH RISK ACTIVE</Text>
                <Text style={styles.stateItem}>• <Text style={styles.bold}>Follow-up:</Text> 24-hour follow-up reminder created</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('OutcomeState')}
            >
              <Text style={styles.buttonText}>View Outcome State</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.disclaimerText}>
          These are mock workflow actions for hackathon demonstration. No real appointment, message, or clinical action is executed.
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
  
  section: { marginBottom: 30 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 8 },
  
  actionCard: { padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1 },
  
  cardCritical: { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: colors.danger },
  cardHigh: { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: '#F59E0B' }, // Amber
  cardMedium: { backgroundColor: 'rgba(13, 148, 136, 0.05)', borderColor: colors.primary },
  
  actionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  actionTitle: { color: colors.text, fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 8 },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  badgeText: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  
  badgeCritical: { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: colors.danger },
  badgeTextCritical: { color: colors.danger },
  
  badgeHigh: { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: '#F59E0B' },
  badgeTextHigh: { color: '#F59E0B' },
  
  badgeMedium: { backgroundColor: 'rgba(13, 148, 136, 0.2)', borderColor: colors.primary },
  badgeTextMedium: { color: colors.primaryLight },

  actionDetail: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginBottom: 4 },
  bold: { fontWeight: 'bold', color: colors.text },
  
  executeContainer: { alignItems: 'center', marginBottom: 30 },
  executeButton: { backgroundColor: colors.danger, borderRadius: 12, paddingVertical: 18, paddingHorizontal: 32, shadowColor: colors.danger, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  executeButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  
  terminal: { backgroundColor: '#020617', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  terminalText: { color: '#10B981', fontFamily: 'monospace', fontSize: 13, marginBottom: 12, lineHeight: 20 },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  terminalLoadingText: { color: colors.primaryLight, fontFamily: 'monospace', fontSize: 13, marginLeft: 8 },
  
  successCard: { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1.5, borderColor: colors.success },
  successTitle: { color: colors.success, fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  successSubtitle: { color: colors.text, fontSize: 15, fontWeight: '600', marginBottom: 12 },
  stateList: { paddingLeft: 4 },
  stateItem: { color: colors.text, fontSize: 14, lineHeight: 22, marginBottom: 6 },
  
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 18, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  
  disclaimerText: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 10, fontStyle: 'italic', opacity: 0.7, paddingHorizontal: 20 },
});
