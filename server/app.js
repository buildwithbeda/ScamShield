import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { requireAdmin } from './middleware/auth.js';
import { handleLogin, handleLogout, handleGetMe } from './controllers/authController.js';
import {
  getStats,
  getRules,
  createRule,
  updateRule,
  deleteRule,
  getSources,
  updateSource,
  triggerSourceRefresh,
  getAdvisories,
  createAdvisory,
  deleteAdvisory,
  getFeedback,
  updateFeedbackStatus,
  getAuditLogs
} from './controllers/adminController.js';
import {
  getHealth,
  getPublicSources,
  getPublicAdvisories,
  submitPublicReport
} from './controllers/publicController.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Public API
app.get('/api/health', getHealth);
app.get('/api/intelligence/sources', getPublicSources);
app.get('/api/intelligence/advisories', getPublicAdvisories);
app.post('/api/feedback', submitPublicReport);

// Authentication API
app.post('/api/auth/login', handleLogin);
app.post('/api/auth/logout', handleLogout);
app.get('/api/auth/me', requireAdmin, handleGetMe);

// Admin API (Fully Protected)
app.get('/api/admin/stats', requireAdmin, getStats);
app.get('/api/admin/rules', requireAdmin, getRules);
app.post('/api/admin/rules', requireAdmin, createRule);
app.put('/api/admin/rules/:id', requireAdmin, updateRule);
app.delete('/api/admin/rules/:id', requireAdmin, deleteRule);

app.get('/api/admin/sources', requireAdmin, getSources);
app.put('/api/admin/sources/:id', requireAdmin, updateSource);
app.post('/api/admin/sources/refresh', requireAdmin, triggerSourceRefresh);

app.get('/api/admin/advisories', requireAdmin, getAdvisories);
app.post('/api/admin/advisories', requireAdmin, createAdvisory);
app.delete('/api/admin/advisories/:id', requireAdmin, deleteAdvisory);

app.get('/api/admin/feedback', requireAdmin, getFeedback);
app.put('/api/admin/feedback/:id', requireAdmin, updateFeedbackStatus);

app.get('/api/admin/audit-logs', requireAdmin, getAuditLogs);

export default app;
