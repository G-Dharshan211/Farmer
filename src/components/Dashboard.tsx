import React from 'react';
import { MapPin, Ruler, Calendar, TrendingUp } from 'lucide-react';
import type { FarmerProfile } from '../App';
import CropTimeline from './CropTimeline';
import WeatherWidget from './WeatherWidget';
import StatsCards from './StatsCards';

interface DashboardProps {
  profile: FarmerProfile;
}

export default function Dashboard({ profile }: DashboardProps) {
  const plantingDate = new Date(profile.plantingDate);
  const daysPlanted = Math.floor((new Date().getTime() - plantingDate.getTime()) / (1000 * 3600 * 24));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Welcome back, {profile.name}!
            </h1>
            <div className="flex flex-wrap items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Ruler className="h-4 w-4" />
                <span>{profile.landSize}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Day {daysPlanted} since planting</span>
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="bg-green-100 rounded-lg px-4 py-2">
              <div className="text-sm text-green-600">Current Crop</div>
              <div className="text-lg font-semibold text-green-800 capitalize">
                {profile.cropType}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards profile={profile} daysPlanted={daysPlanted} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Crop Timeline - Takes 2/3 of the width */}
        <div className="xl:col-span-2">
          <CropTimeline cropType={profile.cropType} plantingDate={profile.plantingDate} />
        </div>

        {/* Weather Widget - Takes 1/3 of the width */}
        <div className="xl:col-span-1">
          <WeatherWidget location={profile.location} />
        </div>
      </div>
    </div>
  );
}