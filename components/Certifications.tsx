import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Medal, ShieldCheck, X, Eye } from 'lucide-react';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;

interface CertificationItem {
  title: string;
  image: string;
}

const certifications: CertificationItem[] = [
  {
    title: "Google Gemini AI Certification – Gemini Certified Student (2025)",
    image: "/certificates/gemini-certified.png"
  },
  {
    title: "Prompt Engineering with GitHub Copilot",
    image: "/certificates/prompt-engineering.png"
  },
  {
    title: "AI Tools & ChatGPT Workshop",
    image: "/certificates/ai-tools-workshop.png"
  },
  {
    title: "Front End Development – Great Learning",
    image: "/certificates/frontend-great-learning.png"
  },
  {
    title: "HTML Fundamentals",
    image: "/certificates/html-fundamentals.png"
  },
  {
    title: "Programming in C++ – SkillUp by Simplilearn",
    image: "/certificates/cpp-skillup.png"
  },
  {
    title: "Essentials of English Communication – Barclays LifeSkills",
    image: "/certificates/barclays-lifeskills.png"
  }
];

const achievements = [
  "3rd Prize – Smart India Hackathon (Internal Round), SPPU (2025)",
  "Participant – Avishkar Research Competition, SPPU (2025)",
  "SciTech Innovation Hackathon 2025 — Participated as a team member (Unicorn) at MMCOE, Pune.",
  "Academic Excellence: Maintained 9+ CGPA"
];

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section id="certifications" className="py-16 sm:py-20 px-4 bg-cyber-dark/30 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Credentials Column */}
        <div>
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <ShieldCheck className="text-cyber-accent w-6 h-6 sm:w-8 sm:h-8" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron text-white">
              CREDENTIALS
            </h2>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {certifications.map((cert, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                onClick={() => setSelectedCert(cert.image)}
                className="group relative flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black/40 border border-cyber-accent/20 hover:border-cyber-accent hover:bg-cyber-accent/5 transition-all rounded cursor-pointer overflow-hidden"
              >
                <div className="mt-1 sm:mt-0 min-w-[4px] h-8 bg-cyber-accent/50 rounded-full group-hover:bg-cyber-accent transition-colors"></div>
                <span className="font-mono text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors flex-1 pr-8 leading-tight">
                  {cert.title}
                </span>
                
                {/* Hover Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyber-accent">
                   <Eye size={18} />
                </div>
                
                {/* Scanline effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-accent/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Achievements Column */}
        <div>
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Medal className="text-cyber-alert w-6 h-6 sm:w-8 sm:h-8" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron text-white">
              ACHIEVEMENTS
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {achievements.map((item, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="relative p-4 sm:p-6 bg-gradient-to-r from-cyber-alert/5 to-transparent border-l-2 border-cyber-alert"
              >
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-cyber-black border border-cyber-alert flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-cyber-alert rounded-full"></div>
                </div>
                <p className="font-orbitron text-white/90 text-sm sm:text-base leading-snug">{item}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedCert(null)}
          >
            <MotionDiv
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-cyber-black border border-cyber-accent/50 shadow-[0_0_50px_rgba(0,255,159,0.15)] flex flex-col max-h-[80vh] sm:max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-cyber-accent/30 bg-cyber-accent/5 shrink-0">
                <div className="flex items-center gap-2 text-cyber-accent font-mono text-xs sm:text-sm">
                  <ShieldCheck size={16} />
                  <span className="truncate max-w-[200px] sm:max-w-none">SECURE_VIEWER // CERTIFICATE_PREVIEW</span>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-400 hover:text-cyber-alert transition-colors p-2 -mr-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="relative p-2 md:p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] overflow-y-auto flex-1 flex items-center justify-center">
                <div className="relative border border-cyber-accent/10 flex justify-center bg-black/50 min-h-[200px] w-full">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-accent"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-accent"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-accent"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-accent"></div>

                  <img 
                    src={selectedCert} 
                    alt="Certificate" 
                    className="w-auto h-auto max-w-full max-h-full object-contain block mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/000000/00ff9f?text=CERTIFICATE+NOT+FOUND';
                    }}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-2 border-t border-cyber-accent/30 bg-cyber-black flex justify-between items-center text-[8px] sm:text-[10px] font-mono text-cyber-accent/50 shrink-0">
                <span>DOC_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                <span>VERIFIED_DIGITAL_ASSET</span>
              </div>

            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;