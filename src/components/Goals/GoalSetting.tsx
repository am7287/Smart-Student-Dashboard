
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

// Mock goals data
const MOCK_GOALS = [
  { id: 1, title: "Class Average above 85%", progress: 82, target: 85 },
  { id: 2, title: "100% Assignment Completion", progress: 93, target: 100 },
  { id: 3, title: "Improve Attendance to 95%", progress: 90, target: 95 },
];

const GoalSetting = () => {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState(90);
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!newGoalTitle) {
      toast({
        title: "Goal title required",
        description: "Please enter a title for your goal",
        variant: "destructive",
      });
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: newGoalTitle,
      progress: 0,
      target: newGoalTarget,
    };

    setGoals([...goals, newGoal]);
    setNewGoalTitle('');
    setNewGoalTarget(90);

    toast({
      title: "Goal added",
      description: "Your new goal has been set successfully",
    });
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle>Academic Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Goals</h3>
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 border border-slate-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className="text-sm">
                    {goal.progress}/{goal.target}
                  </span>
                </div>
                <div className="space-y-2">
                  <Progress 
                    value={(goal.progress / goal.target) * 100} 
                    className={`h-2 ${getProgressColor(goal.progress, goal.target)}`} 
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>0</span>
                    <span>{goal.target}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add new goal */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-medium mb-4">Add New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Goal Title</label>
                <Input
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Enter goal title..."
                  className="bg-slate-900 border-slate-700 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Target Value</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(Number(e.target.value))}
                    min="0"
                    max="100"
                    className="bg-slate-900 border-slate-700 text-slate-100 w-24"
                  />
                  <span className="ml-2 text-slate-400">%</span>
                </div>
              </div>
              <Button 
                onClick={handleAddGoal}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add Goal
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSetting;
