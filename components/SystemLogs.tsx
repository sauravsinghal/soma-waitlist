
import React from 'react';
import { LogEntry } from '../types';

interface SystemLogsProps {
  logs: LogEntry[];
}

const SystemLogs: React.FC<SystemLogsProps> = ({ logs }) => {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="bg-zinc-800 text-zinc-500 text-[9px] px-1.5 py-0.5 font-bold">MODULE_01</span>
          <h3 className="text-sm font-bold tracking-widest uppercase">STATUS_QUO.LOG</h3>
        </div>
        <div className="space-y-4 text-[11px] font-medium tracking-wider">
          <div className="flex gap-4 items-center">
            <span className="text-red-500">[ERR]</span>
            <span className="text-zinc-400">FRAGMENTED_SENSOR_DATA</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-red-500">[ERR]</span>
            <span className="text-zinc-400">GENERIC_HEALTH_ADVICE</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-red-500">[ERR]</span>
            <span className="text-zinc-400">DECOUPLED_DAILY_RITUALS</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="bg-purple-900 text-purple-300 text-[9px] px-1.5 py-0.5 font-bold">MODULE_02</span>
          <h3 className="text-sm font-bold tracking-widest uppercase text-purple-500">SOMA_SYSTEM.RUN</h3>
        </div>
        <div className="space-y-3 h-[120px] overflow-hidden">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-4 items-start text-[10px] font-medium tracking-wider animate-in fade-in slide-in-from-left-2 duration-300">
              <span className={log.type === 'ERROR' ? 'text-red-500' : 'text-purple-500'}>
                [{log.type}]
              </span>
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[8px] uppercase">{log.module}_{log.timestamp}</span>
                <span className="text-zinc-200 uppercase">{log.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SystemLogs;
