
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-purple-500/20 px-6 py-3 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50 text-[10px] tracking-widest text-zinc-500 uppercase">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-purple-500 font-bold">[SOMA_SYS_v0.1]</span>
          <span className="animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            STATUS: INITIALIZING...
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden sm:block">
          AUTH: <span className="text-zinc-300">GURGAON_CORE_ENCRYPTED</span>
        </div>
        
        <a 
          href="https://soma-waitlist-05k5t90.public.builtwithrocket.new/" 
          target="_blank" 
          rel="noreferrer"
          className="border border-purple-500/30 px-3 py-1 hover:bg-purple-500/10 hover:border-purple-500 transition-all text-purple-400 font-bold"
        >
          [HUMAN_INTERFACE]
        </a>
      </div>
    </header>
  );
};

export default Header;
