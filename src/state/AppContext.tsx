import React, { createContext, useState, ReactNode } from 'react';
import { PatientCase } from '../navigation/types';

export type AgentOutputData = {
  source?: string;
  extractionData?: any;
  deteriorationData?: any;
  impactData?: any;
  carePlanData?: any;
  executionData?: any;
};

export type AppStateContextType = {
  patientCase: PatientCase | null;
  setPatientCase: (data: PatientCase) => void;
  agentData: AgentOutputData | null;
  setAgentData: (data: AgentOutputData) => void;
  isWorkflowExecuted: boolean;
  setIsWorkflowExecuted: (data: boolean) => void;
};

export const AppContext = createContext<AppStateContextType>({
  patientCase: null,
  setPatientCase: () => {},
  agentData: null,
  setAgentData: () => {},
  isWorkflowExecuted: false,
  setIsWorkflowExecuted: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [patientCase, setPatientCase] = useState<PatientCase | null>(null);
  const [agentData, setAgentData] = useState<AgentOutputData | null>(null);
  const [isWorkflowExecuted, setIsWorkflowExecuted] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ patientCase, setPatientCase, agentData, setAgentData, isWorkflowExecuted, setIsWorkflowExecuted }}>
      {children}
    </AppContext.Provider>
  );
};
