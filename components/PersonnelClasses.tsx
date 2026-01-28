
import React from 'react';

const CLASSES = [
  {
    title: 'THE_ANALYST',
    desc: 'DATA FATIGUE MITIGATION PROTOCOL ENABLED.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18M7 16l4-4 4 4 5-8" />
      </svg>
    )
  },
  {
    title: 'THE_BUILDER',
    desc: 'COGNITIVE OPTIMIZATION ACTIVE.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    )
  },
  {
    title: 'THE_EXEC',
    desc: 'CRASH PREVENTION SYSTEM STANDBY.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    title: 'THE_VISIONARY',
    desc: 'LONGEVITY ARCHITECTURE DESIGN.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  }
];

const PersonnelClasses: React.FC = () => {
  return (
    <section className="space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-zinc-600">PERSONNEL_CLASS</h2>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CLASSES.map((cls) => (
          <div key={cls.title} className="p-8 border border-zinc-800/50 hover:border-purple-500/40 bg-zinc-900/10 hover:bg-zinc-900/30 transition-all cursor-pointer group space-y-4">
            <div className="opacity-50 group-hover:opacity-100 transition-opacity">
              {cls.icon}
            </div>
            <h4 className="text-[12px] font-bold tracking-widest text-zinc-100 group-hover:text-purple-400">{cls.title}</h4>
            <p className="text-[10px] text-zinc-500 leading-normal tracking-wide">{cls.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonnelClasses;
