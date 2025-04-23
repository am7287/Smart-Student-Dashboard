
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for chart
const MOCK_PERFORMANCE_DATA = [
  { week: 'Week 1', math: 82, science: 75, english: 88, history: 70 },
  { week: 'Week 2', math: 85, science: 78, english: 86, history: 72 },
  { week: 'Week 3', math: 89, science: 82, english: 85, history: 75 },
  { week: 'Week 4', math: 87, science: 85, english: 83, history: 78 },
  { week: 'Week 5', math: 90, science: 86, english: 89, history: 80 },
  { week: 'Week 6', math: 92, science: 88, english: 90, history: 83 },
];

const PerformanceChart = () => {
  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle>Class Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[65, 95]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="math" 
                stroke="#7C3AED" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="science" 
                stroke="#3B82F6" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="english" 
                stroke="#10B981" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="history" 
                stroke="#F59E0B" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
