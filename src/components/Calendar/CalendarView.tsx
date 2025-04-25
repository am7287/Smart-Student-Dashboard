
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'assignment'
  });
  const { toast } = useToast();

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*');
    
    if (error) {
      toast({
        title: "Error fetching events",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const dayEvents = events.filter(
        event => new Date(event.date).toDateString() === selectedDate.toDateString()
      );
      setSelectedDateEvents(dayEvents);
    } else {
      setSelectedDateEvents([]);
    }
  };

  const handleAddEvent = async () => {
    if (!date || !newEvent.title) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('calendar_events')
      .insert([{
        title: newEvent.title,
        description: newEvent.description,
        date: date.toISOString(),
        type: newEvent.type,
        assigned_by: 'Teacher', // This would come from auth user in production
      }]);

    if (error) {
      toast({
        title: "Error adding event",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Event added successfully",
      description: "The new event has been created",
    });

    setNewEvent({ title: '', description: '', type: 'assignment' });
    fetchEvents();
  };

  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'deadline':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'exam':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No date selected'}
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="default" 
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    Add New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 text-white border-slate-700">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm text-slate-400">Title</label>
                      <Input
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Description</label>
                      <Textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <Button onClick={handleAddEvent} className="w-full">
                      Add Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-md border ${getEventTypeStyle(event.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    {event.description && (
                      <p className="mt-2 text-sm text-slate-400">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p>No events scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
