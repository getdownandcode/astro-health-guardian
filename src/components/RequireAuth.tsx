
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

  // Use an effect with a timeout to prevent immediate redirects
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isLoading && (!isAuthenticated || (isAuthenticated && !isRoleAllowed()))) {
      // Set a small delay before redirecting to prevent rapid redirects
      timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 500);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, isAuthenticated, user]);

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

  if (shouldRedirect) {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    // If authenticated but wrong role, redirect to appropriate dashboard
    if (user && user.role === "doctor") {
      return <Navigate to="/earth-dashboard" replace />;
    } else if (user && user.role === "astronaut") {
      return <Navigate to="/astronaut-dashboard" replace />;
    }
  }

  // Either authenticated with correct role or waiting for the redirect timeout
  return isAuthenticated && isRoleAllowed() ? <>{children}</> : null;
};

export default RequireAuth;
