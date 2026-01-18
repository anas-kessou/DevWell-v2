
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Shield, Zap, Star, ChevronLeft, CreditCard, Loader2 } from 'lucide-react';
import { FirebaseService } from '../services/firebaseService';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'selection' | 'payment'>('selection');
  const userId = FirebaseService.currentUser?.uid;

  const handleBack = () => {
      const from = (location.state as any)?.from;
      if (from === 'dashboard') navigate('/dashboard');
      else if (from === 'landing') navigate('/');
      else navigate(-1);
  };

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
    <div className="min-h-screen bg-slate-950 text-white p-8 md:p-20 overflow-x-hidden" dir={dir}>
      <button onClick={handleBack} className="mb-12 flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">
        {dir === 'rtl' ? <ChevronLeft size={16} className="rotate-180" /> : <ChevronLeft size={16} />} 
        {t('backToHub')}
      </button>
      {step === 'selection' ? (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl font-black tracking-tighter mb-6">{t('elevateFlow')} <br /><span className="text-blue-500">{t('neuralFlowTitle')}</span></h1>
            <p className="text-slate-400 text-lg">{t('chooseProtocol')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Free Tier */}
            <div className="glass-card rounded-[48px] p-12 border border-white/5 space-y-10 opacity-70">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{t('standardSync')}</h3>
                <p className="text-slate-500 text-sm font-bold">{t('baselineTracking')}</p>
              </div>
              <div className="text-5xl font-black">$0<span className="text-xl text-slate-600">/mo</span></div>
              <ul className="space-y-4">
                {[t('basicPosture'), t('geminiFlash'), t('wellnessStream'), t('sevenDayHistory'), t('focusChart')].map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-slate-600" /> {feat}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full py-5 rounded-[24px] bg-white/5 text-slate-500 font-black text-xs uppercase tracking-widest">{t('currentProtocol')}</button>
            </div>

            {/* Pro Tier */}
            <div className="glass-card rounded-[48px] p-12 border-2 border-blue-500 relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.2)]">
              <div className={`absolute top-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase`}>{t('mostPowerful')}</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">{t('zenPro')} <Star size={20} fill="currentColor" /></h3>
                <p className="text-blue-400 text-sm font-bold">{t('neuralCommand')}</p>
              </div>
              <div className="text-5xl font-black">$19<span className="text-xl text-slate-600">/mo</span></div>
              <ul className="space-y-4">
                {[
                  t('predictiveOracle'), 
                  t('veoVideo'), 
                  t('multiSpeaker'), 
                  t('unlimitedData'),
                  t('priorityAccess'),
                  t('cortisolHeatmap')
                ].map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-100">
                    <Check size={16} className="text-blue-500" /> {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setStep('payment')}
                className="w-full py-5 rounded-[24px] bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] mb-4"
              >
                {t('initUpgrade')}
              </button>
              
              <button 
                 onClick={async () => {
                    setLoading(true);
                    try {
                        await FirebaseService.activateDemoMode();
                        navigate('/dashboard');
                    } catch (e) {
                        console.error(e);
                    } finally {
                        setLoading(false);
                    }
                 }}
                 className="w-full flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
              >
                 <Zap size={12} /> {t('tryDemo')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto relative animate-in slide-in-from-right">
            {loading && (
                 <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 rounded-[40px]">
                     <Loader2 size={40} className="text-blue-500 animate-spin" />
                     <p className="text-xs font-black uppercase tracking-widest animate-pulse">{t('processingPayment')}</p>
                 </div>
            )}
            
            <div className="glass-card p-10 rounded-[40px] border border-blue-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <CreditCard size={200} />
                </div>

                <div className="mb-8">
                     <h2 className="text-2xl font-black uppercase tracking-tight mb-1">{t('secureGateway')}</h2>
                     <div className="flex items-center gap-2 text-emerald-400">
                        <Shield size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{t('encryptedTransaction')}</span>
                     </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{t('zenPro')}</p>
                            <p className="font-bold text-lg">$19.00 / month</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t('totalDue')}</p>
                           <p className="font-black text-2xl text-white">$19.00</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('cardNumber')}</label>
                            <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                                <CreditCard size={18} className="text-slate-400" />
                                <input type="text" placeholder="0000 0000 0000 0000" className="bg-transparent border-none w-full outline-none font-mono text-sm placeholder:text-slate-700" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="space-y-2 flex-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('expiryDate')}</label>
                                <input type="text" placeholder="MM/YY" className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none font-mono text-sm placeholder:text-slate-700 text-center" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('cvc')}</label>
                                <input type="text" placeholder="123" className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none font-mono text-sm placeholder:text-slate-700 text-center" />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleUpgrade}
                        className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/10 mt-4"
                    >
                        {loading ? t('processing') : t('confirmPayment')}
                    </button>
                    
                    <button 
                        onClick={() => setStep('selection')}
                        className="w-full py-2 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                    >
                        {t('cancel')}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
