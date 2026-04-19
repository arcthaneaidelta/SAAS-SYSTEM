import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Star } from 'lucide-react';

const staffData = [
  { id: 1, name: 'Liam Neeson', role: 'Lead Server', photo: 'LN', sales: 4250, target: 5000, rating: 4.9 },
  { id: 2, name: 'Emma Watson', role: 'Server', photo: 'EW', sales: 3800, target: 4000, rating: 4.8 },
  { id: 3, name: 'John Doe', role: 'Bartender', photo: 'JD', sales: 2900, target: 3000, rating: 4.7 },
  { id: 4, name: 'Sarah Smith', role: 'Server', photo: 'SS', sales: 2100, target: 4000, rating: 4.5 }
];

export default function Staff() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Staff Performance</h1>
        <p className="text-secondary text-sm">Track sales and tip goals across your team.</p>
      </div>

      {/* Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Top Seller', name: 'Liam Neeson', value: '$4,250', icon: Trophy, color: 'text-accent1' },
          { title: 'Goal Crusher', name: 'Emma Watson', value: '95%', icon: Target, color: 'text-blue-400' },
          { title: 'Most Improved', name: 'John Doe', value: '+14%', icon: TrendingUp, color: 'text-green-400' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            key={i} 
            className="glass-card rounded-2xl p-6 relative overflow-hidden group hover-lift"
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`p-2 rounded-lg bg-surface border border-white/5 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <p className="text-secondary mb-1 text-xs">{stat.title}</p>
            <h3 className="font-bold text-lg">{stat.name}</h3>
            <p className={`text-sm font-medium ${stat.color} mt-1`}>{stat.value}</p>
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-tl-[100px] blur-2xl pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Detailed Progress view */}
      <div className="glass-panel border border-white/5 rounded-3xl p-8">
        <h2 className="text-lg font-semibold mb-6">Weekly Targets</h2>
        
        <div className="space-y-6">
          {staffData.map((person, i) => {
            const progress = (person.sales / person.target) * 100;
            return (
              <motion.div 
                key={person.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="group relative"
              >
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center font-bold text-sm shadow-sm">
                      {person.photo}
                    </div>
                    <div>
                      <h4 className="font-medium text-primary text-sm">{person.name}</h4>
                      <p className="text-xs text-secondary">{person.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${person.sales.toLocaleString()} <span className="text-secondary font-normal">/ ${person.target.toLocaleString()}</span></p>
                    <p className="text-xs text-secondary flex items-center justify-end mt-0.5">
                      <Star size={10} className="text-accent1 mr-1 fill-accent1" /> {person.rating}
                    </p>
                  </div>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="h-2 w-full bg-surface rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
                    className={`h-full rounded-full relative ${progress >= 90 ? 'bg-accent1' : progress >= 70 ? 'bg-blue-400' : 'bg-surface border border-white/20'}`}
                  >
                    {/* Shimmer effect */}
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
}
