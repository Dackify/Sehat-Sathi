export type PatientCase = {
  patientId: string;
  age: string;
  sex: string;
  chiefComplaint: string;
  presentingHistory: string;
  medicalHistory: string;
  currentMedications: string;
  vitals: string;
  labNotes: string;
  clinicalContext: string;
};

export type RootStackParamList = {
  PatientIntake: undefined;
  AgentProcessing: { patientCase?: PatientCase };
  RiskDashboard: undefined;
  ActionExecution: undefined;
  OutcomeState: undefined;
};
