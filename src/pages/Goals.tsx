
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import GoalSetting from '../components/Goals/GoalSetting';
import AuthGuard from '../components/Auth/AuthGuard';

const Goals = () => {
  return (
    <AuthGuard allowedRoles={['teacher', 'student']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Academic Goals" 
            subtitle="Set and track educational objectives"
          />
          
          <GoalSetting />
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default Goals;
