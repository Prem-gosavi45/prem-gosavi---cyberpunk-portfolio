import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ShieldCheck, Cpu, Terminal, Zap, Check, Lock, ScanLine, AlertTriangle } from 'lucide-react';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [count, setCount] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // --- Audio Logic ---
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      
      oscillatorRef.current = audioCtxRef.current.createOscillator();
      gainNodeRef.current = audioCtxRef.current.createGain();
      
      // Low sci-fi drone
      oscillatorRef.current.type = 'sawtooth';
      oscillatorRef.current.frequency.value = 55;
      
      // Low volume initially
      gainNodeRef.current.gain.value = 0.05;

      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioCtxRef.current.destination);
      
      oscillatorRef.current.start();
      setSoundEnabled(true);
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
      setSoundEnabled(true);
    }
  };

  const toggleSound = () => {
    if (soundEnabled) {
      audioCtxRef.current?.suspend();
      setSoundEnabled(false);
    } else {
      initAudio();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // --- Timeline Logic ---
  useEffect(() => {
    const runSequence = async () => {
      // PHASE 1: POWER ON (0s - 2s)
      await wait(2000);
      setPhase(2);

      // PHASE 2: DIAGNOSTICS (2s - 5s)
      await wait(3000);
      setPhase(3);

      // PHASE 3: ID (5s - 8s)
      await wait(3000);
      setPhase(4);

      // PHASE 4: MODULES (8s - 10s)
      await wait(2000);
      setPhase(5);

      // PHASE 5: HANDSHAKE (10s - 11.5s)
      await wait(1500);
      setPhase(6);

      // PHASE 6: FINAL LAUNCH (11.5s - 13s)
      await wait(1500);
      onComplete();
    };

    runSequence();
    
    // Show skip button after 3 seconds
    setTimeout(() => setShowSkip(true), 3000);
  }, [onComplete]);

  // --- Counter Logic for Phase 2 ---
  useEffect(() => {
    if (phase === 2) {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // --- Audio Effects per Phase ---
  useEffect(() => {
    if (!soundEnabled || !audioCtxRef.current || !oscillatorRef.current || !gainNodeRef.current) return;
    
    const now = audioCtxRef.current.currentTime;
    
    if (phase === 2) {
      // Pitch up for diagnostics
      oscillatorRef.current.frequency.exponentialRampToValueAtTime(110, now + 2);
    } else if (phase === 3) {
      // Scanning modulation
      oscillatorRef.current.frequency.setValueAtTime(200, now);
      oscillatorRef.current.type = 'square';
      gainNodeRef.current.gain.setValueAtTime(0.03, now);
    } else if (phase === 5) {
      // Deep bass for AI connection
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.exponentialRampToValueAtTime(40, now + 1);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.1, now + 1);
    }
  }, [phase, soundEnabled]);

  return (
    <MotionDiv 
      className="fixed inset-0 z-[100] bg-cyber-black flex items-center justify-center font-mono text-cyber-primary overflow-hidden select-none"
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1 }}
    >
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 noise-bg opacity-10 pointer-events-none z-0"></div>
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-0 animate-[pulse_4s_infinite] phase-grid z-0" style={{opacity: phase > 1 ? 0.2 : 0, transition: 'opacity 2s'}}></div>

      {/* --- Controls --- */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <AnimatePresence>
          {showSkip && (
            <MotionButton
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onComplete}
              className="px-4 py-1 border border-cyber-primary/30 bg-cyber-black/50 text-xs font-orbitron text-cyber-primary/70 hover:bg-cyber-primary/20 hover:text-white transition-all uppercase tracking-wider backdrop-blur-sm"
            >
              Skip Boot_Sequence
            </MotionButton>
          )}
        </AnimatePresence>
        <button 
          onClick={toggleSound}
          className="text-cyber-primary/60 hover:text-cyber-primary transition-colors p-2 border border-transparent hover:border-cyber-primary/30 rounded-full"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-3xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        
        {/* --- PHASE 1: POWER ON --- */}
        <AnimatePresence>
          {phase === 1 && (
            <MotionDiv className="text-left space-y-4 w-full max-w-md" exit={{ opacity: 0, y: -20 }}>
              {/* Power Surge Flash */}
              <MotionDiv 
                className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <Typewriter text="POWER SOURCE: ONLINE" delay={200} className="text-xl text-cyber-primary font-bold" />
              <Typewriter text="NEURAL CORE: ACTIVE" delay={800} className="text-xl text-cyber-primary font-bold" />
              <Typewriter text="MEMORY BANKS: SYNCING" delay={1400} className="text-xl text-cyber-primary animate-pulse" />
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* --- PHASE 2: SYSTEM DIAGNOSTICS --- */}
        <AnimatePresence>
          {phase === 2 && (
            <MotionDiv 
              className="flex flex-col items-center gap-8 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" className="text-cyber-primary/30" strokeDasharray="10 5" />
                  <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" className="text-cyber-secondary" strokeDasharray="60 100" />
                </svg>
                <div className="text-5xl font-orbitron font-bold text-white tracking-tighter">
                  {count}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm font-mono text-cyber-primary/80">
                <DiagnosticItem label="CPU THREADS" status="CALIBRATED" delay={0.2} />
                <DiagnosticItem label="GPU ACCELERATION" status="ENABLED" delay={0.4} />
                <DiagnosticItem label="UI MODULES" status="VERIFIED" delay={0.6} />
                <DiagnosticItem label="SECURITY PROTOCOLS" status="LOCKED" delay={0.8} />
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* --- PHASE 3: DEVELOPER IDENTIFICATION --- */}
        <AnimatePresence>
          {phase === 3 && (
            <MotionDiv 
              className="w-full max-w-lg relative bg-cyber-dark/80 border border-cyber-primary/30 p-8 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
            >
              {/* Scanline Effect */}
              <MotionDiv 
                className="absolute top-0 left-0 w-full h-1 bg-cyber-alert shadow-[0_0_15px_#ff003c] z-20"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              <div className="space-y-6 relative z-10">
                 <div className="flex items-center gap-3 text-cyber-alert animate-pulse mb-6">
                    <AlertTriangle size={18} />
                    <span className="tracking-widest text-xs">SCANNING DEVELOPER SIGNATURE...</span>
                 </div>

                 <div className="flex items-start gap-6">
                    <div className="w-24 h-24 border-2 border-cyber-primary/50 flex items-center justify-center bg-cyber-primary/5 relative overflow-hidden">
                       <ScanLine size={32} className="text-cyber-primary/50" />
                       <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
                          {Array.from({length: 16}).map((_, i) => <div key={i} className="bg-cyber-primary"></div>)}
                       </div>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                       <div className="text-xs text-gray-400">ID MATCH FOUND</div>
                       <div className="text-2xl font-orbitron text-white">PREM GOSAVI</div>
                       <div className="text-sm text-cyber-secondary">ROLE: FRONT-END DEVELOPER</div>
                    </div>
                 </div>

                 <MotionDiv 
                    initial={{ backgroundColor: "rgba(255, 0, 60, 0.1)", borderColor: "#ff003c", color: "#ff003c" }}
                    animate={{ backgroundColor: "rgba(0, 255, 159, 0.1)", borderColor: "#00ff9f", color: "#00ff9f" }}
                    transition={{ delay: 1.5, duration: 0.1 }}
                    className="border px-4 py-2 text-center font-bold tracking-widest text-lg flex items-center justify-center gap-3 mt-4"
                 >
                    <Lock size={16} /> ACCESS LEVEL: AUTHORIZED
                 </MotionDiv>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* --- PHASE 4: MODULE LOADING --- */}
        <AnimatePresence>
          {phase === 4 && (
            <MotionDiv 
               className="w-full max-w-xl"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, x: 50 }}
            >
               <div className="space-y-3 mb-8">
                  <ModuleRow text="HUD INTERFACE LOADED" delay={0.2} />
                  <ModuleRow text="TECH MATRIX ONLINE" delay={0.5} />
                  <ModuleRow text="ACTIVE MODULES READY" delay={0.8} />
                  <ModuleRow text="MISSION LOG SYNCHRONIZED" delay={1.1} />
                  <ModuleRow text="TRANSMISSION CHANNEL OPEN" delay={1.4} />
               </div>

               <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                  <MotionDiv 
                     className="absolute top-0 left-0 h-full bg-cyber-primary shadow-[0_0_10px_#00f0ff]"
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 2, ease: "easeInOut" }}
                  />
               </div>
               <div className="flex justify-between text-[10px] text-cyber-primary/50 mt-2 font-mono">
                  <span>LOADING_ASSETS...</span>
                  <span>100%</span>
               </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* --- PHASE 5: AI HANDSHAKE --- */}
        <AnimatePresence>
          {phase === 5 && (
            <MotionDiv 
               className="text-center space-y-6"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            >
               <MotionDiv
                  animate={{ scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
               >
                  <Cpu size={80} className="text-cyber-primary mx-auto" />
               </MotionDiv>
               <div>
                  <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-4 text-shadow-glow">AI CORE: ONLINE</h2>
                  <p className="text-cyber-accent tracking-[0.2em] text-sm md:text-base">HUMAN INTERFACE LINK ESTABLISHED</p>
               </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* --- PHASE 6: FINAL LAUNCH --- */}
        <AnimatePresence>
          {phase === 6 && (
             <MotionDiv 
                className="flex items-center gap-3 text-xl md:text-2xl text-cyber-primary font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
             >
                <Terminal size={24} />
                <Typewriter text="LAUNCHING PORTFOLIO HUD..." speed={50} className="" />
             </MotionDiv>
          )}
        </AnimatePresence>

      </div>

      {/* --- Footer Status --- */}
      <div className="absolute bottom-0 w-full bg-cyber-dark/90 border-t border-cyber-primary/20 p-2 flex justify-between text-[10px] font-mono text-cyber-primary/40 uppercase">
        <div className="flex gap-4">
           <span>SYS_VER: 2.5.0</span>
           <span>MEM: 64TB OK</span>
        </div>
        <div className="flex gap-4">
           <span>ENCRYPTION: 256-BIT</span>
           <span>NET: SECURE</span>
        </div>
      </div>
    </MotionDiv>
  );
};

// --- Helper Components ---

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Typewriter = ({ text, delay = 0, speed = 30, className = "" }: { text: string, delay?: number, speed?: number, className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i > text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  if (!started) return null;

  return (
    <div className={`${className} flex items-center`}>
       <span className="mr-2 opacity-50">{'>'}</span>
       {displayText}
       <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-cyber-primary/50"></span>
    </div>
  );
};

const DiagnosticItem = ({ label, status, delay }: { label: string, status: string, delay: number }) => (
  <MotionDiv 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center justify-between border-b border-gray-800 pb-1"
  >
    <span>{label}</span>
    <span className="text-cyber-accent flex items-center gap-1">
      {status} <Check size={12} />
    </span>
  </MotionDiv>
);

const ModuleRow = ({ text, delay }: { text: string, delay: number }) => (
  <MotionDiv 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center gap-3 text-sm text-gray-300 font-mono"
  >
    <div className="text-cyber-accent">[✔]</div>
    <div className="text-cyber-primary/80">{text}</div>
  </MotionDiv>
);

export default BootSequence;