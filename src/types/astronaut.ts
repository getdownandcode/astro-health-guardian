
export interface AstronautProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  heart_rate: number;
  bp_systolic: number;
  bp_diastolic: number;
  spo2: number;
  sleep_hours: number;
  body_temp: number;
  stress_level: {
    value: number;
  };
  bmi: {
    value: number;
  };
  smoking: {
    value: string;
  };
}

export interface Prediction {
  risk_level: "Critical" | "High" | "Medium" | "Low";
  probabilities: {
    Low: number;
    Medium: number;
    High: number;
    Critical: number;
  };
}

export interface AnomalyDetection {
  is_anomaly: boolean;
  anomaly_score: number;
}

export interface ClinicalInsights {
  summary: string;
  top_factors: {
    factor_1: string;
    factor_2: string;
    factor_3?: string;
  };
  vitals_analysis?: string;
  immediate_actions: {
    [key: string]: string;
  };
  countermeasures?: {
    [key: string]: string;
  };
  long_term_monitoring?: string;
}

export interface RuleBasedRecommendations {
  [key: string]: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Tasks {
  [key: string]: Task;
}

export interface AstronautData {
  astronaut_profile: AstronautProfile;
  prediction: Prediction;
  anomaly_detection: AnomalyDetection;
  clinical_insights: ClinicalInsights;
  rule_based_recommendations: RuleBasedRecommendations;
  tasks: Tasks;
  timestamp: string;
}
