import { PatientCase } from '../navigation/types';

export const formatPatientCase = (patientCase: PatientCase) => {
  const structuredCase = {
    ...patientCase
  };

  const unstructuredText = `
Patient ID: ${patientCase.patientId}
Age: ${patientCase.age}
Sex: ${patientCase.sex}

Chief Complaint:
${patientCase.chiefComplaint}

Presenting History:
${patientCase.presentingHistory}

Medical History:
${patientCase.medicalHistory}

Current Medications:
${patientCase.currentMedications}

Vitals:
${patientCase.vitals}

Lab Notes:
${patientCase.labNotes}

Clinical Context:
${patientCase.clinicalContext}
  `.trim();

  return {
    structuredCase,
    unstructuredText
  };
};
