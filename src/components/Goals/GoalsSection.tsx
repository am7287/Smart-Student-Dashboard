
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Goal {
  title: string;
  description: string;
  subject: string;
  progress?: number;
}

export const GoalsSection = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Goal>({ title: '', description: '', subject: '' });
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
        student_id: 'demo-student',
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

  React.useEffect(() => {
    fetchGoals();
  }, []);

  return (
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
  );
};

