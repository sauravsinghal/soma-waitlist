
import React from 'react';

const EVENTS = [
  {
    time: 'V0.0 · MVP_BOOT',
    title: 'THE PROTOTYPE',
    desc: 'One console to run your day: diet + lifestyle context + workouts. No wearables yet – just an AI that learns your food patterns, builds a routine around your job, and throws real red flags instead of pretty graphs.',
    active: true
  },
  {
    time: 'V0.5 · AGENT_GRID',
    title: 'THE SYSTEM',
    desc: 'Specialised agents come online: nutrition, workout, recovery, stress, gut, skincare, disease recovery and a doctor-view that shows exactly what a real clinician wants to see. Smart alerts for sugar spikes, bad sleep, stalled recovery and winter arcs.',
    active: false
  },
  {
    time: 'V1.0 · LIFE_IMMERSION',
    title: 'THE MERGE',
    desc: 'Soma steps out of the app and into your life: kitchen, calendar, travel mode, house-help flows. The system sees how you actually live and quietly rewires your meals, movement and recovery in real time.',
    active: false
  },
  {
    time: 'V∞ · OG_TWIN',
    title: 'THE ENDGAME',
    desc: 'You wake up, curtains open. Soma has already processed yesterday’s food, sleep, movement and stress. You get a 30-second brief, a full-day plan, micro-course-corrections and doctor hand-offs when needed. The final OG app you grow old with – an operating system for the most complex machine ever built: your body.',
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
              <p className="text-[11px] text-zinc-500 italic font-light leading-relaxed">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExecutionCycle;
