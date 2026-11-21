/**
 * Recent Verified Scam Reports & Official Cybersecurity Advisories
 * Sourced from CERT-In, I4C, RBI, FTC, Scamwatch, and international law enforcement agencies.
 */

export const RECENT_ADVISORIES = [
  {
    id: 'adv-01',
    title: 'Widespread Distribution of Fraudulent APK Files Mimicking PM Welfare Schemes',
    country: 'India',
    region: 'South Asia',
    category: 'Government Impersonation / Malware',
    publishingOrg: 'CERT-In (Indian Computer Emergency Response Team)',
    publishDate: '2024-03-12',
    freshnessLabel: 'Official Technical Advisory',
    summary: 'Attackers are distributing malicious Android APK packages via WhatsApp claiming to register citizens for Pradhan Mantri financial welfare schemes. Once installed, the APK requests SMS read permissions to siphon OTPs and access mobile banking apps.',
    sourceUrl: 'https://www.cert-in.org.in'
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
    summary: 'The Indian Cyber Crime Coordination Centre issued an urgent citizen warning regarding syndicates posing as CBI, Customs, and State Police officers on video calls, placing citizens under fake "Digital Arrest" and extorting funds to "clear" non-existent narcotic parcel charges.',
    sourceUrl: 'https://cybercrime.gov.in'
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
    summary: 'RBI reiterated safety warnings against installing remote-access screen sharing apps (AnyDesk, TeamViewer) at the behest of callers posing as bank or utility executives. Emphasized that banks never ask customers to share 9-digit remote access codes.',
    sourceUrl: 'https://www.rbi.org.in'
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
    summary: 'INTERPOL coordination across 61 countries intercepted $257 Million in illicit funds and froze 6,745 bank accounts connected to industrial-scale investment and romance pig-butchering scam compounds operating in Southeast Asia.',
    sourceUrl: 'https://www.interpol.int'
  },
  {
    id: 'adv-05',
    title: 'Massive Rise in Impersonation Scams Reported in Consumer Sentinel Network',
    country: 'United States',
    region: 'North America',
    category: 'Phishing & Impersonation',
    publishingOrg: 'Federal Trade Commission (FTC)',
    publishDate: '2024-03-28',
    freshnessLabel: 'Quarterly Consumer Sentinel Data',
    summary: 'FTC data reveals that business and government imposter scams were the top reported fraud category in 2023, resulting in over $2.7 Billion in consumer losses. Phone calls and text messages remain the predominant contact channels.',
    sourceUrl: 'https://www.ftc.gov'
  },
  {
    id: 'adv-06',
    title: 'Link Shorteners Heavily Exploited in Toll and Parcel Smishing Campaigns',
    country: 'Australia',
    region: 'Asia-Pacific',
    category: 'Delivery & Courier',
    publishingOrg: 'ACCC Scamwatch',
    publishDate: '2024-05-14',
    freshnessLabel: 'National Anti-Scam Centre Alert',
    summary: 'Scamwatch identified widespread SMS campaigns mimicking Australia Post and toll road operators. Over 100,000 reports were received where short links routed victims to fraudulent card-payment portals.',
    sourceUrl: 'https://www.scamwatch.gov.au'
  }
];
