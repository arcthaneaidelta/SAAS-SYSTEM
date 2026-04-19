import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, User, Shield, Briefcase } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { id: 'owner', label: 'Owner Account', icon: Shield, desc: 'Full system access & analytics' },
    { id: 'manager', label: 'Restaurant Manager', icon: Briefcase, desc: 'Daily operations & staff tracking' },
    { id: 'sales', label: 'Salesperson', icon: User, desc: 'Order entry & performance' }
  ];

  const handleLogin = () => {
    if (selectedRole) {
      navigate('/app/dashboard');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent1/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent2/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md glass-card rounded-2xl p-8 relative z-10 shadow-elevated"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Welcome to Nova <span className="text-accent1">POS</span></h2>
          <p className="text-secondary text-sm">Select your role to access the workspace</p>
        </div>

        <div className="space-y-4 mb-8">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full flex items-center p-4 rounded-xl border text-left transition-all duration-200 hover-lift ${
                  isSelected 
                    ? 'bg-accent1/10 border-accent1/50 shadow-[0_0_15px_rgba(200,178,125,0.1)]' 
                    : 'bg-surface/50 border-white/5 hover:border-white/10 hover:bg-surface'
                }`}
              >
                <div className={`p-3 rounded-lg mr-4 ${isSelected ? 'bg-accent1/20 text-accent1' : 'bg-background text-secondary'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className={`font-medium ${isSelected ? 'text-primary' : 'text-primary/90'}`}>
                    {role.label}
                  </h3>
                  <p className="text-xs text-secondary mt-1">{role.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          disabled={!selectedRole}
          onClick={handleLogin}
          className={`w-full py-4 rounded-xl flex items-center justify-center font-medium transition-all duration-300 btn-press ${
            selectedRole 
              ? 'bg-primary text-background hover:bg-white shadow-[0_4px_14px_0_rgba(232,233,237,0.39)]' 
              : 'bg-surface text-secondary cursor-not-allowed opacity-50'
          }`}
        >
          Enter Workspace
          <ChevronRight size={18} className="ml-2" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
