import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

const Hero: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const firstName = "PREM";
  const lastName = "GOSAVI";

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-10 px-4 sm:px-6">
      
      {/* Content Container */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          
          {/* Main HUD Card */}
          <div className="relative p-6 sm:p-10 md:p-16 border border-cyber-primary/20 bg-cyber-black/40 backdrop-blur-sm overflow-hidden group rounded-lg sm:rounded-none">
             
             {/* HUD Glow Effects */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent"></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent"></div>
             
             {/* Corner Brackets */}
             <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-[3px] border-l-[3px] border-cyber-primary shadow-[-2px_-2px_10px_rgba(0,240,255,0.5)]"></div>
             <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-[3px] border-r-[3px] border-cyber-primary shadow-[2px_-2px_10px_rgba(0,240,255,0.5)]"></div>
             <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-[3px] border-l-[3px] border-cyber-primary shadow-[-2px_2px_10px_rgba(0,240,255,0.5)]"></div>
             <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-[3px] border-r-[3px] border-cyber-primary shadow-[2px_2px_10px_rgba(0,240,255,0.5)]"></div>

             {/* Status Label (Top Center) */}
             <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-max">
                <div className={`
                    px-3 sm:px-6 py-1 border bg-cyber-black 
                    text-[9px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-2 sm:gap-3
                    shadow-[0_0_15px_rgba(0,240,255,0.2)]
                    ${isOnline ? 'text-cyber-primary border-cyber-primary/50' : 'text-cyber-alert border-cyber-alert/50 shadow-[0_0_15px_rgba(255,0,60,0.2)]'}
                `}>
                   <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isOnline ? 'bg-cyber-primary animate-pulse' : 'bg-cyber-alert animate-ping'}`}></span>
                   {isOnline ? 'SYSTEM_ONLINE' : 'SYSTEM_OFFLINE'}
                </div>
             </div>

             {/* Decorative Side Elements (Hidden on mobile) */}
             <div className="absolute top-1/2 left-4 -translate-y-1/2 w-1 h-12 bg-cyber-primary/20 hidden lg:block"></div>
             <div className="absolute top-1/2 right-4 -translate-y-1/2 w-1 h-12 bg-cyber-primary/20 hidden lg:block"></div>

             {/* Name Title */}
             <div className="relative z-10 mt-4 sm:mt-6">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-orbitron font-black text-white tracking-widest leading-tight filter drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                    {/* First Name Boot Animation */}
                    <span className="inline-block">
                        {firstName.split('').map((char, i) => (
                            <MotionSpan
                                key={`first-${i}`}
                                initial={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.1, delay: 1.8 + (i * 0.15) }}
                                className="inline-block"
                            >
                                {char}
                            </MotionSpan>
                        ))}
                    </span>
                    
                    <span className="inline-block w-2 sm:w-4"></span>

                    {/* Last Name Boot Animation */}
                    <span className="block sm:inline-block lg:inline-block">
                        {lastName.split('').map((char, i) => (
                            <MotionSpan
                                key={`last-${i}`}
                                initial={{ opacity: 0, x: 10, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.1, delay: 2.4 + (i * 0.15) }}
                                className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-cyber-primary to-cyber-secondary"
                            >
                                {char}
                            </MotionSpan>
                        ))}
                    </span>
                </h1>
                
                {/* Text Boot Scanline */}
                <MotionDiv 
                   initial={{ scaleX: 0, opacity: 0 }}
                   animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
                   transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
                   className="absolute top-1/2 left-0 right-0 h-[2px] bg-cyber-primary/60 mix-blend-overlay pointer-events-none"
                   style={{ originX: 0 }}
                />

                {/* Tech Line */}
                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-4 opacity-80">
                   <div className="h-[1px] w-4 sm:w-8 md:w-24 bg-gradient-to-r from-transparent to-cyber-accent"></div>
                   <h2 className="text-xs sm:text-sm md:text-xl font-mono text-cyber-accent tracking-[0.2em] uppercase text-center">
                      Front-End Developer
                   </h2>
                   <div className="h-[1px] w-4 sm:w-8 md:w-24 bg-gradient-to-l from-transparent to-cyber-accent"></div>
                </div>
             </div>

             {/* Scanline overlay inside card */}
             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] opacity-20"></div>
          </div>

          <div className="mt-8 sm:mt-12 h-12 sm:h-16 flex items-center justify-center px-2">
            <TypeAnimation
              sequence={[
                'Building futuristic web interfaces...',
                1000,
                'Initializing React modules...',
                1000,
                'Optimizing user experience...',
                1000,
                'Building responsive interfaces',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="font-mono text-xs sm:text-lg md:text-2xl text-cyber-primary/70 text-center"
              repeat={Infinity}
            />
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
             <a href="#projects" className="w-full sm:w-auto group relative px-8 py-3 bg-cyber-primary/10 overflow-hidden rounded-sm transition-all hover:bg-cyber-primary/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] text-center">
                <div className="absolute inset-0 border border-cyber-primary/50"></div>
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-primary"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-primary"></div>
                <span className="font-orbitron text-cyber-primary tracking-wider relative z-10 group-hover:text-white transition-colors text-sm sm:text-base">
                    [ VIEW MODULES ]
                </span>
             </a>

             <a href="/resume.pdf" download className="w-full sm:w-auto group relative px-8 py-3 bg-cyber-secondary/10 overflow-hidden rounded-sm transition-all hover:bg-cyber-secondary/20 hover:shadow-[0_0_20px_rgba(112,0,255,0.3)] text-center">
                <div className="absolute inset-0 border border-cyber-secondary/50"></div>
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-secondary"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-secondary"></div>
                <span className="font-orbitron text-cyber-secondary tracking-wider relative z-10 group-hover:text-white transition-colors text-sm sm:text-base">
                    [ DOWNLOAD RESUME ]
                </span>
             </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Hero;