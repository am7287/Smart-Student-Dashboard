
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock messages data
const MOCK_MESSAGES = [
  { id: 1, sender: 'Mr. Anderson', role: 'teacher', content: 'Please remind your child about the upcoming science project due next week.', timestamp: '2025-04-18T14:30:00' },
  { id: 2, sender: 'Mrs. Williams', role: 'teacher', content: 'Your child has been doing excellent work in English class!', timestamp: '2025-04-17T10:15:00' },
  { id: 3, sender: 'John Smith', role: 'parent', content: 'Thank you for the feedback. We\'ll make sure the project is completed on time.', timestamp: '2025-04-18T15:45:00' },
];

const MessageCenter = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  // Get user info from localStorage
  const userString = localStorage.getItem('currentUser');
  const user = userString ? JSON.parse(userString) : { role: 'unknown' };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending",
        variant: "destructive",
      });
      return;
    }

    // Different sender name based on user role
    let sender = '';
    switch (user.role) {
      case 'teacher':
        sender = 'Ms. Johnson';
        break;
      case 'parent':
        sender = 'John Smith';
        break;
      case 'student':
        sender = 'Alice Johnson';
        break;
      default:
        sender = 'Anonymous';
    }

    const newMsg = {
      id: Date.now(),
      sender: sender,
      role: user.role,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle>Message Center</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 p-4 rounded-lg ${message.role === user.role 
                  ? 'bg-purple-600/20 ml-12' 
                  : 'bg-slate-700/50 mr-12'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs text-slate-400">{formatDate(message.timestamp)}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-700 pt-4">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-slate-900 border-slate-700 text-slate-100 flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCenter;
