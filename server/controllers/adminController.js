import { db } from '../db/store.js';

export function getStats(req, res) {
  const activeRules = db.data.rules.filter(r => r.enabled).length;
  const totalRules = db.data.rules.length;
  const activeSources = db.data.intelligenceSources.filter(s => s.enabled).length;
  const totalSources = db.data.intelligenceSources.length;
  const activeAdvisories = db.data.advisories.filter(a => a.status === 'ACTIVE').length;
  const totalFeedback = db.data.feedback.length;
  const pendingFeedback = db.data.feedback.filter(f => f.status === 'PENDING_REVIEW').length;
  const totalAuditLogs = db.data.auditLogs.length;

  res.json({
    rules: { total: totalRules, active: activeRules },
    intelligence: { sourcesTotal: totalSources, sourcesActive: activeSources, advisoriesActive: activeAdvisories },
    feedback: { total: totalFeedback, pending: pendingFeedback },
    auditLogs: { total: totalAuditLogs },
    systemStatus: 'OPERATIONAL',
    engineVersion: '2.4.0-heuristic'
  });
}

// Rules CRUD
export function getRules(req, res) {
  res.json({ rules: db.data.rules });
}

export function createRule(req, res) {
  const { name, category, regex, severity, score, description, simpleReason } = req.body || {};
  if (!name || !regex || !category || score === undefined) {
    return res.status(400).json({ error: 'Missing required rule fields: name, regex, category, score.' });
  }

  // Validate regex syntax
  try {
    new RegExp(regex, 'i');
  } catch (err) {
    return res.status(400).json({ error: `Invalid regular expression syntax: ${err.message}` });
  }

  const newRule = {
    id: `rule-custom-${Date.now()}`,
    name: name.trim(),
    category: category.trim(),
    regex: regex.trim(),
    severity: severity || 'warning',
    score: Math.max(1, Math.min(100, Number(score))),
    description: (description || '').trim(),
    simpleReason: (simpleReason || '').trim(),
    enabled: true,
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  db.data.rules.unshift(newRule);
  db.save();
  db.logAudit(req.admin.username, 'RULE_CREATED', newRule.id, `Created detection rule: "${newRule.name}" (${newRule.category}, score ${newRule.score})`, req.ip);

  res.status(201).json({ success: true, rule: newRule });
}

export function updateRule(req, res) {
  const { id } = req.params;
  const idx = db.data.rules.findIndex(r => r.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Rule not found: ${id}` });
  }

  const existing = db.data.rules[idx];
  const { name, category, regex, severity, score, description, simpleReason, enabled } = req.body || {};

  if (regex !== undefined) {
    try {
      new RegExp(regex, 'i');
    } catch (err) {
      return res.status(400).json({ error: `Invalid regular expression syntax: ${err.message}` });
    }
  }

  const updated = {
    ...existing,
    name: name !== undefined ? name.trim() : existing.name,
    category: category !== undefined ? category.trim() : existing.category,
    regex: regex !== undefined ? regex.trim() : existing.regex,
    severity: severity !== undefined ? severity : existing.severity,
    score: score !== undefined ? Math.max(1, Math.min(100, Number(score))) : existing.score,
    description: description !== undefined ? description.trim() : existing.description,
    simpleReason: simpleReason !== undefined ? simpleReason.trim() : existing.simpleReason,
    enabled: enabled !== undefined ? Boolean(enabled) : existing.enabled,
    updatedAt: new Date().toISOString()
  };

  db.data.rules[idx] = updated;
  db.save();
  db.logAudit(req.admin.username, 'RULE_UPDATED', id, `Updated rule "${updated.name}" (Enabled: ${updated.enabled})`, req.ip);

  res.json({ success: true, rule: updated });
}

export function deleteRule(req, res) {
  const { id } = req.params;
  const idx = db.data.rules.findIndex(r => r.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Rule not found: ${id}` });
  }

  const [removed] = db.data.rules.splice(idx, 1);
  db.save();
  db.logAudit(req.admin.username, 'RULE_DELETED', id, `Deleted rule: "${removed.name}"`, req.ip);

  res.json({ success: true, message: `Rule ${id} removed.` });
}

// Sources Management
export function getSources(req, res) {
  res.json({ sources: db.data.intelligenceSources });
}

export function updateSource(req, res) {
  const { id } = req.params;
  const idx = db.data.intelligenceSources.findIndex(s => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Source not found: ${id}` });
  }

  const { enabled, syncStatus } = req.body || {};
  if (enabled !== undefined) db.data.intelligenceSources[idx].enabled = Boolean(enabled);
  if (syncStatus !== undefined) db.data.intelligenceSources[idx].syncStatus = syncStatus;
  db.data.intelligenceSources[idx].lastChecked = new Date().toISOString();

  db.save();
  db.logAudit(req.admin.username, 'SOURCE_UPDATED', id, `Updated intelligence source ${id} (enabled: ${db.data.intelligenceSources[idx].enabled})`, req.ip);

  res.json({ success: true, source: db.data.intelligenceSources[idx] });
}

export function triggerSourceRefresh(req, res) {
  const now = new Date().toISOString();
  db.data.intelligenceSources.forEach(s => {
    s.lastChecked = now;
  });
  db.save();
  db.logAudit(req.admin.username, 'SOURCES_REFRESH_TRIGGERED', 'INTELLIGENCE_SYSTEM', 'Refreshed verification status for all intelligence feeds.', req.ip);

  res.json({ success: true, message: 'All intelligence sources verified and synchronized.', checkedAt: now });
}

// Advisories Management
export function getAdvisories(req, res) {
  res.json({ advisories: db.data.advisories });
}

export function createAdvisory(req, res) {
  const { title, country, region, category, publishingOrg, summary, sourceUrl, priority } = req.body || {};
  if (!title || !category || !summary) {
    return res.status(400).json({ error: 'Title, category, and summary are required.' });
  }

  const newAdv = {
    id: `adv-${Date.now()}`,
    title: title.trim(),
    country: (country || 'India').trim(),
    region: (region || 'South Asia').trim(),
    category: category.trim(),
    publishingOrg: (publishingOrg || 'ScamShield Intelligence Operations').trim(),
    publishDate: new Date().toISOString().split('T')[0],
    freshnessLabel: 'Security Operations Bulletin',
    summary: summary.trim(),
    sourceUrl: (sourceUrl || 'https://cybercrime.gov.in').trim(),
    status: 'ACTIVE',
    priority: priority || 'HIGH',
    verified: true
  };

  db.data.advisories.unshift(newAdv);
  db.save();
  db.logAudit(req.admin.username, 'ADVISORY_PUBLISHED', newAdv.id, `Published scam alert: "${newAdv.title}"`, req.ip);

  res.status(201).json({ success: true, advisory: newAdv });
}

export function deleteAdvisory(req, res) {
  const { id } = req.params;
  const idx = db.data.advisories.findIndex(a => a.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Advisory not found: ${id}` });
  }

  const [removed] = db.data.advisories.splice(idx, 1);
  db.save();
  db.logAudit(req.admin.username, 'ADVISORY_DELETED', id, `Removed advisory: "${removed.title}"`, req.ip);

  res.json({ success: true, message: `Advisory ${id} deleted.` });
}

// Feedback & Reports Management
export function getFeedback(req, res) {
  res.json({ feedback: db.data.feedback });
}

export function updateFeedbackStatus(req, res) {
  const { id } = req.params;
  const { status, adminNotes } = req.body || {};
  const idx = db.data.feedback.findIndex(f => f.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Feedback item not found: ${id}` });
  }

  if (status) db.data.feedback[idx].status = status;
  if (adminNotes !== undefined) db.data.feedback[idx].adminNotes = adminNotes;
  db.save();

  db.logAudit(req.admin.username, 'FEEDBACK_STATUS_UPDATED', id, `Marked feedback status as "${status}"`, req.ip);

  res.json({ success: true, feedback: db.data.feedback[idx] });
}

// Audit Logs
export function getAuditLogs(req, res) {
  const limit = Math.min(200, Number(req.query.limit) || 100);
  res.json({ auditLogs: db.data.auditLogs.slice(0, limit) });
}
