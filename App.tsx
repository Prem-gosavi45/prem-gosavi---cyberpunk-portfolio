import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import SystemStatus from './components/SystemStatus';
import BackgroundHUD from './components/BackgroundHUD';

const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!bootComplete && (
          <BootSequence onComplete={() => setBootComplete(true)} />
        )}
      </AnimatePresence>

      {bootComplete && (
        <main className="relative min-h-screen bg-cyber-black text-white overflow-x-hidden selection:bg-cyber-primary selection:text-black">
          
          {/* Animated Background: Floating 3D Blinking Boxes */}
          <BackgroundHUD />

          {/* System Status Indicator */}
          <SystemStatus />

          <div className="relative z-10">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </div>
        </main>
      )}
    </>
  );
};

export default App;