
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-32 pb-12 space-y-24 text-center">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase flicker">
          IF YOU KNOW,<br />YOU KNOW.
        </h2>
        
        <div className="w-12 h-px bg-purple-500/50 mx-auto" />
        
        <p className="max-w-md mx-auto text-[11px] text-zinc-500 uppercase tracking-widest leading-loose font-medium px-4">
          RESTRICTED ACCESS. RESERVED FOR THOSE WHO UNDERSTAND THE VALUE OF AN OPTIMIZED SYSTEM ARCHITECTURE.
        </p>

        <button className="px-12 py-5 border border-zinc-800 hover:border-purple-500 hover:text-purple-400 text-zinc-400 text-xs font-bold tracking-[0.4em] transition-all group">
          APPLY_FOR_ACCESS
          <span className="block h-px w-0 group-hover:w-full bg-purple-500 transition-all mt-1" />
        </button>

        <div className="text-[10px] text-zinc-700 animate-pulse tracking-[0.2em] pt-8 uppercase">
          _awaiting_input|
        </div>
      </div>

      <div className="flex justify-between items-center text-[9px] text-zinc-700 tracking-widest uppercase border-t border-zinc-900 pt-8 px-4">
        <span>© 2024 SOMA_METABOLIC_SYS</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-purple-500 transition-colors">[MANIFESTO]</a>
          <a href="#" className="hover:text-purple-500 transition-colors">[PRIVACY]</a>
          <a href="#" className="hover:text-purple-500 transition-colors">[X_LINK]</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
