import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Search, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const DailyDispatch = () => {
  const [activeView, setActiveView] = useState('list');

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Dispatch Center</h2>
          <p className="text-slate-400">Manage daily delivery zones and routes</p>
        </div>
        <div className="flex gap-3">
          <div className="lg:hidden border border-slate-800 rounded-lg p-1 bg-slate-900 flex">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveView('list')}
              className={activeView === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400'}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveView('map')}
              className={activeView === 'map' ? 'bg-indigo-600 text-white' : 'text-slate-400'}
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" className="hidden md:flex border-slate-700 text-slate-300">
            Zone Map
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Optimize Routes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Zone List - Visible on List View or Large Screens */}
        <div className={`
          lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full
          ${activeView === 'list' ? 'block' : 'hidden lg:flex'}
        `}>
          <div className="p-4 border-b border-slate-800 shrink-0">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search drivers or zones..." 
                className="w-full bg-slate-800 text-sm text-white pl-9 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {[1, 2, 3, 4, 5, 6, 7].map((zone) => (
              <div key={zone} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white">Zone {zone} - North Sector</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${zone === 1 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                    {zone === 1 ? 'In Progress' : 'Scheduled'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span className="flex items-center"><Navigation className="w-3 h-3 mr-1" /> 42 Stops</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 45 mins est.</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">R</div>
                  <span className="text-xs text-slate-300">Raju K. (Driver)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map View - Visible on Map View or Large Screens */}
        <div className={`
          lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden h-[500px] lg:h-auto
          ${activeView === 'map' ? 'block' : 'hidden lg:block'}
        `}>
          <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Interactive Zone Map</h3>
              <p className="text-slate-400 max-w-xs mx-auto mt-2">
                Real-time tracking and route visualization would be displayed here using Google Maps or Mapbox integration.
              </p>
            </div>
          </div>
          
          {/* Overlay Stats */}
          <div className="absolute top-4 right-4 space-y-2">
             <div className="bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-lg">
               <p className="text-xs text-slate-400">Total Active Drivers</p>
               <p className="text-lg font-bold text-white">12</p>
             </div>
             <div className="bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-lg">
               <p className="text-xs text-slate-400">Pending Deliveries</p>
               <p className="text-lg font-bold text-orange-400">185</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDispatch;