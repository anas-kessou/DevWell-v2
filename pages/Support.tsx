// pages/Support.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Mail, ArrowLeft, Github, Twitter, MapPin, Send } from 'lucide-react';
import { FirebaseService } from '../services/firebaseService';

const Support: React.FC = () => {
    const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
        <nav className="flex items-center justify-between px-8 py-6 max-w-5xl mx-auto sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <Heart size={24} className="text-red-500" />
                <span>Support Center</span>
            </div>
            </div>
        </nav>

        <main className="max-w-5xl mx-auto py-16 px-8">
            <h1 className="text-5xl font-black text-center mb-6 tracking-tighter">How can we help?</h1>
            <p className="text-center text-slate-400 max-w-xl mx-auto mb-20">
                Whether you're facing a technical glitch or just want to suggest a feature, our team (Anas) is here to ensure your wellness flow stays uninterrupted.
            </p>

            <div className="grid md:grid-cols-2 gap-16">
                
                {/* Contact Info */}
                <div className="space-y-12">
                     <div className="space-y-6">
                        <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                            <Mail className="text-blue-500" /> Direct Channels
                        </h3>
                        <div className="space-y-4">
                            <a href="mailto:anaskessou4@gmail.com" className="group flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-blue-600/10 hover:border-blue-500/30 transition-all">
                                <div className="p-3 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform">
                                    <Mail size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Support Email</p>
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
                <div className="bg-white/5 border border-white/5 p-10 rounded-[40px]">
                    <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-8">
                        <MessageCircle className="text-emerald-500" /> Send Message
                    </h3>

                    {submitted ? (
                         <div className="h-64 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                                <Send size={32} />
                            </div>
                            <h4 className="text-2xl font-black mb-2">Message Received!</h4>
                            <p className="text-slate-400 text-sm">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                            <button onClick={() => setSubmitted(false)} className="mt-8 text-xs font-bold text-blue-500 uppercase hover:underline">Send another</button>
                         </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Your Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                    placeholder="jane@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Topic</label>
                                <select 
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-slate-300"
                                    value={formData.issue}
                                    onChange={e => setFormData({...formData, issue: e.target.value})}
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="feedback">Feedback / Suggestion</option>
                                    <option value="billing">Billing Issue</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Message</label>
                                <textarea 
                                    required
                                    rows={4}
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                    placeholder="How can we help you today?"
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-blue-900/20">
                                Send Transmission
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
