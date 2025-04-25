
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

// Generate random grades for completed assignments
const generateRandomGrades = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return weekDays.map(day => ({
    id: crypto.randomUUID(),
    name: "Alice Johnson",
    assignment: `${day}'s Assignment`,
    grade: Math.floor(Math.random() * (95 - 65) + 65),
    attendance: Math.floor(Math.random() * (100 - 75) + 75),
  }));
};

const GradeManagement = () => {
  const [grades, setGrades] = useState(generateRandomGrades());
  const { toast } = useToast();

  const handleGradeChange = (id: string, newGrade: number) => {
    setGrades(grades.map(grade => 
      grade.id === id ? { ...grade, grade: Math.min(100, Math.max(0, newGrade)) } : grade
    ));
  };

  const handleAssignmentChange = (id: string, newAssignment: string) => {
    setGrades(grades.map(grade => 
      grade.id === id ? { ...grade, assignment: newAssignment } : grade
    ));
  };

  const handleAttendanceChange = (id: string, newAttendance: number) => {
    setGrades(grades.map(grade =>
      grade.id === id ? { ...grade, attendance: Math.min(100, Math.max(0, newAttendance)) } : grade
    ));
  };

  const handleSave = () => {
    try {
      // Save to localStorage instead of Supabase
      localStorage.setItem('student_grades', JSON.stringify(grades));

      toast({
        title: "Updates saved",
        description: "All student grades and attendance have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error saving updates",
        description: "There was a problem saving the changes.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl">Grade & Attendance Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save All Changes
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-slate-400">Student</th>
                  <th className="text-left py-3 text-slate-400">Assignment</th>
                  <th className="text-left py-3 text-slate-400">Grade</th>
                  <th className="text-left py-3 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Attendance (%)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {grades.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3 w-64">
                      <Input 
                        value={item.assignment}
                        onChange={(e) => handleAssignmentChange(item.id, e.target.value)}
                        className="bg-slate-900 border-slate-700"
                      />
                    </td>
                    <td className="py-3 w-32">
                      <div className="flex items-center">
                        <Input 
                          type="number"
                          min="0"
                          max="100" 
                          value={item.grade}
                          onChange={(e) => handleGradeChange(item.id, parseInt(e.target.value) || 0)}
                          className="w-20 bg-slate-900 border-slate-700 text-center"
                        />
                        <span className="ml-2 text-slate-400">/100</span>
                      </div>
                    </td>
                    <td className="py-3 w-32">
                      <div className="flex items-center">
                        <Input 
                          type="number"
                          min="0"
                          max="100" 
                          value={item.attendance}
                          onChange={(e) => handleAttendanceChange(item.id, parseInt(e.target.value) || 0)}
                          className="w-20 bg-slate-900 border-slate-700 text-center"
                        />
                        <span className="ml-2 text-slate-400">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeManagement;
