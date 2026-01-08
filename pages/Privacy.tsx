// pages/Privacy.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, Server, UserCheck, ArrowLeft, Activity } from 'lucide-react';

const Privacy: React.FC = () => {
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
                <Shield size={24} className="text-emerald-500" />
                <span>Privacy Protocol</span>
            </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Updated: Jan 2026</span>
        </nav>

        <main className="max-w-3xl mx-auto py-16 px-8">
            <div className="space-y-12">
                <section>
                    <h1 className="text-4xl font-black mb-6 tracking-tighter">Your Biology. Your Data.</h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        At DevWell, we believe that workplace wellness tools should not be surveillance tools. Our "Privacy Core" architecture ensures that your biometric data is processed locally on your device specifically for your benefit, not for corporate oversight.
                    </p>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Lock className="text-blue-500" />
                        <h2 className="text-xl font-bold">1. Data Collection & Processing</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            <strong>Biometric Streams (Video/Audio):</strong> Our applications (Hands-Free Mode, Posture Correction) process video and audio feeds in real-time within your browser's memory. These raw streams are analyzed for fatigue markers (blink rate, yawns) and then immediately discarded. We do not store, upload, or record raw video or audio files.
                        </p>
                        <p>
                            <strong>Health Events:</strong> When the system detects a health event (e.g., "High Fatigue"), a lightweight JSON object containing metadata (timestamp, severity, type) is created. This metadata is encrypted and stored in our database to provide your historical analytics.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Server className="text-indigo-500" />
                        <h2 className="text-xl font-bold">2. Local-First Storage</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            We utilize a "Local-First" approach. Your daily detailed metrics are stored in your browser's IndexedDB. Only aggregated summaries are synchronized to our secure cloud servers to enable cross-device dashboard functionality.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                         <Eye className="text-red-500" />
                        <h2 className="text-xl font-bold">3. No Employer Surveillance</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                            DevWell is designed for the individual developer. We do not provide "Boss Mode" or manager dashboards that allow employers to view an individual employee's focus levels, screen time, or biometric status. Your wellness data is accessible only by you.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <UserCheck className="text-emerald-500" />
                        <h2 className="text-xl font-bold">4. Third-Party AI Processors</h2>
                    </div>
                    <div className="pl-9 space-y-4 text-slate-400 text-sm leading-relaxed">
                        <p>
                           We utilize Google's Gemini models for advanced inference (e.g., generating burnout predictions). Data sent to these models is stripped of all PII (Personally Identifiable Information). We send only anonymous metric vectors (e.g., "Session Duration: 4h, Blink Rate: Low"), ensuring the AI cannot identify you personally.
                        </p>
                    </div>
                </section>

                <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 mt-12">
                    <h3 className="font-bold mb-2">Questions?</h3>
                    <p className="text-sm text-slate-400">
                        Contact our Data Protection Officer at <a href="mailto:privacy@devwell.ai" className="text-blue-500 hover:underline">privacy@devwell.ai</a>
                    </p>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Privacy;
