
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import EventTypeLabel from './EventTypeLabel';

type EventCardProps = {
  event: {
    id: string;
    title: string;
    description?: string;
    type: string;
    assigned_by?: string;
  };
  getEventTypeStyle: (type: string) => string;
  handleDeleteEvent: (id: string) => Promise<void>;
};

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  getEventTypeStyle, 
  handleDeleteEvent 
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div 
          className={`p-3 rounded-md border ${getEventTypeStyle(event.type)} relative group`}
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">{event.title}</h4>
            <EventTypeLabel type={event.type} />
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
  );
};

export default EventCard;
