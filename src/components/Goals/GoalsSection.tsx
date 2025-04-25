import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash } from "lucide-react";

interface Goal {
  id?: string;
  title: string;
  description: string;
  subject: string;
  progress?: number;
}

export const GoalsSection = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Goal>({ title: '', description: '', subject: '' });
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);
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

  const handleDeleteGoal = async (id: string) => {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting goal",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Goal deleted",
      description: "The academic goal has been removed",
    });

    fetchGoals();
  };

  const handleUpdateProgress = async () => {
    if (!selectedGoalId) return;

    const { error } = await supabase
      .from('goals')
      .update({ progress: progressValue })
      .eq('id', selectedGoalId);

    if (error) {
      toast({
        title: "Error updating progress",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Progress updated",
      description: "Goal progress has been updated successfully",
    });

    setSelectedGoalId(null);
    fetchGoals();
  };

  const handleManualProgressUpdate = async (goalId: string, newProgress: number) => {
    const { error } = await supabase
      .from('goals')
      .update({ progress: newProgress })
      .eq('id', goalId);

    if (error) {
      toast({
        title: "Error updating progress",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Progress updated",
      description: "Goal progress has been manually updated",
    });

    fetchGoals();
  };

  useEffect(() => {
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
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 border border-slate-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-slate-400">{goal.subject}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={goal.progress || 0}
                      onChange={(e) => handleManualProgressUpdate(goal.id!, parseInt(e.target.value) || 0)}
                      className="w-20 bg-slate-900 border-slate-700 text-center"
                    />
                    <span className="ml-2 text-lg font-bold">%</span>
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => goal.id && handleDeleteGoal(goal.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
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

        {/* Progress Update Dialog */}
        <Dialog open={selectedGoalId !== null} onOpenChange={(isOpen) => !isOpen && setSelectedGoalId(null)}>
          <DialogContent className="bg-slate-800 text-white border-slate-700">
            <DialogHeader>
              <DialogTitle>Update Goal Progress</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Current Progress: {progressValue}%</label>
                <Slider
                  value={[progressValue]}
                  onValueChange={(values) => setProgressValue(values[0])}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedGoalId(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateProgress}>
                  Save Progress
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
