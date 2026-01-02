import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal, Cpu, Users } from 'lucide-react';
import { SkillCategory } from '../types';

// Fix for strict type checking on motion components
const MotionDiv = motion.div as any;

const skillCategories: SkillCategory[] = [
  {
    title: 'LANGUAGES',
    icon: Code2,
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'C++', 'C']
  },
  {
    title: 'FRAMEWORKS',
    icon: Layout,
    skills: ['React.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    title: 'DEV TOOLS',
    icon: Terminal,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Chrome DevTools', 'Copilot']
  },
  {
    title: 'COMPETENCIES',
    icon: Cpu,
    skills: ['Front-End Dev', 'Data Structures', 'Algorithms', 'Prompt Engineering']
  },
  {
    title: 'SOFT SKILLS',
    icon: Users,
    skills: ['Leadership', 'Communication', 'Collaboration', 'Public Speaking']
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 bg-cyber-dark/30 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 md:mb-12 justify-center md:justify-end text-center md:text-right">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron text-white order-2 md:order-1">
            TECH MATRIX <span className="text-cyber-accent text-xs sm:text-sm align-middle md:mr-2 opacity-70 block md:inline mt-1 md:mt-0">// SKILLS</span>
          </h2>
          <div className="h-[2px] w-12 bg-cyber-accent order-1 md:order-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, idx) => (
            <MotionDiv
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-black/40 border border-cyber-primary/20 p-5 sm:p-6 rounded relative overflow-hidden group hover:border-cyber-primary/60 transition-colors"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                 <div className="w-2 h-2 bg-cyber-primary"></div>
              </div>
              
              <div className="flex items-center gap-3 mb-4 sm:mb-6 border-b border-gray-800 pb-2">
                <category.icon className="text-cyber-primary w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <h3 className="font-orbitron text-base sm:text-lg text-white tracking-wide">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="relative">
                    <div className="flex justify-between text-sm font-mono text-gray-400 mb-1 group-hover:text-cyber-primary/80 transition-colors">
                      <span>{skill}</span>
                    </div>
                    {/* Animated Progress Bar Placeholder */}
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <MotionDiv 
                        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (sIdx * 0.1) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;