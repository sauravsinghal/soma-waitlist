
import React from 'react';
import { MetabolicState } from '../types';

interface HeroProps {
  data: MetabolicState;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="text-center space-y-12">
      <div className="relative inline-block mt-8">
        {/* Decorative skull icon or similar from the image */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-zinc-600">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-4.418 0-8 3.582-8 8v2c0 1.657 1.343 3 3 3v2h2v-2h2v2h2v-2h2v2h2v-2c1.657 0 3-1.343 3-3v-2c0-4.418-3.582-8-8-8zm-3 8h-2v-2h2v2zm6 0h-2v-2h2v2z"/>
           </svg>
        </div>

        {/* Core Temp Gauge UI */}
        <div className="relative p-12 border border-purple-500/20">
          <div className="absolute top-0 left-0 w-2 h-2 bg-purple-500" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500/20" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-500/20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500" />
          
          <div className="text-xs text-zinc-500 mb-2 uppercase tracking-tighter">CORE_TEMP</div>
          <div className="text-5xl font-bold tracking-tight flicker">
            {data.coreTemp}<span className="text-purple-500">°C</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none uppercase">
          THE METABOLIC OS
        </h1>
        <h2 className="text-2xl md:text-5xl font-bold tracking-tighter text-purple-600 uppercase">
          FOR THE 0.1%
        </h2>
      </div>

      <div className="max-w-xl mx-auto">
        <p className="text-zinc-500 text-sm leading-relaxed tracking-wide">
          &gt; Real-time biological intelligence integrated into your daily stack.
        </p>
      </div>

      <div className="max-w-md mx-auto flex items-center border border-purple-500/30 group">
        <span className="px-4 text-xs text-purple-500/60 font-bold">&gt; email:</span>
        <input 
          type="email" 
          placeholder="_______________________"
          className="bg-transparent flex-1 py-4 text-xs outline-none focus:placeholder-transparent transition-all"
        />
        <button className="bg-purple-600/10 hover:bg-purple-600 text-white px-8 py-4 text-[10px] font-bold tracking-[0.2em] transition-all border-l border-purple-500/30">
          EXECUTE
        </button>
      </div>

      <div className="flex justify-center gap-8 text-[9px] text-zinc-600 tracking-widest uppercase">
        <span>[GURGAON]</span>
        <span>[BANGALORE]</span>
        <span>[MUMBAI]</span>
      </div>
    </section>
  );
};

export default Hero;
