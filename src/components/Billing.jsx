import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Billing = () => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    } else {
      const initialInvoices = [
        {
          id: 'INV-2025-001',
          messName: 'Paradise Mess',
          amount: 499,
          status: 'paid',
          date: '2025-12-01',
          plan: 'Premium'
        },
        {
          id: 'INV-2025-002',
          messName: 'Sunrise Mess',
          amount: 299,
          status: 'paid',
          date: '2025-12-01',
          plan: 'Standard'
        },
        {
          id: 'INV-2025-003',
          messName: 'Royal Mess',
          amount: 99,
          status: 'pending',
          date: '2025-12-01',
          plan: 'Basic'
        },
        {
          id: 'INV-2025-004',
          messName: 'Golden Mess',
          amount: 299,
          status: 'paid',
          date: '2025-11-28',
          plan: 'Standard'
        },
        {
          id: 'INV-2025-005',
          messName: 'Silver Mess',
          amount: 99,
          status: 'failed',
          date: '2025-11-25',
          plan: 'Basic'
        }
      ];
      setInvoices(initialInvoices);
      localStorage.setItem('invoices', JSON.stringify(initialInvoices));
    }
  }, []);

  const handleDownloadInvoice = (invoice) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.messName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paidInvoices = filteredInvoices.filter(inv => inv.status === 'paid');
  const pendingInvoices = filteredInvoices.filter(inv => inv.status === 'pending');
  const failedInvoices = filteredInvoices.filter(inv => inv.status === 'failed');

  const getStatusConfig = (status) => {
    switch (status) {
      case 'paid':
        return {
          icon: CheckCircle,
          className: 'bg-green-500/10 text-green-500',
          label: 'Paid'
        };
      case 'pending':
        return {
          icon: Clock,
          className: 'bg-yellow-500/10 text-yellow-500',
          label: 'Pending'
        };
      case 'failed':
        return {
          icon: XCircle,
          className: 'bg-red-500/10 text-red-500',
          label: 'Failed'
        };
      default:
        return {
          icon: Clock,
          className: 'bg-slate-500/10 text-slate-500',
          label: status
        };
    }
  };

  const InvoiceCard = ({ invoice, index }) => {
    const statusConfig = getStatusConfig(invoice.status);
    const StatusIcon = statusConfig.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{invoice.messName}</h3>
            <p className="text-sm text-slate-400">{invoice.id}</p>
          </div>
          <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
            <StatusIcon className="w-3 h-3" />
            {statusConfig.label}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Plan</span>
            <span className="text-sm text-white font-medium">{invoice.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Date</span>
            <span className="text-sm text-white">{invoice.date}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-800">
            <span className="text-sm text-slate-400">Amount</span>
            <span className="text-lg font-bold text-white">${invoice.amount}</span>
          </div>
        </div>

        <Button
          onClick={() => handleDownloadInvoice(invoice)}
          variant="outline"
          className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Invoice
        </Button>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-300">Total Paid</span>
          </div>
          <p className="text-3xl font-bold text-white">
            ${paidInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-green-400 mt-1">{paidInvoices.length} invoices</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-yellow-300">Pending</span>
          </div>
          <p className="text-3xl font-bold text-white">
            ${pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-yellow-400 mt-1">{pendingInvoices.length} invoices</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm text-red-300">Failed</span>
          </div>
          <p className="text-3xl font-bold text-white">
            ${failedInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-red-400 mt-1">{failedInvoices.length} invoices</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search invoices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Invoices Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-indigo-600">
            All ({filteredInvoices.length})
          </TabsTrigger>
          <TabsTrigger value="paid" className="data-[state=active]:bg-indigo-600">
            Paid ({paidInvoices.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-indigo-600">
            Pending ({pendingInvoices.length})
          </TabsTrigger>
          <TabsTrigger value="failed" className="data-[state=active]:bg-indigo-600">
            Failed ({failedInvoices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((invoice, index) => (
              <InvoiceCard key={invoice.id} invoice={invoice} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidInvoices.map((invoice, index) => (
              <InvoiceCard key={invoice.id} invoice={invoice} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingInvoices.map((invoice, index) => (
              <InvoiceCard key={invoice.id} invoice={invoice} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="failed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {failedInvoices.map((invoice, index) => (
              <InvoiceCard key={invoice.id} invoice={invoice} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;