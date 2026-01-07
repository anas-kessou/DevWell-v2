
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Brain, Heart, Target, Code, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-10 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-all border border-white/5">
            <ChevronLeft size={20} />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 block">Return Home</span>
            <span className="text-lg font-black tracking-tighter uppercase">About DevWell</span>
          </div>
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-8 py-20 space-y-32">
        {/* Mission */}
        <section className="space-y-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            We built this <br /> for the <span className="text-blue-500">late nights.</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            DevWell was born from a simple observation: Software Engineering is an endurance sport, but we treat it like a 100m sprint. We wanted to build a tool that understands the human behind the keyboard.
          </p>
        </section>

        {/* Core Philosophy */}
        <section className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-600/20 rounded-3xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <Heart size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Empathy First</h3>
                <p className="text-slate-400 leading-relaxed">Most productivity tools are built to extract more value. DevWell is built to preserve yours. We prioritize wellness over output, because we know high-quality output is a byproduct of a healthy mind.</p>
            </div>
            <div className="space-y-6">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-3xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <Brain size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Intelligence for Good</h3>
                <p className="text-slate-400 leading-relaxed">Using Gemini's multimodal power, we can detect micro-fatigue markers that the user isn't even aware of yet. It's like having a world-class health coach watching your back.</p>
            </div>
        </section>

        {/* The Team / Vision */}
        <section className="bg-slate-900/40 p-12 rounded-[48px] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600/5 -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-1000" />
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tight">The Vision</h3>
                    <p className="text-slate-400 leading-relaxed">
                        We envision a future where every developer has a "Neural Guardian" — an AI that helps them maintain balance. DevWell is just the beginning of a larger movement to fix mental health in tech.
                    </p>
                    <div className="flex gap-6 pt-4">
                        <div className="flex items-center gap-2">
                            <Code size={16} className="text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Built by Devs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest">For Devs</span>
                        </div>
                    </div>
                </div>
                <div className="w-64 h-64 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20">
            <h4 className="text-2xl font-black uppercase tracking-widest mb-8 text-slate-500">Ready to sync?</h4>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-blue-600/30 inline-block">
                Initialize Protocol
            </Link>
        </section>
      </main>
    </div>
  );
};

export default About;
