
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, CalendarDays, Award, BarChart3 } from 'lucide-react';

// Mock student data with expanded information
const MOCK_STUDENTS = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    course: "Mathematics", 
    progress: 78, 
    grade: "A-",
    attendance: "95%", 
    risk: "low",
    recentAssignments: 5,
    completedAssignments: 4,
    lastActive: "2 hours ago",
    totalCourses: 4
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    course: "Physics", 
    progress: 65, 
    grade: "B+",
    attendance: "88%", 
    risk: "medium",
    recentAssignments: 4,
    completedAssignments: 3,
    lastActive: "1 day ago",
    totalCourses: 3
  },
  { 
    id: 3, 
    name: "Carol White", 
    course: "Chemistry", 
    progress: 92, 
    grade: "A",
    attendance: "98%", 
    risk: "low",
    recentAssignments: 6,
    completedAssignments: 6,
    lastActive: "3 hours ago",
    totalCourses: 5
  },
  { 
    id: 4, 
    name: "David Brown", 
    course: "Biology", 
    progress: 85, 
    grade: "A-",
    attendance: "92%", 
    risk: "low",
    recentAssignments: 4,
    completedAssignments: 3,
    lastActive: "5 hours ago",
    totalCourses: 4
  },
  { 
    id: 5, 
    name: "Emma Davis", 
    course: "History", 
    progress: 45, 
    grade: "C",
    attendance: "78%", 
    risk: "high",
    recentAssignments: 5,
    completedAssignments: 2,
    lastActive: "2 days ago", 
    totalCourses: 3
  },
  { 
    id: 6, 
    name: "Frank Miller", 
    course: "English", 
    progress: 72, 
    grade: "B",
    attendance: "85%", 
    risk: "medium",
    recentAssignments: 4,
    completedAssignments: 2,
    lastActive: "1 day ago",
    totalCourses: 4
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
                <span className="text-slate-400">Primary Course</span>
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

              <div className="pt-2 border-t border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-purple-400" />
                    <div>
                      <p className="text-xs text-slate-400">Total Courses</p>
                      <p className="text-sm font-medium">{student.totalCourses}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-xs text-slate-400">Completed</p>
                      <p className="text-sm font-medium">{student.completedAssignments}/{student.recentAssignments}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-400" />
                    <div>
                      <p className="text-xs text-slate-400">Last Active</p>
                      <p className="text-sm font-medium">{student.lastActive}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-amber-400" />
                    <div>
                      <p className="text-xs text-slate-400">Performance</p>
                      <p className="text-sm font-medium">
                        {student.progress >= 85 ? 'Excellent' : 
                         student.progress >= 70 ? 'Good' : 
                         student.progress >= 50 ? 'Average' : 'Needs Help'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentList;
