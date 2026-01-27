
import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  hourlyFatigue: { time: string; avgFatigue: number }[];
}

const CircadianRhythmChart: React.FC<Props> = ({ hourlyFatigue }) => {
    // Inverse fatigue to show "Energy" or "Alertness"
    const rhythmData = hourlyFatigue.map(d => ({
        time: d.time,
        energy: Math.max(0, 10 - d.avgFatigue) // 0-10 scale
    }));

    // Fill missing data with a standard circadian curve if empty
    const displayData = rhythmData.length > 0 ? rhythmData : Array.from({length: 24}, (_, i) => ({
        time: `${i}:00`,
        energy: i > 8 && i < 20 ? 8 : 4 // Basic approximation
    }));

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-300">Circadian Rhythm</h3>
            <span className="text-[10px] text-slate-500 font-mono mt-1">ESTIMATED ENERGY LEVELS</span>
          </div>
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-[10px] uppercase font-bold text-slate-400">Solar Cycle</span>
          </div>
      </div>
      
      <div className="h-[180px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData}>
            <defs>
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} interval={4} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: '#fff', fontSize: '12px' }}
            />
            <Area 
              type="basis" 
              dataKey="energy" 
              stroke="#f59e0b" 
              fill="url(#energyGradient)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Decorative Overlay for Night/Day */}
        <div className="absolute inset-0 pointer-events-none flex w-full h-full opacity-10">
            <div className="flex-1 bg-indigo-900" /> {/* Night */}
            <div className="flex-[2] bg-yellow-500" /> {/* Day */}
            <div className="flex-1 bg-indigo-900" /> {/* Night */}
        </div>
      </div>
    </div>
  );
};

export default CircadianRhythmChart;
