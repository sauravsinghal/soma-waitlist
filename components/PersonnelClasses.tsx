
import React from 'react';

const CLASSES = [
  {
    title: 'THE_REBOOT',
    desc: 'Fat-to-fit transformation protocol. High body-fat, low energy, chaos diet → one clean system to cut fat, stabilise meals and build a basic strength engine.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    )
  },
  {
    title: 'THE_SLEEPER_BUILD',
    desc: 'Lean-but-lethal frame upload. For people who “don’t look like they lift” yet – quiet muscle gain, high-protein structure, zero influencer circus.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    title: 'THE_CORP_BALANCE',
    desc: 'Desk-locked, calendar-hijacked unit. Routines built around calls, flights and family, not against them – smart meal timing, recovery and movement in a corporate timeline.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    title: 'THE_ATHLETE_CODED',
    desc: 'Performance-first blueprint. Sport / lifting / race prep where training, food and recovery are tuned for speed, power and repeatability, not just closing your rings.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  },
  {
    title: 'THE_LONGEVITY_OG',
    desc: 'Healthspan > grind. Slow-burn protocol for joints, sleep, labs and stress – designed for people who want to be dangerous at 60, not just shredded at 26.',
    icon: (
      <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
