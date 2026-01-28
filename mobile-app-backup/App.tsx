import React from 'react';
import RemoteProbe from './components/RemoteProbe';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-slate-950 text-slate-100 overflow-hidden relative selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full h-full">
        <RemoteProbe />
      </div>
    </div>
  );
};

export default App;