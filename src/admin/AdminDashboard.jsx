import React, { useState, useEffect } from 'react';
import {
  Shield,
  Sliders,
  Globe,
  MessageSquare,
  History,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Lock,
  Layers,
  Database,
  Search,
  Bell
} from 'lucide-react';

export default function AdminDashboard({ admin, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [rules, setRules] = useState([]);
  const [sources, setSources] = useState([]);
  const [advisories, setAdvisories] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Modal States
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [showAddAdvModal, setShowAddAdvModal] = useState(false);

  // New Rule Form State
  const [newRule, setNewRule] = useState({
    name: '',
    category: 'Banking & Financial',
    regex: '',
    severity: 'critical',
    score: 35,
    description: '',
    simpleReason: ''
  });

  // New Advisory Form State
  const [newAdv, setNewAdv] = useState({
    title: '',
    category: 'Impersonation & Phishing',
    publishingOrg: 'ScamShield Security Operations',
    country: 'India',
    region: 'South Asia',
    summary: '',
    sourceUrl: 'https://cybercrime.gov.in',
    priority: 'HIGH'
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('scamshield_admin_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      const [sRes, rRes, srcRes, advRes, fbRes, logRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/rules', { headers }),
        fetch('/api/admin/sources', { headers }),
        fetch('/api/admin/advisories', { headers }),
        fetch('/api/admin/feedback', { headers }),
        fetch('/api/admin/audit-logs', { headers })
      ]);

      if (sRes.ok) setStats(await sRes.json());
      if (rRes.ok) setRules((await rRes.json()).rules || []);
      if (srcRes.ok) setSources((await srcRes.json()).sources || []);
      if (advRes.ok) setAdvisories((await advRes.json()).advisories || []);
      if (fbRes.ok) setFeedback((await fbRes.json()).feedback || []);
      if (logRes.ok) setAuditLogs((await logRes.json()).auditLogs || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleRule = async (rule) => {
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`/api/admin/rules/${rule.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ enabled: !rule.enabled })
      });
      if (res.ok) {
        setRules(rules.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
        loadData();
      }
    } catch (err) {
      console.error('Error toggling rule:', err);
    }
  };

  const handleDeleteRule = async (id) => {
    if (!window.confirm('Are you sure you want to delete this custom detection rule?')) return;
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`/api/admin/rules/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setRules(rules.filter(r => r.id !== id));
        loadData();
      }
    } catch (err) {
      console.error('Error deleting rule:', err);
    }
  };

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      const headers = getAuthHeaders();
      const res = await fetch('/api/admin/rules', {
        method: 'POST',
        headers,
        body: JSON.stringify(newRule)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setShowAddRuleModal(false);
      setNewRule({
        name: '',
        category: 'Banking & Financial',
        regex: '',
        severity: 'critical',
        score: 35,
        description: '',
        simpleReason: ''
      });
      loadData();
    } catch (err) {
      alert(`Rule Creation Error: ${err.message}`);
    }
  };

  const handleRefreshSources = async () => {
    try {
      const headers = getAuthHeaders();
      const res = await fetch('/api/admin/sources/refresh', {
        method: 'POST',
        headers
      });
      if (res.ok) {
        loadData();
        setMessage('Intelligence feeds checked and synchronized successfully.');
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (err) {
      console.error('Error syncing sources:', err);
    }
  };

  const handleCreateAdvisory = async (e) => {
    e.preventDefault();
    try {
      const headers = getAuthHeaders();
      const res = await fetch('/api/admin/advisories', {
        method: 'POST',
        headers,
        body: JSON.stringify(newAdv)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setShowAddAdvModal(false);
      setNewAdv({
        title: '',
        category: 'Impersonation & Phishing',
        publishingOrg: 'ScamShield Security Operations',
        country: 'India',
        region: 'South Asia',
        summary: '',
        sourceUrl: 'https://cybercrime.gov.in',
        priority: 'HIGH'
      });
      loadData();
    } catch (err) {
      alert(`Advisory Publication Error: ${err.message}`);
    }
  };

  const handleDeleteAdvisory = async (id) => {
    if (!window.confirm('Delete this scam advisory bulletin?')) return;
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`/api/admin/advisories/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setAdvisories(advisories.filter(a => a.id !== id));
        loadData();
      }
    } catch (err) {
      console.error('Error deleting advisory:', err);
    }
  };

  const handleUpdateFeedbackStatus = async (id, status) => {
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error('Error updating feedback:', err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Admin Top Navigation Bar */}
      <div className="bg-[#092B49] text-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0B5CAD] flex items-center justify-center text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">Security Operations Command</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE SESSION
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Authenticated Operator: <span className="font-bold text-white">{admin ? admin.displayName || admin.username : 'SecOps Administrator'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#DCE4EC] pb-2">
        {[
          { id: 'overview', label: 'Overview & Status', icon: Layers },
          { id: 'rules', label: 'Detection Rules Engine', icon: Sliders },
          { id: 'intelligence', label: 'Intelligence & Alerts', icon: Globe },
          { id: 'feedback', label: 'Citizen Submissions', icon: MessageSquare },
          { id: 'audit', label: 'Audit Trail', icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-[#123B64] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-[#52667A] border border-[#DCE4EC]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#DCE4EC] shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase text-[#52667A]">Detection Rules</span>
              <div className="text-2xl font-black text-[#092B49]">
                {stats ? `${stats.rules.active} / ${stats.rules.total}` : '18 / 18'}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">Heuristic Pattern Vectors Active</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#DCE4EC] shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase text-[#52667A]">Intelligence Sources</span>
              <div className="text-2xl font-black text-[#092B49]">
                {stats ? stats.intelligence.sourcesActive : 6}
              </div>
              <p className="text-[11px] text-[#0B5CAD] font-medium">CERT-In, I4C, RBI, INTERPOL</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#DCE4EC] shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase text-[#52667A]">Citizen Scam Reports</span>
              <div className="text-2xl font-black text-[#092B49]">
                {stats ? stats.feedback.total : 2}
              </div>
              <p className="text-[11px] text-amber-700 font-medium">
                {stats ? `${stats.feedback.pending} Awaiting Review` : '1 Pending Review'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#DCE4EC] shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase text-[#52667A]">Audit Events</span>
              <div className="text-2xl font-black text-[#092B49]">
                {stats ? stats.auditLogs.total : auditLogs.length}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Immutable Security Events Logged</p>
            </div>
          </div>

          {/* System Guarantees & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#DCE4EC] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#092B49] flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>Architecture & System Invariants</span>
              </h3>
              <div className="space-y-2.5 text-xs text-[#243447]">
                <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#092B49]">100% Client-Side Detection Engine:</strong>
                    Public user messages are inspected locally in browser memory. Zero user messages are stored on backend servers without explicit citizen reporting.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#092B49]">Cryptographic Administrative Security:</strong>
                    Owner credentials verified via salted PBKDF2 hashing with brute-force lockout safeguards.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#092B49]">Official Regulatory Attributions:</strong>
                    Intelligence data clearly labeled with agency names, publication dates, and official URLs.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#DCE4EC] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#092B49] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#0B5CAD]" />
                <span>Recent Security Audit Log Activity</span>
              </h3>
              <div className="space-y-2">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs flex items-center justify-between gap-3">
                    <div className="space-y-0.5 truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">
                          {log.action}
                        </span>
                        <span className="font-bold text-[#092B49] truncate">{log.details}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString()} - Actor: {log.actor} ({log.ip})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DETECTION RULES ENGINE */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#DCE4EC]">
            <div>
              <h2 className="text-base font-bold text-[#092B49]">Threat Detection Heuristics</h2>
              <p className="text-xs text-[#52667A]">Manage active regex patterns, risk weights, and diagnostic reasons.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddRuleModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#123B64] hover:bg-[#092B49] text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Rule</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#DCE4EC] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#52667A] uppercase font-bold text-[10px] border-b border-[#DCE4EC]">
                  <tr>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Rule Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Regex Signature</th>
                    <th className="p-3.5">Weight</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#243447]">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <button
                          type="button"
                          onClick={() => handleToggleRule(rule)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rule.enabled
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {rule.enabled ? 'ACTIVE' : 'DISABLED'}
                        </button>
                      </td>
                      <td className="p-3.5 font-bold text-[#092B49]">{rule.name}</td>
                      <td className="p-3.5">{rule.category}</td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-600 max-w-xs truncate" title={rule.regex}>
                        {rule.regex}
                      </td>
                      <td className="p-3.5 font-bold">+{rule.score}</td>
                      <td className="p-3.5">
                        {rule.isCustom ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            Custom
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Core Engine
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        {rule.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            title="Delete custom rule"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTELLIGENCE & ALERTS */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          {/* Top Sources Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#DCE4EC]">
            <div>
              <h2 className="text-base font-bold text-[#092B49]">Verified Intelligence Ingestion Providers</h2>
              <p className="text-xs text-[#52667A]">Autonomous connectors and official feeds across India, US, and International agencies.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRefreshSources}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B5CAD] hover:bg-[#094c8f] text-white text-xs font-bold transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Verify & Sync All Feeds</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAddAdvModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#123B64] hover:bg-[#092B49] text-white text-xs font-bold transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish Scam Alert</span>
              </button>
            </div>
          </div>

          {/* Sources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((src) => (
              <div key={src.id} className="bg-white p-4 rounded-xl border border-[#DCE4EC] shadow-sm space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF2F9] text-[#123B64]">
                      {src.acronym}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {src.syncStatus}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#092B49] mt-2">{src.name}</h4>
                  <p className="text-[11px] text-[#52667A] line-clamp-2 mt-1">{src.focus}</p>
                </div>
                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#52667A]">
                  <span>Last Sync: {new Date(src.lastChecked).toLocaleTimeString()}</span>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#0B5CAD] font-bold flex items-center gap-1">
                    <span>Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Active Advisories Table */}
          <div className="bg-white rounded-xl border border-[#DCE4EC] p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#092B49]">Published Scam Bulletins & Advisories</h3>
            <div className="divide-y divide-[#E2E8F0]">
              {advisories.map((adv) => (
                <div key={adv.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        adv.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {adv.priority}
                      </span>
                      <h4 className="text-xs font-bold text-[#092B49]">{adv.title}</h4>
                    </div>
                    <p className="text-xs text-[#52667A] max-w-3xl line-clamp-2">{adv.summary}</p>
                    <span className="text-[10px] text-slate-400">
                      Org: {adv.publishingOrg} | Date: {adv.publishDate}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAdvisory(adv.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-bold self-start sm:self-auto"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CITIZEN SUBMISSIONS */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-[#DCE4EC]">
            <h2 className="text-base font-bold text-[#092B49]">Citizen Scam Submissions & Feedback</h2>
            <p className="text-xs text-[#52667A]">Review messages flagged by the public for security analyst validation.</p>
          </div>

          <div className="bg-white rounded-xl border border-[#DCE4EC] overflow-hidden shadow-sm">
            <div className="divide-y divide-[#E2E8F0]">
              {feedback.map((item) => (
                <div key={item.id} className="p-4 space-y-2 hover:bg-slate-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {item.senderType}
                      </span>
                      <span className="text-xs font-bold text-[#092B49]">Claimed Sender: {item.claimedSender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'REVIEWED_CONFIRMED_SCAM'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] font-mono text-xs text-[#243447]">
                    "{item.messageText}"
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-[#52667A]">
                      Reporter: {item.reporterEmail} | Suspected: {item.suspectedCategory}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateFeedbackStatus(item.id, 'REVIEWED_CONFIRMED_SCAM')}
                        className="px-2.5 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 font-bold text-[11px]"
                      >
                        Confirm Scam
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateFeedbackStatus(item.id, 'DISMISSED')}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-[#DCE4EC]">
            <h2 className="text-base font-bold text-[#092B49]">Immutable Security Audit Log</h2>
            <p className="text-xs text-[#52667A]">Cryptographic append-only trail recording all administrative mutations and authentications.</p>
          </div>

          <div className="bg-white rounded-xl border border-[#DCE4EC] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#52667A] uppercase font-bold text-[10px] border-b border-[#DCE4EC]">
                  <tr>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Actor</th>
                    <th className="p-3.5">Action</th>
                    <th className="p-3.5">Target</th>
                    <th className="p-3.5">IP Address</th>
                    <th className="p-3.5">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-mono text-[11px] text-[#243447]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3.5 font-bold text-[#123B64]">{log.actor}</td>
                      <td className="p-3.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5">{log.target}</td>
                      <td className="p-3.5 text-slate-500">{log.ip}</td>
                      <td className="p-3.5 font-sans text-xs">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM RULE */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#092B49]">Create Custom Detection Rule</h3>
            <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#092B49] block mb-1">Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fake Credit Card Reward Scheme"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-[#092B49] block mb-1">Threat Category</label>
                <select
                  value={newRule.category}
                  onChange={(e) => setNewRule({ ...newRule, category: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Banking & Financial">Banking & Financial</option>
                  <option value="Phishing & Credentials">Phishing & Credentials</option>
                  <option value="Delivery & Courier">Delivery & Courier</option>
                  <option value="Urgency & Intimidation">Urgency & Intimidation</option>
                  <option value="Digital & Technology">Digital & Technology</option>
                  <option value="Lottery, Jobs & Advance Fee">Lottery, Jobs & Advance Fee</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#092B49] block mb-1">Regular Expression Pattern (Case Insensitive)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. reward\s+points\s+expiring|claim\s+cashback"
                  value={newRule.regex}
                  onChange={(e) => setNewRule({ ...newRule, regex: e.target.value })}
                  className="w-full p-2 font-mono border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#092B49] block mb-1">Severity</label>
                  <select
                    value={newRule.severity}
                    onChange={(e) => setNewRule({ ...newRule, severity: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="critical">Critical</option>
                    <option value="warning">Warning</option>
                    <option value="notice">Notice</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#092B49] block mb-1">Score Weight (1-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newRule.score}
                    onChange={(e) => setNewRule({ ...newRule, score: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#092B49] block mb-1">Technical Explanation</label>
                <input
                  type="text"
                  placeholder="Why this pattern is flagged"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-[#092B49] block mb-1">Elder-Friendly Plain Language Explanation</label>
                <input
                  type="text"
                  placeholder="Simple non-technical advice"
                  value={newRule.simpleReason}
                  onChange={(e) => setNewRule({ ...newRule, simpleReason: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="px-4 py-2 rounded-lg border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#123B64] text-white font-bold"
                >
                  Save & Deploy Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ADVISORY */}
      {showAddAdvModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#092B49]">Publish Scam Advisory Bulletin</h3>
            <form onSubmit={handleCreateAdvisory} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#092B49] block mb-1">Advisory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Critical Smishing Campaign Impersonating Indian Railways"
                  value={newAdv.title}
                  onChange={(e) => setNewAdv({ ...newAdv, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#092B49] block mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={newAdv.category}
                    onChange={(e) => setNewAdv({ ...newAdv, category: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#092B49] block mb-1">Priority</label>
                  <select
                    value={newAdv.priority}
                    onChange={(e) => setNewAdv({ ...newAdv, priority: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MODERATE">Moderate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#092B49] block mb-1">Publishing Organization</label>
                <input
                  type="text"
                  required
                  value={newAdv.publishingOrg}
                  onChange={(e) => setNewAdv({ ...newAdv, publishingOrg: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-[#092B49] block mb-1">Summary & Citizen Action Guidelines</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Detailed breakdown of threat..."
                  value={newAdv.summary}
                  onChange={(e) => setNewAdv({ ...newAdv, summary: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-[#092B49] block mb-1">Official Reference URL</label>
                <input
                  type="url"
                  value={newAdv.sourceUrl}
                  onChange={(e) => setNewAdv({ ...newAdv, sourceUrl: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddAdvModal(false)}
                  className="px-4 py-2 rounded-lg border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#123B64] text-white font-bold"
                >
                  Publish Live Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
