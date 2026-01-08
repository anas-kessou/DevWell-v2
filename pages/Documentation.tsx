import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Camera, MessageSquare, BarChart3, Zap, Shield, ArrowLeft, Brain, Video, Eye, Mic } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <Activity size={24} className="text-blue-500" />
              <span>DEVWELL PROTOCOL</span>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">User Guide 2026</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-8 grid gap-20">
        
        {/* Intro */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            System Architecture
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive breakdown of the DevWell neural interface, biometric monitors, and predictive engines.
          </p>
        </section>

        {/* 1. Dashboard Core */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10">
          <div className="text-blue-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            01. Core Interface
          </div>
          <div className="space-y-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500"><Activity size={24} /></div>
                <h3>Wellness Score</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Your central health metric (0-100%). It is calculated in real-time based on weighted inputs from:
              </p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Posture Deviation Frequency", 
                  "Blink Rate Variability", 
                  "Vocal Stress Analysis", 
                  "Session Duration without Breaks"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-500"><Zap size={24} /></div>
                <h3>Status Engine</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The status indicator (top right) reflects your active subscription tier. 
                <span className="text-white font-bold"> Free Tier</span> enables basic monitoring. 
                <span className="text-amber-400 font-bold"> Pro Tier (Zen Pro)</span> unlocks the Neural Oracle (AI Chat), Meditation generation, and advanced burnout forecasting.
              </p>
            </div>
          
          </div>
        </section>

        {/* 2. Neural Sync HUD */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10">
          <div className="text-indigo-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            02. Biometrics
          </div>
          <div className="space-y-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-slate-800 p-3 rounded-2xl text-white"><Camera size={24} /></div>
                <h3>Neural Sync HUD (Camera)</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The central monitoring unit. Click <strong>"INITIALIZE SYNC"</strong> to activate.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-card p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3 text-blue-400 font-black uppercase text-xs tracking-widest"><Eye size={14} /> Visual Cortex</div>
                    <p className="text-sm text-slate-400">Analyzes video feed 30fps for signs of fatigue (eye closure), posture slouching, and facial tension.</p>
                </div>
                <div className="glass-card p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3 text-pink-400 font-black uppercase text-xs tracking-widest"><Mic size={14} /> Audio Cortex</div>
                    <p className="text-sm text-slate-400">Listens for "Vocal Fry", sighs, or rapid speech patterns indicating high cortisol/stress levels.</p>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                 <Shield size={20} className="text-yellow-500 shrink-0 mt-1" />
                 <p className="text-xs text-yellow-200/80 leading-relaxed">
                   <strong>Privacy Note:</strong> All biometric processing is performed ephemerally. Video frames are analyzed and immediately discarded. No raw footage is ever stored on servers.
                 </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-red-500/10 p-3 rounded-2xl text-red-500"><Brain size={24} /></div>
                <h3>Hands-Free Interaction</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Once synced, the HUD enters <strong>"Conversation Mode"</strong>. You can speak naturally without clicking any buttons. The AI sees what you see and hears what you say, allowing for real-time ergonomic coaching (e.g., "Do I look tired?").
              </p>
            </div>

          </div>
        </section>

        {/* 3. Oracle */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10">
          <div className="text-emerald-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            03. The Oracle
          </div>
          <div className="space-y-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500"><MessageSquare size={24} /></div>
                <h3>DevWell Oracle (Chatbot)</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Your personal wellness companion (bottom right). It supports three distinct modes:
              </p>
              <div className="space-y-3">
                 <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-white/5">
                    <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400 font-black text-xs uppercase tracking-widest w-24 text-center">Standard</div>
                    <p className="text-sm text-slate-300">Fast, conversational responses using Gemini Flash.</p>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-white/5">
                    <div className="bg-amber-600/20 p-2 rounded-lg text-amber-400 font-black text-xs uppercase tracking-widest w-24 text-center">Reasoning</div>
                    <p className="text-sm text-slate-300">Uses Gemini Pro to maximize logic for complex wellness planning or burnout diagnosis.</p>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-white/5">
                    <div className="bg-emerald-600/20 p-2 rounded-lg text-emerald-400 font-black text-xs uppercase tracking-widest w-24 text-center">Research</div>
                    <p className="text-sm text-slate-300">Connects to Google Search to find scientific papers backing up wellness advice.</p>
                 </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Pro Tools */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10 pb-20">
          <div className="text-amber-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            04. Pro Tools
          </div>
          <div className="space-y-12">
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2"><Video size={20} className="text-blue-500" /> Neural Meditation</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Uses generative video AI to create custom, infinite loops of calming scenery (e.g., "Cyberpunk Rain", "Forest Stream") based on your current stress level.
                  </p>
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2"><BarChart3 size={20} className="text-indigo-500" /> Predictive Forecast</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Uses your historical data (last 50 sessions) to predict burnout risk 4-8 hours in advance, suggesting a specific "Action Plan" to mitigate it.
                  </p>
               </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Documentation;
