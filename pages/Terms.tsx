// pages/Terms.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, FileText, Scale, AlertCircle, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Terms: React.FC = () => {
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
                <FileText size={24} className="text-blue-500" />
                <span>{t('legal.terms.title')}</span>
            </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('legal.terms.lastUpdated')}: Jan 2026</span>
        </nav>

        <main className="max-w-3xl mx-auto py-16 px-8">
            <div className="space-y-12">
                <section>
                    <h1 className="text-4xl font-black mb-6 tracking-tighter">{t('legal.terms.title')}</h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        {t('legalContent.terms.intro')}
                    </p>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="text-amber-500" />
                        <h2 className="text-xl font-bold">{t('legal.terms.sections.disclaimer')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed p-6 bg-amber-900/10 border border-amber-500/20 rounded-2xl">
                        <p className="font-bold text-amber-200">
                             {t('legalContent.terms.medicalDisclaimer')}
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <h2 className="text-xl font-bold">{t('legal.terms.sections.acceptance')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <ul className="list-disc ml-4 space-y-2">
                            <li>{t('legalContent.terms.userResp.item1')}</li>
                            <li>{t('legalContent.terms.userResp.item2')}</li>
                            <li>{t('legalContent.terms.userResp.item3')}</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                         <Scale className="text-indigo-500" />
                        <h2 className="text-xl font-bold">{t('legal.terms.sections.license')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            {t('legalContent.terms.subs.text1')}
                        </p>
                        <p>
                            {t('legalContent.terms.subs.text2')}
                        </p>
                    </div>
                </section>

                 <section className="space-y-6">
                    <div className="flex items-center gap-3">
                         <Shield className="text-slate-400" />
                        <h2 className="text-xl font-bold">{t('legal.terms.sections.limitations')}</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                           {t('legalContent.terms.liability.text')}
                        </p>
                    </div>
                </section>

            </div>
        </main>
    </div>
  );
};

export default Terms;
