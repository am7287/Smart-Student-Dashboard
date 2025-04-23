
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import GradeManagement from '../components/Teacher/GradeManagement';
import AuthGuard from '../components/Auth/AuthGuard';

const GradeManagementPage = () => {
  return (
    <AuthGuard allowedRoles={['teacher']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Grade Management" 
            subtitle="Update and review student grades"
          />
          
          <GradeManagement />
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default GradeManagementPage;
