import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Project } from '../types';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;

const projects: Project[] = [
  {
    id: 1,
    title: "YouTube Clone",
    techStack: ["JavaScript", "HTML5", "CSS3", "DOM"],
    description: "Engineered a scalable video browsing interface replicating core YouTube features. Challenge: Managing complex state for dynamic video lists and search results without external libraries. Solution: Implemented efficient DOM manipulation and optimized fetch API calls for seamless content rendering, ensuring fluid performance across devices.",
    codeLink: "#",
    demoLink: "#"
  },
  {
    id: 2,
    title: "Portfolio Website",
    techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    description: "Architected a high-performance personal brand platform. Challenge: Achieving a cinematic 'sci-fi' aesthetic with complex animations without compromising load times. Solution: Utilized Framer Motion for hardware-accelerated transitions and modularized React components for maintainability, resulting in a 95+ Lighthouse performance score.",
    codeLink: "#",
    demoLink: "#"
  },
  {
    id: 3,
    title: "Advanced Calculator",
    techStack: ["JavaScript", "HTML5", "CSS3"],
    description: "Developed a robust computational tool supporting complex arithmetic. Challenge: Handling floating-point precision errors and edge cases in expression parsing. Solution: Implemented a custom parsing logic and rigorous error-handling algorithms to ensure mathematical accuracy and prevent runtime crashes during invalid inputs.",
    codeLink: "#",
    demoLink: "#"
  }
];

const Projects: React.FC = () => {
  const formatDescription = (text: string) => {
    if (!text.includes('Challenge:') || !text.includes('Solution:')) {
      return text;
    }
    const [overview, rest] = text.split('Challenge:');
    const [challenge, solution] = rest.split('Solution:');

    return (
      <>
        <span className="block mb-3">{overview.trim()}</span>
        <span className="block mb-2">
          <span className="text-cyber-alert text-[10px] font-bold tracking-wider uppercase opacity-80"> ERROR_LOG [CHALLENGE]:</span>
          <span className="block text-gray-300 mt-1">{challenge.trim()}</span>
        </span>
        <span className="block">
          <span className="text-cyber-accent text-[10px] font-bold tracking-wider uppercase opacity-80"> PATCH_APPLIED [SOLUTION]:</span>
          <span className="block text-gray-300 mt-1">{solution.trim()}</span>
        </span>
      </>
    );
  };

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8 sm:mb-12 justify-center sm:justify-start">
          <div className="h-[2px] w-12 bg-cyber-secondary hidden sm:block"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron text-white text-center sm:text-left">
            ACTIVE MODULES <span className="text-cyber-secondary text-xs sm:text-sm align-middle ml-2 opacity-70 block sm:inline mt-1 sm:mt-0">// PROJECTS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <MotionDiv
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cyber-dark/40 border border-cyber-secondary/30 p-5 sm:p-6 relative group hover:bg-cyber-secondary/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] hover:border-cyber-secondary/60 backdrop-blur-sm flex flex-col h-full rounded-md sm:rounded-none"
            >
              {/* Holographic Top Border */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-secondary to-transparent opacity-50 group-hover:opacity-100"></div>

              <div className="flex items-center justify-between mb-4">
                 <Folder className="text-cyber-secondary" />
                 <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyber-alert animate-pulse"></div>
                    <span className="text-[10px] text-cyber-alert font-mono">LIVE</span>
                 </div>
              </div>

              <h3 className="text-lg sm:text-xl font-orbitron text-white mb-3 group-hover:text-cyber-secondary transition-colors">
                {project.title}
              </h3>
              
              {/* Tech Stack Badges - Moved Above Description */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-[9px] sm:text-[10px] font-mono text-cyber-primary bg-cyber-primary/10 px-2 py-0.5 rounded-sm border border-cyber-primary/20 tracking-wide uppercase hover:bg-cyber-primary/20 transition-colors shadow-[0_0_5px_rgba(0,240,255,0.1)]">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description: responsive height to prevent overflow or empty space */}
              <div className="text-gray-400 font-mono text-xs sm:text-sm mb-6 flex-grow leading-relaxed">
                {formatDescription(project.description)}
              </div>

              <div className="flex gap-4 mt-auto">
                <a href={project.demoLink} className="flex-1 flex items-center justify-center gap-2 bg-cyber-secondary/20 hover:bg-cyber-secondary hover:text-white text-cyber-secondary border border-cyber-secondary py-2 text-xs font-orbitron transition-all rounded-sm">
                  <ExternalLink size={14} /> LAUNCH
                </a>
                <a href={project.codeLink} className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-600 py-2 text-xs font-orbitron transition-all rounded-sm">
                  <Github size={14} /> CODE
                </a>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;