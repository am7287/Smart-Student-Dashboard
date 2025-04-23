
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock user credentials
const MOCK_USERS = [
  { email: 'teacher@school.com', password: 'teacher123', role: 'teacher' },
  { email: 'parent@example.com', password: 'parent123', role: 'parent' },
  { email: 'student@edu.com', password: 'student123', role: 'student' },
];

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple mock authentication
    setTimeout(() => {
      const user = MOCK_USERS.find(
        user => user.email === email && user.password === password
      );

      if (user) {
        // Store user info in localStorage (in a real app, use a more secure method)
        localStorage.setItem('currentUser', JSON.stringify({ 
          email: user.email, 
          role: user.role 
        }));
        
        // Redirect based on role
        switch (user.role) {
          case 'teacher':
            navigate('/teacher-dashboard');
            break;
          case 'parent':
            navigate('/parent-portal');
            break;
          case 'student':
            navigate('/student-dashboard');
            break;
          default:
            navigate('/');
        }

        toast({
          title: "Login successful",
          description: `Welcome back, ${user.role}!`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleLogin}>
      <Card className="bg-slate-800 text-white border-slate-700 w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-100"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
            <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
