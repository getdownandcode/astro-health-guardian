
import React, { createContext, useState, useContext, useEffect } from "react";

type UserRole = "doctor" | "astronaut";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  astronautId?: string; // Only for astronaut role
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user on load
  useEffect(() => {
    const storedUser = localStorage.getItem("astronaut-health-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would call Firebase Auth
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email && password) {
        // Mock user data
        const userData: User = {
          id: role === "doctor" ? "doc-001" : "ast-001",
          email,
          name: role === "doctor" ? "Dr. Elizabeth Harper" : "Alex Mitchell",
          role,
          ...(role === "astronaut" && { astronautId: "ast-001" })
        };
        
        // Save to local storage
        localStorage.setItem("astronaut-health-user", JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("astronaut-health-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
