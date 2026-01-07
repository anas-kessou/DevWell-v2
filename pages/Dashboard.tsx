
import React, { useState, useEffect } from 'react';
import { 
  Activity, LayoutDashboard, Settings as SettingsIcon, Flame, Zap, Brain, TrendingUp, Award, AlertCircle, Loader2, BarChart3, Sparkles, HeartPulse, RefreshCw, ShieldAlert, ShieldCheck
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CameraMonitor from '../components/CameraMonitor';
import HealthCharts from '../components/HealthCharts';
import SuggestionsBox from '../components/SuggestionsBox';
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
  
  // Intelligence State
  const [wellnessScore, setWellnessScore] = useState(92);
  const [zenCredits, setZenCredits] = useState(150);
  const [forecast, setForecast] = useState<BurnoutForecast | null>(null);
  const [blueprint, setBlueprint] = useState<BioBlueprint | null>(null);
  const [loadingOracle, setLoadingOracle] = useState(false);

  // Mock UID for demo
  const userId = "dev_alpha_01";

  useEffect(() => {
    // Initial data load from Firebase
    const loadData = async () => {
      const firebaseEvents = await FirebaseService.getHealthEvents(userId);
      setEvents(firebaseEvents);
    };
    loadData();
  }, []);

  const addEvent = async (event: Omit<HealthEvent, 'id' | 'timestamp'>) => {
    // Save to Firebase
    await FirebaseService.saveHealthEvent(userId, event);
    
    // Refresh local state (in a production app, use onSnapshot for real-time)
    const firebaseEvents = await FirebaseService.getHealthEvents(userId);
    setEvents(firebaseEvents);

    setWellnessScore(prev => event.severity === Severity.HIGH ? Math.max(0, prev - 10) : Math.max(0, prev - 4));
  };

  const generateInsights = async () => {
    if (events.length < 2) return;
    setLoadingOracle(true);
    try {
      const [fResult, bResult] = await Promise.all([
        GeminiService.getPredictiveForecast(events),
        GeminiService.generateBioBlueprint(events)
      ]);
      if (fResult) setForecast(fResult);
      if (bResult) setBlueprint(bResult);
    } catch (error) {
      console.error("Failed to generate insights:", error);
    } finally {
      setLoadingOracle(false);
    }
  };

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setZenCredits(c => c + 2);
        setWellnessScore(s => Math.min(100, s + 0.1));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-72 glass-card border-r border-white/5 flex flex-col z-30">
        <div className="p-10">
          <Link to="/" className="flex items-center gap-4 font-black text-2xl text-blue-500 tracking-tighter">
            <Activity size={32} className="neural-glow" />
            <span>DEVWELL</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-8 space-y-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`w-full flex items-center justify-between px-6 py-5 rounded-[24px] text-sm font-black transition-all ${
              location.pathname === '/dashboard' ? 'bg-blue-600 shadow-2xl shadow-blue-600/30' : 'text-slate-500 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard size={20} /> DASHBOARD
            </div>
          </button>
          <button 
            onClick={() => navigate('/dashboard/settings')}
            className={`w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black transition-all ${
              location.pathname === '/dashboard/settings' ? 'bg-blue-600 shadow-2xl shadow-blue-600/30 text-white' : 'text-slate-500 hover:bg-white/5'
            }`}
          >
            <SettingsIcon size={20} /> PRIVACY CORE
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black text-slate-500 hover:bg-white/5 transition-all">
            <Award size={20} /> ZEN REWARDS
          </button>
          
          <div className="pt-10 space-y-6">
            <div className="px-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Focus Optimizer</p>
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Brain size={16} className="text-blue-500" />
                  <span className="text-[11px] font-bold">ADHD Mode</span>
                </div>
                <button 
                  onClick={() => setIsADHDMode(!isADHDMode)}
                  className={`w-10 h-6 rounded-full transition-all relative ${isADHDMode ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isADHDMode ? 'left-5' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Secret Admin Trigger - Subtle icon at the bottom of sidebar */}
        <div className="px-8 pb-4 flex justify-start">
          <Link to="/admin" className="p-2 text-slate-800 hover:text-cyan-900 transition-colors">
            <ShieldAlert size={14} />
          </Link>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-[32px] shadow-2xl relative overflow-hidden group">
            <Sparkles className="absolute -top-2 -right-2 text-white/10 group-hover:scale-150 transition-transform duration-1000" size={80} />
            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">ZEN BALANCE</p>
            <h4 className="text-2xl font-black text-white mb-4">{zenCredits} <span className="text-sm font-bold opacity-60">Credits</span></h4>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white animate-pulse" style={{ width: `${(zenCredits % 500) / 5}%` }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto relative scrollbar-hide">
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 px-12 py-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h2 className="text-3xl font-black tracking-tighter">NEURAL HUB</h2>
            <div className="flex items-center gap-4 bg-orange-500/10 px-4 py-2 rounded-2xl border border-orange-500/20">
              <Flame size={18} className="text-orange-500" fill="currentColor" />
              <span className="text-xs font-black text-orange-400">14 DAY STREAK</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 border border-white/5 rounded-2xl px-6 py-3 flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-xs font-black tracking-widest uppercase">{isMonitoring ? 'Flow Synchronized' : 'Sensors Idle'}</span>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-[1400px] mx-auto space-y-12">
          {/* Top Intelligence Bar */}
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 glass-card rounded-[48px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-600/5 -z-10" />
               <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-900" />
                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={527} strokeDashoffset={527 - (527 * wellnessScore) / 100} className={`${wellnessScore > 70 ? 'text-blue-500' : 'text-orange-500'} transition-all duration-1000`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black tracking-tighter">{Math.round(wellnessScore)}%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Wellness</span>
                  </div>
               </div>
               <button 
                onClick={generateInsights}
                disabled={loadingOracle || events.length < 2}
                className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 py-5 rounded-[24px] text-xs font-black uppercase hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 group"
               >
                 {loadingOracle ? <RefreshCw className="animate-spin" size={16} /> : <Brain size={16} className="group-hover:animate-pulse" />}
                 Summon Neural Oracle
               </button>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <CameraMonitor onEventDetected={addEvent} isMonitoring={isMonitoring} setIsMonitoring={setIsMonitoring} />
            </div>
          </div>

          {/* Predictive Burnout & Bio-Blueprint (Prominent Section) */}
          {(forecast || blueprint) && (
            <div className="grid lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-10 duration-700">
              {forecast && (
                <div className="glass-card rounded-[40px] p-10 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-600/5 to-transparent flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-blue-500" />
                      <h3 className="text-xl font-black uppercase tracking-widest">Burnout Forecast</h3>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${forecast.riskScore > 70 ? 'bg-red-500/10 border-red-500/30 text-red-400' : forecast.riskScore > 40 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                      Risk Score: {forecast.riskScore}%
                    </div>
                  </div>
                  
                  <div className="space-y-8 flex-1">
                    <div className="h-32 flex items-end gap-3 px-2 border-b border-white/5 pb-2">
                      {forecast.forecastPath.map((v, i) => (
                        <div key={i} className="flex-1 bg-white/5 rounded-t-xl relative group overflow-hidden h-full flex flex-col justify-end">
                          <div className={`w-full rounded-t-xl transition-all duration-1000 ${v > 70 ? 'bg-red-500/40' : v > 40 ? 'bg-amber-500/40' : 'bg-blue-500/40'}`} style={{ height: `${v}%` }} />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity text-[10px] font-bold z-10">{v}%</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Neural Reasoning</p>
                        <p className="text-xs text-slate-300 leading-relaxed italic">"{forecast.reasoning}"</p>
                      </div>
                      
                      <div className="bg-blue-600/10 p-6 rounded-3xl border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <ShieldCheck className="text-blue-400" size={14} />
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Oracle's Action Plan</p>
                        </div>
                        <p className="text-xs font-bold text-slate-200 leading-relaxed">{forecast.actionPlan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {blueprint && (
                <div className="glass-card rounded-[40px] p-10 border-l-4 border-l-indigo-500 bg-gradient-to-br from-indigo-600/5 to-transparent flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <HeartPulse className="text-indigo-500" />
                    <h3 className="text-xl font-black uppercase tracking-widest">Bio-Blueprint</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6 flex-1">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Stretches</p>
                      {blueprint.suggestedStretches.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 group hover:bg-indigo-500/10 transition-colors">
                          <Zap size={12} className="text-indigo-400 group-hover:scale-125 transition-transform" />
                          <span className="text-xs font-bold">{s}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6">
                      <div className="bg-indigo-600/10 p-5 rounded-3xl border border-indigo-500/20">
                        <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Prime Focus Window</p>
                        <p className="text-sm font-black">{blueprint.productivityWindow}</p>
                      </div>
                      <div className="bg-slate-900/50 p-5 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Nutrition Fuel</p>
                        <p className="text-xs font-medium leading-tight text-slate-300">{blueprint.nutritionTip}</p>
                      </div>
                      <div className="pt-2">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Neural ID: DEV_01_SYNCS_OK</p>
                      </div>
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
            <div className="lg:col-span-4 space-y-10">
               <SuggestionsBox events={events} />
               <div className="glass-card rounded-[32px] p-8">
                 <h4 className="text-sm font-black uppercase tracking-widest mb-6">Neural Activity Stream</h4>
                 <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                    {events.length === 0 ? (
                      <div className="py-20 text-center opacity-30 text-xs font-bold uppercase tracking-widest">Waiting for neural burst...</div>
                    ) : events.map(e => (
                      <div key={e.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 hover:scale-[1.02] transition-transform">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${e.severity === Severity.HIGH ? 'bg-red-500/20 text-red-400' : 'bg-blue-600/20 text-blue-400'}`}>
                          <Zap size={20} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-tighter mb-1">{e.type}</p>
                          <p className="text-xs text-slate-400 leading-tight">{e.description}</p>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
               <FeedbackForm />
            </div>
          </div>
        </div>
        <ChatbotWidget isADHDMode={isADHDMode} />
      </main>
    </div>
  );
};

export default Dashboard;
