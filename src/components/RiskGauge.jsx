import React from 'react';
import { AlertTriangle, AlertCircle, ShieldCheck, Zap, ShieldAlert, Cpu, Clock, Award } from 'lucide-react';

export default function RiskGauge({ analysis }) {
  const {
    score,
    verdict,
    verdictColor,
    riskLevel,
    evidenceStrength,
    impersonatedBrand,
    summary,
    analysisTimestamp,
    analysisMethod,
    analysisTimeMs
  } = analysis;

  // Circular gauge coordinates
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getTheme = () => {
    switch (verdict) {
      case 'CRITICAL RISK':
        return {
          stroke: '#991B1B',
          bgBadge: 'bg-red-100 text-red-900 border-red-300',
          dot: 'bg-red-700',
          icon: <AlertTriangle className="w-4 h-4 text-red-700" />,
          cardBorder: 'border-l-4 border-l-red-700'
        };
      case 'HIGH RISK':
        return {
          stroke: '#DC2626',
          bgBadge: 'bg-red-50 text-red-800 border-red-200',
          dot: 'bg-red-600',
          icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
          cardBorder: 'border-l-4 border-l-red-600'
        };
      case 'CAUTION':
        return {
          stroke: '#D97706',
          bgBadge: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
          cardBorder: 'border-l-4 border-l-amber-500'
        };
      case 'LOW RISK':
      default:
        return {
          stroke: '#15803D',
          bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-600',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
          cardBorder: 'border-l-4 border-l-emerald-600'
        };
    }
  };

  const style = getTheme();

  return (
    <div className={`bg-white rounded-xl border border-[#DCE4EC] ${style.cardBorder} p-6 shadow-sm`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Circular Gauge */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={style.stroke}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#092B49] font-mono leading-none">
              {score}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52667A] mt-1">
              Score / 100
            </span>
          </div>
        </div>

        {/* Verdict & Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2.5">
            {/* Verdict Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${style.bgBadge}`}>
              {style.icon}
              <span>{verdict}</span>
            </div>

            {/* Evidence Strength */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#F1F5F9] text-[#1E293B] border border-[#CBD5E1]">
              <Award className="w-3.5 h-3.5 text-[#0B5CAD]" />
              <span>Evidence: {evidenceStrength}</span>
            </div>

            {/* Impersonated Brand Badge */}
            {impersonatedBrand && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EBF2F9] text-[#123B64] border border-[#BCCAD8]">
                <span>Target: <strong>{impersonatedBrand}</strong></span>
              </div>
            )}
          </div>

          {/* Short Explanation */}
          <h2 className="sr-only">Threat Assessment Verdict</h2>
          <p className="text-sm sm:text-base font-medium text-[#243447] leading-relaxed">
            {summary}
          </p>

          {/* Technical Metadata Bar */}
          <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-[#52667A] font-mono">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#0B5CAD]" />
              {analysisMethod}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              {analysisTimeMs}ms execution
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {new Date(analysisTimestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
