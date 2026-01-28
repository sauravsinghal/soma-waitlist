
import React from 'react';

const EVENTS = [
  {
    time: '08:00',
    title: 'THE BRIEF',
    desc: 'Metabolic forecast compiled via deep sleep telemetry.',
    active: true
  },
  {
    time: '13:00',
    title: 'THE PIVOT',
    desc: 'Afternoon nutritional adjustment protocol engaged.',
    active: false
  },
  {
    time: '19:00',
    title: 'THE STRATEGY',
    desc: 'Glycemic stability optimized for evening rest phase.',
    active: false
  },
  {
    time: '22:00',
    title: 'THE SHUTDOWN',
    desc: 'Autonomic nervous system recalibration sequence.',
    active: false
  }
];

const ExecutionCycle: React.FC = () => {
  return (
    <section className="space-y-12 max-w-2xl">
      <h2 className="text-2xl font-bold tracking-tighter uppercase flicker">EXECUTION_CYCLE_01</h2>
      
      <div className="relative pl-8 space-y-12 border-l border-zinc-800">
        {EVENTS.map((event) => (
          <div key={event.time} className="relative">
            {/* Indicator */}
            <div className={`absolute -left-[37px] top-1 w-4 h-4 border ${event.active ? 'bg-purple-600 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-black border-zinc-800'}`} />
            
            <div className="space-y-1">
              <span className={`text-[10px] font-bold tracking-widest ${event.active ? 'text-purple-500' : 'text-zinc-600'}`}>T={event.time}</span>
              <h4 className="text-sm font-bold tracking-widest text-zinc-100 uppercase">{event.title}</h4>
              <p className="text-[11px] text-zinc-500 italic font-light">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExecutionCycle;
