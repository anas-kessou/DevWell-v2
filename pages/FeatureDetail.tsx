// pages/FeatureDetail.tsx
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Radio, 
  Brain, 
  Lock, 
  MessageSquare, 
  BarChart3, 
  ArrowLeft,
  Activity,
  CheckCircle,
  Zap
} from 'lucide-react';

type FeatureData = {
  id: string;
  title: string;
  icon: React.ReactNode;
  purpose: string;
  role: string;
  importance: string;
  technicalDetails: string;
};

const featureContent: Record<string, FeatureData> = {
  'vision-biometrics': {
    id: 'vision-biometrics',
    title: 'Vision Biometrics',
    icon: <Eye className="w-12 h-12 text-blue-500" />,
    purpose: "To continuously monitor the user's physical engagement and ocular health in real-time without requiring wearable hardware.",
    role: "The Vision Biometrics engine utilizes the Gemini 3 Neural Vision model to analyze video feeds at 30 frames per second. It detects blink frequency, yawing patterns, and head posture deviations. It serves as the 'eyes' of the system, understanding when a user is physically fatigued or losing focus.",
    importance: "Computer Vision Syndrome (CVS) and tech-neck are the leading causes of chronic pain in developers. By catching micro-signs of fatigue (like increased blink rate or forward head posture) early, we can intervene before permanent strain occurs, keeping the developer in a healthy flow state longer.",
    technicalDetails: "Uses TensorFlow.js for local face mesh tracking. Privacy-first architecture ensures video frames are processed in memory and never stored."
  },
  'vocal-stress-probe': {
    id: 'vocal-stress-probe',
    title: 'Vocal Stress Probe',
    icon: <Radio className="w-12 h-12 text-magenta-500" />,
    purpose: "To identify latent mental stress and cognitive load through auditory analysis of the user's voice during meetings or self-talk.",
    role: "This module captures audio samples to analyze pitch variance, speech rate, and pause duration. It acts as an emotional barometer, detecting frustration or exhaustion that might not yet be visible on the face.",
    importance: "Burnout is often emotional before it is physical. Changes in vocal tone are one of the earliest biomarkers of high cortisol levels. Detecting these shifts allows DevWell to suggest deep breathing or breaks exactly when emotional regulation is needed most.",
    technicalDetails: "WebAudio API coupled with Gemini Audio processing. Features noise cancellation and local voice activity detection (VAD)."
  },
  'predictive-burnout': {
    id: 'predictive-burnout',
    title: 'Predictive Burnout Model',
    icon: <Brain className="w-12 h-12 text-indigo-400" />,
    purpose: "To move from reactive health tracking to proactive wellness forecasting, predicting exhaustion events before they happen.",
    role: "This is the central intelligence of the platform. It aggregates data from vision, audio, and keyboard activity to build a 4-hour forecast model. It acts as a weather forecast for your brain energy.",
    importance: "Most developers only stop when they crash. Predictive Burnout allows for 'energy management' rather than just 'time management'. Knowing you are at 80% risk of burnout in 2 hours allows you to adjust your workflow now to prevent the crash later.",
    technicalDetails: "TimeSeries analysis using weighted moving averages of stress markers, cross-referenced with circadian rhythm data."
  },
  'privacy-core': {
    id: 'privacy-core',
    title: 'Privacy Core',
    icon: <Lock className="w-12 h-12 text-emerald-400" />,
    purpose: "To ensure that highly sensitive biometric data remains under the user's absolute control and is never exploited.",
    role: "Privacy Core acts as the gatekeeper. It scrubs PII (Personally Identifiable Information) from all data streams before any local processing. It enforces 'Edge-First' processing, meaning analysis happens on your machine, not a cloud server.",
    importance: "Trust is the foundation of adoption. Developers will not use a tool that spies on them. Privacy Core guarantees that DevWell acts as a private health coach, not a corporate surveillance tool.",
    technicalDetails: "AES-256 Encryption for local logs. Ephemeral memory processing for video/audio streams."
  },
  'adhd-hub': {
    id: 'adhd-hub',
    title: 'ADHD Focus Hub',
    icon: <MessageSquare className="w-12 h-12 text-orange-400" />,
    purpose: "To provide a specialized environment that accommodates neurodivergent working styles and attention spans.",
    role: "The ADHD Hub transforms the dashboard into a high-contrast, low-noise environment. It introduces gamified micro-goals ('Pomodoro on steroids') and uses bionic reading fonts to maintaining focus.",
    importance: "Neurodiversity is common in tech. Standard tools often overwhelm ADHD minds. This hub provides the rigid structure and immediate dopamine feedback loops required for neurodiverse developers to thrive without feeling overwhelmed.",
    technicalDetails: "Dynamic UI contrast adjustment, distraction blocking integration, and specialized audio-visual cues."
  },
  'platform-root': {
    id: 'platform-root',
    title: 'Platform Analytics Root',
    icon: <BarChart3 className="w-12 h-12 text-cyan-400" />,
    purpose: "To visualize long-term health trends and correlate them with coding productivity.",
    role: "This feature serves as the historian. It stores aggregated, anonymized health events to show you weeks or months of data. It answers questions like 'Do I code better in the morning?' or 'Does meetings increase my stress?'",
    importance: "Self-awareness requires data. Long-term analytics allow developers to optimize their entire lifestyle—sleep, work hours, environment—based on empirical evidence of what works for their specific biology.",
    technicalDetails: "Firestore indexed queries for rapid retrieval of historical datasets. Client-side data visualization using D3/Recharts."
  }
};

const FeatureDetail: React.FC = () => {
  const { featureId } = useParams<{ featureId: string }>();
  const navigate = useNavigate();
  const feature = featureId ? featureContent[featureId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!feature) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Feature Not Found</h2>
            <button onClick={() => navigate('/')} className="text-blue-500 underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
        {/* Navigation */}
       <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
             <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <Activity size={18} className="text-white" />
            </div>
            <span>DevWell</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-20">
        <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center p-6 bg-slate-900 border border-white/10 rounded-3xl mb-8 shadow-2xl">
                <div className="text-blue-500 scale-150">
                    {feature.icon}
                </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                {feature.title}
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                {feature.purpose}
            </p>
        </div>

        <div className="grid gap-8">
            <div className="glass-card p-10 rounded-[40px] border border-white/5 bg-slate-900/50">
                <div className="flex items-start gap-4 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
                        <Zap size={20} />
                    </div>
                     <div>
                        <h3 className="text-xl font-black uppercase mb-3">The Role</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {feature.role}
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-card p-10 rounded-[40px] border border-white/5 bg-slate-900/50">
                <div className="flex items-start gap-4 mb-2">
                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 mt-1">
                        <CheckCircle size={20} />
                    </div>
                     <div>
                        <h3 className="text-xl font-black uppercase mb-3">Why It Matters</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {feature.importance}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-[32px] bg-white/5 border border-white/5 mt-8">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Technical Architecture</h4>
                <p className="text-sm font-mono text-slate-400">
                    {feature.technicalDetails}
                </p>
            </div>
        </div>
        
        <div className="mt-20 flex justify-center">
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-xl hover:shadow-blue-600/20 hover:scale-105">
                Try {feature.title} Now
            </Link>
        </div>
      </main>
    </div>
  );
};

export default FeatureDetail;
