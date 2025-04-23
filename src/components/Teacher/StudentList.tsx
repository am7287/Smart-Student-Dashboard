
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock student data
const MOCK_STUDENTS = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    course: "Mathematics", 
    progress: 78, 
    grade: "A-",
    attendance: "95%", 
    risk: "low" 
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    course: "Physics", 
    progress: 65, 
    grade: "B+",
    attendance: "88%", 
    risk: "medium" 
  },
  { 
    id: 3, 
    name: "Carol White", 
    course: "Chemistry", 
    progress: 92, 
    grade: "A",
    attendance: "98%", 
    risk: "low" 
  },
  { 
    id: 4, 
    name: "David Brown", 
    course: "Biology", 
    progress: 85, 
    grade: "A-",
    attendance: "92%", 
    risk: "low" 
  },
  { 
    id: 5, 
    name: "Emma Davis", 
    course: "History", 
    progress: 45, 
    grade: "C",
    attendance: "78%", 
    risk: "high" 
  },
  { 
    id: 6, 
    name: "Frank Miller", 
    course: "English", 
    progress: 72, 
    grade: "B",
    attendance: "85%", 
    risk: "medium" 
  },
];

export const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case 'low':
      return 'bg-green-500/20 text-green-400';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'high':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

const StudentList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_STUDENTS.map((student) => (
        <Card key={student.id} className="bg-slate-800 text-white border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium">{student.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getRiskBadgeColor(student.risk)}`}>
                {student.risk.charAt(0).toUpperCase() + student.risk.slice(1)} Risk
              </span>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Course</span>
                <span>{student.course}</span>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span>{student.progress}%</span>
                </div>
                <Progress value={student.progress} className="h-2" />
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Current Grade</span>
                <span className="text-2xl font-bold">{student.grade}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Attendance</span>
                <span>{student.attendance}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentList;
