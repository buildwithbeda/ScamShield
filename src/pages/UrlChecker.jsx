import React, { useState } from 'react';
import { parseAndAnalyzeUrl } from '../utils/urlParser.js';
import { Globe, ShieldCheck, AlertTriangle, AlertCircle, Lock, Unlock, Link2, ExternalLink, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function UrlChecker() {
  const [urlInput, setUrlInput] = useState('');
  const [analyzedUrl, setAnalyzedUrl] = useState(null);

  const sampleUrls = [
    { label: 'Fake SBI Subdomain (.xyz)', url: 'http://sbi-kyc-update.support-verify.xyz/login' },
    { label: 'Obfuscated Bit.ly Link', url: 'https://bit.ly/indpost-track-help' },
    { label: 'Fake PM Yojana (.top)', url: 'http://pm-yojana-grant.claim-gov.top/apply' },
    { label: 'Official SBI Domain', url: 'https://onlinesbi.sbi' }
  ];

  const handleInspect = (urlToInspect) => {
    const raw = (urlToInspect || '').trim();
    if (!raw) {
      setAnalyzedUrl(null);
      return;
    }
    const result = parseAndAnalyzeUrl(raw);
    setAnalyzedUrl(result);
  };

  const handleSelectSample = (sampleUrl) => {
    setUrlInput(sampleUrl);
    handleInspect(sampleUrl);
  };

  const handleClear = () => {
    setUrlInput('');
    setAnalyzedUrl(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#092B49] font-sans">
              URL Security Checker
            </h1>
            <p className="text-xs sm:text-sm text-[#52667A] mt-1">
              Deconstruct web links into Protocol, Subdomain, Registered Domain Owner, and Top-Level Domain (TLD) to spot impersonation traps.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#123B64] border border-[#CBD5E1] text-xs font-semibold self-start sm:self-auto">
            <Globe className="w-4 h-4 text-[#0B5CAD]" />
            <span>Structural Link Anatomy</span>
          </div>
        </div>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm space-y-4">
        {/* Sample Links */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#123B64] block mb-2">
            Try a Sample URL:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleUrls.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(s.url)}
                className="px-2.5 py-1 rounded bg-[#F8FAFC] hover:bg-[#EBF2F9] border border-[#CBD5E1] hover:border-[#0B5CAD] text-xs font-medium text-[#123B64] transition-all"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste a full URL or naked domain (e.g. sbi-kyc-verify.xyz, bit.ly/track)..."
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-4 py-2.5 text-sm font-mono focus:border-[#0B5CAD] focus:ring-1 focus:ring-[#0B5CAD] focus:outline-none"
            />
            {urlInput && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleInspect(urlInput)}
            disabled={!urlInput.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-bold bg-[#123B64] hover:bg-[#092B49] text-white transition-all shadow-sm disabled:opacity-40"
          >
            Inspect URL
          </button>
        </div>
      </div>

      {/* URL Inspection Report */}
      {analyzedUrl && (
        <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm space-y-6 animate-fadeIn">
          {/* Assessment Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#52667A]">
                Structural Assessment:
              </span>
              <div className="text-lg font-bold text-[#092B49] mt-0.5">
                {analyzedUrl.assessment}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#52667A] font-mono select-all truncate max-w-sm">
                {analyzedUrl.rawUrl}
              </span>
            </div>
          </div>

          {/* Segment Deconstruction Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Protocol */}
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs font-bold uppercase text-[#52667A] mb-1 flex items-center justify-between">
                <span>Protocol</span>
                {analyzedUrl.protocol === 'https' ? (
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-red-600" />
                )}
              </div>
              <div className="font-mono text-sm font-bold text-[#123B64]">
                {analyzedUrl.protocol.toUpperCase()}
              </div>
              <p className="text-[11px] text-[#52667A] mt-1">
                {analyzedUrl.protocol === 'https'
                  ? 'TLS/SSL Encrypted (Note: Scammers can also use HTTPS)'
                  : 'Unencrypted plaintext (Plain HTTP - High Risk)'}
              </p>
            </div>

            {/* Subdomain */}
            <div className={`p-4 rounded-lg border ${
              analyzedUrl.brandSpoofing?.isSpoofed
                ? 'bg-red-50 border-red-300'
                : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}>
              <div className="text-xs font-bold uppercase text-[#52667A] mb-1">
                Subdomain Prefix
              </div>
              <div className="font-mono text-sm font-bold text-[#092B49] truncate">
                {analyzedUrl.subdomain || '(None / Root Host)'}
              </div>
              <p className="text-[11px] text-[#52667A] mt-1">
                {analyzedUrl.brandSpoofing?.isSpoofed
                  ? `Deceptively impersonates "${analyzedUrl.brandSpoofing.brand}" in the subdomain prefix.`
                  : 'Standard host prefix.'}
              </p>
            </div>

            {/* Root Domain */}
            <div className="p-4 rounded-lg bg-[#EBF2F9] border border-[#0B5CAD]">
              <div className="text-xs font-bold uppercase text-[#123B64] mb-1">
                Registered Domain Owner
              </div>
              <div className="font-mono text-base font-extrabold text-[#092B49] truncate">
                {analyzedUrl.rootDomain}
              </div>
              <p className="text-[11px] text-[#52667A] mt-1">
                This is the actual registered entity controlling the website.
              </p>
            </div>

            {/* TLD */}
            <div className={`p-4 rounded-lg border ${
              analyzedUrl.isRiskyTld
                ? 'bg-amber-50 border-amber-300'
                : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}>
              <div className="text-xs font-bold uppercase text-[#52667A] mb-1">
                Top-Level Domain (TLD)
              </div>
              <div className="font-mono text-sm font-bold text-[#092B49]">
                {analyzedUrl.tld || '(Unknown)'}
              </div>
              <p className="text-[11px] text-[#52667A] mt-1">
                {analyzedUrl.isRiskyTld
                  ? 'Abuse-prone disposable extension often favored by phishing kits.'
                  : 'Standard generic / national top-level domain.'}
              </p>
            </div>
          </div>

          {/* Path */}
          {analyzedUrl.path && analyzedUrl.path !== '/' && (
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono">
              <span className="text-[#52667A] font-bold">Target Resource Path: </span>
              <span className="text-[#092B49]">{analyzedUrl.path}</span>
            </div>
          )}

          {/* Security Flags Detected */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B64] mb-2">
              Structural Risk Flags ({analyzedUrl.flags.length}):
            </h3>
            {analyzedUrl.flags.length === 0 ? (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No anomalous structural markers (shorteners, raw IPs, or lookalike subdomains) detected.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {analyzedUrl.flags.map((flag, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs ${
                      flag.severity === 'critical'
                        ? 'bg-red-50 border-red-200 text-red-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">{flag.label}</strong>
                      <span className="leading-relaxed">{flag.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Advisory Notice */}
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#52667A] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#0B5CAD] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Important Advisory:</strong> ScamShield performs structural and pattern inspection completely offline. It never resolves remote DNS, visits live servers, or executes scripts from untrusted links. An encrypted connection (HTTPS) does not prove that a website is genuine or safe.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
