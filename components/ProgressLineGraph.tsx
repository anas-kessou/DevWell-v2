import React, { useRef, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line } from 'recharts';

interface Props {
  data: any[];
}

const ProgressLineGraph: React.FC<Props> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to end when data loads
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  // Dynamic width calculation for "infinite" extendable graph
  // If data grows, width grows, creating scroll
  const pointWidth = 60; // Pixels per data point
  const minGraphWidth = 800; // Ensure it looks good on desktop
  const graphWidth = Math.max(minGraphWidth, data.length * pointWidth);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold mb-4">Continuous Improvement Process</h3>
      
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
      >
        <div style={{ width: `${graphWidth}px`, height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#334155" opacity={0.2} />
              <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#64748b'}} 
                  interval="preserveStartEnd"
                  padding={{ left: 20, right: 20 }}
              />
              <YAxis 
                  yAxisId="left" 
                  orientation="left" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#10b981'}} 
                  domain={[0, 100]}
                  label={{ value: 'Productivity', angle: -90, position: 'insideLeft', fill: '#10b981', fontSize: 10 }}
              />
              <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#ef4444'}} 
                  domain={[0, 10]}
                  label={{ value: 'Avg Fatigue', angle: 90, position: 'insideRight', fill: '#ef4444', fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', background: '#0f172a', color: '#fff' }}
                labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="productivityScore" 
                  name="Productivity Index"
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorProd)" 
              />
              
              <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="avgFatigue" 
                  name="Avg Fatigue"
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  dot={false}
                  strokeDasharray="5 5"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-widest">
         Timeline Data from initial synchronization
      </p>
    </div>
  );
};

export default ProgressLineGraph;