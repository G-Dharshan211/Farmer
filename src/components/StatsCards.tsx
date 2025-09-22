import React from 'react';
import { TrendingUp, Calendar, Target, AlertCircle } from 'lucide-react';
import type { FarmerProfile } from '../App';

interface StatsCardsProps {
  profile: FarmerProfile;
  daysPlanted: number;
}

const CROP_DATA = {
  wheat: { totalDays: 120, yieldPerAcre: '40-60 bushels' },
  rice: { totalDays: 150, yieldPerAcre: '6-8 tons' },
  corn: { totalDays: 100, yieldPerAcre: '150-200 bushels' },
  tomato: { totalDays: 80, yieldPerAcre: '25-35 tons' },
  potato: { totalDays: 90, yieldPerAcre: '300-400 cwt' },
  soybean: { totalDays: 110, yieldPerAcre: '40-50 bushels' }
};

export default function StatsCards({ profile, daysPlanted }: StatsCardsProps) {
  const cropData = CROP_DATA[profile.cropType as keyof typeof CROP_DATA] || CROP_DATA.wheat;
  const progressPercentage = Math.min((daysPlanted / cropData.totalDays) * 100, 100);
  const daysRemaining = Math.max(cropData.totalDays - daysPlanted, 0);

  const stats = [
    {
      title: 'Growth Progress',
      value: `${Math.round(progressPercentage)}%`,
      change: `${daysPlanted} days completed`,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Days to Harvest',
      value: daysRemaining.toString(),
      change: `Expected harvest date`,
      icon: Calendar,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Expected Yield',
      value: cropData.yieldPerAcre,
      change: 'Per acre estimate',
      icon: Target,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Land Coverage',
      value: profile.landSize,
      change: 'Total farm size',
      icon: AlertCircle,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {stat.title}
            </h3>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-600 mt-1">{stat.change}</p>
            </div>
          </div>
          
          {stat.title === 'Growth Progress' && (
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}