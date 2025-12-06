import React from 'react';
import { LayoutDashboard, UtensilsCrossed, CreditCard, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ activeSection, setActiveSection, isDesktop }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mess-management', label: 'Mess Management', icon: UtensilsCrossed },
    { id: 'subscription-plans', label: 'Subscription Plans', icon: CreditCard },
    { id: 'billing', label: 'Billing', icon: DollarSign },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-300">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
             <UtensilsCrossed className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Super Admin</h2>
            <p className="text-xs text-slate-500">Management Console</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Logged in as</p>
          <p className="text-sm font-medium text-white truncate">admin@messsystem.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;