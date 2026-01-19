import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import MobileAppBanner from './components/MobileAppBanner';
import { FirebaseService } from './services/firebaseService';
import { LanguageProvider } from './contexts/LanguageContext';
import SensorMode from './pages/SensorMode';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const unsubscribe = FirebaseService.onAuthChange((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const adminEmail = 'anaskessou4@gmail.com';

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  if (isAuthLoading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-500">Loading...</div>;
  }

  return (
    <LanguageProvider>
      <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
        <ErrorBoundary>
        <MobileAppBanner />
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
              <Route path="/sensor-mode" element={<SensorMode />} />
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}         
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
    </LanguageProvider>
  );
};

export default App;
