import React from 'react';
import { Sprout, BarChart3, MessageSquare, User } from 'lucide-react';

interface NavigationProps {
  currentView: 'profile' | 'dashboard' | 'chatbot';
  onViewChange: (view: 'profile' | 'dashboard' | 'chatbot') => void;
  farmerName: string;
}

export default function Navigation({ currentView, onViewChange, farmerName }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b-2 border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 text-green-600" />
            <h1 className="text-xl font-bold text-green-800">FarmTracker</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'dashboard'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button
              onClick={() => onViewChange('chatbot')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'chatbot'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">Plant ID</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-green-700">
              <User className="h-5 w-5" />
              <span className="font-medium">{farmerName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}