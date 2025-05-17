
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import TaskCheckbox from "@/components/TaskCheckbox";
import QueryForm from "@/components/QueryForm";
import { useAuth } from "@/contexts/AuthContext";
import { getAstronauts } from "@/services/mockData";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AstronautDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const allAstronauts = getAstronauts();
  
  // For astronaut users, only show their own data
  const astronaut = user?.astronautId 
    ? allAstronauts.find(a => a.astronaut_profile.id === user.astronautId)
    : allAstronauts[0]; // Fallback to first astronaut if no ID match
    
  if (!astronaut) {
    return (
      <Layout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Astronaut Health Dashboard</h1>
          <p>No data available for your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Health Dashboard</h1>
          <p className="text-sm text-space-neutral">Last Updated: {astronaut.timestamp}</p>
        </div>
        
        {/* Personal Health Status */}
        <Card className="space-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Current Health Status</CardTitle>
              <RiskBadge 
                risk={astronaut.prediction.risk_level} 
                animate={astronaut.prediction.risk_level === "Critical"}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-border/50 rounded-md p-3">
                <div className="text-xs text-space-neutral">Heart Rate</div>
                <div className={`text-xl font-medium ${
                  astronaut.astronaut_profile.heart_rate > 100 ? "text-risk-critical" : 
                  astronaut.astronaut_profile.heart_rate > 90 ? "text-risk-high" : "text-foreground"
                }`}>
                  {astronaut.astronaut_profile.heart_rate} bpm
                </div>
              </div>
              
              <div className="border border-border/50 rounded-md p-3">
                <div className="text-xs text-space-neutral">Blood Pressure</div>
                <div className={`text-xl font-medium ${
                  astronaut.astronaut_profile.bp_systolic > 140 ? "text-risk-critical" : 
                  astronaut.astronaut_profile.bp_systolic > 130 ? "text-risk-high" : "text-foreground"
                }`}>
                  {astronaut.astronaut_profile.bp_systolic}/{astronaut.astronaut_profile.bp_diastolic}
                </div>
              </div>
              
              <div className="border border-border/50 rounded-md p-3">
                <div className="text-xs text-space-neutral">SpO₂</div>
                <div className={`text-xl font-medium ${
                  astronaut.astronaut_profile.spo2 < 95 ? "text-risk-critical" : 
                  astronaut.astronaut_profile.spo2 < 97 ? "text-risk-high" : "text-foreground"
                }`}>
                  {astronaut.astronaut_profile.spo2}%
                </div>
              </div>
              
              <div className="border border-border/50 rounded-md p-3">
                <div className="text-xs text-space-neutral">Stress Level</div>
                <div className={`text-xl font-medium ${
                  astronaut.astronaut_profile.stress_level.value > 7 ? "text-risk-critical" : 
                  astronaut.astronaut_profile.stress_level.value > 5 ? "text-risk-high" : "text-foreground"
                }`}>
                  {astronaut.astronaut_profile.stress_level.value}/10
                </div>
              </div>
            </div>
            
            {astronaut.anomaly_detection.is_anomaly && (
              <div className="bg-risk-critical/10 border border-risk-critical/20 p-4 rounded-md">
                <div className="flex items-center gap-2 text-risk-critical font-medium mb-2">
                  <AlertCircle className="h-5 w-5" /> 
                  Anomaly Detected
                </div>
                <p className="text-sm">
                  {astronaut.clinical_insights.summary}
                </p>
              </div>
            )}

            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="tasks" className="flex-1">Medical Tasks</TabsTrigger>
                <TabsTrigger value="query" className="flex-1">Ask Medical Team</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks">
                {/* Tasks Section */}
                <div className="space-y-2 border border-border/50 rounded-md p-4 bg-secondary/20">
                  {astronaut.tasks && Object.values(astronaut.tasks).length > 0 ? (
                    Object.values(astronaut.tasks).map((task) => (
                      <TaskCheckbox
                        key={task.id}
                        astronautId={astronaut.astronaut_profile.id}
                        taskId={task.id}
                        title={task.title}
                        description={task.description}
                        completed={task.completed}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No tasks assigned</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="query">
                <div className="space-y-4">
                  <QueryForm astronautId={astronaut.astronaut_profile.id} />
                  
                  {astronaut.queries && Object.values(astronaut.queries).length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Previous Queries:</h3>
                      <div className="space-y-4">
                        {Object.values(astronaut.queries).map((query) => (
                          <div key={query.id} className="border border-border/50 rounded-md p-3">
                            <div className="flex justify-between mb-2">
                              <p className="text-sm font-medium">Your Query:</p>
                              <p className="text-xs text-muted-foreground">{query.timestamp}</p>
                            </div>
                            <p className="text-sm mb-4">{query.message}</p>
                            
                            {query.response ? (
                              <div className="bg-secondary/20 p-3 rounded-md">
                                <div className="flex justify-between mb-1">
                                  <p className="text-xs font-medium">
                                    {query.response.isAI ? "AI Assistant" : "Medical Team"} Response:
                                  </p>
                                  <p className="text-xs text-muted-foreground">{query.response.timestamp}</p>
                                </div>
                                <p className="text-sm">{query.response.message}</p>
                              </div>
                            ) : (
                              <div className="bg-secondary/10 p-3 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Awaiting response...</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Medical Recommendations:</h3>
              <ul className="space-y-1 text-sm">
                {Object.values(astronaut.rule_based_recommendations).map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                      {idx + 1}
                    </span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate(`/astronaut/${astronaut.astronaut_profile.id}`)}
                className="flex-1"
              >
                View Detailed Health Report
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/chat')}
                className="flex-1"
              >
                Contact Medical Team
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Health Insights */}
        <Card className="space-card">
          <CardHeader>
            <CardTitle>Clinical Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{astronaut.clinical_insights.summary}</p>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Top Contributing Factors:</h3>
              <ul className="space-y-2 text-sm">
                {Object.values(astronaut.clinical_insights.top_factors).map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="bg-secondary/30 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                      {idx + 1}
                    </span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AstronautDashboard;
