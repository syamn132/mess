import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const INITIAL_STATE = {
  user: {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Block A, 204, Sunshine Apts',
    currentPlan: 'standard_veg',
    subscriptionExpiry: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), // Default fallback
    balance: 450,
    preferences: {
      location: 'home',
    }
  },
  history: [],
  transactions: [],
  today: {
    skipped: false,
    location: 'home',
    meal: 'North Indian Thali',
  }
};

const PLANS = [
  { id: 'trial', name: '7 Days Trial', price: 900, days: 7, type: 'veg', description: 'Perfect for testing the taste.' },
  { id: 'standard_veg', name: 'Monthly Standard (Veg)', price: 3500, days: 30, type: 'veg', description: 'Homely meals for daily needs.' },
  { id: 'premium_veg', name: 'Monthly Premium (Veg)', price: 4500, days: 30, type: 'veg', description: 'Includes special weekend treats & desserts.' },
  { id: 'standard_nonveg', name: 'Monthly Standard (Non-Veg)', price: 4200, days: 30, type: 'non-veg', description: 'Chicken/Egg dishes 3x a week.' },
];

export const useCustomer = () => {
  const [data, setData] = useState(INITIAL_STATE);
  const { toast } = useToast();

  // Fetch initial data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel fetch for better performance
        const [walletRes, ordersRes] = await Promise.all([
          fetch('/api/customers/get-wallet.php'),
          fetch('/api/customers/get-orders.php')
        ]);

        const walletData = await walletRes.json();
        const ordersData = await ordersRes.json();

        if (walletData && ordersData) {
          setData(prev => ({
            ...prev,
            user: {
              ...prev.user,
              // Merge API data with fallback for missing fields
              ...walletData.user, 
              balance: walletData.balance ?? prev.user.balance,
              currentPlan: walletData.currentPlan ?? prev.user.currentPlan,
              subscriptionExpiry: walletData.subscriptionExpiry ?? prev.user.subscriptionExpiry,
            },
            transactions: walletData.transactions || [],
            history: ordersData.orders || [],
            today: walletData.today || prev.today
          }));
        }
      } catch (error) {
        console.error("Failed to fetch initial customer data:", error);
        // Fallback to INITIAL_STATE is already handled by useState initialization
      }
    };

    fetchData();
  }, []);

  const toggleSkipMeal = async () => {
    const isSkipping = !data.today.skipped;
    
    // Optimistic UI update
    const previousData = { ...data };
    setData(prev => ({
      ...prev,
      today: { ...prev.today, skipped: isSkipping }
    }));

    try {
      const res = await fetch('/api/customers/skip-meal.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skipped: isSkipping })
      });
      const response = await res.json();

      if (response.success) {
        setData(prev => ({
          ...prev,
          user: { ...prev.user, balance: response.newBalance },
          transactions: response.transaction ? [response.transaction, ...prev.transactions] : prev.transactions,
          // Ensure today state is consistent with server if needed
          today: { ...prev.today, skipped: isSkipping } 
        }));
        toast({ 
          title: isSkipping ? "Meal Skipped" : "Meal Active", 
          description: isSkipping ? "Refund processed." : "Meal re-booked." 
        });
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (error) {
      // Revert on failure
      setData(previousData);
      toast({ title: "Error", description: "Failed to update meal status.", variant: "destructive" });
    }
  };

  const changeLocation = async (newLocation) => {
    const previousLocation = data.today.location;
    
    // Optimistic update
    setData(prev => ({
      ...prev,
      today: { ...prev.today, location: newLocation }
    }));
    
    toast({ title: "Location Updated", description: `Delivery location set to ${newLocation}.` });

    try {
      const res = await fetch('/api/customers/change-location.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: newLocation })
      });
      const response = await res.json();
      
      if (!response.success) {
        throw new Error(response.message || "Failed");
      }
    } catch (error) {
      setData(prev => ({ ...prev, today: { ...prev.today, location: previousLocation } }));
      toast({ title: "Error", description: "Could not update location.", variant: "destructive" });
    }
  };

  const topUpWallet = async (amount) => {
    try {
      const res = await fetch('/api/customers/topup-wallet.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const response = await res.json();

      if (response.success) {
        setData(prev => ({
          ...prev,
          user: { ...prev.user, balance: response.newBalance },
          transactions: response.transaction ? [response.transaction, ...prev.transactions] : prev.transactions
        }));
        toast({ title: "Payment Successful", description: `₹${amount} added to wallet.` });
      } else {
        toast({ title: "Error", description: response.message || "Payment failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Network error processing payment.", variant: "destructive" });
    }
  };

  const subscribeToPlan = async (planId) => {
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) return;

    if (data.user.balance < plan.price) {
      toast({ 
        title: "Insufficient Balance", 
        description: `Please add ₹${plan.price - data.user.balance} more to subscribe.`,
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await fetch('/api/customers/subscribe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      });
      const response = await res.json();

      if (response.success) {
        setData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            balance: response.newBalance,
            currentPlan: planId,
            subscriptionExpiry: response.subscriptionExpiry
          },
          transactions: response.transaction ? [response.transaction, ...prev.transactions] : prev.transactions
        }));
        toast({ title: "Subscribed!", description: `Active plan: ${plan.name}` });
      } else {
        toast({ title: "Error", description: response.message || "Subscription failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Network error.", variant: "destructive" });
    }
  };

  return {
    user: data.user,
    today: data.today,
    history: data.history,
    transactions: data.transactions,
    plans: PLANS,
    toggleSkipMeal,
    changeLocation,
    topUpWallet,
    subscribeToPlan
  };
};