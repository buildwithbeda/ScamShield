import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, PhoneCall, Smartphone, Lock, Eye, CreditCard, ExternalLink, HelpCircle } from 'lucide-react';

export default function SafetyGuide() {
  const [activeSection, setActiveSection] = useState('sms');

  const guideSections = [
    {
      id: 'sms',
      title: 'Suspicious SMS Messages',
      icon: 'Smartphone',
      summary: 'How to recognize deceptive smishing texts impersonating banks, couriers, and utilities.',
      rules: [
        'Check the sender ID: Legitimate Indian enterprises use registered alphanumeric headers (e.g. `AX-SBIINB`, `VK-AIRTEL`). Standard 10-digit mobile numbers sending "bank alerts" are 100% fraudulent.',
        'Never click links ending in disposable TLDs like `.xyz`, `.top`, `.click`, or `.buzz`.',
        'Legitimate banks never threaten account suspension "within 2 hours" via text message.',
        'Forward unsolicited commercial spam SMS to 1909 (TRAI DND complaint gateway).'
      ]
    },
    {
      id: 'whatsapp',
      title: 'Fake WhatsApp Messages',
      icon: 'Smartphone',
      summary: 'Recognizing viral forward hoaxes, overseas job offers, and video call intimidation.',
      rules: [
        'Be highly skeptical of messages from international country codes (e.g. +92, +63, +1, +84) offering jobs or lottery awards.',
        'Beware of messages asking you to join Telegram groups to like YouTube videos for money.',
        'Never accept video calls from unknown numbers claiming to be CBI, Mumbai Police, or Customs officers.',
        'Remember that Indian law has no provision for "Digital Arrest" on video calls.'
      ]
    },
    {
      id: 'urls',
      title: 'Checking Suspicious URLs',
      icon: 'Eye',
      summary: 'Anatomy of domain spoofing, URL shorteners, and fraudulent web addresses.',
      rules: [
        'Inspect the Root Domain: In `http://sbi-kyc.support-portal.xyz`, the actual website owner is `support-portal.xyz`, NOT SBI.',
        'HTTPS is not proof of authenticity: Phishing websites also obtain free SSL certificates. HTTPS only encrypts the traffic, it does not verify site ownership.',
        'Do not click shortened links (`bit.ly`, `tinyurl`) in unsolicited messages—they are used to conceal malicious destinations.',
        'Authentic Indian Central and State government portals strictly end in `.gov.in` or `.nic.in`.'
      ]
    },
    {
      id: 'upi',
      title: 'Protecting UPI & Banking',
      icon: 'CreditCard',
      summary: 'Fundamental rules of UPI mechanics, PIN security, and marketplace sales.',
      rules: [
        'THE GOLDEN RULE OF UPI: You NEVER enter your UPI PIN to receive money. Entering your PIN ALWAYS sends money out of your account.',
        'Never scan a QR code to receive a payment or refund. QR codes in UPI are exclusively for debiting your account.',
        'Never read out OTPs or MPINs to anyone on the phone, even if they claim to be a bank manager or security officer.',
        'Keep daily transaction limits set on your mobile banking app to minimize potential exposure.'
      ]
    },
    {
      id: 'after-fraud',
      title: 'What to Do After Cyber Fraud',
      icon: 'AlertTriangle',
      summary: 'Immediate critical steps during the Golden Hour to freeze funds and file formal reports.',
      rules: [
        'DIAL 1930 IMMEDIATELY: The Golden Hour (first 1–2 hours) is critical. 1930 alerts the Citizen Financial Cyber Fraud Reporting System to freeze funds in the recipient bank.',
        'Contact your bank’s 24/7 fraud helpline to block net banking, UPI, and debit/credit cards.',
        'Register an official incident complaint on https://cybercrime.gov.in with transaction IDs, screenshots, and account details.',
        'Change all banking and email account passwords from a separate, uncompromised device.'
      ]
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs font-bold border border-[#CBD5E1]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Practical Defense Playbook</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#092B49] tracking-tight">
            Cyber Safety Guide & Checklists
          </h1>
          <p className="text-sm sm:text-base text-[#52667A] leading-relaxed">
            Essential verification rules and step-by-step checklists to protect your family, bank accounts, and digital identities.
          </p>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2">
        {guideSections.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => setActiveSection(sec.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
              activeSection === sec.id
                ? 'bg-[#123B64] text-white'
                : 'bg-white hover:bg-slate-100 text-[#52667A] border border-[#CBD5E1]'
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Selected Guide Section Card */}
      {guideSections.map((sec) => {
        if (sec.id !== activeSection) return null;

        return (
          <div key={sec.id} className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
            <div className="border-b border-[#E2E8F0] pb-4">
              <h2 className="text-xl font-bold text-[#092B49]">{sec.title}</h2>
              <p className="text-xs sm:text-sm text-[#52667A] mt-1">{sec.summary}</p>
            </div>

            <div className="space-y-3">
              {sec.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#243447] leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Emergency Helpline Reminder */}
      <div className="p-6 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-red-600" />
            <h3 className="text-base font-bold text-red-950">
              National Cyber Crime Reporting Helpline: 1930
            </h3>
          </div>
          <p className="text-xs text-red-800 mt-1">
            Available 24x7 across all Indian States and Union Territories. Free toll-free service operated by the Ministry of Home Affairs.
          </p>
        </div>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs transition-colors flex-shrink-0"
        >
          Visit cybercrime.gov.in
        </a>
      </div>
    </div>
  );
}
