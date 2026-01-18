import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
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
import { useLanguage } from '../contexts/LanguageContext';

type FeatureData = {
  id: string;
  title: string;
  icon: React.ReactNode;
  purpose: string;
  role: string;
  importance: string;
  technicalDetails: string;
};

const FeatureDetail: React.FC = () => {
  const { featureId } = useParams<{ featureId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useLanguage();
  const backPath = (location.state as any)?.from === 'dashboard' ? '/dashboard' : '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featureContent: Record<string, FeatureData> = {
    'vision-biometrics': {
      id: 'vision-biometrics',
      title: t('detailedFeatures.vision-biometrics.title'),
      icon: <Eye className="w-12 h-12 text-blue-500" />,
      purpose: t('detailedFeatures.vision-biometrics.purpose'),
      role: t('detailedFeatures.vision-biometrics.role'),
      importance: t('detailedFeatures.vision-biometrics.importance'),
      technicalDetails: t('detailedFeatures.vision-biometrics.technical'),
    },
    'vocal-stress-probe': {
        id: 'vocal-stress-probe',
        title: t('detailedFeatures.vocal-stress-probe.title'),
        icon: <Radio className="w-12 h-12 text-magenta-500" />,
        purpose: t('detailedFeatures.vocal-stress-probe.purpose'),
        role: t('detailedFeatures.vocal-stress-probe.role'),
        importance: t('detailedFeatures.vocal-stress-probe.importance'),
        technicalDetails: t('detailedFeatures.vocal-stress-probe.technical'),
    },
    'predictive-burnout': {
        id: 'predictive-burnout',
        title: t('detailedFeatures.predictive-burnout.title'),
        icon: <Brain className="w-12 h-12 text-indigo-400" />,
        purpose: t('detailedFeatures.predictive-burnout.purpose'),
        role: t('detailedFeatures.predictive-burnout.role'),
        importance: t('detailedFeatures.predictive-burnout.importance'),
        technicalDetails: t('detailedFeatures.predictive-burnout.technical'),
    },
    'privacy-core': {
        id: 'privacy-core',
        title: t('detailedFeatures.privacy-core.title'),
        icon: <Lock className="w-12 h-12 text-emerald-400" />,
        purpose: t('detailedFeatures.privacy-core.purpose'), 
        role: t('detailedFeatures.privacy-core.role'),
        importance: t('detailedFeatures.privacy-core.importance'),
        technicalDetails: t('detailedFeatures.privacy-core.technical'),
    },
    'adhd-hub': {
        id: 'adhd-hub',
        title: t('detailedFeatures.adhd-hub.title'),
        icon: <MessageSquare className="w-12 h-12 text-orange-400" />,
        purpose: t('detailedFeatures.adhd-hub.purpose') || "Specialized focus environment",
        role: t('detailedFeatures.adhd-hub.role') || "High contrast interface",
        importance: t('detailedFeatures.adhd-hub.importance') || "Standard tools overwhelm",
        technicalDetails: t('detailedFeatures.adhd-hub.technical') || "Dynamic UI contrast"
    },
    'platform-root': {
        id: 'platform-root',
        title: t('detailedFeatures.platform-root.title'),
        icon: <BarChart3 className="w-12 h-12 text-cyan-400" />,
        purpose: t('detailedFeatures.platform-root.purpose') || "Visualize long term trends",
        role: t('detailedFeatures.platform-root.role') || "Historian of health events",
        importance: t('detailedFeatures.platform-root.importance') || "Self awareness requires data",
        technicalDetails: t('detailedFeatures.platform-root.technical') || "Firestore indexed queries"
    }
  };

  const feature = featureId ? featureContent[featureId] : null;

  if (!feature) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white" dir={dir}>
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t('features.notFound') || "Feature Not Found"}</h2>
            <button onClick={() => navigate(backPath)} className="text-blue-500 underline">{t('about.returnHome') || "Return Home"}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30" dir={dir}>
        {/* Navigation */}
       <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link to={backPath} className="p-2 hover:bg-white/5 rounded-full transition-colors">
             <ArrowLeft size={24} className={dir === 'rtl' ? 'rotate-180' : ''} />
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
                        <h3 className="text-xl font-black uppercase mb-3">{t('features.role') || "The Role"}</h3>
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
                        <h3 className="text-xl font-black uppercase mb-3">{t('features.importance') || "Why It Matters"}</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {feature.importance}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-[32px] bg-white/5 border border-white/5 mt-8">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{t('features.technical') || "Technical Architecture"}</h4>
                <p className="text-sm font-mono text-slate-400">
                    {feature.technicalDetails}
                </p>
            </div>
        </div>
        
        <div className="mt-20 flex justify-center">
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-xl hover:shadow-blue-600/20 hover:scale-105">
                {t('features.try', { 0: feature.title }) || `Try ${feature.title} Now`}
            </Link>
        </div>
      </main>
    </div>
  );
};

export default FeatureDetail;
