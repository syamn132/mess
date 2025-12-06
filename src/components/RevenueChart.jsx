import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const RevenueChart = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 72000 },
    { month: 'Jun', revenue: 68000 },
    { month: 'Jul', revenue: 85000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
          <p className="text-sm text-slate-400 mt-1">Monthly revenue trends</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">+18.2%</span>
        </div>
      </div>

      <div className="space-y-4">
        {monthlyData.map((data, index) => {
          const percentage = (data.revenue / maxRevenue) * 100;
          
          return (
            <div key={data.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">{data.month}</span>
                <span className="text-white font-semibold">
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevenueChart;