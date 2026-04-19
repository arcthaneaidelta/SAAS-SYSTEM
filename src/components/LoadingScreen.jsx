import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth random increment
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-primary"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo / Icon Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 p-4 rounded-3xl glass-panel relative overflow-hidden"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 360] 
            }}
            transition={{ 
              duration: 8, 
              ease: "linear", 
              repeat: Infinity 
            }}
            className="absolute inset-0 opacity-20 bg-gradient-to-tr from-accent1 to-transparent mix-blend-overlay"
          />
          <Activity size={48} className="text-accent1 drop-shadow-md relative z-10" />
        </motion.div>

        {/* Brand */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold tracking-tight mb-2"
        >
          Nova <span className="text-accent1">POS</span>
        </motion.h1>

        {/* Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-secondary text-sm mb-12 tracking-wide"
        >
          Preparing your dashboard experience...
        </motion.p>

        {/* Progress bar */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-1 bg-surface rounded-full overflow-hidden relative shadow-inner"
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent1 shadow-[0_0_8px_rgba(200,178,125,0.4)] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
