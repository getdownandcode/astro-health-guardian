
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { getAstronauts, getChatHistory } from "@/services/mockData";
import { AlertCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RiskBadge from "@/components/RiskBadge";

const Chat = () => {
  const { toast } = useToast();
  const astronauts = getAstronauts();
  const [activeAstronaut, setActiveAstronaut] = useState(astronauts[0]?.astronaut_profile.id || "");
  const [message, setMessage] = useState("");
  
  const chatHistory = activeAstronaut ? getChatHistory(activeAstronaut) : [];
  const currentAstronaut = astronauts.find(a => a.astronaut_profile.id === activeAstronaut);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been delivered to the astronaut."
    });
    
    setMessage("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Medical Communications</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Astronaut List - Left Side */}
          <Card className="space-card md:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Astronauts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {astronauts.map((astronaut) => (
                  <button
                    key={astronaut.astronaut_profile.id}
                    className={`w-full text-left px-4 py-3 flex justify-between items-center hover:bg-secondary/30 transition-colors ${
                      activeAstronaut === astronaut.astronaut_profile.id ? "bg-secondary/50" : ""
                    }`}
                    onClick={() => setActiveAstronaut(astronaut.astronaut_profile.id)}
                  >
                    <div>
                      <div className="font-medium">{astronaut.astronaut_profile.name}</div>
                      <div className="text-xs text-space-neutral">ID: {astronaut.astronaut_profile.id}</div>
                    </div>
                    <div className="flex items-center">
                      <RiskBadge risk={astronaut.prediction.risk_level} />
                      {astronaut.anomaly_detection.is_anomaly && (
                        <AlertCircle className="h-4 w-4 text-risk-critical ml-2" />
                      )}
                    </div>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
          
          {/* Chat Area - Right Side */}
          <Card className="space-card md:col-span-3">
            {currentAstronaut ? (
              <>
                <CardHeader className="border-b border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{currentAstronaut.astronaut_profile.name}</CardTitle>
                      <div className="text-xs text-space-neutral">
                        {currentAstronaut.astronaut_profile.age} years • {currentAstronaut.astronaut_profile.gender} • 
                        Risk Level: {currentAstronaut.prediction.risk_level}
                      </div>
                    </div>
                    {currentAstronaut.anomaly_detection.is_anomaly && (
                      <div className="flex items-center space-x-1 bg-risk-critical/10 text-risk-critical px-2 py-1 rounded text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>Anomaly Detected</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <Tabs defaultValue="chat" className="flex flex-col h-full">
                  <div className="px-4 pt-2 border-b border-border">
                    <TabsList>
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="vitals">Vitals</TabsTrigger>
                      <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="chat" className="flex-1 flex flex-col p-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    
                    <div className="p-4 border-t border-border">
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
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vitals" className="p-4 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <div className="text-xs text-space-neutral">Heart Rate</div>
                        <div className={`text-lg font-medium ${
                          currentAstronaut.astronaut_profile.heart_rate > 100 ? "text-risk-critical" : 
                          currentAstronaut.astronaut_profile.heart_rate > 90 ? "text-risk-high" : ""
                        }`}>
                          {currentAstronaut.astronaut_profile.heart_rate} bpm
                        </div>
                        <div className="text-xs text-space-neutral">Normal: 60-80 bpm</div>
                      </div>
                      
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <div className="text-xs text-space-neutral">Blood Pressure</div>
                        <div className={`text-lg font-medium ${
                          currentAstronaut.astronaut_profile.bp_systolic > 140 ? "text-risk-critical" : 
                          currentAstronaut.astronaut_profile.bp_systolic > 130 ? "text-risk-high" : ""
                        }`}>
                          {currentAstronaut.astronaut_profile.bp_systolic}/{currentAstronaut.astronaut_profile.bp_diastolic} mmHg
                        </div>
                        <div className="text-xs text-space-neutral">Normal: 120/80 mmHg</div>
                      </div>
                      
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <div className="text-xs text-space-neutral">SpO₂</div>
                        <div className={`text-lg font-medium ${
                          currentAstronaut.astronaut_profile.spo2 < 95 ? "text-risk-critical" : 
                          currentAstronaut.astronaut_profile.spo2 < 97 ? "text-risk-high" : ""
                        }`}>
                          {currentAstronaut.astronaut_profile.spo2}%
                        </div>
                        <div className="text-xs text-space-neutral">Normal: 95-100%</div>
                      </div>
                      
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <div className="text-xs text-space-neutral">Body Temperature</div>
                        <div className="text-lg font-medium">
                          {currentAstronaut.astronaut_profile.body_temp}°C
                        </div>
                        <div className="text-xs text-space-neutral">Normal: 36.1-37.2°C</div>
                      </div>
                      
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <div className="text-xs text-space-neutral">Sleep Hours</div>
                        <div className={`text-lg font-medium ${
                          currentAstronaut.astronaut_profile.sleep_hours < 5 ? "text-risk-critical" : 
                          currentAstronaut.astronaut_profile.sleep_hours < 6 ? "text-risk-high" : ""
                        }`}>
                          {currentAstronaut.astronaut_profile.sleep_hours} hrs
                        </div>
                        <div className="text-xs text-space-neutral">Normal: 7-9 hrs</div>
                      </div>
                      
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <div className="text-xs text-space-neutral">Stress Level</div>
                        <div className={`text-lg font-medium ${
                          currentAstronaut.astronaut_profile.stress_level.value > 7 ? "text-risk-critical" : 
                          currentAstronaut.astronaut_profile.stress_level.value > 5 ? "text-risk-high" : ""
                        }`}>
                          {currentAstronaut.astronaut_profile.stress_level.value}/10
                        </div>
                        <div className="text-xs text-space-neutral">Normal: 0-4</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="p-4 space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-space-neutral">Clinical Summary</h3>
                        <p>{currentAstronaut.clinical_insights.summary}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-space-neutral">Top Factors</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>{currentAstronaut.clinical_insights.top_factors.factor_1}</li>
                          <li>{currentAstronaut.clinical_insights.top_factors.factor_2}</li>
                          {currentAstronaut.clinical_insights.top_factors.factor_3 && (
                            <li>{currentAstronaut.clinical_insights.top_factors.factor_3}</li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-space-neutral">Recommendations</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {Object.entries(currentAstronaut.rule_based_recommendations).map(([key, value]) => (
                            <li key={key}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <CardContent className="py-10 text-center">
                <p>Select an astronaut to start communication</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
