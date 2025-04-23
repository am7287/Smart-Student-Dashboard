
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';

// Mock events data
const MOCK_EVENTS = [
  { id: 1, title: "Math Quiz", date: new Date(2025, 3, 15), type: "assignment" },
  { id: 2, title: "Science Project Due", date: new Date(2025, 3, 18), type: "deadline" },
  { id: 3, title: "Parent-Teacher Conference", date: new Date(2025, 3, 22), type: "meeting" },
  { id: 4, title: "English Essay Due", date: new Date(2025, 3, 25), type: "deadline" },
  { id: 5, title: "Spring Break Starts", date: new Date(2025, 3, 28), type: "holiday" },
];

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState<typeof MOCK_EVENTS>([]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      // Filter events for the selected date
      const events = MOCK_EVENTS.filter(
        event => event.date.toDateString() === selectedDate.toDateString()
      );
      setSelectedDateEvents(events);
    } else {
      setSelectedDateEvents([]);
    }
  };

  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'deadline':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'meeting':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'holiday':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle>Academic Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="bg-slate-800 text-white rounded-md"
            />
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">
              {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No date selected'}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div 
                    key={event.id}
                    className={`p-3 rounded-md border ${getEventTypeStyle(event.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p>No events scheduled for this date</p>
                <Button variant="outline" className="mt-4 border-slate-700 text-slate-300 hover:bg-slate-700">
                  Add New Event
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
