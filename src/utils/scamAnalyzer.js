/**
 * Modular Offline-First Rule-Based Scam Detection Engine for ScamShield.
 * Runs 100% locally in browser memory in <10ms with zero telemetry or network calls.
 * Evaluates messages across weighted indicators and generates transparent evidence-based findings.
 */

import { extractAndAnalyzeAllUrls } from './urlParser.js';

// Threat Patterns with Categories, Scores, and Plain-English Explanations

// 1. Banking and KYC Scams
const BANKING_KYC_PATTERNS = [
  {
    regex: /(?:pan\s+kyc|incomplete\s+pan(?:\s+kyc)?|update\s+pan|pan\s+card\s+update)/i,
    severity: 'critical',
    score: 35,
    category: 'Banking & Financial',
    tactic: 'PAN / KYC Harvesting',
    reason: 'Solicits urgent PAN or KYC submission over message, which Indian regulatory guidelines require customers to complete only via branch or verified banking apps.',
    simpleReason: 'This asks for your PAN card or KYC. Banks never ask for this through text messages.'
  },
  {
    regex: /(?:yono\s+account(?:\s+will\s+be)?\s+suspended|account\s+(?:will\s+be\s+)?suspended|account\s+(?:is\s+)?blocked|card\s+blocked)/i,
    severity: 'critical',
    score: 35,
    category: 'Banking & Financial',
    tactic: 'Imminent Account Suspension Threat',
    reason: 'Creates high psychological stress by threatening account or card blocking to induce hasty compliance.',
    simpleReason: 'It frightens you by claiming your bank account or card is blocked.'
  },
  {
    regex: /(?:install\s+(?:anydesk|teamviewer|quicksupport|rustdesk)|download\s+apk|install\s+banking\s+app\s+from\s+link)/i,
    severity: 'critical',
    score: 35,
    category: 'Digital & Technology',
    tactic: 'Remote Access Tool / Malicious App Abuse',
    reason: 'Directs victim to download screen-sharing tools or untrusted APKs that enable total device takeover and financial theft.',
    simpleReason: 'It asks you to install an app from a link. This can let scammers take control of your phone.'
  }
];

// 2. Phishing and Credential Theft
const CREDENTIAL_THEFT_PATTERNS = [
  {
    regex: /(?:enter\s+otp|share\s+otp|send\s+otp|provide\s+mpin|enter\s+mpin|cvv\s+number|atm\s+pin|banking\s+password)/i,
    severity: 'critical',
    score: 35,
    category: 'Phishing & Credentials',
    tactic: 'Secret Credential Harvesting',
    reason: 'Directly solicits one-time passwords (OTP), MPIN, CVV, or passwords that legitimate service providers repeatedly warn never to share.',
    simpleReason: 'It asks for your secret OTP, MPIN, or PIN password. Never share this with anyone!'
  },
  {
    regex: /(?:update\s+immediately(?:\s+at)?|verify\s+your\s+account|verify\s+identity|click\s+here\s+to\s+verify)/i,
    severity: 'warning',
    score: 25,
    category: 'Phishing & Credentials',
    tactic: 'Credential Phishing Call-to-Action',
    reason: 'Commands the recipient to visit an unverified portal to "verify" credentials or personal identity.',
    simpleReason: 'It tells you to click a link to verify your identity right away.'
  }
];

// 3. Urgency and Intimidation
const URGENCY_INTIMIDATION_PATTERNS = [
  {
    regex: /(?:within\s+\d+\s*(?:hours?|hrs?|mins?|minutes?)|in\s+\d+\s*hours?)/i,
    severity: 'critical',
    score: 20,
    category: 'Urgency & Intimidation',
    tactic: 'Strict Artificial Deadline',
    reason: 'Imposes an artificial countdown deadline (e.g. within 2 hours / 12 hrs) designed to bypass normal analytical scrutiny.',
    simpleReason: 'It gives a strict time limit (like "within 2 hours") to make you act without thinking.'
  },
  {
    regex: /(?:electricity\s+power\s+will\s+be\s+disconnected|power\s+will\s+be\s+disconnected|bill\s+was\s+not\s+updated|electricity\s+bill\s+unpaid)/i,
    severity: 'critical',
    score: 35,
    category: 'Urgency & Intimidation',
    tactic: 'Utility Disconnection Extortion',
    reason: 'Threatens immediate disconnection of electricity, water, or telecom services to induce panic payments or calls to scam numbers.',
    simpleReason: 'It threatens to cut off your electricity or power unless you pay or call immediately.'
  },
  {
    regex: /(?:tonight\s+at\s+\d+(?::\d+)?\s*(?:pm|am)?|by\s+tonight|before\s+midnight)/i,
    severity: 'critical',
    score: 20,
    category: 'Urgency & Intimidation',
    tactic: 'Imminent Same-Day Deadline',
    reason: 'Specifies an immediate same-day threat deadline (e.g. tonight at 9:30 PM or before midnight) to trigger panic and hasty compliance.',
    simpleReason: 'It claims something will expire or happen tonight unless you act immediately.'
  },
  {
    regex: /(?:legal\s+action|police\s+complaint|court\s+summons|arrest\s+warrant|cbi\s+notice)/i,
    severity: 'critical',
    score: 35,
    category: 'Urgency & Intimidation',
    tactic: 'Legal Threat / Digital Arrest Pretext',
    reason: 'Uses fabricated law enforcement or legal threats to coerce the recipient into paying money or submitting documents.',
    simpleReason: 'It threatens police or legal action to terrify you into complying.'
  },
  {
    regex: /(?:urgent:?|immediately|without\s+delay|immediate\s+action)/i,
    severity: 'warning',
    score: 15,
    category: 'Urgency & Intimidation',
    tactic: 'Coercive Urgency Language',
    reason: 'Employs coercive rush words to pressure the recipient into taking hasty action.',
    simpleReason: 'It uses rush words like "URGENT" or "IMMEDIATELY" to make you panic.'
  }
];

// 4. Delivery Scams
const DELIVERY_PATTERNS = [
  {
    regex: /(?:parcel\s+[a-z0-9]+\s+could\s+not\s+be\s+delivered|package\s+returns|delivery\s+failed|incomplete\s+address|package\s+held|redelivery\s+fee)/i,
    severity: 'critical',
    score: 30,
    category: 'Delivery & Courier',
    tactic: 'Courier Delivery Failure Bait',
    reason: 'Fabricates a failed postal or parcel delivery notice to entice the recipient to click a link or pay fake redelivery fees.',
    simpleReason: 'It falsely claims a package is stuck so you click a link and pay a fake fee.'
  },
  {
    regex: /(?:update\s+your\s+address|update\s+address\s+within)/i,
    severity: 'warning',
    score: 20,
    category: 'Delivery & Courier',
    tactic: 'Postal Address Update Bait',
    reason: 'Requests personal address and identity confirmation under the pretext of parcel redelivery.',
    simpleReason: 'It asks you to update your home address to receive a package.'
  }
];

// 5. Government Impersonation
const GOVERNMENT_PATTERNS = [
  {
    regex: /(?:pradhan\s+mantri|pm\s+yojana|welfare\s+yojana|cash\s+grant|subsidy\s+approved|direct\s+bank\s+transfer\s+has\s+been\s+approved|claim\s+your\s+cash\s+benefit)/i,
    severity: 'critical',
    score: 35,
    category: 'Government Impersonation',
    tactic: 'Government Welfare Grant Masquerade',
    reason: 'Impersonates official government welfare initiatives (such as PM Yojana or subsidies) promising unearned financial grants to harvest personal details and upfront fees.',
    simpleReason: 'It pretends to be a government scheme offering free money to trick you.'
  },
  {
    regex: /(?:tax\s+refund\s+approved|income\s*tax\s+refund\s+pending|claim\s+tax\s+refund)/i,
    severity: 'critical',
    score: 35,
    category: 'Government Impersonation',
    tactic: 'Tax Refund Phishing',
    reason: 'Promises unexpected tax refunds from the Income Tax Department to lure victims into providing banking passwords or card credentials.',
    simpleReason: 'It claims you have a tax refund to steal your bank details.'
  }
];

// 6. Financial, UPI, Lottery & Job Scams
const FINANCIAL_PATTERNS = [
  {
    regex: /(?:cash\s+refund\s+of\s+rs|received\s+a\s+cash\s+refund|refund\s+from\s+merchant|enter\s+upi\s+pin\s+to\s+(?:accept|receive)|receive\s+in\s+bank\s+account)/i,
    severity: 'critical',
    score: 35,
    category: 'Payment & Financial',
    tactic: 'UPI Refund / Payment Reversal Trap',
    reason: 'Exploits UPI mechanics by instructing the victim to enter their UPI PIN to "receive" money. Entering a UPI PIN always debits funds from an account.',
    simpleReason: 'It asks you to enter your UPI PIN to "receive" money. In UPI, entering a PIN ALWAYS sends money out of your account!'
  },
  {
    regex: /(?:won\s+rs\.?\s*[\d,]+|kbc(?:\s+all\s+india)?\s*(?:sim\s*card\s*)?lucky\s*draw|lottery\s+winner|prize\s+money|lottery\s+amount)/i,
    severity: 'critical',
    score: 35,
    category: 'Lottery & Advance Fee',
    tactic: 'Lottery & Lucky Draw Phishing',
    reason: 'Claims the recipient has won a large lottery or prize (e.g. KBC / Lucky Draw) in an event they never entered, aiming to extort advance "clearance" fees.',
    simpleReason: 'It claims you won a lottery or lucky draw you never entered, to make you pay fake fees.'
  },
  {
    regex: /(?:earn\s+rs\.?\s*\d+\s+to\s+rs\.?\s*\d+\s+daily|liking\s+youtube\s+videos|rating\s+hotels|part-time\s+online\s+job|work\s+from\s+home\s+job|no\s+experience\s+needed.*whatsapp)/i,
    severity: 'warning',
    score: 25,
    category: 'Employment & Task Scam',
    tactic: 'Prepaid Task / Part-Time Job Lure',
    reason: 'Promises high daily pay for trivial tasks (e.g. liking YouTube videos or rating maps), which leads to Telegram/WhatsApp groups coercing upfront investments.',
    simpleReason: 'It promises easy daily money for liking videos or rating hotels. This is a common trap to steal savings.'
  },
  {
    regex: /(?:guaranteed\s+(?:return|profit)|double\s+your\s+money|crypto\s+investment\s+opportunity|forex\s+trading\s+profits)/i,
    severity: 'critical',
    score: 35,
    category: 'Investment Fraud',
    tactic: 'High-Yield Investment Fraud',
    reason: 'Promises unrealistic guaranteed returns or fast cryptocurrency wealth to lure victims into fraudulent trading platforms.',
    simpleReason: 'It promises guaranteed profits or doubling your money. Legitimate investments never guarantee impossible returns.'
  }
];

// Indian Phone Number Patterns
const PHONE_PATTERNS = {
  officerMobileRegex: /(?:officer|helpline|executive|manager|call|contact|whatsapp)\s*(?:at\s*)?([6-9]\d{9})\b/i,
  tollFreeRegex: /(?:call\s*)?(1800[-\s]?\d{2,4}[-\s]?\d{3,4})\b/i,
  shortcodesRegex: /\b(1930|14404|112|100)\b/
};

// Known brands frequently targeted for impersonation
const BRAND_IDENTIFIERS = [
  { name: 'State Bank of India (SBI)', match: /\b(?:sbi|yono|state\s+bank\s+of\s+india)\b/i },
  { name: 'India Post', match: /\b(?:india\s+post|indiapost|indpost|speed\s*post)\b/i },
  { name: 'Electricity Department', match: /\b(?:electricity|power\s+will\s+be|bescom|tneb|mseb|discom)\b/i },
  { name: 'Government of India (PM Yojana)', match: /\b(?:pradhan\s+mantri|pm\s+yojana|welfare\s+yojana)\b/i },
  { name: 'Paytm / UPI Provider', match: /\b(?:paytm|phonepe|gpay|google\s*pay)\b/i },
  { name: 'HDFC Bank', match: /\bhdfc(?:\s+bank)?\b/i },
  { name: 'ICICI Bank', match: /\bicici(?:\s+bank)?\b/i },
  { name: 'Income Tax Department', match: /\b(?:income\s*tax|incometax|pan\s+card|pan\s+kyc)\b/i },
  { name: 'KBC Lottery', match: /\bkbc\b/i }
];

/**
 * Finds all matched phrase spans in the message without duplicate/overlapping indexes.
 */
function findMatchedPhrases(text, parsedUrls) {
  const matches = [];

  const allRules = [
    ...BANKING_KYC_PATTERNS,
    ...CREDENTIAL_THEFT_PATTERNS,
    ...URGENCY_INTIMIDATION_PATTERNS,
    ...DELIVERY_PATTERNS,
    ...GOVERNMENT_PATTERNS,
    ...FINANCIAL_PATTERNS
  ];

  for (const item of allRules) {
    const match = item.regex.exec(text);
    if (match) {
      matches.push({
        phrase: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        reason: item.reason,
        simpleReason: item.simpleReason,
        severity: item.severity,
        tactic: item.tactic,
        category: item.category
      });
    }
  }

  // Check for Suspicious Personal Mobile Phone Traps
  const officerMatch = PHONE_PATTERNS.officerMobileRegex.exec(text);
  if (officerMatch) {
    matches.push({
      phrase: officerMatch[0],
      startIndex: officerMatch.index,
      endIndex: officerMatch.index + officerMatch[0].length,
      reason: `Directs users to a personal 10-digit mobile number (${officerMatch[1] || officerMatch[0]}) acting as an official officer or helpline.`,
      simpleReason: `Scammers give personal 10-digit phone numbers while pretending to be "bank" or "government" officers.`,
      severity: 'critical',
      tactic: 'Unofficial Support Vector',
      category: 'Impersonation & Support Trap'
    });
  }

  // Check for Parsed URL flags
  for (const urlInfo of parsedUrls) {
    const index = text.indexOf(urlInfo.rawUrl);
    if (index !== -1) {
      const topFlag = urlInfo.flags[0];
      const severity = urlInfo.flags.some(f => f.severity === 'critical') ? 'critical' : 'warning';
      matches.push({
        phrase: urlInfo.rawUrl,
        startIndex: index,
        endIndex: index + urlInfo.rawUrl.length,
        reason: topFlag ? topFlag.description : 'Untrusted external hyperlink in unsolicited message.',
        simpleReason: topFlag ? topFlag.simpleDescription : 'Suspicious link that could lead to a fraudulent website.',
        severity,
        tactic: topFlag ? topFlag.label : 'Untrusted Web Link',
        category: 'Suspicious Hyperlink'
      });
    }
  }

  // Remove overlapping phrase matches, prioritizing higher severity
  matches.sort((a, b) => a.startIndex - b.startIndex || b.phrase.length - a.phrase.length);
  const deduped = [];
  let lastEnd = -1;

  for (const m of matches) {
    if (m.startIndex >= lastEnd) {
      deduped.push(m);
      lastEnd = m.endIndex;
    }
  }

  return deduped;
}

/**
 * Main Offline Scam Detection Engine
 * @param {string} rawText Raw SMS, WhatsApp text, Email, or standalone URL
 * @returns {Object} Structured analysis result
 */
export function analyzeScamMessage(rawText) {
  const startTime = performance.now();
  const text = (rawText || '').trim();

  // Baseline for empty / blank message
  if (!text) {
    return {
      score: 0,
      riskLevel: 'LOW',
      verdict: 'LOW RISK',
      verdictColor: 'green',
      evidenceStrength: 'INSUFFICIENT',
      scamCategories: [],
      impersonatedBrand: null,
      summary: 'No message content provided. Paste an SMS, WhatsApp message, email, or link to inspect.',
      simpleSummary: 'Paste or type a message above to check if it is safe or a scam.',
      tactics: [],
      matchedPhrases: [],
      urls: [],
      phoneNumbers: { personalMobile: null, tollFree: null },
      nextSteps: [
        {
          id: 'paste-message',
          action: 'Paste or select an educational preset message to perform offline threat analysis.',
          simpleAction: 'Choose one of the sample messages or paste a text from your phone.',
          type: 'safe'
        }
      ],
      whatsappWarning: '',
      analysisTimestamp: new Date().toISOString(),
      analysisMethod: 'Offline Deterministic Heuristic Engine',
      disclaimer: 'Heuristic analysis inspects structural and linguistic markers offline. It cannot guarantee absolute authenticity or replace verified threat intelligence.',
      analysisTimeMs: +(performance.now() - startTime).toFixed(2)
    };
  }

  // Step 1: Extract and analyze URLs
  const urls = extractAndAnalyzeAllUrls(text);

  // Step 2: Detect Impersonated Brand
  let impersonatedBrand = null;
  for (const brand of BRAND_IDENTIFIERS) {
    if (brand.match.test(text)) {
      impersonatedBrand = brand.name;
      break;
    }
  }
  for (const u of urls) {
    if (u.brandSpoofing?.isSpoofed) {
      impersonatedBrand = impersonatedBrand || u.brandSpoofing.brand;
    }
  }

  // Step 3: Evaluate Threat Weights
  let harvestingScore = 0;
  let urlThreatScore = 0;
  let urgencyScore = 0;
  let phoneThreatScore = 0;
  let financialThreatScore = 0;
  let deliveryThreatScore = 0;
  let governmentThreatScore = 0;
  let safetyDampener = 0;

  const detectedTactics = [];
  const detectedCategories = new Set();

  // Rule Evaluator Helper
  const evaluateRuleGroup = (ruleGroup, scoreTracker) => {
    let maxGroupScore = 0;
    for (const item of ruleGroup) {
      if (item.regex.test(text)) {
        maxGroupScore = Math.max(maxGroupScore, item.score);
        detectedCategories.add(item.category);
        if (!detectedTactics.some(t => t.title === item.tactic)) {
          detectedTactics.push({
            id: item.tactic.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: item.tactic,
            category: item.category,
            severity: item.severity,
            description: item.reason,
            simpleExplanation: item.simpleReason,
            icon: item.severity === 'critical' ? 'AlertTriangle' : 'Clock'
          });
        }
      }
    }
    return maxGroupScore;
  };

  harvestingScore = evaluateRuleGroup(BANKING_KYC_PATTERNS);
  harvestingScore = Math.max(harvestingScore, evaluateRuleGroup(CREDENTIAL_THEFT_PATTERNS));
  urgencyScore = evaluateRuleGroup(URGENCY_INTIMIDATION_PATTERNS);
  deliveryThreatScore = evaluateRuleGroup(DELIVERY_PATTERNS);
  governmentThreatScore = evaluateRuleGroup(GOVERNMENT_PATTERNS);
  financialThreatScore = evaluateRuleGroup(FINANCIAL_PATTERNS);

  // URL & Domain Traps (+35 max)
  if (urls.length > 0) {
    detectedCategories.add('Suspicious Hyperlinks');
    for (const u of urls) {
      if (u.brandSpoofing.isSpoofed) {
        urlThreatScore = Math.max(urlThreatScore, 35);
        detectedTactics.push({
          id: 'brand-domain-spoof',
          title: `Lookalike Domain Spoofing (${u.brandSpoofing.brand || 'Brand'})`,
          category: 'Suspicious Hyperlinks',
          severity: 'critical',
          description: u.brandSpoofing.explanation,
          simpleExplanation: u.brandSpoofing.simpleExplanation,
          icon: 'Globe'
        });
      }
      if (u.isShortener) {
        urlThreatScore = Math.max(urlThreatScore, 35);
        detectedTactics.push({
          id: 'url-shortener-obfuscation',
          title: 'Obfuscated Link Redirection',
          category: 'Suspicious Hyperlinks',
          severity: 'critical',
          description: 'Hides true destination server behind a public URL shortener to bypass reputation filters.',
          simpleExplanation: 'Short link designed to hide where it really sends you.',
          icon: 'ExternalLink'
        });
      }
      if (u.isRiskyTld) {
        urlThreatScore = Math.max(urlThreatScore, 20);
        detectedTactics.push({
          id: 'risky-tld',
          title: `Disposable TLD Infrastructure (${u.tld})`,
          category: 'Suspicious Hyperlinks',
          severity: 'warning',
          description: `Uses abuse-prone top-level domain (${u.tld}) frequently leveraged by disposable phishing kits.`,
          simpleExplanation: `The web address ends in ${u.tld}, a cheap domain type favored by fraudsters.`,
          icon: 'AlertTriangle'
        });
      }
      if (u.isHttpOnly) {
        urlThreatScore = Math.max(urlThreatScore, 15);
        detectedTactics.push({
          id: 'unencrypted-http',
          title: 'Unencrypted Protocol (Plain HTTP)',
          category: 'Suspicious Hyperlinks',
          severity: 'warning',
          description: 'Website operates without transport layer security (TLS/HTTPS). Authentic portals never run over unencrypted HTTP.',
          simpleExplanation: 'The connection is completely unencrypted and insecure.',
          icon: 'Unlock'
        });
      }
      if (u.isIpAddress) {
        urlThreatScore = Math.max(urlThreatScore, 35);
        detectedTactics.push({
          id: 'raw-ip-address',
          title: 'Direct IP Address Host',
          category: 'Suspicious Hyperlinks',
          severity: 'critical',
          description: 'Directs victim directly to a numerical IP host rather than an authenticated domain.',
          simpleExplanation: 'Uses a raw computer IP address instead of a real business website.',
          icon: 'Server'
        });
      }
    }
  }

  // Unverified Personal Mobile Numbers acting as official officers
  let detectedPersonalMobile = null;
  const officerMatch = PHONE_PATTERNS.officerMobileRegex.exec(text);
  if (officerMatch) {
    detectedPersonalMobile = officerMatch[1];
    phoneThreatScore = 20;
    detectedCategories.add('Impersonation & Support Trap');
    detectedTactics.push({
      id: 'personal-mobile-officer-trap',
      title: 'Fake Officer Personal Mobile Trap',
      category: 'Impersonation & Support Trap',
      severity: 'critical',
      description: `Disguises an unverified personal 10-digit mobile number (${detectedPersonalMobile}) as an official government or utility officer.`,
      simpleExplanation: `Scammers give personal 10-digit phone numbers while pretending to be "Electricity" or "Bank" officers.`,
      icon: 'PhoneCall'
    });
  }

  // Toll-Free and Legitimate Indicators Check
  const tollFreeMatch = PHONE_PATTERNS.tollFreeRegex.exec(text);
  const detectedTollFree = tollFreeMatch ? tollFreeMatch[1] : null;

  // Safety Dampeners
  const hasMaskedAccount = /\b(?:a\/c|acct|card)\s*(?:no\.?\s*)?(?:x{2,}|\*{2,})\d{2,4}\b/i.test(text);
  const hasUpiRef = /\b(?:upi\s+ref|rrn|imps\s+ref|ref\s+no\.?)\s*[a-z0-9]+\b/i.test(text);
  const hasAntiFraudWarning = /(?:do\s+not\s+share\s+otp|never\s+share\s+otp|never\s+share\s+password|visit\s+official\s+bank\s+app)/i.test(text);
  const hasZeroLinks = urls.length === 0;

  if (hasMaskedAccount && hasZeroLinks && (hasUpiRef || hasAntiFraudWarning || detectedTollFree)) {
    safetyDampener = 35;
  }

  // Calculate final risk score with weighted caps
  const primaryThreatScore = Math.max(
    harvestingScore,
    deliveryThreatScore,
    governmentThreatScore,
    financialThreatScore
  );

  let rawScore = primaryThreatScore + urlThreatScore + urgencyScore + phoneThreatScore - safetyDampener;

  // Score clamping
  const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Standardized Verdicts per Section 6
  let verdict = 'LOW RISK';
  let riskLevel = 'LOW';
  let verdictColor = 'green';
  let evidenceStrength = 'WEAK';

  if (finalScore >= 75) {
    verdict = 'CRITICAL RISK';
    riskLevel = 'CRITICAL';
    verdictColor = 'red';
    evidenceStrength = 'STRONG';
  } else if (finalScore >= 50) {
    verdict = 'HIGH RISK';
    riskLevel = 'HIGH';
    verdictColor = 'red';
    evidenceStrength = 'STRONG';
  } else if (finalScore >= 25) {
    verdict = 'CAUTION';
    riskLevel = 'MODERATE';
    verdictColor = 'amber';
    evidenceStrength = 'MODERATE';
  } else {
    verdict = 'LOW RISK';
    riskLevel = 'LOW';
    verdictColor = 'green';
    evidenceStrength = hasMaskedAccount ? 'MODERATE' : 'WEAK';
  }

  // Generate Matched Phrases for inline highlighting
  const matchedPhrases = findMatchedPhrases(text, urls);

  // Generate Summaries
  let summary = '';
  let simpleSummary = '';

  if (verdict === 'CRITICAL RISK' || verdict === 'HIGH RISK') {
    summary = `CRITICAL FRAUD SIGNATURE: Message exhibits high-confidence indicators of ${Array.from(detectedCategories).slice(0, 2).join(' and ')} targeting ${impersonatedBrand || 'recipient'}. Immediate danger of financial theft or credential compromise.`;
    simpleSummary = `🚨 DANGER: This message is a SCAM pretending to be ${impersonatedBrand || 'an official organisation'}. Do NOT click any links, do NOT pay money, and do NOT call the phone number!`;
  } else if (verdict === 'CAUTION') {
    summary = `CAUTION ADVISED: Message contains suspicious patterns (${Array.from(detectedCategories).slice(0, 2).join(', ')}). Proceed with strict caution and verify through independently established channels.`;
    simpleSummary = `⚠️ WARNING: This message looks suspicious. Do NOT click any links or share information until you verify it with a trusted family member.`;
  } else {
    summary = `LOW RISK DETECTED: No malicious URLs, credential harvesting traps, or coercive threat patterns identified. Displays standard characteristics of legitimate automated communication. Note: Heuristics cannot guarantee absolute authenticity.`;
    simpleSummary = `✅ LIKELY SAFE: This message appears genuine. As a general rule, never share your OTP, MPIN, or bank passwords with anyone.`;
  }

  // Actionable Next Steps
  const nextSteps = [];
  if (verdict === 'CRITICAL RISK' || verdict === 'HIGH RISK') {
    nextSteps.push({
      id: 'no-click',
      action: 'Do NOT click any links or open web addresses in this message.',
      simpleAction: 'Do NOT tap or click any link in this message.',
      type: 'critical'
    });
    if (detectedPersonalMobile) {
      nextSteps.push({
        id: 'no-call',
        action: `Do NOT call the 10-digit personal mobile number (${detectedPersonalMobile}) listed in the message.`,
        simpleAction: `Do NOT call ${detectedPersonalMobile}. Official officers never use personal mobile numbers for official duties.`,
        type: 'critical'
      });
    }
    nextSteps.push({
      id: 'no-otp',
      action: 'Never enter your UPI PIN to "receive" money or share OTPs with anyone.',
      simpleAction: 'Never enter your UPI PIN to receive money. PIN is only for sending money.',
      type: 'critical'
    });
    nextSteps.push({
      id: 'report-cybercrime',
      action: 'Report the cyber fraud incident to the National Cyber Crime Helpline: dial 1930 or visit cybercrime.gov.in.',
      simpleAction: 'Report this fraud by calling 1930 (National Cyber Crime Helpline).',
      type: 'caution'
    });
    nextSteps.push({
      id: 'verify-official',
      action: 'Verify directly via the bank or organisation’s official website or customer care app.',
      simpleAction: 'If worried, open your official banking app directly—do not trust this message.',
      type: 'safe'
    });
  } else if (verdict === 'CAUTION') {
    nextSteps.push({
      id: 'verify-sender',
      action: 'Independently verify sender identity via established official channels before clicking links.',
      simpleAction: 'Ask someone you trust or check your official account before tapping anything.',
      type: 'caution'
    });
    nextSteps.push({
      id: 'check-link',
      action: 'Inspect destination domain carefully using ScamShield’s URL Security Checker.',
      simpleAction: 'Check the link address breakdown below to see the real website owner.',
      type: 'caution'
    });
  } else {
    nextSteps.push({
      id: 'routine-safety',
      action: 'Legitimate banks will never ask for your PIN, CVV, or full password via phone or SMS.',
      simpleAction: 'Remember: Your bank will NEVER ask you for your PIN or OTP.',
      type: 'safe'
    });
    nextSteps.push({
      id: 'keep-vigilant',
      action: 'Always cross-check account balances in your official banking application.',
      simpleAction: 'You can safely check your balance in your official banking app.',
      type: 'safe'
    });
  }

  // WhatsApp Warning Template
  let whatsappWarning = '';
  if (verdict === 'CRITICAL RISK' || verdict === 'HIGH RISK') {
    whatsappWarning = `🚨 *SCAM ALERT WARNING* 🚨\n\nI scanned this suspicious message with *ScamShield* and it was flagged as *${verdict}* (Risk Score: ${finalScore}/100).\n\n⚠️ *Impersonation:* ${impersonatedBrand || 'Unverified Entity'}\n⚠️ *Warning Signs:* ${Array.from(detectedCategories).slice(0, 2).join(', ')}\n\n🛑 *What to do:*\n• DO NOT click any links\n• DO NOT call numbers mentioned in the message\n• NEVER enter your UPI PIN to "receive" money\n• Report cyber fraud to helpline *1930*.\n\nPlease be careful and stay safe!`;
  } else if (verdict === 'CAUTION') {
    whatsappWarning = `⚠️ *CAUTION: Suspicious Message Detected*\n\nThis message scored *${finalScore}/100* on ScamShield.\n\nPlease verify independently before clicking any links or responding. Never share OTPs or banking PINs with anyone.`;
  } else {
    whatsappWarning = `✅ *Verified with ScamShield*\n\nThis message appears to be a legitimate notification (Risk Score: ${finalScore}/100). Always remember never to share your secret OTP or PIN with anyone.`;
  }

  const analysisTimeMs = +(performance.now() - startTime).toFixed(2);

  // Deep-link to corresponding Academy educational lesson
  const recommendedLesson = getRecommendedAcademyLesson(text, detectedCategories);

  return {
    score: finalScore,
    riskLevel,
    verdict,
    verdictColor,
    evidenceStrength,
    scamCategories: Array.from(detectedCategories),
    impersonatedBrand,
    summary,
    simpleSummary,
    tactics: detectedTactics,
    matchedPhrases,
    urls,
    phoneNumbers: {
      personalMobile: detectedPersonalMobile,
      tollFree: detectedTollFree
    },
    nextSteps,
    whatsappWarning,
    recommendedLesson,
    analysisTimestamp: new Date().toISOString(),
    analysisMethod: 'Offline Deterministic Heuristic Engine',
    disclaimer: 'Heuristic analysis inspects structural and linguistic markers offline. It cannot guarantee absolute authenticity or replace verified threat intelligence.',
    analysisTimeMs
  };
}

/**
 * Determines the most pedagogically relevant ScamShield Academy lesson.
 */
function getRecommendedAcademyLesson(text, detectedCategories) {
  const t = text.toLowerCase();
  if (/pan\s+kyc|yono|sbi|kyc\s+update/i.test(t)) {
    return {
      id: 'fake-kyc',
      title: 'Fake Bank KYC & Account Suspension Scam',
      category: 'Banking & Financial',
      reason: 'Direct match for banking KYC harvesting and account suspension threats.'
    };
  }
  if (/otp|mpin|cvv|secret\s+pin/i.test(t)) {
    return {
      id: 'otp-theft',
      title: 'OTP, MPIN & Credential Phishing Scam',
      category: 'Banking & Financial',
      reason: 'Direct match for secret credential and verification code solicitation.'
    };
  }
  if (/parcel|package|delivery|india\s*post|courier/i.test(t)) {
    return {
      id: 'delivery-scams',
      title: 'Fake Delivery & Courier Address Update Scam',
      category: 'Delivery & Courier',
      reason: 'Direct match for postal address failure and token fee lures.'
    };
  }
  if (/digital\s+arrest|police|cbi|customs|court\s+summons|arrest\s+warrant/i.test(t)) {
    return {
      id: 'digital-arrest',
      title: 'Digital Arrest & Law Enforcement Coercion Scam',
      category: 'Identity & Impersonation',
      reason: 'Direct match for law enforcement impersonation and digital arrest intimidation.'
    };
  }
  if (/electricity|power\s+will\s+be|bescom|tneb|mseb|officer\s+\d{10}/i.test(t)) {
    return {
      id: 'fake-customer-care',
      title: 'Fake Helpline & Customer Care Search Scam',
      category: 'Identity & Impersonation',
      reason: 'Direct match for utility cutoff threats and fake officer personal phone traps.'
    };
  }
  if (/kbc|lottery|lucky\s+draw|prize|25,00,000/i.test(t)) {
    return {
      id: 'lottery-kbc-scams',
      title: 'KBC & National Lottery Advance-Fee Scam',
      category: 'Lottery, Jobs & Advance Fee',
      reason: 'Direct match for advance-fee lottery prizes and SIM card lucky draws.'
    };
  }
  if (/part[\s-]time\s+job|youtube\s+like|telegram\s+task|work\s+from\s+home/i.test(t)) {
    return {
      id: 'part-time-job-scams',
      title: 'Part-Time Task & YouTube "Like" Job Scam',
      category: 'Lottery, Jobs & Advance Fee',
      reason: 'Direct match for prepaid work-from-home task and YouTube video rating scams.'
    };
  }
  if (/qr\s+code/i.test(t)) {
    return {
      id: 'qr-code-fraud',
      title: 'QR Code "Receive Money" Scam',
      category: 'Banking & Financial',
      reason: 'Direct match for marketplace QR code payment deception.'
    };
  }
  if (/refund|cashback|collect\s+request/i.test(t)) {
    return {
      id: 'upi-refund-scam',
      title: 'UPI Cash Refund & Payment Collection Fraud',
      category: 'Banking & Financial',
      reason: 'Direct match for UPI collect requests and cashback PIN deception.'
    };
  }
  if (/anydesk|teamviewer|quicksupport|download\s+apk/i.test(t)) {
    return {
      id: 'remote-access-apps',
      title: 'Malicious APK & Screen-Sharing App Takeover',
      category: 'Digital & Technology',
      reason: 'Direct match for remote screen-sharing tools and third-party APK files.'
    };
  }
  if (/pm\s+yojana|pradhan\s+mantri|welfare|subsidy/i.test(t)) {
    return {
      id: 'gov-subsidy-fraud',
      title: 'Government Subsidy & PM Yojana Phishing',
      category: 'Identity & Impersonation',
      reason: 'Direct match for government scheme impersonation.'
    };
  }
  return {
    id: 'sms-phishing',
    title: 'Smishing (SMS Phishing) & Malicious Links',
    category: 'Digital & Technology',
    reason: 'General match for deceptive links and unsolicited SMS bait.'
  };
}
