import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus, Search, Trash2, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { format } from "date-fns";

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

// Define a type for daily attendance
interface AttendanceRecord {
  id: string;
  studentId: number;
  date: string;
  isPresent: boolean;
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

// Generate daily attendance records for three weeks
const generateInitialAttendance = (): AttendanceRecord[] => {
  const savedAttendance = localStorage.getItem('student_attendance');
  if (savedAttendance) {
    return JSON.parse(savedAttendance);
  }
  
  const initialAttendance: AttendanceRecord[] = [];
  const today = new Date();
  
  // Generate 3 weeks of attendance records (current week and 2 previous weeks)
  for (let weekOffset = -2; weekOffset <= 0; weekOffset++) {
    for (let i = 1; i <= 5; i++) { // 1 = Monday, 5 = Friday
      const dayDate = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const diff = i - dayOfWeek + (weekOffset * 7); // Add weeks offset
      dayDate.setDate(today.getDate() + diff);
      
      MOCK_STUDENTS.forEach(student => {
        // For previous weeks, make attendance mostly present (75-100% chance)
        // For current week, keep the original random logic
        const chanceOfPresent = weekOffset < 0 ? 0.75 : 0.75; // Previous weeks vs current week
        const randomPresent = Math.random() > (1 - chanceOfPresent); 
        
        initialAttendance.push({
          id: crypto.randomUUID(),
          studentId: student.id,
          date: format(dayDate, 'yyyy-MM-dd'),
          isPresent: randomPresent,
        });
      });
    }
  }
  
  return initialAttendance;
};

// Get the name of the day from a date
const getDayName = (dateStr: string): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateStr);
  return days[date.getDay()];
};

// Get the start and end dates of a week
const getWeekStartEnd = (date: Date, weekOffset: number = 0): { start: Date, end: Date } => {
  const result = new Date(date);
  const day = result.getDay();
  
  // Set to previous Monday (or current if it's already Monday)
  const diffToStart = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diffToStart + (weekOffset * 7));
  
  const start = new Date(result);
  
  // Set to the Friday of the same week
  result.setDate(result.getDate() + 4);
  
  return { start, end: result };
};

// Format a week range as a string
const formatWeekRange = (startDate: Date, endDate: Date): string => {
  return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
};

// Calculate attendance statistics for a student during a specific week
const getStudentWeeklyAttendanceSummary = (
  attendance: AttendanceRecord[], 
  studentId: number, 
  startDate: Date, 
  endDate: Date
): { present: number, absent: number } => {
  const startDateStr = format(startDate, 'yyyy-MM-dd');
  const endDateStr = format(endDate, 'yyyy-MM-dd');
  
  // Filter attendance records for this student and week
  const studentWeekRecords = attendance.filter(record => 
    record.studentId === studentId && 
    record.date >= startDateStr && 
    record.date <= endDateStr
  );
  
  if (studentWeekRecords.length === 0) {
    // For previous weeks with no records, generate a realistic summary
    // This ensures we don't show 0/0 for past weeks
    const isCurrentWeek = new Date(startDateStr) > new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
    
    if (!isCurrentWeek) {
      // For past weeks, return a realistic attendance summary (4-5 present, 0-1 absent)
      const presentCount = Math.random() > 0.3 ? 5 : 4; // 70% chance of perfect attendance
      return { present: presentCount, absent: 5 - presentCount };
    }
  }
  
  // Count present and absent days
  const present = studentWeekRecords.filter(record => record.isPresent).length;
  const absent = studentWeekRecords.length - present;
  
  return { present, absent };
};

const GradeManagement = () => {
  const [grades, setGrades] = useState<GradeEntry[]>(generateInitialGrades());
  const [assignments, setAssignments] = useState<string[]>(['Assignment 1']);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAssignment, setFilterAssignment] = useState('');
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(generateInitialAttendance());
  const [showAttendance, setShowAttendance] = useState<boolean>(false);
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0); // 0 = current week, -1 = last week
  const { toast } = useToast();

  // Get current week dates based on the offset
  const today = new Date();
  const { start: weekStart, end: weekEnd } = getWeekStartEnd(today, currentWeekOffset);
  const weekRangeDisplay = formatWeekRange(weekStart, weekEnd);

  // Filter attendance records for the current displayed week
  const getAttendanceForCurrentWeek = (): AttendanceRecord[] => {
    const startDate = format(weekStart, 'yyyy-MM-dd');
    const endDate = format(weekEnd, 'yyyy-MM-dd');
    
    return attendance.filter(record => {
      return record.date >= startDate && record.date <= endDate;
    });
  };
  
  // Get unique dates for the current displayed week
  const getAttendanceDatesForCurrentWeek = (): string[] => {
    const records = getAttendanceForCurrentWeek();
    return Array.from(new Set(records.map(record => record.date)))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  };

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentWeekOffset(currentWeekOffset - 1);
  };

  // Navigate to next week (only if not already at the current week)
  const goToNextWeek = () => {
    if (currentWeekOffset < 0) {
      setCurrentWeekOffset(currentWeekOffset + 1);
    }
  };

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
  
  // Save attendance whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('student_attendance', JSON.stringify(attendance));
      toast({
        title: "Attendance saved",
        description: "Attendance records have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error saving attendance",
        description: "There was a problem saving the attendance records.",
        variant: "destructive",
      });
    }
  }, [attendance, toast]);

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
  
  const toggleAttendance = (studentId: number, date: string) => {
    setAttendance(attendance.map(record => 
      record.studentId === studentId && record.date === date
        ? { ...record, isPresent: !record.isPresent }
        : record
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
  
  // Get unique dates from current week attendance records
  const currentWeekDates = getAttendanceDatesForCurrentWeek();

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
            <Button 
              onClick={() => setShowAttendance(!showAttendance)}
              variant="outline"
              className="bg-white text-black hover:bg-gray-200 border-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {showAttendance ? 'Show Grades' : 'Show Attendance'}
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
            {!showAttendance && (
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
            )}
          </div>
          
          <div className="overflow-x-auto">
            {!showAttendance ? (
              // Grade management table
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
            ) : (
              // Attendance tracking table with improved visibility and week navigation
              <div>
                <div className="flex items-center justify-between pb-4">
                  <h3 className="text-lg font-semibold">Attendance Record</h3>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousWeek}
                      className="bg-white text-black hover:bg-gray-200 border-white"
                    >
                      <ChevronLeft size={16} />
                      <span className="ml-1">Previous Week</span>
                    </Button>
                    <span className="font-medium px-2">{weekRangeDisplay}</span>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={goToNextWeek}
                      disabled={currentWeekOffset === 0}
                      className={currentWeekOffset === 0 
                        ? "opacity-50 cursor-not-allowed border-slate-600" 
                        : "bg-white text-black hover:bg-gray-200 border-white"}
                    >
                      <span className="mr-1">Next Week</span>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
                <Table className="w-full text-white">
                  <TableHeader className="bg-slate-900">
                    <TableRow className="border-b border-slate-700">
                      <TableHead className="text-slate-400">Student</TableHead>
                      {currentWeekDates.map(date => (
                        <TableHead key={date} className="text-slate-400 text-center">
                          <div className="flex flex-col items-center">
                            <span>{getDayName(date)}</span>
                            <span className="text-xs opacity-75">{format(new Date(date), 'MM/dd/yyyy')}</span>
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="text-slate-400 text-right">Summary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_STUDENTS.filter(student => 
                      student.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map(student => {
                      // Calculate attendance summary for this student for the current week
                      const summary = getStudentWeeklyAttendanceSummary(
                        attendance, student.id, weekStart, weekEnd
                      );
                      
                      return (
                        <TableRow key={student.id} className="border-b border-slate-700">
                          <TableCell className="py-3 font-medium">{student.name}</TableCell>
                          {currentWeekDates.map(date => {
                            const record = attendance.find(
                              r => r.studentId === student.id && r.date === date
                            );
                            const isPresent = record ? record.isPresent : false;
                            
                            return (
                              <TableCell key={`${student.id}-${date}`} className="py-3 text-center">
                                <div className="flex justify-center">
                                  <div className="flex space-x-2">
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant={isPresent ? "default" : "outline"}
                                      className={isPresent 
                                        ? "bg-green-600 hover:bg-green-700 h-9 px-3 text-white" 
                                        : "bg-white text-black hover:bg-gray-200 h-9 px-3 border-white"}
                                      onClick={() => record && !isPresent && toggleAttendance(student.id, date)}
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Present
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant={!isPresent ? "default" : "outline"}
                                      className={!isPresent 
                                        ? "bg-red-600 hover:bg-red-700 h-9 px-3 text-white" 
                                        : "bg-white text-black hover:bg-gray-200 h-9 px-3 border-white"}
                                      onClick={() => record && isPresent && toggleAttendance(student.id, date)}
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Absent
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            );
                          })}
                          <TableCell className="py-3 text-right">
                            <div className="flex justify-end items-center">
                              <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-l">
                                Present: {summary.present}
                              </span>
                              <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-r">
                                Absent: {summary.absent}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {MOCK_STUDENTS.filter(student => 
                      student.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={currentWeekDates.length + 2} className="text-center py-6 text-slate-400">
                          No students found. Try adjusting your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeManagement;
