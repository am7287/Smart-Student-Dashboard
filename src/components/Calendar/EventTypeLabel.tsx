
import React from 'react';

type EventTypeProps = {
  type: string;
};

const EventTypeLabel: React.FC<EventTypeProps> = ({ type }) => {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50">
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default EventTypeLabel;
