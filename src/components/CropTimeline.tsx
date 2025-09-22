import React from 'react';
import { Sprout, Droplets, Sun, Wheat, CheckCircle, Clock } from 'lucide-react';

interface CropTimelineProps {
  cropType: string;
  plantingDate: string;
}

const CROP_STAGES = {
  wheat: [
    { name: 'Seeding', days: 0, icon: Sprout, description: 'Plant seeds in prepared soil' },
    { name: 'Germination', days: 7, icon: Droplets, description: 'Seeds begin to sprout' },
    { name: 'Tillering', days: 30, icon: Sun, description: 'Plant develops multiple shoots' },
    { name: 'Stem Elongation', days: 60, icon: TrendingUp, description: 'Rapid vertical growth' },
    { name: 'Heading', days: 90, icon: Wheat, description: 'Grain heads emerge' },
    { name: 'Harvest', days: 120, icon: CheckCircle, description: 'Ready for harvest' }
  ],
  rice: [
    { name: 'Seeding', days: 0, icon: Sprout, description: 'Plant seeds in flooded field' },
    { name: 'Germination', days: 10, icon: Droplets, description: 'Seeds sprout underwater' },
    { name: 'Vegetative', days: 45, icon: Sun, description: 'Tillering and leaf development' },
    { name: 'Reproductive', days: 90, icon: Wheat, description: 'Panicle development' },
    { name: 'Ripening', days: 120, icon: CheckCircle, description: 'Grain filling and maturation' },
    { name: 'Harvest', days: 150, icon: CheckCircle, description: 'Ready for harvest' }
  ],
  corn: [
    { name: 'Planting', days: 0, icon: Sprout, description: 'Plant seeds in rows' },
    { name: 'Emergence', days: 10, icon: Droplets, description: 'Seedlings emerge from soil' },
    { name: 'Vegetative', days: 40, icon: Sun, description: 'Rapid leaf and stem growth' },
    { name: 'Tasseling', days: 65, icon: Wheat, description: 'Tassels and silks appear' },
    { name: 'Grain Fill', days: 85, icon: CheckCircle, description: 'Kernels develop and fill' },
    { name: 'Harvest', days: 100, icon: CheckCircle, description: 'Ready for harvest' }
  ],
  tomato: [
    { name: 'Seeding', days: 0, icon: Sprout, description: 'Start seeds indoors' },
    { name: 'Transplant', days: 21, icon: Droplets, description: 'Move to garden' },
    { name: 'Flowering', days: 45, icon: Sun, description: 'First flowers appear' },
    { name: 'Fruit Set', days: 60, icon: Wheat, description: 'Small fruits develop' },
    { name: 'Ripening', days: 75, icon: CheckCircle, description: 'Fruits mature and ripen' },
    { name: 'Harvest', days: 80, icon: CheckCircle, description: 'Ready for harvest' }
  ],
  potato: [
    { name: 'Planting', days: 0, icon: Sprout, description: 'Plant seed potatoes' },
    { name: 'Emergence', days: 14, icon: Droplets, description: 'Shoots emerge from soil' },
    { name: 'Vegetative', days: 35, icon: Sun, description: 'Foliage growth and tuber initiation' },
    { name: 'Tuber Bulking', days: 60, icon: Wheat, description: 'Potato tubers grow larger' },
    { name: 'Maturation', days: 85, icon: CheckCircle, description: 'Skin sets, tops die back' },
    { name: 'Harvest', days: 90, icon: CheckCircle, description: 'Ready for harvest' }
  ],
  soybean: [
    { name: 'Planting', days: 0, icon: Sprout, description: 'Plant seeds in rows' },
    { name: 'Emergence', days: 7, icon: Droplets, description: 'Cotyledons push through soil' },
    { name: 'Vegetative', days: 35, icon: Sun, description: 'Leaf and node development' },
    { name: 'Flowering', days: 60, icon: Wheat, description: 'Flowers appear' },
    { name: 'Pod Fill', days: 85, icon: CheckCircle, description: 'Pods develop and fill' },
    { name: 'Harvest', days: 110, icon: CheckCircle, description: 'Ready for harvest' }
  ]
};

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

export default function CropTimeline({ cropType, plantingDate }: CropTimelineProps) {
  const stages = CROP_STAGES[cropType as keyof typeof CROP_STAGES] || CROP_STAGES.wheat;
  const plantDate = new Date(plantingDate);
  const currentDay = Math.floor((new Date().getTime() - plantDate.getTime()) / (1000 * 3600 * 24));
  
  const getCurrentStage = () => {
    for (let i = stages.length - 1; i >= 0; i--) {
      if (currentDay >= stages[i].days) {
        return i;
      }
    }
    return 0;
  };

  const currentStageIndex = getCurrentStage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-800">Crop Growth Timeline</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Day {currentDay}</span>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isPast = currentDay >= stage.days;
          const isCurrent = index === currentStageIndex && currentDay < stages[Math.min(index + 1, stages.length - 1)].days;
          const IconComponent = stage.icon;
          
          return (
            <div
              key={stage.name}
              className={`relative flex items-center p-4 rounded-xl transition-all duration-300 ${
                isPast
                  ? 'bg-green-50 border-2 border-green-200'
                  : isCurrent
                  ? 'bg-amber-50 border-2 border-amber-300 shadow-md'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {/* Timeline connector */}
              {index < stages.length - 1 && (
                <div
                  className={`absolute left-8 top-16 w-0.5 h-8 ${
                    isPast ? 'bg-green-400' : 'bg-gray-300'
                  }`}
                />
              )}
              
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isPast
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-400 text-white'
                }`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              
              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-semibold ${
                      isPast
                        ? 'text-green-800'
                        : isCurrent
                        ? 'text-amber-800'
                        : 'text-gray-600'
                    }`}
                  >
                    {stage.name}
                  </h3>
                  <div
                    className={`text-sm font-medium ${
                      isPast
                        ? 'text-green-600'
                        : isCurrent
                        ? 'text-amber-600'
                        : 'text-gray-500'
                    }`}
                  >
                    Day {stage.days}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">{stage.description}</p>
              </div>
              
              {isPast && (
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              )}
              {isCurrent && (
                <div className="h-3 w-3 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}