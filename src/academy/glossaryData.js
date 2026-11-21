/**
 * Searchable Glossary of Cybersecurity Terms for ScamShield Academy
 */

export const CYBER_GLOSSARY = [
  {
    term: 'Smishing',
    category: 'Attack Vector',
    definition: 'A form of phishing that uses fraudulent SMS (text messages) to trick individuals into revealing personal credentials or clicking malicious links.'
  },
  {
    term: 'Phishing',
    category: 'Attack Vector',
    definition: 'Social engineering attack where fraudsters impersonate trustworthy entities (banks, government agencies) via email or websites to steal sensitive information.'
  },
  {
    term: 'Vishing',
    category: 'Attack Vector',
    definition: 'Voice Phishing: phone calls from scammers pretending to be bank officials, police, or tech support to extract OTPs or coerce money transfers.'
  },
  {
    term: 'OTP (One-Time Password)',
    category: 'Authentication',
    definition: 'A dynamic, time-sensitive security code sent to your registered mobile/email to authorize transactions or logins. It should NEVER be shared with anyone.'
  },
  {
    term: 'MPIN',
    category: 'Authentication',
    definition: 'Mobile Banking Personal Identification Number. A 4 to 6 digit secret passcode required to authorize UPI payments or mobile banking access.'
  },
  {
    term: 'Digital Arrest',
    category: 'Extortion Scam',
    definition: 'A coercive cyber scam where criminals impersonating police or CBI intimidate victims over continuous video calls and demand funds to clear their name. It has NO legal basis in India.'
  },
  {
    term: 'Remote Access Tool (RAT)',
    category: 'Software Threat',
    definition: 'Legitimate applications (e.g. AnyDesk, TeamViewer) abused by scammers to view and control a victim’s smartphone screen and steal banking passwords live.'
  },
  {
    term: 'Malicious APK',
    category: 'Software Threat',
    definition: 'An unverified Android application package distributed via WhatsApp or web links that circumvents official app stores to steal SMS, OTPs, and contacts.'
  },
  {
    term: 'Lookalike Domain (Typosquatting)',
    category: 'Infrastructure',
    definition: 'A fake web address intentionally registered to resemble an authentic domain (e.g., `sbi-kyc.support-portal.xyz` instead of `sbi.co.in`).'
  },
  {
    term: 'TLD (Top-Level Domain)',
    category: 'Infrastructure',
    definition: 'The final segment of a domain name (e.g. `.gov.in`, `.com`, `.xyz`). Disposable TLDs like `.top` and `.xyz` are heavily abused by phishing operators.'
  },
  {
    term: 'HTTPS / TLS',
    category: 'Encryption',
    definition: 'Hypertext Transfer Protocol Secure. Encrypts data between browser and server. Note: HTTPS does NOT guarantee a website is legitimate—scammers also use HTTPS.'
  },
  {
    term: 'URL Shortener',
    category: 'Obfuscation',
    definition: 'Services like bit.ly or tinyurl that convert long links into short redirects, frequently abused by fraudsters to conceal malicious destinations.'
  },
  {
    term: 'SIM Swap Fraud',
    category: 'Identity Theft',
    definition: 'A scam where fraudsters trick telecom operators into issuing a duplicate SIM card of the victim’s number, intercepting incoming OTPs and banking alerts.'
  },
  {
    term: 'Mule Account',
    category: 'Financial Crime',
    definition: 'A bank account used by cyber criminals to receive, layer, and quickly cash out stolen funds before law enforcement can freeze them.'
  },
  {
    term: '1930 Cyber Helpline',
    category: 'Public Defense',
    definition: 'National Cyber Crime Reporting Helpline operated by the Ministry of Home Affairs (I4C) in India for immediate emergency reporting of financial digital fraud.'
  },
  {
    term: 'CERT-In',
    category: 'Agency',
    definition: 'Indian Computer Emergency Response Team under the Ministry of Electronics and Information Technology, responsible for national cyber security advisories and incident response.'
  },
  {
    term: 'I4C (Indian Cyber Crime Coordination Centre)',
    category: 'Agency',
    definition: 'An initiative of the Ministry of Home Affairs, Government of India, coordinating all cybercrime investigations and running the cybercrime.gov.in portal.'
  },
  {
    term: 'Two-Factor Authentication (2FA)',
    category: 'Defense',
    definition: 'A security mechanism requiring two distinct forms of identification before granting access, such as a password combined with an authenticator app code.'
  }
];
