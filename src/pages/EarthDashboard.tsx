import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import AnomalyAlert from "@/components/AnomalyAlert";
import TaskManager from "@/components/TaskManager";
import { useAuth } from "@/contexts/AuthContext";
import { getAstronauts, getAnomalies } from "@/services/mockData";
import Layout from "@/components/Layout";

const EarthDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const astronauts = getAstronauts();
  const anomalies = getAnomalies();
  const [expandedAstronaut, setExpandedAstronaut] = useState<string | null>(null);

  // Risk level counts
  const riskCounts = {
    Critical: astronauts.filter(a => a.prediction.risk_level === "Critical").length,
    High: astronauts.filter(a => a.prediction.risk_level === "High").length,
    Medium: astronauts.filter(a => a.prediction.risk_level === "Medium").length,
    Low: astronauts.filter(a => a.prediction.risk_level === "Low").length,
  };

  // Toggle task expansion for an astronaut
  const toggleTaskExpand = (id: string) => {
    setExpandedAstronaut(expandedAstronaut === id ? null : id);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Earth Medical Control Dashboard</h1>
          <p className="text-sm text-space-neutral">Last Updated: {astronauts[0].timestamp}</p>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-space-neutral">Critical Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-critical">{riskCounts.Critical}</div>
              <p className="text-xs text-space-neutral">Astronauts</p>
            </CardContent>
          </Card>
          
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-space-neutral">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-high">{riskCounts.High}</div>
              <p className="text-xs text-space-neutral">Astronauts</p>
            </CardContent>
          </Card>
          
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-space-neutral">Anomalies Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-critical">{anomalies.length}</div>
              <p className="text-xs text-space-neutral">Requiring Attention</p>
            </CardContent>
          </Card>
          
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-space-neutral">Healthy Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-low">{riskCounts.Low}</div>
              <p className="text-xs text-space-neutral">Astronauts</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Anomaly Alerts */}
        {anomalies.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-medium">Active Alerts</h2>
            <div className="space-y-3">
              {anomalies.map((astronaut) => (
                <AnomalyAlert 
                  key={astronaut.astronaut_profile.id}
                  astronautName={astronaut.astronaut_profile.name}
                  anomalyScore={astronaut.anomaly_detection.anomaly_score}
                  issue={astronaut.clinical_insights.summary.split('.')[0]}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Astronaut List */}
        <div className="space-y-3">
          <h2 className="text-xl font-medium">Mission Crew Health Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {astronauts.map((astronaut) => (
              <Card 
                key={astronaut.astronaut_profile.id} 
                className="space-card hover:bg-card/70 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle 
                      className="text-lg cursor-pointer"
                      onClick={() => navigate(`/astronaut/${astronaut.astronaut_profile.id}`)}
                    >
                      {astronaut.astronaut_profile.name}
                    </CardTitle>
                    <RiskBadge 
                      risk={astronaut.prediction.risk_level} 
                      animate={astronaut.prediction.risk_level === "Critical"}
                    />
                  </div>
                  <div className="text-xs text-space-neutral">
                    Age: {astronaut.astronaut_profile.age} • 
                    Gender: {astronaut.astronaut_profile.gender}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-space-neutral">Heart Rate</div>
                      <div className={`text-sm font-medium ${
                        astronaut.astronaut_profile.heart_rate > 100 ? "text-risk-critical" : 
                        astronaut.astronaut_profile.heart_rate > 90 ? "text-risk-high" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.heart_rate} bpm
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-space-neutral">Blood Pressure</div>
                      <div className={`text-sm font-medium ${
                        astronaut.astronaut_profile.bp_systolic > 140 ? "text-risk-critical" : 
                        astronaut.astronaut_profile.bp_systolic > 130 ? "text-risk-high" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.bp_systolic}/{astronaut.astronaut_profile.bp_diastolic}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-space-neutral">SpO₂</div>
                      <div className={`text-sm font-medium ${
                        astronaut.astronaut_profile.spo2 < 95 ? "text-risk-critical" : 
                        astronaut.astronaut_profile.spo2 < 97 ? "text-risk-high" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.spo2}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-space-neutral">Stress Level</div>
                      <div className={`text-sm font-medium ${
                        astronaut.astronaut_profile.stress_level.value > 7 ? "text-risk-critical" : 
                        astronaut.astronaut_profile.stress_level.value > 5 ? "text-risk-high" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.stress_level.value}/10
                      </div>
                    </div>
                  </div>

                  {astronaut.anomaly_detection.is_anomaly && (
                    <div className="text-xs px-2 py-1 bg-risk-critical/10 text-risk-critical rounded flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Anomaly Detected
                    </div>
                  )}

                  {/* Task Management Section */}
                  <TaskManager 
                    astronautId={astronaut.astronaut_profile.id}
                    astronautName={astronaut.astronaut_profile.name}
                    tasks={astronaut.tasks || {}}
                  />

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => navigate(`/astronaut/${astronaut.astronaut_profile.id}`)}
                  >
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EarthDashboard;
