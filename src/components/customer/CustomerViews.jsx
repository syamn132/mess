import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Utensils, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownLeft, CreditCard, Calendar as CalendarIcon, ChevronRight, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// --- HOME VIEW ---
export const HomeView = ({ data, setActiveTab }) => {
  const { today, toggleSkipMeal, changeLocation, user, plans } = data;
  const planDetails = plans.find(p => p.id === user.currentPlan);
  const daysLeft = Math.ceil((new Date(user.subscriptionExpiry) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Daily Actions Card */}
      <div className="bg-gradient-to-br from-indigo-900/80 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Today's Meal</h2>
            <p className="text-indigo-200 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" /> Dispatching in 2 hours
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${today.skipped ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' : 'bg-green-500/20 text-green-300 border-green-500/30'}`}>
            {today.skipped ? 'Skipped' : 'Scheduled'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {/* Skip Meal Toggle */}
          <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-xl border border-slate-800/50 backdrop-blur-sm">
             <div className="flex items-center gap-3">
               <div className={`p-2 rounded-lg ${today.skipped ? 'bg-orange-500/20' : 'bg-slate-800'}`}>
                  <Utensils className={`w-5 h-5 ${today.skipped ? 'text-orange-400' : 'text-slate-400'}`} />
               </div>
               <div>
                 <p className="text-sm font-medium text-slate-200">Skip Meal</p>
                 <p className="text-xs text-slate-500">{today.skipped ? '+₹60 Refunded' : 'Tap to skip'}</p>
               </div>
             </div>
             <Switch checked={today.skipped} onCheckedChange={toggleSkipMeal} />
          </div>
          
          {/* Location Selector */}
          <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-xl border border-slate-800/50 backdrop-blur-sm">
             <div className="flex items-center gap-3 overflow-hidden flex-1">
               <div className="p-2 bg-slate-800 rounded-lg shrink-0">
                 <MapPin className="w-5 h-5 text-indigo-400" />
               </div>
               <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-400">Delivering to</p>
                  <select 
                    value={today.location}
                    onChange={(e) => changeLocation(e.target.value)}
                    className="bg-transparent text-sm font-medium text-slate-200 w-full focus:outline-none cursor-pointer appearance-none py-0.5"
                    disabled={today.skipped}
                  >
                    <option value="home">Home (Block A)</option>
                    <option value="office">Office (Tech Park)</option>
                    <option value="mess">Mess (Pickup)</option>
                  </select>
               </div>
             </div>
             <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer" onClick={() => setActiveTab('plans')}>
           <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Active Plan</h3>
                <p className="text-lg font-bold text-white">{planDetails?.name || 'No Active Plan'}</p>
              </div>
              <div className="bg-indigo-600/10 text-indigo-400 p-2 rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
           </div>
           {planDetails ? (
             <>
              <div className="w-full bg-slate-800 h-2 rounded-full mb-2 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(daysLeft / planDetails.days) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{daysLeft} days left</span>
                <span className="text-indigo-400 font-medium">Renew Plan</span>
              </div>
             </>
           ) : (
             <Button variant="outline" className="w-full mt-2 border-dashed border-slate-700 text-slate-400">Browse Plans</Button>
           )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center text-center">
             <span className="text-3xl font-bold text-white mb-1">{data.history.filter(h => h.status === 'delivered').length}</span>
             <span className="text-xs text-slate-400">Meals Enjoyed</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-slate-800" onClick={() => setActiveTab('wallet')}>
             <span className="text-3xl font-bold text-green-400 mb-1">₹{user.balance}</span>
             <span className="text-xs text-slate-400">Wallet Balance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PLANS VIEW ---
export const PlansView = ({ data }) => {
  const { plans, user, subscribeToPlan } = data;

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Subscription Plans</h2>
        <p className="text-slate-400">Choose a meal plan that fits your lifestyle</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isActive = user.currentPlan === plan.id;
          return (
            <div 
              key={plan.id} 
              className={`relative bg-slate-900 border rounded-xl p-6 flex flex-col ${isActive ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-800 hover:border-slate-600'} transition-all`}
            >
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  CURRENTLY ACTIVE
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                   <span className="text-3xl font-bold text-white">₹{plan.price.toLocaleString()}</span>
                   <span className="text-sm text-slate-500">/ {plan.days} days</span>
                </div>
                <p className="text-xs text-green-400 mt-1">₹{(plan.price / plan.days).toFixed(0)} per meal</p>
              </div>

              <div className="mt-auto space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> {plan.type === 'veg' ? 'Pure Veg Meals' : 'Veg + Non-Veg Options'}
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> Weekend Specials
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> Free Delivery
                  </div>
                </div>
                <Button 
                  className={`w-full ${isActive ? 'bg-slate-800 text-slate-400 cursor-default' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  disabled={isActive}
                  onClick={() => !isActive && subscribeToPlan(plan.id)}
                >
                  {isActive ? 'Active Plan' : 'Subscribe Now'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- HISTORY VIEW ---
export const HistoryView = ({ data }) => {
  const { history } = data;

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Meal History</h2>
        <p className="text-slate-400">Track your deliveries and skipped meals</p>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                item.status === 'skipped' ? 'bg-orange-500/10' : 'bg-green-500/10'
              }`}>
                {item.status === 'skipped' ? (
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1 mt-0.5">
                  <span className="capitalize">{item.meal}</span> • <span className="capitalize">{item.location}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
               {item.status === 'skipped' ? (
                 <div className="flex flex-col items-end">
                   <span className="text-orange-400 font-bold text-sm">Skipped</span>
                   <span className="text-xs text-slate-500">+₹{item.refund} Refund</span>
                 </div>
               ) : (
                 <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                   Delivered
                 </span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- WALLET VIEW ---
export const WalletView = ({ data }) => {
  const { user, transactions, topUpWallet } = data;
  const [topUpAmount, setTopUpAmount] = useState('');
  const [open, setOpen] = useState(false);

  const handleTopUp = () => {
    const amount = parseInt(topUpAmount);
    if (amount > 0) {
      topUpWallet(amount);
      setTopUpAmount('');
      setOpen(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
         
         <p className="text-indigo-100 font-medium mb-1">Total Balance</p>
         <h2 className="text-4xl font-bold mb-6">₹{user.balance.toLocaleString()}</h2>
         
         <div className="flex gap-3 relative z-10">
           <Dialog open={open} onOpenChange={setOpen}>
             <DialogTrigger asChild>
               <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 font-bold flex-1 sm:flex-none">
                  <ArrowUpRight className="w-4 h-4 mr-2" /> Top Up
               </Button>
             </DialogTrigger>
             <DialogContent className="bg-slate-900 border-slate-800 text-white">
               <DialogHeader>
                 <DialogTitle>Add Money to Wallet</DialogTitle>
               </DialogHeader>
               <div className="py-4 space-y-4">
                 <div className="grid grid-cols-3 gap-2">
                   {[100, 500, 1000].map(amt => (
                     <Button 
                      key={amt} 
                      variant="outline" 
                      onClick={() => setTopUpAmount(amt.toString())}
                      className={`border-slate-700 hover:bg-slate-800 ${topUpAmount === amt.toString() ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : ''}`}
                     >
                       ₹{amt}
                     </Button>
                   ))}
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm text-slate-400">Custom Amount (₹)</label>
                    <input 
                      type="number" 
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      placeholder="Enter amount" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
                    />
                 </div>
                 <Button onClick={handleTopUp} className="w-full bg-indigo-600 hover:bg-indigo-700">
                   Proceed to Pay
                 </Button>
               </div>
             </DialogContent>
           </Dialog>
           <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 flex-1 sm:flex-none">
              <CalendarIcon className="w-4 h-4 mr-2" /> History
           </Button>
         </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
               <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tx.description}</p>
                    <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleString()}</p>
                  </div>
               </div>
               <span className={`font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-white'}`}>
                 {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
               </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PROFILE VIEW ---
export const ProfileView = ({ data }) => {
  const { user, plans } = data;
  const planName = plans.find(p => p.id === user.currentPlan)?.name || 'No Active Plan';

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 ring-4 ring-slate-800 z-10">
          {user.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-white z-10">{user.name}</h2>
        <p className="text-slate-400 text-sm z-10">{user.email}</p>
        <p className="text-slate-500 text-xs mt-1 z-10">{user.phone}</p>
        
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/50 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-500" /> Subscription Details
          </h3>
          <div className="space-y-3 text-sm">
             <div className="flex justify-between py-2 border-b border-slate-800">
               <span className="text-slate-400">Current Plan</span>
               <span className="text-white font-medium">{planName}</span>
             </div>
             <div className="flex justify-between py-2 border-b border-slate-800">
               <span className="text-slate-400">Expiry Date</span>
               <span className="text-white font-medium">{new Date(user.subscriptionExpiry).toLocaleDateString()}</span>
             </div>
             <div className="flex justify-between py-2 border-b border-slate-800">
               <span className="text-slate-400">Status</span>
               <span className="text-green-400 font-medium">Active</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
             <MapPin className="w-4 h-4 text-indigo-500" /> Delivery Preferences
          </h3>
          <div className="space-y-3 text-sm">
             <div className="flex justify-between py-2 border-b border-slate-800">
               <span className="text-slate-400">Default Address</span>
               <span className="text-white font-medium text-right max-w-[200px] truncate">{user.address}</span>
             </div>
             <div className="flex justify-between py-2 border-b border-slate-800">
               <span className="text-slate-400">Default Location</span>
               <span className="text-white font-medium capitalize">{user.preferences.location}</span>
             </div>
          </div>
        </div>
        
        <Button variant="destructive" className="w-full mt-4">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );
};