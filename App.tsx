import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminAnalytics from './pages/AdminAnalytics';
import Settings from './pages/Settings';
import About from './pages/About';
import Documentation from './pages/Documentation';
import FeatureDetail from './pages/FeatureDetail';
import Wellness from './pages/Wellness';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const adminEmail = 'anaskessou4@gmail.com';

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
      <ErrorBoundary>
      <HashRouter>
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/feature/:featureId" element={<FeatureDetail />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={() => handleLogin('user@example.com')} />} />
            <Route 
              path="/dashboard" 
              element={<Dashboard />}         
            />
            <Route 
              path="/dashboard/settings" 
              element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={<AdminAnalytics />} 
            />
          </Routes>
        </div>
      </HashRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
