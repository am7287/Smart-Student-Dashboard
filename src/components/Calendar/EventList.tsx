
import React from 'react';
import EventCard from './EventCard';

type EventListProps = {
  events: any[];
  getEventTypeStyle: (type: string) => string;
  handleDeleteEvent: (id: string) => Promise<void>;
};

const EventList: React.FC<EventListProps> = ({ 
  events, 
  getEventTypeStyle, 
  handleDeleteEvent 
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        <p>No events scheduled for this date</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <EventCard
          key={event.id || index}
          event={event}
          getEventTypeStyle={getEventTypeStyle}
          handleDeleteEvent={handleDeleteEvent}
        />
      ))}
    </div>
  );
};

export default EventList;
