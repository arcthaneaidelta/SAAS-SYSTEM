import { motion } from 'framer-motion';
import { Plus, MoreVertical, Star, Flame, Leaf } from 'lucide-react';

const menuItems = [
  { id: 1, name: 'Wagyu Burger', price: 24.50, category: 'Mains', status: 'Active', popular: true },
  { id: 2, name: 'Truffle Pasta', price: 28.00, category: 'Mains', status: 'Active', popular: true },
  { id: 3, name: 'Caesar Salad', price: 14.00, category: 'Starters', status: 'Active', popular: false },
  { id: 4, name: 'Spicy Tuna Roll', price: 18.00, category: 'Starters', status: 'Sold Out', popular: true },
  { id: 5, name: 'Lobster Bisque', price: 16.00, category: 'Starters', status: 'Active', popular: false },
  { id: 6, name: 'Vegan Power Bowl', price: 19.00, category: 'Mains', status: 'Active', popular: false },
];

export default function Menu() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 relative h-full flex flex-col"
    >
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Menu & Products</h1>
          <p className="text-secondary text-sm">Manage dishes, categories, and inventory.</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {['All Items', 'Starters', 'Mains', 'Desserts', 'Beverages'].map((cat, i) => (
          <button 
            key={i}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap
              ${i === 0 ? 'bg-primary text-background' : 'glass-panel text-secondary hover:text-primary hover:bg-white/5'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {menuItems.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={item.id}
            className="glass-card rounded-2xl p-5 relative group hover-lift border border-white/5 hover:border-white/10"
          >
            <div className="absolute top-4 right-4 text-secondary hover:text-primary cursor-pointer p-1 rounded hover:bg-surface transition-colors">
              <MoreVertical size={16} />
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-surface mb-4 flex items-center justify-center text-secondary border border-white/5">
              {item.category === 'Mains' ? <Flame size={20} /> : <Leaf size={20} />}
            </div>
            
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-primary">{item.name}</h3>
              <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
            </div>
            
            <p className="text-xs text-secondary mb-4">{item.category}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider
                ${item.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}
              `}>
                {item.status}
              </span>
              
              {item.popular && (
                <span className="flex items-center text-xs text-accent1 font-medium bg-accent1/10 px-2 py-1 rounded-md">
                  <Star size={10} className="mr-1 fill-accent1" /> Popular
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button (FAB) */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="fixed bottom-10 right-10 w-14 h-14 bg-accent1 text-background rounded-2xl shadow-[0_10px_30px_rgba(200,178,125,0.4)] flex items-center justify-center hover:scale-105 hover:bg-white transition-all z-50 btn-press"
      >
        <Plus size={24} />
      </motion.button>
    </motion.div>
  );
}
