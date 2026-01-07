
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { HealthEvent, Severity } from '../types';

interface Props {
  events: HealthEvent[];
}

const HealthCharts: React.FC<Props> = ({ events }) => {
  const chartData = useMemo(() => {
    // Generate dummy trend if no events
    if (events.length < 2) {
      return Array.from({ length: 7 }, (_, i) => ({
        time: i + ':00',
        events: Math.floor(Math.random() * 5),
        severity: Math.floor(Math.random() * 100)
      }));
    }

    const groups = new Map();
    events.forEach(e => {
      const hour = new Date(e.timestamp).getHours() + ':00';
      const val = groups.get(hour) || 0;
      groups.set(hour, val + 1);
    });

    return Array.from(groups.entries()).map(([time, count]) => ({
      time,
      events: count,
      severity: count * 20 // Dummy intensity
    })).sort((a,b) => a.time.localeCompare(b.time));
  }, [events]);

  const stats = useMemo(() => {
    const total = events.length;
    const high = events.filter(e => e.severity === Severity.HIGH).length;
    const avgSev = total > 0 ? (events.reduce((acc, e) => {
      if (e.severity === Severity.HIGH) return acc + 100;
      if (e.severity === Severity.MEDIUM) return acc + 50;
      return acc + 10;
    }, 0) / total).toFixed(0) : 0;

    return [
      { label: 'Total Alerts', value: total, trend: '+12%' },
      { label: 'Critical Issues', value: high, trend: '-5%', color: 'text-red-500' },
      { label: 'Avg Severity', value: avgSev + '%', trend: 'Stable' }
    ];
  }, [events]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-medium mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h4 className={`text-2xl font-bold ${stat.color || ''}`}>{stat.value}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : stat.trend.startsWith('-') ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
        <h3 className="font-bold mb-8">Wellness Trend</h3>
        <div className="h-[300px] w-full">
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
