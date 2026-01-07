
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Volume2, BrainCircuit, Paperclip, 
  Mic, MicOff, Waves, Brain, Search, ExternalLink, Activity, Sparkles 
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';

interface Props {
  isADHDMode?: boolean;
}

const ChatbotWidget: React.FC<Props> = ({ isADHDMode = false }) => {
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
  const [selectedImage, setSelectedImage] = useState<{data: string, mimeType: string} | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioDataRef = useRef<Int16Array | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsRecording(false);
    handleSend();
  };

  const handleSend = async () => {
    if ((!input.trim() && !audioDataRef.current && !selectedImage) || loading) return;

    const userMsg = input.trim();
    const currentImage = selectedImage;
    
    let audioBase64 = undefined;
    if (audioDataRef.current) {
      const bytes = new Uint8Array(audioDataRef.current.buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      audioBase64 = btoa(binary);
    }

    setInput('');
    setSelectedImage(null);
    const capturedAudio = audioDataRef.current;
    audioDataRef.current = null;

    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMsg || (capturedAudio ? "Voice Uplink Received..." : "Analyzing Capture..."), 
      image: currentImage ? `data:${currentImage.mimeType};base64,${currentImage.data}` : undefined 
    }]);
    setLoading(true);

    try {
      let responseText = "";
      let sources = [];
      let vocalWellness = undefined;

      if (capturedAudio || (userMsg && !useSearch)) {
        // Use multimodal path for vocal analysis or text chat
        const result = await GeminiService.analyzeMultimodalWellness({
          message: userMsg,
          audioBase64,
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
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Neural uplink failed. Please retry." }]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const base64Audio = await GeminiService.speak(text);
      if (base64Audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      }
    } catch (e) {
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
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">{isADHDMode ? 'ADHD-Optimized Engine' : 'Biometric Response Active'}</p>
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
                  {m.image && <img src={m.image} className="w-full rounded-2xl mb-4 border border-white/10" alt="Workspace" />}
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  
                  {m.vocalWellness && m.vocalWellness.stressLevel !== "LOW" && (
                    <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl space-y-2">
                       <div className="flex items-center gap-2 text-orange-400 font-black text-[10px] uppercase tracking-widest">
                         <Activity size={12} /> Vocal stress detected: {m.vocalWellness.stressLevel}
                       </div>
                       <p className="text-[11px] font-bold text-slate-300 leading-tight italic">"{m.vocalWellness.recommendation}"</p>
                    </div>
                  )}

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sources</p>
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
                        <Waves size={14} /> Neural Audio Sync...
                      </div>
                    ) : (
                      <>
                        {useThinking && <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">Neural Reasoning Active...</p>}
                        {useSearch && <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Grounding with Google Search...</p>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-slate-900/50 space-y-4">
            <div className="flex items-center gap-3">
               <button 
                onClick={() => { setUseThinking(!useThinking); setUseSearch(false); }}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${useThinking ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
               >
                 <Brain size={14} className="inline mr-2" /> Reasoning
               </button>
               <button 
                onClick={() => { setUseSearch(!useSearch); setUseThinking(false); }}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${useSearch ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
               >
                 <Search size={14} className="inline mr-2" /> Research
               </button>
            </div>
            
            <div className="flex gap-3">
              <button 
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                className={`p-4 rounded-2xl transition-all ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                title="Hold to speak"
              >
                {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
              </button>
              
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Consult the Oracle..."
                className="flex-1 bg-white/5 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={loading || (!input.trim() && !audioDataRef.current && !selectedImage)}
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
          <div className="absolute right-full mr-6 bg-white text-slate-950 text-[10px] font-black px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest pointer-events-none">
            Neural Uplink Ready
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
