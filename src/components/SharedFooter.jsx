import React from 'react';
import { Shield, PhoneCall, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';

export default function SharedFooter({ setActiveTab }) {
  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#092B49] text-white border-t border-[#123B64] mt-16 font-sans">
      {/* Subtle Restrained Tricolor Accent Line */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#E07A1A]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#15803D]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Identity & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#123B64] border border-[#0B5CAD] flex items-center justify-center text-white">
                <Shield className="w-5 h-5 text-[#E07A1A]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Scam<span className="text-[#0B5CAD]">Shield</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detect. Understand. Stay Protected.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              An independent cybersecurity platform providing suspicious message analysis, defensive awareness education, and credible global fraud intelligence.
            </p>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-700/80 pb-1.5">
              Core Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button type="button" onClick={() => handleLinkClick('detector')} className="hover:text-white transition-colors">
                  Detect a Scam
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('url-checker')} className="hover:text-white transition-colors">
                  URL Security Checker
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('academy')} className="hover:text-white transition-colors">
                  ScamShield Academy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('intelligence')} className="hover:text-white transition-colors">
                  Global Scam Intelligence
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('safety-guide')} className="hover:text-white transition-colors">
                  Cyber Safety Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-700/80 pb-1.5">
              Trust & Transparency
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button type="button" onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors">
                  About the Project
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors">
                  Privacy Policy & Local Execution
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors">
                  Heuristic Methodology Disclaimer
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium pt-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero Data Stored or Transmitted</span>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleLinkClick('admin')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Authorized Operations (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Emergency Cyber Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-700/80 pb-1.5">
              Indian Cybercrime Reporting
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="text-slate-400">
                Suspect you have been a victim of digital financial fraud?
              </p>
              <a
                href="tel:1930"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/80 border border-red-800 text-white font-semibold hover:bg-red-900 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-[11px] text-red-200">National Helpline (Toll-Free)</div>
                  <div className="text-base font-bold">1930</div>
                </div>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory Independence & Public Service Disclaimer */}
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <p className="font-semibold text-slate-300">
            Official Public Notice:
          </p>
          <p className="leading-relaxed">
            ScamShield is an independent educational cybersecurity awareness and suspicious-message analysis project developed for PS01: ScamShield. It is <strong>not an official government service</strong> and is <strong>not affiliated with any government department or police authority</strong>. ScamShield cannot directly freeze bank accounts, recover stolen funds, or file formal police complaints. If you have suffered financial loss, report immediately to your bank and dial <strong>1930</strong> or visit <strong>cybercrime.gov.in</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-[11px] text-slate-500 gap-2">
            <span>© 2026 ScamShield. Developed for PS01 National Innovation Competition.</span>
            <span>100% Offline Client-Side Heuristic Detection Engine.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
