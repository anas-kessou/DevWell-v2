import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { 
  QrCode, 
  Bluetooth, 
  Zap, 
  Activity, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Loader2,
  TriangleAlert,
  Power,
  Download,
  RefreshCw
} from 'lucide-react';
import { firebaseService } from '../services/firebaseService';

type ProbePhase = 'scan' | 'scanning' | 'syncing' | 'stream';

const RemoteProbe: React.FC = () => {
  const [phase, setPhase] = useState<ProbePhase>('scan');
  const [syncCode, setSyncCode] = useState<string>('');
  const [hostId, setHostId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('environment');

  
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Stream State
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  // Biometric Mock Data state
  const [vocalTension, setVocalTension] = useState<number>(12);
  const [uplinkStability, setUplinkStability] = useState<number>(98);

  // Load persisted host on mount
  useEffect(() => {
    const savedHost = localStorage.getItem('devwell_host_id');
    if (savedHost) {
      setHostId(savedHost);
      // Auto-reconnect flow could go here
      // For now, we require fresh sync for security or visual demo
    }
  }, []);

  // Listen for PWA install prompt
  useEffect(() => {
    const handler = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  useEffect(() => {
     if (phase === 'scanning') {
        const timeout = setTimeout(() => {
            const scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );
            
            scanner.render((decodedText) => {
                scanner.clear();
                setPhase('syncing');
                verifyAndConnect(decodedText);
            }, (error) => {
                // handle scan error
            });
            scannerRef.current = scanner;
        }, 100);
        return () => { 
            clearTimeout(timeout);
            if(scannerRef.current) {
                try { scannerRef.current.clear(); } catch(e){}
            }
        };
     }
  }, [phase]);

  // --- Handlers ---

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setSyncCode(val);
    setError(null);
  };

  const verifyAndConnect = async (code: string) => {
    setError(null);
    try {
      const connection = await firebaseService.verifySyncCode(code);
      setHostId(connection.hostId);
      localStorage.setItem('devwell_host_id', connection.hostId);
      setPhase('stream');
      startStream();
    } catch (err) {
      setPhase('scan');
      setError("INVALID OR EXPIRED SESSION");
    }
  };

  const handleSync = async () => {
    if (syncCode.length < 5) {
      setError("ENTER VALID HOST CODE");
      return;
    }
    setPhase('syncing');
    await verifyAndConnect(syncCode);
  };

  const startStream = async (mode: 'user' | 'environment' = 'environment') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: mode }, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      // Start Data Uplink Loop
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = window.setInterval(() => {
        captureAndSendFrame();
        // Update mock biometrics
        setVocalTension(prev => Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5))));
        setUplinkStability(prev => Math.max(80, Math.min(100, prev + (Math.random() * 4 - 2))));
      }, 1000);

    } catch (err) {
      console.error("Camera access denied:", err);
      setError("NEURAL INTERFACE LOCKED: PERMISSION DENIED");
      setPhase('scan');
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setHostId(null);
    localStorage.removeItem('devwell_host_id');
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    const newMode = cameraFacingMode === 'environment' ? 'user' : 'environment';
    setCameraFacingMode(newMode);
    startStream(newMode);
  };


  const captureAndSendFrame = () => {
    if (!videoRef.current || !canvasRef.current || !hostId) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match video
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    // Draw frame
    ctx.drawImage(videoRef.current, 0, 0);

    // Compress and encode
    const base64 = canvasRef.current.toDataURL('image/jpeg', 0.5);

    // Send to service
    firebaseService.streamDataToHost(hostId, base64, {
      timestamp: Date.now(),
      vocalTension: vocalTension
    });
  };

  const handleTerminate = () => {
    if (hostId) firebaseService.terminateSession(hostId);
    stopStream();
    setPhase('scan');
    setSyncCode('');
  };


  if (phase === 'scanning') {
      return (
        <div className="flex flex-col items-center justify-center p-8 h-full">
            <h2 className="text-xl font-bold tracking-widest text-white uppercase mb-4">Neural Scan</h2>
            <div id="reader" className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-2xl"></div>
            <button 
                onClick={() => setPhase('scan')}
                className="mt-8 text-slate-500 uppercase font-bold tracking-widest text-xs hover:text-white"
            >
                Cancel Scan
            </button>
        </div>
      );
  }

  if (phase === 'scan') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-in fade-in duration-500 overflow-y-auto">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-20 rounded-full"></div>
          <Activity className="w-16 h-16 text-blue-500 relative z-10 animate-pulse" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-[0.2em] text-blue-100 mb-2 text-center uppercase">
          Neural Probe
        </h1>
        <p className="text-slate-400 text-xs tracking-widest mb-12 font-mono">
          PROTOCOL V.3.0 // READY TO SYNC
        </p>

        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-blue-400 uppercase ml-1">
              Manual Frequency Code
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={syncCode}
                onChange={handleCodeChange}
                placeholder="Paste Session ID"
                className="w-full bg-slate-900/50 border border-slate-700 text-center text-sm font-mono text-white py-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-800 backdrop-blur-md"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono mt-2 animate-pulse">
                <TriangleAlert className="w-3 h-3" />
                {error}
              </div>
            )}
          </div>

          <button 
            onClick={handleSync}
            disabled={syncCode.length < 5}
            className={`
              w-full relative overflow-hidden py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300
              ${syncCode.length >= 5 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 hover:bg-blue-500 hover:scale-[1.02]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Initiate Handshake
            </span>
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-slate-600 text-[10px] uppercase tracking-widest">Or</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button 
            onClick={() => setPhase('scanning')}
            className="w-full border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/50 text-slate-300 py-4 rounded-xl flex items-center justify-center gap-3 transition-all group"
          >
            <QrCode className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            <span className="tracking-widest text-xs font-bold uppercase">Scan Host Matrix</span>
          </button>

          {/* PWA Install Button (Only visible if prompt is available) */}
          {installPrompt && (
            <button 
              onClick={handleInstall}
              className="w-full mt-4 bg-slate-900/50 border border-blue-500/20 hover:bg-blue-900/20 text-blue-400 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="tracking-widest text-[10px] font-bold uppercase">Install Neural Uplink</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'syncing') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 relative overflow-hidden">
        {/* Radar Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border border-blue-500/30 rounded-full radar-ping"></div>
          <div className="w-64 h-64 border border-blue-500/20 rounded-full radar-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-64 h-64 border border-blue-500/10 rounded-full radar-ping" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="z-10 flex flex-col items-center space-y-8">
          <div className="relative">
             <Bluetooth className="w-16 h-16 text-blue-400 animate-pulse" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold tracking-widest text-white uppercase">
              Searching for Host
            </h2>
            <p className="text-blue-400 font-mono text-xs">
              BEACON: {syncCode}
            </p>
          </div>

          <div className="flex gap-1 items-center h-8">
            <div className="w-1 h-3 bg-blue-600 animate-[pulse_1s_ease-in-out_infinite]"></div>
            <div className="w-1 h-5 bg-blue-600 animate-[pulse_1s_ease-in-out_0.1s_infinite]"></div>
            <div className="w-1 h-8 bg-blue-600 animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
            <div className="w-1 h-5 bg-blue-600 animate-[pulse_1s_ease-in-out_0.3s_infinite]"></div>
            <div className="w-1 h-3 bg-blue-600 animate-[pulse_1s_ease-in-out_0.4s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Phase: Stream
  return (
    <div className="relative w-full h-full bg-black flex flex-col">
      {/* Hidden Canvas for Processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] text-blue-400 font-mono tracking-widest flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              LIVE FEED
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider mt-1">
              {hostId?.split('_')[1] || 'UNKNOWN'}
            </span>
          </div>
          <div className="flex gap-3">
             <div className="bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-full flex items-center gap-2">
               <Wifi className={`w-3 h-3 ${uplinkStability > 90 ? 'text-green-400' : 'text-yellow-400'}`} />
               <span className="text-[10px] font-mono text-slate-300">{uplinkStability}%</span>
             </div>
          </div>
        </div>
      </div>

      {/* Main Viewfinder */}
      <div className="flex-grow relative overflow-hidden m-0 sm:m-4 sm:rounded-3xl border-y-2 sm:border-2 border-slate-800 bg-slate-900">
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Cyber Overlay UI */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scan Line */}
          <div className="scan-line z-10 opacity-30"></div>
          
          {/* Corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500/50 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg" />
          
          {/* Center Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-blue-400/20 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Dynamic Data Overlay */}
        <div className="absolute bottom-6 left-4 right-4 z-20 space-y-3">
          <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">Vocal Tension</span>
              <span className="text-sm font-mono text-white">{Math.round(vocalTension)}<span className="text-[10px] text-slate-400 ml-1">Hz</span></span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-300 ease-out"
                style={{ width: `${vocalTension}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Footer */}
      <div className="p-6 bg-slate-950 border-t border-slate-800 z-30 pb-8 sm:pb-6 flex gap-3">
        <button 
          onClick={toggleCamera}
          className="flex-[1] group bg-slate-900 border border-blue-900/30 hover:bg-blue-950/20 hover:border-blue-500/50 text-blue-400 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        </button>

        <button 
          onClick={handleTerminate}
          className="flex-[4] group bg-slate-900 border border-red-900/30 hover:bg-red-950/20 hover:border-red-500/50 text-red-400 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          <Power className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-mono text-xs tracking-[0.2em] font-bold uppercase">Terminate Protocol</span>
        </button>
      </div>

    </div>
  );
};

export default RemoteProbe;