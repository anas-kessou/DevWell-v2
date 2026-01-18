import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { HealthEvent, EventType, Severity } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  events?: HealthEvent[];
}

const ActivityChart: React.FC<Props> = ({ events = [] }) => {
  const { t } = useLanguage();
  const { data, score } = useMemo(() => {
    // Start with perfect stats (100) or 0 if that's the requested "start" state
    // but usually stats start perfect and drop with alerts.
    // If we assume "Levels", they might start at 0 and go up.
    // Given it's "Balance", 100 is "Balanced".
    
    // Map events to reductions
    const initial = {
      Focus: 100,
      Posture: 100,
      Energy: 100,
      Health: 100,
      Hydration: 100,
      Breaks: 100
    };

    if (events.length > 0) {
      events.forEach(e => {
        const impact = e.severity === Severity.HIGH ? 20 : e.severity === Severity.MEDIUM ? 10 : 5;
        
        if (e.type === EventType.FOCUS) initial.Focus = Math.max(0, initial.Focus - impact);
        if (e.type === EventType.POSTURE) initial.Posture = Math.max(0, initial.Posture - impact);
        if (e.type === EventType.FATIGUE) {
          initial.Energy = Math.max(0, initial.Energy - impact);
          initial.Breaks = Math.max(0, initial.Breaks - impact);
        }
        if (e.type === EventType.STRESS) {
           initial.Health = Math.max(0, initial.Health - impact);
           initial.Focus = Math.max(0, initial.Focus - (impact/2));
        }
      });
    }

    const chartData = Object.keys(initial).map(key => ({
      subject: key,
      A: initial[key as keyof typeof initial],
      fullMark: 150
    }));

    // Calculate aggregated score
    const total = Object.values(initial).reduce((a, b) => a + b, 0);
    const avg = Math.round(total / 6);

    return { data: chartData, score: avg };
  }, [events]);

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 flex flex-col">
      <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        {t('components.activityChart.title')}
      </h3>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
              name="Current Status"
              dataKey="A"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="#3b82f6"
              fillOpacity={0.3}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              itemStyle={{ color: '#60a5fa' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
        <span>{t('components.activityChart.optimization')}</span>
        <span className={`text-${score > 80 ? 'emerald' : score > 50 ? 'yellow' : 'red'}-400`}>
          {score}% {t('components.activityChart.optimal')}
        </span>
      </div>
    </div>
  );
};
export default ActivityChart;
