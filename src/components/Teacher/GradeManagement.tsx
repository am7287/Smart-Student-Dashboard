
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus, Search, Trash2 } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Define a type for the student
interface Student {
  id: number;
  name: string;
}

// Define a type for the grade entry
interface GradeEntry {
  id: string;
  studentId: number;
  name: string;
  assignment: string;
  grade: number;
  attendance: number;
}

// Mock student data based on the StudentList component
const MOCK_STUDENTS: Student[] = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol White" },
  { id: 4, name: "David Brown" },
  { id: 5, name: "Emma Davis" },
  { id: 6, name: "Frank Miller" },
];

// Generate initial grade data
const generateInitialGrades = (): GradeEntry[] => {
  const savedGrades = localStorage.getItem('student_grades');
  if (savedGrades) {
    return JSON.parse(savedGrades);
  }
  
  // Create sample grades for all students
  const initialGrades: GradeEntry[] = [];
  MOCK_STUDENTS.forEach(student => {
    initialGrades.push({
      id: crypto.randomUUID(),
      studentId: student.id,
      name: student.name,
      assignment: "Assignment 1",
      grade: Math.floor(Math.random() * (95 - 65) + 65),
      attendance: Math.floor(Math.random() * (100 - 75) + 75),
    });
  });
  
  return initialGrades;
};

const GradeManagement = () => {
  const [grades, setGrades] = useState<GradeEntry[]>(generateInitialGrades());
  const [assignments, setAssignments] = useState<string[]>(['Assignment 1']);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAssignment, setFilterAssignment] = useState('');
  const { toast } = useToast();

  // Save grades whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('student_grades', JSON.stringify(grades));
      toast({
        title: "Changes saved",
        description: "Grade updates have been saved automatically.",
      });
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: "There was a problem saving the updates.",
        variant: "destructive",
      });
    }
  }, [grades, toast]);

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

  const handleAddNewAssignment = () => {
    const assignmentNumber = assignments.length + 1;
    const newAssignmentName = `Assignment ${assignmentNumber}`;
    setAssignments([...assignments, newAssignmentName]);
    
    // Create new grade entries for all students for this assignment
    const newGradeEntries: GradeEntry[] = MOCK_STUDENTS.map(student => ({
      id: crypto.randomUUID(),
      studentId: student.id,
      name: student.name,
      assignment: newAssignmentName,
      grade: Math.floor(Math.random() * (95 - 65) + 65),
      attendance: Math.floor(Math.random() * (100 - 75) + 75),
    }));
    
    setGrades([...grades, ...newGradeEntries]);
    
    toast({
      title: "New assignment added",
      description: `${newAssignmentName} has been created for all students.`,
    });
  };

  const handleDeleteAssignment = (assignmentName: string) => {
    // Remove the assignment from the assignments list
    setAssignments(assignments.filter(a => a !== assignmentName));
    
    // Remove all grade entries for this assignment
    setGrades(grades.filter(g => g.assignment !== assignmentName));
    
    // Update filter if the deleted assignment was selected
    if (filterAssignment === assignmentName) {
      setFilterAssignment('');
    }
    
    toast({
      title: "Assignment deleted",
      description: `${assignmentName} has been removed from all students.`,
    });
  };

  // Filter grades based on search term and assignment filter
  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAssignment = filterAssignment ? grade.assignment === filterAssignment : true;
    return matchesSearch && matchesAssignment;
  });

  // Get unique list of assignments for filtering
  const uniqueAssignments = Array.from(new Set(grades.map(grade => grade.assignment)));

  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <CardTitle className="text-xl">Grade & Attendance Management</CardTitle>
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <Button 
              onClick={handleAddNewAssignment}
              className="bg-purple-600 hover:bg-purple-700 flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Assignment
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-slate-900 border-slate-700"
              />
            </div>
            <div className="flex-1 md:max-w-xs">
              <select
                value={filterAssignment}
                onChange={(e) => setFilterAssignment(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-slate-900 border-slate-700 rounded-md text-white"
              >
                <option value="">All Assignments</option>
                {uniqueAssignments.map((assignment) => (
                  <option key={assignment} value={assignment}>{assignment}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table className="w-full text-white">
              <TableHeader className="bg-slate-900">
                <TableRow className="border-b border-slate-700">
                  <TableHead className="text-slate-400">Student</TableHead>
                  <TableHead className="text-slate-400">Assignment</TableHead>
                  <TableHead className="text-slate-400">Grade</TableHead>
                  <TableHead className="text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Attendance (%)</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-slate-400 w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.length > 0 ? (
                  filteredGrades.map((item) => (
                    <TableRow key={item.id} className="border-b border-slate-700">
                      <TableCell className="py-3 font-medium">{item.name}</TableCell>
                      <TableCell className="py-3 w-64">
                        <Input 
                          value={item.assignment}
                          onChange={(e) => handleAssignmentChange(item.id, e.target.value)}
                          className="bg-slate-900 border-slate-700"
                        />
                      </TableCell>
                      <TableCell className="py-3 w-32">
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
                      </TableCell>
                      <TableCell className="py-3 w-32">
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
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        {uniqueAssignments.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAssignment(item.assignment)}
                            className="text-red-400 hover:text-red-500 hover:bg-red-400/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-slate-400">
                      No results found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeManagement;
