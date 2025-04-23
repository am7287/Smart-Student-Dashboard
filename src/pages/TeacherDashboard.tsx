
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StudentList from '../components/Teacher/StudentList';
import PerformanceChart from '../components/Analytics/PerformanceChart';
import AuthGuard from '../components/Auth/AuthGuard';

const TeacherDashboard = () => {
  return (
    <AuthGuard allowedRoles={['teacher']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Teacher Dashboard" 
            subtitle="Monitor student performance and progress"
          />
          
          <PerformanceChart />
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Students</h2>
          <StudentList />
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default TeacherDashboard;
