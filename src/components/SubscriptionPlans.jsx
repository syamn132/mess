import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SubscriptionPlans = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    const savedPlans = localStorage.getItem('subscriptionPlans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    } else {
      const initialPlans = [
        {
          id: 1,
          name: 'Basic',
          price: 99,
          features: [
            'Up to 100 customers',
            'Basic analytics',
            'Email support',
            'Mobile app access',
            'Standard security'
          ]
        },
        {
          id: 2,
          name: 'Standard',
          price: 299,
          popular: true,
          features: [
            'Up to 500 customers',
            'Advanced analytics',
            'Priority email & chat support',
            'Mobile app access',
            'Enhanced security',
            'Custom branding'
          ]
        },
        {
          id: 3,
          name: 'Premium',
          price: 499,
          features: [
            'Unlimited customers',
            'Real-time analytics',
            '24/7 phone & chat support',
            'Mobile app access',
            'Premium security',
            'Custom branding',
            'API access',
            'Dedicated account manager'
          ]
        }
      ];
      setPlans(initialPlans);
      localStorage.setItem('subscriptionPlans', JSON.stringify(initialPlans));
    }
  }, []);

  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSavePlan = () => {
    const updatedPlans = plans.map(plan =>
      plan.id === editingPlan.id ? editingPlan : plan
    );
    setPlans(updatedPlans);
    localStorage.setItem('subscriptionPlans', JSON.stringify(updatedPlans));
    
    toast({
      title: "Plan Updated",
      description: `${editingPlan.name} plan has been updated successfully.`,
    });
    
    setEditingPlan(null);
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Subscription Plans</h3>
        <p className="text-sm text-slate-400">
          Manage pricing and features for each subscription tier. Changes will affect new subscriptions only.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const isEditing = editingPlan?.id === plan.id;
          const currentPlan = isEditing ? editingPlan : plan;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-slate-900 border rounded-xl p-6 ${
                plan.popular
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentPlan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    {isEditing ? (
                      <input
                        type="number"
                        value={currentPlan.price}
                        onChange={(e) => setEditingPlan({
                          ...editingPlan,
                          price: parseInt(e.target.value) || 0
                        })}
                        className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-3xl font-bold text-white focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-white">${currentPlan.price}</span>
                    )}
                    <span className="text-slate-400">/month</span>
                  </div>
                </div>
                
                {!isEditing ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditPlan(plan)}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSavePlan}
                      className="text-green-500 hover:text-green-400 hover:bg-slate-800"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-400 hover:bg-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <ul className="space-y-3">
                {currentPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;