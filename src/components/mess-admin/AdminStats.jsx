import React from 'react';
import { Users, Utensils, Leaf, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const AdminStats = () => {
  const stats = [
    { 
      label: 'Total Subscribers', 
      value: '1,248', 
      change: '+12%', 
      trend: 'up',
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    { 
      label: "Today's Meals", 
      value: '956', 
      change: 'Lunch & Dinner', 
      trend: 'neutral',
      icon: Utensils,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10'
    },
    { 
      label: 'Revenue (Today)', 
      value: '₹84,500', 
      change: '+8.2%', 
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    { 
      label: 'Dietary Req.', 
      value: '142', 
      change: 'Special Meals', 
      trend: 'neutral',
      icon: Leaf,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-slate-400">Real-time insight into today's operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              {stat.trend === 'up' && (
                <span className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-400">{stat.label}</p>
              {stat.trend === 'neutral' && (
                <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dietary Breakdown Chart Placeholder */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Dietary Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Standard Veg', count: 640, pct: '67%', color: 'bg-green-500' },
              { label: 'Standard Non-Veg', count: 210, pct: '22%', color: 'bg-red-500' },
              { label: 'Jain (No Onion/Garlic)', count: 65, pct: '7%', color: 'bg-yellow-500' },
              { label: 'Low Carb / Keto', count: 41, pct: '4%', color: 'bg-blue-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-400">{item.count}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Alerts */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Operational Alerts</h3>
          <div className="space-y-3">
            {[
              { msg: 'Delivery Zone B is experiencing high traffic delays (+15 mins)', type: 'warning' },
              { msg: 'Inventory Alert: Rice supply low for tomorrow\'s dispatch', type: 'critical' },
              { msg: '5 new subscription requests pending approval', type: 'info' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <AlertCircle className={`w-5 h-5 shrink-0 ${
                  alert.type === 'critical' ? 'text-red-500' : 
                  alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                }`} />
                <p className="text-sm text-slate-300">{alert.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;