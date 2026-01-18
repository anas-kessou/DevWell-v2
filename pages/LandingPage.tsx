import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Shield, Cpu, MessageSquare, Zap, ChevronRight, Eye, Brain, Lock, Activity as ActivityIcon, BarChart3, Radio, Menu, X, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LandingPage: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, dir } = useLanguage();

  const toggleLanguage = () => {
    if (language === 'en') setLanguage('fr');
    else if (language === 'fr') setLanguage('ar');
    else setLanguage('en');
  };

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const elem = document.getElementById((location.state as any).scrollTo);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="bg-slate-950 text-white min-h-screen selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
            <Activity size={24} className="text-white" />
          </div>
          <span>DevWell</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors bg-transparent border-none cursor-pointer uppercase font-black tracking-[0.2em] text-[10px] text-slate-400">{t('features')}</button>
          <Link to="/about" state={{ from: 'landing' }} className="hover:text-blue-500 transition-colors">{t('about')}</Link>
          <Link to="/wellness" state={{ from: 'landing' }} className="hover:text-blue-500 transition-colors">{t('wellnessHub')}</Link>
          <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-500 transition-colors bg-transparent border-none cursor-pointer uppercase font-black tracking-[0.2em] text-[10px] text-slate-400">{t('howItWorks')}</button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="hidden sm:flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors border border-white/10 rounded-xl">
             <Globe size={14} /> {language.toUpperCase()}
          </button>
          <Link to="/login" className="hidden sm:block px-5 py-2 text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors">{t('login')}</Link>
          <Link to="/register" className="hidden sm:block bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20">{t('getStarted')}</Link>
          <button className="md:hidden text-slate-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
           <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-white/5 p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5">
              <button onClick={() => {document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false)}} className="text-left text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest bg-transparent border-none p-0">{t('features')}</button>
              <Link to="/about" className="text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest">{t('about')}</Link>
              <Link to="/wellness" className="text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest">{t('wellnessHub')}</Link>
              <button onClick={() => {document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false)}} className="text-left text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest bg-transparent border-none p-0">{t('howItWorks')}</button>
              <button onClick={() => {toggleLanguage(); setMobileMenuOpen(false)}} className="text-left text-sm font-bold text-slate-400 hover:text-white uppercase tracking-widest bg-transparent border-none p-0 flex items-center gap-2"><Globe size={16}/> Language: {language.toUpperCase()}</button>
              <div className="h-px bg-white/5 my-2" />
              <Link to="/login" className="text-center w-full py-3 rounded-xl bg-white/5 text-xs font-black uppercase tracking-widest">{t('login')}</Link>
              <Link to="/register" className="text-center w-full py-3 rounded-xl bg-blue-600 text-xs font-black uppercase tracking-widest">{t('getStarted')}</Link>
           </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-24 pb-32 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{t('poweredBy')}</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent leading-[1.1] tracking-tighter">
          {t('heroTitle')}
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          {t('heroSubtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/register" className="w-full sm:w-auto bg-white text-slate-950 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 group hover:scale-105 transition-all shadow-2xl shadow-white/10">
            {t('startNeuralSync')} {dir === 'ltr' ? <ChevronRight className="group-hover:translate-x-1 transition-transform" /> : <ChevronRight className="group-hover:-translate-x-1 transition-transform rotate-180" />}
          </Link>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all bg-slate-900/40 backdrop-blur-sm cursor-pointer text-white">
            {t('viewProtocol')}
          </button>
        </div>

        <div className="mt-24 border border-white/5 rounded-[48px] overflow-hidden shadow-2xl relative bg-slate-900/20 backdrop-blur-sm p-4">
          <div className="bg-slate-950 rounded-[40px] overflow-hidden border border-white/10 relative aspect-[21/9]">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" alt="Dashboard Preview" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card p-8 rounded-3xl border border-blue-500/20 max-w-lg text-left space-y-4">
                    <div className="flex items-center gap-2 text-blue-500">
                        <ActivityIcon size={16} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('systemStatus')}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">{t('biometricActive')}</h3>
                    <p className="text-xs text-slate-400 font-medium">{t('biometricDesc')}</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-8 py-32 bg-slate-900 overflow-hidden relative border-y border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10" />
        
        <div className="max-w-7xl mx-auto mb-20 text-center">
            <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.5em] mb-4">{t('processTitle')}</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">{t('processHeading')}</h3>
            <Link to="/docs" state={{ from: 'landing' }} className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors group">
              {t('learnMore')} {dir === 'ltr' ? <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> : <ChevronRight size={14} className="group-hover:-translate-x-1 transition-transform rotate-180" />}
            </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto relative">
            <div className={`absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent hidden md:block`} />

            {[
                { step: "01", title: t('step1Title'), desc: t('step1Desc') },
                { step: "02", title: t('step2Title'), desc: t('step2Desc') },
                { step: "03", title: t('step3Title'), desc: t('step3Desc') }
            ].map((item, i) => (
                <div key={i} className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-slate-950 rounded-3xl border border-white/10 flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform group-hover:border-blue-500/50">
                        <span className="text-3xl font-black text-white/20 group-hover:text-blue-500 transition-colors">{item.step}</span>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Comprehensive Features Grid */}
      <section id="features" className="px-8 py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.5em] mb-4">The Neural Protocol</h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Everything you need to <br /> stay in the flow.</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { 
              id: 'vision-biometrics',
              icon: <Eye className="text-blue-500" />, 
              title: "Vision Biometrics", 
              desc: "Real-time analysis of blinking frequency, yawning, and posture using Gemini's multimodal vision capabilities.",
              label: "Vision" 
            },
            { 
              id: 'vocal-stress-probe',
              icon: <Radio className="text-magenta-500" />, 
              title: "Vocal Stress Probe", 
              desc: "Deep analysis of tone, breathing patterns, and speech speed to detect burnout before it manifests physically.",
              label: "Audio" 
            },
            { 
              id: 'predictive-burnout',
              icon: <Brain className="text-indigo-400" />, 
              title: "Predictive Burnout", 
              desc: "Advanced neural forecasting that predicts your burnout risk 4 hours into the future based on activity logs.",
              label: "Cognitive" 
            },
            { 
              id: 'privacy-core',
              icon: <Lock className="text-emerald-400" />, 
              title: "Privacy Core", 
              desc: "Full local scrubbing and PII-stripping protocols. Your biometric data never leaves your control.",
              label: "Security" 
            },
            { 
              id: 'adhd-hub',
              icon: <MessageSquare className="text-orange-400" />, 
              title: "ADHD Hub", 
              desc: "An specialized focus mode with simplified UI and auditory micro-stretches to keep divergent minds on track.",
              label: "Focus" 
            },
            { 
              id: 'platform-root',
              icon: <BarChart3 className="text-cyan-400" />, 
              title: "Platform Root", 
              desc: "Comprehensive analytics that show your long-term wellness trends and productivity correlations.",
              label: "Data" 
            }
          ].map((feature, i) => (
            <Link key={i} to={`/feature/${feature.id}`} state={{ from: 'landing' }} className="block">
              <div className="glass-card border border-white/5 p-10 rounded-[40px] hover:border-blue-500/30 transition-all group relative overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
                <div className="bg-slate-900 border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xl">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{feature.label}</span>
                <h3 className="text-xl font-black mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Activity size={24} className="text-blue-600" />
            <span>DevWell</span>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link to="/about" state={{ from: 'landing' }} className="hover:text-white transition-colors">About</Link>
            <Link to="/wellness" state={{ from: 'landing' }} className="hover:text-white transition-colors">Wellness Hub</Link>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">© 2026 Neural Wellness Protocol</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
