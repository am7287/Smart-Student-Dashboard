
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface Assignment {
  title: string;
  subject: string;
  due: string;
  status: string;
}

interface StudentProgressCardProps {
  student: {
    id: number;
    name: string;
    subjects: Subject[];
    weeklyReport: WeeklyReport;
    upcomingAssignments?: Assignment[];
  };
}

const StudentProgressCard = ({ student }: StudentProgressCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownloadReport = () => {
    // Create report content
    let reportContent = `Student Progress Report - ${student.name}\n\n`;
    reportContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    reportContent += "SUBJECT PERFORMANCE\n";
    reportContent += "-------------------\n";
    student.subjects.forEach(subject => {
      reportContent += `${subject.name} - Score: ${subject.score}, Grade: ${subject.grade}, Progress: ${subject.progress}%\n`;
    });
    
    reportContent += "\nWEEKLY REPORT\n";
    reportContent += "-------------\n";
    reportContent += `Attendance: ${student.weeklyReport.attendance}\n`;
    reportContent += `Assignments Completed: ${student.weeklyReport.completedAssignments}/${student.weeklyReport.totalAssignments}\n`;
    
    reportContent += "\nImprovements:\n";
    student.weeklyReport.improvements.forEach(item => {
      reportContent += `• ${item}\n`;
    });
    
    reportContent += "\nAreas Needing Focus:\n";
    student.weeklyReport.areasOfFocus.forEach(item => {
      reportContent += `• ${item}\n`;
    });

    if (student.upcomingAssignments && student.upcomingAssignments.length > 0) {
      reportContent += "\nUPCOMING ASSIGNMENTS\n";
      reportContent += "-------------------\n";
      student.upcomingAssignments.forEach(assignment => {
        reportContent += `• ${assignment.title} (${assignment.subject}) - Due: ${assignment.due}\n`;
      });
    }
    
    // Create a downloadable file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.name.replace(/\s+/g, '_')}_Progress_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-slate-800 text-white border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
          <h3 className="text-lg font-medium">{student.name}</h3>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadReport();
              }}
              variant="outline"
              size="sm"
              className="text-white hover:text-purple-400 border-slate-600 hover:border-purple-500"
            >
              <Download size={16} className="mr-2" />
              Download Report
            </Button>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
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
            
            {student.upcomingAssignments && student.upcomingAssignments.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-4 text-slate-400">Upcoming Assignments</h4>
                <div className="space-y-3">
                  {student.upcomingAssignments.map((assignment, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-md border border-slate-700 bg-slate-800/50"
                    >
                      <h4 className="font-medium">{assignment.title}</h4>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-slate-400">{assignment.subject}</span>
                        <span className={assignment.due === 'Tomorrow' ? 'text-red-400' : 'text-slate-400'}>
                          Due: {assignment.due}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentProgressCard;
