
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect based on user role
  useEffect(() => {
    if (user) {
      if (user.role === "doctor") {
        navigate("/earth-dashboard", { replace: true });
      } else if (user.role === "astronaut") {
        navigate("/astronaut-dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-gradient">
      <div className="text-center">
        <div className="mb-4">Redirecting...</div>
        <p className="text-space-neutral">Please wait while we prepare your dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;
