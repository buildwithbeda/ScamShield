/**
 * ScamShield Academy Categories Definition
 */

export const ACADEMY_CATEGORIES = [
  {
    id: 'banking-financial',
    name: 'Banking & Financial Scams',
    icon: 'CreditCard',
    description: 'Deceptive tactics targeting bank accounts, payment apps, OTPs, UPI credentials, and financial savings.',
    badgeColor: 'blue',
    lessonsCount: 6
  },
  {
    id: 'communication-social',
    name: 'Communication & Phishing',
    icon: 'MessageSquare',
    description: 'Fraudulent SMS, WhatsApp, email messages, fake delivery notices, and search-engine customer care traps.',
    badgeColor: 'purple',
    lessonsCount: 5
  },
  {
    id: 'identity-impersonation',
    name: 'Identity & Impersonation',
    icon: 'UserCheck',
    description: 'Impersonation of government departments, police officers (digital arrest), Aadhaar/PAN misuse, and identity theft.',
    badgeColor: 'amber',
    lessonsCount: 4
  },
  {
    id: 'digital-technology',
    name: 'Digital & Technology Threats',
    icon: 'Cpu',
    description: 'Malicious Android APKs, remote-access screen sharing software, fake lookalike websites, and deepfakes.',
    badgeColor: 'emerald',
    lessonsCount: 4
  },
  {
    id: 'other-frauds',
    name: 'Lottery, Jobs & Advance Fee',
    icon: 'Gift',
    description: 'Fake part-time work-from-home offers, lucky draw prizes, fraudulent investment returns, and advance-fee schemes.',
    badgeColor: 'saffron',
    lessonsCount: 4
  }
];

export const LEARNING_PATHS = [
  {
    id: 'cyber-basics',
    title: 'Cybersecurity Basics for Everyone',
    level: 'Beginner',
    duration: '15 mins',
    description: 'Essential digital safety hygiene for smartphones, SMS, and WhatsApp users.',
    lessons: ['fake-kyc', 'sms-phishing', 'otp-theft']
  },
  {
    id: 'banking-safety',
    title: 'Banking & UPI Payment Safety',
    level: 'Intermediate',
    duration: '25 mins',
    description: 'Master how UPI, QR codes, and online banking work to prevent accidental fund transfers.',
    lessons: ['upi-refund-scam', 'qr-code-fraud', 'fake-customer-care']
  },
  {
    id: 'identity-protection',
    title: 'Identity, Police & Government Impersonation',
    level: 'Advanced',
    duration: '20 mins',
    description: 'Learn to counter high-pressure psychological intimidation such as "digital arrest" and fake legal notices.',
    lessons: ['digital-arrest', 'gov-subsidy-fraud', 'remote-access-apps']
  }
];
