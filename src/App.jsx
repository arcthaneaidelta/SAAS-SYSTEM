import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Staff from './pages/Staff';
import Menu from './pages/Menu';

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate initial heavy data load
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoad) {
    return <LoadingScreen onComplete={() => setInitialLoad(false)} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="staff" element={<Staff />} />
          <Route path="menu" element={<Menu />} />
        </Route>
        
        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
