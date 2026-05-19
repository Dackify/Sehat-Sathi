import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { AppContext } from '../state/AppContext';
import { runAgentPipeline } from '../services/agentPipeline';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AgentProcessing'>;
  route: RouteProp<RootStackParamList, 'AgentProcessing'>;
};

const AGENTS = [
  {
    id: 1,
    title: 'Clinical Intake Agent',
    loadingText: 'Organizing patient history, vitals, medications, labs, and follow-up gaps…',
    completedText: 'Case package created from 10 intake fields.',
    isHighRisk: false,
  },
  {
    id: 2,
    title: 'Medical Extraction Agent',
    loadingText: 'Extracting diagnoses, symptoms, medications, vitals, and abnormal labs…',
    completedText: 'Extracted 4 diagnoses, 5 abnormal labs, 2 medications, and 4 follow-up gaps.',
    isHighRisk: false,
  },
  {
    id: 3,
    title: 'Deterioration Intelligence Agent',
    loadingText: 'Analyzing clinical deterioration patterns and continuity-of-care failures…',
    completedText: 'Detected worsening renal function, hyperkalemia risk, repeated admissions, and medication safety concern.',
    isHighRisk: false,
  },
  {
    id: 4,
    title: 'Clinical Impact Agent',
    loadingText: 'Estimating urgency, severity, and possible consequences…',
    completedText: 'Risk Level: HIGH — urgent physician/nephrology review recommended in a real clinical setting.',
    isHighRisk: true,
  },
  {
    id: 5,
    title: 'Care Planning Agent',
    loadingText: 'Generating prioritized care coordination plan…',
    completedText: 'Generated 5 prioritized care actions.',
    isHighRisk: false,
  },
  {
    id: 6,
    title: 'Workflow Execution Agent',
    loadingText: 'Simulating appointment scheduling, alert generation, escalation ticket, dashboard update, and reminder creation…',
    completedText: 'Executed 5 simulated workflow actions and updated patient state.',
    isHighRisk: false,
  }
];

const TRACE_STEPS = [
  'Workplan created',
  'Clinical Intake Agent executed',
  'Medical facts extracted',
  'Deterioration patterns detected',
  'Risk classified as HIGH',
  'Care plan generated',
  'Workflow execution simulated',
  'Patient state updated'
];

export default function AgentProcessingScreen({ navigation, route }: Props) {
  const patientCase = route.params?.patientCase;
  const { setAgentData } = useContext(AppContext);
  
  const [currentAgentIndex, setCurrentAgentIndex] = useState(-1);
  const [completedAgents, setCompletedAgents] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [traceVisibleIndex, setTraceVisibleIndex] = useState(-1);

  useEffect(() => {
    let isMounted = true;
    
    const runAgents = async () => {
      // Start processing after a brief delay
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;

      for (let i = 0; i < AGENTS.length; i++) {
        setCurrentAgentIndex(i);
        setTraceVisibleIndex(i); // Show trace steps gradually
        
        // Simulate processing time
        await new Promise(r => setTimeout(r, 1200));
        if (!isMounted) return;
        
        setCompletedAgents(prev => [...prev, i]);
      }
      
      setCurrentAgentIndex(-1);
      setTraceVisibleIndex(TRACE_STEPS.length - 1);
      setIsFinished(true);
      
      if (patientCase) {
        // Here we call the newly refactored pipeline, which returns the mock data
        const pipelineData = await runAgentPipeline(patientCase);
        setAgentData(pipelineData);
      }
    };
    
    runAgents();
    
    return () => { isMounted = false; };
  }, [patientCase, setAgentData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>Agent Processing</Text>
        <Text style={styles.headerSubtitle}>Multi-Agent Orchestration Pipeline</Text>

        {patientCase && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Active Context: {patientCase.patientId || 'Unknown Patient'}</Text>
            <Text style={styles.previewContent}>
              <Text style={{ fontWeight: 'bold' }}>Age/Sex: </Text>
              {patientCase.age} {patientCase.sex}
            </Text>
            <Text style={styles.previewContent} numberOfLines={2}>
              <Text style={{ fontWeight: 'bold' }}>CC: </Text>
              {patientCase.chiefComplaint}
            </Text>
            <Text style={styles.previewStatus}>
              {isFinished ? 'Data ingested successfully. Analysis complete.' : 'Data ingested successfully. Agents analyzing...'}
            </Text>
          </View>
        )}

        <View style={styles.agentsContainer}>
          {AGENTS.map((agent, index) => {
            const isActive = currentAgentIndex === index;
            const isCompleted = completedAgents.includes(index);
            const isPending = !isActive && !isCompleted;
            
            if (isPending && index > currentAgentIndex + 1) {
              return null; // Only show up to the next pending agent
            }

            let cardStyle: any[] = [styles.agentCard];
            let titleStyle: any[] = [styles.agentTitle];
            let textColor = colors.textMuted;
            let showLoading = false;

            if (isActive) {
              cardStyle.push(styles.agentCardActive);
              titleStyle.push(styles.agentTitleActive);
              textColor = colors.text;
              showLoading = true;
            } else if (isCompleted) {
              if (agent.isHighRisk) {
                cardStyle.push(styles.agentCardDanger);
                titleStyle.push(styles.agentTitleDanger);
              } else {
                cardStyle.push(styles.agentCardCompleted);
                titleStyle.push(styles.agentTitleCompleted);
              }
              textColor = colors.text;
            }

            return (
              <View key={agent.id} style={cardStyle}>
                <View style={styles.agentHeader}>
                  <Text style={titleStyle}>{agent.title}</Text>
                  {isCompleted && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                  {showLoading && (
                    <ActivityIndicator size="small" color={colors.primaryLight} />
                  )}
                </View>
                <Text style={[styles.agentContent, { color: textColor }]}>
                  {isCompleted ? agent.completedText : (isActive ? agent.loadingText : 'Waiting...')}
                </Text>
              </View>
            );
          })}
        </View>

        {isFinished && (
          <View style={styles.traceContainer}>
            <Text style={styles.traceTitle}>Agent Trace</Text>
            {TRACE_STEPS.map((step, idx) => {
              if (idx > traceVisibleIndex) return null;
              return (
                <Text key={idx} style={styles.traceStep}>
                  <Text style={styles.traceDot}>•</Text> {step}
                </Text>
              );
            })}
          </View>
        )}

        {isFinished && (
          <View style={{ gap: 12 }}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('RiskDashboard')}
            >
              <Text style={styles.buttonText}>View Risk Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={() => navigation.navigate('AgentTrace')}
            >
              <Text style={styles.secondaryButtonText}>View Agent Trace Logs</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.devNote}>
          Current build uses mock agent outputs for stable hackathon demo. The service layer is structured for Gemini structured JSON calls and Antigravity orchestration.
        </Text>
        
        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: colors.primaryLight, marginBottom: 24 },
  
  previewCard: { backgroundColor: 'rgba(13, 148, 136, 0.1)', borderRadius: 12, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: colors.primary },
  previewTitle: { color: colors.primaryLight, fontWeight: 'bold', fontSize: 15, marginBottom: 8 },
  previewContent: { color: colors.text, fontSize: 13, marginBottom: 4 },
  previewStatus: { color: colors.primary, fontSize: 12, marginTop: 8, fontStyle: 'italic' },
  
  agentsContainer: { marginBottom: 24 },
  agentCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  agentCardActive: { borderColor: colors.primaryLight, backgroundColor: 'rgba(13, 148, 136, 0.05)' },
  agentCardCompleted: { borderColor: colors.primary },
  agentCardDanger: { borderColor: colors.danger, backgroundColor: 'rgba(239, 68, 68, 0.1)' },
  
  agentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  agentTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
  agentTitleActive: { color: colors.primaryLight },
  agentTitleCompleted: { color: colors.success },
  agentTitleDanger: { color: colors.danger },
  
  agentContent: { fontSize: 14, lineHeight: 20 },
  checkmark: { color: colors.success, fontSize: 18, fontWeight: 'bold' },
  
  traceContainer: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.border },
  traceTitle: { color: colors.textMuted, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 1 },
  traceStep: { color: colors.text, fontSize: 13, marginBottom: 6, fontFamily: 'monospace' },
  traceDot: { color: colors.primary, fontWeight: 'bold' },
  
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 18, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border, elevation: 0, shadowOpacity: 0 },
  secondaryButtonText: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  
  devNote: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 24, fontStyle: 'italic', opacity: 0.7, paddingHorizontal: 10 }
});
