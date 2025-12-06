import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import DashboardStats from '@/components/DashboardStats';
import MessManagement from '@/components/MessManagement';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import Billing from '@/components/Billing';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const SuperAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardStats />;
      case 'mess-management': return <MessManagement />;
      case 'subscription-plans': return <SubscriptionPlans />;
      case 'billing': return <Billing />;
      default: return <DashboardStats />;
    }
  };

  return (
    <div className="flex h-full bg-slate-950">
      {/* Desktop Sidebar - Fixed Width */}
      <div className="hidden md:block w-64 shrink-0 h-full border-r border-slate-800 bg-slate-900/50">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          sidebarOpen={true}
          setSidebarOpen={() => {}}
          isDesktop={true}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Header for Mobile/Tablet */}
        <header className="md:hidden bg-slate-900/50 border-b border-slate-800 p-4 flex items-center justify-between shrink-0">
          <h2 className="font-semibold text-white">
            {activeSection === 'dashboard' && 'Dashboard'}
            {activeSection === 'mess-management' && 'Mess Management'}
            {activeSection === 'subscription-plans' && 'Plans'}
            {activeSection === 'billing' && 'Billing'}
          </h2>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-900 border-slate-800 p-0 w-64">
              <Sidebar 
                activeSection={activeSection} 
                setActiveSection={(section) => {
                  setActiveSection(section);
                  setIsMobileOpen(false);
                }}
                sidebarOpen={true}
                setSidebarOpen={() => {}}
              />
            </SheetContent>
          </Sheet>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
             <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;