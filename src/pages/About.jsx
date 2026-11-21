import React, { useState } from 'react';
import { Shield, Lock, Eye, CheckCircle2, PhoneCall, ExternalLink, Cpu, Database, AlertCircle, Send } from 'lucide-react';

export default function About() {
  const [submission, setSubmission] = useState({
    messageText: '',
    senderType: 'SMS',
    claimedSender: '',
    suspectedCategory: 'Banking & Financial',
    reporterEmail: '',
    honeypot: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!submission.messageText.trim()) return;

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit report.');

      setSubmitResult({ success: true, message: data.message, reportId: data.reportId });
      setSubmission({
        messageText: '',
        senderType: 'SMS',
        claimedSender: '',
        suspectedCategory: 'Banking & Financial',
        reporterEmail: '',
        honeypot: ''
      });
    } catch (err) {
      setSubmitResult({ success: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs font-bold border border-[#CBD5E1]">
          <Shield className="w-3.5 h-3.5 text-[#0B5CAD]" />
          <span>Project Identity & Mission</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#092B49] tracking-tight">
          About ScamShield
        </h1>

        <p className="text-sm sm:text-base text-[#243447] leading-relaxed">
          ScamShield is an independent cybersecurity awareness and suspicious-message analysis project. It helps people recognise suspicious digital communications, understand scam techniques, learn safer online practices and explore publicly reported cybercrime trends.
        </p>

        <p className="text-xs text-[#52667A]">
          Developed for <strong>PS01: ScamShield — Suspicious Message Detector</strong>, focusing on digital consumer protection in India and global cyber fraud awareness.
        </p>
      </div>

      {/* Mandatory Official Independence Notice */}
      <div className="p-6 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
          <span>Important Public Independence Notice</span>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          ScamShield is an <strong>independent educational project</strong>. It is <strong>not an official government service</strong> and is <strong>not affiliated with any government department, police agency, or central bank</strong>. ScamShield cannot block bank accounts, reverse unauthorized transactions, or directly lodge formal criminal complaints.
        </p>
      </div>

      {/* Privacy Guarantee & Offline Architecture */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <Lock className="w-5 h-5 text-emerald-600" />
          <span>Privacy & Local Execution Guarantee</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#243447] leading-relaxed">
          User trust is our highest priority. Digital communications often contain sensitive personal information (such as partial account numbers or family names). ScamShield enforces strict client-side data boundaries:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-[#52667A]">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Zero Cloud Transmission:</strong> Text messages and URLs entered in the detector are processed 100% locally in your browser memory using pure JavaScript heuristics.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Zero Permanent Storage:</strong> No messages are saved to servers, databases, or third-party cloud logging services.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Zero Tracking:</strong> No advertising trackers or biometric analytics are deployed.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Transparent Heuristics:</strong> All scoring rules, regex patterns, and risk weights are auditable and deterministic.</span>
          </li>
        </ul>
      </section>

      {/* Methodology Section */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <Cpu className="w-5 h-5 text-[#0B5CAD]" />
          <span>Technical Architecture & Methodology</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[#243447] leading-relaxed">
          <p>
            ScamShield combines three complementary capabilities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1]">
              <strong className="block font-bold text-[#092B49] mb-1">1. Detection Engine</strong>
              <span className="text-xs text-[#52667A]">Deterministic rule-based heuristics evaluating credential harvesting, urgency coercion, brand impersonation, and disposable TLDs in &lt;10ms.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1]">
              <strong className="block font-bold text-[#092B49] mb-1">2. ScamShield Academy</strong>
              <span className="text-xs text-[#52667A]">Defensive educational flows, annotated realistic demonstrations, interactive quizzes, and scam comparison guides for citizen empowerment.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1]">
              <strong className="block font-bold text-[#092B49] mb-1">3. Global Intelligence</strong>
              <span className="text-xs text-[#52667A]">Transparent, attributable reporting metrics from published CERT-In, I4C, RBI, INTERPOL, and FBI IC3 records without fabricated numbers.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Official Cyber Support Contact Section */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <PhoneCall className="w-5 h-5 text-red-600" />
          <span>Official Incident Reporting Contacts (India)</span>
        </h2>
        <p className="text-xs text-[#52667A]">
          If you have been targeted by or fallen victim to cyber fraud, use these official authorized channels:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <span className="text-xs font-bold text-red-900 block">National Cyber Crime Helpline</span>
            <div className="text-2xl font-extrabold text-red-700 font-mono mt-1">1930</div>
            <span className="text-[11px] text-red-800">Toll-Free, 24x7 service across India</span>
          </div>

          <div className="p-4 rounded-lg bg-[#EBF2F9] border border-[#BCCAD8]">
            <span className="text-xs font-bold text-[#123B64] block">National Cyber Crime Reporting Portal</span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-[#0B5CAD] hover:underline font-mono mt-1 flex items-center gap-1"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[11px] text-[#52667A]">Ministry of Home Affairs, Government of India</span>
          </div>
        </div>
      </section>

      {/* Citizen Submission: Report a Suspicious Message */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <Send className="w-5 h-5 text-[#0B5CAD]" />
          <span>Citizen Threat Submission: Report a Suspicious Message</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#52667A]">
          Received an unverified SMS, WhatsApp message, or link? You can voluntarily submit it to ScamShield’s security operations team for heuristic rule evaluation and community threat indexing.
        </p>

        {submitResult && (
          <div className={`p-4 rounded-lg border text-xs flex items-center gap-2 ${
            submitResult.success ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-red-50 border-red-300 text-red-900'
          }`}>
            {submitResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
            <div>
              <p>{submitResult.message}</p>
              {submitResult.reportId && <span className="font-mono text-[10px] text-slate-500">Tracking Reference: {submitResult.reportId}</span>}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
          {/* Honeypot field for bot suppression */}
          <input
            type="text"
            name="website"
            value={submission.honeypot}
            onChange={(e) => setSubmission({ ...submission, honeypot: e.target.value })}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="space-y-1">
            <label className="font-bold text-[#092B49] block">
              Suspicious Message Text or URL <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows="3"
              placeholder="Paste the suspicious message content or URL here..."
              value={submission.messageText}
              onChange={(e) => setSubmission({ ...submission, messageText: e.target.value })}
              className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5CAD] bg-[#F8FAFC]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-[#092B49] block mb-1">Message Channel</label>
              <select
                value={submission.senderType}
                onChange={(e) => setSubmission({ ...submission, senderType: e.target.value })}
                className="w-full p-2 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC]"
              >
                <option value="SMS">SMS / Text</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
                <option value="Email">Email</option>
                <option value="Web / URL">Web / URL</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#092B49] block mb-1">Claimed Sender Name</label>
              <input
                type="text"
                placeholder="e.g. SBI, India Post, BESCOM"
                value={submission.claimedSender}
                onChange={(e) => setSubmission({ ...submission, claimedSender: e.target.value })}
                className="w-full p-2 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC]"
              />
            </div>

            <div>
              <label className="font-bold text-[#092B49] block mb-1">Suspected Category</label>
              <select
                value={submission.suspectedCategory}
                onChange={(e) => setSubmission({ ...submission, suspectedCategory: e.target.value })}
                className="w-full p-2 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC]"
              >
                <option value="Banking & Financial">Banking & Financial</option>
                <option value="Delivery & Courier">Delivery & Courier</option>
                <option value="Utility Disconnection">Utility Disconnection</option>
                <option value="Digital Arrest">Digital Arrest</option>
                <option value="Job / Task Scam">Job / Task Scam</option>
                <option value="Lottery / Prize">Lottery / Prize</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#092B49] block mb-1">Your Email (Optional, for status follow-up)</label>
            <input
              type="email"
              placeholder="name@example.com (optional)"
              value={submission.reporterEmail}
              onChange={(e) => setSubmission({ ...submission, reporterEmail: e.target.value })}
              className="w-full p-2 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-lg bg-[#123B64] hover:bg-[#092B49] text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Submitting to SecOps...' : 'Submit Suspicious Message for Review'}</span>
          </button>
        </form>
      </section>
    </div>
  );
}
