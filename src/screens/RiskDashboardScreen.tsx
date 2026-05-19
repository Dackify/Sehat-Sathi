import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { AppContext } from '../state/AppContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RiskDashboard'>;
};

export default function RiskDashboardScreen({ navigation }: Props) {
  const { agentData } = useContext(AppContext);

  // We can use agentData from context, but for a polished UI matching the exact requirements,
  // we will structure the display based on the specific strings requested.
  const topInsight = agentData?.deteriorationData?.topInsight || 
    "This synthetic patient shows progressive renal deterioration with high potassium risk, repeated admissions, poor diabetes control, medication safety concern, and missed specialist follow-up.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Risk Dashboard</Text>
          <Text style={styles.headerSubtitle}>Real-time Deterioration Intelligence</Text>
        </View>

        {/* 1. High-Risk Summary Card */}
        <View style={styles.highRiskCard}>
          <View style={styles.riskHeaderRow}>
            <Text style={styles.riskLabel}>RISK LEVEL</Text>
            <View style={styles.riskBadge}>
              <Text style={styles.riskBadgeText}>HIGH</Text>
            </View>
          </View>
          <Text style={styles.insightTitle}>Top Insight</Text>
          <Text style={styles.insightText}>{topInsight}</Text>
          <View style={styles.confidenceRow}>
            <Text style={styles.confidenceLabel}>Intelligence Confidence:</Text>
            <Text style={styles.confidenceValue}> 93%</Text>
          </View>
        </View>

        {/* 2. Clinical Red Flags Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinical Red Flags</Text>
          
          <View style={styles.flagCard}>
            <Text style={styles.flagTitle}>• Worsening kidney function</Text>
            <Text style={styles.flagDetail}>Creatinine increased from 1.8 to 3.2 mg/dL in six months.</Text>
          </View>
          <View style={styles.flagCard}>
            <Text style={styles.flagTitle}>• Severely reduced eGFR</Text>
            <Text style={styles.flagDetail}>eGFR 22 mL/min/1.73m² suggests advanced renal impairment.</Text>
          </View>
          <View style={styles.flagCard}>
            <Text style={styles.flagTitle}>• High potassium risk</Text>
            <Text style={styles.flagDetail}>Potassium 5.8 mEq/L is a clinically important electrolyte risk signal.</Text>
          </View>
          <View style={styles.flagCard}>
            <Text style={styles.flagTitle}>• Poor diabetes control</Text>
            <Text style={styles.flagDetail}>HbA1c 10.1% suggests uncontrolled long-term glycemic status.</Text>
          </View>
          <View style={styles.flagCard}>
            <Text style={styles.flagTitle}>• Repeated admissions</Text>
            <Text style={styles.flagDetail}>Three hospital admissions in six months suggest unstable disease control.</Text>
          </View>
          <View style={styles.flagCard}>
            <Text style={styles.flagTitle}>• Medication safety concern</Text>
            <Text style={styles.flagDetail}>Metformin is documented despite very low eGFR and requires clinician review.</Text>
          </View>
          <View style={styles.flagCard}>
            <Text style={styles.flagTitle}>• Missed specialist follow-up</Text>
            <Text style={styles.flagDetail}>Last nephrology review was 8 months ago despite worsening renal markers.</Text>
          </View>
        </View>

        {/* 3. Abnormal Labs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abnormal Labs Profile</Text>
          
          <View style={styles.labRow}>
            <View style={styles.labHeader}>
              <Text style={styles.labName}>Creatinine</Text>
              <Text style={styles.labValueDanger}>3.2 mg/dL</Text>
            </View>
            <Text style={styles.labSubtext}>Previous: 1.8 mg/dL six months ago</Text>
            <Text style={styles.labInterpretation}>Worsening renal function</Text>
          </View>

          <View style={styles.labRow}>
            <View style={styles.labHeader}>
              <Text style={styles.labName}>eGFR</Text>
              <Text style={styles.labValueDanger}>22 mL/min/1.73m²</Text>
            </View>
            <Text style={styles.labInterpretation}>Severely reduced kidney function</Text>
          </View>

          <View style={styles.labRow}>
            <View style={styles.labHeader}>
              <Text style={styles.labName}>Potassium</Text>
              <Text style={styles.labValueDanger}>5.8 mEq/L</Text>
            </View>
            <Text style={styles.labInterpretation}>High potassium risk</Text>
          </View>

          <View style={styles.labRow}>
            <View style={styles.labHeader}>
              <Text style={styles.labName}>HbA1c</Text>
              <Text style={styles.labValueDanger}>10.1%</Text>
            </View>
            <Text style={styles.labInterpretation}>Poor diabetes control</Text>
          </View>

          <View style={styles.labRow}>
            <View style={styles.labHeader}>
              <Text style={styles.labName}>Hemoglobin</Text>
              <Text style={styles.labValue}>8.4 g/dL</Text>
            </View>
            <Text style={styles.labInterpretation}>Anemia</Text>
          </View>
        </View>

        {/* 4. Deterioration Timeline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deterioration Timeline</Text>
          
          <View style={styles.timelineContainer}>
            <View style={styles.timelineNode}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>Six months ago</Text>
                <Text style={styles.timelineDetail}>Creatinine 1.8 mg/dL</Text>
              </View>
            </View>

            <View style={styles.timelineNode}>
              <View style={styles.timelineLine} />
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>Last six months</Text>
                <Text style={styles.timelineDetail}>Three admissions for edema, uncontrolled BP, weakness, and breathlessness</Text>
              </View>
            </View>

            <View style={styles.timelineNode}>
              <View style={styles.timelineLine} />
              <View style={[styles.timelineDot, styles.timelineDotDanger]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTime, styles.textDanger]}>Current</Text>
                <Text style={styles.timelineDetail}>Creatinine 3.2 mg/dL, eGFR 22, potassium 5.8, reduced urine output, pedal edema</Text>
              </View>
            </View>

            <View style={[styles.timelineNode, { paddingBottom: 0 }]}>
              <View style={[styles.timelineLine, styles.timelineLineDanger]} />
              <View style={[styles.timelineDot, styles.timelineDotDanger]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTime, styles.textDanger]}>Current Risk</Text>
                <Text style={[styles.timelineDetail, styles.textDanger, { fontWeight: 'bold' }]}>HIGH — urgent care coordination needed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 5. Follow-Up Gaps Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continuity of Care Gaps</Text>
          <View style={styles.gapCard}>
            <Text style={styles.gapItem}>• No nephrology review in 8 months</Text>
            <Text style={styles.gapItem}>• No dialysis planning discussion documented</Text>
            <Text style={styles.gapItem}>• No renal diet counseling documented</Text>
            <Text style={styles.gapItem}>• No caregiver escalation plan documented</Text>
          </View>
        </View>

        {/* 6. Next CTA */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('ActionExecution')}
        >
          <Text style={styles.buttonText}>View Action Plan</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimerText}>
          Synthetic demo only. Not for diagnosis or treatment.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20 },
  
  header: { marginBottom: 24 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: colors.primaryLight },
  
  highRiskCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1.5,
    borderColor: colors.danger,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  riskHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  riskLabel: { color: colors.danger, fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  riskBadge: { backgroundColor: colors.danger, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  riskBadgeText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
  
  insightTitle: { color: colors.text, fontWeight: '600', fontSize: 16, marginBottom: 8 },
  insightText: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginBottom: 16 },
  
  confidenceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(239, 68, 68, 0.2)' },
  confidenceLabel: { color: colors.textMuted, fontSize: 13 },
  confidenceValue: { color: colors.danger, fontSize: 14, fontWeight: 'bold' },
  
  section: { marginBottom: 30 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 8 },
  
  flagCard: { backgroundColor: colors.card, padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  flagTitle: { color: colors.primaryLight, fontSize: 15, fontWeight: '600', marginBottom: 6 },
  flagDetail: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  
  labRow: { backgroundColor: colors.card, padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  labHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  labName: { color: colors.text, fontSize: 16, fontWeight: '600' },
  labValue: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  labValueDanger: { color: colors.danger, fontSize: 16, fontWeight: 'bold' },
  labSubtext: { color: colors.textMuted, fontSize: 13, marginBottom: 4, fontStyle: 'italic' },
  labInterpretation: { color: colors.primaryLight, fontSize: 14, marginTop: 4 },

  timelineContainer: { paddingLeft: 8 },
  timelineNode: { paddingBottom: 24, paddingLeft: 24, position: 'relative' },
  timelineDot: { position: 'absolute', left: -4, top: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary, zIndex: 10 },
  timelineDotDanger: { backgroundColor: colors.danger },
  timelineLine: { position: 'absolute', left: 1, top: -24, bottom: 0, width: 2, backgroundColor: colors.border },
  timelineLineDanger: { backgroundColor: colors.danger },
  timelineContent: { marginTop: -4 },
  timelineTime: { color: colors.text, fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  timelineDetail: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  textDanger: { color: colors.danger },

  gapCard: { backgroundColor: colors.card, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  gapItem: { color: colors.textMuted, fontSize: 14, lineHeight: 24, marginBottom: 4 },
  
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 18, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5, marginTop: 10 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  
  disclaimerText: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 24, fontStyle: 'italic', opacity: 0.7 },
});
