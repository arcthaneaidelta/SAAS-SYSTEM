import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, DollarSign, TrendingUp, Users, Activity, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 6890 },
  { name: 'Sat', revenue: 8390 },
  { name: 'Sun', revenue: 4490 },
];

const liveOrdersData = [
  { id: 1, item: 'Truffle Pasta', time: 'Just now', status: 'preparing' },
  { id: 2, item: 'Wagyu Burger', time: '1m ago', status: 'ready' },
  { id: 3, item: 'Caesar Salad', time: '2m ago', status: 'delivered' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const [orders, setOrders] = useState(liveOrdersData);

  // Simulate incoming live orders
  useEffect(() => {
    const interval = setInterval(() => {
      const items = ['Margherita Pizza', 'Spicy Tuna Roll', 'Ribeye Steak', 'Lobster Bisque', 'Vegan Bowl'];
      const newItem = {
        id: Date.now(),
        item: items[Math.floor(Math.random() * items.length)],
        time: 'Just now',
        status: 'received'
      };
      
      setOrders(prev => [newItem, ...prev].slice(0, 5)); // Keep only latest 5
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-20"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
          <p className="text-secondary text-sm">Here's what's happening at your restaurant today.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm px-4 py-2 bg-surface border border-white/5 rounded-full shadow-sm text-secondary">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>System Online</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$12,480', sub: '+14% from last week', icon: DollarSign, color: 'text-accent1' },
          { title: 'Orders', value: '342', sub: '+5% from last week', icon: ShoppingBag, color: 'text-blue-400' },
          { title: 'Avg Order Value', value: '$36.50', sub: '+1.2% from last week', icon: TrendingUp, color: 'text-green-400' },
          { title: 'Active Staff', value: '12', sub: '3 on break', icon: Users, color: 'text-purple-400' },
        ].map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-card rounded-2xl p-6 hover-lift relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-surface border border-white/5 ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <h3 className="text-secondary text-sm font-medium mb-1 relative z-10">{kpi.title}</h3>
            <p className="text-2xl font-bold mb-2 relative z-10">{kpi.value}</p>
            <p className="text-xs text-secondary flex items-center relative z-10">
              <ArrowUpRight size={12} className="mr-1 text-green-500" />
              {kpi.sub}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div variants={itemVariants} className="xl:col-span-2 glass-panel rounded-3xl p-6 shadow-elevated">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Revenue Trend</h2>
              <p className="text-sm text-secondary">Weekly performance vs target</p>
            </div>
            <select className="bg-surface border border-white/10 rounded-lg px-3 py-1 text-sm text-secondary outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8B27D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C8B27D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A8ACB3', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A8ACB3', fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2C2F36', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#E8E9ED' }}
                  itemStyle={{ color: '#C8B27D' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#C8B27D" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Restaurant Pulse WOW FACTOR */}
        <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 flex flex-col relative overflow-hidden">
          {/* subtle scanning animation background */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 w-full h-[2px] bg-accent1/20 blur-sm z-0 pointer-events-none"
          />

          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex items-center space-x-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent1 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent1"></span>
              </div>
              <h2 className="text-lg font-semibold">Live Pulse</h2>
            </div>
            <Activity className="text-secondary" size={18} />
          </div>

          <div className="flex-1 overflow-hidden relative z-10 flex flex-col space-y-3">
            <AnimatePresence mode="popLayout">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="flex items-center p-3 rounded-xl bg-surface/50 border border-white/5 hover:border-accent1/30 transition-colors group"
                >
                  <div className="mr-3">
                    {order.status === 'received' && <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"><ShoppingBag size={14} /></div>}
                    {order.status === 'preparing' && <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center"><Activity size={14} /></div>}
                    {order.status === 'ready' && <div className="w-8 h-8 rounded-full bg-accent1/20 text-accent1 flex items-center justify-center"><CheckCircle2 size={14} /></div>}
                    {order.status === 'delivered' && <div className="w-8 h-8 rounded-full bg-surface text-secondary flex items-center justify-center"><CheckCircle2 size={14} /></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate group-hover:text-accent1 transition-colors">{order.item}</p>
                    <p className="text-xs text-secondary">{order.status.charAt(0).toUpperCase() + order.status.slice(1)} • Table {Math.floor(Math.random() * 20) + 1}</p>
                  </div>
                  <span className="text-xs font-mono text-secondary ml-2 whitespace-nowrap">{order.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 relative z-10 flex justify-between items-center text-xs text-secondary">
            <span>Updating real-time</span>
            <span className="flex items-center animate-pulse"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span> 14 Active Tickets</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
