
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [anomalyThreshold, setAnomalyThreshold] = useState([-0.5]);
  const [refreshRate, setRefreshRate] = useState("30");
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully."
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Alert Notifications</CardTitle>
                <CardDescription>Configure how you receive alerts about astronaut health status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <div className="text-xs text-space-neutral">Receive alerts via email</div>
                  </div>
                  <Switch 
                    id="email-alerts" 
                    checked={emailAlerts} 
                    onCheckedChange={setEmailAlerts}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <div className="text-xs text-space-neutral">Receive alerts via text message</div>
                  </div>
                  <Switch 
                    id="sms-alerts" 
                    checked={smsAlerts} 
                    onCheckedChange={setSmsAlerts}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alert-priority">Alert Priority</Label>
                  <Select defaultValue="critical">
                    <SelectTrigger id="alert-priority" className="bg-secondary/50 border-secondary/30">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="critical">Critical Only</SelectItem>
                      <SelectItem value="high-critical">High & Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-space-neutral">Choose which risk levels trigger notifications</div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input 
                    id="notification-email" 
                    type="email" 
                    placeholder="Enter your email"
                    defaultValue="medical@space.station"
                    className="bg-secondary/50 border-secondary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-phone">Notification Phone</Label>
                  <Input 
                    id="notification-phone" 
                    type="tel" 
                    placeholder="Enter your phone number"
                    className="bg-secondary/50 border-secondary/30"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>Customize the appearance and behavior of alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-alerts">Sound Alerts</Label>
                    <div className="text-xs text-space-neutral">Play sound when new alerts arrive</div>
                  </div>
                  <Switch id="sound-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                    <div className="text-xs text-space-neutral">Show browser notifications</div>
                  </div>
                  <Switch id="desktop-notifications" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Alert Timeout</Label>
                    <span className="text-xs text-space-neutral">30 seconds</span>
                  </div>
                  <Slider defaultValue={[30]} max={60} step={5} />
                  <div className="text-xs text-space-neutral">How long alerts stay on screen</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="thresholds" className="space-y-4">
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Detection Thresholds</CardTitle>
                <CardDescription>Configure sensitivity of anomaly detection and risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Anomaly Detection Threshold</Label>
                    <span className="text-xs text-space-neutral">{anomalyThreshold[0]}</span>
                  </div>
                  <Slider 
                    value={anomalyThreshold}
                    onValueChange={setAnomalyThreshold}
                    min={-1}
                    max={0}
                    step={0.1}
                  />
                  <div className="text-xs text-space-neutral">
                    Lower values (-1.0) are more sensitive, higher values (0) require stronger anomalies to trigger
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heart-rate-threshold">Heart Rate Alert Threshold</Label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Slider defaultValue={[100]} min={80} max={130} step={5} />
                    </div>
                    <div className="w-16 text-center">100 bpm</div>
                  </div>
                  <div className="text-xs text-space-neutral">
                    Alert when heart rate exceeds this value
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bp-systolic-threshold">Systolic BP Alert Threshold</Label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Slider defaultValue={[140]} min={120} max={180} step={5} />
                    </div>
                    <div className="w-16 text-center">140 mmHg</div>
                  </div>
                  <div className="text-xs text-space-neutral">
                    Alert when systolic blood pressure exceeds this value
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="spo2-threshold">SpO₂ Alert Threshold</Label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Slider defaultValue={[95]} min={90} max={100} step={1} />
                    </div>
                    <div className="w-16 text-center">95%</div>
                  </div>
                  <div className="text-xs text-space-neutral">
                    Alert when oxygen saturation falls below this value
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    defaultValue="Dr. Elizabeth Harper"
                    className="bg-secondary/50 border-secondary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="elizabeth.harper@space.med"
                    className="bg-secondary/50 border-secondary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="doctor">
                    <SelectTrigger id="role" className="bg-secondary/50 border-secondary/30">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Medical Doctor</SelectItem>
                      <SelectItem value="nurse">Medical Nurse</SelectItem>
                      <SelectItem value="technician">Medical Technician</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button>Update Account Information</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter your current password"
                    className="bg-secondary/50 border-secondary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter your new password"
                    className="bg-secondary/50 border-secondary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm your new password"
                    className="bg-secondary/50 border-secondary/30"
                  />
                </div>
                
                <div className="pt-4">
                  <Button>Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <Card className="space-card">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="refresh-rate">Data Refresh Rate</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="refresh-rate" 
                      type="number" 
                      value={refreshRate}
                      onChange={(e) => setRefreshRate(e.target.value)}
                      min="5"
                      max="300"
                      className="w-20 bg-secondary/50 border-secondary/30"
                    />
                    <span>seconds</span>
                  </div>
                  <div className="text-xs text-space-neutral">
                    How often to refresh astronaut health data (5-300 seconds)
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="data-retention" className="bg-secondary/50 border-secondary/30">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-space-neutral">
                    How long to keep detailed health data records
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <div className="text-xs text-space-neutral">Use dark theme for the application</div>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-logout">Automatic Logout</Label>
                    <div className="text-xs text-space-neutral">Log out after 30 minutes of inactivity</div>
                  </div>
                  <Switch id="auto-logout" defaultChecked />
                </div>
              </CardContent>
            </Card>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
                <CardDescription>Check the status of system connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Database Connection</div>
                      <div className="text-xs text-space-neutral">PostgreSQL Database</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-risk-low"></div>
                      <span className="text-sm">Connected</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Authentication Service</div>
                      <div className="text-xs text-space-neutral">Firebase Authentication</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-risk-low"></div>
                      <span className="text-sm">Connected</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ML Model Service</div>
                      <div className="text-xs text-space-neutral">Random Forest & Isolation Forest</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-risk-low"></div>
                      <span className="text-sm">Connected</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" onClick={handleSave}>
                      <BellRing className="h-4 w-4 mr-2" />
                      Test Notifications
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
