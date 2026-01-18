// pages/Support.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Mail, ArrowLeft, Github, Twitter, MapPin, Send } from 'lucide-react';
import { FirebaseService } from '../services/firebaseService';
import { useLanguage } from '../contexts/LanguageContext';

const Support: React.FC = () => {
    const { t, dir } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const backPath = (location.state as any)?.from === 'dashboard' ? '/dashboard' : '/';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        issue: 'general',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = FirebaseService.currentUser;
        await FirebaseService.saveSupportTicket({
            ...formData,
            userId: user ? user.uid : undefined
        });
        setSubmitted(true);
    };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30" dir={dir}>
        <nav className="flex items-center justify-between px-8 py-6 max-w-5xl mx-auto sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-4">
            <button onClick={() => navigate(backPath)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                <ArrowLeft size={24} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </button>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <Heart size={24} className="text-red-500" />
                <span>{t('support.title')}</span>
            </div>
            </div>
        </nav>

        <main className="max-w-5xl mx-auto py-16 px-8">
            <h1 className="text-5xl font-black text-center mb-6 tracking-tighter">{t('support.subtitle')}</h1>
            <p className="text-center text-slate-400 max-w-xl mx-auto mb-20">
                {t('feedback.helpImprove')}
            </p>

            <div className="grid md:grid-cols-2 gap-16">
                
                {/* Contact Info */}
                <div className="space-y-12">
                     <div className="space-y-6">
                        <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                            <Mail className="text-blue-500" /> {t('support.contactInfo.title')}
                        </h3>
                        <div className="space-y-4">
                            <a href="mailto:anaskessou4@gmail.com" className="group flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-blue-600/10 hover:border-blue-500/30 transition-all">
                                <div className="p-3 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform">
                                    <Mail size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">{t('support.contactInfo.emailUs')}</p>
                                    <p className="font-bold">anaskessou4@gmail.com</p>
                                </div>
                            </a>

                             <a href="https://github.com/anaskessou" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-slate-800 transition-all">
                                <div className="p-3 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform">
                                    <Github size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Code Repository</p>
                                    <p className="font-bold">github.com/anaskessou</p>
                                </div>
                            </a>

                            <a href="#" className="group flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-sky-500/10 hover:border-sky-500/30 transition-all">
                                <div className="p-3 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform">
                                    <Twitter size={20} className="text-sky-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Social Updates</p>
                                    <p className="font-bold">@AnasKessouDev</p>
                                </div>
                            </a>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                            <MapPin className="text-red-500" /> Developer Base
                        </h3>
                        <p className="text-slate-400 text-sm">
                            DevWell HQ<br/>
                            Remote / Digital Nomad<br/>
                            Currently: Planet Earth
                        </p>
                     </div>
                </div>

                {/* Contact Form */}
                                {/* Contact Form */}
                <div className="bg-white/5 border border-white/5 rounded-[40px] p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <MessageCircle className="text-emerald-500" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">{t('support.sendMessage')}</h3>
                    </div>

                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in">
                            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                                <Send size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{t('feedback.thankYou')}</h3>
                            <p className="text-slate-400">{t('feedback.helpImprove')}</p>
                            <button onClick={() => setSubmitted(false)} className="mt-8 text-blue-400 hover:text-blue-300 font-bold text-sm">Send another</button>
                        </div>
                    ) : ( 
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 pl-4">{t('support.form.name')}</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 pl-4">{t('support.form.email')}</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 pl-4">{t('support.form.subject')}</label>
                                <select 
                                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                                    value={formData.issue}
                                    onChange={e => setFormData({...formData, issue: e.target.value})}
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="bug">Report a Bug</option>
                                    <option value="feature">Feature Request</option>
                                    <option value="billing">Billing Issue</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 pl-4">{t('support.form.message')}</label>
                                <textarea 
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 min-h-[150px] focus:outline-none focus:border-blue-500 transition-colors"
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                {t('support.form.submit')}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    </div>
  );
};

export default Support;
