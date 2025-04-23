
import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StudentCard from '../components/StudentCard';
import AuthGuard from '../components/Auth/AuthGuard';

// Mock data for child's performance
const CHILD_DATA = {
  name: "Emma Smith",
  grade: "10th Grade",
  subjects: [
    { name: "Mathematics", grade: "B+", progress: 85 },
    { name: "Science", grade: "A-", progress: 92 },
    { name: "English", grade: "B", progress: 83 },
    { name: "History", grade: "C+", progress: 78 },
  ],
  attendance: "92%",
  upcoming: [
    { title: "Math Quiz", date: "April 15" },
    { title: "Science Project", date: "April 18" },
    { title: "English Essay", date: "April 25" },
  ]
};

const ParentPortal = () => {
  return (
    <AuthGuard allowedRoles={['parent']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Parent Portal" 
            subtitle={`Monitor ${CHILD_DATA.name}'s academic progress`}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 text-white border-slate-700">
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {CHILD_DATA.subjects.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-medium">{subject.name}</h3>
                            <p className="text-sm text-slate-400">Current Grade: {subject.grade}</p>
                          </div>
                          <span className="text-lg font-bold">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="bg-slate-800 text-white border-slate-700 mb-6">
                <CardHeader>
                  <CardTitle>Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{CHILD_DATA.attendance}</span>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#334155" strokeWidth="2"></circle>
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          stroke="#7C3AED" 
                          strokeWidth="2" 
                          strokeDasharray={`${92} ${100 - 92}`}
                          strokeDashoffset="25"
                        ></circle>
                      </svg>
                    </div>
                    <p className="text-center text-slate-400 text-sm">
                      Attendance rate for current semester
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 text-white border-slate-700">
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {CHILD_DATA.upcoming.map((item, index) => (
                      <li key={index} className="flex justify-between p-2 border-b border-slate-700 last:border-0">
                        <span>{item.title}</span>
                        <span className="text-slate-400">{item.date}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default ParentPortal;
