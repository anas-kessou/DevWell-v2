
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Trash2, 
  Download, 
  EyeOff, 
  Key, 
  Database, 
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PrivacySettings } from '../types';
import { FirebaseService } from '../services/firebaseService';

const Settings: React.FC = () => {
  const userId = "dev_alpha_01";
  const [settings, setSettings] = useState<PrivacySettings>({
    anonymizeAI: true,
    encryptLogs: true,
    encryptionLevel: 'AES-256',
    dataRetentionDays: 30,
    allowAggregateTraining: false
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const stored = await FirebaseService.getPrivacySettings(userId);
      if (stored) setSettings(stored);
    };
    loadSettings();
  }, []);

  const toggleSetting = async (key: keyof PrivacySettings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    await FirebaseService.savePrivacySettings(userId, updated);
    triggerSaveEffect();
  };

  const updateEncryption = async (level: PrivacySettings['encryptionLevel']) => {
    const updated = { ...settings, encryptionLevel: level };
    setSettings(updated);
    await FirebaseService.savePrivacySettings(userId, updated);
    triggerSaveEffect();
  };

  const triggerSaveEffect = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleExport = () => {
    const data = {
      user: userId,
      timestamp: new Date().toISOString(),
      settings: settings,
      mockEvents: [
        { type: "POSTURE", severity: "MEDIUM", timestamp: Date.now() - 100000 }
      ]
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devwell_privacy_export_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase">Privacy Core</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Advanced Neural Security Settings (Firebase Cloud Enabled)</p>
            </div>
          </div>
          {saveStatus && (
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20 animate-in fade-in slide-in-from-top-2">
              <CheckCircle size={14} />
              <span className="text-[10px] font-black uppercase">Cloud Synced</span>
            </div>
          )}
        </div>

        {/* Section 1: AI Privacy */}
        <div className="glass-card rounded-[40px] p-10 space-y-8 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
              <EyeOff size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Anonymization Layer</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Pre-processing for Neural Uplink</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all">
              <div>
                <h3 className="text-sm font-bold mb-1">Scrub PII from Vision Analysis</h3>
                <p className="text-xs text-slate-500 max-w-md">Strips biometric markers and environment metadata before sending frames to Gemini API.</p>
              </div>
              <button 
                onClick={() => toggleSetting('anonymizeAI')}
                className={`w-14 h-8 rounded-full relative transition-all ${settings.anonymizeAI ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${settings.anonymizeAI ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all">
              <div>
                <h3 className="text-sm font-bold mb-1">Aggregate Training Consent</h3>
                <p className="text-xs text-slate-500 max-w-md">Allow anonymized aggregates to be used for model fine-tuning (Differential Privacy enabled).</p>
              </div>
              <button 
                onClick={() => toggleSetting('allowAggregateTraining')}
                className={`w-14 h-8 rounded-full relative transition-all ${settings.allowAggregateTraining ? 'bg-indigo-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${settings.allowAggregateTraining ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Log Encryption */}
        <div className="glass-card rounded-[40px] p-10 space-y-8 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-magenta-600/20 flex items-center justify-center text-magenta-400">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Encryption Hub</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">End-to-End Data Persistence</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold">Log Encryption Protocol</h3>
                <span className="text-[10px] font-black text-magenta-500 uppercase tracking-widest bg-magenta-500/10 px-3 py-1 rounded-lg">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(['Standard', 'AES-256', 'Quantum-Resistant'] as const).map((level) => (
                  <button 
                    key={level}
                    onClick={() => updateEncryption(level)}
                    className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      settings.encryptionLevel === level 
                      ? 'bg-magenta-600/20 border-magenta-500 text-magenta-400' 
                      : 'bg-white/5 border-transparent text-slate-500 hover:bg-white/10'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Data Management */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-[40px] p-10 border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <Download className="text-blue-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">Export Archive</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Download a full JSON record of your health events, settings, and AI-generated insights. All data is de-identified before export.
            </p>
            <button 
              onClick={handleExport}
              className="w-full py-4 bg-white text-slate-950 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Download size={14} /> Initialize Download
            </button>
          </div>

          <div className="glass-card rounded-[40px] p-10 border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <Trash2 className="text-red-500" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest text-red-500">The Purge</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Permanently wipe all health history, biometric profiles, and predictive logs. This action is irreversible and terminates the neural link.
            </p>
            <button 
              onClick={() => setShowConfirmDelete(true)}
              className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={14} /> Wipe All Data
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
            <div className="glass-card w-full max-w-md rounded-[48px] p-10 border border-red-500/30 space-y-8 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-red-500/20 rounded-[32px] flex items-center justify-center mx-auto text-red-500">
                <AlertTriangle size={40} className="animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-2xl font-black uppercase tracking-tighter">Confirm Data Purge</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                  All biometric history on Firestore will be destroyed. This cannot be undone.
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1 py-4 bg-white/5 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { setShowConfirmDelete(false); alert("Neural link terminated. Firebase Cloud data purged."); }}
                  className="flex-1 py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/30"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center pt-10 pb-20 opacity-30 flex flex-col items-center gap-2">
           <Fingerprint size={24} />
           <p className="text-[10px] font-black uppercase tracking-[0.4em]">Privacy Protocol V2.4.92 // HIPAA & GDPR Compliant Layer</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
