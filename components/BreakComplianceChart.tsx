
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BreakComplianceChart: React.FC = () => {
  // Mock data for prototype
  const data = [
      { name: 'Mon', planned: 5, actual: 4 },
      { name: 'Tue', planned: 5, actual: 3 },
      { name: 'Wed', planned: 6, actual: 6 },
      { name: 'Thu', planned: 5, actual: 4 },
      { name: 'Fri', planned: 5, actual: 2 },
      { name: 'Sat', planned: 2, actual: 2 },
      { name: 'Sun', planned: 1, actual: 1 },
  ];

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-sm uppercase tracking-widest text-slate-300">Break Compliance</h3>
          <span className="text-xs font-mono text-purple-400">Weekly</span>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" opacity={0.05} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="planned" fill="#334155" radius={[4, 4, 0, 0]} name="Planned Breaks" />
            <Bar dataKey="actual" fill="#818cf8" radius={[4, 4, 0, 0]} name="Actual Breaks">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.actual >= entry.planned ? '#4ade80' : '#818cf8'} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BreakComplianceChart;
