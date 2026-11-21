import { describe, it, expect, beforeEach } from 'vitest';
import { db, hashPassword, verifyPassword } from './db/store.js';

describe('ScamShield Backend & Database Infrastructure', () => {
  it('correctly hashes and verifies cryptographic passwords with salt', () => {
    const password = 'TestSecurePassword!2026';
    const { salt, hash } = hashPassword(password);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    expect(verifyPassword(password, salt, hash)).toBe(true);
    expect(verifyPassword('WrongPassword', salt, hash)).toBe(false);
  });

  it('verifies default admin account credentials securely', () => {
    const admin = db.data.admin;
    expect(admin.username).toBe('admin');
    expect(admin.role).toBe('superadmin');
    expect(verifyPassword('ScamShield@2026!', admin.salt, admin.passwordHash)).toBe(true);
    expect(verifyPassword('WrongAdminPassword', admin.salt, admin.passwordHash)).toBe(false);
  });

  it('manages sessions and expires tokens correctly', () => {
    const session = db.createSession('admin', 'superadmin');
    expect(session.token).toBeDefined();
    expect(session.expiresAt).toBeGreaterThan(Date.now());

    const verified = db.verifySession(session.token);
    expect(verified).not.toBeNull();
    expect(verified.username).toBe('admin');

    db.destroySession(session.token);
    expect(db.verifySession(session.token)).toBeNull();
  });

  it('records immutable audit logs on state changes', () => {
    const initialCount = db.data.auditLogs.length;
    const entry = db.logAudit('TEST_RUNNER', 'UNIT_TEST_ACTION', 'TEST_TARGET', 'Testing audit log creation');
    expect(entry.id).toBeDefined();
    expect(entry.actor).toBe('TEST_RUNNER');
    expect(db.data.auditLogs.length).toBe(initialCount + 1);
  });

  it('enforces brute-force rate limiting after multiple failures', () => {
    const testIp = '192.168.1.99';
    db.resetLoginAttempts(testIp);

    for (let i = 0; i < 4; i++) {
      db.recordFailedLogin(testIp);
      expect(db.checkRateLimit(testIp).allowed).toBe(true);
    }

    // 5th failed attempt triggers lockout
    db.recordFailedLogin(testIp);
    const check = db.checkRateLimit(testIp);
    expect(check.allowed).toBe(false);
    expect(check.error).toContain('Too many failed login attempts');

    db.resetLoginAttempts(testIp);
    expect(db.checkRateLimit(testIp).allowed).toBe(true);
  });
});
