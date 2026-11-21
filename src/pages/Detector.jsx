import React, { useState } from 'react';
import MessageInput from '../components/MessageInput.jsx';
import RiskGauge from '../components/RiskGauge.jsx';
import HighlightedMessage from '../components/HighlightedMessage.jsx';
import UrlDeconstructor from '../components/UrlDeconstructor.jsx';
import TacticsList from '../components/TacticsList.jsx';
import SafetyChecklist from '../components/SafetyChecklist.jsx';
import { analyzeScamMessage } from '../utils/scamAnalyzer.js';
import { ShieldCheck, Info, AlertCircle, BookOpen, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Detector({ onNavigateToLesson }) {
  // Starts with an empty input screen by default per specification
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (textToAnalyze) => {
    const text = (textToAnalyze || '').trim();
    if (!text) {
      setAnalysis(null);
      return;
    }
    setIsAnalyzing(true);
    // Execute fast synchronous offline analysis
    setTimeout(() => {
      const result = analyzeScamMessage(text);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 50);
  };

  const handleSelectPreset = (preset) => {
    setMessage(preset.text);
    handleAnalyze(preset.text);
  };

  const handleReset = () => {
    setMessage('');
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#092B49] font-sans">
              Scam Detection Centre
            </h1>
            <p className="text-xs sm:text-sm text-[#52667A] mt-1">
              Inspect suspicious SMS, WhatsApp messages, emails, or links using our offline heuristic threat engine.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Client-Side / Zero Data Transmitted</span>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <section aria-label="Message Input Section">
        <MessageInput
          message={message}
          setMessage={setMessage}
          onAnalyze={handleAnalyze}
          onSelectPreset={handleSelectPreset}
          isAnalyzing={isAnalyzing}
        />
      </section>

      {/* Results View */}
      {analysis && (
        <section aria-label="Analysis Report" className="space-y-6 animate-fadeIn">
          {/* Risk Gauge & Summary */}
          <RiskGauge analysis={analysis} />

          {/* Educational Bridge: Understand This Scam Card */}
          {analysis.recommendedLesson && (analysis.score >= 25) && (
            <div className="bg-gradient-to-r from-[#123B64] to-[#092B49] rounded-xl text-white p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 text-white text-[11px] font-bold tracking-wider uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-[#0B5CAD]" />
                  <span>Academy Educational Module Available</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Understand How This Scam Operates: {analysis.recommendedLesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {analysis.recommendedLesson.reason} Learn how cyber syndicates orchestrate this attack, the psychological triggers they exploit, and how to protect yourself.
                </p>
              </div>

              {onNavigateToLesson && (
                <button
                  type="button"
                  onClick={() => onNavigateToLesson(analysis.recommendedLesson.id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B5CAD] hover:bg-[#094c8f] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex-shrink-0"
                >
                  <span>Open Full Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Interactive Red Flag Highlighting */}
          <HighlightedMessage
            message={message}
            matchedPhrases={analysis.matchedPhrases}
          />

          {/* Link Deconstructor (shows when links exist) */}
          {analysis.urls.length > 0 && (
            <UrlDeconstructor urls={analysis.urls} />
          )}

          {/* Detected Threat Vectors and Safety Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TacticsList tactics={analysis.tactics} />
            <SafetyChecklist
              analysis={analysis}
              onReset={handleReset}
            />
          </div>

          {/* Analytical Transparency Disclaimer */}
          <div className="p-4 rounded-lg bg-[#EBF2F9] border border-[#CBD5E1] text-xs text-[#52667A] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#0B5CAD] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Heuristic Evaluation Notice:</strong> ScamShield evaluates structural, grammatical, and pattern indicators completely in your local browser memory. Heuristic inspection cannot guarantee 100% detection of zero-day attacks or verify the ultimate authenticity of messages. Never share passwords, OTPs, or financial details over unverified communications.
            </p>
          </div>
        </section>
      )}

      {/* Empty State Help Card */}
      {!analysis && !message && (
        <div className="p-8 rounded-xl bg-white border border-[#DCE4EC] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF2F9] text-[#0B5CAD] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#092B49]">
            Ready to Inspect Suspicious Messages
          </h3>
          <p className="text-xs sm:text-sm text-[#52667A] max-w-md mx-auto">
            Paste any unverified SMS, WhatsApp message, email excerpt, or URL into the box above, or choose an educational test case to observe the detection engine in action.
          </p>
        </div>
      )}
    </div>
  );
}
