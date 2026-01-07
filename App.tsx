
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Activity, 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  User, 
  LogOut, 
  Brain, 
  Zap,
  Coffee,
  Bell,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminAnalytics from './pages/AdminAnalytics';
import Settings from './pages/Settings';
import About from './pages/About';
import Wellness from './pages/Wellness';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setDarkMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
      <HashRouter>
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard/settings" 
              element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
            />
            {/* Secret Admin Route */}
            <Route 
              path="/admin" 
              element={isAuthenticated ? <AdminAnalytics /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
