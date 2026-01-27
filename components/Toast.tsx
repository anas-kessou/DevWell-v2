
import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger animation
    const raf = requestAnimationFrame(() => setVisible(true));
    
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => {
        clearTimeout(timer);
        cancelAnimationFrame(raf);
    };
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={18} />,
    error: <AlertTriangle className="text-red-500" size={18} />,
    info: <Info className="text-blue-500" size={18} />
  };

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-blue-500/10 border-blue-500/20'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className={`glass-card backdrop-blur-xl border px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl ${bgColors[type]}`}>
        {icons[type]}
        <span className="text-sm font-medium text-slate-200 pr-2">{message}</span>
        <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
