import { db } from '../db/store.js';

export function requireAdmin(req, res, next) {
  // Check cookie or Authorization Bearer header
  let token = req.cookies && req.cookies.scamshield_session;
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      error: 'Access Denied: Administrative authentication token required.'
    });
  }

  const session = db.verifySession(token);
  if (!session) {
    return res.status(401).json({
      error: 'Session Expired or Invalid: Please authenticate again.'
    });
  }

  req.admin = session;
  req.sessionToken = token;
  next();
}
