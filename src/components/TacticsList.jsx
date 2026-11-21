import React from 'react';
import { ShieldAlert, AlertTriangle, Clock, Key, Globe, ExternalLink, Unlock, Server, PhoneCall } from 'lucide-react';

export default function TacticsList({ tactics }) {
  if (!tactics || tactics.length === 0) return null;

  const getTacticIcon = (iconName) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'Key':
        return <Key className="w-4 h-4 text-red-600" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-red-600" />;
      case 'ExternalLink':
        return <ExternalLink className="w-4 h-4 text-amber-600" />;
      case 'Unlock':
        return <Unlock className="w-4 h-4 text-amber-600" />;
      case 'Server':
        return <Server className="w-4 h-4 text-red-600" />;
      case 'PhoneCall':
        return <PhoneCall className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#0B5CAD]" />
          <h3 className="text-sm font-bold tracking-wide text-[#092B49] uppercase font-sans">
            Detected Threat Vectors ({tactics.length})
          </h3>
        </div>
        <span className="text-xs text-[#52667A]">
          Heuristic Pattern & Risk Breakdown
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {tactics.map((tactic) => {
          const isCritical = tactic.severity === 'critical';

          return (
            <div
              key={tactic.id}
              className={`p-4 rounded-lg border transition-all ${
                isCritical
                  ? 'bg-red-50/40 border-red-200'
                  : 'bg-amber-50/40 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#092B49]">
                  {getTacticIcon(tactic.icon)}
                  <span>{tactic.title}</span>
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isCritical
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isCritical ? 'Critical Threat' : 'Suspicious Indicator'}
                </span>
              </div>
              <p className="text-xs text-[#52667A] leading-relaxed">
                {tactic.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
