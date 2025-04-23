
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    
    if (!userStr) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (!user.role || !allowedRoles.includes(user.role)) {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  }, [allowedRoles, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
