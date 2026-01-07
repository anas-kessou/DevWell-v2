
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Coffee, Wind, Eye, Move, Sparkles, Moon, Sun, ArrowRight } from 'lucide-react';

const Wellness: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-10 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-all border border-white/5">
            <ChevronLeft size={20} />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 block">Neural Hub</span>
            <span className="text-lg font-black tracking-tighter uppercase">Wellness Resources</span>
          </div>
        </Link>
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-8 py-20 text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            The Dev <br /> <span className="text-blue-500">Wellness</span> Hub
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Science-backed protocols to keep your biology in sync with your codebase.
          </p>
      </header>

      {/* Protocols Grid */}
      <main className="max-w-7xl mx-auto px-8 pb-32">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
              {/* Protocol 1: Eyes */}
              <div className="glass-card rounded-[40px] p-12 border border-white/5 space-y-8 group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between">
                      <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                          <Eye size={32} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full">Vision Security</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">The 20-20-20 Rule</h3>
                  <p className="text-slate-400 leading-relaxed font-medium">Digital eye strain is the #1 complaint of modern devs. Every 20 minutes, look at something 20 feet away for 20 seconds. This relaxes the ciliary muscle and keeps your vision sharp.</p>
                  <ul className="space-y-4">
                      {['Reduces headaches', 'Prevents permanent focus shift', 'Resets ocular pressure'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                              <Sparkles size={14} className="text-blue-500" /> {item}
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Protocol 2: Breathing */}
              <div className="glass-card rounded-[40px] p-12 border border-white/5 space-y-8 group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center justify-between">
                      <div className="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                          <Wind size={32} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-600/10 text-emerald-400 px-4 py-2 rounded-full">Neural Calm</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">Box Breathing</h3>
                  <p className="text-slate-400 leading-relaxed font-medium">When a bug is haunting you, your nervous system enters "fight or flight". Box breathing resets your cortisol levels. Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.</p>
                  <ul className="space-y-4">
                      {['Lowered heart rate', 'Improved logical reasoning', 'Resets amygdala response'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                              <Sparkles size={14} className="text-emerald-500" /> {item}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>

          {/* Quick Tips Horizontal */}
          <div className="space-y-10">
              <h4 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 text-center">Neural Optimization Tips</h4>
              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      { icon: <Coffee />, title: "Caffeine Curfew", desc: "No caffeine after 2:00 PM to ensure your circadian rhythm remains synchronized." },
                      { icon: <Move />, title: "Micro-Stretches", desc: "A 30-second neck roll every hour prevents cervical spine compression." },
                      { icon: <Moon />, title: "Dark Mode Cycle", desc: "Switch to amber-tinted blue light filters 2 hours before your target sleep window." }
                  ].map((tip, i) => (
                      <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all">
                          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-white/5 text-slate-300">
                              {tip.icon}
                          </div>
                          <h5 className="text-lg font-black uppercase tracking-tight mb-3">{tip.title}</h5>
                          <p className="text-xs text-slate-500 leading-relaxed font-bold">{tip.desc}</p>
                      </div>
                  ))}
              </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-32 p-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] text-center space-y-8 relative overflow-hidden shadow-2xl">
              <Sparkles className="absolute top-0 right-0 text-white/10 w-64 h-64 -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white">
                Integrate these <br /> into your daily sync.
              </h3>
              <p className="text-white/70 max-w-xl mx-auto font-medium">
                DevWell's dashboard has built-in timers and AI coaching for all of these protocols. Ready to let AI guard your health?
              </p>
              <Link to="/register" className="bg-white text-blue-600 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:scale-105 inline-flex items-center gap-2">
                Initialize Guardian <ArrowRight size={18} />
              </Link>
          </div>
      </main>
    </div>
  );
};

export default Wellness;
