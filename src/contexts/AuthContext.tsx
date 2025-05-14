
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
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check for existing auth state on load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // If we have a firebase user, get the role from localStorage
        const roleData = localStorage.getItem(`role_${firebaseUser.uid}`);
        const role = roleData ? JSON.parse(roleData).role : "astronaut";
        const name = firebaseUser.displayName || 
                    (role === "doctor" ? "Dr. Elizabeth Harper" : "Alex Mitchell");
        
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: name,
          role: role as UserRole,
          ...(role === "astronaut" && { astronautId: "ast-001" })
        };
        
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      if (firebaseUser) {
        // Save role selection to localStorage keyed by user ID
        localStorage.setItem(`role_${firebaseUser.uid}`, JSON.stringify({ role }));
        
        // Create user data
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: firebaseUser.displayName || 
                (role === "doctor" ? "Dr. Elizabeth Harper" : "Alex Mitchell"),
          role,
          ...(role === "astronaut" && { astronautId: "ast-001" })
        };
        
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
    try {
      await signOut(auth);
      // When signing out, no need to remove role from localStorage
      // as it's keyed by user ID and will be inaccessible
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during logout");
    }
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
