import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

// Cryptographic Password Utility using standard PBKDF2
export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

export function verifyPassword(password, salt, storedHash) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

// Initial Default Dataset
function getDefaultData() {
  const defaultAdmin = hashPassword('ScamShield@2026!');

  return {
    admin: {
      username: 'admin',
      displayName: 'ScamShield Security Operations',
      salt: defaultAdmin.salt,
      passwordHash: defaultAdmin.hash,
      role: 'superadmin',
      createdAt: '2026-01-01T00:00:00.000Z',
      lastLogin: null
    },
    rules: [
      {
        id: 'rule-pan-kyc',
        name: 'PAN & Bank KYC Harvesting',
        category: 'Banking & Financial',
        regex: '(?:pan\\s+kyc|incomplete\\s+pan(?:\\s+kyc)?|update\\s+pan|pan\\s+card\\s+update)',
        severity: 'critical',
        score: 35,
        description: 'Solicits urgent PAN or KYC submission over message.',
        simpleReason: 'Asks for PAN card or KYC via text message, which banks never do.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'rule-acc-suspension',
        name: 'Account & Card Suspension Threat',
        category: 'Banking & Financial',
        regex: '(?:yono\\s+account(?:\\s+will\\s+be)?\\s+suspended|account\\s+(?:will\\s+be\\s+)?suspended|account\\s+(?:is\\s+)?blocked|card\\s+blocked)',
        severity: 'critical',
        score: 35,
        description: 'Threatens immediate account or card suspension to induce panic.',
        simpleReason: 'Threatens account or card blocking to force hasty compliance.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'rule-secret-credentials',
        name: 'Secret OTP & PIN Solicitation',
        category: 'Phishing & Credentials',
        regex: '(?:enter\\s+otp|share\\s+otp|send\\s+otp|provide\\s+mpin|enter\\s+mpin|cvv\\s+number|atm\\s+pin|banking\\s+password)',
        severity: 'critical',
        score: 35,
        description: 'Directly solicits one-time passwords, MPIN, CVV, or passwords.',
        simpleReason: 'Asks for secret OTP or banking PIN passwords.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'rule-courier-delivery',
        name: 'India Post / Courier Delivery Failure',
        category: 'Delivery & Courier',
        regex: '(?:parcel\\s+[a-z0-9]+\\s+could\\s+not\\s+be\\s+delivered|package\\s+returns|delivery\\s+failed|incomplete\\s+address|package\\s+held|redelivery\\s+fee)',
        severity: 'critical',
        score: 30,
        description: 'Bait claiming an undeliverable package requiring address update.',
        simpleReason: 'Fake delivery notification urging you to update address via link.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'rule-utility-disconnection',
        name: 'Electricity / Utility Cutoff Extortion',
        category: 'Urgency & Intimidation',
        regex: '(?:electricity\\s+power\\s+will\\s+be\\s+disconnected|power\\s+will\\s+be\\s+disconnected|bill\\s+was\\s+not\\s+updated|electricity\\s+bill\\s+unpaid)',
        severity: 'critical',
        score: 35,
        description: 'Threatens same-day power disconnection to force instant payment or phone calls.',
        simpleReason: 'Threatens power disconnection unless you call or pay immediately.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'rule-digital-arrest',
        name: 'Digital Arrest / Legal Coercion',
        category: 'Urgency & Intimidation',
        regex: '(?:legal\\s+action|police\\s+complaint|court\\s+summons|arrest\\s+warrant|cbi\\s+notice|digital\\s+arrest)',
        severity: 'critical',
        score: 35,
        description: 'Fabricates law enforcement or judicial warrants to coerce payment.',
        simpleReason: 'Threatens police arrest or court summons to terrify victims.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'rule-remote-tools',
        name: 'Remote Access Tool Abuse',
        category: 'Digital & Technology',
        regex: '(?:install\\s+(?:anydesk|teamviewer|quicksupport|rustdesk)|download\\s+apk|install\\s+banking\\s+app\\s+from\\s+link)',
        severity: 'critical',
        score: 35,
        description: 'Directs victim to download screen-sharing tools or rogue APKs.',
        simpleReason: 'Asks to download remote-control apps that grant phone takeover.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'rule-strict-deadline',
        name: 'Artificial Rush Deadline',
        category: 'Urgency & Intimidation',
        regex: '(?:within\\s+\\d+\\s*(?:hours?|hrs?|mins?|minutes?)|tonight\\s+at\\s+\\d+|before\\s+midnight)',
        severity: 'warning',
        score: 20,
        description: 'Imposes short countdown deadline to bypass critical thinking.',
        simpleReason: 'Uses strict time deadlines to panic the recipient.',
        enabled: true,
        isCustom: false,
        createdAt: '2026-01-01T00:00:00.000Z'
      }
    ],
    advisories: [
      {
        id: 'adv-01',
        title: 'Widespread Distribution of Fraudulent APK Files Mimicking PM Welfare Schemes',
        country: 'India',
        region: 'South Asia',
        category: 'Government Impersonation / Malware',
        publishingOrg: 'CERT-In (Indian Computer Emergency Response Team)',
        publishDate: '2024-03-12',
        freshnessLabel: 'Official Technical Advisory',
        summary: 'Attackers are distributing malicious Android APK packages via WhatsApp claiming to register citizens for Pradhan Mantri financial welfare schemes. Once installed, the APK requests SMS read permissions to siphon OTPs.',
        sourceUrl: 'https://www.cert-in.org.in',
        status: 'ACTIVE',
        priority: 'CRITICAL',
        verified: true
      },
      {
        id: 'adv-02',
        title: 'Surge in "Digital Arrest" Cyber Extortion Calls Impersonating Law Enforcement',
        country: 'India',
        region: 'South Asia',
        category: 'Identity & Impersonation',
        publishingOrg: 'I4C (Ministry of Home Affairs)',
        publishDate: '2024-04-05',
        freshnessLabel: 'Official Government Advisory',
        summary: 'The Indian Cyber Crime Coordination Centre issued an urgent citizen warning regarding syndicates posing as CBI, Customs, and State Police officers on video calls, placing citizens under fake "Digital Arrest" and extorting funds.',
        sourceUrl: 'https://cybercrime.gov.in',
        status: 'ACTIVE',
        priority: 'CRITICAL',
        verified: true
      },
      {
        id: 'adv-03',
        title: 'Advisory on Fraudulent Mobile Applications and Screen-Sharing App Abuse',
        country: 'India',
        region: 'South Asia',
        category: 'Banking & Financial',
        publishingOrg: 'Reserve Bank of India (RBI)',
        publishDate: '2024-02-18',
        freshnessLabel: 'Banking Ombudsman Publication',
        summary: 'RBI reiterated safety warnings against installing remote-access screen sharing apps (AnyDesk, TeamViewer) at the behest of callers posing as bank or utility executives.',
        sourceUrl: 'https://www.rbi.org.in',
        status: 'ACTIVE',
        priority: 'HIGH',
        verified: true
      },
      {
        id: 'adv-04',
        title: 'Transnational Operation "First Light" Dismantles Southeast Asian Boiler Rooms',
        country: 'International',
        region: 'Global',
        category: 'Investment Fraud',
        publishingOrg: 'INTERPOL',
        publishDate: '2024-06-20',
        freshnessLabel: 'International Law Enforcement Report',
        summary: 'INTERPOL coordination across 61 countries intercepted $257 Million in illicit funds and froze 6,745 bank accounts connected to industrial-scale investment and romance scam compounds.',
        sourceUrl: 'https://www.interpol.int',
        status: 'ACTIVE',
        priority: 'HIGH',
        verified: true
      }
    ],
    intelligenceSources: [
      {
        id: 'i4c',
        name: 'Indian Cyber Crime Coordination Centre (I4C)',
        acronym: 'I4C',
        country: 'India',
        agency: 'Ministry of Home Affairs, Government of India',
        focus: 'National cybercrime reporting, 1930 helpline operations, inter-bank fraud freezing',
        coverage: 'All 36 Indian States and Union Territories',
        url: 'https://cybercrime.gov.in',
        frequency: 'Periodic Parliamentary & Ministry releases',
        syncStatus: 'OFFICIAL_GOV_PARTNER',
        lastChecked: new Date().toISOString(),
        enabled: true
      },
      {
        id: 'cert-in',
        name: 'CERT-In (Indian Computer Emergency Response Team)',
        acronym: 'CERT-In',
        country: 'India',
        agency: 'Ministry of Electronics and Information Technology (MeitY)',
        focus: 'Cybersecurity incident response, technical vulnerability advisories',
        coverage: 'National cyber infrastructure and digital citizens',
        url: 'https://www.cert-in.org.in',
        frequency: 'Weekly technical advisories',
        syncStatus: 'LIVE_ADVISORY_MONITOR',
        lastChecked: new Date().toISOString(),
        enabled: true
      },
      {
        id: 'rbi',
        name: 'Reserve Bank of India (RBI)',
        acronym: 'RBI',
        country: 'India',
        agency: 'Central Bank of India',
        focus: 'Banking frauds, unauthorized electronic transactions, consumer awareness',
        coverage: 'Scheduled Commercial Banks, Payment System Operators (UPI/PPI)',
        url: 'https://www.rbi.org.in',
        frequency: 'Annual Report & Periodic Consumer Alerts',
        syncStatus: 'OFFICIAL_REGULATORY_FEED',
        lastChecked: new Date().toISOString(),
        enabled: true
      },
      {
        id: 'interpol',
        name: 'INTERPOL Financial Crime and Anti-Corruption Centre (IFCACC)',
        acronym: 'INTERPOL',
        country: 'International',
        agency: 'International Criminal Police Organization',
        focus: 'Transnational fraud syndicates, illicit fund tracking (I-GRIP), boiler rooms',
        coverage: '196 Member Countries',
        url: 'https://www.interpol.int',
        frequency: 'Operational releases & Global threat assessments',
        syncStatus: 'LAW_ENFORCEMENT_NETWORK',
        lastChecked: new Date().toISOString(),
        enabled: true
      },
      {
        id: 'ftc',
        name: 'Federal Trade Commission (FTC)',
        acronym: 'FTC',
        country: 'United States',
        agency: 'Independent US Government Consumer Protection Agency',
        focus: 'Consumer Sentinel Network, impersonation frauds, consumer restitution',
        coverage: 'United States & cross-border consumer fraud complaints',
        url: 'https://www.ftc.gov',
        frequency: 'Quarterly & Annual Data Books',
        syncStatus: 'PUBLIC_DATA_CONNECTOR',
        lastChecked: new Date().toISOString(),
        enabled: true
      },
      {
        id: 'scamwatch',
        name: 'Scamwatch (ACCC)',
        acronym: 'ACCC',
        country: 'Australia',
        agency: 'National Anti-Scam Centre (NASC)',
        focus: 'National scam reporting, disruption of scam websites, investment fraud',
        coverage: 'Australia nationwide',
        url: 'https://www.scamwatch.gov.au',
        frequency: 'Monthly reports & Annual Targeting Scams report',
        syncStatus: 'PUBLIC_DATA_CONNECTOR',
        lastChecked: new Date().toISOString(),
        enabled: true
      }
    ],
    feedback: [
      {
        id: 'fb-001',
        messageText: 'Dear customer, your electricity will be disconnected tonight at 9:30 PM. Call electricity officer 9876543210 immediately.',
        senderType: 'SMS',
        claimedSender: 'Electricity Dept',
        suspectedCategory: 'Utility Disconnection',
        reporterEmail: 'citizen.alert@example.org',
        status: 'REVIEWED_CONFIRMED_SCAM',
        submittedAt: '2026-02-14T09:12:00.000Z',
        adminNotes: 'Classic utility extortion scheme with fake officer mobile trap.'
      },
      {
        id: 'fb-002',
        messageText: 'Your parcel IN849201 failed delivery due to incomplete address. Update at https://indpost-track.xyz within 12h.',
        senderType: 'WhatsApp',
        claimedSender: 'India Post',
        suspectedCategory: 'Delivery & Courier',
        reporterEmail: 'delivery.tracker@example.com',
        status: 'PENDING_REVIEW',
        submittedAt: '2026-02-18T14:45:00.000Z',
        adminNotes: 'Automated ingestion flagged suspicious .xyz domain.'
      }
    ],
    auditLogs: [
      {
        id: 'log-bootstrap',
        timestamp: new Date().toISOString(),
        actor: 'SYSTEM',
        action: 'SYSTEM_INITIALIZED',
        target: 'DATABASE_BOOTSTRAP',
        ip: '127.0.0.1',
        details: 'ScamShield secure database initialized with pre-validated threat detection rules and intelligence providers.'
      }
    ]
  };
}

class Store {
  constructor() {
    this.data = null;
    this.sessions = new Map(); // token -> { username, role, expiresAt }
    this.loginAttempts = new Map(); // ip -> { count, lockedUntil }
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        this.data = getDefaultData();
        this.save();
      }
    } catch (err) {
      console.warn('Persistent DB read error, using in-memory default:', err.message);
      this.data = getDefaultData();
    }
  }

  save() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database file:', err.message);
    }
  }

  // Audit Log Management (Immutable append-only)
  logAudit(actor, action, target, details, ip = '127.0.0.1') {
    const entry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      target,
      details,
      ip
    };
    this.data.auditLogs.unshift(entry);
    // Keep last 1000 logs
    if (this.data.auditLogs.length > 1000) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 1000);
    }
    this.save();
    return entry;
  }

  // Rate Limiting
  checkRateLimit(ip) {
    const record = this.loginAttempts.get(ip);
    if (!record) return { allowed: true };

    const now = Date.now();
    if (record.lockedUntil && record.lockedUntil > now) {
      const waitMinutes = Math.ceil((record.lockedUntil - now) / 60000);
      return {
        allowed: false,
        error: `Too many failed login attempts. Locked out for ${waitMinutes} more minute(s).`
      };
    }
    if (record.lockedUntil && record.lockedUntil <= now) {
      this.loginAttempts.delete(ip);
      return { allowed: true };
    }
    return { allowed: true };
  }

  recordFailedLogin(ip) {
    const now = Date.now();
    const record = this.loginAttempts.get(ip) || { count: 0, lockedUntil: null };
    record.count += 1;
    if (record.count >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000; // 15 minutes lockout
    }
    this.loginAttempts.set(ip, record);
    return record;
  }

  resetLoginAttempts(ip) {
    this.loginAttempts.delete(ip);
  }

  // Session Token Management
  createSession(username, role = 'superadmin') {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 4 * 60 * 60 * 1000; // 4 hour session
    this.sessions.set(token, { username, role, expiresAt });
    return { token, expiresAt };
  }

  verifySession(token) {
    if (!token) return null;
    const session = this.sessions.get(token);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }
    return session;
  }

  destroySession(token) {
    if (token) {
      this.sessions.delete(token);
    }
  }
}

export const db = new Store();
