
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import MessageCenter from '../components/Messages/MessageCenter';
import AuthGuard from '../components/Auth/AuthGuard';

const Messages = () => {
  return (
    <AuthGuard allowedRoles={['teacher', 'parent', 'student']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Messages" 
            subtitle="Communicate with teachers, parents, and students"
          />
          
          <MessageCenter />
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default Messages;
