
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HealthEvent, Severity } from '../types';

interface Props {
  events: HealthEvent[];
}

const PostureScoreChart: React.FC<Props> = ({ events }) => {
  // Filter for posture events and convert to score
  // We'll simulate a continuous score by assuming "default" is 100
  // and drops based on events
  const postureData = React.useMemo(() => {
      if (events.length === 0) return [];
      
      const postureEvents = events.filter(e => e.type === 'POSTURE' || e.type === 'FATIGUE').sort((a,b) => a.timestamp - b.timestamp);
      
      return postureEvents.map(e => {
          let score = 100;
          if (e.severity === Severity.HIGH) score = 40;
          else if (e.severity === Severity.MEDIUM) score = 70;
          else score = 90;

          return {
              time: new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              score,
              description: e.description
          };
      });
  }, [events]);

  if (postureData.length === 0) {
      return (
          <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 flex items-center justify-center h-[250px]">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No Posture Data Available</p>
          </div>
      );
  }

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-sm uppercase tracking-widest text-slate-300">Posture Quality</h3>
          <span className="text-xs font-mono text-blue-400">Last 24H</span>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={postureData}>
            <defs>
              <linearGradient id="postureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.5}/>
                <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" opacity={0.05} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} interval="preserveStartEnd" minTickGap={30} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Line 
              type="stepAfter" 
              dataKey="score" 
              stroke="#10b981" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, fill: '#fff', stroke: '#10b981' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PostureScoreChart;
