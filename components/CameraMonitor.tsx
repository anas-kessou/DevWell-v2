
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Camera, CameraOff, Mic, MicOff, Scan, ShieldAlert, Zap, Waves, Activity, Loader2 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
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
  
  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
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
  };

  const captureAndAnalyze = useCallback(async () => {
    if (!isMonitoring || !videoRef.current || analyzing) return;

    setAnalyzing(true);
    const canvas = canvasRef.current!;
    const video = videoRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const imageBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    
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
    <div className="glass-card rounded-[32px] p-6 border border-white/5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMonitoring ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
            <Activity className={isMonitoring ? 'animate-pulse' : ''} />
          </div>
          <div>
            <h3 className="font-black tracking-tight">NEURAL SYNC HUD</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AV-Multimodal Pipeline</p>
          </div>
        </div>
        <button 
          onClick={isMonitoring ? stopMonitoring : startMonitoring}
          className={`px-6 py-3 rounded-2xl text-xs font-black transition-all ${isMonitoring ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-600 text-white shadow-xl shadow-blue-600/30'}`}
        >
          {isMonitoring ? 'DISCONNECT' : 'INITIALIZE SYNC'}
        </button>
      </div>

      <div className={`relative aspect-video bg-slate-900 rounded-[28px] overflow-hidden border-2 transition-all duration-1000 ${currentStatus?.severity === 'HIGH' ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)]' : 'border-transparent'}`}>
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
        <canvas ref={canvasRef} className="hidden" />

        {isMonitoring && (
          <>
            <div className="absolute top-6 left-6 flex gap-3">
              <div className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" /> NEURAL LIVE
              </div>
              <div className="bg-blue-600/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                SENSORS ACTIVE
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 w-48">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Vocal Tension</p>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${vocalScore}%` }} />
                </div>
              </div>
              {analyzing && (
                <div className="flex items-center gap-2 bg-white text-slate-950 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-pulse">
                  <Loader2 size={12} className="animate-spin" /> Gemini Flash Processing
                </div>
              )}
            </div>
          </>
        )}

        {currentStatus && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in zoom-in duration-300">
            <div className={`p-8 rounded-[32px] border-2 text-center max-w-sm shadow-2xl ${currentStatus.severity === 'HIGH' ? 'bg-red-500/20 border-red-500/40 text-red-100' : 'bg-amber-500/20 border-amber-500/40 text-amber-100'}`}>
              <Zap size={40} className="mx-auto mb-4 animate-bounce" />
              <h4 className="text-xl font-black uppercase mb-2">{currentStatus.type} ALERT</h4>
              <p className="text-sm font-medium leading-relaxed opacity-90">{currentStatus.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CameraMonitor;
