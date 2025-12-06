import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: 'success',
      title: 'New Mess Registered',
      description: 'Paradise Mess - Premium Plan',
      time: '5 min ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      type: 'warning',
      title: 'Payment Pending',
      description: 'Sunrise Mess - $299/month',
      time: '15 min ago',
      icon: AlertCircle,
      color: 'text-yellow-500'
    },
    {
      type: 'error',
      title: 'Mess Suspended',
      description: 'Royal Mess - Payment Failed',
      time: '1 hour ago',
      icon: XCircle,
      color: 'text-red-500'
    },
    {
      type: 'info',
      title: 'Subscription Renewal',
      description: 'Golden Mess - Basic Plan',
      time: '2 hours ago',
      icon: Clock,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors duration-200"
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${activity.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white mb-1">
                  {activity.title}
                </p>
                <p className="text-xs text-slate-400 mb-2">
                  {activity.description}
                </p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;