import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem } from '../types';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Vice President",
    company: "HackWithIndia (PVPIT Chapter)",
    period: "Nov 2025 – Present",
    details: [
      "Lead student engagement for a 500+ member technical community",
      "Organize hackathons, innovation programs, and tech events",
      "Collaborate with founders and core team to promote innovation"
    ]
  },
  {
    id: 2,
    role: "Web Developer Intern",
    company: "VaultofCodes",
    period: "Nov 2025 – Dec 2025",
    details: [
      "Developed and deployed real-world web applications",
      "Collaborated with cross-functional teams",
      "Improved problem-solving via code reviews and pair programming"
    ]
  },
  {
    id: 3,
    role: "Campus Ambassador",
    company: "Entrepreneurship Development Cell (eDC), IIT Delhi",
    period: "Dec 2025",
    details: [
      "Represented PVPIT College",
      "Promoted BECon’26 and entrepreneurship initiatives"
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12 sm:mb-16 justify-center">
          <div className="h-[2px] w-6 sm:w-8 bg-cyber-primary"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron text-white text-center">
            MISSION LOG
          </h2>
          <div className="h-[2px] w-6 sm:w-8 bg-cyber-primary"></div>
        </div>

        <div className="relative border-l-2 border-cyber-primary/20 ml-2 sm:ml-4 md:ml-8 space-y-8 sm:space-y-12">
          {experiences.map((exp, idx) => (
            <MotionDiv 
              key={exp.id}
              className="relative pl-6 sm:pl-8 md:pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-cyber-black border-2 border-cyber-primary rounded-full group">
                <div className="w-full h-full bg-cyber-primary rounded-full animate-pulse opacity-50 group-hover:opacity-100"></div>
              </div>

              <div className="bg-cyber-dark/30 border border-white/5 p-4 sm:p-6 rounded-lg hover:border-cyber-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <div>
                     <h3 className="text-lg sm:text-xl font-orbitron text-cyber-primary leading-tight">{exp.role}</h3>
                     <h4 className="text-white font-mono text-sm sm:text-base mt-1">{exp.company}</h4>
                  </div>
                  <div className="self-start md:self-auto text-xs sm:text-sm font-mono text-cyber-accent bg-cyber-accent/10 px-3 py-1 rounded inline-block whitespace-nowrap">
                    {exp.period}
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-gray-400 font-mono text-xs sm:text-sm">
                      <span className="mr-2 text-cyber-secondary shrink-0">{'>'}</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;