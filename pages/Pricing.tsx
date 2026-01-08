
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, Zap, Star, ChevronLeft, CreditCard, Loader2 } from 'lucide-react';
import { FirebaseService } from '../services/firebaseService';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'selection' | 'payment'>('selection');
  const userId = FirebaseService.currentUser?.uid;

  const handleUpgrade = async () => {
    if (!userId) {
       navigate('/login');
       return;
    }
    setLoading(true);
    // Simulate payment delay
    await new Promise(r => setTimeout(r, 2000));
    await FirebaseService.upgradeUser(userId);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 md:p-20 overflow-x-hidden">
      <button onClick={() => navigate(-1)} className="mb-12 flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">
        <ChevronLeft size={16} /> Back to Hub
      </button>

      {step === 'selection' ? (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl font-black tracking-tighter mb-6">Elevate Your <br /><span className="text-blue-500">Neural Flow.</span></h1>
            <p className="text-slate-400 text-lg">Choose the protocol that matches your engineering intensity.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Free Tier */}
            <div className="glass-card rounded-[48px] p-12 border border-white/5 space-y-10 opacity-70">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Standard Sync</h3>
                <p className="text-slate-500 text-sm font-bold">Baseline Wellness Tracking</p>
              </div>
              <div className="text-5xl font-black">$0<span className="text-xl text-slate-600">/mo</span></div>
              <ul className="space-y-4">
                {['Basic Posture Analysis', 'Gemini Flash Chat', 'Wellness Stream', '7-Day History'].map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-slate-600" /> {feat}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full py-5 rounded-[24px] bg-white/5 text-slate-500 font-black text-xs uppercase tracking-widest">Current Protocol</button>
            </div>

            {/* Pro Tier */}
            <div className="glass-card rounded-[48px] p-12 border-2 border-blue-500 relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.2)]">
              <div className="absolute top-8 right-8 bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">Most Powerful</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">Zen Pro <Star size={20} fill="currentColor" /></h3>
                <p className="text-blue-400 text-sm font-bold">The Neural Command Suite</p>
              </div>
              <div className="text-5xl font-black">$19<span className="text-xl text-slate-600">/mo</span></div>
              <ul className="space-y-4">
                {[
                  'Predictive Burnout Oracle (Thinking)', 
                  'Veo 3.1 Neural Video Generation', 
                  'Multi-Speaker Voice TTS', 
                  'Unlimited Historical Data',
                  'Priority Model Access (1M Context)'
                ].map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-100">
                    <Check size={16} className="text-blue-500" /> {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setStep('payment')}
                className="w-full py-5 rounded-[24px] bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                Initialize Upgrade
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="glass-card rounded-[48px] p-10 space-y-8 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl"><CreditCard /></div>
              <h2 className="text-xl font-black uppercase tracking-tight">Secure Checkout</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Card Details</label>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-slate-400 text-sm">•••• •••• •••• 4242</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Expiry</label>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-slate-400 text-sm">12 / 26</div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-2">CVC</label>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-slate-400 text-sm">•••</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black uppercase text-blue-400">Zen Pro Monthly</p>
                <p className="text-xl font-black">$19.00</p>
              </div>
              <Shield className="text-blue-500" />
            </div>

            <button 
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-5 rounded-[24px] bg-white text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Zap size={14} fill="currentColor" />}
              {loading ? 'Processing...' : 'Authorize Transaction'}
            </button>
            <p className="text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest">End-to-End Encrypted via Stripe (Simulated)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
