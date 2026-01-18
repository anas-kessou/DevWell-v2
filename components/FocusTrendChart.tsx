import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface FocusDataPoint {
  time: string;
  focus: number;
  distraction: number;
}

interface Props {
  data?: FocusDataPoint[];
}

const FocusTrendChart: React.FC<Props> = ({ data: externalData }) => {
  const { t } = useLanguage();

  const defaultData = [
    { time: '09:00', focus: 0, distraction: 0 },
    { time: '10:00', focus: 0, distraction: 0 },
    { time: '11:00', focus: 0, distraction: 0 },
    { time: '12:00', focus: 0, distraction: 0 },
    { time: '13:00', focus: 0, distraction: 0 },
    { time: '14:00', focus: 0, distraction: 0 },
    { time: '15:00', focus: 0, distraction: 0 },
  ];

  const data = externalData && externalData.length > 0 ? externalData : defaultData;

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h3 className="font-bold text-white mb-1">{t('components.focusTrend.title')}</h3>
           <p className="text-xs text-slate-400">{t('components.focusTrend.subtitle')}</p>
        </div>
        <div className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
            {t('components.focusTrend.live')}
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
            <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}
                itemStyle={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                cursor={{ stroke: '#ffffff20' }}
            />
            <Area 
                type="monotone" 
                dataKey="focus" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorFocus)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FocusTrendChart;
