
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EarthDashboard from "./pages/EarthDashboard";
import AstronautDashboard from "./pages/AstronautDashboard";
import AstronautDetail from "./pages/AstronautDetail";
import Astronauts from "./pages/Astronauts";
import Alerts from "./pages/Alerts";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public route - Login */}
            <Route path="/" element={<Login />} />
            
            {/* Legacy dashboard - will redirect based on role */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            
            {/* Earth-side (Doctor) routes */}
            <Route path="/earth-dashboard" element={
              <RequireAuth allowedRoles={["doctor"]}>
                <EarthDashboard />
              </RequireAuth>
            } />
            
            {/* Astronaut-side routes */}
            <Route path="/astronaut-dashboard" element={
              <RequireAuth allowedRoles={["astronaut"]}>
                <AstronautDashboard />
              </RequireAuth>
            } />
            
            {/* Common routes with role-based access */}
            <Route path="/astronaut/:id" element={
              <RequireAuth>
                <AstronautDetail />
              </RequireAuth>
            } />
            <Route path="/astronauts" element={
              <RequireAuth allowedRoles={["doctor"]}>
                <Astronauts />
              </RequireAuth>
            } />
            <Route path="/alerts" element={
              <RequireAuth>
                <Alerts />
              </RequireAuth>
            } />
            <Route path="/chat" element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            } />
            <Route path="/settings" element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
