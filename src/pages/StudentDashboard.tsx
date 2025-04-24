import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StudentDetailsCard from '../components/StudentDetailsCard';
import { GoalsSection } from '../components/Goals/GoalsSection';
import AuthGuard from '../components/Auth/AuthGuard';

const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    subjects: [
      { name: "Mathematics", progress: 78 },
      { name: "Physics", progress: 65 },
      { name: "Chemistry", progress: 92 }
    ],
    assignments: [
      {
        title: "Math Homework: Algebra",
        subject: "Mathematics",
        due: "Tomorrow",
        status: "pending"
      },
      {
        title: "Physics Lab Report",
        subject: "Physics",
        due: "Next Week",
        status: "pending"
      }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    subjects: [
      { name: "Mathematics", progress: 85 },
      { name: "Physics", progress: 72 },
      { name: "Chemistry", progress: 88 }
    ],
    assignments: [
      {
        title: "Chemistry Quiz Prep",
        subject: "Chemistry",
        due: "Friday",
        status: "pending"
      },
      {
        title: "Math Assignment",
        subject: "Mathematics",
        due: "Next Monday",
        status: "completed"
      }
    ]
  },
  {
    id: 3,
    name: "Carol White",
    subjects: [
      { name: "Mathematics", progress: 92 },
      { name: "Physics", progress: 88 },
      { name: "Chemistry", progress: 95 }
    ],
    assignments: [
      {
        title: "Physics Problem Set",
        subject: "Physics",
        due: "Wednesday",
        status: "pending"
      }
    ]
  }
];

const StudentDashboard = () => {
  return (
    <AuthGuard allowedRoles={['student']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Student Dashboard" 
            subtitle="Track your academic progress and assignments"
          />
          
          <div className="grid grid-cols-1 gap-6">
            {mockStudents.map((student) => (
              <StudentDetailsCard key={student.id} student={student} />
            ))}
          </div>

          <GoalsSection />
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default StudentDashboard;
