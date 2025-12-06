import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
          <p className="text-slate-400">Financial and operational performance</p>
        </div>
        <Button variant="outline" className="border-slate-700 text-slate-300">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Revenue</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 52, 48, 61, 72, 68, 85].map((h, i) => (
              <div key={i} className="w-full bg-indigo-500/20 rounded-t-lg relative group hover:bg-indigo-500/30 transition-colors">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-500"
                  style={{ height: `${h}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{(h * 1200).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-slate-400 px-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <h3 className="text-lg font-semibold text-white mb-4">Subscription Retention</h3>
           <div className="space-y-6">
             {[
               { label: 'Renewed Subscriptions', val: '85%', color: 'bg-emerald-500' },
               { label: 'New Signups', val: '12%', color: 'bg-blue-500' },
               { label: 'Cancellations', val: '3%', color: 'bg-red-500' }
             ].map((item) => (
               <div key={item.label}>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="text-slate-300">{item.label}</span>
                   <span className="text-white font-medium">{item.val}</span>
                 </div>
                 <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                   <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                 </div>
               </div>
             ))}
           </div>
           
           <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
             <h4 className="text-sm font-semibold text-white mb-2">Insight</h4>
             <p className="text-sm text-slate-400">
               Customer retention has improved by 5% since the introduction of the "Skip Meal" feature.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;