import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, GraduationCap, Users, Settings, Calendar, User } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string>('');
  
  const teacherNavigation = [
    { title: "Dashboard", icon: Users, url: "/teacher-dashboard" },
    { title: "Analytics", icon: BarChart3, url: "/analytics" },
    { title: "Grades", icon: GraduationCap, url: "/grade-management" },
    { title: "Goals", icon: Settings, url: "/goals" },
    { title: "Calendar", icon: Calendar, url: "/calendar" },
  ];
  
  const parentNavigation = [
    { title: "Portal", icon: User, url: "/parent-portal" },
    { title: "Calendar", icon: Calendar, url: "/calendar" },
  ];
  
  const studentNavigation = [
    { title: "Dashboard", icon: User, url: "/student-dashboard" },
    { title: "Goals", icon: Settings, url: "/goals" },
    { title: "Calendar", icon: Calendar, url: "/calendar" },
  ];
  
  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  
  const navigationItems = 
    userRole === 'teacher' ? teacherNavigation : 
    userRole === 'parent' ? parentNavigation :
    userRole === 'student' ? studentNavigation :
    [];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-900 flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Student Tracker</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.url} 
                          className={`flex items-center gap-3 ${
                            location.pathname === item.url ? 'text-purple-400' : ''
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
