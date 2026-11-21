import React, { useState } from 'react';
import { CREDIBLE_SOURCES } from '../intelligence/sourcesData.js';
import { COUNTRY_PROFILES } from '../intelligence/countryProfiles.js';
import { RECENT_ADVISORIES } from '../intelligence/advisoriesData.js';
import { HISTORICAL_TRENDS, CATEGORY_DISTRIBUTION } from '../intelligence/historicalData.js';
import { Globe, ShieldAlert, AlertTriangle, Building2, Calendar, ExternalLink, Filter, TrendingUp, Info, MapPin, Database } from 'lucide-react';

export default function GlobalIntelligence() {
  const [selectedCountryCode, setSelectedCountryCode] = useState('IND');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [advisorySearch, setAdvisorySearch] = useState('');

  const currentProfile = COUNTRY_PROFILES[selectedCountryCode] || COUNTRY_PROFILES['IND'];

  const filteredAdvisories = RECENT_ADVISORIES.filter((adv) => {
    const matchesCategory = selectedCategoryFilter === 'All' || adv.category.includes(selectedCategoryFilter);
    const matchesSearch =
      adv.title.toLowerCase().includes(advisorySearch.toLowerCase()) ||
      adv.summary.toLowerCase().includes(advisorySearch.toLowerCase()) ||
      adv.country.toLowerCase().includes(advisorySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Dashboard Header */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs font-bold border border-[#CBD5E1]">
            <Globe className="w-3.5 h-3.5 text-[#0B5CAD]" />
            <span>Publicly Sourced Cybercrime Datasets</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#092B49] tracking-tight">
            Global Scam Intelligence
          </h1>

          <p className="text-sm sm:text-base text-[#52667A] leading-relaxed">
            Understand Where Scams Are Reported, How They Change and Who They Affect.
          </p>

          <p className="text-xs text-[#52667A]">
            Aggregated exclusively from official annual reports and public advisories published by national law enforcement agencies, cyber emergency teams, and central banks.
          </p>
        </div>
      </div>

      {/* Mandatory Regulatory / Intelligence Disclaimer */}
      <div className="p-4 rounded-xl bg-[#EBF2F9] border border-[#CBD5E1] text-xs text-[#243447] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#0B5CAD] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block text-[#092B49] font-bold mb-0.5">
            Global Scam Intelligence Disclaimer:
          </strong>
          Global Scam Intelligence presents information from publicly available reports and advisories. Reporting coverage, definitions and data collection methods vary between countries and organisations. The information does not represent every scam that has occurred, and reported figures should not be interpreted as the total number of actual incidents.
        </div>
      </div>

      {/* SPECIAL SECTION: INDIA CYBER FRAUD OVERVIEW */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#E07A1A]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#092B49]">
              India Cyber Fraud Overview (Official Published Data)
            </h2>
          </div>
          <span className="text-xs text-[#123B64] font-semibold bg-[#EBF2F9] px-3 py-1 rounded-md border border-[#CBD5E1]">
            Source: I4C / Ministry of Home Affairs (MHA)
          </span>
        </div>

        {/* India Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold uppercase text-[#52667A]">
              Reported Portal Complaints
            </span>
            <div className="text-2xl font-extrabold text-[#092B49] font-mono">
              1,556,000+
            </div>
            <p className="text-[11px] text-[#52667A]">
              Registered on National Cyber Crime Reporting Portal (2023)
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold uppercase text-[#52667A]">
              Financial Crime Share
            </span>
            <div className="text-2xl font-extrabold text-red-700 font-mono">
              ~73%
            </div>
            <p className="text-[11px] text-[#52667A]">
              Of all digital complaints relate to financial cyber fraud
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold uppercase text-[#52667A]">
              Stolen Funds Saved
            </span>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono">
              ₹1,200+ Cr
            </div>
            <p className="text-[11px] text-[#52667A]">
              Frozen in real-time via 1930 Helpline / CFCFRMS
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold uppercase text-[#52667A]">
              Dominant Vector
            </span>
            <div className="text-lg font-bold text-[#123B64]">
              SMS & WhatsApp
            </div>
            <p className="text-[11px] text-[#52667A]">
              Responsible for over 60% of initial scam engagements
            </p>
          </div>
        </div>

        <p className="text-xs text-[#52667A] leading-relaxed">
          * Note: In India, citizen complaints are intake-processed through the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS). Registered police FIRs under the Information Technology Act represent a subset of total portal entries.
        </p>
      </section>

      {/* SECTION 2: COUNTRY-WISE INTELLIGENCE & INTERACTIVE EXPLORER */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#092B49]">
              Country-Wise Officially Reported Profiles
            </h2>
            <p className="text-xs text-[#52667A] mt-0.5">
              Select a country to view official publications, reporting agencies, and verified victim metrics.
            </p>
          </div>

          {/* Country Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(COUNTRY_PROFILES).map((code) => {
              const country = COUNTRY_PROFILES[code];
              const isSelected = selectedCountryCode === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setSelectedCountryCode(code)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#123B64] text-white shadow-sm'
                      : 'bg-[#F8FAFC] text-[#52667A] hover:bg-slate-200'
                  }`}
                >
                  {country.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Country Profile Card */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0B5CAD]" />
                <h3 className="text-base font-bold text-[#092B49]">
                  {currentProfile.name} ({currentProfile.region})
                </h3>
              </div>
              <p className="text-xs text-[#52667A] mt-0.5">
                Reporting Period: <strong>{currentProfile.reportingPeriod}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-[#123B64]">
                {currentProfile.statusLabel}
              </span>
              <a
                href={currentProfile.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-bold text-[#0B5CAD] hover:underline"
              >
                <span>Official Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Metrics Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-lg bg-white border border-[#CBD5E1] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#52667A]">Reported Volume</span>
              <p className="text-xs font-semibold text-[#092B49] leading-snug">
                {currentProfile.metrics.reportedComplaints}
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-[#CBD5E1] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#52667A]">Reported Financial Loss</span>
              <p className="text-xs font-semibold text-[#092B49] leading-snug">
                {currentProfile.metrics.financialShare}
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-[#CBD5E1] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#52667A]">Enforcement Action</span>
              <p className="text-xs font-semibold text-[#092B49] leading-snug">
                {currentProfile.metrics.fundsFrozen}
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-[#CBD5E1] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#52667A]">Primary Contact Channel</span>
              <p className="text-xs font-semibold text-[#092B49] leading-snug">
                {currentProfile.metrics.topContactVector}
              </p>
            </div>
          </div>

          {/* Top Reported Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123B64] mb-3">
              Top Reported Fraud Categories in {currentProfile.name}:
            </h4>
            <div className="space-y-2">
              {currentProfile.topCategories.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                  <span className="font-semibold text-[#092B49]">{cat.name}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-500">{cat.count}</span>
                    <span className="px-2 py-0.5 rounded bg-[#EBF2F9] text-[#123B64] font-bold">{cat.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Published Advisories in this jurisdiction */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123B64] mb-2">
              Active Official Advisories:
            </h4>
            <ul className="space-y-1.5 text-xs text-[#52667A]">
              {currentProfile.advisories.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0B5CAD] font-bold">•</span>
                  <span className="leading-relaxed">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: SCAM CATEGORY DISTRIBUTION (AGGREGATED ESTIMATE) */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-[#E2E8F0] pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#092B49]">
            Reported Scam Category Distribution
          </h2>
          <p className="text-xs text-[#52667A] mt-0.5">
            Relative proportion of consumer digital fraud complaints based on cross-jurisdiction annual reporting.
          </p>
        </div>

        <div className="space-y-3">
          {CATEGORY_DISTRIBUTION.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#092B49]">{item.category}</span>
                <span className="font-mono font-bold text-[#123B64]">{item.share}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.share}%`, backgroundColor: item.color }}
                />
              </div>
              <p className="text-[11px] text-[#52667A]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: RECENT SCAM REPORTS & ADVISORIES FEED */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#092B49]">
              Recent Scam Reports & Cybersecurity Alerts
            </h2>
            <p className="text-xs text-[#52667A] mt-0.5">
              Verified advisories from CERT-In, I4C, RBI, INTERPOL, FTC, and international cyber agencies.
            </p>
          </div>

          {/* Search bar inside feed */}
          <input
            type="text"
            value={advisorySearch}
            onChange={(e) => setAdvisorySearch(e.target.value)}
            placeholder="Filter advisories..."
            className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs focus:outline-none focus:border-[#0B5CAD]"
          />
        </div>

        <div className="space-y-3.5">
          {filteredAdvisories.map((item) => (
            <div key={item.id} className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-[#123B64]">
                    {item.country}
                  </span>
                  <span className="text-[11px] font-semibold text-[#52667A]">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#52667A]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.publishDate}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#092B49]">
                {item.title}
              </h3>

              <p className="text-xs text-[#52667A] leading-relaxed">
                {item.summary}
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#52667A]">
                <span className="font-semibold text-[#123B64]">Published by: {item.publishingOrg}</span>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-[#0B5CAD] hover:underline"
                >
                  <span>Source Bulletin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: HISTORICAL REPORTING TRENDS (2020-2023) */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-[#E2E8F0] pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#092B49]">
            Historical Multi-Year Reporting Trends (2020–2023)
          </h2>
          <p className="text-xs text-[#52667A] mt-0.5">
            Compiled from published NCRB Crime in India and FBI IC3 Annual Reports.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EBF2F9] text-[#123B64] uppercase font-bold border-b border-[#CBD5E1]">
              <tr>
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3">India (NCRB / Portal)</th>
                <th className="py-2.5 px-3">India Financial Share</th>
                <th className="py-2.5 px-3">United States (FBI IC3)</th>
                <th className="py-2.5 px-3">Dominant Threat Vector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {HISTORICAL_TRENDS.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="py-3 px-3 font-bold font-mono text-[#092B49]">{row.year}</td>
                  <td className="py-3 px-3 font-semibold text-[#243447]">{row.indiaReportedCases}</td>
                  <td className="py-3 px-3 text-red-700 font-bold">{row.indiaFinancialShare}</td>
                  <td className="py-3 px-3 font-semibold text-[#243447]">{row.usReportedComplaints} ({row.usTotalLoss})</td>
                  <td className="py-3 px-3 text-[#52667A]">{row.dominantVector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: SOURCED ORGANIZATIONS REFERENCE LIST */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <Database className="w-4 h-4 text-[#0B5CAD]" />
          <span>Authoritative Source Repositories & Methodologies</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CREDIBLE_SOURCES.map((src) => (
            <div key={src.id} className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#123B64]">{src.country}</span>
                <h4 className="font-bold text-[#092B49] mt-0.5">{src.name}</h4>
                <p className="text-[11px] text-[#52667A] mt-1">{src.organization}</p>
              </div>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1 font-bold text-[#0B5CAD] hover:underline text-[11px]"
              >
                <span>Visit Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
