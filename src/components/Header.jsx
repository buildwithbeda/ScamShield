import React from 'react';
import { ShieldAlert, ShieldCheck, HeartHandshake, WifiOff, Zap } from 'lucide-react';

export default function Header({ simpleMode, setSimpleMode }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0B1120] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                Scam<span className="text-cyan-400">Shield</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Instant SMS, WhatsApp & Link Scam Detector
            </p>
          </div>
        </div>

        {/* Status Indicators & Elder Mode Toggle */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Offline Shield Active Pill */}
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-sm"
            title="All heuristic scoring runs 100% locally in your browser. Zero data leaves your device."
          >
            <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Instant</span>
            <span className="text-emerald-400 font-semibold">Offline Shield Active</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </div>

          {/* Elder-Friendly Simple Mode Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={simpleMode}
            onClick={() => setSimpleMode(!simpleMode)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              simpleMode
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
            }`}
          >
            <HeartHandshake className={`w-4 h-4 ${simpleMode ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Elder-Friendly Mode</span>
            <div
              className={`w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
                simpleMode ? 'bg-amber-500' : 'bg-slate-600'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white transition-transform ${
                  simpleMode ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
