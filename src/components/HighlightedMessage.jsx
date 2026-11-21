import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, HelpCircle } from 'lucide-react';

export default function HighlightedMessage({ message, matchedPhrases }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  if (!message) return null;

  if (!matchedPhrases || matchedPhrases.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#E2E8F0]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#123B64]">
            Message Text Analysis:
          </span>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            No Dangerous Threat Signatures Detected
          </span>
        </div>
        <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#243447] font-mono text-sm leading-relaxed whitespace-pre-wrap select-text">
          {message}
        </div>
      </div>
    );
  }

  // Segment message into regular text and highlighted tokens
  const segments = [];
  let currentIndex = 0;

  matchedPhrases.forEach((match, index) => {
    if (match.startIndex > currentIndex) {
      segments.push({
        type: 'text',
        content: message.slice(currentIndex, match.startIndex)
      });
    }

    segments.push({
      type: 'highlight',
      id: index,
      content: message.slice(match.startIndex, match.endIndex),
      data: match
    });

    currentIndex = match.endIndex;
  });

  if (currentIndex < message.length) {
    segments.push({
      type: 'text',
      content: message.slice(currentIndex)
    });
  }

  return (
    <div className="bg-white rounded-xl border border-[#DCE4EC] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B64]">
            Highlighted Suspicious Phrases & Link Spans:
          </h3>
        </div>
        <span className="text-[11px] text-[#52667A]">
          Hover or click highlighted sections to inspect specific warning reasons
        </span>
      </div>

      <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#243447] font-sans text-sm sm:text-base leading-relaxed relative">
        {segments.map((seg, idx) => {
          if (seg.type === 'text') {
            return <span key={idx}>{seg.content}</span>;
          }

          const isCritical = seg.data.severity === 'critical';
          const isSelected = activeTooltip === seg.id;

          return (
            <span
              key={idx}
              className="relative inline-block mx-0.5 cursor-pointer group"
              onClick={() => setActiveTooltip(isSelected ? null : seg.id)}
              onMouseEnter={() => setActiveTooltip(seg.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <mark
                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                  isCritical
                    ? 'bg-red-100 text-red-900 border-b-2 border-red-600 hover:bg-red-200'
                    : 'bg-amber-100 text-amber-900 border-b-2 border-amber-600 hover:bg-amber-200'
                }`}
              >
                {seg.content}
              </mark>

              {/* Tooltip Popover */}
              {isSelected && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 rounded-lg bg-[#092B49] text-white border border-[#123B64] shadow-xl text-left pointer-events-none animate-fadeIn">
                  <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-slate-700 pb-1">
                    <span className="text-xs font-bold text-[#E07A1A] flex items-center gap-1">
                      {isCritical ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      {seg.data.tactic || 'Suspicious Pattern'}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isCritical
                          ? 'bg-red-900 text-red-100'
                          : 'bg-amber-900 text-amber-100'
                      }`}
                    >
                      {seg.data.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {seg.data.reason}
                  </p>
                  <div className="w-2.5 h-2.5 bg-[#092B49] border-r border-b border-[#123B64] transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                </div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
