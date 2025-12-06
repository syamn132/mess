import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreVertical, CheckCircle, XCircle, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CreateMessDialog from '@/components/CreateMessDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MessManagement = () => {
  const { toast } = useToast();
  const [messes, setMesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const savedMesses = localStorage.getItem('messes');
    if (savedMesses) {
      setMesses(JSON.parse(savedMesses));
    } else {
      const initialMesses = [
        {
          id: 1,
          name: 'Paradise Mess',
          owner: 'John Doe',
          email: 'john@paradise.com',
          plan: 'Premium',
          customers: 234,
          status: 'active',
          revenue: 6990
        },
        {
          id: 2,
          name: 'Sunrise Mess',
          owner: 'Jane Smith',
          email: 'jane@sunrise.com',
          plan: 'Standard',
          customers: 156,
          status: 'active',
          revenue: 4680
        },
        {
          id: 3,
          name: 'Royal Mess',
          owner: 'Mike Johnson',
          email: 'mike@royal.com',
          plan: 'Basic',
          customers: 89,
          status: 'suspended',
          revenue: 890
        }
      ];
      setMesses(initialMesses);
      localStorage.setItem('messes', JSON.stringify(initialMesses));
    }
  }, []);

  const handleCreateMess = (newMess) => {
    const messWithId = {
      ...newMess,
      id: Date.now(),
      customers: 0,
      status: 'active',
      revenue: 0
    };
    const updatedMesses = [...messes, messWithId];
    setMesses(updatedMesses);
    localStorage.setItem('messes', JSON.stringify(updatedMesses));
    
    toast({
      title: "Mess Created Successfully",
      description: `${newMess.name} has been added to the system.`,
    });
  };

  const handleToggleStatus = (messId) => {
    const updatedMesses = messes.map(mess => {
      if (mess.id === messId) {
        const newStatus = mess.status === 'active' ? 'suspended' : 'active';
        toast({
          title: `Mess ${newStatus === 'active' ? 'Activated' : 'Suspended'}`,
          description: `${mess.name} has been ${newStatus}.`,
        });
        return { ...mess, status: newStatus };
      }
      return mess;
    });
    setMesses(updatedMesses);
    localStorage.setItem('messes', JSON.stringify(updatedMesses));
  };

  const handleEdit = (mess) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const filteredMesses = messes.filter(mess =>
    mess.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mess.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mess.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search messes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-5 h-5" />
          Create New Mess
        </Button>
      </div>

      {/* Mess List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMesses.map((mess, index) => (
          <motion.div
            key={mess.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{mess.name}</h3>
                <p className="text-sm text-slate-400">{mess.owner}</p>
                <p className="text-xs text-slate-500 mt-1">{mess.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                  <DropdownMenuItem 
                    onClick={() => handleEdit(mess)}
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleToggleStatus(mess.id)}
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    {mess.status === 'active' ? (
                      <>
                        <XCircle className="w-4 h-4 mr-2" />
                        Suspend Mess
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Activate Mess
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  mess.status === 'active'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {mess.status === 'active' ? 'Active' : 'Suspended'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Plan</span>
                <span className="text-sm font-medium text-white">{mess.plan}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Customers</span>
                <span className="text-sm font-medium text-white">{mess.customers}</span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-sm text-slate-400">Monthly Revenue</span>
                <span className="text-lg font-bold text-green-500">${mess.revenue}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No messes found matching your search.</p>
        </div>
      )}

      <CreateMessDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateMess={handleCreateMess}
      />
    </div>
  );
};

export default MessManagement;