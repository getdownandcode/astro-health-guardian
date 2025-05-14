
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: Array<"doctor" | "astronaut">;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Check if user role is allowed for this route
  const isRoleAllowed = () => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return user && allowedRoles.includes(user.role);
  };

  // Use an effect with a longer timeout to prevent rapid redirects
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Only set redirect if not loading and either not authenticated or wrong role
    if (!isLoading && (!isAuthenticated || (isAuthenticated && !isRoleAllowed()))) {
      // Increase timeout to prevent rapid redirects
      timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 1000); // Increased from 500ms to 1000ms
    } else {
      // If authenticated with correct role, ensure we're not redirecting
      setShouldRedirect(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, isAuthenticated, user, allowedRoles]);

  // Display loading state when authentication is in progress
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-gradient">
        <div className="text-center">
          <div className="mb-4">Loading...</div>
          <p className="text-space-neutral">Authenticating your session</p>
        </div>
      </div>
    );
  }

  // Handle redirect cases
  if (shouldRedirect) {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    // If authenticated but wrong role, redirect to appropriate dashboard
    if (user) {
      console.log(`User role: ${user.role}, allowedRoles:`, allowedRoles);
      if (user.role === "doctor" && (!allowedRoles || !allowedRoles.includes("doctor"))) {
        console.log("Doctor user redirecting to earth dashboard");
        return <Navigate to="/earth-dashboard" replace />;
      } else if (user.role === "astronaut" && (!allowedRoles || !allowedRoles.includes("astronaut"))) {
        console.log("Astronaut user redirecting to astronaut dashboard");
        return <Navigate to="/astronaut-dashboard" replace />;
      }
    }
  }

  // Either authenticated with correct role or waiting for the redirect timeout
  return isAuthenticated && isRoleAllowed() ? <>{children}</> : null;
};

export default RequireAuth;
