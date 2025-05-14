
import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "@/lib/firebase";

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
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check for existing auth state on load
  useEffect(() => {
    console.log("Setting up Firebase auth listener");
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Firebase auth state changed:", firebaseUser ? "User logged in" : "No user");
      
      if (firebaseUser) {
        // If we have a firebase user, get the role from localStorage
        const roleData = localStorage.getItem(`role_${firebaseUser.uid}`);
        console.log("Retrieved role data:", roleData);
        
        let role: UserRole = "astronaut"; // Default role
        
        if (roleData) {
          try {
            const parsedData = JSON.parse(roleData);
            role = parsedData.role;
            console.log("Parsed role:", role);
          } catch (e) {
            console.error("Error parsing role data:", e);
          }
        }
        
        const name = firebaseUser.displayName || 
                    (role === "doctor" ? "Dr. Elizabeth Harper" : "Alex Mitchell");
        
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: name,
          role: role,
          ...(role === "astronaut" && { astronautId: "ast-001" })
        };
        
        console.log("Setting user data:", userData);
        setUser(userData);
      } else {
        console.log("Clearing user data");
        setUser(null);
      }
      
      setIsLoading(false);
    });
    
    return () => {
      console.log("Cleaning up Firebase auth listener");
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    console.log(`Attempting login with email: ${email}, role: ${role}`);
    setIsLoading(true);
    setError(null);
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      if (firebaseUser) {
        console.log("Login successful, user ID:", firebaseUser.uid);
        
        // Save role selection to localStorage keyed by user ID
        localStorage.setItem(`role_${firebaseUser.uid}`, JSON.stringify({ role }));
        console.log("Role saved to localStorage");
        
        // Create user data
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: firebaseUser.displayName || 
                (role === "doctor" ? "Dr. Elizabeth Harper" : "Alex Mitchell"),
          role,
          ...(role === "astronaut" && { astronautId: "ast-001" })
        };
        
        console.log("Setting user data after login:", userData);
        setUser(userData);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log("Attempting logout");
    setIsLoading(true);
    
    try {
      await signOut(auth);
      console.log("Logout successful");
      // When signing out, no need to remove role from localStorage
      // as it's keyed by user ID and will be inaccessible
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during logout");
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error
  };

  console.log("Auth context state:", {
    isAuthenticated: !!user,
    isLoading,
    userRole: user?.role || 'none'
  });

  return (
    <AuthContext.Provider value={contextValue}>
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
