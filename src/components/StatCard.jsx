import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-3">{value}</h3>
          <div className="flex items-center gap-2">
            {changeType === 'positive' ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={cn(
              "text-sm font-medium",
              changeType === 'positive' ? 'text-green-500' : 'text-red-500'
            )}>
              {change}
            </span>
            <span className="text-sm text-slate-500">vs last month</span>
          </div>
        </div>
        <div className={cn(
          "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center",
          color
        )}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;