
import React, { useState, useEffect, useRef } from 'react';
import { MetabolicState } from '../types';

interface HeroProps {
  data: MetabolicState;
  onLog: (type: 'ERROR' | 'OK' | 'INFO', module: string, message: string) => void;
  isLiveActive: boolean;
  onToggleLive: () => void;
}

const Hero: React.FC<HeroProps> = ({ data, onLog, isLiveActive, onToggleLive }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');
  
  // Audio refs for preloading
  const hoverSoundRef = useRef<string>('https://assets.mixkit.co/active_storage/sfx/2558/2558-preview.mp3');
  const clickSoundRef = useRef<string>('https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3');

  const playHoverSound = () => {
    // Create a fresh instance for immediate playback and overlapping support
    const sound = new Audio(hoverSoundRef.current);
    sound.volume = 0.2;
    // Set a higher playback rate for that "scratchy" futuristic digital aesthetic
    sound.playbackRate = 1.6;
    sound.play().catch(() => {
      // Browser prevents audio playback until first interaction
    });
  };

  const playClickSound = () => {
    const sound = new Audio(clickSoundRef.current);
    sound.volume = 0.3;
    sound.play().catch(() => {});
  };

  const handleActionClick = () => {
    playClickSound();
    onToggleLive();
  };

  const handleExecute = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playClickSound();

    if (!email || !email.includes('@')) {
      onLog('ERROR', 'AUTH', 'INVALID_CREDENTIAL_FORMAT');
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 2000);
      return;
    }

    setStatus('PROCESSING');
    onLog('INFO', 'UPLINK', 'ESTABLISHING_ENCRYPTED_CONNECTION...');
    
    try {
      const WEBHOOK_URL = "https://hook.eu1.make.com/YOUR_WEBHOOK_ID_HERE";
      
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email,
          timestamp: new Date().toISOString(),
          metadata: {
            coreTemp: data.coreTemp,
            heartRate: data.heartRate,
            origin: "SOMA_v0.1_DASHBOARD"
          }
        }),
      });

      if (response.ok) {
        onLog('OK', 'DATABASE', `ACCESS_GRANTED_TO_${email.toUpperCase()}`);
        setStatus('SUCCESS');
        setEmail('');
        setTimeout(() => setStatus('IDLE'), 5000);
      } else {
        throw new Error("SERVER_REJECTED_UPLINK");
      }
    } catch (err) {
      onLog('ERROR', 'NETWORK', 'UPLINK_TRANSMISSION_FAILURE');
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <section className="text-center space-y-12">
      <div className="relative inline-block mt-8">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-zinc-600">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-4.418 0-8 3.582-8 8v2c0 1.657 1.343 3 3 3v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2c1.657 0 3-1.343 3-3v-2c0-4.418-3.582-8-8-8zm-3 8h-2v-2h2v2zm6 0h-2v-2h2v2z"/>
           </svg>
        </div>

        <div className="relative p-12 border border-purple-500/20">
          <div className="absolute top-0 left-0 w-2 h-2 bg-purple-500" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500/20" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-500/20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500" />
          
          <div className="text-xs text-zinc-500 mb-2 uppercase tracking-tighter font-bold">CORE_TEMP</div>
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
        <p className="text-zinc-500 text-sm leading-relaxed tracking-wide font-medium">
          &gt; Real-time biological intelligence integrated into your daily stack.
        </p>
      </div>

      {/* Main CTA Button with Updated Scratchy Glitch Sound */}
      <div className="max-w-md mx-auto pt-4">
        <button 
          onClick={handleActionClick}
          onMouseEnter={playHoverSound}
          className={`w-full group relative flex items-center justify-center gap-4 px-8 py-6 text-sm font-bold tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden ${
            isLiveActive 
            ? 'bg-zinc-900 border-2 border-red-500/50 text-red-400' 
            : 'bg-purple-600 border-2 border-purple-400 text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:bg-purple-500'
          }`}
        >
          {!isLiveActive && (
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          )}
          
          <span className="relative flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${isLiveActive ? 'bg-red-500 animate-pulse' : 'bg-white'}`} />
            {isLiveActive ? 'TERMINATE_SOMA_UPLINK' : 'TALK_TO_SOMA_ASSISTANT'}
          </span>
          
          <div className="absolute top-0 left-0 w-1 h-1 bg-white/40" />
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/40" />
        </button>
      </div>

      {/* Thin Purple Divider Line */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="h-px w-full bg-purple-500/20" />
      </div>

      {/* Enhanced Waitlist Section */}
      <div className="max-w-md mx-auto space-y-6 pt-0">
        <div className="flex flex-col items-center gap-2">
           <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1 bg-purple-500/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-purple-400 uppercase whitespace-nowrap">
                WAITLIST_PROTOCOL_v0.1
              </span>
              <div className="h-px flex-1 bg-purple-500/20" />
           </div>
           <p className="text-[9px] text-zinc-500 tracking-widest uppercase font-bold">
             SECURE YOUR BIOLOGICAL NODE IN THE NEXT COHORT
           </p>
        </div>

        <form 
          onSubmit={handleExecute}
          className={`relative flex items-center border-2 transition-all duration-500 overflow-hidden ${
            status === 'SUCCESS' ? 'border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.4)]' : 
            status === 'ERROR' ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]' : 
            'border-purple-500/40 bg-purple-500/5'
          } group`}
        >
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(168,85,247,0.25)_50%)] bg-[length:100%_4px]" />
          
          <div className="relative flex-1 flex items-center">
            <span className="pl-4 pr-2 text-xs text-purple-500 font-bold animate-pulse">
              &gt;
            </span>
            <input 
              type="email" 
              value={email}
              disabled={status !== 'IDLE' && status !== 'ERROR'}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={status === 'SUCCESS' ? "NODE_REGISTERED" : "UPLINK_IDENTITY_EMAIL"}
              className="bg-transparent flex-1 py-5 text-sm outline-none placeholder:text-zinc-600 focus:placeholder-transparent transition-all disabled:opacity-50 text-white font-medium"
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'PROCESSING'}
            className={`relative px-10 py-5 text-xs font-black tracking-[0.25em] transition-all border-l-2 border-purple-500/40 ${
              status === 'PROCESSING' ? 'bg-zinc-800 animate-pulse cursor-wait' :
              status === 'SUCCESS' ? 'bg-green-600 text-white border-green-500' :
              status === 'ERROR' ? 'bg-red-900/50 text-white border-red-500' :
              'bg-purple-600 hover:bg-purple-400 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]'
            }`}
          >
            {status === 'IDLE' ? 'SECURE_ACCESS' : status}
          </button>
        </form>

        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
            <span className="text-[9px] text-zinc-500 tracking-tighter font-bold uppercase">94%_CAPACITY_REACHED</span>
          </div>
          <span className="text-[9px] text-purple-400/60 font-mono italic font-bold">PRIORITY_QUEUE_ACTIVE</span>
        </div>
      </div>

      <div className="flex justify-center gap-8 text-[9px] text-zinc-600 tracking-widest uppercase pt-12 font-bold">
        <span>[GURGAON]</span>
        <span>[BANGALORE]</span>
        <span>[MUMBAI]</span>
      </div>
    </section>
  );
};

export default Hero;
