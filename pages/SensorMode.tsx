import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera, Wifi, XCircle, Zap } from 'lucide-react';
import { FirebaseService } from '../services/firebaseService';

// Simple check for mobile
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const SensorMode: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = location.state?.sessionId;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!sessionId) {
      navigate('/login');
      return;
    }

    const startCamera = async () => {
       try {
         const s = await navigator.mediaDevices.getUserMedia({ 
             video: { facingMode: 'user', width: 320, height: 240 }, 
             audio: false // Audio not fully implemented in this demo
         });
         setStream(s);
         if (videoRef.current) {
             videoRef.current.srcObject = s;
         }
       } catch (e) {
         console.error("Camera failed", e);
         alert("Camera access required for sensor mode.");
       }
    };
    
    startCamera();

    return () => {
        if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [sessionId, navigate]);

  useEffect(() => {
     if (!isActive || !sessionId) return;

     const interval = setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, 320, 240);
                // Low quality JPEG for speed
                const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.5);
                
                // Upload to Firestore
                await FirebaseService.updateSessionData(sessionId, dataUrl);
            }
        }
     }, 1000); // 1 FPS update rate to save bandwidth/writes

     return () => clearInterval(interval);
  }, [isActive, sessionId]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* Background Pulse */}
       <div className={`absolute inset-0 bg-blue-900/20 transition-opacity duration-500 ${isActive ? 'animate-pulse' : 'opacity-0'}`} />

       <div className="z-10 w-full max-w-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="font-black uppercase tracking-widest text-xs">Neural Link Active</span>
             </div>
             <button onClick={() => navigate('/login')} className="bg-white/10 p-2 rounded-full">
                <XCircle size={20} />
             </button>
          </div>

          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-4 border-blue-500/30 bg-slate-900 shadow-2xl shadow-blue-500/20">
             <video 
               ref={videoRef} 
               autoPlay 
               playsInline 
               muted 
               className="w-full h-full object-cover opacity-80"
             />
             <canvas ref={canvasRef} width="320" height="240" className="hidden" />
             
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                   <Wifi className="text-blue-400" />
                   <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">Uplink Status</p>
                       <p className="text-xs font-bold text-white">Streaming to Host</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
             <div className="flex items-center gap-3 text-amber-500">
                <Zap size={18} />
                <p className="text-xs font-black uppercase">Power Preservation</p>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed">
                Screen will dim automatically. Do not lock your device. 
                Focus on placing your phone in a stable position facing you.
             </p>
          </div>
       </div>
    </div>
  );
};

export default SensorMode;
