// pages/Terms.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, AlertTriangle, Scale, CheckCircle, Shield } from 'lucide-react';

const Terms: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
        <nav className="flex items-center justify-between px-8 py-6 max-w-5xl mx-auto sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <FileText size={24} className="text-blue-500" />
                <span>Terms of Service</span>
            </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Effective: Jan 2026</span>
        </nav>

        <main className="max-w-3xl mx-auto py-16 px-8">
            <div className="space-y-12">
                <section>
                    <h1 className="text-4xl font-black mb-6 tracking-tighter">Service Agreement</h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        By accessing or using DevWell ("The Platform"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not use any services.
                    </p>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="text-amber-500" />
                        <h2 className="text-xl font-bold">1. Not Medical Advice</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed p-6 bg-amber-900/10 border border-amber-500/20 rounded-2xl">
                        <p className="font-bold text-amber-200">
                            DevWell is a productivity and wellness tool, not a medical device.
                        </p>
                        <p>
                            The Platform provides data visualization and AI-driven suggestions based on behavioral patterns. It does not diagnose, treat, or prevent any disease or medical condition. Do not use DevWell as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" />
                        <h2 className="text-xl font-bold">2. User Responsibilities</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <ul className="list-disc ml-4 space-y-2">
                            <li>You are responsible for maintaining the security of your account credentials.</li>
                            <li>You agree not to modify, reverse engineer, or hack the platform.</li>
                            <li>You agree to use the biometric features only for your own personal wellness tracking.</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                         <Scale className="text-indigo-500" />
                        <h2 className="text-xl font-bold">3. Subscription & Payments</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            DevWell offers a "Free Tier" and a paid "Pro Tier".
                        </p>
                        <p>
                            <strong>Free Tier:</strong> Includes basic tracking and manual events.<br/>
                            <strong>Pro Tier:</strong> Unlocks "Neural Oracle" predictive AI features and deeper historical analytics. Subscription fees are billed monthly and are non-refundable except as required by law.
                        </p>
                    </div>
                </section>

                 <section className="space-y-6">
                    <div className="flex items-center gap-3">
                         <Shield className="text-slate-400" />
                        <h2 className="text-xl font-bold">4. Limitation of Liability</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            In no event shall DevWell, nor its developers, partners, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                        </p>
                    </div>
                </section>

            </div>
        </main>
    </div>
  );
};

export default Terms;
