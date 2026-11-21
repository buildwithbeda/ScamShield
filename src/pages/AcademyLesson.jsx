import React, { useState, useEffect } from 'react';
import { ACADEMY_LESSONS } from '../academy/lessonsData.js';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  PhoneCall,
  ExternalLink,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export default function AcademyLesson({
  lesson,
  onBack,
  onSelectLesson
}) {
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    // Scroll to top when opening a new lesson
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setOpenFaqIndex(0);

    try {
      const stored = localStorage.getItem('scamshield_completed_lessons');
      if (stored) {
        const completed = JSON.parse(stored);
        setIsCompleted(completed.includes(lesson.id));
      }
    } catch {
      // Fallback
    }
  }, [lesson.id]);

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === lesson.quiz.correctIndex) {
      markLessonCompleted();
    }
  };

  const markLessonCompleted = () => {
    try {
      const stored = localStorage.getItem('scamshield_completed_lessons');
      const completed = stored ? JSON.parse(stored) : [];
      if (!completed.includes(lesson.id)) {
        const updated = [...completed, lesson.id];
        localStorage.setItem('scamshield_completed_lessons', JSON.stringify(updated));
        setIsCompleted(true);
      }
    } catch {
      // Fallback
    }
  };

  const relatedLessonObjects = (lesson.relatedLessons || [])
    .map((rId) => ACADEMY_LESSONS.find((l) => l.id === rId))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn font-sans">
      {/* Top Breadcrumb & Controls Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123B64] hover:text-[#0B5CAD] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Academy Curriculum</span>
        </button>

        <button
          type="button"
          onClick={markLessonCompleted}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-white hover:bg-slate-50 text-[#123B64] border border-[#CBD5E1] shadow-sm'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
          <span>{isCompleted ? 'Lesson Completed' : 'Mark as Completed'}</span>
        </button>
      </div>

      {/* 1. Lesson Header Card */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#EBF2F9] text-[#123B64]">
            {lesson.categoryName}
          </span>
          <span className="text-[11px] font-medium text-[#52667A] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {lesson.readingTime}
          </span>
          <span className="text-[11px] font-semibold text-[#52667A]">
            Level: {lesson.level}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#092B49] tracking-tight">
          {lesson.title}
        </h1>

        <p className="text-sm sm:text-base text-[#52667A] leading-relaxed">
          {lesson.summary}
        </p>
      </div>

      {/* 2. SECTION A: What is this scam? */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">A</span>
          <span>What is this Scam?</span>
        </h2>
        <p className="text-sm text-[#243447] leading-relaxed">
          {lesson.whatIsThis}
        </p>
      </section>

      {/* 3. SECTION B: How does it typically work? (Defensive educational flow) */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">B</span>
          <span>How Does It Typically Work? (Defensive Awareness Flow)</span>
        </h2>
        <div className="space-y-3">
          {lesson.howItWorks.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="w-6 h-6 rounded-full bg-[#123B64] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-[#243447] leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECTION C: Common warning signs */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">C</span>
          <span>Common Warning Signs</span>
        </h2>
        <ul className="space-y-2.5">
          {lesson.warningSigns.map((sign, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#243447]">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{sign}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. SECTION D: Realistic Educational Example */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">D</span>
            <span>Realistic Educational Demonstration</span>
          </h2>
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            Demonstration Scenario
          </span>
        </div>

        {/* Message Bubble */}
        <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#243447] font-mono text-xs sm:text-sm leading-relaxed">
          "{lesson.realisticExample.message}"
        </div>

        {/* Annotations breakdown */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B64] mb-2">
            Deceptive Pattern Breakdown:
          </h3>
          <div className="space-y-2">
            {lesson.realisticExample.annotations.map((ann, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs">
                <span className="font-bold text-amber-950 font-mono block mb-0.5">
                  "{ann.phrase}"
                </span>
                <span className="text-[#52667A]">{ann.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION E: Why people fall for it */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">E</span>
          <span>Why People Fall For It (Psychological Manipulation)</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#243447] leading-relaxed">
          {lesson.whyPeopleFallForIt}
        </p>
      </section>

      {/* 7. SECTION F: How to protect yourself */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">F</span>
          <span>How to Protect Yourself</span>
        </h2>
        <ul className="space-y-2.5">
          {lesson.howToProtect.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#243447]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. SECTION G: What to do if affected */}
      <section className="bg-white rounded-xl border border-red-200 p-6 sm:p-8 shadow-sm space-y-4 bg-red-50/20">
        <div className="flex items-center justify-between border-b border-red-200 pb-2">
          <h2 className="text-lg font-bold text-red-950 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 text-xs flex items-center justify-center font-bold">G</span>
            <span>What to Do if Affected (Immediate Emergency Actions)</span>
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Dial 1930</span>
          </div>
        </div>
        <ul className="space-y-2.5">
          {lesson.whatToDoIfAffected.map((action, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#243447]">
              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{action}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. SECTION H: Frequently Asked Questions (FAQ) */}
      {lesson.faqs && lesson.faqs.length > 0 && (
        <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
            <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">H</span>
            <span>Frequently Asked Questions (FAQ)</span>
          </h2>
          <div className="space-y-3">
            {lesson.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div key={fIdx} className="border border-[#CBD5E1] rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : fIdx)}
                    className="w-full text-left p-4 bg-[#F8FAFC] hover:bg-[#EBF2F9] transition-colors flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#092B49]"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0B5CAD] flex-shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#52667A] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#52667A] flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white border-t border-[#CBD5E1] text-xs sm:text-sm text-[#52667A] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 10. SECTION I: Knowledge check (Interactive Quiz) */}
      <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
          <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">I</span>
          <span>Knowledge Check (Interactive Quiz)</span>
        </h2>

        <p className="text-xs sm:text-sm font-bold text-[#123B64]">
          {lesson.quiz.question}
        </p>

        <div className="space-y-2">
          {lesson.quiz.options.map((opt, oIdx) => {
            let optionStyle = 'bg-[#F8FAFC] border-[#E2E8F0] text-[#243447] hover:bg-[#EBF2F9]';

            if (quizSubmitted) {
              if (oIdx === lesson.quiz.correctIndex) {
                optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
              } else if (selectedQuizOption === oIdx) {
                optionStyle = 'bg-red-50 border-red-400 text-red-900';
              }
            } else if (selectedQuizOption === oIdx) {
              optionStyle = 'bg-[#EBF2F9] border-[#0B5CAD] text-[#092B49] font-bold';
            }

            return (
              <button
                key={oIdx}
                type="button"
                disabled={quizSubmitted}
                onClick={() => setSelectedQuizOption(oIdx)}
                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <span className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            type="button"
            onClick={handleQuizSubmit}
            disabled={selectedQuizOption === null}
            className="px-6 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#123B64] hover:bg-[#092B49] text-white transition-all disabled:opacity-40"
          >
            Submit Answer
          </button>
        ) : (
          <div className={`p-4 rounded-lg border text-xs sm:text-sm space-y-1.5 ${
            selectedQuizOption === lesson.quiz.correctIndex
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <strong className="block font-bold">
              {selectedQuizOption === lesson.quiz.correctIndex ? 'Correct!' : 'Incorrect.'}
            </strong>
            <p className="leading-relaxed">{lesson.quiz.explanation}</p>
          </div>
        )}
      </section>

      {/* 11. SECTION J: Official Regulatory Advisories & Source Citations */}
      {lesson.officialAdvisories && lesson.officialAdvisories.length > 0 && (
        <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
            <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">J</span>
            <span>Official Regulatory Advisories & Citations</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.officialAdvisories.map((adv, aIdx) => (
              <div key={aIdx} className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B5CAD]">
                    {adv.agency}
                  </span>
                  <h4 className="text-xs font-bold text-[#092B49] mt-0.5 leading-snug">
                    {adv.title}
                  </h4>
                  <p className="text-[11px] font-mono text-[#52667A] mt-1">
                    Ref: {adv.refCode}
                  </p>
                </div>
                {adv.url && (
                  <a
                    href={adv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#123B64] hover:text-[#0B5CAD] transition-colors pt-2 border-t border-[#E2E8F0]"
                  >
                    <span>View Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 12. SECTION K: Related Lessons */}
      {relatedLessonObjects.length > 0 && (
        <section className="bg-white rounded-xl border border-[#DCE4EC] p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#092B49] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
            <span className="w-6 h-6 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs flex items-center justify-center font-bold">K</span>
            <span>Related Learning Modules</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedLessonObjects.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectLesson(rel)}
                className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0B5CAD] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#123B64]">
                    {rel.categoryName}
                  </span>
                  <h4 className="text-xs font-bold text-[#092B49] group-hover:text-[#0B5CAD] transition-colors mt-1">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-[#0B5CAD] mt-3 flex items-center gap-1">
                  <span>Open Lesson</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
