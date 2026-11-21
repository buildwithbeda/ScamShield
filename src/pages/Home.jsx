import React from 'react';
import { Shield, Search, BookOpen, Globe, Lock, PhoneCall, AlertTriangle, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function Home({ setActiveTab, language }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-[#DCE4EC] p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EBF2F9] rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs font-bold border border-[#CBD5E1]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Independent Public-Service Cybersecurity Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#092B49] tracking-tight leading-tight font-sans">
            Think Before You Click. <br />
            <span className="text-[#0B5CAD]">Check Before You Trust.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#52667A] leading-relaxed font-sans">
            Received a suspicious SMS, WhatsApp message or link? Analyse its warning signs, learn how digital scams operate and understand the risks before taking action.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('detector')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-[#123B64] hover:bg-[#092B49] text-white transition-all shadow-sm"
            >
              <Search className="w-4 h-4 text-[#E07A1A]" />
              <span>Check a Suspicious Message</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('academy')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-white hover:bg-slate-50 text-[#123B64] border border-[#CBD5E1] transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-[#0B5CAD]" />
              <span>Explore ScamShield Academy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('intelligence')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-[#F8FAFC] hover:bg-[#EBF2F9] text-[#092B49] border border-[#DCE4EC] transition-all"
            >
              <Globe className="w-4 h-4 text-[#15803D]" />
              <span>Global Scam Intelligence</span>
            </button>
          </div>

          {/* Privacy Guarantee Banner */}
          <div className="pt-4 flex items-center gap-2 text-xs text-[#52667A]">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Privacy First:</strong> Message analysis runs 100% locally in your browser memory. No messages are stored, transmitted to cloud AI, or retained.
            </span>
          </div>
        </div>
      </section>

      {/* Three Major Platform Pillars */}
      <section aria-label="Core Capabilities">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-[#092B49]">
            Three Pillars of Digital Safety
          </h2>
          <p className="text-sm text-[#52667A] mt-1.5">
            A comprehensive approach uniting automated heuristic detection, defensive citizen education, and transparent fraud intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm flex flex-col justify-between hover:border-[#0B5CAD] transition-all">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#EBF2F9] border border-[#BCCAD8] flex items-center justify-center text-[#123B64] mb-4">
                <Search className="w-6 h-6 text-[#0B5CAD]" />
              </div>
              <h3 className="text-lg font-bold text-[#092B49] mb-2">
                Intelligent Message Analysis
              </h3>
              <p className="text-xs sm:text-sm text-[#52667A] leading-relaxed mb-4">
                Deterministic rule-based inspection of SMS, WhatsApp, and email text. Identifies lookalike links, urgency coercion, fake KYC demands, and unverified support numbers in under 10ms.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('detector')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5CAD] hover:text-[#123B64] pt-2"
            >
              <span>Analyse a message now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm flex flex-col justify-between hover:border-[#0B5CAD] transition-all">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FEF3E7] border border-[#FDE68A] flex items-center justify-center text-[#E07A1A] mb-4">
                <BookOpen className="w-6 h-6 text-[#E07A1A]" />
              </div>
              <h3 className="text-lg font-bold text-[#092B49] mb-2">
                ScamShield Academy
              </h3>
              <p className="text-xs sm:text-sm text-[#52667A] leading-relaxed mb-4">
                Comprehensive, practical cybersecurity education for senior citizens, students, and digital consumers. Detailed lessons, defensive flows, interactive quizzes, and scam comparison guides.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('academy')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5CAD] hover:text-[#123B64] pt-2"
            >
              <span>Explore lessons & quizzes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm flex flex-col justify-between hover:border-[#0B5CAD] transition-all">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#15803D] mb-4">
                <Globe className="w-6 h-6 text-[#15803D]" />
              </div>
              <h3 className="text-lg font-bold text-[#092B49] mb-2">
                Global Scam Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-[#52667A] leading-relaxed mb-4">
                Credible, officially reported cybercrime statistics and public advisories from CERT-In, I4C, RBI, INTERPOL, and FBI IC3. Interactive world map, category distribution, and historical trends.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('intelligence')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5CAD] hover:text-[#123B64] pt-2"
            >
              <span>View intelligence dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Cyber Support Alert Section */}
      <section className="bg-white rounded-xl border-l-4 border-l-red-600 border border-[#DCE4EC] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-600" />
              <h3 className="text-base font-bold text-[#092B49]">
                Suspect You Have Been a Victim of Cyber Fraud?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#52667A]">
              Act immediately during the "Golden Hour". Dial the National Cyber Crime Helpline at <strong>1930</strong> or file an official complaint at <strong>cybercrime.gov.in</strong>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:1930"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Call 1930 Helpline
            </a>
            <button
              type="button"
              onClick={() => setActiveTab('safety-guide')}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#123B64] transition-colors"
            >
              What to Do Checklist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
