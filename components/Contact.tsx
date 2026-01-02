import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    alert('TRANSMISSION INITIATED...');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-orbitron text-white mb-2">INITIATE TRANSMISSION</h2>
           <p className="font-mono text-cyber-primary text-xs sm:text-sm">ESTABLISH_CONNECTION_PROTOCOL</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
             <div className="hud-border p-4 sm:p-6 bg-cyber-dark/50">
                <h3 className="font-orbitron text-cyber-secondary text-lg sm:text-xl mb-6 border-b border-gray-800 pb-2">DIRECT_LINKS</h3>
                
                <div className="space-y-4 sm:space-y-6 font-mono text-sm sm:text-base">
                   <a href="mailto:premgosavi45@gmail.com" className="flex items-center gap-3 sm:gap-4 text-gray-300 hover:text-cyber-primary transition-colors group break-all">
                      <div className="p-2 bg-cyber-primary/10 rounded group-hover:bg-cyber-primary/20 shrink-0">
                         <Mail size={18} className="text-cyber-primary" />
                      </div>
                      <span>premgosavi45@gmail.com</span>
                   </a>
                   
                   <a href="tel:+918530988145" className="flex items-center gap-3 sm:gap-4 text-gray-300 hover:text-cyber-primary transition-colors group">
                      <div className="p-2 bg-cyber-primary/10 rounded group-hover:bg-cyber-primary/20 shrink-0">
                         <Phone size={18} className="text-cyber-primary" />
                      </div>
                      <span>+91-8530988145</span>
                   </a>

                   <div className="flex gap-4 pt-4">
                      <a href="#" className="flex-1 py-3 border border-gray-700 flex items-center justify-center gap-2 hover:border-cyber-primary hover:text-cyber-primary hover:bg-cyber-primary/5 transition-all text-xs sm:text-sm rounded-sm">
                         <Linkedin size={16} /> LINKEDIN
                      </a>
                      <a href="#" className="flex-1 py-3 border border-gray-700 flex items-center justify-center gap-2 hover:border-white hover:text-white hover:bg-white/5 transition-all text-xs sm:text-sm rounded-sm">
                         <Github size={16} /> GITHUB
                      </a>
                   </div>
                </div>
             </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-mono order-1 md:order-2">
             <div className="relative group">
                <input 
                  type="text" 
                  placeholder="IDENTIFIER [NAME]" 
                  className="w-full bg-black/50 border border-gray-700 p-3 sm:p-4 text-white focus:border-cyber-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all text-base sm:text-base" 
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
             
             <div className="relative group">
                <input 
                  type="email" 
                  placeholder="FREQUENCY [EMAIL]" 
                  className="w-full bg-black/50 border border-gray-700 p-3 sm:p-4 text-white focus:border-cyber-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all text-base sm:text-base"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                />
                 <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>

             <div className="relative group">
                <textarea 
                  rows={4}
                  placeholder="DATA_PACKET [MESSAGE]" 
                  className="w-full bg-black/50 border border-gray-700 p-3 sm:p-4 text-white focus:border-cyber-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all text-base sm:text-base"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>

             <button type="submit" className="w-full py-3 sm:py-4 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black font-bold tracking-widest transition-all flex items-center justify-center gap-2 group text-sm sm:text-base rounded-sm">
                [ TRANSMIT_MESSAGE ] <Send size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </form>

        </div>

        <footer className="mt-16 sm:mt-20 border-t border-gray-800 pt-8 text-center">
            <p className="font-mono text-gray-500 text-xs sm:text-sm">
                SYSTEM_VERSION_2.0 // DESIGNED_BY_PREM_GOSAVI // © 2025
            </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;