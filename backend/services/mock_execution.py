import datetime

def create_escalation_ticket():
    return {
        "method": "POST",
        "endpoint": "/mock-care-tickets",
        "status": 201,
        "timestamp": datetime.datetime.now().strftime("%H:%M:%S"),
        "message": "Urgent nephrology review ticket created: SS-TKT-8841",
        "payload": {
            "ticket_id": "SS-TKT-8841",
            "priority": "critical"
        }
    }

def schedule_mock_appointment():
    return {
        "method": "POST",
        "endpoint": "/mock-appointments",
        "status": 201,
        "timestamp": datetime.datetime.now().strftime("%H:%M:%S"),
        "message": "Nephrology review scheduled: Tomorrow 10:30 AM",
        "payload": {
            "appointment_time": "Tomorrow 10:30 AM",
            "department": "Nephrology"
        }
    }

def send_mock_caregiver_alert():
    return {
        "method": "POST",
        "endpoint": "/mock-alerts",
        "status": 200,
        "timestamp": datetime.datetime.now().strftime("%H:%M:%S"),
        "message": "Caregiver alert generated: HIGH renal risk detected",
        "payload": {
            "alert_type": "HIGH renal risk",
            "recipient": "Registered Caregiver"
        }
    }

def update_patient_risk_state():
    return {
        "method": "PATCH",
        "endpoint": "/mock-dashboard/patient/SS-204",
        "status": 200,
        "timestamp": datetime.datetime.now().strftime("%H:%M:%S"),
        "message": "Risk flag updated to HIGH",
        "payload": {
            "risk_level": "HIGH"
        }
    }

def create_follow_up_reminder():
    return {
        "method": "POST",
        "endpoint": "/mock-reminders",
        "status": 201,
        "timestamp": datetime.datetime.now().strftime("%H:%M:%S"),
        "message": "24-hour follow-up reminder created",
        "payload": {
            "reminder_duration": "24-hour",
            "type": "Follow-up"
        }
    }
