
import React, { useState, useEffect } from 'react';
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

  // Simulate real-time fluctuations
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
        <Hero data={metabolicData} onLog={addLog} />
        
        <div className="grid md:grid-cols-2 gap-12">
          <SystemLogs logs={logs} />
        </div>

        <PersonnelClasses />
        
        <ExecutionCycle />

        <div className="flex justify-center pt-12">
           <button 
             onClick={() => setIsLiveActive(!isLiveActive)}
             className={`px-8 py-4 border-2 transition-all duration-300 tracking-[0.2em] font-bold text-sm ${
               isLiveActive 
               ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]' 
               : 'bg-transparent border-purple-500/50 text-purple-400 hover:border-purple-400 hover:text-purple-300'
             }`}
           >
             {isLiveActive ? 'TERMINATE_LIVE_SESSION' : 'INITIATE_LIVE_ADVISOR'}
           </button>
        </div>

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
