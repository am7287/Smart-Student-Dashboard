
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock student assignment data
const MOCK_ASSIGNMENTS = [
  { id: 1, name: "Alice Johnson", assignment: "Math Quiz 1", grade: 85 },
  { id: 2, name: "Bob Smith", assignment: "Math Quiz 1", grade: 72 },
  { id: 3, name: "Carol White", assignment: "Math Quiz 1", grade: 95 },
  { id: 4, name: "David Brown", assignment: "Math Quiz 1", grade: 88 },
  { id: 5, name: "Emma Davis", assignment: "Math Quiz 1", grade: 65 },
  { id: 6, name: "Frank Miller", assignment: "Math Quiz 1", grade: 78 },
];

const GradeManagement = () => {
  const [grades, setGrades] = useState(MOCK_ASSIGNMENTS);
  const { toast } = useToast();

  const handleGradeChange = (id: number, newGrade: number) => {
    setGrades(grades.map(grade => 
      grade.id === id ? { ...grade, grade: newGrade } : grade
    ));
  };

  const handleSave = () => {
    toast({
      title: "Grades updated",
      description: "All student grades have been successfully updated.",
    });
  };

  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl">Grade Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <span className="text-lg font-medium">Math Quiz 1</span>
              <span className="text-sm text-slate-400">Due: April 15, 2025</span>
            </div>
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
                  <th className="text-left py-3 text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">{item.assignment}</td>
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
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-slate-700 hover:bg-slate-700 text-slate-300">
                          Comment
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-700 hover:bg-slate-700 text-slate-300">
                          History
                        </Button>
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
