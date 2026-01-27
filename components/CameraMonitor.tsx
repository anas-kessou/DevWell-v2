import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Camera, CameraOff, Mic, MicOff, Scan, ShieldAlert, Zap, Waves, Activity, Loader2, Smartphone } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { FirebaseService } from '../services/firebaseService';
import { HealthEvent, Severity, EventType } from '../types';

export interface CameraMonitorHandle {
  getSnapshot: () => string | null;
}

interface Props {
  onEventDetected: (event: Omit<HealthEvent, 'id' | 'timestamp'>) => void;
  isMonitoring: boolean;
  setIsMonitoring: (val: boolean) => void;
}

const CameraMonitor = forwardRef<CameraMonitorHandle, Props>(({ onEventDetected, isMonitoring, setIsMonitoring }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [remoteSessionId, setRemoteSessionId] = useState<string | null>(null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<'web' | 'mobile' | null>(null);
  
  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
      // If remote, return the last known remote image (stripped of header)
      if (remoteImage && activeSource === 'mobile') return remoteImage.split(',')[1];

      if (!videoRef.current) return null;

      const canvas = document.createElement('canvas'); // Create temp canvas
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.drawImage(videoRef.current, 0, 0);
      return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    }
  }));

  // Check for active remote session
  useEffect(() => {
     // For demo simplicity, we can just grab the last created session by this user,
     // OR ideally pass it via props/context.
     // Here we'll try to find one if the user enters a "sync code" manually or just check for ANY active session by this user?
     // A better UX would be selecting the session, but let's assume if one exists we use it.
     const tryConnectRemote = async () => {
         const user = (await FirebaseService.onAuthChange(() => {}) as any); // Just getting auth
         // In a real app we'd query active sessions for this user.
         // Skipping complex query logic for now; relying on user to start local cam unless told otherwise.
     };
     tryConnectRemote();
  }, []);

  const handleManualRemoteLink = async () => {
     const id = prompt("Enter Remote Session ID from Mobile:");
     if (id) {
         setRemoteSessionId(id);
         // Don't auto-start monitoring effectively until we confirm source
         // But we can listen for status
     }
  };

  // Sync Active Source Logic
  useEffect(() => {
    if (!remoteSessionId) return;

    const unsubData = FirebaseService.onSessionDataChange(remoteSessionId, (data) => {
        if (data) {
            // Handle Status / Active Source
            const source = data.activeSource;
            setActiveSource(source);

            if (source === 'mobile') {
                // Mobile took control -> Stop Local
                if (videoRef.current?.srcObject) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    stream.getTracks().forEach(t => t.stop());
                    videoRef.current.srcObject = null;
                }
                setIsMonitoring(true); // "Monitoring" but via remote
            } else if (source === 'web') {
                // Web took control -> If we aren't running local, start local? 
                // Or just allow user to start local manually.
                // If we receive 'web' that means WE presumably set it, or another tab.
                // If it's us, we are already running.
            } else {
                // Idle
            }

            // Handle Image Data
            if (data.image) {
                setRemoteImage(data.image);
            }
        }
    });

    // Default to 'active' on connect if we initiated
    return () => {
        unsubData();
    };
  }, [remoteSessionId, setIsMonitoring]);

  const audioContextRef = useRef<AudioContext | null>(null);

  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioDataRef = useRef<Int16Array | null>(null);
  
  const [analyzing, setAnalyzing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<{type: string, severity: string, description: string} | null>(null);
  const [vocalScore, setVocalScore] = useState(0);

  const recognitionRef = useRef<any>(null); // For SpeechRecognition
  const [lastSpokenTime, setLastSpokenTime] = useState(0);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = async (event: any) => {
        const now = Date.now();
        if (now - lastSpokenTime < 3000) return; // Debounce so it doesn't listen to itself speaking

        const transcript = event.results[event.results.length - 1][0].transcript;
        if (transcript.trim().length > 0) {
           handleVoiceInteraction(transcript);
        }
      };

      recognition.onend = () => {
        if (isMonitoring) recognition.start(); // Auto-restart
      };

      recognitionRef.current = recognition;
    }
  }, [isMonitoring, lastSpokenTime]);

  const handleVoiceInteraction = async (text: string) => {
    if (!videoRef.current) return;
    
    // 1. Capture Image
    const canvas = document.createElement('canvas'); // Create temp canvas
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0);
    const imageBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

    // 2. Send to AI
    setAnalyzing(true);
    const response = await GeminiService.chatWithVision(text, imageBase64);
    setAnalyzing(false);

    // 3. Speak Response
    setLastSpokenTime(Date.now()); // Prevent listening to self
    await GeminiService.speak(response);
    setLastSpokenTime(Date.now()); // Update again after speaking finishes
  };

  const startMonitoring = async () => {
    // Determine exclusion
    if (remoteSessionId && activeSource === 'mobile') {
        const confirmSwitch = window.confirm("Mobile camera is active. Switch to Local Camera?");
        if (!confirmSwitch) return;
        // Signal Mobile to Stop
        await FirebaseService.setSessionActiveSource(remoteSessionId, 'web');
    } else if (remoteSessionId) {
        await FirebaseService.setSessionActiveSource(remoteSessionId, 'web');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsMonitoring(true);

        audioContextRef.current = new AudioContext({ sampleRate: 16000 });
        const source = audioContextRef.current.createMediaStreamSource(stream);
        audioProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
        
        audioProcessorRef.current.onaudioprocess = (e) => {
          const input = e.inputBuffer.getChannelData(0);
          const int16 = new Int16Array(input.length);
          for (let i = 0; i < input.length; i++) int16[i] = input[i] * 32768;
          audioDataRef.current = int16;
        };
        
        source.connect(audioProcessorRef.current);
        audioProcessorRef.current.connect(audioContextRef.current.destination);

        // START CONVERSATION MODE
        recognitionRef.current?.start();
        
        // Initial Greeting
        setTimeout(() => {
             GeminiService.speak("Hello! Welcome back, Anas. I am monitoring your wellness levels.");
        }, 1000);
      }
    } catch (err) {
      console.error("Neural Access Denied", err);
    }
  };

  const stopMonitoring = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    audioContextRef.current?.close();
    recognitionRef.current?.stop(); // Stop listening
    setIsMonitoring(false);
    
    if (remoteSessionId) {
        // If we were the active source, set to null (Idle)
        if (activeSource === 'web') {
            FirebaseService.setSessionActiveSource(remoteSessionId, null);
        }
    }
  };

  const captureAndAnalyze = useCallback(async () => {
    // UPDATED: Support analyzing Remote Image if it exists, even if videoRef is effectively off/hidden
    if (!isMonitoring || analyzing) return;
    
    let imageBase64: string = '';
    
    if (remoteImage && activeSource === 'mobile') {
        imageBase64 = remoteImage.split(',')[1];
    } else {
        if (!videoRef.current || !videoRef.current.srcObject) return; // No source
        
        const canvas = canvasRef.current!;
        const video = videoRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        imageBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    }
    
    setAnalyzing(true);
    
    let audioBase64 = undefined;
    if (audioDataRef.current) {
      const bytes = new Uint8Array(audioDataRef.current.buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      audioBase64 = btoa(binary);
    }

    try {
      const result = await GeminiService.analyzeNeuralBurst(imageBase64, audioBase64);
      if (result) {
        // Allow FATIGUE events of any severity to update the dashboard LED
        if (result.severity !== Severity.LOW || result.type === 'FATIGUE') {
          onEventDetected(result);
          setCurrentStatus(result);
          setTimeout(() => setCurrentStatus(null), 6000);
        }
        setVocalScore(result.vocalTensionScore || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  }, [isMonitoring, analyzing, onEventDetected]);

  useEffect(() => {
    let interval: any;
    if (isMonitoring) interval = setInterval(captureAndAnalyze, 20000);
    return () => clearInterval(interval);
  }, [isMonitoring, captureAndAnalyze]);

  return (
    <div className="glass-card rounded-[40px] p-6 lg:p-10 relative overflow-hidden space-y-6 lg:space-y-8 h-full bg-slate-900 border border-slate-800">
      <div className="flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
           {remoteSessionId ? <Smartphone className="text-indigo-400" /> : <Scan className="text-blue-500 animate-pulse" />}
           <h3 className="text-xl font-black uppercase tracking-tight">{remoteSessionId ? 'Remote Node Linked' : 'Bio-Signal Monitor'}</h3>
        </div>
        <div className="flex items-center gap-2">
            {!isMonitoring && !remoteSessionId && (
               <div className="flex items-center gap-3">
                 <button onClick={startMonitoring} className="text-[10px] font-black uppercase text-blue-400 hover:text-white transition-colors flex items-center gap-1">
                     <Camera size={14} /> Activate Local
                 </button>
                 <div className="h-3 w-px bg-white/10" />
                 <button onClick={handleManualRemoteLink} className="text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors">
                     Link Mobile
                 </button>
               </div>
            )}
            {isMonitoring && !remoteSessionId && (
                <button onClick={stopMonitoring} className="text-[10px] font-black uppercase text-red-400 hover:text-white transition-colors flex items-center gap-1">
                    <CameraOff size={14} /> Stop
                </button>
            )}
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${isMonitoring ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-slate-800 text-slate-500 border-white/5'}`}>
               <span className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
               {activeSource === 'mobile' ? 'Flow Synchronized' : (isMonitoring ? 'Live Feed' : 'Sensors Idle')}
            </div>
        </div>
      </div>
      
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-black/50 border border-white/5 shadow-inner group">
         {/* Always present Video Element to ensure Ref availability */}
         <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover transition-transform duration-700 ${remoteImage && activeSource === 'mobile' ? 'hidden' : ''} ${!isMonitoring ? 'opacity-0 absolute pointer-events-none' : 'opacity-80'}`}
         />

         {remoteImage && isMonitoring && activeSource === 'mobile' && (
            <img src={remoteImage} className="w-full h-full object-cover absolute inset-0" alt="Remote Feed" />
         )}

        {isMonitoring ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
            
            {/* HUD Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-400">
                   {remoteSessionId ? (activeSource === 'mobile' ? 'R-LINK: SYNC' : 'R-LINK: STBY') : 'CAM-1: ACTIVE'}
                </div>
            </div>

            
            {analyzing && (
               <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-3 py-1 rounded-lg border border-blue-500/30 text-[10px] font-bold text-blue-300 animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  ANALYZING NEURAL DATA...
               </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-slate-900/50 z-20">
            <CameraOff size={48} className="mb-4 opacity-50" />
            <p className="text-xs font-black uppercase tracking-widest">Sensors Deactivated</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default CameraMonitor;
