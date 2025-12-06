import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, LayoutDashboard, User, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SuperAdminDashboard from '@/components/super-admin/SuperAdminDashboard';
import MessAdminDashboard from '@/components/mess-admin/MessAdminDashboard';
import CustomerApp from '@/components/customer/CustomerApp';
import DeliveryApp from '@/components/delivery/DeliveryApp';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Dashboard = () => {
  const [currentApp, setCurrentApp] = useState('super-admin');

  const renderCurrentApp = () => {
    switch (currentApp) {
      case 'super-admin':
        return <SuperAdminDashboard />;
      case 'mess-admin':
        return <MessAdminDashboard />;
      case 'customer':
        return <CustomerApp />;
      case 'delivery':
        return <DeliveryApp />;
      default:
        return <SuperAdminDashboard />;
    }
  };

  const NavButtons = ({ mobile = false, onItemClick }) => (
    <div className={`flex flex-col gap-4 w-full ${mobile ? 'px-0' : 'px-2'}`}>
      <NavButton
        active={currentApp === 'super-admin'}
        onClick={() => { setCurrentApp('super-admin'); onItemClick?.(); }}
        icon={ShieldCheck}
        label="Super Admin"
        mobile={mobile}
      />
      <NavButton
        active={currentApp === 'mess-admin'}
        onClick={() => { setCurrentApp('mess-admin'); onItemClick?.(); }}
        icon={LayoutDashboard}
        label="Mess Admin"
        mobile={mobile}
      />
      <NavButton
        active={currentApp === 'customer'}
        onClick={() => { setCurrentApp('customer'); onItemClick?.(); }}
        icon={User}
        label="Customer App"
        mobile={mobile}
      />
      <NavButton
        active={currentApp === 'delivery'}
        onClick={() => { setCurrentApp('delivery'); onItemClick?.(); }}
        icon={Truck}
        label="Delivery App"
        mobile={mobile}
      />
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-100">
      {/* Desktop Sidebar (App Switcher) */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-20 bg-slate-900 border-r border-slate-800 flex-col items-center py-6 gap-6">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4 shrink-0">
          <span className="font-bold text-xl text-white">M</span>
        </div>
        <NavButtons />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-20 relative">
        {/* Mobile Header & App Switcher */}
        <div className="lg:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between shrink-0 z-40 relative">
           <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-300">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-slate-900 border-slate-800 w-72 p-6 text-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="font-bold text-xl">M</span>
                  </div>
                  <h2 className="text-lg font-bold">Switch App</h2>
                </div>
                <NavButtons mobile={true} />
              </SheetContent>
            </Sheet>
            <span className="font-bold text-white">
              {currentApp === 'super-admin' && 'Super Admin'}
              {currentApp === 'mess-admin' && 'Mess Admin'}
              {currentApp === 'customer' && 'Customer App'}
              {currentApp === 'delivery' && 'Delivery Partner'}
            </span>
           </div>
        </div>

        {/* App Content Container */}
        <div className="flex-1 overflow-hidden bg-slate-950 relative">
          {renderCurrentApp()}
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label, mobile }) => (
  <Button
    variant={active ? 'default' : 'ghost'}
    onClick={onClick}
    className={`
      ${mobile ? 'w-full justify-start h-12 px-4' : 'w-full h-12 w-12 p-0 justify-center rounded-xl'}
      ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
      transition-all duration-200
    `}
    title={label}
  >
    <Icon className={`${mobile ? 'w-5 h-5 mr-3' : 'w-5 h-5'}`} />
    {mobile && <span className="font-medium">{label}</span>}
  </Button>
);

export default Dashboard;