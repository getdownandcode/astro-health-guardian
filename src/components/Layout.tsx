
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  MessageCircle, 
  Settings, 
  LogOut, 
  AlertCircle, 
  User 
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-space-gradient">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-border shadow-lg shadow-black/30">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-lg font-bold text-primary">Health Monitor</h1>
          <p className="text-xs text-space-neutral">Space Medical System</p>
        </div>
        
        <div className="py-4">
          <div className="px-4 py-2 text-xs uppercase text-space-neutral">Navigation</div>
          
          <nav className="space-y-1 px-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate("/dashboard")}
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate("/astronauts")}
            >
              <Users className="h-4 w-4 mr-2" />
              Astronauts
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate("/alerts")}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate("/chat")}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Communications
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-space-neutral capitalize">{user?.role || "Unknown"}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full text-sm justify-start" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 h-screen overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
