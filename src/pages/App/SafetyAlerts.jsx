import { AlertTriangle, Bell, Filter, MapPin, Shield } from 'lucide-react';
import React from 'react';

function SafetyAlerts() {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Safety Alerts</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg bg-white shadow hover:bg-gray-50">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg bg-white shadow hover:bg-gray-50">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">High Risk Areas</h3>
            <p className="text-red-700 mb-4">Current areas requiring extra caution</p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Palakkad Ghat Section - Heavy Fog</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Wayanad Curves - Landslide Risk</span>
              </li>
            </ul>
          </div>
  
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <Shield className="h-8 w-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Weather Warnings</h3>
            <p className="text-yellow-700 mb-4">Current weather-related alerts</p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Heavy Rain - Kochi to Thrissur</span>
              </li>
              <li className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Strong Winds - Coastal Highway</span>
              </li>
            </ul>
          </div>
  
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <Shield className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">Safety Tips</h3>
            <p className="text-green-700 mb-4">Important safety reminders</p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Keep emergency numbers handy</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Check weather before long trips</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  export default SafetyAlerts;