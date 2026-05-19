import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import { colors } from './src/theme/colors';
import { AppProvider } from './src/state/AppContext';

// Screens
import PatientIntakeScreen from './src/screens/PatientIntakeScreen';
import AgentProcessingScreen from './src/screens/AgentProcessingScreen';
import RiskDashboardScreen from './src/screens/RiskDashboardScreen';
import ActionExecutionScreen from './src/screens/ActionExecutionScreen';
import OutcomeStateScreen from './src/screens/OutcomeStateScreen';
import AgentTraceScreen from './src/screens/AgentTraceScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PatientIntake"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.primaryLight,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: colors.background,
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen 
            name="PatientIntake" 
            component={PatientIntakeScreen} 
            options={{ title: 'Intake' }} 
          />
          <Stack.Screen 
            name="AgentProcessing" 
            component={AgentProcessingScreen} 
            options={{ title: 'Agent Processing' }} 
          />
          <Stack.Screen 
            name="RiskDashboard" 
            component={RiskDashboardScreen} 
            options={{ title: 'Risk Intelligence' }} 
          />
          <Stack.Screen 
            name="ActionExecution" 
            component={ActionExecutionScreen} 
            options={{ title: 'Execution Center' }} 
          />
          <Stack.Screen 
            name="OutcomeState" 
            component={OutcomeStateScreen} 
            options={{ title: 'Outcome State', headerBackVisible: false }} 
          />
          <Stack.Screen 
            name="AgentTrace" 
            component={AgentTraceScreen} 
            options={{ title: 'Agent Trace' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
