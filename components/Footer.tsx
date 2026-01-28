
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-32 pb-12 space-y-24 text-center">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase flicker text-white">
          JOIN THE<br />PROTOCOL.
        </h2>
        
        <div className="w-12 h-px bg-purple-500/50 mx-auto" />
        
        <p className="max-w-md mx-auto text-[11px] text-zinc-500 uppercase tracking-widest leading-loose font-medium px-4">
          The network is expanding. Soma isn't just an assistant—it's the first autonomous 
          biological interface for the new era of human performance.
        </p>

        {/* Cyberpunk Instagram Button */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <span className="text-[10px] text-purple-500/60 font-bold tracking-[0.3em] uppercase">
            SYNC_WITH_SOMA_ON_SOCIAL
          </span>
          <a 
            href="https://www.instagram.com/soma.assistant/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 border-2 border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10 text-purple-400 text-xs font-black tracking-[0.4em] transition-all group relative overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            <div className="absolute inset-0 bg-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            
            <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            
            <span className="relative z-10 uppercase">SOMA_INSTAGRAM</span>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-purple-500" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-purple-500" />
          </a>
        </div>

        <div className="text-[10px] text-zinc-700 animate-pulse tracking-[0.2em] pt-8 uppercase">
          _connection_stable_v0.1.2|
        </div>
      </div>

      {/* About Section in Cyberpunk Style */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-t border-zinc-900 bg-zinc-900/10">
        <div className="grid md:grid-cols-3 gap-12 text-left">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-purple-500 tracking-widest uppercase flex items-center gap-2">
              <span className="w-1 h-1 bg-purple-500 rounded-full animate-ping" />
              ARCHITECT_PROFILE
            </span>
            <p className="text-[10px] text-zinc-400 leading-relaxed uppercase font-medium">
              Systems thinker and health obsessive, raised on Elon-style first principles and allergic to hand-wavy wellness advice. 
              Mad that no one built a real personal AI assistant for the body, so now he’s designing one: a metabolic OS that quietly 
              runs your diet, routine and recovery in the background while you build the rest of your life.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">ORIGIN_NODE</span>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-medium">
              Forged in the high-load chaos of Indian metros – endless meetings, late dinners, Whoop graphs, calorie apps and generic 
              AI answers that never talk to each other. Soma is his counter-attack: one system that actually understands a single 
              body over years instead of resetting to zero every login.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">CURRENT_MISSION</span>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-medium">
              Use first-principles engineering to delete the gap between “knowing what to do” and actually doing it. Replace the 
              stack of trackers, PDFs and chatbots with a single AI that: wakes up before you do, digests yesterday’s 
              food/sleep/movement, pushes one clear plan for today, and flags real red alerts while you live your life. 
              The final OG app to grow old with.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[9px] text-zinc-700 tracking-widest uppercase border-t border-zinc-900 pt-8 px-4">
        <span>© 2024 SOMA_METABOLIC_SYS</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-purple-500 transition-colors">[MANIFESTO]</a>
          <a href="#" className="hover:text-purple-500 transition-colors">[PRIVACY]</a>
          <a href="https://www.instagram.com/soma.assistant/" className="hover:text-purple-500 transition-colors">[INSTAGRAM]</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
