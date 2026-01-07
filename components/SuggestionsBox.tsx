
import React, { useMemo } from 'react';
import { Sparkles, Coffee, Eye, Move, Zap } from 'lucide-react';
import { HealthEvent, Severity } from '../types';

interface Props {
  events: HealthEvent[];
}

const SuggestionsBox: React.FC<Props> = ({ events }) => {
  const latestEvent = events[0];
  
  const advice = useMemo(() => {
    if (!latestEvent) return {
      title: "Doing Great!",
      message: "Keep up the flow. Remember to hydrate every hour.",
      icon: <Sparkles className="text-yellow-500" />,
      color: "bg-yellow-50 border-yellow-100"
    };

    if (latestEvent.severity === Severity.HIGH) {
      return {
        title: "Immediate Break Required",
        message: "Your fatigue levels are high. Take a 15-minute walk or rest your eyes now.",
        icon: <Zap className="text-red-500" />,
        color: "bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800"
      };
    }

    if (latestEvent.severity === Severity.MEDIUM) {
      return {
        title: "Try the 20-20-20 Rule",
        message: "Every 20 minutes, look at something 20 feet away for 20 seconds.",
        icon: <Eye className="text-blue-500" />,
        color: "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800"
      };
    }

    return {
      title: "Stretching Time",
      message: "Roll your shoulders and adjust your seat to improve posture.",
      icon: <Move className="text-green-500" />,
      color: "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800"
    };
  }, [latestEvent]);

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 ${advice.color}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm">
          {advice.icon}
        </div>
        <div>
          <h4 className="font-bold mb-1">{advice.title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{advice.message}</p>
        </div>
      </div>
      <button className="w-full mt-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-100 dark:border-slate-700">
        Tell Me More
      </button>
    </div>
  );
};

export default SuggestionsBox;
