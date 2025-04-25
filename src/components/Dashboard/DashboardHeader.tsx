
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-slate-400">{subtitle}</p>
      </div>
      <Button 
        variant="default" 
        onClick={handleLogout}
        className="bg-white text-black hover:bg-gray-200"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign out
      </Button>
    </div>
  );
};

export default DashboardHeader;
