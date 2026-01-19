import React, { useState, useEffect } from 'react';
import { Smartphone, X, Download, ExternalLink } from 'lucide-react';

const MobileAppBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasClosed = localStorage.getItem('devwell_mobile_banner_closed');
        
        if (isMobile && !hasClosed) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('devwell_mobile_banner_closed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4 max-w-md mx-auto ring-1 ring-white/20">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg shadow-blue-500/20">
                        <Smartphone className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Download Mobile App</h3>
                        <p className="text-slate-400 text-xs mt-0.5">Better experience on mobile</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <a 
                        href="https://anas-kessou.github.io/DevWell-v2/probe/" 
                        target="_self" 
                        rel="noopener noreferrer"
                        className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center gap-2"
                    >
                        <Download size={14} /> Open
                    </a>
                    <button 
                        onClick={handleClose}
                        className="p-2 hover:bg-white/10 rounded-xl text-slate-400 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileAppBanner;
