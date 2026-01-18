import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import { FirebaseService } from '../services/firebaseService';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onRegister: () => void;
}

const Register: React.FC<Props> = ({ onRegister }) => {
  const { t, dir } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await FirebaseService.registerWithEmail(email, password, name);
      onRegister();
      navigate('/dashboard');
    } catch (err: any) {
       if (err.code === 'auth/operation-not-allowed') {
        // Fallback for demo mode
        console.log("Demo register fallback");
        onRegister();
        navigate('/dashboard');
      } else {
        setError(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await FirebaseService.loginWithGoogle();
      onRegister();
      navigate('/dashboard');
    } catch (err: any) {
       if (err.code === 'auth/operation-not-allowed') {
         onRegister();
         navigate('/dashboard');
      } else {
        setError(err.message || "Google signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await FirebaseService.loginWithGithub();
      onRegister();
      navigate('/dashboard');
    } catch (err: any) {
        if (err.code === 'auth/operation-not-allowed') {
         onRegister();
         navigate('/dashboard');
      } else {
        setError(err.message || "GitHub signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-950" dir={dir}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 font-bold text-3xl text-white mb-12 justify-center">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Activity size={28} />
          </div>
          <span>DevWell</span>
        </div>

        <div className="bg-white rounded-[32px] p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('joinDevWell')}</h2>
          <p className="text-slate-500 text-sm mb-8">{t('startJourney')}</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{t('fullName')}</label>
              <div className="relative">
                <User className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${dir === 'rtl' ? 'right-4' : 'left-4'}`} size={18} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{t('emailAddress')}</label>
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${dir === 'rtl' ? 'right-4' : 'left-4'}`} size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{t('password')}</label>
              <div className="relative">
                <Lock className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${dir === 'rtl' ? 'right-4' : 'left-4'}`} size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('creatingAccount') : t('createAccount')}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-white px-2 text-slate-400 font-bold">{t('orContinueWith')}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button 
                onClick={handleGithubLogin}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-700"
              >
                <Github size={20} /> <span className="text-xs uppercase tracking-widest">GitHub</span>
              </button>
              <button 
                onClick={handleGoogleLogin}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-700"
              >
                <Chrome size={20} /> <span className="text-xs uppercase tracking-widest">Google</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs font-medium text-slate-500">
            {t('alreadyHaveAccount')} <Link to="/login" className="text-blue-600 font-bold hover:underline">{t('signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
