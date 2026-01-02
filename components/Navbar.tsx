import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavItem } from '../types';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;
const MotionLi = motion.li as any;

const navItems: NavItem[] = [
  { id: 'home', label: 'HOME', systemName: 'SYS_OVERVIEW' },
  { id: 'about', label: 'ABOUT', systemName: 'SYS_PROFILE' },
  { id: 'skills', label: 'SKILLS', systemName: 'TECH_MATRIX' },
  { id: 'projects', label: 'PROJECTS', systemName: 'ACT_MODULES' },
  { id: 'experience', label: 'EXP', systemName: 'MISSION_LOG' },
  { id: 'certifications', label: 'CERTS', systemName: 'CREDENTIALS' },
  { id: 'contact', label: 'CONTACT', systemName: 'TRANSMISSION' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for dynamic positioning/styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* DESKTOP HUD NAV */}
      <nav className={`fixed top-0 left-0 w-full z-40 hidden lg:flex justify-center transition-all duration-500 pointer-events-none ${scrolled ? 'pt-2' : 'pt-8'}`}>
        
        {/* Main Interface Container - Animated Boot */}
        <MotionDiv 
            initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.2 }}
            className="pointer-events-auto relative group"
        >
            
            {/* BOOT EFFECT: Scanning Laser Line */}
            <MotionDiv 
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-0 bottom-0 w-[2px] bg-cyber-primary shadow-[0_0_20px_#00f0ff] z-50 pointer-events-none blur-[1px]"
            />

            {/* Glass Panel & Frame */}
            <div className="
                relative flex items-center px-4 xl:px-6 py-2
                bg-[#020617]/80 backdrop-blur-xl
                border-x border-cyber-primary/30
                shadow-[0_0_30px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(0,240,255,0.05)]
            ">
                {/* Background Tech Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50"></div>

                {/* Top Energy Rail with Scanning Effect */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-cyber-primary/20 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cyber-primary to-transparent animate-shimmer opacity-80"></div> 
                </div>
                
                {/* Bottom Energy Rail */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyber-primary/20 overflow-hidden">
                     <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-transparent via-cyber-primary to-transparent animate-shimmer opacity-80" style={{ animationDirection: 'reverse', animationDuration: '4s' }}></div>
                </div>

                {/* Tech Corners (Top Left) */}
                <div className="absolute -top-[1px] -left-[1px] w-4 h-4">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                </div>
                
                {/* Tech Corners (Top Right) */}
                <div className="absolute -top-[1px] -right-[1px] w-4 h-4">
                    <div className="absolute top-0 right-0 w-full h-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                </div>

                {/* Tech Corners (Bottom Left) */}
                <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4">
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                    <div className="absolute bottom-0 left-0 h-full w-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                </div>

                {/* Tech Corners (Bottom Right) */}
                <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4">
                    <div className="absolute bottom-0 right-0 w-full h-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                    <div className="absolute bottom-0 right-0 h-full w-[2px] bg-cyber-primary shadow-[0_0_5px_#00f0ff]"></div>
                </div>

                {/* Center Notches */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-cyber-primary/50 shadow-[0_0_5px_#00f0ff]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-cyber-primary/50 shadow-[0_0_5px_#00f0ff]"></div>

                {/* Nav Items List */}
                <ul className="flex items-center gap-0.5 xl:gap-1 relative z-10">
                    {navItems.map((item, index) => (
                        <MotionLi 
                            key={item.id} 
                            className="relative"
                            initial={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.3, delay: 1.0 + (index * 0.1) }} // Staggered appearance after frame boot
                        >
                            <Link
                                to={item.id}
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                activeClass="!text-cyber-primary !bg-cyber-primary/10 !border-b-cyber-primary shadow-[inset_0_-2px_10px_rgba(0,240,255,0.3)] text-shadow-glow"
                                className="
                                    relative block px-3 lg:px-4 xl:px-5 py-3 cursor-pointer overflow-hidden
                                    font-orbitron text-[9px] lg:text-[10px] xl:text-xs font-bold tracking-[0.15em] lg:tracking-[0.2em]
                                    text-gray-400 hover:text-white
                                    transition-all duration-300
                                    border-b-2 border-transparent hover:border-b-cyber-primary/50 hover:bg-white/5
                                    group/link
                                "
                            >
                                {/* Text Label */}
                                <span className="relative z-10">{item.label}</span>
                                
                                {/* Hover Glitch Effect Overlay */}
                                <span className="absolute inset-0 bg-cyber-primary/10 translate-y-full group-hover/link:translate-y-0 transition-transform duration-200"></span>

                                {/* System Name HUD Tooltip */}
                                <div className="
                                    absolute left-1/2 -translate-x-1/2 -bottom-10 
                                    flex flex-col items-center
                                    opacity-0 group-hover/link:opacity-100 group-hover/link:-bottom-8
                                    transition-all duration-300 pointer-events-none
                                ">
                                    <div className="w-[1px] h-2 bg-cyber-accent/50 mb-1"></div>
                                    <span className="
                                        text-[8px] font-mono text-cyber-black bg-cyber-accent px-2 py-0.5 
                                        uppercase tracking-wider whitespace-nowrap font-bold
                                        shadow-[0_0_10px_rgba(0,255,159,0.5)]
                                        clip-path-polygon-[10%_0,100%_0,100%_100%,0_100%,0_10%]
                                    ">
                                        {item.systemName}
                                    </span>
                                </div>
                            </Link>
                        </MotionLi>
                    ))}
                </ul>
            </div>
        </MotionDiv>
      </nav>

      {/* MOBILE NAV TOGGLE */}
      <div className="fixed top-6 right-6 z-50 lg:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative p-3 bg-cyber-black/90 border border-cyber-primary/30 
            text-cyber-primary hover:bg-cyber-primary/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] 
            transition-all duration-300 backdrop-blur-md
            group overflow-hidden
            ${isOpen ? 'border-cyber-alert text-cyber-alert shadow-[0_0_10px_rgba(255,0,60,0.5)]' : ''}
          `}
          style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
        >
          {/* Button internal scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500"></div>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-cyber-black/95 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
          
          <div className="flex flex-col gap-4 text-center w-full max-w-xs relative z-10 max-h-[80vh] overflow-y-auto px-2 py-4 scrollbar-hide">
            {navItems.map((item, idx) => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="
                    group relative py-4 border-b border-gray-800 hover:border-cyber-primary/50 transition-colors
                    flex items-center justify-between cursor-pointer overflow-hidden
                "
              >
                <span className="font-orbitron text-lg sm:text-xl text-gray-300 group-hover:text-cyber-primary tracking-widest transition-colors z-10 group-hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] text-left">
                    {item.label}
                </span>
                
                {/* Arrow slide-in */}
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                    <span className="text-[9px] sm:text-[10px] font-mono text-cyber-secondary hidden sm:inline">{item.systemName}</span>
                    <ChevronRight className="text-cyber-primary" size={20} />
                </div>
                
                {/* Hover Background Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </Link>
            ))}
          </div>
          
          {/* Footer Decorative Line */}
          <div className="absolute bottom-6 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyber-primary rotate-45 shadow-[0_0_10px_#00f0ff]"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;