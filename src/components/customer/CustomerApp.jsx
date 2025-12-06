import React, { useState } from 'react';
import { Calendar, Home, Wallet, History, User, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCustomer } from './useCustomer';
import { HomeView, PlansView, HistoryView, WalletView, ProfileView } from './CustomerViews';

const CustomerApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const customerData = useCustomer();

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView data={customerData} setActiveTab={setActiveTab} />;
      case 'menu': return <div className="p-8 text-center text-slate-500">Menu feature coming soon...</div>; // Placeholder as not requested in detail
      case 'plans': return <PlansView data={customerData} />;
      case 'history': return <HistoryView data={customerData} />;
      case 'wallet': return <WalletView data={customerData} />;
      case 'profile': return <ProfileView data={customerData} />;
      default: return <HomeView data={customerData} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Responsive Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('profile')}>
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center ring-2 ring-indigo-600/20">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-white">{customerData.user.name}</h1>
            <p className="text-xs text-slate-400 capitalize">
               {customerData.plans.find(p => p.id === customerData.user.currentPlan)?.name.split(' (')[0] || 'No Plan'}
            </p>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
          <DesktopNavLink active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={Home} label="Home" />
          <DesktopNavLink active={activeTab === 'plans'} onClick={() => setActiveTab('plans')} icon={CreditCard} label="Plans" />
          <DesktopNavLink active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={History} label="History" />
          <DesktopNavLink active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} icon={Wallet} label="Wallet" />
        </nav>

        <button 
          onClick={() => setActiveTab('wallet')}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
        >
          <Wallet className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-bold text-white">₹{customerData.user.balance}</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 custom-scrollbar">
        <div className="max-w-5xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden h-16 bg-slate-900 border-t border-slate-800 grid grid-cols-5 items-center px-2 shrink-0 z-20 safe-area-pb">
        <MobileNavButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <MobileNavButton icon={CreditCard} label="Plans" active={activeTab === 'plans'} onClick={() => setActiveTab('plans')} />
        <MobileNavButton icon={History} label="History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
        <MobileNavButton icon={Wallet} label="Wallet" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
        <MobileNavButton icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </div>
    </div>
  );
};

const DesktopNavLink = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium",
      active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" : "text-slate-400 hover:text-white hover:bg-slate-700/50"
    )}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const MobileNavButton = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 h-full w-full ${active ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
  >
    <Icon className={`w-5 h-5 ${active ? 'fill-indigo-400/20' : ''}`} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default CustomerApp;