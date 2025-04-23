
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import PerformanceChart from '../components/Analytics/PerformanceChart';
import RiskAssessment from '../components/Analytics/RiskAssessment';
import AuthGuard from '../components/Auth/AuthGuard';

const Analytics = () => {
  return (
    <AuthGuard allowedRoles={['teacher']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Analytics" 
            subtitle="Class performance insights and risk assessment"
          />
          
          <PerformanceChart />
          
          <div className="mt-8">
            <RiskAssessment />
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default Analytics;
