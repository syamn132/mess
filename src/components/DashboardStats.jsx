import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, UtensilsCrossed } from 'lucide-react';
import StatCard from '@/components/StatCard';
import RevenueChart from '@/components/RevenueChart';
import RecentActivity from '@/components/RecentActivity';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    activeMesses: 0,
    totalRevenue: 0,
    globalCustomers: 0,
    growthRate: 0
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('dashboardStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      const initialStats = {
        activeMesses: 42,
        totalRevenue: 125840,
        globalCustomers: 3567,
        growthRate: 23.5
      };
      setStats(initialStats);
      localStorage.setItem('dashboardStats', JSON.stringify(initialStats));
    }
  }, []);

  const statsData = [
    {
      title: 'Total Active Messes',
      value: stats.activeMesses,
      icon: UtensilsCrossed,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Global Customers',
      value: stats.globalCustomers.toLocaleString(),
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      change: '+15.3%',
      changeType: 'positive'
    },
    {
      title: 'Growth Rate',
      value: `${stats.growthRate}%`,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      change: '+5.1%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;