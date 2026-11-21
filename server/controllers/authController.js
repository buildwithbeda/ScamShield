import { db, verifyPassword } from '../db/store.js';

export function handleLogin(req, res) {
  const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
  const rateCheck = db.checkRateLimit(ip);

  if (!rateCheck.allowed) {
    db.logAudit('ANONYMOUS', 'LOGIN_LOCKED', 'AUTH_SYSTEM', rateCheck.error, ip);
    return res.status(429).json({ error: rateCheck.error });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const admin = db.data.admin;

  if (username !== admin.username) {
    const record = db.recordFailedLogin(ip);
    db.logAudit('ANONYMOUS', 'LOGIN_FAILED', 'AUTH_SYSTEM', `Failed login attempt for unknown user: ${username}`, ip);
    const remaining = Math.max(0, 5 - record.count);
    return res.status(401).json({
      error: `Invalid credentials. ${remaining > 0 ? `${remaining} attempts remaining before temporary lockout.` : 'Account locked.'}`
    });
  }

  const isValid = verifyPassword(password, admin.salt, admin.passwordHash);

  if (!isValid) {
    const record = db.recordFailedLogin(ip);
    db.logAudit(username, 'LOGIN_FAILED', 'AUTH_SYSTEM', 'Incorrect administrative password attempt.', ip);
    const remaining = Math.max(0, 5 - record.count);
    return res.status(401).json({
      error: `Invalid administrative credentials. ${remaining > 0 ? `${remaining} attempts remaining before temporary lockout.` : 'Account locked.'}`
    });
  }

  // Login Success
  db.resetLoginAttempts(ip);
  const session = db.createSession(admin.username, admin.role);
  admin.lastLogin = new Date().toISOString();
  db.save();

  db.logAudit(admin.username, 'LOGIN_SUCCESS', 'AUTH_SYSTEM', 'Administrator authenticated successfully.', ip);

  // Set HTTP-only secure cookie
  res.cookie('scamshield_session', session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 4 * 60 * 60 * 1000 // 4 hours
  });

  return res.json({
    success: true,
    token: session.token,
    admin: {
      username: admin.username,
      displayName: admin.displayName,
      role: admin.role,
      lastLogin: admin.lastLogin
    }
  });
}

export function handleLogout(req, res) {
  const token = req.sessionToken || (req.cookies && req.cookies.scamshield_session);
  const ip = req.ip || '127.0.0.1';

  if (token) {
    db.destroySession(token);
  }

  res.clearCookie('scamshield_session');
  db.logAudit(req.admin ? req.admin.username : 'ADMIN', 'LOGOUT', 'AUTH_SYSTEM', 'Administrator logged out.', ip);

  return res.json({ success: true, message: 'Logged out successfully.' });
}

export function handleGetMe(req, res) {
  const admin = db.data.admin;
  return res.json({
    authenticated: true,
    admin: {
      username: admin.username,
      displayName: admin.displayName,
      role: admin.role,
      lastLogin: admin.lastLogin
    }
  });
}
