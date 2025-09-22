import React, { useState } from 'react';
import { Sprout, User, MessageSquare, BarChart3 } from 'lucide-react';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Navigation from './components/Navigation';

export interface FarmerProfile {
  name: string;
  location: string;
  landSize: string;
  cropType: string;
  plantingDate: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'profile' | 'dashboard' | 'chatbot'>('profile');
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);

  const handleProfileComplete = (profile: FarmerProfile) => {
    setFarmerProfile(profile);
    setCurrentView('dashboard');
  };

  if (!farmerProfile && currentView === 'profile') {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        farmerName={farmerProfile?.name || ''}
      />
      
      <main className="pt-16">
        {currentView === 'dashboard' && farmerProfile && (
          <Dashboard profile={farmerProfile} />
        )}
        {currentView === 'chatbot' && (
          <Chatbot />
        )}
      </main>
    </div>
  );
}

export default App;