
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RiskBadge from "@/components/RiskBadge";
import Layout from "@/components/Layout";
import { getAstronauts } from "@/services/mockData";
import { AlertCircle, Search, User } from "lucide-react";

const Astronauts = () => {
  const navigate = useNavigate();
  const astronauts = getAstronauts();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [anomalyFilter, setAnomalyFilter] = useState("all");
  
  // Filter the astronauts
  const filteredAstronauts = astronauts.filter((astronaut) => {
    // Filter by search term
    const searchMatch = astronaut.astronaut_profile.name
      .toLowerCase()
      .includes(search.toLowerCase());
      
    // Filter by risk level
    const riskMatch = 
      riskFilter === "all" || 
      astronaut.prediction.risk_level === riskFilter;
      
    // Filter by anomaly status
    const anomalyMatch = 
      anomalyFilter === "all" || 
      (anomalyFilter === "yes" && astronaut.anomaly_detection.is_anomaly) ||
      (anomalyFilter === "no" && !astronaut.anomaly_detection.is_anomaly);
      
    return searchMatch && riskMatch && anomalyMatch;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Astronaut Profiles</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-space-neutral" />
            <Input
              placeholder="Search astronauts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/50 border-secondary/30"
            />
          </div>
          
          <div className="flex gap-4">
            <Select 
              value={riskFilter} 
              onValueChange={setRiskFilter}
            >
              <SelectTrigger className="w-[150px] bg-secondary/50 border-secondary/30">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={anomalyFilter} 
              onValueChange={setAnomalyFilter}
            >
              <SelectTrigger className="w-[180px] bg-secondary/50 border-secondary/30">
                <SelectValue placeholder="Anomaly Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="yes">Anomaly Detected</SelectItem>
                <SelectItem value="no">No Anomaly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Astronaut Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAstronauts.length > 0 ? (
            filteredAstronauts.map((astronaut) => (
              <Card 
                key={astronaut.astronaut_profile.id} 
                className="space-card hover:bg-card/70 cursor-pointer transition-colors"
                onClick={() => navigate(`/astronaut/${astronaut.astronaut_profile.id}`)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{astronaut.astronaut_profile.name}</CardTitle>
                        <div className="text-xs text-space-neutral">
                          ID: {astronaut.astronaut_profile.id}
                        </div>
                      </div>
                    </div>
                    <RiskBadge 
                      risk={astronaut.prediction.risk_level} 
                      animate={astronaut.prediction.risk_level === "Critical"}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-space-neutral">Age</div>
                      <div className="text-sm">
                        {astronaut.astronaut_profile.age}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-space-neutral">Gender</div>
                      <div className="text-sm">
                        {astronaut.astronaut_profile.gender}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-space-neutral">Heart Rate</div>
                      <div className={`text-sm ${
                        astronaut.astronaut_profile.heart_rate > 100 ? "text-risk-critical" : 
                        astronaut.astronaut_profile.heart_rate > 90 ? "text-risk-high" : ""
                      }`}>
                        {astronaut.astronaut_profile.heart_rate} bpm
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-space-neutral">Blood Pressure</div>
                      <div className={`text-sm ${
                        astronaut.astronaut_profile.bp_systolic > 140 ? "text-risk-critical" : 
                        astronaut.astronaut_profile.bp_systolic > 130 ? "text-risk-high" : ""
                      }`}>
                        {astronaut.astronaut_profile.bp_systolic}/{astronaut.astronaut_profile.bp_diastolic}
                      </div>
                    </div>
                  </div>

                  {astronaut.anomaly_detection.is_anomaly && (
                    <div className="text-xs px-2 py-1 bg-risk-critical/10 text-risk-critical rounded flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Anomaly Detected
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                  >
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 py-8 text-center">
              <p className="text-space-neutral">No astronauts match the selected filters</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearch("");
                  setRiskFilter("all");
                  setAnomalyFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Astronauts;
