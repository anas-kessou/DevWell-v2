
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { HealthEvent, Severity } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  events: HealthEvent[];
  dailyAlertCount?: number;
  currentFatigue?: number;
  dailyAvgFatigue?: number;
}

const HealthCharts: React.FC<Props> = ({ events, dailyAlertCount = 0, currentFatigue = 0, dailyAvgFatigue = 0 }) => {
  const { t } = useLanguage();
  const chartData = useMemo(() => {
    // Generate flat baseline if no events
    if (events.length === 0) {
      return Array.from({ length: 7 }, (_, i) => ({
        time: `${i + 8}:00`, // Reasonable day start times
        events: 0,
        severity: 0
      }));
    }

    const groups = new Map();
    events.forEach(e => {
      const hour = new Date(e.timestamp).getHours() + ':00';
      const val = groups.get(hour) || 0;
      groups.set(hour, val + 1);
    });

    // Fill in gaps or just show what we have
    // For a better chart, let's just map the events or return the groups
    // If we want a nice line, we need sorted time entries
    const sortedEntries = Array.from(groups.entries()).sort((a,b) => parseInt(a[0]) - parseInt(b[0]));
    
    // If we have very few data points, pad them strictly for visual stability if needed, 
    // but the user asked for dynamic data. Let's just return the actuals mapped to the format.
    if (sortedEntries.length === 0) return []; // Should be caught by events.length === 0 check above

    return sortedEntries.map(([time, count]) => ({
      time,
      events: count,
      severity: count * 20 // Still simplified severity estimation
    }));
  }, [events]);

  const stats = useMemo(() => {
    // Determine LED color based on fatigue level (1-9)
    let ledColor = 'bg-slate-500'; // default
    if (currentFatigue >= 1 && currentFatigue <= 3) ledColor = 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]';
    else if (currentFatigue >= 4 && currentFatigue <= 6) ledColor = 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]';
    else if (currentFatigue >= 7 && currentFatigue <= 9) ledColor = 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';

    return [
      { label: t('components.healthCharts.totalAlerts'), value: dailyAlertCount, trend: t('components.healthCharts.today') },
      { label: t('components.healthCharts.fatigueDetection'), value: currentFatigue, isLed: true, ledColor },
      { label: t('components.healthCharts.avgFatigue'), value: dailyAvgFatigue, trend: t('components.healthCharts.daily') }
    ];
  }, [events, dailyAlertCount, currentFatigue, dailyAvgFatigue, t]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end justify-between">
              {stat.isLed ? (
                <div className="flex items-center gap-4">
                   <h4 className="text-3xl font-black text-slate-200">{t('components.healthCharts.level')} {stat.value}</h4>
                   <div className={`w-6 h-6 rounded-full ${stat.ledColor} animate-pulse`} />
                </div>
              ) : (
                <h4 className="text-3xl font-black text-slate-200">{stat.value}</h4>
              )}
              
              {!stat.isLed && (
                 <span className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded-full text-slate-400 border border-white/5">
                  {stat.trend}
                 </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
        <h3 className="font-bold mb-4">{t('components.healthCharts.wellnessTrend')}</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="events" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEvents)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthCharts;
