// Mock Execution API mimicking a real backend service

export const createEscalationTicket = () => ({
  method: "POST",
  endpoint: "/mock-care-tickets",
  status: 201,
  timestamp: new Date().toLocaleTimeString(),
  message: "Urgent nephrology review ticket created: SS-TKT-8841",
  payload: {
    ticket_id: "SS-TKT-8841",
    priority: "critical"
  }
});

export const scheduleMockAppointment = () => ({
  method: "POST",
  endpoint: "/mock-appointments",
  status: 201,
  timestamp: new Date().toLocaleTimeString(),
  message: "Nephrology review scheduled: Tomorrow 10:30 AM",
  payload: {
    appointment_time: "Tomorrow 10:30 AM",
    department: "Nephrology"
  }
});

export const sendMockCaregiverAlert = () => ({
  method: "POST",
  endpoint: "/mock-alerts",
  status: 200,
  timestamp: new Date().toLocaleTimeString(),
  message: "Caregiver alert generated: HIGH renal risk detected",
  payload: {
    alert_type: "HIGH renal risk",
    recipient: "Registered Caregiver"
  }
});

export const updatePatientRiskState = () => ({
  method: "PATCH",
  endpoint: "/mock-dashboard/patient/SS-204",
  status: 200,
  timestamp: new Date().toLocaleTimeString(),
  message: "Risk flag updated to HIGH",
  payload: {
    risk_level: "HIGH"
  }
});

export const createFollowUpReminder = () => ({
  method: "POST",
  endpoint: "/mock-reminders",
  status: 201,
  timestamp: new Date().toLocaleTimeString(),
  message: "24-hour follow-up reminder created",
  payload: {
    reminder_duration: "24-hour",
    type: "Follow-up"
  }
});
