import React, { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
    data?: number[][];
}

const StressHeatmap: React.FC<Props> = ({ data: externalData }) => {
  const { t } = useLanguage();

  // Mock data representing 24h over 7 days (or similar grid)
  // Let's do a simple 7-day x 5-time-slot grid for simplicity on dashboard
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night'];

  // 0 = low stress, 1 = med, 2 = high
  const defaultData = [
      [0, 0, 0, 0, 0], // Mon
      [0, 0, 0, 0, 0], // Tue
      [0, 0, 0, 0, 0], // Wed
      [0, 0, 0, 0, 0], // Thu
      [0, 0, 0, 0, 0], // Fri
      [0, 0, 0, 0, 0], // Sat
      [0, 0, 0, 0, 0], // Sun
  ];

  const data = externalData || defaultData;

  const getColor = (level: number) => {
      switch(level) {
          case 0: return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20';
          case 1: return 'bg-amber-500/20 text-amber-500 border-amber-500/20';
          case 2: return 'bg-red-500/20 text-red-500 border-red-500/20';
          default: return 'bg-slate-800';
      }
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h3 className="font-bold text-white mb-1">{t('components.stressHeatmap.title')}</h3>
           <p className="text-xs text-slate-400">{t('components.stressHeatmap.subtitle')}</p>
        </div>
        <div className="bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            {t('components.stressHeatmap.proInsights')}
        </div>
      </div>

      <div className="overflow-x-auto">
          <div className="min-w-[300px] grid grid-cols-6 gap-2">
            {/* Header */}
            <div className="col-span-1"></div>
            {timeSlots.map((slot, i) => (
                <div key={i} className="text-[10px] font-black uppercase text-slate-500 text-center tracking-widest">{slot.slice(0,3)}</div>
            ))}

            {/* Rows */}
            {days.map((day, dIndex) => (
                <React.Fragment key={dIndex}>
                    <div className="text-[10px] font-bold text-slate-400 self-center uppercase tracking-wider">{day}</div>
                    {timeSlots.map((_, tIndex) => {
                        const level = data[dIndex][tIndex];
                        return (
                            <div key={tIndex} className={`h-8 rounded-lg border flex items-center justify-center transition-all hover:scale-105 cursor-default ${getColor(level)}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${level === 0 ? 'bg-emerald-500' : level === 1 ? 'bg-amber-500' : 'bg-red-500'}`} />
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
          </div>
      </div>
    </div>
  );
};

export default StressHeatmap;
