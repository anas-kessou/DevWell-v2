import React, { useState, useEffect, useRef } from 'react';
import { Wifi, ArrowDown, ArrowUp, Activity, Zap, RefreshCw, Monitor, Gamepad2, Video, User } from 'lucide-react';

const SpeedTestWidget: React.FC = () => {
  const [testState, setTestState] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const [gaugeColor, setGaugeColor] = useState('#3b82f6'); // Default Blue

  const startTest = () => {
    setTestState('ping');
    setProgress(0);
    setPing(0);
    setJitter(0);
    setDownload(0);
    setUpload(0);
    setCurrentValue(0);
    setGaugeColor('#06b6d4'); // Cyan for prep

    // Simulated Sequence
    // 1. Ping Phase
    setTimeout(() => {
      setPing(Math.floor(Math.random() * 25) + 8);
      setJitter(Math.floor(Math.random() * 5) + 1);
      setTestState('download');
      setGaugeColor('#06b6d4'); // Cyan for download
    }, 1500);
  };

  useEffect(() => {
    if (testState === 'download') {
      setGaugeColor('#06b6d4');
      const target = 150 + Math.random() * 50; // Max 200ish
      let current = 0;
      // @ts-ignore
      const interval = setInterval(() => {
        current += (target - current) * 0.1 + (Math.random() * 5 - 2.5);
        if (current < 0) current = 0;
        setCurrentValue(current);
        if (progress < 100) setProgress(p => p + 1);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        setDownload(current);
        setCurrentValue(0);
        setProgress(0);
        setTestState('upload');
      }, 5000);
    }

    if (testState === 'upload') {
      setGaugeColor('#a855f7'); // Purple for upload
      const target = 50 + Math.random() * 20;
      let current = 0;
      // @ts-ignore
      const interval = setInterval(() => {
        current += (target - current) * 0.1 + (Math.random() * 2 - 1);
        if (current < 0) current = 0;
        setCurrentValue(current);
        if (progress < 100) setProgress(p => p + 1.5);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        setUpload(current);
        setCurrentValue(0);
        setProgress(100);
        setTestState('complete');
        setGaugeColor('#3b82f6'); // Reset to blue
      }, 4000);
    }
  }, [testState]);

  // Gauge Calculation
  // 0 to 240 degrees mapped from 0 to 1000 Mbps (log scale visual approximation)
  // Let's use linear for simplicity: 0-200Mbps covers most of the range for this demo
  const maxScale = testState === 'upload' ? 100 : 300;
  const rotation = Math.min(240, (currentValue / maxScale) * 240) - 120;
  const strokeDashoffset = 565 - (565 * (currentValue / maxScale)); 

  return (
    <div className="rounded-[24px] p-4 border border-white/5 relative overflow-hidden h-full flex flex-col bg-slate-900/50">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="flex flex-col">
           <div className="flex items-center gap-1 mb-0.5 text-cyan-400">
              <ArrowDown size={10} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Down</span>
           </div>
           <div className="text-2xl font-black text-white tracking-tighter">
              {download > 0 ? download.toFixed(1) : testState === 'download' ? currentValue.toFixed(1) : '—'}
           </div>
        </div>
        <div className="flex flex-col">
           <div className="flex items-center gap-1 mb-0.5 text-purple-400">
              <ArrowUp size={10} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Up</span>
           </div>
           <div className="text-2xl font-black text-white tracking-tighter">
              {upload > 0 ? upload.toFixed(1) : testState === 'upload' ? currentValue.toFixed(1) : '—'}
           </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="flex items-center justify-between px-1 mb-2">
         <div className="flex items-center gap-3">
            <div>
               <span className="text-[8px] font-bold text-slate-500 uppercase block">Ping</span>
               <span className="text-xs font-black text-white flex items-center gap-1">
                 {ping > 0 ? ping : '-'} <Activity size={8} className="text-yellow-500" />
               </span>
            </div>
            <div>
               <span className="text-[8px] font-bold text-slate-500 uppercase block">Jitter</span>
               <span className="text-xs font-black text-white flex items-center gap-1">
                 {jitter > 0 ? jitter : '-'} <Zap size={8} className="text-cyan-500" />
               </span>
            </div>
         </div>
      </div>

      {/* Gauge Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[160px]">
        <div className="relative w-40 h-40">
           {/* SVG Gauge */}
           <svg className="w-full h-full transform -rotate-[120deg]" viewBox="0 0 256 256">
             <defs>
               <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#06b6d4" />
                 <stop offset="100%" stopColor="#3b82f6" />
               </linearGradient>
               <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#a855f7" />
                 <stop offset="100%" stopColor="#d946ef" />
               </linearGradient>
             </defs>
             {/* Track */}
             <path 
                d="M 50,206 A 110,110 0 1,1 206,206"
                fill="none"
                stroke="#1e293b"
                strokeWidth="20"
                strokeLinecap="round"
             />
             {/* Progress Arc */}
             <path 
                d="M 50,206 A 110,110 0 1,1 206,206"
                fill="none"
                stroke={`url(#${testState === 'upload' ? 'purpleGradient' : 'gaugeGradient'})`}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray="565" // Approx length of the arc
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-100 ease-linear"
                style={{ filter: `drop-shadow(0 0 10px ${gaugeColor}80)` }}
             />
           </svg>
           
           {/* Ticks (Static Overlay) */}
           <div className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-30deg)' }}>
               {[0, 10, 50, 100, 250, 500].map((tick, i) => {
                  const angle = (i / 5) * 240 - 120;
                  return (
                    <div 
                      key={tick}
                      className="absolute top-1/2 left-1/2 w-full text-center"
                      style={{ 
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -90px) rotate(${-angle + 30}deg)` 
                      }}
                    >
                      <span className="text-[10px] font-bold text-slate-600">{tick}</span>
                    </div>
                  );
               })}
           </div>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
               {testState === 'idle' ? (
                  <button 
                    onClick={startTest}
                    className="w-12 h-12 rounded-full bg-transparent border-2 border-cyan-500 text-cyan-400 font-black text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    GO
                  </button>
               ) : (
                 <>
                    <div className="text-2xl font-black text-white tracking-tighter tabular-nums leading-none">
                      {currentValue.toFixed(0)}
                    </div>
                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{testState === 'download' ? 'Down' : 'Up'}</div>
                 </>
               )}
            </div>
        </div>
      </div>
      
       {/* Re-run button */}
       {testState === 'complete' && (
          <div className="absolute bottom-8 right-8">
            <button 
              onClick={startTest}
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all"
            >
              <RefreshCw size={20} className="text-cyan-400" />
            </button>
          </div>
       )}
    </div>
  );
};

export default SpeedTestWidget;

