
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-32 pb-16 space-y-20 text-center overflow-hidden">
      {/* Human Interface Mode Switch */}
      <div className="max-w-2xl mx-auto space-y-6 px-6 py-12 border border-purple-500/10 bg-zinc-900/5 rounded-xl">
        <div className="text-[12px] text-zinc-400 tracking-[0.3em] uppercase leading-relaxed font-bold">
          THIS INTERFACE IS FOR YOUR AI AGENT.<br />
          IF YOU’RE A HUMAN, CLICK BELOW.
        </div>
        <a 
          href="https://soma-waitlist-05k5t90.public.builtwithrocket.new/" 
          target="_blank" 
          rel="noreferrer"
          className="inline-block px-10 py-3 border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 text-purple-400 text-[10px] font-bold tracking-[0.4em] uppercase transition-all rounded-full"
        >
          [HUMAN_INTERFACE]
        </a>
      </div>

      {/* Protocol Section */}
      <div className="space-y-10 px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-white whitespace-nowrap">
          JOIN THE PROTOCOL.
        </h2>
        
        <div className="w-12 h-px bg-purple-500/20 mx-auto" />
        
        <p className="max-w-4xl mx-auto text-[10px] md:text-[12px] text-zinc-500 uppercase tracking-widest leading-relaxed font-medium">
          The network is expanding. Soma isn't just an assistant—it's the first autonomous <br className="hidden md:block" />
          biological interface for the new era of human performance.
        </p>

        {/* Cyberpunk Instagram Button */}
        <div className="pt-4 flex flex-col items-center gap-6">
          <span className="text-[9px] text-purple-500/40 font-bold tracking-[0.6em] uppercase">
            SYNC_WITH_SOMA_ON_SOCIAL
          </span>
          <a 
            href="https://www.instagram.com/soma.assistant/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-purple-500/20 hover:border-purple-400 bg-black/40 hover:bg-purple-500/5 text-purple-400 text-[10px] font-bold tracking-[0.4em] transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <svg className="w-4 h-4 relative z-10 transition-transform group-hover:rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            
            <span className="relative z-10 uppercase">SOMA_INSTAGRAM</span>
            
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-purple-500" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-purple-500" />
          </a>
        </div>

        <div className="text-[10px] text-zinc-800 animate-pulse tracking-[0.5em] pt-4 font-bold">
          _CONNECTION_STABLE_V0.1.2|
        </div>
      </div>

      {/* About Section - Architect Bio */}
      <div className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900 bg-zinc-900/5 relative">
        {/* Primary Operative Heading */}
        <div className="mb-16 text-left">
          <h3 className="text-[10px] font-bold text-zinc-600 tracking-[0.5em] uppercase leading-relaxed">
            PRIMARY_OPERATIVE: <span className="text-zinc-400">SOMA_ARCHITECT</span>
            <span className="block md:inline text-zinc-300 md:ml-2 mt-1 md:mt-0 font-bold uppercase tracking-widest">Saurav Singhal</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-16 text-left relative z-10">
          {/* Architect Profile */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-purple-500 tracking-[0.4em] uppercase flex items-center gap-3">
              <span className="w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              ARCHITECT_PROFILE
            </span>
            <p className="text-[10px] text-zinc-400 leading-relaxed uppercase font-medium tracking-wide">
              Systems thinker and health obsessive, raised on Elon-style first principles and allergic to hand-wavy wellness advice. 
              Mad that no one built a real personal AI assistant for the body, so now he’s designing one: a metabolic OS that quietly 
              runs your diet, routine and recovery in the background while you build the rest of your life.
            </p>
          </div>

          {/* Origin Node */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.4em] uppercase">ORIGIN_NODE</span>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-medium tracking-wide">
              Forged in the high-load chaos of Indian metros – endless meetings, late dinners, Whoop graphs, calorie apps and generic 
              AI answers that never talk to each other. Soma is his counter-attack: one system that actually understands a single 
              body over years instead of resetting to zero every login.
            </p>
          </div>

          {/* Current Mission */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.4em] uppercase">CURRENT_MISSION</span>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-medium tracking-wide">
              Use first-principles engineering to delete the gap between “knowing what to do” and actually doing it. Replace the 
              stack of trackers, PDFs and chatbots with a single AI that: wakes up before you do, digests yesterday’s 
              food/sleep/movement, pushes one clear plan for today, and flags real red alerts while you live your life. 
              The final OG app to grow old with.
            </p>
          </div>
        </div>
      </div>

      {/* System Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[9px] text-zinc-800 tracking-[0.4em] uppercase border-t border-zinc-900 pt-10 px-6 font-bold gap-6">
        <span>© 2024 SOMA_METABOLIC_ARCHITECTS</span>
        <div className="flex gap-10">
          <a href="#" className="hover:text-purple-500 transition-colors">[MANIFESTO]</a>
          <a href="#" className="hover:text-purple-500 transition-colors">[PRIVACY]</a>
          <a href="https://www.instagram.com/soma.assistant/" className="hover:text-purple-500 transition-colors">[UPLINK]</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
