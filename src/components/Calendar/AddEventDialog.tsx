
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type AddEventDialogProps = {
  newEvent: {
    title: string;
    description: string;
    type: string;
  };
  setNewEvent: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    type: string;
  }>>;
  handleAddEvent: () => Promise<void>;
};

const AddEventDialog: React.FC<AddEventDialogProps> = ({ 
  newEvent, 
  setNewEvent, 
  handleAddEvent 
}) => {
  return (
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
  );
};

export default AddEventDialog;
