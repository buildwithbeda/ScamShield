import React, { useState, useEffect } from 'react';
import { ACADEMY_CATEGORIES, LEARNING_PATHS } from '../academy/categoriesData.js';
import { ACADEMY_LESSONS } from '../academy/lessonsData.js';
import { SCAM_COMPARISONS } from '../academy/comparisonsData.js';
import { CYBER_GLOSSARY } from '../academy/glossaryData.js';
import { BookOpen, Search, Filter, CheckCircle2, Clock, Award, ArrowRight, ShieldCheck, Scale, HelpCircle, Sparkles } from 'lucide-react';

export default function Academy({ onSelectLesson }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'comparisons' | 'glossary'
  const [selectedComparison, setSelectedComparison] = useState(SCAM_COMPARISONS[0]);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [glossarySearch, setGlossarySearch] = useState('');

  // Load completed lessons from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('scamshield_completed_lessons');
      if (stored) {
        setCompletedLessonIds(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }
  }, []);

  const filteredLessons = ACADEMY_LESSONS.filter((lesson) => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGlossary = CYBER_GLOSSARY.filter((item) =>
    item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    item.category.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Academy Hero Header */}
      <div className="bg-white rounded-xl border border-[#DCE4EC] p-8 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#123B64] text-xs font-bold border border-[#CBD5E1]">
            <BookOpen className="w-3.5 h-3.5 text-[#0B5CAD]" />
            <span>Cybersecurity Education & Citizen Defense</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#092B49] tracking-tight font-sans">
            ScamShield Academy — Understand Scams. Protect Yourself.
          </h1>

          <p className="text-sm sm:text-base text-[#52667A] leading-relaxed">
            Learn how digital scams work, recognise warning signs and build the knowledge needed to stay safe online. Designed for students, senior citizens, and digital consumers.
          </p>

          {/* Progress Tracker Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#123B64]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#F8FAFC] border border-[#CBD5E1]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Lessons Completed: {completedLessonIds.length} / {ACADEMY_LESSONS.length}</span>
            </div>
            <span className="text-[11px] text-[#52667A]">
              Progress is stored 100% locally on your device with zero account tracking.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-[#DCE4EC] gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'lessons'
              ? 'border-[#0B5CAD] text-[#0B5CAD]'
              : 'border-transparent text-[#52667A] hover:text-[#092B49]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Scam Lessons ({ACADEMY_LESSONS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('comparisons')}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'comparisons'
              ? 'border-[#0B5CAD] text-[#0B5CAD]'
              : 'border-transparent text-[#52667A] hover:text-[#092B49]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Scam Comparisons ({SCAM_COMPARISONS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('glossary')}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'glossary'
              ? 'border-[#0B5CAD] text-[#0B5CAD]'
              : 'border-transparent text-[#52667A] hover:text-[#092B49]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Cyber Glossary ({CYBER_GLOSSARY.length})</span>
        </button>
      </div>

      {/* TAB 1: LESSONS CURRICULUM */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {/* Learning Paths Cards */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#123B64] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0B5CAD]" />
              Structured Learning Paths:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LEARNING_PATHS.map((path) => (
                <div
                  key={path.id}
                  className="bg-white rounded-lg border border-[#DCE4EC] p-4 flex flex-col justify-between shadow-sm hover:border-[#0B5CAD] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#EBF2F9] text-[#123B64]">
                        {path.level}
                      </span>
                      <span className="text-xs text-[#52667A] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {path.duration}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#092B49] mb-1">
                      {path.title}
                    </h3>
                    <p className="text-xs text-[#52667A] leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const firstLesson = ACADEMY_LESSONS.find((l) => l.id === path.lessons[0]);
                      if (firstLesson) onSelectLesson(firstLesson);
                    }}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0B5CAD] hover:text-[#092B49]"
                  >
                    <span>Start Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-white rounded-xl border border-[#DCE4EC] p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons by title or keyword..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs focus:outline-none focus:border-[#0B5CAD]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#123B64] text-white'
                    : 'bg-[#F8FAFC] text-[#52667A] hover:bg-slate-200'
                }`}
              >
                All Lessons
              </button>
              {ACADEMY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#123B64] text-white'
                      : 'bg-[#F8FAFC] text-[#52667A] hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className="bg-white rounded-xl border border-[#DCE4EC] p-5 shadow-sm hover:border-[#0B5CAD] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EBF2F9] text-[#123B64]">
                        {lesson.categoryName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#52667A] flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {lesson.readingTime}
                        </span>
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" title="Completed" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#092B49] group-hover:text-[#0B5CAD] transition-colors mb-2">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-[#52667A] line-clamp-3 leading-relaxed">
                      {lesson.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#0B5CAD]">
                    <span>Read Lesson & Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLessons.length === 0 && (
            <div className="p-8 text-center bg-white rounded-xl border border-[#DCE4EC] text-[#52667A]">
              No lessons match your search criteria. Try a different keyword or category.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SCAM COMPARISONS */}
      {activeTab === 'comparisons' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#092B49] mb-1">
              Side-by-Side Scam & Message Comparisons
            </h2>
            <p className="text-xs text-[#52667A] mb-4">
              Compare differences between similar-looking authentic communications and cyber threats.
            </p>

            {/* Selector Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SCAM_COMPARISONS.map((comp) => (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setSelectedComparison(comp)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedComparison.id === comp.id
                      ? 'bg-[#123B64] text-white shadow-sm'
                      : 'bg-[#F8FAFC] text-[#52667A] hover:bg-slate-200'
                  }`}
                >
                  {comp.title}
                </button>
              ))}
            </div>

            {/* Comparison Table View */}
            <div className="border border-[#CBD5E1] rounded-xl overflow-hidden">
              <div className="bg-[#092B49] text-white p-4">
                <h3 className="text-base font-bold">{selectedComparison.title}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{selectedComparison.subtitle}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EBF2F9] text-[#123B64] uppercase font-bold border-b border-[#CBD5E1]">
                    <tr>
                      <th className="py-3 px-4 w-1/4">Evaluation Vector</th>
                      <th className="py-3 px-4 w-3/8 text-slate-700">Type A</th>
                      <th className="py-3 px-4 w-3/8 text-slate-700">Type B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {selectedComparison.points.map((pt, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                        <td className="py-3.5 px-4 font-bold text-[#092B49] align-top">
                          {pt.feature}
                        </td>
                        <td className="py-3.5 px-4 text-[#243447] leading-relaxed align-top">
                          {pt.itemA}
                        </td>
                        <td className="py-3.5 px-4 text-[#243447] leading-relaxed align-top">
                          {pt.itemB}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CYBER GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#DCE4EC] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#092B49]">
                  Searchable Glossary of Cybersecurity Terms
                </h2>
                <p className="text-xs text-[#52667A] mt-0.5">
                  Clear, jargon-free explanations of technical terms, fraud mechanisms, and security standards.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="Search terms (e.g. Smishing, OTP)..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs focus:outline-none focus:border-[#0B5CAD]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGlossary.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#092B49] font-mono">
                      {item.term}
                    </h3>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#EBF2F9] text-[#123B64]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#52667A] leading-relaxed pt-1">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>

            {filteredGlossary.length === 0 && (
              <div className="p-8 text-center text-xs text-[#52667A]">
                No terms match "{glossarySearch}".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
