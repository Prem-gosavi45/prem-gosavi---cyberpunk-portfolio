import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Activity, AlertTriangle } from 'lucide-react';

const SystemStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);
    setIsVisible(!document.hidden);

    // Event Handlers
    const handleOnline = () => {
        setIsOnline(true);
        triggerGlitch();
    };
    const handleOffline = () => {
        setIsOnline(false);
        triggerGlitch();
    };
    const handleVisibilityChange = () => {
        setIsVisible(!document.hidden);
        if (!document.hidden) triggerGlitch();
    };

    // Listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  const systemActive = isOnline && isVisible;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 font-mono text-xs select-none ${systemActive ? 'opacity-90' : 'opacity-100'}`}>
      
      {/* HUD Container */}
      <div 
        className={`
          relative flex items-center gap-4 px-4 py-2 
          border bg-cyber-black/80 backdrop-blur-md 
          transition-all duration-300
          ${systemActive 
            ? 'border-cyber-primary/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] text-cyber-primary' 
            : 'border-cyber-alert/80 shadow-[0_0_20px_rgba(255,0,60,0.3)] text-cyber-alert'
          }
        `}
      >
        {/* Decorative Corner Markers */}
        <div className={`absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 ${systemActive ? 'border-cyber-primary' : 'border-cyber-alert'}`}></div>
        <div className={`absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 ${systemActive ? 'border-cyber-primary' : 'border-cyber-alert'}`}></div>

        {/* Status Icon */}
        <div className="relative">
            {systemActive ? (
                <div className="relative">
                    <Wifi size={16} className="animate-pulse" />
                    <div className="absolute inset-0 blur-sm opacity-50 bg-cyber-primary/20 rounded-full"></div>
                </div>
            ) : (
                <div className="relative">
                    <AlertTriangle size={16} className={isGlitching ? "animate-spin" : "animate-pulse"} />
                </div>
            )}
        </div>

        {/* Text Display */}
        <div className="flex flex-col">
            <span className="text-[10px] opacity-60 tracking-wider mb-[2px]">SYS_STATUS</span>
            <span className={`font-bold tracking-widest flex items-center gap-2 ${isGlitching || !systemActive ? 'animate-glitch' : ''}`}>
                {systemActive ? 'ONLINE' : 'OFFLINE'}
                
                {/* Status Dot */}
                <span className={`w-2 h-2 rounded-full ${systemActive ? 'bg-cyber-primary shadow-[0_0_8px_#00f0ff]' : 'bg-cyber-alert shadow-[0_0_8px_#ff003c] animate-ping'}`}></span>
            </span>
        </div>

        {/* Scanline Overlay for Offline State */}
        {!systemActive && (
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(45deg,transparent_25%,#ff003c_25%,#ff003c_50%,transparent_50%,transparent_75%,#ff003c_75%,#ff003c_100%)] bg-[size:4px_4px]"></div>
        )}
      </div>

      {/* Connection Details (Only Visible when Online) */}
      {systemActive && (
          <div className="absolute -bottom-5 right-0 text-[9px] text-cyber-primary/40 tracking-tight flex gap-2">
            <span>PING: {Math.floor(Math.random() * 20 + 10)}ms</span>
            <span>SECURE</span>
          </div>
      )}
    </div>
  );
};

export default SystemStatus;