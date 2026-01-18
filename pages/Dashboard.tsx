import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, LayoutDashboard, Settings as SettingsIcon, Flame, Zap, Brain, TrendingUp, Award, Sparkles, RefreshCw, ShieldCheck, Lock, Play, Video, Star, ExternalLink, Mail, Shield, Book, Heart, Github, Linkedin, Menu, X, Globe
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CameraMonitor, { CameraMonitorHandle } from '../components/CameraMonitor';
import HealthCharts from '../components/HealthCharts';
import ActivityChart from '../components/ActivityChart';
import ChatbotWidget from '../components/ChatbotWidget';
import FeedbackForm from '../components/FeedbackForm';
import FatigueLineGraph from '../components/FatigueLineGraph';
import ProgressLineGraph from '../components/ProgressLineGraph';
import WeeklyActivityChart from '../components/WeeklyActivityChart';
import SpeedTestWidget from '../components/SpeedTestWidget';
import FocusTrendChart from '../components/FocusTrendChart';
import StressHeatmap from '../components/StressHeatmap';
import { HealthEvent, Severity, BurnoutForecast, BioBlueprint } from '../types';
import { GeminiService } from '../services/geminiService';
import { FirebaseService } from '../services/firebaseService';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useLanguage();
  const [events, setEvents] = useState<HealthEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isADHDMode, setIsADHDMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [tier, setTier] = useState<'free' | 'pro'>('free');
  
  const [wellnessScore, setWellnessScore] = useState(100);
  const [zenCredits, setZenCredits] = useState(50);
  const [forecast, setForecast] = useState<BurnoutForecast | null>(null);
  const [blueprint, setBlueprint] = useState<BioBlueprint | null>(null);
  const [loadingOracle, setLoadingOracle] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cameraRef = useRef<CameraMonitorHandle>(null);

  // New Analytics State
  const [dailyAlerts, setDailyAlerts] = useState(0);
  const [fatigueReadings, setFatigueReadings] = useState<any[]>([]);
  const [hourlyFatigue, setHourlyFatigue] = useState<any[]>([]);
  const [dailyAvgFatigue, setDailyAvgFatigue] = useState(0);
  const [currentFatigue, setCurrentFatigue] = useState(0);
  const [weeklyActivity, setWeeklyActivity] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);

  // Calculate Focus Trend Data
  const focusTrendData = React.useMemo(() => {
    // Filter for today's events (roughly)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todaysEvents = events.filter(e => e.timestamp >= todayStart.getTime());

    if (todaysEvents.length === 0) return undefined;

    const hourMap = new Map<number, HealthEvent[]>();
    todaysEvents.forEach(e => {
      const h = new Date(e.timestamp).getHours();
      const current = hourMap.get(h) || [];
      hourMap.set(h, [...current, e]);
    });

    const result = [];
    const nowHour = new Date().getHours();
    const startHour = Math.max(9, nowHour - 6);

    for (let h = startHour; h <= nowHour; h++) {
      const evts = hourMap.get(h) || [];
      // Base focus starts high in morning, drops over time + modifiers
      let focus = 90 - ((h - 9) * 2); 
      let distraction = 10;

      evts.forEach(e => {
        if (e.type === 'FATIGUE') focus -= (e.severity === 'HIGH' ? 25 : 10);
        if (e.type === 'STRESS') focus -= (e.severity === 'HIGH' ? 30 : 15);
        if (e.type === 'FOCUS') focus += (e.severity === 'HIGH' ? 20 : 10);
      });

      focus = Math.max(10, Math.min(100, focus));
      distraction = 100 - focus;

      result.push({
        time: `${h}:00`,
        focus,
        distraction
      });
    }
    return result;
  }, [events]);

  // Calculate Stress Heatmap Data (7x5 Grid)
  const stressHeatmapData = React.useMemo(() => {
    if (events.length === 0) return undefined;
    
    // 7 days (Mon-Sun) x 5 time slots
    const grid = Array(7).fill(0).map(() => Array(5).fill(0));
    const counts = Array(7).fill(0).map(() => Array(5).fill(0));

    events.forEach(e => {
      const d = new Date(e.timestamp);
      // JS Day: 0=Sun. We want 0=Mon, ..., 6=Sun
      let dayIndex = d.getDay() - 1;
      if (dayIndex < 0) dayIndex = 6;

      const h = d.getHours();
      let split = 4; // Night default
      if (h >= 6 && h < 11) split = 0; // Morning
      else if (h >= 11 && h < 14) split = 1; // Noon
      else if (h >= 14 && h < 18) split = 2; // Afternoon
      else if (h >= 18 && h < 22) split = 3; // Evening

      let score = 0;
      if (e.type === 'STRESS') score = e.severity === 'HIGH' ? 3 : 2;
      else if (e.type === 'FATIGUE') score = e.severity === 'HIGH' ? 2 : 1;
      
      grid[dayIndex][split] += score;
    });

    // Normalize to 0,1,2 for the component
    return grid.map(row => row.map(val => {
       if (val === 0) return 0;
       if (val < 5) return 1;
       return 2;
    }));
  }, [events]);

  useEffect(() => {
    const unsubscribe = FirebaseService.onAuthChange(async (user) => {
      if (user) {
        setCurrentUser(user);
        const [
            firebaseEvents, 
            userTier,
            alerts24h,
            fatigueData,
            hourlyFatigueData,
            activityData,
            progData
        ] = await Promise.all([
          FirebaseService.getHealthEvents(user.uid),
          FirebaseService.getUserSubscription(user.uid),
          FirebaseService.get24HourAlerts(user.uid),
          FirebaseService.getFatigueReadings(user.uid),
          FirebaseService.getHourlyFatigueAverage(user.uid),
          FirebaseService.get7DayActivity(user.uid),
          FirebaseService.getProgressData(user.uid)
        ]);
        setEvents(firebaseEvents);
        setDailyAlerts(alerts24h);
        setFatigueReadings(fatigueData);
        setHourlyFatigue(hourlyFatigueData);
        setWeeklyActivity(activityData);
        setProgressData(progData);
        
        // Calculate derived stats
        if (fatigueData.length > 0) {
            setCurrentFatigue(fatigueData[fatigueData.length - 1].level);
            if (hourlyFatigueData.length > 0) {
                 const avg = hourlyFatigueData.reduce((a, b) => a + b.avgFatigue, 0) / hourlyFatigueData.length;
                 setDailyAvgFatigue(Math.round(avg * 10) / 10);
            }
        }
        
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
    
    // Update local state immediately for responsiveness
    if (event.type === 'FATIGUE') {
        const level = event.fatigueLevel || 0; 
        setCurrentFatigue(level);
        setFatigueReadings(prev => [...prev, { timestamp: Date.now(), level }]);
        setDailyAlerts(prev => prev + 1);
    }
    
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

  const handleToggleTier = async () => {
    if (!currentUser) return;
    const newTier = tier === 'pro' ? 'free' : 'pro';
    // Optimistic update
    setTier(newTier);
    try {
        await FirebaseService.toggleTier(currentUser.uid, newTier);
    } catch (e) {
        // Revert if failed
        setTier(tier); 
        console.error("Failed to toggle tier");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 relative">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`w-72 glass-card border-r border-white/5 flex flex-col z-50 fixed inset-y-0 left-0 lg:static transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 font-black text-2xl text-blue-500 tracking-tighter">
            <Activity size={32} className="neural-glow" />
            <span>DEVWELL</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-8 space-y-3">
          <button onClick={() => navigate('/dashboard')} className={`w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black transition-all ${location.pathname === '/dashboard' ? 'bg-blue-600 shadow-2xl shadow-blue-600/30' : 'text-slate-500 hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> {t('dashboard')}
          </button>
          <button onClick={() => navigate('/dashboard/settings')} className="w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black text-slate-500 hover:bg-white/5 transition-all">
            <SettingsIcon size={20} /> {t('settings')}
          </button>
          <button onClick={() => navigate('/pricing', { state: { from: 'dashboard' } })} className="w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black text-blue-500 hover:bg-blue-500/10 transition-all">
            <Star size={20} fill={tier === 'pro' ? "currentColor" : "none"} /> {tier === 'pro' ? 'MANAGE PRO' : t('upgradeToPro')}
          </button>
          <button onClick={() => navigate('/docs', { state: { from: 'dashboard' } })} className="w-full flex items-center gap-3 px-6 py-5 rounded-[24px] text-sm font-black text-slate-500 hover:bg-white/5 transition-all">
            <Zap size={20} /> {t('howItWorks')}
          </button>

          <div className="px-2 pt-4">
             <div className="h-[280px]">
               <SpeedTestWidget />
             </div>
          </div>
        </nav>

        <div className="p-8">
          <div className={`p-6 rounded-[32px] shadow-2xl relative overflow-hidden group ${tier === 'pro' ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-slate-900 border border-white/5'}`}>
            <Sparkles className="absolute -top-2 -right-2 text-white/10 group-hover:scale-150 transition-transform duration-1000" size={80} />
            <div className="relative z-10">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">{t('status')}</p>
              
              <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-black text-white uppercase">{tier === 'pro' ? 'Zen Pro' : 'Free Tier'}</h4>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleTier();
                    }}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer hover:scale-110 active:scale-95"
                    title={`Switch to ${tier === 'pro' ? 'Free' : 'Pro'} View`}
                  >
                      <RefreshCw size={14} className="text-white" />
                  </button>
              </div>

              {tier === 'free' && (
                <button onClick={() => navigate('/pricing')} className="w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 transition-colors">{t('unlockOracle')}</button>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative scrollbar-hide w-full" dir={dir}>
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 px-6 py-6 lg:px-12 lg:py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
              <Menu size={24} />
            </button>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tighter">{t('neuralHub')}</h2>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`px-3 py-2 lg:px-4 lg:py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${voiceEnabled ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900 border-white/10 text-slate-500 hover:text-white'}`}
            >
              <span className="hidden sm:inline">{t('voice')} </span>{voiceEnabled ? t('on') : t('off')}
            </button>
            <button 
              onClick={() => setIsADHDMode(!isADHDMode)}
              className={`px-3 py-2 lg:px-4 lg:py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${isADHDMode ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 border-white/10 text-slate-500 hover:text-white'}`}
            >
              <span className="hidden sm:inline">{t('adhdMode')} </span>{isADHDMode ? t('on') : t('off')}
            </button>
            {tier === 'pro' && <div className="hidden xl:flex bg-amber-500/10 text-amber-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-amber-500/20 items-center gap-2"><Star size={12} fill="currentColor" /> {t('proEngineActive')}</div>}
            <div className="bg-slate-900 border border-white/5 rounded-2xl px-3 py-2 lg:px-6 lg:py-3 flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">{isMonitoring ? t('flowSynchronized') : t('sensorsIdle')}</span>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-12 max-w-[1400px] mx-auto space-y-8 lg:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-[32px] lg:rounded-[48px] p-6 lg:p-10 flex flex-col items-center justify-center text-center relative">
               <div className="relative w-40 h-40 lg:w-48 lg:h-48 mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-900" />
                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={527} strokeDashoffset={527 - (527 * wellnessScore) / 100} className="text-blue-500 transition-all duration-1000" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black">{Math.round(wellnessScore)}%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('wellnessScore')}</span>
                  </div>
               </div>
               <button 
                onClick={generateInsights}
                className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 py-5 rounded-[24px] text-xs font-black uppercase hover:scale-[1.02] transition-all relative group overflow-hidden"
               >
                 {loadingOracle ? <RefreshCw className="animate-spin" size={16} /> : (tier === 'free' ? <Lock size={16} /> : <Brain size={16} />)}
                 {tier === 'free' ? t('unlockOracle') : t('summonOracle')}
               </button>
            </div>
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

          <div className="space-y-6">
             <HealthCharts 
                  events={events} 
                  dailyAlertCount={dailyAlerts} 
                  currentFatigue={currentFatigue} 
                  dailyAvgFatigue={dailyAvgFatigue} 
               />

             <FocusTrendChart data={focusTrendData} />
               
             <div className="grid lg:grid-cols-2 gap-6">
                {tier === 'pro' ? (
                   <FatigueLineGraph data={fatigueReadings} />
                ) : (
                   <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden bg-slate-900/40">
                      <div className="absolute inset-0 bg-blue-600/5 blur-xl"></div>
                      <Lock className="mb-4 text-blue-500" size={32} />
                      <h3 className="font-bold text-lg text-white mb-2">{t('fatigueAnalysis')}</h3>
                      <p className="text-xs text-slate-400 mb-6 max-w-[200px]">Unlock real-time fatigue monitoring, cortisol heatmaps, and hourly breakdowns.</p>
                      <button onClick={() => navigate('/pricing')} className="px-6 py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase text-white hover:bg-blue-700 transition-colors">{t('unlockPro')}</button>
                   </div>
                )}
                <ActivityChart events={events} />
             </div>

             <div className="grid lg:grid-cols-2 gap-6">
                 {tier === 'pro' ? (
                    <>
                       <div className="lg:col-span-2">
                          <StressHeatmap data={stressHeatmapData} />
                       </div>
                       <WeeklyActivityChart data={weeklyActivity} />
                       <ProgressLineGraph data={progressData} />
                    </>
                 ) : (
                    <div className="lg:col-span-2 glass-card p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-blue-500/20 transition-all bg-slate-900/40">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <TrendingUp className="mb-6 text-slate-600 group-hover:text-blue-500 transition-colors" size={48} />
                        <h3 className="text-2xl font-black text-white mb-4">{t('advanceCareer')}</h3>
                        <p className="text-slate-400 max-w-lg mb-8">Zen Pro users get access to cortisol heatmaps, weekly productivity breakdown, burnout forecasting, and long-term velocity tracking.</p>
                        <button onClick={() => navigate('/pricing')} className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">{t('upgradeToPro')}</button>
                    </div>
                 )}
             </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 lg:p-12">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
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
                 <a href="https://github.com/anas-kessou" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                    <Github size={20} />
                 </a>
                 <a href="https://linkedin.com/in/anas-kessou" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                    <Linkedin size={20} />
                 </a>
                 <a href="mailto:anaskessou4@gmail.com" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                    <Mail size={20} />
                 </a>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-500">Legal & Support</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li><Link to="/docs" state={{ from: 'dashboard' }} className="hover:text-blue-400 transition-colors flex items-center gap-2"><Book size={14} /> Documentation</Link></li>
                <li><Link to="/privacy" state={{ from: 'dashboard' }} className="hover:text-blue-400 transition-colors flex items-center gap-2"><Shield size={14} /> Privacy Policy</Link></li>
                <li><Link to="/terms" state={{ from: 'dashboard' }} className="hover:text-blue-400 transition-colors flex items-center gap-2"><Lock size={14} /> Terms of Service</Link></li>
                <li><Link to="/support" state={{ from: 'dashboard' }} className="hover:text-blue-400 transition-colors flex items-center gap-2"><Heart size={14} /> Support Center</Link></li>
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
        voiceEnabled={voiceEnabled}
      />
      </main>
    </div>
  );
};

export default Dashboard;
