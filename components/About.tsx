import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Cpu } from 'lucide-react';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <div className="h-[2px] w-12 bg-cyber-primary hidden sm:block"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron text-white">
            SYSTEM PROFILE <span className="text-cyber-primary text-xs sm:text-sm align-middle ml-2 opacity-70 block sm:inline mt-1 sm:mt-0">// ABOUT_ME</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Profile Data Panel */}
          <MotionDiv 
            className="md:col-span-2 hud-border p-6 sm:p-8 bg-cyber-dark/50"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
             <div className="flex flex-col gap-6">
                <p className="font-mono text-base sm:text-lg text-gray-300 leading-relaxed text-justify sm:text-left">
                   High-achieving <span className="text-cyber-primary">Computer Science undergraduate</span> with strong proficiency in Front-End Development, JavaScript, and Data Structures & Algorithms. Skilled in building responsive, interactive user interfaces using <span className="text-cyber-accent">HTML5, CSS3, modern JavaScript (ES6+), and React.js</span>. Certified in Google Gemini AI and Prompt Engineering. Strong leadership experience and passion for emerging technologies.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                   <div className="flex items-start gap-3">
                      <User className="text-cyber-secondary mt-1 shrink-0" />
                      <div>
                         <h4 className="font-orbitron text-cyber-secondary text-sm">OPERATOR NAME</h4>
                         <p className="font-mono text-white">Prem Gosavi</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-3">
                      <MapPin className="text-cyber-secondary mt-1 shrink-0" />
                      <div>
                         <h4 className="font-orbitron text-cyber-secondary text-sm">BASE LOCATION</h4>
                         <p className="font-mono text-white">Pune, Maharashtra, India</p>
                      </div>
                   </div>
                </div>
             </div>
          </MotionDiv>

          {/* Education Holo-Card */}
          <MotionDiv 
            className="hud-border p-6 bg-cyber-black/80 flex flex-col justify-center relative overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Animated background scan line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyber-primary/50 group-hover:animate-scanline opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center gap-3 mb-4">
               <GraduationCap className="text-cyber-accent w-8 h-8 shrink-0" />
               <h3 className="font-orbitron text-xl text-cyber-accent">EDUCATION</h3>
            </div>

            <div className="space-y-4 font-mono text-sm">
               <div>
                  <span className="text-gray-400 block text-xs">DEGREE</span>
                  <span className="text-white text-lg">BCA, Computer Science</span>
               </div>
               <div>
                  <span className="text-gray-400 block text-xs">INSTITUTE</span>
                  <span className="text-cyber-primary">SPPU University</span>
               </div>
               <div className="flex justify-between">
                  <div>
                    <span className="text-gray-400 block text-xs">DURATION</span>
                    <span className="text-white">2024 - 2027</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block text-xs">CGPA</span>
                    <span className="text-cyber-accent font-bold text-lg">9.18 / 10</span>
                  </div>
               </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default About;