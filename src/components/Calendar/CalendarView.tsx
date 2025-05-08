import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MOCK_ASSIGNMENTS, getEventTypeStyle } from './calendarUtils';
import AddEventDialog from './AddEventDialog';
import EventList from './EventList';

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
              <AddEventDialog 
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                handleAddEvent={handleAddEvent}
              />
            </div>
            
            <EventList 
              events={selectedDateEvents}
              getEventTypeStyle={getEventTypeStyle}
              handleDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
