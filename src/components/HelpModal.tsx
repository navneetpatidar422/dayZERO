
import React, { useState, useEffect } from 'react';
import { MILESTONES } from '../types';

interface HelpModalProps {
  onClose: () => void;
}

interface AccordionSectionProps {
  title: string;
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  subtitle?: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, id, isOpen, onToggle, children, subtitle }) => {
  return (
    <div className={`border-b border-zinc-900/50 transition-all duration-500 ${isOpen ? 'bg-zinc-950/30' : ''}`}>
      <button 
        onClick={() => onToggle(id)}
        className="w-full py-8 flex flex-col items-start text-left group px-4 sm:px-8"
      >
        <div className="flex items-center gap-6 w-full">
          <div className={`w-1 h-8 transition-all duration-500 ${isOpen ? 'bg-rose-600 scale-y-100' : 'bg-zinc-800 scale-y-50'}`} />
          <div className="flex-grow">
            <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tighter italic transition-all duration-500 ${isOpen ? 'text-white translate-x-2' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-[9px] font-black uppercase tracking-[0.4em] mt-1 transition-all duration-500 ${isOpen ? 'text-rose-500 opacity-100' : 'text-zinc-700 opacity-60'}`}>
                {subtitle}
              </p>
            )}
          </div>
          <span className={`text-xl font-black transition-transform duration-500 ${isOpen ? 'rotate-180 text-rose-600' : 'text-zinc-800'}`}>
            {isOpen ? '↑' : '↓'}
          </span>
        </div>
      </button>
      
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-12' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-12 sm:px-24 text-zinc-400 text-sm leading-relaxed space-y-6 max-w-4xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  const [openSection, setOpenSection] = useState<string | null>('overview');
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleClose = () => {
    setIsRevealed(false);
    setTimeout(onClose, 600);
  };

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden flex items-center justify-center">
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />

      <div className={`absolute inset-y-0 left-0 w-1/2 bg-[#050505] border-r border-zinc-800 transition-transform duration-700 ease-in-out z-20 ${isRevealed ? '-translate-x-full' : 'translate-x-0'}`} />
      <div className={`absolute inset-y-0 right-0 w-1/2 bg-[#050505] border-l border-zinc-800 transition-transform duration-700 ease-in-out z-20 ${isRevealed ? 'translate-x-full' : 'translate-x-0'}`} />

      <div className={`relative w-full h-full bg-[#020202] overflow-y-auto no-scrollbar transition-opacity duration-500 delay-200 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
        <header className="sticky top-0 z-30 bg-[#020202]/90 backdrop-blur-xl border-b border-zinc-900/50 px-6 sm:px-12 py-8 flex items-center justify-between">
          <button 
            onClick={handleClose}
            className="group flex items-center gap-4 px-8 py-4 bg-rose-950/10 border border-rose-900/30 text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,0,60,0.05)]"
          >
            <span className="text-xl font-black group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">EXIT_INTERFACE</span>
          </button>
          
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.5em]">SYSTEM_VERSION_4.0.2</p>
            <p className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.5em] mt-1 italic">ENCRYPTED_UPLINK_SECURED</p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-24">
          <div className="mb-32">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-[2px] bg-rose-600" />
              <span className="text-rose-600 font-black uppercase tracking-[0.8em] text-[10px]">OPERATIONAL_GUIDE</span>
            </div>
            <h1 className="text-8xl sm:text-[10rem] font-black uppercase tracking-tighter italic leading-[0.85] text-white">
              SYSTEM<br /><span className="text-zinc-900">ARCHIVE</span>
            </h1>
            <p className="text-zinc-500 max-w-xl mt-12 text-sm leading-loose font-medium border-l-2 border-zinc-800 pl-8">
              DAYZERO is a high-pressure, loss-aversion-driven interface designed to enforce daily consistency through cold logic. No fluff, no motivation—just discipline or failure.
            </p>
          </div>

          <div className="space-y-4">
            <AccordionSection title="01_The_Logic" id="logic" isOpen={openSection === 'logic'} onToggle={toggleSection} subtitle="UNDERSTANDING THE PRESSURE">
              <p>The human brain is hardwired to fear loss more than it values gain. DAYZERO exploits this <span className="text-white">Cognitive Vulnerability</span>.</p>
              <p>By visualizing your life mortality and the "Streak Death Window," the system creates a high-stakes environment where missing a single day feels like an existential failure.</p>
              <div className="p-6 bg-zinc-950 border border-zinc-900 text-[11px] font-black text-rose-500 uppercase tracking-widest leading-relaxed">
                REMEMBER: SUCCESS IS THE PRODUCT OF REPETITIVE ACTIONS EXECUTED UNDER PRESSURE.
              </div>
            </AccordionSection>

            <AccordionSection title="02_Execution_Steps" id="steps" isOpen={openSection === 'steps'} onToggle={toggleSection} subtitle="STEP-BY-STEP OPERATIONS">
              <div className="space-y-8">
                <div className="flex gap-8">
                  <span className="text-5xl font-black text-zinc-900 italic">01</span>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">IDENTITY BINDING</h4>
                    <p>Register your Identity Node. Your "Target" (e.g., JEE, UPSC, DevOps) is your objective. Once an active protocol is live, your name and target are <span className="text-rose-600 italic">locked</span> to prevent identity escaping.</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <span className="text-5xl font-black text-zinc-900 italic">02</span>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">CONTRACT CREATION</h4>
                    <p>Establish a "New Contract." Define a task that is difficult but necessary. Set a duration (Min 7 Days). This is your non-negotiable success criteria.</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <span className="text-5xl font-black text-zinc-900 italic">03</span>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">DAILY VERIFICATION</h4>
                    <p>Each day, before <span className="text-emerald-500">23:59:59 IST</span>, you must manually uplink your success by clicking "I SHOWED UP TODAY." Failure to do so results in protocol termination.</p>
                  </div>
                </div>
              </div>
            </AccordionSection>

            <AccordionSection title="03_Hard_Laws" id="laws" isOpen={openSection === 'laws'} onToggle={toggleSection} subtitle="THE UNBREAKABLE CONSTRAINTS">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <li className="p-8 border border-zinc-900 bg-zinc-950/50">
                  <span className="text-rose-600 font-black text-xs uppercase tracking-widest block mb-4">L01: IST_TIME_LOCK</span>
                  <p className="text-xs">The system operates strictly on Indian Standard Time. Regardless of your physical location, the streak window closes at midnight IST.</p>
                </li>
                <li className="p-8 border border-zinc-900 bg-zinc-950/50">
                  <span className="text-rose-600 font-black text-xs uppercase tracking-widest block mb-4">L02: CAPACITY_LIMIT</span>
                  <p className="text-xs">You are limited to 3 active protocols. This enforces focus. You cannot split your discipline across too many nodes.</p>
                </li>
                <li className="p-8 border border-zinc-900 bg-zinc-950/50">
                  <span className="text-rose-600 font-black text-xs uppercase tracking-widest block mb-4">L03: ZERO_TOLERANCE</span>
                  <p className="text-xs">Missing one day resets your chain to zero. There is no recovery of lost progress. You must begin anew from Day 0.</p>
                </li>
                <li className="p-8 border border-zinc-900 bg-zinc-950/50">
                  <span className="text-rose-600 font-black text-xs uppercase tracking-widest block mb-4">L04: DATA_PERSISTENCE</span>
                  <p className="text-xs">All failures are logged. Your Heatmap will forever reflect the days you abandoned your identity.</p>
                </li>
              </ul>
            </AccordionSection>

            <AccordionSection title="04_Rankings" id="ranks" isOpen={openSection === 'ranks'} onToggle={toggleSection} subtitle="IDENTITY TAG EVOLUTION">
              <p className="mb-8">Your Identity Tag evolves based on the length of your unbroken chain. Breaking the chain reverts your tag to "RECRUIT".</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MILESTONES.map(m => (
                  <div key={m.value} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900">
                    <div>
                      <span className="text-zinc-600 font-black mono text-[10px] uppercase block">DAY_{m.value}</span>
                      <span className="text-zinc-100 font-black uppercase italic tracking-tighter">{m.label}</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-rose-600/30 shadow-[0_0_10px_rgba(255,0,60,0.2)]" />
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="05_Developer_Node" id="dev" isOpen={openSection === 'dev'} onToggle={toggleSection} subtitle="SYSTEM ARCHITECT">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-48 h-48 border border-zinc-800 p-2 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Navneet" alt="Dev" className="w-full h-full object-cover bg-zinc-900" />
                </div>
                <div className="flex-grow w-full space-y-4">
                  <h4 className="text-4xl font-black italic uppercase text-white tracking-tighter">Navneet Patidar</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    <a href="mailto:navneetpatidar422@gmail.com" className="p-4 sm:p-6 border border-zinc-900 bg-zinc-950 flex flex-col justify-center min-h-[100px] hover:border-rose-600 transition-colors group">
                      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-2 group-hover:text-rose-500 transition-colors">DIRECT_UPLINK</span>
                      <span className="text-[10px] font-black text-zinc-300 break-all leading-tight">navneetpatidar422@gmail.com</span>
                    </a>
                    <a href="https://www.linkedin.com/in/navneet-patidar/" target="_blank" className="p-4 sm:p-6 border border-zinc-900 bg-zinc-950 flex flex-col justify-center min-h-[100px] hover:border-rose-600 transition-colors group">
                      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-2 group-hover:text-rose-500 transition-colors">PROFESSIONAL_NETWORK</span>
                      <span className="text-[10px] font-black text-zinc-300 break-all leading-tight">LINKEDIN/navneet-patidar</span>
                    </a>
                    <a href="https://instagram.com/_navneetpatidar" target="_blank" className="p-4 sm:p-6 border border-zinc-900 bg-zinc-950 flex flex-col justify-center min-h-[100px] hover:border-rose-600 transition-colors group">
                      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-2 group-hover:text-rose-500 transition-colors">SIGNAL_INTERCEPT</span>
                      <span className="text-[10px] font-black text-zinc-300 break-all leading-tight">INSTA/_navneetpatidar</span>
                    </a>
                  </div>
                </div>
              </div>
            </AccordionSection>
          </div>

          <footer className="mt-32 pt-16 border-t border-zinc-900 flex flex-col items-center">
            <div className="text-center mb-8">
              <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[1em] mb-4">Created by Navneet only for YOU</p>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] italic leading-relaxed">
                "Discipline is not a choice, it is an identity. This system is just a mirror."
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};