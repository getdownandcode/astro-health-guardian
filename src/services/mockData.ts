import { AstronautData } from "../types/astronaut";

export const ASTRONAUT_DATA: AstronautData[] = [
  // Astronaut 1 - High Risk
  {
    astronaut_profile: {
      id: "ast-001",
      name: "Commander Wei Chen",
      age: 42,
      gender: "Male",
      heart_rate: 105,
      bp_systolic: 145,
      bp_diastolic: 95,
      spo2: 94,
      sleep_hours: 4.5,
      body_temp: 37.3,
      stress_level: {
        value: 8
      },
      bmi: {
        value: 26.4
      },
      smoking: {
        value: "Former"
      }
    },
    prediction: {
      risk_level: "High",
      probabilities: {
        Low: 0.05,
        Medium: 0.15,
        High: 0.65,
        Critical: 0.15
      }
    },
    anomaly_detection: {
      is_anomaly: true,
      anomaly_score: 0.78
    },
    clinical_insights: {
      summary: "Commander Chen is showing signs of cardiovascular strain with elevated heart rate and blood pressure. Sleep deprivation is likely contributing to his condition. Immediate intervention recommended.",
      top_factors: {
        factor_1: "Elevated heart rate (105 bpm) indicates cardiovascular strain",
        factor_2: "Hypertension (145/95 mmHg) significantly above normal range",
        factor_3: "Sleep deprivation (4.5 hours) affecting recovery and stress levels"
      },
      immediate_actions: {
        cardiovascular: "Monitor heart rate continuously for the next 24 hours",
        medication: "Consider temporary blood pressure medication if readings remain elevated",
        rest: "Mandatory rest period of 8 hours minimum"
      },
      countermeasures: {
        stress_management: "Implement twice-daily guided meditation sessions",
        sleep_hygiene: "Adjust cabin lighting to promote better sleep cycles",
        workload: "Reduce EVA activities by 50% for the next 72 hours"
      }
    },
    rule_based_recommendations: {
      heart_rate: "Immediate rest period required. Avoid strenuous activity for 24 hours.",
      blood_pressure: "Increase fluid intake and reduce sodium consumption. Consider medication if no improvement in 12 hours.",
      sleep: "Implement sleep hygiene protocol. Schedule 8-hour uninterrupted rest period."
    },
    tasks: {
      "task-001": {
        id: "task-001",
        title: "Complete 15-minute guided meditation",
        description: "Use the stress reduction program on medical tablet",
        completed: false
      },
      "task-002": {
        id: "task-002",
        title: "Take blood pressure reading every 4 hours",
        completed: false
      },
      "task-003": {
        id: "task-003",
        title: "Limit caffeine intake to morning hours only",
        completed: true
      }
    },
    queries: {
      "query-001": {
        id: "query-001",
        message: "I've been experiencing headaches after using the new VR training module. Could this be related to my blood pressure?",
        timestamp: "2025-05-15 14:30:00 UTC",
        response: {
          message: "Yes, there could be a connection. VR systems can sometimes trigger headaches, especially with your current blood pressure readings. Try limiting sessions to 20 minutes and ensure proper hydration before and after. We'll adjust your monitoring schedule to track any correlation.",
          timestamp: "2025-05-15 15:05:00 UTC"
        }
      }
    },
    timestamp: "2025-05-16 08:00:00 UTC"
  },
  
  // Astronaut 2 - Medium Risk
  {
    astronaut_profile: {
      id: "ast-002",
      name: "Dr. Elena Rodriguez",
      age: 38,
      gender: "Female",
      heart_rate: 82,
      bp_systolic: 135,
      bp_diastolic: 85,
      spo2: 97,
      sleep_hours: 6.2,
      body_temp: 36.8,
      stress_level: {
        value: 6
      },
      bmi: {
        value: 23.1
      },
      smoking: {
        value: "No"
      }
    },
    prediction: {
      risk_level: "Medium",
      probabilities: {
        Low: 0.25,
        Medium: 0.55,
        High: 0.15,
        Critical: 0.05
      }
    },
    anomaly_detection: {
      is_anomaly: false,
      anomaly_score: 0.35
    },
    clinical_insights: {
      summary: "Dr. Rodriguez is showing mild hypertension and moderate stress levels. Sleep quality is suboptimal but not critical. Preventative measures recommended to avoid escalation.",
      top_factors: {
        factor_1: "Mild hypertension (135/85 mmHg) requiring monitoring",
        factor_2: "Moderate stress levels (6/10) affecting overall health"
      },
      immediate_actions: {
        monitoring: "Continue regular blood pressure monitoring",
        stress: "Implement stress reduction techniques during work hours"
      }
    },
    rule_based_recommendations: {
      blood_pressure: "Monitor blood pressure twice daily. Incorporate more physical activity into daily routine.",
      stress: "Schedule regular breaks during complex tasks. Practice breathing exercises when feeling overwhelmed."
    },
    tasks: {
      "task-001": {
        id: "task-001",
        title: "Record blood pressure morning and evening",
        completed: true
      },
      "task-002": {
        id: "task-002",
        title: "Complete 30 minutes of moderate exercise",
        description: "Use the stationary bike or treadmill in the exercise module",
        completed: false
      }
    },
    queries: {},
    timestamp: "2025-05-16 07:30:00 UTC"
  },
  
  // Astronaut 3 - Low Risk
  {
    astronaut_profile: {
      id: "ast-003",
      name: "Major Thomas Davis",
      age: 35,
      gender: "Male",
      heart_rate: 68,
      bp_systolic: 118,
      bp_diastolic: 75,
      spo2: 99,
      sleep_hours: 7.5,
      body_temp: 36.6,
      stress_level: {
        value: 4
      },
      bmi: {
        value: 24.2
      },
      smoking: {
        value: "No"
      }
    },
    prediction: {
      risk_level: "Low",
      probabilities: {
        Low: 0.75,
        Medium: 0.20,
        High: 0.04,
        Critical: 0.01
      }
    },
    anomaly_detection: {
      is_anomaly: false,
      anomaly_score: 0.12
    },
    clinical_insights: {
      summary: "Major Davis is in excellent health with all vital signs within normal ranges. His consistent exercise regimen and sleep hygiene are contributing positively to his overall condition.",
      top_factors: {
        factor_1: "Optimal cardiovascular health indicators",
        factor_2: "Excellent stress management and coping mechanisms"
      },
      immediate_actions: {
        maintenance: "Continue current health protocols"
      }
    },
    rule_based_recommendations: {
      general: "Maintain current health regimen. Consider sharing stress management techniques with crew members."
    },
    tasks: {
      "task-001": {
        id: "task-001",
        title: "Complete weekly health questionnaire",
        completed: true
      }
    },
    queries: {},
    timestamp: "2025-05-16 06:45:00 UTC"
  },
  
  // Astronaut 4 - Critical Risk
  {
    astronaut_profile: {
      id: "ast-004",
      name: "Dr. Aisha Patel",
      age: 40,
      gender: "Female",
      heart_rate: 115,
      bp_systolic: 160,
      bp_diastolic: 100,
      spo2: 92,
      sleep_hours: 3.5,
      body_temp: 38.1,
      stress_level: {
        value: 9
      },
      bmi: {
        value: 22.8
      },
      smoking: {
        value: "No"
      }
    },
    prediction: {
      risk_level: "Critical",
      probabilities: {
        Low: 0.01,
        Medium: 0.04,
        High: 0.25,
        Critical: 0.70
      }
    },
    anomaly_detection: {
      is_anomaly: true,
      anomaly_score: 0.92
    },
    clinical_insights: {
      summary: "Dr. Patel is experiencing severe cardiovascular strain, elevated body temperature, and critically low oxygen saturation. Immediate medical intervention required.",
      top_factors: {
        factor_1: "Severe hypertension (160/100 mmHg) indicating cardiovascular emergency",
        factor_2: "Low oxygen saturation (92%) suggesting respiratory distress",
        factor_3: "Elevated body temperature (38.1°C) indicating possible infection"
      },
      vitals_analysis: "The combination of elevated heart rate, hypertension, and reduced oxygen saturation suggests a potential systemic inflammatory response. The pattern is consistent with either an infectious process or an adverse reaction to recent experimental procedures.",
      immediate_actions: {
        isolation: "Move to medical bay for continuous monitoring",
        medication: "Administer anti-hypertensive medication and broad-spectrum antibiotics",
        oxygen: "Provide supplemental oxygen to maintain saturation above 95%"
      },
      countermeasures: {
        diagnostic: "Conduct comprehensive blood panel and chest imaging",
        monitoring: "Implement continuous vital sign monitoring with 15-minute clinical assessments",
        communication: "Establish direct line with Earth medical team for consultation"
      },
      long_term_monitoring: "If condition stabilizes, maintain enhanced monitoring for 72 hours with gradual return to duties based on vital sign normalization and symptom resolution."
    },
    rule_based_recommendations: {
      urgent: "IMMEDIATE MEDICAL ATTENTION REQUIRED. Escort to medical bay for treatment.",
      medication: "Administer emergency medication protocol E-7 per medical manual.",
      monitoring: "Continuous vital sign monitoring with automated alerts for any deterioration."
    },
    tasks: {
      "task-001": {
        id: "task-001",
        title: "Take emergency medication",
        description: "Follow protocol E-7 in medical manual",
        completed: false
      },
      "task-002": {
        id: "task-002",
        title: "Report symptoms every hour",
        completed: false
      },
      "task-003": {
        id: "task-003",
        title: "Maintain bed rest until cleared by medical team",
        completed: false
      }
    },
    queries: {
      "query-001": {
        id: "query-001",
        message: "I'm experiencing severe dizziness and chest tightness. Vision is slightly blurred. Should I increase my oxygen flow?",
        timestamp: "2025-05-16 05:45:00 UTC",
        response: {
          message: "URGENT: Yes, increase oxygen flow to 4L/min immediately. Take one dose of emergency medication from compartment M-5. Medical team is being notified and will contact you directly. Remain in your current position and minimize movement.",
          timestamp: "2025-05-16 05:47:00 UTC"
        }
      }
    },
    timestamp: "2025-05-16 06:00:00 UTC"
  },
  
  // Astronaut 5 - Low Risk
  {
    astronaut_profile: {
      id: "ast-005",
      name: "Lieutenant Soo-Jin Kim",
      age: 32,
      gender: "Female",
      heart_rate: 65,
      bp_systolic: 110,
      bp_diastolic: 70,
      spo2: 99,
      sleep_hours: 7.8,
      body_temp: 36.5,
      stress_level: {
        value: 3
      },
      bmi: {
        value: 21.5
      },
      smoking: {
        value: "No"
      }
    },
    prediction: {
      risk_level: "Low",
      probabilities: {
        Low: 0.85,
        Medium: 0.10,
        High: 0.04,
        Critical: 0.01
      }
    },
    anomaly_detection: {
      is_anomaly: false,
      anomaly_score: 0.08
    },
    clinical_insights: {
      summary: "Lieutenant Kim demonstrates excellent overall health with optimal vital signs across all metrics. Her consistent exercise regimen and stress management techniques are highly effective.",
      top_factors: {
        factor_1: "Excellent cardiovascular health indicators",
        factor_2: "Optimal stress management and sleep patterns"
      },
      immediate_actions: {
        maintenance: "Continue current health protocols"
      }
    },
    rule_based_recommendations: {
      general: "Maintain current health regimen. Consider participating in crew health education sessions as a positive example."
    },
    tasks: {},
    queries: {},
    timestamp: "2025-05-16 07:15:00 UTC"
  }
];

// In-memory storage for our mock data
let mockData = [...ASTRONAUT_DATA];

// Generate a simple ID for new messages or tasks
const generateId = () => {
  return Date.now().toString();
};

// Format current timestamp
const getCurrentTimestamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
};

// Get all astronauts
export function getAstronauts() {
  return mockData;
}

// Get specific astronaut by ID
export function getAstronautById(id: string) {
  return mockData.find(a => a.astronaut_profile.id === id);
}

// Get astronauts with anomalies
export function getAnomalies() {
  return mockData.filter(a => a.anomaly_detection.is_anomaly);
}

// Mock chat history
const chatHistories: { [astronautId: string]: any[] } = {
  "ast-001": [
    { id: "msg-001", sender: "system", text: "ALERT: Elevated heart rate detected. Please check in with the astronaut.", timestamp: "2025-05-16 08:30:00 UTC" },
    { id: "msg-002", sender: "doctor", text: "Hello Commander Chen, I've noticed your heart rate has been elevated for the past 3 hours. How are you feeling?", timestamp: "2025-05-16 08:32:00 UTC" },
    { id: "msg-003", sender: "astronaut", text: "Hi Doctor, I've been experiencing some shortness of breath after our EVA yesterday. Also having trouble sleeping.", timestamp: "2025-05-16 08:35:00 UTC" },
  ],
  "ast-002": [
    { id: "msg-001", sender: "doctor", text: "Good morning Dr. Rodriguez. Your latest blood pressure reading shows improvement. How are you feeling today?", timestamp: "2025-05-16 07:15:00 UTC" },
    { id: "msg-002", sender: "astronaut", text: "Morning! I'm feeling better, the new medication seems to be working. Still have occasional headaches but they're less frequent now.", timestamp: "2025-05-16 07:20:00 UTC" },
  ],
  "ast-003": [
    { id: "msg-001", sender: "doctor", text: "Hello Major Davis, just checking in on your stress levels today.", timestamp: "2025-05-16 10:45:00 UTC" },
    { id: "msg-002", sender: "astronaut", text: "Thanks for checking in. The meditation exercises are helping, but I'm still concerned about our upcoming docking procedure.", timestamp: "2025-05-16 11:02:00 UTC" },
  ],
  "ast-004": [
    { id: "msg-001", sender: "system", text: "ALERT: Critical anomaly detected in vital signs. Immediate attention required.", timestamp: "2025-05-16 06:15:00 UTC" },
    { id: "msg-002", sender: "doctor", text: "Dr. Patel, we're seeing concerning readings from your sensors. Please respond immediately and confirm your status.", timestamp: "2025-05-16 06:16:00 UTC" },
    { id: "msg-003", sender: "astronaut", text: "I'm experiencing severe dizziness and nausea after the equipment test. Need assistance.", timestamp: "2025-05-16 06:20:00 UTC" },
    { id: "msg-004", sender: "doctor", text: "Understood. Follow emergency protocol E-5. Admin has been notified. We're preparing countermeasures now.", timestamp: "2025-05-16 06:22:00 UTC" },
  ],
  "ast-005": [
    { id: "msg-001", sender: "doctor", text: "Hello Lieutenant Kim, your latest physical results look excellent. Keep up the good work with your exercise regimen.", timestamp: "2025-05-16 09:10:00 UTC" },
    { id: "msg-002", sender: "astronaut", text: "Thanks! I've been making sure to complete all the recommended exercises. When is my next scheduled checkup?", timestamp: "2025-05-16 09:25:00 UTC" },
  ],
};

// Get chat history for a specific astronaut
export function getChatHistory(astronautId: string) {
  return chatHistories[astronautId] || [];
}

// Add a new chat message
export function addChatMessage(astronautId: string, messageData: { sender: string; text: string }) {
  if (!chatHistories[astronautId]) {
    chatHistories[astronautId] = [];
  }
  
  const newMessage = {
    id: `msg-${generateId()}`,
    sender: messageData.sender,
    text: messageData.text,
    timestamp: getCurrentTimestamp()
  };
  
  chatHistories[astronautId].push(newMessage);
  return true;
}

// Add a new task for an astronaut
export function addTask(astronautId: string, taskData: { title: string; description?: string }) {
  const astronautIndex = mockData.findIndex(a => a.astronaut_profile.id === astronautId);
  if (astronautIndex === -1) return false;
  
  const newTask = {
    id: `task-${generateId()}`,
    title: taskData.title,
    description: taskData.description,
    completed: false
  };
  
  // Add the task to the astronaut's task list
  mockData[astronautIndex].tasks[newTask.id] = newTask;
  return true;
}

// Update a task for an astronaut
export function updateTask(astronautId: string, taskId: string, taskData: { title?: string; description?: string }) {
  const astronautIndex = mockData.findIndex(a => a.astronaut_profile.id === astronautId);
  if (astronautIndex === -1) return false;
  
  const task = mockData[astronautIndex].tasks[taskId];
  if (!task) return false;
  
  if (taskData.title) task.title = taskData.title;
  if (taskData.description !== undefined) task.description = taskData.description;
  
  return true;
}

// Toggle task completion status
export function toggleTaskCompletion(astronautId: string, taskId: string) {
  const astronautIndex = mockData.findIndex(a => a.astronaut_profile.id === astronautId);
  if (astronautIndex === -1) return false;
  
  const task = mockData[astronautIndex].tasks[taskId];
  if (!task) return false;
  
  task.completed = !task.completed;
  return true;
}

// Delete a task
export function deleteTask(astronautId: string, taskId: string) {
  const astronautIndex = mockData.findIndex(a => a.astronaut_profile.id === astronautId);
  if (astronautIndex === -1) return false;
  
  if (!mockData[astronautIndex].tasks[taskId]) return false;
  
  delete mockData[astronautIndex].tasks[taskId];
  return true;
}

// Add a new query
export function addQuery(astronautId: string, message: string) {
  const astronautIndex = mockData.findIndex(a => a.astronaut_profile.id === astronautId);
  if (astronautIndex === -1) return false;
  
  const queryId = `query-${generateId()}`;
  
  // Add the query to the astronaut's queries
  if (!mockData[astronautIndex].queries) {
    mockData[astronautIndex].queries = {};
  }
  
  mockData[astronautIndex].queries[queryId] = {
    id: queryId,
    message,
    timestamp: getCurrentTimestamp(),
    response: {
      message: generateAIResponse(),
      timestamp: getCurrentTimestamp(),
      isAI: true
    }
  };
  
  return true;
}

// Get heart rate trend data
export function getMockVitalTrend(astronautId: string, vitalType: string) {
  // Generate mock data for a 24-hour period
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  let baseValue = 0;
  switch(vitalType) {
    case "heart_rate":
      baseValue = 70;
      break;
    case "bp_systolic":
      baseValue = 120;
      break;
    case "spo2":
      baseValue = 98;
      break;
    default:
      baseValue = 70;
  }
  
  // Generate random fluctuations based on the astronaut id to make it consistent
  const seed = astronautId.charCodeAt(astronautId.length - 1);
  
  return hours.map(hour => {
    const hourSeed = (hour + seed) % 23;
    let value = baseValue;
    
    // Add some randomness but keep it relatively stable
    value += Math.sin(hourSeed) * 10;
    
    // Add a spike for ast-004 (the critical astronaut)
    if (astronautId === "ast-004" && hour >= 6 && hour <= 8) {
      value += 25;
    }
    
    return {
      hour: `${hour}:00`,
      value: Math.round(value * 10) / 10
    };
  });
}

// Generate a generic AI response for health queries
function generateAIResponse() {
  return "Thank you for your query. The medical team will review your message and respond shortly. Meanwhile, continue following your current health protocol and monitor your symptoms.";
}

// Export all functions - consolidated export statement
export { mockData };
