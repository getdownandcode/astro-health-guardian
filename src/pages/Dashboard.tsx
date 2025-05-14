
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect based on user role with proper checks
  useEffect(() => {
    // Only redirect if authentication is complete and user exists
    if (!isLoading && isAuthenticated && user) {
      console.log("Dashboard redirect - User role:", user.role);
      if (user.role === "doctor") {
        navigate("/earth-dashboard", { replace: true });
      } else if (user.role === "astronaut") {
        navigate("/astronaut-dashboard", { replace: true });
      }
    }
  }, [user, navigate, isAuthenticated, isLoading]);

  // Show different loading message while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-gradient">
      <div className="text-center">
        <div className="mb-4">Preparing Your Dashboard</div>
        <p className="text-space-neutral">
          {isLoading ? "Loading your profile..." : "Redirecting to your personalized dashboard..."}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
