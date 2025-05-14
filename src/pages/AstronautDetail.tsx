
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ArrowLeft, Download, Heart, Lungs, Send } from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import VitalSign from "@/components/VitalSign";
import Layout from "@/components/Layout";
import { getAstronautById, getMockVitalTrend, getChatHistory } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

// Import Plotly.js components
import Plot from 'react-plotly.js';

const AstronautDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const astronaut = getAstronautById(id || "");
  
  const [activeTab, setActiveTab] = useState("overview");
  const [message, setMessage] = useState("");
  const chatHistory = id ? getChatHistory(id) : [];

  // Heart rate trend data
  const heartRateTrend = id ? getMockVitalTrend(id, "heart_rate") : [];
  
  // Create risk probability data for the chart
  const riskProbabilities = astronaut ? [
    astronaut.prediction.probabilities.Low,
    astronaut.prediction.probabilities.Medium,
    astronaut.prediction.probabilities.High,
    astronaut.prediction.probabilities.Critical
  ] : [0, 0, 0, 0];

  if (!astronaut) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl">Astronaut not found</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="mt-4"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Function to determine vital sign status
  const getVitalStatus = (type: string, value: number) => {
    switch (type) {
      case "heart_rate":
        return value > 100 ? "danger" : value > 90 ? "warning" : "normal";
      case "bp_systolic":
        return value > 140 ? "danger" : value > 130 ? "warning" : "normal";
      case "spo2":
        return value < 95 ? "danger" : value < 97 ? "warning" : "normal";
      case "stress":
        return value > 7 ? "danger" : value > 5 ? "warning" : "normal";
      default:
        return "normal";
    }
  };
  
  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF or download JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(astronaut, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `health_report_${astronaut.astronaut_profile.name.replace(' ', '_')}.json`);
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "Report Downloaded",
      description: "Health report has been downloaded successfully."
    });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been delivered."
    });
    
    setMessage("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{astronaut.astronaut_profile.name}'s Health Profile</h1>
            <RiskBadge risk={astronaut.prediction.risk_level} className="ml-2" />
          </div>
          <Button onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="predictions">Risk Analysis</TabsTrigger>
            <TabsTrigger value="insights">Clinical Insights</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Profile Card */}
              <Card className="space-card md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-space-neutral">Age:</span>
                      <span>{astronaut.astronaut_profile.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-space-neutral">Gender:</span>
                      <span>{astronaut.astronaut_profile.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-space-neutral">BMI:</span>
                      <span>{astronaut.astronaut_profile.bmi.value} kg/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-space-neutral">Smoking:</span>
                      <span>{astronaut.astronaut_profile.smoking.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-space-neutral">Stress Level:</span>
                      <span>{astronaut.astronaut_profile.stress_level.value}/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Vital Signs Summary */}
              <Card className="space-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Current Vital Signs</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <VitalSign 
                    label="Heart Rate"
                    value={astronaut.astronaut_profile.heart_rate}
                    unit="bpm"
                    normalRange="60-80"
                    status={getVitalStatus("heart_rate", astronaut.astronaut_profile.heart_rate)}
                  />
                  <VitalSign 
                    label="Blood Pressure"
                    value={`${astronaut.astronaut_profile.bp_systolic}/${astronaut.astronaut_profile.bp_diastolic}`}
                    unit="mmHg"
                    normalRange="120/80"
                    status={getVitalStatus("bp_systolic", astronaut.astronaut_profile.bp_systolic)}
                  />
                  <VitalSign 
                    label="SpO₂"
                    value={astronaut.astronaut_profile.spo2}
                    unit="%"
                    normalRange="98-100"
                    status={getVitalStatus("spo2", astronaut.astronaut_profile.spo2)}
                  />
                  <VitalSign 
                    label="Body Temperature"
                    value={astronaut.astronaut_profile.body_temp}
                    unit="°C"
                    normalRange="36.1-37.2"
                  />
                  <VitalSign 
                    label="Sleep Hours"
                    value={astronaut.astronaut_profile.sleep_hours}
                    unit="hrs"
                    normalRange="7-9"
                  />
                  <VitalSign 
                    label="Stress Level"
                    value={astronaut.astronaut_profile.stress_level.value}
                    unit="/10"
                    normalRange="0-4"
                    status={getVitalStatus("stress", astronaut.astronaut_profile.stress_level.value)}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Risk Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-space-neutral">Current Risk Level:</span>
                    <RiskBadge risk={astronaut.prediction.risk_level} />
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-space-neutral mb-1">Top Contributors:</h4>
                    <ul className="space-y-1">
                      <li className="text-sm">{astronaut.clinical_insights.top_factors.factor_1}</li>
                      <li className="text-sm">{astronaut.clinical_insights.top_factors.factor_2}</li>
                      {astronaut.clinical_insights.top_factors.factor_3 && (
                        <li className="text-sm">{astronaut.clinical_insights.top_factors.factor_3}</li>
                      )}
                    </ul>
                  </div>
                  
                  {astronaut.anomaly_detection.is_anomaly && (
                    <div className="bg-risk-critical/10 border border-risk-critical/20 rounded p-3 flex items-center space-x-2">
                      <AlertCircle className="text-risk-critical h-4 w-4" />
                      <div className="text-sm">
                        <span className="font-medium text-risk-critical">Anomaly Detected</span>
                        <p className="text-xs text-foreground/80">Anomaly Score: {astronaut.anomaly_detection.anomaly_score.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Heart Rate Trend (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Plot
                      data={[
                        {
                          x: heartRateTrend.map(h => h.hour),
                          y: heartRateTrend.map(h => h.value),
                          type: 'scatter',
                          mode: 'lines+markers',
                          line: { color: '#33C3F0' },
                          name: 'Heart Rate',
                        },
                        {
                          x: heartRateTrend.map(h => h.hour),
                          y: Array(24).fill(80),
                          type: 'scatter',
                          mode: 'lines',
                          line: { color: '#FF851B', dash: 'dot' },
                          name: 'Upper Normal',
                        },
                        {
                          x: heartRateTrend.map(h => h.hour),
                          y: Array(24).fill(60),
                          type: 'scatter',
                          mode: 'lines',
                          line: { color: '#FF851B', dash: 'dot' },
                          name: 'Lower Normal',
                        }
                      ]}
                      layout={{
                        autosize: true,
                        margin: { l: 40, r: 20, t: 10, b: 40 },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#8E9196' },
                        xaxis: { title: 'Hour' },
                        yaxis: { title: 'BPM' },
                        showlegend: false,
                      }}
                      config={{ responsive: true, displayModeBar: false }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Vitals Tab */}
          <TabsContent value="vitals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="space-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-risk-critical" />
                    Cardiovascular Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-space-neutral">Heart Rate</span>
                        <span className={`text-sm ${
                          astronaut.astronaut_profile.heart_rate > 100 ? "text-risk-critical" : 
                          astronaut.astronaut_profile.heart_rate > 90 ? "text-risk-high" : ""
                        }`}>
                          {astronaut.astronaut_profile.heart_rate} bpm
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            astronaut.astronaut_profile.heart_rate > 100 ? "bg-risk-critical" : 
                            astronaut.astronaut_profile.heart_rate > 90 ? "bg-risk-high" : 
                            "bg-primary"
                          }`}
                          style={{ width: `${(astronaut.astronaut_profile.heart_rate / 200) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-space-neutral mt-1">
                        <span>40</span>
                        <span>120</span>
                        <span>200</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-space-neutral">Systolic Blood Pressure</span>
                        <span className={`text-sm ${
                          astronaut.astronaut_profile.bp_systolic > 140 ? "text-risk-critical" : 
                          astronaut.astronaut_profile.bp_systolic > 130 ? "text-risk-high" : ""
                        }`}>
                          {astronaut.astronaut_profile.bp_systolic} mmHg
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            astronaut.astronaut_profile.bp_systolic > 140 ? "bg-risk-critical" : 
                            astronaut.astronaut_profile.bp_systolic > 130 ? "bg-risk-high" : 
                            "bg-primary"
                          }`}
                          style={{ width: `${(astronaut.astronaut_profile.bp_systolic / 200) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-space-neutral mt-1">
                        <span>80</span>
                        <span>120</span>
                        <span>200</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-space-neutral">Diastolic Blood Pressure</span>
                        <span className={`text-sm ${
                          astronaut.astronaut_profile.bp_diastolic > 90 ? "text-risk-critical" : 
                          astronaut.astronaut_profile.bp_diastolic > 85 ? "text-risk-high" : ""
                        }`}>
                          {astronaut.astronaut_profile.bp_diastolic} mmHg
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            astronaut.astronaut_profile.bp_diastolic > 90 ? "bg-risk-critical" : 
                            astronaut.astronaut_profile.bp_diastolic > 85 ? "bg-risk-high" : 
                            "bg-primary"
                          }`}
                          style={{ width: `${(astronaut.astronaut_profile.bp_diastolic / 120) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-space-neutral mt-1">
                        <span>40</span>
                        <span>80</span>
                        <span>120</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="space-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lungs className="h-5 w-5 mr-2 text-primary" />
                    Respiratory Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-space-neutral">Oxygen Saturation (SpO₂)</span>
                        <span className={`text-sm ${
                          astronaut.astronaut_profile.spo2 < 95 ? "text-risk-critical" : 
                          astronaut.astronaut_profile.spo2 < 97 ? "text-risk-high" : ""
                        }`}>
                          {astronaut.astronaut_profile.spo2}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            astronaut.astronaut_profile.spo2 < 95 ? "bg-risk-critical" : 
                            astronaut.astronaut_profile.spo2 < 97 ? "bg-risk-high" : 
                            "bg-primary"
                          }`}
                          style={{ width: `${astronaut.astronaut_profile.spo2}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-space-neutral mt-1">
                        <span>90%</span>
                        <span>95%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-space-neutral">Body Temperature</span>
                        <span className={`text-sm ${
                          astronaut.astronaut_profile.body_temp > 37.5 ? "text-risk-critical" : 
                          astronaut.astronaut_profile.body_temp > 37.2 ? "text-risk-high" : ""
                        }`}>
                          {astronaut.astronaut_profile.body_temp}°C
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            astronaut.astronaut_profile.body_temp > 37.5 ? "bg-risk-critical" : 
                            astronaut.astronaut_profile.body_temp > 37.2 ? "bg-risk-high" : 
                            "bg-primary"
                          }`}
                          style={{ width: `${((astronaut.astronaut_profile.body_temp - 35) / 5) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-space-neutral mt-1">
                        <span>35°C</span>
                        <span>37°C</span>
                        <span>40°C</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Sleep & Stress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-space-neutral">Sleep Hours</span>
                        <span className={`text-sm ${
                          astronaut.astronaut_profile.sleep_hours < 5 ? "text-risk-critical" : 
                          astronaut.astronaut_profile.sleep_hours < 6 ? "text-risk-high" : ""
                        }`}>
                          {astronaut.astronaut_profile.sleep_hours} hours
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            astronaut.astronaut_profile.sleep_hours < 5 ? "bg-risk-critical" : 
                            astronaut.astronaut_profile.sleep_hours < 6 ? "bg-risk-high" : 
                            "bg-primary"
                          }`}
                          style={{ width: `${(astronaut.astronaut_profile.sleep_hours / 10) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-space-neutral mt-1">
                        <span>0</span>
                        <span>7</span>
                        <span>10</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-space-neutral">Stress Level</span>
                        <span className={`text-sm ${
                          astronaut.astronaut_profile.stress_level.value > 7 ? "text-risk-critical" : 
                          astronaut.astronaut_profile.stress_level.value > 5 ? "text-risk-high" : ""
                        }`}>
                          {astronaut.astronaut_profile.stress_level.value}/10
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            astronaut.astronaut_profile.stress_level.value > 7 ? "bg-risk-critical" : 
                            astronaut.astronaut_profile.stress_level.value > 5 ? "bg-risk-high" : 
                            "bg-primary"
                          }`}
                          style={{ width: `${astronaut.astronaut_profile.stress_level.value * 10}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-space-neutral mt-1">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Health Factors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">BMI</span>
                    <span className={`text-sm ${
                      astronaut.astronaut_profile.bmi.value > 30 ? "text-risk-critical" : 
                      astronaut.astronaut_profile.bmi.value > 25 ? "text-risk-high" : ""
                    }`}>
                      {astronaut.astronaut_profile.bmi.value} kg/m²
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Smoking Status</span>
                    <span className={`text-sm ${
                      astronaut.astronaut_profile.smoking.value === "Yes" ? "text-risk-high" : ""
                    }`}>
                      {astronaut.astronaut_profile.smoking.value}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Age</span>
                    <span className="text-sm">
                      {astronaut.astronaut_profile.age} years
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Heart Rate Trend (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <Plot
                    data={[
                      {
                        x: heartRateTrend.map(h => h.hour),
                        y: heartRateTrend.map(h => h.value),
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#33C3F0' },
                        name: 'Heart Rate',
                      },
                      {
                        x: heartRateTrend.map(h => h.hour),
                        y: Array(24).fill(80),
                        type: 'scatter',
                        mode: 'lines',
                        line: { color: '#FF851B', dash: 'dot' },
                        name: 'Upper Normal',
                      },
                      {
                        x: heartRateTrend.map(h => h.hour),
                        y: Array(24).fill(60),
                        type: 'scatter',
                        mode: 'lines',
                        line: { color: '#FF851B', dash: 'dot' },
                        name: 'Lower Normal',
                      }
                    ]}
                    layout={{
                      autosize: true,
                      margin: { l: 50, r: 30, t: 30, b: 50 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      font: { color: '#8E9196' },
                      xaxis: { title: 'Hour' },
                      yaxis: { title: 'BPM' },
                      legend: { orientation: "h", y: -0.2 }
                    }}
                    config={{ responsive: true }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Risk Level Probabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Plot
                      data={[
                        {
                          x: ['Low', 'Medium', 'High', 'Critical'],
                          y: riskProbabilities,
                          type: 'bar',
                          marker: {
                            color: ['#2ECC40', '#FFDC00', '#FF851B', '#FF4136']
                          }
                        }
                      ]}
                      layout={{
                        autosize: true,
                        margin: { l: 50, r: 20, t: 20, b: 40 },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#8E9196' },
                        yaxis: { 
                          title: 'Probability',
                          tickformat: ',.0%'
                        }
                      }}
                      config={{ responsive: true, displayModeBar: false }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Anomaly Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-4 ${
                        astronaut.anomaly_detection.is_anomaly ? "text-risk-critical" : "text-risk-low"
                      }`}>
                        {astronaut.anomaly_detection.is_anomaly ? "YES" : "NO"}
                      </div>
                      <div className="text-xl mb-2">Anomaly Detected</div>
                      <div className="text-space-neutral">
                        Score: {astronaut.anomaly_detection.anomaly_score.toFixed(2)}
                      </div>
                      <div className="text-xs text-space-neutral mt-2">
                        {astronaut.anomaly_detection.is_anomaly 
                          ? "Unusual patterns detected in vital signs" 
                          : "No unusual patterns detected"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Risk Factor Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Top Contributors to Risk Assessment</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">1. Heart Rate</span>
                      <span className={astronaut.astronaut_profile.heart_rate > 100 ? "text-risk-critical" : ""}>
                        {astronaut.astronaut_profile.heart_rate} bpm
                      </span>
                    </div>
                    <div className="h-4 w-full bg-secondary/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-risk-critical"
                        style={{ width: `${(astronaut.astronaut_profile.heart_rate / 100) * 70}%` }}
                      />
                    </div>
                    <p className="text-sm text-space-neutral mt-1">
                      {astronaut.clinical_insights.top_factors.factor_1}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">2. Blood Pressure</span>
                      <span className={astronaut.astronaut_profile.bp_systolic > 140 ? "text-risk-high" : ""}>
                        {astronaut.astronaut_profile.bp_systolic}/{astronaut.astronaut_profile.bp_diastolic} mmHg
                      </span>
                    </div>
                    <div className="h-4 w-full bg-secondary/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-risk-high"
                        style={{ width: `${(astronaut.astronaut_profile.bp_systolic / 150) * 60}%` }}
                      />
                    </div>
                    <p className="text-sm text-space-neutral mt-1">
                      {astronaut.clinical_insights.top_factors.factor_2}
                    </p>
                  </div>
                  
                  {astronaut.clinical_insights.top_factors.factor_3 && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">3. Stress Level</span>
                        <span className={astronaut.astronaut_profile.stress_level.value > 7 ? "text-risk-medium" : ""}>
                          {astronaut.astronaut_profile.stress_level.value}/10
                        </span>
                      </div>
                      <div className="h-4 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-risk-medium"
                          style={{ width: `${astronaut.astronaut_profile.stress_level.value * 5}%` }}
                        />
                      </div>
                      <p className="text-sm text-space-neutral mt-1">
                        {astronaut.clinical_insights.top_factors.factor_3}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Clinical Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Clinical Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Summary</h3>
                  <p className="text-space-neutral">{astronaut.clinical_insights.summary}</p>
                </div>
                
                {astronaut.clinical_insights.vitals_analysis && (
                  <div>
                    <h3 className="text-lg font-medium mb-1">Vitals Analysis</h3>
                    <p className="text-space-neutral">{astronaut.clinical_insights.vitals_analysis}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Immediate Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {Object.entries(astronaut.clinical_insights.immediate_actions).map(([key, value]) => (
                      <li key={key} className="border-l-2 border-primary pl-3">
                        <div className="font-medium capitalize">{key.replace(/_/g, ' ')}</div>
                        <p className="text-sm text-space-neutral">{value}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {astronaut.clinical_insights.countermeasures && (
                <Card className="space-card">
                  <CardHeader>
                    <CardTitle>Recommended Countermeasures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {Object.entries(astronaut.clinical_insights.countermeasures).map(([key, value]) => (
                        <li key={key} className="border-l-2 border-primary pl-3">
                          <div className="font-medium capitalize">{key.replace(/_/g, ' ')}</div>
                          <p className="text-sm text-space-neutral">{value}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Rule-Based Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {Object.entries(astronaut.rule_based_recommendations).map(([key, value]) => (
                    <li key={key} className="bg-secondary/20 p-3 rounded-md">
                      <div className="font-medium capitalize text-primary">{key.replace(/_/g, ' ')}</div>
                      <p className="text-sm">{value}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {astronaut.clinical_insights.long_term_monitoring && (
              <Card className="space-card">
                <CardHeader>
                  <CardTitle>Long-Term Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{astronaut.clinical_insights.long_term_monitoring}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-4">
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Medical Communications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/20 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
                  {chatHistory.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === "doctor" ? "justify-start" : message.sender === "system" ? "justify-center" : "justify-end"}`}
                    >
                      {message.sender === "system" ? (
                        <div className="bg-risk-critical/20 text-risk-critical rounded-lg py-2 px-4 max-w-[80%] text-sm">
                          {message.text}
                        </div>
                      ) : (
                        <div 
                          className={`${
                            message.sender === "doctor" ? "bg-secondary text-foreground" : "bg-primary/20 text-primary"
                          } rounded-lg py-2 px-4 max-w-[80%]`}
                        >
                          <div className="text-xs text-space-neutral mb-1">
                            {message.sender === "doctor" ? "Doctor" : "Astronaut"} • {message.timestamp.split(' ')[1]}
                          </div>
                          <div>{message.text}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Message input - only shown for doctor role */}
                {user?.role === "doctor" && (
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input 
                      placeholder="Type your message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-secondary/50 border-secondary/30"
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AstronautDetail;
