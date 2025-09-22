import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';

interface WeatherWidgetProps {
  location: string;
}

export default function WeatherWidget({ location }: WeatherWidgetProps) {
  // Mock weather data - in a real app, you'd fetch from a weather API
  const weatherData = {
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: 'Today', high: 26, low: 18, condition: 'sunny' },
      { day: 'Tomorrow', high: 28, low: 20, condition: 'cloudy' },
      { day: 'Wed', high: 22, low: 16, condition: 'rainy' },
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-green-800 mb-4">Weather Conditions</h2>
      <p className="text-gray-600 text-sm mb-4">{location}</p>

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-bold text-blue-800">{weatherData.temperature}°C</div>
            <div className="text-blue-600">{weatherData.condition}</div>
          </div>
          <Cloud className="h-12 w-12 text-blue-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-blue-700">{weatherData.humidity}% Humidity</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-blue-700">{weatherData.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <h3 className="font-semibold text-gray-800 mb-3">3-Day Forecast</h3>
      <div className="space-y-3">
        {weatherData.forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getWeatherIcon(day.condition)}
              <span className="font-medium text-gray-800">{day.day}</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">{day.high}°</span> / {day.low}°
            </div>
          </div>
        ))}
      </div>

      {/* Farming Tips */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">Today's Tip</h4>
        <p className="text-sm text-green-700">
          Good weather for field work! Consider checking irrigation systems before the expected rain on Wednesday.
        </p>
      </div>
    </div>
  );
}