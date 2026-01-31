
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SystemLogs from './components/SystemLogs';
import PersonnelClasses from './components/PersonnelClasses';
import ExecutionCycle from './components/ExecutionCycle';
import Footer from './components/Footer';
import LiveAdvisor from './components/LiveAdvisor';
import { MetabolicState, LogEntry } from './types';

const App: React.FC = () => {
  const [metabolicData, setMetabolicData] = useState<MetabolicState>({
    coreTemp: 36.5,
    glucoseLevel: 94,
    heartRate: 62,
    neuralLoad: 24,
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', type: 'OK', module: 'CORE', message: 'UNIFIED_METABOLIC_HUB', timestamp: '0.00ms' },
    { id: '2', type: 'OK', module: 'AI', message: 'PREDICTIVE_STRATEGY_ACTIVE', timestamp: '1.20ms' },
    { id: '3', type: 'OK', module: 'SYNC', message: 'ROUTINE_CALIBRATION_COMPLETE', timestamp: '2.45ms' },
  ]);

  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio with the source mentioned in the chatbox
  useEffect(() => {
    const audio = new Audio('https://cdn.pixabay.com/audio/2026/01/27/audio_5945848d7b.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isAudioOn) {
      audioRef.current.pause();
      setIsAudioOn(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsAudioOn(true);
        })
        .catch(error => {
          console.error("Audio playback failed:", error);
          // Fallback refresh
          audioRef.current?.load();
          audioRef.current?.play().then(() => setIsAudioOn(true));
        });
    }
  };

  const addLog = (type: 'ERROR' | 'OK' | 'INFO', module: string, message: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      module,
      message,
      timestamp: `${(Math.random() * 5).toFixed(2)}ms`
    };
    setLogs(prev => [newLog, ...prev].slice(0, 10));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetabolicData(prev => ({
        coreTemp: parseFloat((36.5 + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        glucoseLevel: Math.floor(92 + Math.random() * 5),
        heartRate: Math.floor(60 + Math.random() * 8),
        neuralLoad: Math.floor(20 + Math.random() * 15),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen grid-bg selection:bg-purple-500 selection:text-white pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        <Hero 
          data={metabolicData} 
          onLog={addLog} 
          isLiveActive={isLiveActive} 
          onToggleLive={() => setIsLiveActive(!isLiveActive)}
          isAudioOn={isAudioOn}
          onToggleAudio={toggleAudio}
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          <SystemLogs logs={logs} />
        </div>

        <PersonnelClasses />
        
        <ExecutionCycle />

        {isLiveActive && (
          <div className="fixed bottom-8 right-8 z-50">
            <LiveAdvisor />
          </div>
        )}

        <Footer />
      </main>

      {/* Decorative side bars */}
      <div className="fixed left-0 top-0 h-full w-1 bg-purple-900/20" />
      <div className="fixed right-0 top-0 h-full w-1 bg-purple-900/20" />
    </div>
  );
};

export default App;
