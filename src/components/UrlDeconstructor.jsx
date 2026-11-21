import React from 'react';
import { Globe, ShieldAlert, AlertTriangle, Lock, Unlock, Link2, AlertCircle } from 'lucide-react';

export default function UrlDeconstructor({ urls }) {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#0B5CAD]" />
          <h3 className="text-sm font-bold tracking-wide text-[#092B49] uppercase font-sans">
            URL Structural Inspection ({urls.length} Link{urls.length === 1 ? '' : 's'})
          </h3>
        </div>
        <span className="text-xs text-[#52667A]">
          Subdomain Spoofing, TLD Risk & Host Deconstruction
        </span>
      </div>

      <div className="space-y-4">
        {urls.map((urlInfo, idx) => {
          const isHttps = urlInfo.protocol === 'https';

          return (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] flex flex-col gap-3"
            >
              {/* Full Raw URL display */}
              <div className="flex items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2.5">
                <span className="text-xs font-mono text-[#0B5CAD] truncate select-all flex items-center gap-1.5 font-semibold">
                  <Link2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  {urlInfo.rawUrl}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E2E8F0] text-[#1E293B] font-bold flex-shrink-0">
                  {urlInfo.protocol.toUpperCase()}
                </span>
              </div>

              {/* Anatomy Pills Breakdown */}
              <div>
                <p className="text-[11px] font-bold text-[#123B64] uppercase tracking-wider mb-2">
                  Structural Host Deconstruction:
                </p>
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                  {/* Protocol */}
                  <div
                    className={`px-2.5 py-1 rounded border flex items-center gap-1 font-semibold ${
                      isHttps
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-red-50 text-red-800 border-red-300'
                    }`}
                    title={isHttps ? 'Encrypted connection' : 'Plaintext unencrypted connection'}
                  >
                    {isHttps ? <Lock className="w-3 h-3 text-emerald-600" /> : <Unlock className="w-3 h-3 text-red-600" />}
                    <span>{urlInfo.protocol}://</span>
                  </div>

                  {/* Subdomain (Where spoofers put brand names) */}
                  {urlInfo.subdomain && (
                    <div
                      className={`px-2.5 py-1 rounded border flex items-center gap-1 ${
                        urlInfo.brandSpoofing?.isSpoofed
                          ? 'bg-red-100 text-red-900 border-red-400 font-bold'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                      title={
                        urlInfo.brandSpoofing?.isSpoofed
                          ? 'Deceptive Subdomain masquerading as an official brand!'
                          : 'Subdomain prefix'
                      }
                    >
                      <span>{urlInfo.subdomain}</span>
                      <span className="text-slate-400">.</span>
                    </div>
                  )}

                  {/* True Root Domain */}
                  <div
                    className="px-3 py-1 rounded bg-[#123B64] text-white border border-[#092B49] font-bold flex items-center gap-1 shadow-sm"
                    title="This is the true destination registered domain owner!"
                  >
                    <span className="text-slate-300 text-[10px] font-normal uppercase">Actual Owner:</span>
                    <span>{urlInfo.domainName || urlInfo.rootDomain}</span>
                  </div>

                  {/* TLD */}
                  <div
                    className={`px-2.5 py-1 rounded border font-semibold ${
                      urlInfo.isRiskyTld
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                    title={urlInfo.isRiskyTld ? 'High-risk disposable TLD' : 'Top Level Domain'}
                  >
                    <span>{urlInfo.tld}</span>
                  </div>

                  {/* Path */}
                  {urlInfo.path && urlInfo.path !== '/' && (
                    <div className="px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-300 text-[11px] truncate max-w-xs">
                      <span>{urlInfo.path}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Warnings for URL */}
              {urlInfo.flags && urlInfo.flags.length > 0 && (
                <div className="mt-1 space-y-1.5">
                  {urlInfo.flags.map((flag, fIdx) => (
                    <div
                      key={fIdx}
                      className={`p-2.5 rounded-md border flex items-start gap-2 text-xs ${
                        flag.severity === 'critical'
                          ? 'bg-red-50 border-red-200 text-red-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block">{flag.label}</strong>
                        <span className="leading-relaxed">{flag.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Notice regarding URLs */}
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-2 text-xs text-[#52667A]">
        <AlertCircle className="w-4 h-4 text-[#0B5CAD] flex-shrink-0" />
        <span>
          <strong>Security Note:</strong> Local structural analysis inspects protocol, domain hierarchy, and known risk indicators. It cannot determine live web server reputation. ScamShield never automatically visits or opens suspicious links.
        </span>
      </div>
    </div>
  );
}
