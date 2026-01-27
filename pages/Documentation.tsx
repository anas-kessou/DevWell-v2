import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Camera, MessageSquare, BarChart3, Zap, Shield, ArrowLeft, Brain, Video, Eye, Mic, Smartphone, Lock, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Documentation: React.FC = () => {
  const { t, dir } = useLanguage();
  const location = useLocation();
  const backPath = (location.state as any)?.from === 'dashboard' ? '/dashboard' : '/';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30" dir={dir}>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={backPath} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white">
              <ArrowLeft size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </Link>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <Activity size={24} className="text-blue-500" />
              <span>{t('docs.title').toUpperCase()}</span>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">User Guide 2026</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-8 grid gap-20">
        
        {/* Intro */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            {t('docs.welcome')}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('docs.subtitle')}
          </p>
        </section>

        {/* 1. Dashboard Core */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10">
          <div className="text-blue-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            {t('docsContent.core.title')}
          </div>
          <div className="space-y-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500"><Activity size={24} /></div>
                <h3>{t('docsContent.core.wellnessScore.title')}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t('docsContent.core.wellnessScore.desc')}
              </p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> 
                    {t(`docsContent.core.wellnessScore.items.${i}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-500"><Zap size={24} /></div>
                <h3>{t('docsContent.core.statusEngine.title')}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t('docsContent.core.statusEngine.desc')} 
                <span className="text-white font-bold"> {t('docsContent.core.statusEngine.freeTier')}</span> {t('docsContent.core.statusEngine.freeDesc')} 
                <span className="text-amber-400 font-bold"> {t('docsContent.core.statusEngine.proTier')}</span> {t('docsContent.core.statusEngine.proDesc')}
              </p>
            </div>
          
          </div>
        </section>

        {/* 2. Neural Sync HUD */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10">
          <div className="text-indigo-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            {t('docsContent.biometrics.title')}
          </div>
          <div className="space-y-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-slate-800 p-3 rounded-2xl text-white"><Camera size={24} /></div>
                <h3>{t('docsContent.biometrics.hud.title')}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t('docsContent.biometrics.hud.desc')}
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-card p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3 text-blue-400 font-black uppercase text-xs tracking-widest"><Eye size={14} /> {t('docsContent.biometrics.hud.visual.title')}</div>
                    <p className="text-sm text-slate-400">{t('docsContent.biometrics.hud.visual.desc')}</p>
                </div>
                <div className="glass-card p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3 text-pink-400 font-black uppercase text-xs tracking-widest"><Mic size={14} /> {t('docsContent.biometrics.hud.audio.title')}</div>
                    <p className="text-sm text-slate-400">{t('docsContent.biometrics.hud.audio.desc')}</p>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                 <Shield size={20} className="text-yellow-500 shrink-0 mt-1" />
                 <p className="text-xs text-yellow-200/80 leading-relaxed">
                   <strong>{t('docsContent.biometrics.hud.privacy.title')}</strong> {t('docsContent.biometrics.hud.privacy.desc')}
                 </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-red-500/10 p-3 rounded-2xl text-red-500"><Brain size={24} /></div>
                <h3>{t('docsContent.biometrics.handsFree.title')}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t('docsContent.biometrics.handsFree.desc')}
              </p>
            </div>

          </div>
        </section>

        {/* 3. Oracle */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10">
          <div className="text-emerald-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            {t('docsContent.oracle.title')}
          </div>
          <div className="space-y-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-black">
                <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500"><MessageSquare size={24} /></div>
                <h3>{t('docsContent.oracle.chat.title')}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t('docsContent.oracle.chat.desc')}
              </p>
              <div className="space-y-3">
                 <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-white/5">
                    <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400 font-black text-xs uppercase tracking-widest w-24 text-center">{t('docsContent.oracle.chat.modes.0.name')}</div>
                    <p className="text-sm text-slate-300">{t('docsContent.oracle.chat.modes.0.desc')}</p>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-white/5">
                    <div className="bg-amber-600/20 p-2 rounded-lg text-amber-400 font-black text-xs uppercase tracking-widest w-24 text-center">{t('docsContent.oracle.chat.modes.1.name')}</div>
                    <p className="text-sm text-slate-300">{t('docsContent.oracle.chat.modes.1.desc')}</p>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-white/5">
                    <div className="bg-emerald-600/20 p-2 rounded-lg text-emerald-400 font-black text-xs uppercase tracking-widest w-24 text-center">{t('docsContent.oracle.chat.modes.2.name')}</div>
                    <p className="text-sm text-slate-300">{t('docsContent.oracle.chat.modes.2.desc')}</p>
                 </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Pro Tools */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10 pb-20">
          <div className="text-amber-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            {t('docsContent.proTools.title')}
          </div>
          <div className="space-y-12">
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2"><Video size={20} className="text-blue-500" /> {t('docsContent.proTools.meditation.title')}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t('docsContent.proTools.meditation.desc')}
                  </p>
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2"><BarChart3 size={20} className="text-indigo-500" /> {t('docsContent.proTools.forecast.title')}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t('docsContent.proTools.forecast.desc')}
                  </p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2"><Activity size={20} className="text-emerald-500" /> Advanced Analytics</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    DevWell now includes comprehensive biometrics visualization:
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li><strong>Posture Score:</strong> Real-time spine alignment tracking.</li>
                        <li><strong>Circadian Rhythm:</strong> Energy level estimation based on fatigue history.</li>
                        <li><strong>Cortisol Heatmap:</strong> 7-day stress pattern analysis.</li>
                    </ul>
                  </p>
               </div>
            </div>

          </div>
        </section>

        {/* 5. Mobile & Security */}
        <section className="grid md:grid-cols-[200px_1fr] gap-10 border-t border-white/5 pt-10 pb-20">
          <div className="text-blue-400 font-black uppercase tracking-widest text-sm sticky top-24 self-start">
            Ecosystem & Security
          </div>
          <div className="space-y-12">
            
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-2xl font-black">
                  <div className="bg-slate-800 p-3 rounded-2xl text-white"><Smartphone size={24} /></div>
                  <h3>Mobile Probe Integration</h3>
               </div>
               <p className="text-slate-400 leading-relaxed">
                  The DevWell Mobile Probe allows you to use your smartphone as a dedicated vocal and visual sensor.
               </p>
               <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl space-y-4">
                   <h4 className="font-bold text-white uppercase text-xs tracking-widest">How to Connect</h4>
                   <ol className="list-decimal ml-5 text-sm text-slate-400 space-y-2">
                       <li>Open the DevWell Dashboard on your desktop.</li>
                       <li>Click "Link Mobile" in the Camera Monitor widget.</li>
                       <li>Open the mobile app (or visit <code>/probe</code>) on your phone.</li>
                       <li>Scan the QR code or enter the session ID manually.</li>
                       <li><strong>Mutual Exclusion:</strong> If you activate the mobile camera, the web camera will automatically pause to save resources.</li>
                   </ol>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-3 text-2xl font-black">
                  <div className="bg-green-500/10 p-3 rounded-2xl text-green-500"><Lock size={24} /></div>
                  <h3>End-to-End Encryption</h3>
               </div>
               <p className="text-slate-400 leading-relaxed">
                  Your privacy is paramount. DevWell employs military-grade <strong>AES-256 GCM</strong> encryption for all sensitive health data.
               </p>
               <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <Shield size={16} className="text-green-500" />
                    Data Encrypted at Rest
                </li>
                <li className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <RefreshCw size={16} className="text-blue-500" />
                    Encrypted Real-time Streams
                </li>
               </ul>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Documentation;
