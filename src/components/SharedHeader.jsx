import React, { useState } from 'react';
import { Shield, Menu, X, PhoneCall, Globe, Type, ExternalLink } from 'lucide-react';

export default function SharedHeader({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  textSize,
  setTextSize
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: language === 'hi' ? 'होम' : (language === 'as' ? 'ঘৰ' : 'Home') },
    { id: 'detector', label: language === 'hi' ? 'संदेश जांचें' : (language === 'as' ? 'বাৰ্তা পৰীক্ষা' : 'Detect a Scam') },
    { id: 'url-checker', label: language === 'hi' ? 'URL चेकर' : (language === 'as' ? 'URL পৰীক্ষক' : 'URL Checker') },
    { id: 'academy', label: language === 'hi' ? 'एकेडमी' : (language === 'as' ? 'একাডেমী' : 'ScamShield Academy') },
    { id: 'intelligence', label: language === 'hi' ? 'ग्लोबल इंटेलिजेंस' : (language === 'as' ? 'গ্ল’বেল ইনটেলিজেন্স' : 'Global Scam Intelligence') },
    { id: 'safety-guide', label: language === 'hi' ? 'सुरक्षा गाइड' : (language === 'as' ? 'সুৰক্ষা নিৰ্দেশিকা' : 'Safety Guide') },
    { id: 'about', label: language === 'hi' ? 'परिचय' : (language === 'as' ? 'পৰিচয়' : 'About') },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="border-b border-[#DCE4EC] bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-[#092B49] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#123B64]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Skip link and accessibility cue */}
          <div className="flex items-center gap-3">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <span className="text-slate-300 hidden sm:inline text-[11px]">
              Independent Cybersecurity Awareness & Suspicious Message Analysis
            </span>
          </div>

          {/* Controls: Language, Text Size, Helpline */}
          <div className="flex items-center gap-3 ml-auto">
            {/* National Helpline Badge */}
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors text-[11px]"
              title="National Cyber Crime Reporting Helpline (Toll-Free)"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Cyber Helpline: <strong>1930</strong></span>
            </a>

            {/* Text Size Controls */}
            <div className="flex items-center border border-slate-700 rounded overflow-hidden text-[11px] bg-slate-900/60">
              <button
                type="button"
                onClick={() => setTextSize('normal')}
                className={`px-1.5 py-0.5 hover:bg-slate-700 ${textSize === 'normal' ? 'bg-[#0B5CAD] font-bold text-white' : 'text-slate-300'}`}
                title="Default text size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                className={`px-1.5 py-0.5 hover:bg-slate-700 ${textSize === 'large' ? 'bg-[#0B5CAD] font-bold text-white' : 'text-slate-300'}`}
                title="Large text size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextSize('xl')}
                className={`px-1.5 py-0.5 hover:bg-slate-700 ${textSize === 'xl' ? 'bg-[#0B5CAD] font-bold text-white' : 'text-slate-300'}`}
                title="Extra large text size"
              >
                A+
              </button>
            </div>

            {/* Language Selection */}
            <div className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3 h-3 text-slate-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-800 text-white border border-slate-700 rounded px-1.5 py-0.5 text-[11px] focus:outline-none focus:border-[#0B5CAD]"
                aria-label="Select interface language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="as">অসমীয়া (Assamese)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-lg bg-[#123B64] border border-[#0B5CAD] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-6 h-6 text-[#E07A1A]" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl font-bold tracking-tight text-[#092B49] font-sans">
                  Scam<span className="text-[#0B5CAD]">Shield</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#52667A] -mt-0.5">
                Detect. Understand. Stay Protected.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#123B64] text-white shadow-sm'
                      : 'text-[#243447] hover:text-[#0B5CAD] hover:bg-[#F3F6FA]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#123B64] hover:bg-[#F3F6FA] focus:outline-none focus:ring-2 focus:ring-[#0B5CAD]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCE4EC] bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-[#123B64] text-white'
                  : 'text-[#243447] hover:bg-[#F3F6FA] hover:text-[#0B5CAD]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
