
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";

interface StudentDetailsCardProps {
  student: {
    id: number;
    name: string;
    subjects: Array<{
      name: string;
      progress: number;
      score: number;
      grade: string;
    }>;
    assignments: Array<{
      title: string;
      subject: string;
      due: string;
      status: string;
    }>;
  };
}

const StudentDetailsCard = ({ student }: StudentDetailsCardProps) => {
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
              <h4 className="text-sm font-medium mb-4 text-slate-400">Subject Progress</h4>
              <div className="space-y-4">
                {student.subjects.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <div className="flex items-center space-x-3">
                        <span>Score: {subject.score}</span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                          Grade: {subject.grade}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2 bg-slate-700" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-4 text-slate-400">Upcoming Assignments</h4>
              <div className="space-y-3">
                {student.assignments.map((assignment, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-md border ${
                      assignment.status === 'completed' 
                        ? 'border-green-500/30 bg-green-500/10' 
                        : 'border-slate-700'
                    }`}
                  >
                    <h4 className="font-medium">{assignment.title}</h4>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-slate-400">{assignment.subject}</span>
                      <span className={assignment.due === 'Tomorrow' ? 'text-red-400' : 'text-slate-400'}>
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentDetailsCard;
