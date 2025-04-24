
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Subject {
  name: string;
  progress: number;
  score: number;
  grade: string;
}

interface WeeklyReport {
  attendance: string;
  completedAssignments: number;
  totalAssignments: number;
  improvements: string[];
  areasOfFocus: string[];
}

interface StudentProgressCardProps {
  student: {
    id: number;
    name: string;
    subjects: Subject[];
    weeklyReport: WeeklyReport;
  };
}

const StudentProgressCard = ({ student }: StudentProgressCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-slate-800 text-white border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer">
      <CardContent className="p-6" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{student.name}</h3>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {isExpanded && (
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-4 text-slate-400">Subject Performance</h4>
              <div className="space-y-4">
                {student.subjects.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <div className="flex items-center space-x-3">
                        <span>Score: {subject.score}</span>
                        <span className={`px-2 py-0.5 rounded ${
                          subject.grade.startsWith('A') ? 'bg-green-500/20 text-green-300' :
                          subject.grade.startsWith('B') ? 'bg-blue-500/20 text-blue-300' :
                          subject.grade.startsWith('C') ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          Grade: {subject.grade}
                        </span>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2 bg-slate-700" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-4 text-slate-400">Weekly Progress Report</h4>
              <div className="space-y-4 bg-slate-700/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Attendance</p>
                    <p className="text-lg font-semibold">{student.weeklyReport.attendance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Assignments Completed</p>
                    <p className="text-lg font-semibold">
                      {student.weeklyReport.completedAssignments}/{student.weeklyReport.totalAssignments}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400 mb-2">Improvements</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {student.weeklyReport.improvements.map((improvement, index) => (
                      <li key={index} className="text-green-300">{improvement}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400 mb-2">Areas Needing Focus</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {student.weeklyReport.areasOfFocus.map((area, index) => (
                      <li key={index} className="text-yellow-300">{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentProgressCard;
