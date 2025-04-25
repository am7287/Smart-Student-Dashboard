import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StudentDetailsCard from '../components/StudentDetailsCard';
import AuthGuard from '../components/Auth/AuthGuard';

const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    subjects: [
      { name: "Mathematics", progress: 78, score: 82, grade: "B+" },
      { name: "Physics", progress: 65, score: 70, grade: "B-" },
      { name: "Chemistry", progress: 92, score: 94, grade: "A" }
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
      { name: "Mathematics", progress: 85, score: 88, grade: "B+" },
      { name: "Physics", progress: 72, score: 75, grade: "C+" },
      { name: "Chemistry", progress: 88, score: 90, grade: "A-" }
    ],
    assignments: [
      {
        title: "Chemistry Quiz Prep",
        subject: "Chemistry",
        due: "Friday",
        status: "pending"
      }
    ]
  },
  {
    id: 3,
    name: "Carol White",
    subjects: [
      { name: "Mathematics", progress: 92, score: 95, grade: "A" },
      { name: "Physics", progress: 88, score: 89, grade: "B+" },
      { name: "Chemistry", progress: 95, score: 96, grade: "A+" }
    ],
    assignments: [
      {
        title: "Physics Problem Set",
        subject: "Physics",
        due: "Wednesday",
        status: "pending"
      }
    ]
  },
  {
    id: 4,
    name: "David Brown",
    subjects: [
      { name: "Mathematics", progress: 68, score: 72, grade: "C+" },
      { name: "Physics", progress: 75, score: 78, grade: "C+" },
      { name: "Chemistry", progress: 83, score: 86, grade: "B" }
    ],
    assignments: [
      {
        title: "Chemistry Lab Work",
        subject: "Chemistry",
        due: "Friday",
        status: "pending"
      }
    ]
  },
  {
    id: 5,
    name: "Emma Davis",
    subjects: [
      { name: "Mathematics", progress: 95, score: 97, grade: "A+" },
      { name: "Physics", progress: 90, score: 92, grade: "A-" },
      { name: "Chemistry", progress: 94, score: 95, grade: "A" }
    ],
    assignments: [
      {
        title: "Advanced Math Problems",
        subject: "Mathematics",
        due: "Next Tuesday",
        status: "completed"
      }
    ]
  },
  {
    id: 6,
    name: "Frank Miller",
    subjects: [
      { name: "Mathematics", progress: 76, score: 79, grade: "C+" },
      { name: "Physics", progress: 62, score: 65, grade: "D" },
      { name: "Chemistry", progress: 71, score: 74, grade: "C" }
    ],
    assignments: [
      {
        title: "Physics Remedial Work",
        subject: "Physics",
        due: "Tomorrow",
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
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default StudentDashboard;
