import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MoreHorizontal, ChevronDown, CheckCircle2, Clock, XCircle } from 'lucide-react';

const mockSales = Array.from({ length: 10 }).map((_, i) => ({
  id: `ORD-90${24 - i}`,
  date: 'Today, 12:4' + i + ' PM',
  customer: ['Alice W.', 'John D.', 'Sarah M.', 'Mike T.', 'Emma R.'][i % 5],
  items: ['2x Wagyu Burger, 1x Fries', '1x Truffle Pasta', '3x Caesar Salad, 2x Cola', '1x Ribeye Steak', '2x Lobster Bisque'][i % 5],
  total: [45.50, 24.00, 38.00, 85.00, 52.00][i % 5],
  status: ['completed', 'preparing', 'completed', 'cancelled', 'completed'][i % 5]
}));

export default function Sales() {
  const [filter, setFilter] = useState('all');

  const filteredSales = mockSales.filter(sale => {
    if (filter === 'all') return true;
    return sale.status === filter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Sales Tracking</h1>
          <p className="text-secondary text-sm">View and manage all recent transactions.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 glass-panel rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
            <Filter size={16} className="mr-2" /> Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-background rounded-xl text-sm font-medium hover:scale-95 transition-transform">
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
        {['all', 'completed', 'preparing', 'cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === tab 
                ? 'bg-accent1/20 text-accent1 border border-accent1/30' 
                : 'text-secondary hover:text-primary hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-elevated">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface/30">
                <th className="py-4 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Order ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Time</th>
                <th className="py-4 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Items</th>
                <th className="py-4 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredSales.map((sale, idx) => (
                  <motion.tr 
                    key={sale.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 last:border-0 table-row-hover"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-primary">{sale.id}</td>
                    <td className="py-4 px-6 text-sm text-secondary">{sale.date}</td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-primary">{sale.customer}</p>
                      <p className="text-xs text-secondary truncate w-48">{sale.items}</p>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">${sale.total.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                        ${sale.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                        ${sale.status === 'preparing' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                        ${sale.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                      `}>
                        {sale.status === 'completed' && <CheckCircle2 size={12} className="mr-1" />}
                        {sale.status === 'preparing' && <Clock size={12} className="mr-1" />}
                        {sale.status === 'cancelled' && <XCircle size={12} className="mr-1" />}
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-secondary hover:text-primary hover:bg-white/10 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredSales.length === 0 && (
            <div className="py-12 text-center text-secondary text-sm">
              No orders found for this filter.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
