
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Volume2, VolumeX, BrainCircuit, 
  Mic, MicOff, Waves, Brain, Search, ExternalLink, Activity 
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { CameraMonitorHandle } from './CameraMonitor';
import { HealthEvent } from '../types';

interface Props {
  isADHDMode?: boolean;
  healthEvents?: HealthEvent[];
  cameraRef?: React.RefObject<CameraMonitorHandle>;
}

const ChatbotWidget: React.FC<Props> = ({ isADHDMode = false, healthEvents = [], cameraRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{
    role: 'user' | 'bot', 
    text: string, 
    sources?: any[], 
    image?: string,
    vocalWellness?: { observation: string, recommendation: string, stressLevel: string }
  }[]>([
    { role: 'bot', text: 'Neural Interface Active. How can I optimize your wellness parameters?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const [autoSpeech, setAutoSpeech] = useState(true);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(12).fill(10));
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioDataRef = useRef<Int16Array[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const updateAudioLevels = () => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Map the frequency data to our 12 bars
    const newLevels = [];
    const step = Math.floor(dataArray.length / 12);
    for (let i = 0; i < 12; i++) {
      const val = dataArray[i * step] || 0;
      newLevels.push(Math.max(10, (val / 255) * 100));
    }
    setAudioLevels(newLevels);
    animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
  };

  const startRecording = async () => {
    // Stop any current speech when user wants to talk
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      
      // Analyser for real-time visual feedback
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      source.connect(analyserRef.current);
      
      // Processor for raw PCM data
      audioProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      audioDataRef.current = [];
      
      audioProcessorRef.current.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
          int16[i] = Math.max(-1, Math.min(1, input[i])) * 32767;
        }
        audioDataRef.current.push(int16);
      };
      
      source.connect(audioProcessorRef.current);
      audioProcessorRef.current.connect(audioContextRef.current.destination);
      
      setIsRecording(true);
      updateAudioLevels();
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsRecording(false);
    setAudioLevels(new Array(12).fill(10));
    handleSend();
  };

  const handleSend = async () => {
    let capturedAudio = null;
    if (audioDataRef.current.length > 0) {
      const totalLength = audioDataRef.current.reduce((acc, curr) => acc + curr.length, 0);
      capturedAudio = new Int16Array(totalLength);
      let offset = 0;
      for (const chunk of audioDataRef.current) {
        capturedAudio.set(chunk, offset);
        offset += chunk.length;
      }
      audioDataRef.current = [];
    }

    if ((!input.trim() && !capturedAudio) || loading) return;

    const userMsg = input.trim();
    let audioBase64 = undefined;
    if (capturedAudio) {
      const bytes = new Uint8Array(capturedAudio.buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      audioBase64 = btoa(binary);
    }

    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMsg || (audioBase64 ? "Vocal stress profile captured..." : "Uplinking...")
    }]);
    setLoading(true);

    try {
      let responseText = "";
      let sources = [];
      let vocalWellness = undefined;

      if (audioBase64) {
        // Collect multimodal context
        const visualContext = cameraRef?.current?.getSnapshot() || undefined;

        const result = await GeminiService.analyzeMultimodalWellness({
          message: userMsg,
          audioBase64,
          visualContext: visualContext || undefined,
          healthContext: healthEvents,
          history: messages,
          isADHDMode
        });
        responseText = result.reply;
        vocalWellness = result.vocalWellness;
      } else if (useSearch) {
        const result = await GeminiService.getSearchGroundedInfo(userMsg);
        responseText = result.text;
        sources = result.sources;
      } else {
        responseText = await GeminiService.getWellnessChat({
          message: userMsg,
          useThinking,
          isADHDMode
        });
      }

      setMessages(prev => [...prev, { role: 'bot', text: responseText, sources, vocalWellness }]);
      
      // Auto-speak response if autoSpeech enabled or voice interaction used
      if (audioBase64 || autoSpeech) {
        speakText(responseText);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Neural uplink failed. Connection to Oracle lost." }]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = async (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    try {
      await GeminiService.speak(text);
    } catch (e) {
      console.error("Speaking failed", e);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {isOpen ? (
        <div className="bg-slate-900 w-[440px] h-[680px] rounded-[40px] shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <BrainCircuit size={24} className="neural-glow" />
              </div>
              <div>
                <p className="font-black text-sm tracking-widest uppercase">DevWell Oracle</p>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">{isADHDMode ? 'ADHD Protocol Active' : 'Neural Hub Online'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[24px] text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/40' 
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none shadow-xl'
                }`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  
                  {m.vocalWellness && (
                    <div className={`mt-4 p-4 rounded-2xl border flex flex-col gap-2 ${
                      m.vocalWellness.stressLevel === 'HIGH' ? 'bg-red-500/10 border-red-500/30' : 
                      m.vocalWellness.stressLevel === 'MEDIUM' ? 'bg-orange-500/10 border-orange-500/30' : 
                      'bg-emerald-500/10 border-emerald-500/30'
                    }`}>
                       <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                         <Activity size={12} className={m.vocalWellness.stressLevel !== 'LOW' ? 'text-red-400' : 'text-emerald-400'} />
                         Neural Feedback: {m.vocalWellness.stressLevel} Vocal Stress
                       </div>
                       <p className="text-[11px] font-bold text-slate-300 leading-tight">"{m.vocalWellness.observation}"</p>
                       <div className="mt-2 p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] font-black text-blue-400 uppercase tracking-tight">
                         RX: {m.vocalWellness.recommendation}
                       </div>
                    </div>
                  )}

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Research Grounding</p>
                      {m.sources.map((src, idx) => (
                        <a 
                          key={idx} 
                          href={src.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink size={10} />
                          <span className="truncate">{src.title || src.uri}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {m.role === 'bot' && (
                    <div className="mt-4 flex justify-end gap-2">
                      <button 
                        onClick={() => speakText(m.text)}
                        className={`p-2 rounded-xl transition-all ${isSpeaking ? 'bg-blue-500 text-white animate-pulse' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-6 rounded-[24px] border border-white/10">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    {isRecording ? (
                      <div className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                        <Waves size={14} /> Synchronizing Vocal Cues...
                      </div>
                    ) : (
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest animate-pulse">Consulting Neural Oracle...</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-slate-900/50 space-y-4">
            {isRecording && (
              <div className="flex justify-center items-end gap-1.5 h-12">
                {audioLevels.map((lvl, i) => (
                  <div key={i} className="w-2 bg-blue-500 rounded-full transition-all duration-75" style={{ 
                    height: `${lvl}%`,
                    opacity: 0.3 + (lvl/100) * 0.7
                  }} />
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-3">
               <button 
                onClick={() => { setUseThinking(!useThinking); setUseSearch(false); }}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${useThinking ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
               >
                 <Brain size={14} className="inline mr-2" /> Reasoning
               </button>
               <button 
                onClick={() => { setUseSearch(!useSearch); setUseThinking(false); }}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${useSearch ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
               >
                 <Search size={14} className="inline mr-2" /> Research
               </button>
               <button 
                onClick={() => setAutoSpeech(!autoSpeech)}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${autoSpeech ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
               >
                 {autoSpeech ? <Volume2 size={14} className="inline mr-2" /> : <VolumeX size={14} className="inline mr-2" />} Voice
               </button>
            </div>
            
            <div className="flex gap-3">
              <button 
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={isRecording ? stopRecording : undefined}
                className={`p-4 rounded-2xl transition-all ${isRecording ? 'bg-red-600 text-white scale-110 shadow-2xl shadow-red-600/40' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                title="Hold to record voice for analysis"
              >
                {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
              </button>
              
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message the Oracle..."
                className="flex-1 bg-white/5 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={loading || (!input.trim() && !isRecording && audioDataRef.current.length === 0)}
                className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-30 shadow-xl shadow-blue-600/30"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-6 rounded-[32px] shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-blue-600/40 relative group"
        >
          <MessageSquare size={32} />
          <div className="absolute right-full mr-6 bg-white text-slate-950 text-[10px] font-black px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest pointer-events-none shadow-2xl">
            Vocal Stress Analysis Ready
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
