
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Student Tracker</h1>
        <LoginForm />
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Demo credentials:
          </p>
          <div className="grid grid-cols-3 gap-4 mt-2 text-xs text-slate-400">
            <div>
              <span className="block font-semibold text-purple-400">Teacher</span>
              teacher@school.com<br/>
              teacher123
            </div>
            <div>
              <span className="block font-semibold text-purple-400">Parent</span>
              parent@example.com<br/>
              parent123
            </div>
            <div>
              <span className="block font-semibold text-purple-400">Student</span>
              student@edu.com<br/>
              student123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
