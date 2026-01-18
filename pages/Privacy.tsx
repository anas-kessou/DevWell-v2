// pages/Privacy.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Eye, Server, UserCheck, ArrowLeft, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
    const { t, dir } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const backPath = (location.state as any)?.from === 'dashboard' ? '/dashboard' : '/';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30" dir={dir}>
        <nav className="flex items-center justify-between px-8 py-6 max-w-5xl mx-auto sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-4">
            <button onClick={() => navigate(backPath)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                <ArrowLeft size={24} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </button>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <Shield size={24} className="text-emerald-500" />
                <span>{t('legal.privacy.title')}</span>
            </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('legal.terms.lastUpdated')}: Jan 2026</span>
        </nav>

        <main className="max-w-3xl mx-auto py-16 px-8">
            <div className="space-y-12">
                <section>
                    <h1 className="text-4xl font-black mb-6 tracking-tighter">{t('legal.privacy.title')}</h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        {t('legalContent.privacy.intro')}
                    </p>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Lock className="text-blue-500" />
                        <h2 className="text-xl font-bold">{t('legal.privacy.sections.collection')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            {t('legalContent.privacy.biometrics')}
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Server className="text-indigo-500" />
                        <h2 className="text-xl font-bold">{t('legal.privacy.sections.security')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                             {t('legalContent.privacy.localFirst')}
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                         <Eye className="text-red-500" />
                        <h2 className="text-xl font-bold">{t('legal.privacy.sections.use')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            {t('legalContent.privacy.noSurveillance')}
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <UserCheck className="text-emerald-500" />
                        <h2 className="text-xl font-bold">{t('legal.privacy.sections.thirdParty')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                           {t('legalContent.privacy.thirdParty')}
                        </p>
                    </div>
                </section>

                <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 mt-12">
                    <h3 className="font-bold mb-2">Questions?</h3>
                    <p className="text-sm text-slate-400">
                        {t('legalContent.privacy.contact')}
                    </p>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Privacy;
