import { db } from '../db/store.js';

export function getHealth(req, res) {
  res.json({
    status: 'ONLINE',
    service: 'ScamShield Security & Detection Infrastructure',
    version: '2.4.0',
    timestamp: new Date().toISOString(),
    guarantees: {
      clientSideDetection: 'Zero Telemetry & 100% Offline Capable',
      intelligenceAttribution: 'Attributable Official Regulatory Sources'
    }
  });
}

export function getPublicSources(req, res) {
  const enabledSources = db.data.intelligenceSources.filter(s => s.enabled);
  res.json({ sources: enabledSources });
}

export function getPublicAdvisories(req, res) {
  const activeAdvisories = db.data.advisories.filter(a => a.status === 'ACTIVE');
  res.json({ advisories: activeAdvisories });
}

export function submitPublicReport(req, res) {
  const { messageText, senderType, claimedSender, suspectedCategory, reporterEmail, honeypot } = req.body || {};

  // Honeypot spam trap
  if (honeypot) {
    return res.status(200).json({ success: true, message: 'Report received.' });
  }

  if (!messageText || messageText.trim().length < 5) {
    return res.status(400).json({ error: 'Please provide a valid message text to submit.' });
  }

  const report = {
    id: `fb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    messageText: messageText.trim().slice(0, 1000), // Cap length
    senderType: senderType || 'Unknown',
    claimedSender: claimedSender ? claimedSender.trim().slice(0, 100) : 'Unspecified',
    suspectedCategory: suspectedCategory || 'General Suspicion',
    reporterEmail: reporterEmail ? reporterEmail.trim().slice(0, 100) : 'Anonymous',
    status: 'PENDING_REVIEW',
    submittedAt: new Date().toISOString(),
    adminNotes: ''
  };

  db.data.feedback.unshift(report);
  db.save();

  db.logAudit('PUBLIC_CITIZEN', 'COMMUNITY_REPORT_SUBMITTED', report.id, `Community scam submission received (${report.senderType}: ${report.claimedSender})`, req.ip);

  res.status(201).json({
    success: true,
    message: 'Thank you for your report. It will be reviewed by ScamShield security operations.',
    reportId: report.id
  });
}
