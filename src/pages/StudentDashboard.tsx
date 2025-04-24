import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StudentDetailsCard from '../components/StudentDetailsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AuthGuard from '../components/Auth/AuthGuard';

const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    subjects: [
      { name: "Mathematics", progress: 78 },
      { name: "Physics", progress: 65 },
      { name: "Chemistry", progress: 92 }
    ],
    assignments: [
      {
        title: "Math Homework: Algebra",
        subject: "Mathematics",
        due: "Tomorrow",
        status: "pending"
      },
      {
        title: "Physics Lab Report",
        subject: "Physics",
        due: "Next Week",
        status: "pending"
      }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    subjects: [
      { name: "Mathematics", progress: 85 },
      { name: "Physics", progress: 72 },
      { name: "Chemistry", progress: 88 }
    ],
    assignments: [
      {
        title: "Chemistry Quiz Prep",
        subject: "Chemistry",
        due: "Friday",
        status: "pending"
      },
      {
        title: "Math Assignment",
        subject: "Mathematics",
        due: "Next Monday",
        status: "completed"
      }
    ]
  },
  {
    id: 3,
    name: "Carol White",
    subjects: [
      { name: "Mathematics", progress: 92 },
      { name: "Physics", progress: 88 },
      { name: "Chemistry", progress: 95 }
    ],
    assignments: [
      {
        title: "Physics Problem Set",
        subject: "Physics",
        due: "Wednesday",
        status: "pending"
      }
    ]
  }
];

const StudentDashboard = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', subject: '' });
  const { toast } = useToast();

  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching goals",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setGoals(data || []);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.subject) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('goals')
      .insert([{
        title: newGoal.title,
        description: newGoal.description,
        subject: newGoal.subject,
        student_id: 'demo-student', // This would come from auth in production
      }]);

    if (error) {
      toast({
        title: "Error adding goal",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Goal added successfully",
      description: "Your new academic goal has been set",
    });

    setNewGoal({ title: '', description: '', subject: '' });
    fetchGoals();
  };

  return (
    <AuthGuard allowedRoles={['student']}>
      <MainLayout>
        <div className="space-y-8">
          <DashboardHeader 
            title="Student Dashboard" 
            subtitle="Track your academic progress and assignments"
          />
          
          <div className="grid grid-cols-1 gap-6">
            {mockStudents.map((student) => (
              <StudentDetailsCard key={student.id} student={student} />
            ))}
          </div>

          <Card className="bg-slate-800 text-white border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Academic Goals</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-700">
                    Add New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 text-white border-slate-700">
                  <DialogHeader>
                    <DialogTitle>Set New Academic Goal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm text-slate-400">Goal Title</label>
                      <Input
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Subject</label>
                      <Input
                        value={newGoal.subject}
                        onChange={(e) => setNewGoal({ ...newGoal, subject: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Description</label>
                      <Input
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <Button onClick={handleAddGoal} className="w-full">
                      Set Goal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal, index) => (
                  <div key={index} className="p-4 border border-slate-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-medium">{goal.title}</h3>
                        <p className="text-sm text-slate-400">{goal.subject}</p>
                      </div>
                      <span className="text-lg font-bold">{goal.progress || 0}%</span>
                    </div>
                    <Progress 
                      value={goal.progress || 0} 
                      className="h-2 bg-slate-700"
                    />
                    {goal.description && (
                      <p className="mt-2 text-sm text-slate-400">{goal.description}</p>
                    )}
                  </div>
                ))}
                {goals.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <p>No academic goals set yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default StudentDashboard;
