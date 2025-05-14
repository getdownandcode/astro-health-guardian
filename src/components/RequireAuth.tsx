
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Use an effect with a timeout to prevent immediate redirects
  // This solves the "bouncing" between pages issue
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isLoading && !isAuthenticated) {
      // Set a small delay before redirecting to prevent rapid redirects
      timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 500);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, isAuthenticated]);

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

  if (!isAuthenticated && shouldRedirect) {
    // Redirect to login page with the return url
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Either authenticated or waiting for the redirect timeout
  return isAuthenticated ? <>{children}</> : null;
};

export default RequireAuth;
