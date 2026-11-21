import React from 'react';
import { AlertTriangle, Package, Zap, Award, CreditCard, Briefcase, Gift, ShieldCheck, ClipboardPaste, RotateCcw, ScanSearch, Sparkles } from 'lucide-react';
import { PRESET_MESSAGES } from '../data/presets.js';

export default function MessageInput({
  message,
  setMessage,
  onAnalyze,
  onSelectPreset,
  isAnalyzing
}) {
  const charCount = message.length;

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setMessage(text);
          onAnalyze(text);
        }
      }
    } catch {
      // Fallback if browser permission is blocked
    }
  };

  const handleClear = () => {
    setMessage('');
    onAnalyze('');
  };

  const getPresetIcon = (iconName) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-600" />;
      case 'Package':
        return <Package className="w-3.5 h-3.5 text-red-600" />;
      case 'Zap':
        return <Zap className="w-3.5 h-3.5 text-red-600" />;
      case 'Award':
        return <Award className="w-3.5 h-3.5 text-red-600" />;
      case 'CreditCard':
        return <CreditCard className="w-3.5 h-3.5 text-red-600" />;
      case 'Briefcase':
        return <Briefcase className="w-3.5 h-3.5 text-amber-600" />;
      case 'Gift':
        return <Gift className="w-3.5 h-3.5 text-red-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm">
      {/* Educational Presets Selector */}
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0B5CAD]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B64]">
              Educational Demonstration Examples (1-Click Test):
            </h3>
          </div>
          <span className="text-[11px] text-[#52667A] font-medium">
            Clearly labeled demonstration scenarios to evaluate the offline heuristic engine
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_MESSAGES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="text-left p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF2F9] border border-[#E2E8F0] hover:border-[#0B5CAD] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#123B64] group-hover:text-[#0B5CAD] truncate">
                    {getPresetIcon(preset.icon)}
                    <span className="truncate">{preset.title}</span>
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      preset.tagColor === 'red'
                        ? 'bg-red-100 text-red-800'
                        : preset.tagColor === 'amber'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {preset.tag}
                  </span>
                </div>
                <p className="text-[11px] text-[#52667A] line-clamp-2 leading-relaxed">
                  "{preset.text}"
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea Input */}
      <div>
        <label htmlFor="message-textarea" className="block text-xs font-bold uppercase tracking-wider text-[#123B64] mb-1.5">
          Paste Message or Link to Inspect:
        </label>
        <textarea
          id="message-textarea"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious SMS, WhatsApp message forward, email text, or website link here to analyse..."
          className="w-full bg-[#F8FAFC] text-[#243447] rounded-lg border border-[#CBD5E1] p-4 text-sm focus:border-[#0B5CAD] focus:ring-1 focus:ring-[#0B5CAD] focus:outline-none transition-all placeholder:text-slate-400 font-sans"
        />

        {/* Action Controls Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white hover:bg-slate-50 text-[#123B64] border border-[#CBD5E1] transition-colors shadow-sm"
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-[#0B5CAD]" />
              <span>Paste from Clipboard</span>
            </button>

            {message && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white hover:bg-slate-50 text-[#52667A] border border-[#CBD5E1] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            <span className="text-xs text-[#52667A] font-medium ml-1">
              {charCount} character{charCount === 1 ? '' : 's'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAnalyze(message)}
            disabled={!message.trim() || isAnalyzing}
            className="flex items-center gap-2 px-6 py-2 rounded-md text-xs sm:text-sm font-bold bg-[#123B64] hover:bg-[#092B49] text-white transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ScanSearch className="w-4 h-4 text-[#E07A1A]" />
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyse Message'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
