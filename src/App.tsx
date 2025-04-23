
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import GradeManagement from "./pages/GradeManagement";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import ParentPortal from "./pages/ParentPortal";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/grade-management" element={<GradeManagement />} />
          <Route path="/goals" element={<Goals />} />
          
          {/* Parent Routes */}
          <Route path="/parent-portal" element={<ParentPortal />} />
          
          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          
          {/* Shared Routes */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/messages" element={<Messages />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
