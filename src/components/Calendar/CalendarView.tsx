
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from 'lucide-react';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// Sample mock assignments to populate the calendar
const MOCK_ASSIGNMENTS = [
  {
    id: '1',
    title: 'Math Quiz - Algebra',
    description: 'Covering chapters 5-7 on polynomial expressions',
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    type: 'exam',
    assigned_by: 'Mrs. Johnson',
  },
  {
    id: '2',
    title: 'History Essay',
    description: 'Write a 1000-word essay on the Industrial Revolution',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    type: 'assignment',
    assigned_by: 'Mr. Smith',
  },
  {
    id: '3',
    title: 'Science Project Deadline',
    description: 'Final submission of the ecosystem model',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    type: 'deadline',
    assigned_by: 'Dr. Williams',
  },
  {
    id: '4',
    title: 'Literature Analysis',
    description: 'Character study for "To Kill a Mockingbird"',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    type: 'assignment',
    assigned_by: 'Ms. Davis',
  },
  {
    id: '5',
    title: 'Mid-term Exams',
    description: 'All subjects - review study guides',
    date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    type: 'exam',
    assigned_by: 'School Administration',
  },
];

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
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*');
      
      if (error) {
        throw error;
      }

      // If we got data from Supabase, use it
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        // Otherwise use our mock data
        setEvents(MOCK_ASSIGNMENTS);
        
        // Also insert mock data into Supabase for future use
        const { error: insertError } = await supabase
          .from('calendar_events')
          .insert(MOCK_ASSIGNMENTS);
        
        if (insertError) {
          console.error('Could not insert mock data:', insertError);
        }
      }
    } catch (error: any) {
      console.error('Error fetching events:', error);
      // Fall back to mock data if there's any error with Supabase
      setEvents(MOCK_ASSIGNMENTS);
      
      toast({
        title: "Error connecting to database",
        description: "Using sample data instead",
        variant: "destructive",
      });
    }
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

    try {
      const newEventData = {
        title: newEvent.title,
        description: newEvent.description,
        date: date.toISOString(),
        type: newEvent.type,
        assigned_by: 'Teacher', // This would come from auth user in production
      };

      const { error } = await supabase
        .from('calendar_events')
        .insert([newEventData]);

      if (error) {
        throw error;
      }

      // Update local state
      setEvents([...events, { ...newEventData, id: crypto.randomUUID() }]);
      
      if (date && new Date(newEventData.date).toDateString() === date.toDateString()) {
        setSelectedDateEvents([...selectedDateEvents, newEventData]);
      }

      toast({
        title: "Event added successfully",
        description: "The new event has been created",
      });

      setNewEvent({ title: '', description: '', type: 'assignment' });
    } catch (error: any) {
      toast({
        title: "Error adding event",
        description: error.message || "Could not add the event",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', eventId);

      if (error) {
        throw error;
      }

      // Update local state
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      
      if (date) {
        const updatedDateEvents = selectedDateEvents.filter(event => event.id !== eventId);
        setSelectedDateEvents(updatedDateEvents);
      }

      toast({
        title: "Event removed successfully",
        description: "The event has been deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error removing event",
        description: error.message || "Could not delete the event",
        variant: "destructive",
      });
    }
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
              className="bg-slate-800 text-white rounded-md pointer-events-auto"
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
                    <div>
                      <label className="text-sm text-slate-400">Type</label>
                      <select
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                        className="w-full h-10 px-3 py-2 bg-slate-900 border-slate-700 rounded-md text-white mt-1"
                      >
                        <option value="assignment">Assignment</option>
                        <option value="exam">Exam</option>
                        <option value="deadline">Deadline</option>
                      </select>
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
                  <ContextMenu key={event.id || index}>
                    <ContextMenuTrigger>
                      <div 
                        className={`p-3 rounded-md border ${getEventTypeStyle(event.type)} relative group`}
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
                        {event.assigned_by && (
                          <p className="mt-1 text-xs text-slate-500">By: {event.assigned_by}</p>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(event.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="bg-slate-800 border-slate-700 text-white">
                      <ContextMenuItem 
                        className="text-red-400 focus:text-red-400 focus:bg-slate-700"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Event
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
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
