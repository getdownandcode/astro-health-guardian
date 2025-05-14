
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { getAnomalies, getAstronautById } from "@/services/mockData";
import { AlertCircle, ArrowRight } from "lucide-react";
import RiskBadge from "@/components/RiskBadge";

const Alerts = () => {
  const navigate = useNavigate();
  const anomalies = getAnomalies();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alert Center</h1>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-space-neutral">Last updated: {anomalies[0]?.timestamp || "N/A"}</span>
            <div className="h-2 w-2 rounded-full bg-risk-critical animate-pulse"></div>
          </div>
        </div>
        
        {anomalies.length > 0 ? (
          <div className="space-y-4">
            {anomalies.map((astronaut) => (
              <Card 
                key={astronaut.astronaut_profile.id}
                className="space-card border-risk-critical/20 hover:bg-card/80 cursor-pointer transition-colors"
                onClick={() => navigate(`/astronaut/${astronaut.astronaut_profile.id}`)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-risk-critical/20 flex items-center justify-center mr-3">
                        <AlertCircle className="h-4 w-4 text-risk-critical" />
                      </div>
                      <CardTitle>
                        Anomaly Alert: {astronaut.astronaut_profile.name}
                      </CardTitle>
                    </div>
                    <RiskBadge risk={astronaut.prediction.risk_level} animate={true} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Anomaly Score: {astronaut.anomaly_detection.anomaly_score.toFixed(2)}</div>
                    <div className="text-sm text-space-neutral">{astronaut.clinical_insights.summary}</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-secondary/20 rounded-md p-3">
                      <div className="text-xs text-space-neutral">Heart Rate</div>
                      <div className={`text-lg font-medium ${
                        astronaut.astronaut_profile.heart_rate > 100 ? "text-risk-critical" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.heart_rate} bpm
                      </div>
                      <div className="text-xs text-space-neutral">Normal: 60-80 bpm</div>
                    </div>
                    
                    <div className="bg-secondary/20 rounded-md p-3">
                      <div className="text-xs text-space-neutral">Blood Pressure</div>
                      <div className={`text-lg font-medium ${
                        astronaut.astronaut_profile.bp_systolic > 140 ? "text-risk-critical" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.bp_systolic}/{astronaut.astronaut_profile.bp_diastolic} mmHg
                      </div>
                      <div className="text-xs text-space-neutral">Normal: 120/80 mmHg</div>
                    </div>
                    
                    <div className="bg-secondary/20 rounded-md p-3">
                      <div className="text-xs text-space-neutral">SpO₂</div>
                      <div className={`text-lg font-medium ${
                        astronaut.astronaut_profile.spo2 < 95 ? "text-risk-critical" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.spo2}%
                      </div>
                      <div className="text-xs text-space-neutral">Normal: 95-100%</div>
                    </div>
                    
                    <div className="bg-secondary/20 rounded-md p-3">
                      <div className="text-xs text-space-neutral">Stress Level</div>
                      <div className={`text-lg font-medium ${
                        astronaut.astronaut_profile.stress_level.value > 7 ? "text-risk-critical" : "text-foreground"
                      }`}>
                        {astronaut.astronaut_profile.stress_level.value}/10
                      </div>
                      <div className="text-xs text-space-neutral">Normal: 0-4</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Immediate Actions Required:</h3>
                    <ul className="text-sm space-y-1">
                      {Object.entries(astronaut.clinical_insights.immediate_actions).map(([key, value], index) => (
                        <li key={key} className="flex items-start space-x-2">
                          <div className="h-5 w-5 flex items-center justify-center rounded-full bg-risk-high text-xs text-white flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      View Full Profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="space-card">
            <CardContent className="pt-6 text-center">
              <div className="mb-4">✓</div>
              <h3 className="text-xl font-medium mb-2">No Active Alerts</h3>
              <p className="text-space-neutral">All astronauts are within normal health parameters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Alerts;
