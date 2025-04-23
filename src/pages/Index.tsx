
import React from 'react';
import MainLayout from '../components/MainLayout';
import StudentCard from '../components/StudentCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', avg: 85 },
  { name: 'Week 2', avg: 82 },
  { name: 'Week 3', avg: 88 },
  { name: 'Week 4', avg: 87 },
  { name: 'Week 5', avg: 89 },
];

const students = [
  { name: "Alice Johnson", course: "Mathematics", progress: 78, grade: "A-" },
  { name: "Bob Smith", course: "Physics", progress: 65, grade: "B+" },
  { name: "Carol White", course: "Chemistry", progress: 92, grade: "A" },
  { name: "David Brown", course: "Biology", progress: 85, grade: "A-" },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-slate-400">Track student performance and progress</p>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Class Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] text-slate-400">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avg" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.name}
              name={student.name}
              course={student.course}
              progress={student.progress}
              grade={student.grade}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
