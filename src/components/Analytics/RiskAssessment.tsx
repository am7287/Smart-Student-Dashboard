
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for at-risk students
const AT_RISK_STUDENTS = [
  { id: 1, name: "Emma Davis", course: "History", risk: "high", issues: ["Attendance below 80%", "Missed 3 assignments", "Grade dropped 15% in 2 weeks"] },
  { id: 2, name: "Bob Smith", course: "Physics", risk: "medium", issues: ["Grade below class average", "Participation decreasing"] },
  { id: 3, name: "Frank Miller", course: "English", risk: "medium", issues: ["Two consecutive missed assignments", "Test scores declining"] },
];

import { getRiskBadgeColor } from '../Teacher/StudentList';

const RiskAssessment = () => {
  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle>At-Risk Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {AT_RISK_STUDENTS.map((student) => (
            <div key={student.id} className="p-4 rounded-lg border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-slate-400">{student.course}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getRiskBadgeColor(student.risk)}`}>
                  {student.risk.charAt(0).toUpperCase() + student.risk.slice(1)} Risk
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Issues:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {student.issues.map((issue, i) => (
                    <li key={i} className="text-sm text-slate-400">{issue}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
