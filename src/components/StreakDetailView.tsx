import React, { useState, useEffect, useMemo } from 'react';
import { Streak, StreakLog, MILESTONES } from '../types';
import { DB } from '../services/db';

interface StreakDetailViewProps {
  streak: Streak;
  onClose: () => void;
}

export const StreakDetailView: React.FC<StreakDetailViewProps> = ({ streak, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const logs = useMemo(() => DB.logs.getByStreak(streak.id), [streak.id]);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsRevealed(false);
    setTimeout(onClose, 600);
  };

  const stats = useMemo(() => {
    const totalActive = logs.length;
    const peakChain = streak.longestStreak;
    const currentChain = streak.currentStreakCount;
    return { totalActive, peakChain, currentChain };
  }, [logs, streak]);

  // Calendar logic
  const calendarData = useMemo(() => {
    const today = new Date();
    const months = [];
    const completionMap = new Set(logs.map(l => {
      const d = new Date(l.completedAt);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }));

    // Generate 12 months including the current one
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - (11 - i), 1);
      const monthLabel = d.toLocaleString('default', { month: 'short' });
      const year = d.getFullYear();
      const daysInMonth = new Date(year, d.getMonth() + 1, 0).getDate();
      
      const dayStates = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const checkDate = new Date(year, d.getMonth(), day);
        const timestamp = checkDate.getTime();
        const isCompleted = completionMap.has(timestamp);
        const isFuture = timestamp > today.getTime();
        const isToday = timestamp === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

        dayStates.push({ day, isCompleted, isFuture, isToday });
      }
      months.push({ label: monthLabel, year, dayStates });
    }
    return months;
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden flex items-center justify-center">
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />

      <div className={`absolute inset-y-0 left-0 w-1/2 bg-[#050505] border-r border-zinc-800 transition-transform duration-700 ease-in-out z-20 ${isRevealed ? '-translate-x-full' : 'translate-x-0'}`} />
      <div className={`absolute inset-y-0 right-0 w-1/2 bg-[#050505] border-l border-zinc-800 transition-transform duration-700 ease-in-out z-20 ${isRevealed ? 'translate-x-full' : 'translate-x-0'}`} />

      <div className={`relative w-full h-full bg-[#020202] overflow-y-auto no-scrollbar transition-opacity duration-500 delay-200 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
        <header className="sticky top-0 z-30 bg-[#020202]/90 backdrop-blur-xl border-b border-zinc-900/50 px-6 sm:px-12 py-8 flex items-center justify-between">
          <button 
            onClick={handleClose}
            className="group flex items-center gap-4 px-8 py-4 bg-zinc-900/30 border border-zinc-800 text-zinc-500 hover:bg-rose-600 hover:text-white transition-all duration-500"
          >
            <span className="text-xl font-black group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">EXIT_ANALYSIS</span>
          </button>
          
          <div className="text-right hidden sm:block">
            <span className={`px-4 py-1 border text-[10px] font-black uppercase tracking-widest ${
              streak.status === 'ACTIVE' ? 'border-emerald-900 text-emerald-500 bg-emerald-950/20' :
              streak.status === 'BROKEN' ? 'border-red-900 text-red-600 bg-red-950/20' :
              'border-yellow-600 text-yellow-500 bg-yellow-950/20'
            }`}>
              STATUS: {streak.status}
            </span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-20">
          <div className="mb-24 flex flex-col xl:flex-row justify-between items-start gap-12">
            <div className="flex-grow w-full xl:w-auto">
              <h1 className="text-7xl sm:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter italic leading-[0.85] text-white glitch-text" data-text={streak.name}>
                {streak.name}
              </h1>
              <div className="mt-8 flex items-center gap-6">
                 <div className="w-16 h-px bg-rose-600" />
                 <p className="text-zinc-500 font-black uppercase tracking-[0.6em] text-xs italic">{streak.task}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 w-full xl:w-[500px] shrink-0 overflow-hidden">
              <div className="bg-[#050505] p-6 sm:p-10 flex flex-col justify-center gap-2 aspect-square xl:aspect-auto">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">TOTAL_UP_TIME</span>
                <span className="text-4xl sm:text-6xl font-black italic text-emerald-500 leading-none">{stats.totalActive}D</span>
              </div>
              <div className="bg-[#050505] p-6 sm:p-10 flex flex-col justify-center gap-2 aspect-square xl:aspect-auto">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">PEAK_CHAIN</span>
                <span className="text-4xl sm:text-6xl font-black italic text-white leading-none">{stats.peakChain}D</span>
              </div>
              <div className="bg-[#050505] p-6 sm:p-10 flex flex-col justify-center gap-2 aspect-square xl:aspect-auto">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">CURRENT_CHAIN</span>
                <span className={`text-4xl sm:text-6xl font-black italic leading-none ${streak.status === 'BROKEN' ? 'text-red-900' : 'text-rose-600'}`}>
                  {stats.currentChain}D
                </span>
              </div>
              <div className="bg-[#050505] p-6 sm:p-10 flex flex-col justify-center gap-2 aspect-square xl:aspect-auto">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">CONTRACT_TARGET</span>
                <span className="text-4xl sm:text-6xl font-black italic text-zinc-800 leading-none">{streak.targetDays}D</span>
              </div>
            </div>
          </div>

          <section className="mt-32">
            <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-700 mb-12 flex items-center gap-8">
              CHRONO_MANIFESTO
              <div className="flex-grow h-px bg-zinc-900/50" />
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-16">
              {calendarData.map((month, mIdx) => (
                <div key={mIdx} className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-zinc-900 pb-2">
                    <span className="text-sm font-black text-white italic">{month.label}</span>
                    <span className="text-[9px] font-black text-zinc-700">{month.year}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {month.dayStates.map((day, dIdx) => (
                      <div 
                        key={dIdx}
                        title={`${month.label} ${day.day}, ${month.year}`}
                        className={`aspect-square w-full rounded-none transition-all duration-300 ${
                          day.isCompleted 
                            ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                            : day.isToday
                              ? 'border border-rose-600 animate-pulse bg-rose-600/10'
                              : day.isFuture
                                ? 'bg-zinc-900/20 border border-zinc-900/50'
                                : 'bg-zinc-900'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-40 border-t border-zinc-900 py-16 text-center">
            <p className="text-[10px] font-black uppercase tracking-[1em] text-zinc-800 mb-4">SYSTEM_PROTOCOL_LOCKED</p>
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest italic">
              "Every day not marked is a permanent scar on the timeline."
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
