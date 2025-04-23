
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AuthGuard from '../components/Auth/AuthGuard';

// Mock student data
const STUDENT_DATA = {
  name: "Alice Johnson",
  grade: "10th Grade",
  subjects: [
    { name: "Mathematics", grade: "A-", progress: 92, recent: 88 },
    { name: "Physics", grade: "B+", progress: 85, recent: 90 },
    { name: "English", grade: "A", progress: 95, recent: 92 },
    { name: "History", grade: "B", progress: 82, recent: 78 },
  ],
  assignments: [
    { title: "Math Problem Set", subject: "Mathematics", due: "Tomorrow", status: "pending" },
    { title: "Physics Lab Report", subject: "Physics", due: "April 18", status: "pending" },
    { title: "English Essay", subject: "English", due: "April 25", status: "pending" },
    { title: "History Research", subject: "History", due: "April 22", status: "completed" },
  ]
};

const StudentDashboard = () => {
  return (
    <AuthGuard allowedRoles={['student']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Student Dashboard" 
            subtitle="Track your academic progress and assignments"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-800 text-white border-slate-700">
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {STUDENT_DATA.subjects.map((subject, index) => (
                      <div key={index} className="p-4 border border-slate-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-medium">{subject.name}</h3>
                            <p className="text-sm text-slate-400">Current Grade: {subject.grade}</p>
                          </div>
                          <span className="text-lg font-bold">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                          <span>Recent Test: {subject.recent}%</span>
                          <span>Overall: {subject.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="bg-slate-800 text-white border-slate-700">
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {STUDENT_DATA.assignments.map((assignment, index) => (
                      <div key={index} className={`p-3 rounded-md border ${
                        assignment.status === 'completed' 
                          ? 'border-green-500/30 bg-green-500/10' 
                          : 'border-slate-700'
                        }`}
                      >
                        <h4 className="font-medium">{assignment.title}</h4>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-slate-400">{assignment.subject}</span>
                          <span className={`${
                            assignment.due === 'Tomorrow' 
                              ? 'text-red-400' 
                              : 'text-slate-400'
                            }`}
                          >
                            Due: {assignment.due}
                          </span>
                        </div>
                        {assignment.status === 'completed' && (
                          <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default StudentDashboard;
