import React from 'react';
import { Plus, MoreHorizontal, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MenuManagement = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Menu Management</h2>
          <p className="text-slate-400">Plan meals for the upcoming week</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {days.map((day) => (
          <div key={day} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
              <h3 className="font-semibold text-white">{day}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {/* Lunch */}
              <div>
                <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">Lunch</p>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-slate-700 flex items-center justify-center shrink-0">
                      <Utensils className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Paneer Butter Masala</p>
                      <p className="text-xs text-slate-400">With 3 Chapatis, Rice, Dal, Salad</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dinner */}
              <div>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Dinner</p>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-slate-700 flex items-center justify-center shrink-0">
                      <Utensils className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Aloo Gobi Dry</p>
                      <p className="text-xs text-slate-400">With 3 Chapatis, Jeera Rice, Dal Fry</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;