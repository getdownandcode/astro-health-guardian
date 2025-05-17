
import { AstronautData } from "../types/astronaut";

export const ASTRONAUT_DATA: AstronautData[] = [
  {
    astronaut_profile: {
      id: "ast-001",
      name: "Vikram Singh",
      age: 50,
      gender: "M",
      heart_rate: 110,
      bp_systolic: 150,
      bp_diastolic: 95,
      spo2: 92.0,
      sleep_hours: 4.0,
      body_temp: 36.8,
      stress_level: { value: 8.0 },
      bmi: { value: 30.0 },
      smoking: { value: "Yes" }
    },
    prediction: {
      risk_level: "Critical",
      probabilities: { Low: 0.05, Medium: 0.1, High: 0.25, Critical: 0.6 }
    },
    anomaly_detection: { is_anomaly: true, anomaly_score: -0.6 },
    clinical_insights: {
      summary: "Critical risk due to physiological strain and potential cardiac stress. Anomaly detected in vital signs.",
      top_factors: {
        factor_1: "Heart rate of 110 bpm indicates severe stress on cardiovascular system.",
        factor_2: "Systolic BP of 150 mmHg reflects hypertension requiring monitoring."
      },
      vitals_analysis: "Multiple vitals outside normal parameters suggest systemic strain.",
      immediate_actions: {
        cardiovascular_monitoring: "Initiate continuous ECG monitoring and prepare for intervention.",
        medication: "Consider beta blockers if heart rate remains elevated."
      },
      countermeasures: {
        rest: "Enforce mandatory rest period of 4 hours.",
        hydration: "Increase fluid intake to 3L over next 24 hours."
      },
      long_term_monitoring: "Weekly BP checks and daily SpO₂ monitoring required."
    },
    rule_based_recommendations: {
      heart_rate: "Immediate ECG for heart rate >100 bpm.",
      blood_pressure: "Monitor BP every 2 hours, report if systolic >140."
    },
    tasks: {
      "task-001": { id: "task-001", title: "Complete health assessment", completed: false },
      "task-002": { id: "task-002", title: "Take prescribed medication", completed: true },
      "task-003": { id: "task-003", title: "Monitor blood pressure every 2 hours", completed: false }
    },
    queries: {}, // Add empty queries object
    timestamp: "2025-05-15 00:40:00 IST"
  },
  {
    astronaut_profile: {
      id: "ast-002",
      name: "Priya Sharma",
      age: 40,
      gender: "F",
      heart_rate: 85,
      bp_systolic: 130,
      bp_diastolic: 85,
      spo2: 96.0,
      sleep_hours: 5.5,
      body_temp: 36.6,
      stress_level: { value: 6.0 },
      bmi: { value: 26.0 },
      smoking: { value: "Yes" }
    },
    prediction: {
      risk_level: "High",
      probabilities: { Low: 0.1, Medium: 0.25, High: 0.55, Critical: 0.1 }
    },
    anomaly_detection: { is_anomaly: false, anomaly_score: -0.2 },
    clinical_insights: {
      summary: "High risk profile with borderline vital signs requiring close monitoring.",
      top_factors: {
        factor_1: "Elevated heart rate combined with smoking status increases cardiovascular risk.",
        factor_2: "Borderline hypertension indicates need for preventative measures.",
        factor_3: "Moderate stress level potentially affecting physiological parameters."
      },
      immediate_actions: {
        monitoring: "Increase vital sign monitoring frequency to every 4 hours.",
        assessment: "Complete full cardiovascular assessment within 24 hours."
      },
      countermeasures: {
        exercise: "Implement light exercise regimen with pulse monitoring.",
        diet: "Reduce sodium intake to <2g per day."
      }
    },
    rule_based_recommendations: {
      heart_rate: "Schedule cardio assessment if heart rate consistently >80 bpm.",
      blood_pressure: "Implement DASH diet principles to manage BP."
    },
    tasks: {
      "task-001": { id: "task-001", title: "Complete daily exercise routine", completed: false },
      "task-002": { id: "task-002", title: "Record food intake for sodium tracking", completed: true }
    },
    queries: {}, // Add empty queries object
    timestamp: "2025-05-15 00:40:00 IST"
  },
  {
    astronaut_profile: {
      id: "ast-003",
      name: "Arjun Patel",
      age: 35,
      gender: "M",
      heart_rate: 65,
      bp_systolic: 110,
      bp_diastolic: 70,
      spo2: 99.0,
      sleep_hours: 7.0,
      body_temp: 36.5,
      stress_level: { value: 2.0 },
      bmi: { value: 23.0 },
      smoking: { value: "No" }
    },
    prediction: {
      risk_level: "Low",
      probabilities: { Low: 0.85, Medium: 0.1, High: 0.04, Critical: 0.01 }
    },
    anomaly_detection: { is_anomaly: false, anomaly_score: 0.1 },
    clinical_insights: {
      summary: "Low risk profile with good vital parameters and healthy lifestyle indicators.",
      top_factors: {
        factor_1: "Optimal heart rate and blood pressure indicative of good cardiovascular health.",
        factor_2: "Excellent oxygen saturation suggests good pulmonary function.",
        factor_3: "Low stress levels and adequate sleep promote physiological homeostasis."
      },
      immediate_actions: {
        maintenance: "Continue current health regimen and monitoring schedule."
      },
      long_term_monitoring: "Standard quarterly health assessment sufficient."
    },
    rule_based_recommendations: {
      general: "Maintain current health practices and monitoring schedule.",
      preventative: "Complete annual comprehensive health assessment as scheduled."
    },
    tasks: {
      "task-001": { id: "task-001", title: "Log daily meditation session", completed: true },
      "task-002": { id: "task-002", title: "Complete weekly fitness assessment", completed: false }
    },
    queries: {}, // Add empty queries object
    timestamp: "2025-05-15 00:40:00 IST"
  },
  {
    astronaut_profile: {
      id: "ast-004",
      name: "Ananya Desai",
      age: 48,
      gender: "F",
      heart_rate: 105,
      bp_systolic: 145,
      bp_diastolic: 90,
      spo2: 93.0,
      sleep_hours: 4.5,
      body_temp: 36.9,
      stress_level: { value: 9.0 },
      bmi: { value: 29.0 },
      smoking: { value: "Yes" }
    },
    prediction: {
      risk_level: "Critical",
      probabilities: { Low: 0.05, Medium: 0.1, High: 0.35, Critical: 0.5 }
    },
    anomaly_detection: { is_anomaly: true, anomaly_score: -0.7 },
    clinical_insights: {
      summary: "Critical risk due to multiple concerning vital signs and lifestyle factors.",
      top_factors: {
        factor_1: "Elevated heart rate and blood pressure indicate significant cardiovascular strain.",
        factor_2: "High stress level combined with poor sleep create physiological vulnerability.",
        factor_3: "Smoking status and reduced oxygen saturation suggest respiratory compromise."
      },
      immediate_actions: {
        assessment: "Conduct immediate full cardiovascular assessment including ECG.",
        oxygen: "Monitor oxygen levels continuously and provide supplemental O2 if SpO₂ drops below 92%."
      },
      countermeasures: {
        stress: "Implement mandatory stress reduction protocol and sleep management.",
        circulation: "Consider mild physical activity under supervision to improve circulation."
      }
    },
    rule_based_recommendations: {
      urgent: "Immediate medical consultation required for multiple risk factors.",
      heart_rate: "ECG monitoring and potential medication intervention advised.",
      blood_pressure: "Monitor BP every 2 hours, consider medication if consistently elevated."
    },
    tasks: {
      "task-001": { id: "task-001", title: "Report to medical bay for ECG", completed: false },
      "task-002": { id: "task-002", title: "Reduce physical activity for 24 hours", completed: true },
      "task-003": { id: "task-003", title: "Complete stress reduction protocol", completed: false }
    },
    queries: {}, // Add empty queries object
    timestamp: "2025-05-15 00:40:00 IST"
  },
  {
    astronaut_profile: {
      id: "ast-005",
      name: "Rahul Kapoor",
      age: 38,
      gender: "M",
      heart_rate: 82,
      bp_systolic: 125,
      bp_diastolic: 80,
      spo2: 97.0,
      sleep_hours: 6.0,
      body_temp: 36.7,
      stress_level: { value: 5.0 },
      bmi: { value: 24.5 },
      smoking: { value: "No" }
    },
    prediction: {
      risk_level: "Medium",
      probabilities: { Low: 0.25, Medium: 0.45, High: 0.25, Critical: 0.05 }
    },
    anomaly_detection: { is_anomaly: false, anomaly_score: -0.1 },
    clinical_insights: {
      summary: "Medium risk profile with some vital signs requiring attention but no immediate concerns.",
      top_factors: {
        factor_1: "Slightly elevated heart rate warrants observation but not intervention.",
        factor_2: "Borderline blood pressure suggests early preventative measures."
      },
      immediate_actions: {
        monitoring: "Maintain standard monitoring schedule with attention to heart rate trends."
      },
      countermeasures: {
        exercise: "Implement moderate aerobic exercise program 3-4 times weekly.",
        stress: "Consider stress management techniques to reduce physiological impact."
      }
    },
    rule_based_recommendations: {
      heart_rate: "Monitor heart rate during exercise to ensure it doesn't exceed 150 bpm.",
      stress: "Implement 15-minute meditation sessions twice daily to manage stress levels."
    },
    tasks: {
      "task-001": { id: "task-001", title: "Complete 15-minute meditation", completed: false },
      "task-002": { id: "task-002", title: "Record heart rate during exercise", completed: true }
    },
    queries: {}, // Add empty queries object
    timestamp: "2025-05-15 00:40:00 IST"
  }
];

export const mockData = ASTRONAUT_DATA;

export const getAstronauts = () => {
  return ASTRONAUT_DATA;
};

export const getAstronautById = (id: string) => {
  return ASTRONAUT_DATA.find(astronaut => astronaut.astronaut_profile.id === id);
};

export const getAstronautsByRiskLevel = (riskLevel: string) => {
  return ASTRONAUT_DATA.filter(
    astronaut => astronaut.prediction.risk_level === riskLevel
  );
};

export const getAnomalies = () => {
  return ASTRONAUT_DATA.filter(
    astronaut => astronaut.anomaly_detection.is_anomaly
  );
};

export const getMockVitalTrend = (astronautId: string, vital: string) => {
  // Generate mock vital trend data for the past 24 hours
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const baseValue = {
    heart_rate: 75,
    bp_systolic: 120,
    bp_diastolic: 80,
    spo2: 98,
  }[vital as keyof typeof baseValue] || 75;
  
  // Add some variation based on astronaut risk level
  const astronaut = getAstronautById(astronautId);
  const riskFactor = astronaut 
    ? { "Critical": 2.0, "High": 1.5, "Medium": 1.2, "Low": 1.0 }[astronaut.prediction.risk_level] 
    : 1.0;

  return hours.map(hour => {
    // More variation for critical/high risk astronauts
    const variation = (Math.random() - 0.5) * 10 * riskFactor;
    // Trend upward for critical risk in later hours
    const trendFactor = riskFactor > 1.5 && hour > 18 ? (hour - 18) * 1.5 : 0;
    
    return {
      hour: `${hour}:00`,
      value: Math.round(baseValue + variation + trendFactor)
    };
  });
};

export const getChatHistory = (astronautId: string) => {
  // Mock chat history based on astronaut risk level
  const astronaut = getAstronautById(astronautId);
  if (!astronaut) return [];
  
  const riskLevel = astronaut.prediction.risk_level;
  
  const lowRiskChat = [
    { 
      id: "msg-001", 
      sender: "doctor", 
      text: "Hello, your latest health readings look good. Keep up the good work.", 
      timestamp: "2025-05-14 10:30:00" 
    },
    { 
      id: "msg-002", 
      sender: "astronaut", 
      text: "Thank you, doctor. I've been following the recommended exercise routine.", 
      timestamp: "2025-05-14 10:35:00" 
    }
  ];
  
  const mediumRiskChat = [
    { 
      id: "msg-001", 
      sender: "doctor", 
      text: "Your latest readings show some elevated stress levels. Have you been getting enough rest?", 
      timestamp: "2025-05-14 14:20:00" 
    },
    { 
      id: "msg-002", 
      sender: "astronaut", 
      text: "I've had trouble sleeping the last few nights due to the schedule changes.", 
      timestamp: "2025-05-14 14:25:00" 
    },
    { 
      id: "msg-003", 
      sender: "doctor", 
      text: "I recommend using the relaxation protocol before bed. Let's also adjust your schedule to ensure 7 hours of sleep opportunity.", 
      timestamp: "2025-05-14 14:30:00" 
    }
  ];
  
  const highRiskChat = [
    { 
      id: "msg-001", 
      sender: "doctor", 
      text: "Your blood pressure readings are concerning. Have you been taking your medication as prescribed?", 
      timestamp: "2025-05-14 09:15:00" 
    },
    { 
      id: "msg-002", 
      sender: "astronaut", 
      text: "Yes, but I've been feeling lightheaded after taking it.", 
      timestamp: "2025-05-14 09:20:00" 
    },
    { 
      id: "msg-003", 
      sender: "doctor", 
      text: "We'll need to adjust your dosage. Please come to the medical bay at 1100 hours for assessment.", 
      timestamp: "2025-05-14 09:25:00" 
    },
    { 
      id: "msg-004", 
      sender: "astronaut", 
      text: "I'll be there. Should I continue with the current dose until then?", 
      timestamp: "2025-05-14 09:28:00" 
    },
    { 
      id: "msg-005", 
      sender: "doctor", 
      text: "Yes, don't skip any doses. We'll make adjustments after the assessment.", 
      timestamp: "2025-05-14 09:30:00" 
    }
  ];
  
  const criticalRiskChat = [
    { 
      id: "msg-001", 
      sender: "doctor", 
      text: "URGENT: Your heart rate and blood pressure readings are at critical levels. Please report to medical bay IMMEDIATELY.", 
      timestamp: "2025-05-14 23:05:00" 
    },
    { 
      id: "msg-002", 
      sender: "astronaut", 
      text: "I'm feeling chest tightness and shortness of breath. On my way now.", 
      timestamp: "2025-05-14 23:07:00" 
    },
    { 
      id: "msg-003", 
      sender: "doctor", 
      text: "Medical team is ready for you. We'll begin ECG and oxygen therapy immediately upon arrival.", 
      timestamp: "2025-05-14 23:09:00" 
    },
    { 
      id: "msg-004", 
      sender: "system", 
      text: "EMERGENCY ALERT: Medical team dispatched to Module C for urgent assistance.", 
      timestamp: "2025-05-14 23:10:00" 
    },
    { 
      id: "msg-005", 
      sender: "doctor", 
      text: "Emergency response team is on the way to your location. Stay calm and seated if possible.", 
      timestamp: "2025-05-14 23:11:00" 
    }
  ];
  
  switch(riskLevel) {
    case "Low": return lowRiskChat;
    case "Medium": return mediumRiskChat;
    case "High": return highRiskChat;
    case "Critical": return criticalRiskChat;
    default: return lowRiskChat;
  }
};

// Task management functions
export const addTask = (astronautId: string, title: string, description?: string): boolean => {
  try {
    const astronaut = mockData.find(a => a.astronaut_profile.id === astronautId);
    if (!astronaut) return false;
    
    // Initialize tasks object if it doesn't exist
    if (!astronaut.tasks) {
      astronaut.tasks = {};
    }
    
    const newTaskId = `task-${Date.now()}`;
    astronaut.tasks[newTaskId] = {
      id: newTaskId,
      title,
      description,
      completed: false
    };
    
    return true;
  } catch (error) {
    console.error("Error adding task:", error);
    return false;
  }
};

export const updateTask = (astronautId: string, taskId: string, title: string, description?: string): boolean => {
  try {
    const astronaut = mockData.find(a => a.astronaut_profile.id === astronautId);
    if (!astronaut || !astronaut.tasks || !astronaut.tasks[taskId]) return false;
    
    astronaut.tasks[taskId].title = title;
    
    if (description !== undefined) {
      astronaut.tasks[taskId].description = description;
    }
    
    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    return false;
  }
};

export const deleteTask = (astronautId: string, taskId: string): boolean => {
  try {
    const astronaut = mockData.find(a => a.astronaut_profile.id === astronautId);
    if (!astronaut || !astronaut.tasks || !astronaut.tasks[taskId]) return false;
    
    delete astronaut.tasks[taskId];
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};

export const toggleTaskCompletion = (astronautId: string, taskId: string): boolean => {
  try {
    const astronaut = mockData.find(a => a.astronaut_profile.id === astronautId);
    if (!astronaut || !astronaut.tasks || !astronaut.tasks[taskId]) return false;
    
    astronaut.tasks[taskId].completed = !astronaut.tasks[taskId].completed;
    return true;
  } catch (error) {
    console.error("Error toggling task completion:", error);
    return false;
  }
};

// Query management functions
export const addQuery = (astronautId: string, message: string): boolean => {
  try {
    const astronaut = mockData.find(a => a.astronaut_profile.id === astronautId);
    if (!astronaut) return false;
    
    // Initialize queries object if it doesn't exist
    if (!astronaut.queries) {
      astronaut.queries = {};
    }
    
    const newQueryId = `query-${Date.now()}`;
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    astronaut.queries[newQueryId] = {
      id: newQueryId,
      message,
      timestamp: `${currentDate} ${currentTime}`,
      // Simulate an automatic AI response for demo purposes
      response: {
        message: getAutomatedResponse(astronaut, message),
        timestamp: `${currentDate} ${currentTime}`,
        isAI: true
      }
    };
    
    return true;
  } catch (error) {
    console.error("Error adding query:", error);
    return false;
  }
};

// Helper function to generate automated responses
function getAutomatedResponse(astronaut: any, query: string): string {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("headache") || lowercaseQuery.includes("head") || lowercaseQuery.includes("pain")) {
    return "Based on your vitals, your headache may be related to slight dehydration. Please increase your fluid intake and take a rest period of 30 minutes. If symptoms persist, schedule a full examination.";
  }
  
  if (lowercaseQuery.includes("sleep") || lowercaseQuery.includes("tired") || lowercaseQuery.includes("fatigue")) {
    return `Our records show you've been sleeping ${astronaut.astronaut_profile.sleep_hours} hours per night. This is ${astronaut.astronaut_profile.sleep_hours < 7 ? "below" : "within"} the recommended range. Try to maintain consistent sleep schedules and use the relaxation exercises in your training protocol.`;
  }
  
  if (lowercaseQuery.includes("stress") || lowercaseQuery.includes("anxiety") || lowercaseQuery.includes("worried")) {
    return `Your current stress level is rated at ${astronaut.astronaut_profile.stress_level.value}/10. I recommend scheduling a virtual counseling session and practicing the mindfulness exercises from your training module 3.`;
  }
  
  if (lowercaseQuery.includes("blood pressure") || lowercaseQuery.includes("heart") || lowercaseQuery.includes("bp")) {
    return `Your current readings show BP: ${astronaut.astronaut_profile.bp_systolic}/${astronaut.astronaut_profile.bp_diastolic}, HR: ${astronaut.astronaut_profile.heart_rate}. ${astronaut.astronaut_profile.bp_systolic > 130 ? "This is slightly elevated. Try to reduce sodium intake and perform relaxation exercises." : "This is within normal parameters for your profile."}`;
  }
  
  return "Thank you for your query. The medical team will review your message and respond shortly. Meanwhile, continue following your current health protocol and monitor your symptoms.";
}

// Removing duplicate exports at the end of the file
