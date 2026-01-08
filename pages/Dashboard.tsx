import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, LayoutDashboard, Settings as SettingsIcon, Flame, Zap, Brain, TrendingUp, Award, Sparkles, RefreshCw, ShieldCheck, Lock, Play, Video, Star, ExternalLink, Mail, Shield, Book, Heart, Github, Twitter
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CameraMonitor, { CameraMonitorHandle } from '../components/CameraMonitor';
import HealthCharts from '../components/HealthCharts';
import ActivityChart from '../components/ActivityChart';
import ChatbotWidget from '../components/ChatbotWidget';
import FeedbackForm from '../components/FeedbackForm';
import { HealthEvent, Severity, BurnoutForecast, BioBlueprint } from '../types';
import { GeminiService } from '../services/geminiService';
import { FirebaseService } from '../services/firebaseService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState<HealthEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isADHDMode, setIsADHDMode] = useState(false);
  const [tier, setTier] = useState<'free' | 'pro'>('free');
  
  const [wellnessScore, setWellnessScore] = useState(100);
  const [zenCredits, setZenCredits] = useState(50);
  const [forecast, setForecast] = useState<BurnoutForecast | null>(null);
  const [blueprint, setBlueprint] = useState<BioBlueprint | null>(null);
  const [loadingOracle, setLoadingOracle] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const cameraRef = useRef<CameraMonitorHandle>(null);

  useEffect(() => {
    const unsubscribe = FirebaseService.onAuthChange(async (user) => {
      if (user) {
        setCurrentUser(user);
        const [firebaseEvents, userTier] = await Promise.all([
          FirebaseService.getHealthEvents(user.uid),
          FirebaseService.getUserSubscription(user.uid)
        ]);
        setEvents(firebaseEvents);
        
        // Calculate dynamic wellness score based on events
        const newScore = Math.max(0, 100 - firebaseEvents.reduce((acc, e) => {
          return acc + (e.severity === Severity.HIGH ? 10 : 4);
        }, 0));
        setWellnessScore(newScore);

        setTier(userTier);
      } else {
        // Enforce authentication
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const addEvent = async (event: Omit<HealthEvent, 'id' | 'timestamp'>) => {
    if (!currentUser) return;
    await FirebaseService.saveHealthEvent(currentUser.uid, event);
    
    // Optimistic update or refetch
    // const firebaseEvents = await FirebaseService.getHealthEvents(currentUser.uid);
    // setEvents(firebaseEvents);
    
    // Better: just add to local state to avoid extra fetch if needed, but fetching ensures consistency
    const firebaseEvents = await FirebaseService.getHealthEvents(currentUser.uid);
    setEvents(firebaseEvents);
    
    setWellnessScore(prev => event.severity === Severity.HIGH ? Math.max(0, prev - 10) : Math.max(0, prev - 4));
  };

  const generateInsights = async () => {
    if (tier === 'free') {
      navigate('/pricing');
      return;
    }
    if (events.length < 2) return;
    setLoadingOracle(true);
    try {
      const [fResult, bResult] = await Promise.all([
        GeminiService.getPredictiveForecast(events),
        GeminiService.generateBioBlueprint(events)
      ]);
      if (fResult) setForecast(fResult);
      if (bResult) setBlueprint(bResult);
    } finally {
      setLoadingOracle(false);
    }
  };

  const generateMeditation = async () => {
    if (tier === 'free') {
        navigate('/pricing');
        return;
    }
    setLoadingOracle(true);
    const url = await GeminiService.generateWellnessVideo("Calm forest with a stream, soft lighting, 4k");
    setVideoUrl(url);
    setLoadingOracle(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <aside className="w-72 glass-card border-r border-white/5 flex flex-col z-30">
        <div className="p-10">
          <Link to="/" className="flex items-center gap-4 font-black text-2xl text-blue-500 tracking-tighter">
            <Activity size={32} className="neural-glow" />
            <span>DEVWELL</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-8 space-y-3">
          <button onClick={() => navigate('/dashboard')} className={`w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black transition-all ${location.pathname === '/dashboard' ? 'bg-blue-600 shadow-2xl shadow-blue-600/30' : 'text-slate-500 hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> DASHBOARD
          </button>
          <button onClick={() => navigate('/dashboard/settings')} className="w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black text-slate-500 hover:bg-white/5 transition-all">
            <SettingsIcon size={20} /> SETTINGS
          </button>
          <button onClick={() => navigate('/pricing')} className="w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black text-blue-500 hover:bg-blue-500/10 transition-all">
            <Star size={20} fill={tier === 'pro' ? "currentColor" : "none"} /> {tier === 'pro' ? 'MANAGE PRO' : 'UPGRADE TO PRO'}
          </button>
          <button onClick={() => navigate('/docs')} className="w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black text-slate-500 hover:bg-white/5 transition-all">
            <Zap size={20} /> HOW IT WORKS
          </button>
        </nav>

        <div className="p-8">
          <div className={`p-6 rounded-[32px] shadow-2xl relative overflow-hidden group ${tier === 'pro' ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-slate-900 border border-white/5'}`}>
            <Sparkles className="absolute -top-2 -right-2 text-white/10 group-hover:scale-150 transition-transform duration-1000" size={80} />
            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Status</p>
            <h4 className="text-xl font-black text-white mb-4 uppercase">{tier === 'pro' ? 'Zen Pro' : 'Free Tier'}</h4>
            {tier === 'free' && (
              <button onClick={() => navigate('/pricing')} className="w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase">Unlock Oracle</button>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative scrollbar-hide">
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 px-12 py-8 flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tighter">NEURAL HUB</h2>
          <div className="flex items-center gap-4">
            {tier === 'pro' && <div className="bg-amber-500/10 text-amber-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-amber-500/20 flex items-center gap-2"><Star size={12} fill="currentColor" /> Pro Engine Active</div>}
            <div className="bg-slate-900 border border-white/5 rounded-2xl px-6 py-3 flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-xs font-black uppercase tracking-widest">{isMonitoring ? 'Flow Synchronized' : 'Sensors Idle'}</span>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-[1400px] mx-auto space-y-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 glass-card rounded-[48px] p-10 flex flex-col items-center justify-center text-center relative">
               <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-900" />
                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={527} strokeDashoffset={527 - (527 * wellnessScore) / 100} className="text-blue-500 transition-all duration-1000" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black">{Math.round(wellnessScore)}%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Wellness</span>
                  </div>
               </div>
               <button 
                onClick={generateInsights}
                className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 py-5 rounded-[24px] text-xs font-black uppercase hover:scale-[1.02] transition-all relative group overflow-hidden"
               >
                 {loadingOracle ? <RefreshCw className="animate-spin" size={16} /> : (tier === 'free' ? <Lock size={16} /> : <Brain size={16} />)}
                 {tier === 'free' ? 'Unlock Neural Oracle' : 'Summon Neural Oracle'}
               </button>
            </div>
            <div className="lg:col-span-8">
              <CameraMonitor ref={cameraRef} onEventDetected={addEvent} isMonitoring={isMonitoring} setIsMonitoring={setIsMonitoring} />
              {/* <div className="p-10 text-center border border-dashed border-slate-700 rounded-2xl">Camera Monitor Disabled for Debugging</div> */}
            </div>
          </div>

          {tier === 'pro' && (
            <div className="glass-card rounded-[48px] p-12 border border-blue-500/20 bg-gradient-to-br from-blue-600/5 to-transparent">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Video className="text-blue-500" />
                  <h3 className="text-xl font-black uppercase tracking-tight">Neural Meditation Engine (Veo)</h3>
                </div>
                <button 
                  onClick={generateMeditation}
                  disabled={loadingOracle}
                  className="bg-blue-600 px-6 py-3 rounded-2xl text-xs font-black uppercase flex items-center gap-2 hover:bg-blue-700 transition-all"
                >
                  {loadingOracle ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                  Generate Deep Session
                </button>
              </div>
              
              {videoUrl ? (
                <div className="aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                  <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video rounded-[32px] bg-slate-900/50 flex flex-col items-center justify-center text-slate-500 border border-white/5 border-dashed">
                  <Video size={48} className="mb-4 opacity-20" />
                  <p className="text-xs font-black uppercase tracking-widest">Awaiting Neural Prompt...</p>
                </div>
              )}
            </div>
          )}

          {(forecast || blueprint) && (
            <div className="grid lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-10 duration-700">
              {forecast && (
                <div className="glass-card rounded-[40px] p-10 border-l-4 border-l-blue-500 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black uppercase">Burnout Forecast</h3>
                    <div className="px-4 py-2 rounded-xl text-[10px] font-black uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      Risk: {forecast.riskScore}%
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic mb-6">"{forecast.reasoning}"</p>
                  <div className="bg-blue-600/10 p-6 rounded-3xl border border-blue-500/20">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Pro Action Plan</p>
                    <p className="text-xs font-bold">{forecast.actionPlan}</p>
                  </div>
                </div>
              )}
              {blueprint && (
                <div className="glass-card rounded-[40px] p-10 border-l-4 border-l-indigo-500 flex flex-col">
                  <h3 className="text-xl font-black uppercase mb-8">Bio-Blueprint</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-4">Prime Window</p>
                      <p className="text-sm font-black">{blueprint.productivityWindow}</p>
                    </div>
                    <div className="space-y-4">
                      {blueprint.suggestedStretches.slice(0, 2).map((s, i) => (
                        <div key={i} className="text-xs font-bold p-3 bg-white/5 rounded-xl border border-white/5">{s}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
               <HealthCharts events={events} />
            </div>
            <div className="lg:col-span-4 h-full">
               <ActivityChart />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm p-12">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3 font-bold text-2xl text-white">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Activity size={24} />
                </div>
                <span>DevWell</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Built by <span className="text-white font-bold">Anas Kessou</span>. DevWell employs advanced AI to synchronize your biological rhythm with your development workflow, ensuring peak performance without burnout.
              </p>
              <div className="flex items-center gap-4">
                 <a href="https://github.com/anaskessou" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                    <Github size={20} />
                 </a>
                 <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                    <Twitter size={20} />
                 </a>
                 <a href="mailto:support@devwell.ai" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                    <Mail size={20} />
                 </a>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-500">Legal & Support</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li><Link to="/docs" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Book size={14} /> Documentation</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Shield size={14} /> Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Lock size={14} /> Terms of Service</Link></li>
                <li><Link to="/support" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Heart size={14} /> Support Center</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Feedback Loop</h4>
              <FeedbackForm />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <p>© 2026 DevWell Protocol. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Operational
            </p>
          </div>
        </footer>

              
      <ChatbotWidget 
        isADHDMode={isADHDMode} 
        healthEvents={events}
        cameraRef={cameraRef}
      />
      </main>
    </div>
  );
};

export default Dashboard;
