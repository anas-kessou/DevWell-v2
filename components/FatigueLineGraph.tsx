import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  data: { timestamp: number; level: number }[];
}

const FatigueLineGraph: React.FC<Props> = ({ data }) => {
  const formattedData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    level: d.level,
    originalTimestamp: d.timestamp
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold mb-4">Fatigue Levels (1-9)</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
            <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} ticks={[1, 3, 6, 9]} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff' }}
            />
            {/* Threshold Lines */}
            <ReferenceLine y={3} stroke="#3b82f6" strokeDasharray="3 3" opacity={0.3} />
            <ReferenceLine y={6} stroke="#22c55e" strokeDasharray="3 3" opacity={0.3} />
            <ReferenceLine y={9} stroke="#ef4444" strokeDasharray="3 3" opacity={0.3} />
            
            <Line 
              type="monotone" 
              dataKey="level" 
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6, fill: '#fff' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FatigueLineGraph;