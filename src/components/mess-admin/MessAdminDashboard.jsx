import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, CalendarDays, Truck, BarChart3 } from 'lucide-react';
import AdminStats from './AdminStats';
import MenuManagement from './MenuManagement';
import DailyDispatch from './DailyDispatch';
import AdminReports from './AdminReports';

const MessAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AdminStats />;
      case 'menu': return <MenuManagement />;
      case 'dispatch': return <DailyDispatch />;
      case 'reports': return <AdminReports />;
      default: return <AdminStats />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl px-6 flex items-center justify-between shrink-0">
        <h1 className="text-xl font-bold text-white hidden md:block">Admin Console</h1>
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
            icon={LayoutGrid} 
            label="Overview" 
          />
          <TabButton 
            active={activeTab === 'menu'} 
            onClick={() => setActiveTab('menu')} 
            icon={CalendarDays} 
            label="Menu" 
          />
          <TabButton 
            active={activeTab === 'dispatch'} 
            onClick={() => setActiveTab('dispatch')} 
            icon={Truck} 
            label="Dispatch" 
          />
          <TabButton 
            active={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')} 
            icon={BarChart3} 
            label="Reports" 
          />
        </nav>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export default MessAdminDashboard;