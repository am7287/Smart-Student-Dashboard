
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import CalendarView from '../components/Calendar/CalendarView';
import AuthGuard from '../components/Auth/AuthGuard';

const CalendarPage = () => {
  return (
    <AuthGuard allowedRoles={['teacher', 'parent', 'student']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Academic Calendar" 
            subtitle="View upcoming assignments and events"
          />
          
          <CalendarView />
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default CalendarPage;
