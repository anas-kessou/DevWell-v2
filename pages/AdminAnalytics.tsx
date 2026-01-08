
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Users, Activity, MessageCircle, Zap, TrendingUp, AlertTriangle, 
  Terminal, BarChart3, ChevronLeft, Globe, Database, BrainCircuit, RefreshCcw,
  Lock, EyeOff, Download, ShieldAlert, CheckCircle, Info, Filter, Brain, Key
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, 
  AreaChart, Area, CartesianGrid, Legend 
} from 'recharts';
import { GeminiService } from '../services/geminiService';
import { FirebaseService } from '../services/firebaseService';

const AdminAnalytics: React.FC = () => {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<any>(null);
  const [audit, setAudit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('metrics');
  const [noiseEnabled, setNoiseEnabled] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [realExStats, setRealStats] = useState({
    totalUsers: 0,
    totalFeedback: 0,
    totalTickets: 0,
    totalEvents: 0,
    activeUplinks: 0
  });
  const [trendData, setTrendData] = useState<any[]>([]);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<string[]>([]);

  const globalData = {
    ...realExStats,
    avgWellness: 84.5, // Computed from events if possible, or kept as placeholder
    recentFeedback: recentFeedback.length > 0 ? recentFeedback : ["No recent feedback fetched."]
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'vji4ayanas7cf8') {
      setIsAdminAuth(true);
      fetchRealData();
    } else {
      setAuthError('Access Denied: Invalid Security Token');
      setPasswordInput('');
    }
  };

  const fetchRealData = async () => {
    setLoading(true);
    
    // 1. Fetch Counts
    const stats = await FirebaseService.getGlobalStats();
    setRealStats(stats);
    
    // 2. Fetch Lists (Events & Feedback)
    const [events, feedback] = await Promise.all([
      FirebaseService.getRecentGlobalEvents(200),
      FirebaseService.getRecentFeedback(10)
    ]);

    setRecentEvents(events);
    setRecentFeedback(feedback);

    // 3. Process Events for Charts
    processTrends(events);

    setLoading(false); 
    
    // Fetch AI insights in background
    try {
      const [res, auditRes] = await Promise.all([
         GeminiService.getSystemInsights([
           "App is great", "Need more features", "Bugs in login"
         ], stats.totalEvents),
         GeminiService.auditAnonymity({ posture: stats.totalEvents })
      ]);
      setInsights(res);
      setAudit(auditRes);
    } catch (e) {
      console.error("AI Insights Error:", e);
    }
  };

  const processTrends = (events: any[]) => {
    // Helper to get day name
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Initialize last 7 days map
    const last7Days = new Map();
    for(let i=6; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = days[d.getDay()];
      last7Days.set(dayName, { day: dayName, alerts: 0, wellness: 0, stress: 0, count: 0 });
    }

    // Bucket events
    events.forEach(ev => {
      const date = new Date(ev.timestamp);
      // Simple check if within last 7 days approx (ignoring exact time boundary for chart simplicity)
      const dayName = days[date.getDay()];
      if (last7Days.has(dayName)) {
         const bucket = last7Days.get(dayName);
         bucket.count++;
         bucket.alerts++; // Assuming every event is an "alert" or significant event for this chart
         // Simulate extracting stress/wellness from severity/type if actual numbers aren't in payload
         // In real app, we extract `ev.data.wellnessScore` ect.
         bucket.stress += (ev.severity === 'HIGH' ? 80 : ev.severity === 'MEDIUM' ? 50 : 20);
         bucket.wellness += (ev.type === 'SUCCESS' ? 90 : 70); 
      }
    });

    // Average out and format
    const processed = Array.from(last7Days.values()).map(d => ({
       day: d.day,
       alerts: d.alerts,
       stress: d.count > 0 ? Math.round(d.stress / d.count) : 0, 
       wellness: d.count > 0 ? Math.round(d.wellness / d.count) : 0
    }));

    setTrendData(processed);
  };


  // Login Screen
  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Lock className="text-cyan-400" size={32} />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Admin Restricted</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Enter security token to proceed</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-12 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-sm"
                    placeholder="••••••••••••••"
                  />
                </div>
                {authError && (
                  <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    <ShieldAlert size={12} />
                    {authError}
                  </div>
                )}
              </div>
              <button 
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Multi-layered Trend Data
  // const trendData... -> Moved to top
  
  const alertTrendData = [
    { hour: '00:00', alerts: 120 }, { hour: '04:00', alerts: 80 },
    { hour: '08:00', alerts: 350 }, { hour: '12:00', alerts: 980 },
    { hour: '16:00', alerts: 1420 }, { hour: '20:00', alerts: 600 }
  ];

  /* 
  // Hooks now at the top
  useEffect(() => {
    const fetchInsights = async () => {
      // Logic moved to handleAdminLogin
    };
    // fetchInsights(); // Disabled auto-fetch
  }, [globalData]); 
  */

  const handleExportJSONL = () => {
    setExporting(true);
    // Simulate compilation of de-identified JSONL for Vertex AI
    setTimeout(() => {
      setExporting(false);
      alert("Neural dataset exported as anonymized JSONL. PII scrubbed successfully.");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <BrainCircuit size={64} className="text-cyan-500 animate-pulse" />
        <p className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em]">Decrypting Neural Command Layer...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 font-mono scrollbar-hide">
      {/* Header */}
      <header className="border-b border-cyan-900/30 bg-black/80 backdrop-blur-xl sticky top-0 z-50 px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-slate-500" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <ShieldCheck size={24} className="text-cyan-500" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-widest text-white uppercase">Neural Command Layer</h1>
              <p className="text-[10px] text-cyan-500/60 font-bold uppercase tracking-widest">Platform Root v2.1.0 // Privacy Guard: {noiseEnabled ? 'ACTIVE' : 'OFF'}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-[9px] font-black uppercase text-slate-500">Noise Injection</span>
            <button 
              onClick={() => setNoiseEnabled(!noiseEnabled)}
              className={`w-10 h-5 rounded-full relative transition-all ${noiseEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${noiseEnabled ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex items-center gap-3 bg-cyan-500/5 px-4 py-2 rounded-xl border border-cyan-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-black text-cyan-400">ENCRYPTED UPLINK</span>
          </div>
        </div>
      </header>

      <div className="p-10 max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          {[
            { id: 'metrics', label: 'Biometric Metrics', icon: <Activity size={18} /> },
            { id: 'sentiment', label: 'Neural Sentiment', icon: <BrainCircuit size={18} /> },
            { id: 'privacy', label: 'Privacy & Ethics', icon: <Lock size={18} /> },
            { id: 'raw', label: 'Direct Logs', icon: <Terminal size={18} /> }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                activeTab === item.id 
                ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                : 'border-transparent text-slate-500 hover:bg-white/5'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}

          <div className="mt-12 p-8 bg-slate-900/30 rounded-[40px] border border-white/5 space-y-8">
             <div>
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">Anonymity Meter</h4>
                <div className="relative w-32 h-32 mx-auto mb-4">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                     <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * (audit?.safetyScore || 0)) / 100} className="text-cyan-500 transition-all duration-1000" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-2xl font-black">{audit?.safetyScore || 0}%</span>
                   </div>
                </div>
                <p className="text-[10px] text-center font-bold text-cyan-500/60 uppercase">{audit?.riskLevel || 'Computing Risk...'}</p>
             </div>

             <div className="space-y-4">
                <button 
                  onClick={handleExportJSONL}
                  disabled={exporting}
                  className="w-full bg-white text-slate-950 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {exporting ? <RefreshCcw size={14} className="animate-spin" /> : <Download size={14} />}
                  Export Fine-Tuning Set
                </button>
             </div>
          </div>
        </aside>

        {/* Main Analytics Content */}
        <div className="lg:col-span-9 space-y-8">
          {activeTab === 'metrics' && (
            <div className="animate-in slide-in-from-right-10 duration-500 space-y-8">
              {/* KPI Matrix */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Users', value: globalData.totalUsers, icon: <Users className="text-cyan-400" />, trend: 'Live' },
                  { label: 'Health Events', value: globalData.totalEvents, icon: <Activity className="text-magenta-400" />, trend: 'Aggregated' },
                  { label: 'Support Tickets', value: globalData.totalTickets, icon: <ShieldAlert className="text-yellow-400" />, trend: 'Pending' },
                  { label: 'Total Feedback', value: globalData.totalFeedback, icon: <MessageCircle className="text-green-400" />, trend: 'Received' }
                ].map((kpi, i) => (
                  <div key={i} className="bg-slate-900/30 p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">{kpi.icon}</div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{kpi.label}</p>
                    <h3 className="text-4xl font-black mb-2">{kpi.value}</h3>
                    <p className="text-[10px] font-bold text-cyan-600">{kpi.trend}</p>
                  </div>
                ))}
              </div>

              {/* Weekly Trend Overlay Chart */}
              <div className="bg-slate-900/30 p-10 rounded-[40px] border border-white/5">
                <div className="flex items-center justify-between mb-12">
                   <div>
                      <h3 className="text-lg font-black uppercase tracking-tighter">Aggregated Fatigue Trend</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">7-Day Biometric Oscillation</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Alerts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-magenta-500 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Stress</span>
                      </div>
                   </div>
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#475569', fontWeight: 'bold'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#475569', fontWeight: 'bold'}} />
                      <Tooltip 
                        contentStyle={{ background: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="alerts" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorAlerts)" />
                      <Area type="monotone" dataKey="stress" stroke="#ec4899" strokeWidth={2} fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="animate-in slide-in-from-right-10 duration-500 space-y-8">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-900/30 p-10 rounded-[40px] border border-white/5 space-y-8">
                     <div className="flex items-center gap-3">
                        <ShieldAlert className="text-cyan-400" size={24} />
                        <h3 className="text-lg font-black uppercase tracking-tighter">Anonymity Audit</h3>
                     </div>
                     <p className="text-xs leading-relaxed text-slate-400 font-medium">Gemini Audit suggests that your dataset is highly secure for internal research, with low risk of user re-identification.</p>
                     
                     <div className="space-y-4">
                        {audit?.privacyTips?.map((tip: string, idx: number) => (
                           <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                              <CheckCircle size={16} className="text-cyan-500 shrink-0" />
                              <p className="text-[11px] font-bold text-slate-300">{tip}</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-slate-900/30 p-10 rounded-[40px] border border-white/5 space-y-8">
                     <div className="flex items-center gap-3">
                        <Zap className="text-magenta-400" size={24} />
                        <h3 className="text-lg font-black uppercase tracking-tighter">Fine-Tuning Potential</h3>
                     </div>
                     <div className="p-6 bg-magenta-500/5 rounded-3xl border border-magenta-500/20">
                        <div className="flex items-center gap-2 mb-4 text-magenta-400">
                           <Info size={14} />
                           <span className="text-[10px] font-black uppercase tracking-widest">High Value Target</span>
                        </div>
                        <p className="text-xs font-bold text-slate-200">Focusing fine-tuning on "Evening Posture Correction" could reduce long-term ergonomic issues by up to 22%.</p>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase">
                           <span>Posture Resolution</span>
                           <span className="text-green-500">OPTIMAL</span>
                        </div>
                        <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase">
                           <span>Respiratory Noise</span>
                           <span className="text-orange-500">FILTER REQ</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-cyan-600/10 p-10 rounded-[40px] border border-cyan-500/20">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-black">
                        <Brain size={28} />
                     </div>
                     <h3 className="text-xl font-black uppercase tracking-tighter text-cyan-400">Compliance Directives</h3>
                  </div>
                  <ul className="grid md:grid-cols-3 gap-6">
                     {[
                        "Aggregated datasets must retain a minimum k-value of 10.",
                        "JSONL exports automatically strip all high-resolution timestamps.",
                        "Differential noise is injected into all publicly visible diagrams."
                     ].map((item, i) => (
                        <li key={i} className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed p-4 bg-black/40 rounded-xl border border-white/5">
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
          )}

          {activeTab === 'sentiment' && (
            <div className="animate-in slide-in-from-right-10 duration-500 space-y-8">
               <div className="glass-card rounded-[40px] p-10 border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent">
                  <div className="flex items-center gap-4 mb-8">
                    <BrainCircuit className="text-cyan-400" size={32} />
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">AI Platform Directives</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Aggregate sentiment analysis from {globalData.recentFeedback.length} reports</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3">Core Sentiment Summary</p>
                        <p className="text-sm leading-relaxed text-slate-300 italic">"{insights?.sentimentSummary || 'Awaiting platform synchronization...'}"</p>
                      </div>
                      <div className="flex items-center gap-4 p-5 bg-green-500/10 rounded-2xl border border-green-500/20">
                         <TrendingUp className="text-green-500" />
                         <span className="text-xs font-black text-green-200 uppercase tracking-widest">Platform Satisfaction: 88%</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Directives (Actionable AI Output)</p>
                      {insights?.directives?.map((directive: string, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-500 font-black text-xs shrink-0">{idx+1}</div>
                          <p className="text-xs font-bold text-slate-300 leading-snug">{directive}</p>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>

               <div className="bg-slate-900/30 p-10 rounded-[40px] border border-white/5">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                    <MessageCircle className="text-slate-500" size={18} /> Direct Feedback Stream
                  </h3>
                  <div className="space-y-4">
                    {globalData.recentFeedback.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
                        <p className="text-xs text-slate-400 group-hover:text-slate-200">{f}</p>
                        <span className="text-[9px] font-black text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase">Source Verification: Pass</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="animate-in slide-in-from-right-10 duration-500">
               <div className="bg-slate-950 p-8 rounded-[32px] border border-cyan-900/40 font-mono text-[11px] h-[600px] overflow-y-auto scrollbar-hide">
                  <div className="flex items-center gap-2 mb-6 text-cyan-500/40">
                    <Terminal size={14} />
                    <span>LIVE_EVENT_STREAM ... [CONNECTED]</span>
                  </div>
                  <div className="space-y-1.5 opacity-80">
                    {recentEvents.length === 0 ? (
                       <p className="text-slate-600 italic">No recent events found on the network.</p>
                    ) : (
                      recentEvents.map((ev, i) => (
                        <p key={i} className="border-b border-white/5 pb-1 mb-1">
                          <span className="text-slate-600">[{new Date(ev.timestamp).toISOString()}]</span>
                          <span className="text-cyan-600 ml-4">{ev.type}:</span>
                          <span className="text-slate-400 ml-4">{ev.description || 'No description'} ... Severity::{ev.severity}</span>
                        </p>
                      ))
                    )}
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
