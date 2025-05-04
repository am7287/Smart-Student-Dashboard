
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StudentList from '../components/Teacher/StudentList';
import AuthGuard from '../components/Auth/AuthGuard';

const TeacherDashboard = () => {
  return (
    <AuthGuard allowedRoles={['teacher']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Smart Student Dashboard" 
            subtitle="Monitor student performance and progress"
          />
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Students Overview</h2>
            <p className="text-slate-400">View student information, academic performance, and personalized improvement suggestions.</p>
          </div>
          
          <StudentList />
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default TeacherDashboard;
