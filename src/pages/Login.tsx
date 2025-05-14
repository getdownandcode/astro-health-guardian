
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "astronaut">("doctor");
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // If user is already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && !isLoading && user) {
      console.log("Login page: User already authenticated as", user.role);
      
      // Get the intended destination from location state or use role-based default
      const from = location.state?.from?.pathname;
      
      if (from && from !== "/") {
        console.log("Redirecting to:", from);
        navigate(from);
      } else {
        // If no specific destination, route based on role
        if (user.role === "doctor") {
          console.log("Redirecting to earth dashboard");
          navigate("/earth-dashboard");
        } else {
          console.log("Redirecting to astronaut dashboard");
          navigate("/astronaut-dashboard");
        }
      }
    }
  }, [isAuthenticated, isLoading, navigate, user, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign up process
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Account created",
          description: "Your account has been created, please login now.",
        });
        setIsSignUp(false);
      } else {
        // Login process
        await login(email, password, role);
        toast({
          title: "Login successful",
          description: `Welcome back, ${role === "doctor" ? "Doctor" : "Astronaut"}!`,
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: isSignUp ? "Sign up failed" : "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  // If already loading (processing auth), show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-gradient">
        <div className="text-center">
          <div className="mb-4">Processing...</div>
          <p className="text-space-neutral">Verifying your credentials</p>
        </div>
      </div>
    );
  }

  // If already authenticated but still somehow on login page
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-gradient">
        <div className="text-center">
          <div className="mb-4">Already logged in</div>
          <p className="text-space-neutral">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-gradient p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Astronaut Health Monitoring System</h1>
          <p className="text-space-neutral">Advanced health analytics for space missions</p>
        </div>
        
        <Card className="space-card border-secondary/20">
          <CardHeader>
            <CardTitle>{isSignUp ? "Create Account" : "Sign In"}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? "Create a new account to access the health monitoring dashboard" 
                : "Access your health monitoring dashboard"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary/50 border-secondary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-secondary/50 border-secondary/30"
                />
              </div>
              
              {!isSignUp && (
                <div className="space-y-2">
                  <Label>Role</Label>
                  <RadioGroup 
                    value={role} 
                    onValueChange={(value) => setRole(value as "doctor" | "astronaut")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="doctor" id="doctor" />
                      <Label htmlFor="doctor">Doctor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="astronaut" id="astronaut" />
                      <Label htmlFor="astronaut">Astronaut</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading 
                  ? "Processing..." 
                  : (isSignUp ? "Create Account" : "Sign In")}
              </Button>
              
              <Button 
                type="button"
                variant="link" 
                className="w-full"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "Don't have an account? Sign up"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-space-neutral">
          <p>Demo credentials:</p>
          <p>Email: demo@space.med | Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
