import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import { FirebaseService } from '../services/firebaseService';

interface Props {
  onRegister: () => void;
}

const Register: React.FC<Props> = ({ onRegister }) => {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-950">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 font-bold text-3xl text-white mb-12 justify-center">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Activity size={28} />
          </div>
          <span>DevWell</span>
        </div>

        <div className="bg-white rounded-[32px] p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Join DevWell</h2>
          <p className="text-slate-500 text-sm mb-8">Start your personalized wellness monitoring today.</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-4 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Join With</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGithubLogin}
              type="button"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-semibold text-sm disabled:opacity-50"
            >
              <Github size={18} /> GitHub
            </button>
            <button 
              onClick={handleGoogleLogin}
              type="button"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-semibold text-sm disabled:opacity-50"
            >
              <Chrome size={18} /> Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 font-bold hover:underline">Login Instead</Link>
        </p>

        <div className="mt-8 text-center text-sm text-slate-500">
           <Link to="/" className="text-blue-500 font-bold hover:underline">
             ← Back to Home
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
