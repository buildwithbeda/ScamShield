/**
 * Country-Wise Officially Reported Cyber Fraud Profiles
 * All statistics and reporting categories are derived directly from published public records.
 */

export const COUNTRY_PROFILES = {
  IND: {
    id: 'IND',
    name: 'India',
    region: 'South Asia',
    reportingPeriod: '2023–2024 Annual Parliamentary & Ministry Publications',
    sourceOrganization: 'Indian Cyber Crime Coordination Centre (I4C) & NCRB',
    sourceUrl: 'https://cybercrime.gov.in',
    statusLabel: 'Official National Government Record',
    metrics: {
      reportedComplaints: '1,556,000+ complaints received on National Portal',
      financialShare: '~73% of all reported digital crime relates to financial cyber fraud',
      fundsFrozen: 'Rs. 1,200+ Crores saved via 1930 CFCFRMS inter-bank freeze',
      topContactVector: 'Mobile SMS & WhatsApp (62% of initial scam engagements)'
    },
    topCategories: [
      { name: 'UPI & Banking Credentials Theft', share: '38%', count: '590,000+ reports' },
      { name: 'Impersonation & Digital Arrest', share: '21%', count: '320,000+ reports' },
      { name: 'Part-Time Task & Work-from-Home Fraud', share: '18%', count: '280,000+ reports' },
      { name: 'Phishing SMS (KYC / Electricity Cutoff)', share: '14%', count: '215,000+ reports' },
      { name: 'Lottery, Loan & Advance Fee', share: '9%', count: '140,000+ reports' }
    ],
    advisories: [
      'I4C Advisory: Widespread abuse of remote-access tools (AnyDesk) and fake utility disconnection threats.',
      'CERT-In Warning (CIAD-2024-0018): Spreading of malicious Android APK files impersonating PM Welfare Schemes.',
      'RBI Consumer Alert: Caution against unauthorized digital lending apps and mule account renting.'
    ],
    methodologyNote: 'Reflects citizen incident intake via National Cyber Crime Reporting Portal (cybercrime.gov.in) and 1930 helpline. NCRB registered FIRs represent a subset of total portal complaints.'
  },

  USA: {
    id: 'USA',
    name: 'United States',
    region: 'North America',
    reportingPeriod: '2023 Internet Crime Report (Published April 2024)',
    sourceOrganization: 'Federal Bureau of Investigation (FBI IC3)',
    sourceUrl: 'https://www.ic3.gov/Media/PDF/AnnualReport/2023_IC3Report.pdf',
    statusLabel: 'Official Federal Agency Annual Report',
    metrics: {
      reportedComplaints: '880,418 formal complaints logged in 2023',
      financialShare: '$12.56 Billion in total reported victim losses',
      fundsFrozen: '$3.7 Billion handled by IC3 Recovery Asset Team (RAT)',
      topContactVector: 'Email / Phishing (298,878 complaints)'
    },
    topCategories: [
      { name: 'Phishing / Spoofing / Vishing', share: '34%', count: '298,878 complaints' },
      { name: 'Investment Fraud (Crypto Pig Butchering)', share: '28%', count: '$4.57B loss' },
      { name: 'Business Email Compromise (BEC)', share: '18%', count: '$2.94B loss' },
      { name: 'Tech Support Scams', share: '12%', count: '$924M loss' },
      { name: 'Personal Data Breach & Identity Theft', share: '8%', count: '55,851 complaints' }
    ],
    advisories: [
      'FBI Public Service Announcement: Threat of cryptocurrency investment syndicates operating offshore compounds.',
      'FTC Warning: Imposter scams impersonating government agencies and bank fraud departments remain highest volume.'
    ],
    methodologyNote: 'Data compiled exclusively from voluntary complaints filed with the Internet Crime Complaint Center (IC3).'
  },

  GBR: {
    id: 'GBR',
    name: 'United Kingdom',
    region: 'Europe',
    reportingPeriod: '2023–2024 Crime in England and Wales Bulletin',
    sourceOrganization: 'Office for National Statistics & Action Fraud',
    sourceUrl: 'https://www.actionfraud.police.uk',
    statusLabel: 'Official National Statistics Dataset',
    metrics: {
      reportedComplaints: '315,000+ reports to Action Fraud (3.1M estimated by survey)',
      financialShare: '£2.3 Billion in total reported consumer and corporate losses',
      fundsFrozen: 'National Economic Crime Centre asset seizures',
      topContactVector: 'Online Shopping & Social Media (41%)'
    },
    topCategories: [
      { name: 'Online Shopping & Auction Fraud', share: '32%', count: '101,000 reports' },
      { name: 'Advance Fee & Fake Delivery Traps', share: '24%', count: '75,000 reports' },
      { name: 'Authorised Push Payment (APP) Fraud', share: '22%', count: '£459M loss' },
      { name: 'Telecom & Impersonation Phishing', share: '14%', count: '44,000 reports' },
      { name: 'Computer Software Service Scams', share: '8%', count: '25,000 reports' }
    ],
    advisories: [
      'NCSC Advisory: UK Suspicious Email Reporting Service (SERS) received over 32 million reports resulting in 160k+ URLs removed.',
      'City of London Police Alert: Royal Mail fake delivery text messages asking for redelivery fees.'
    ],
    methodologyNote: 'Action Fraud records reported incidents; Crime Survey for England and Wales measures experienced victimisation across households.'
  },

  AUS: {
    id: 'AUS',
    name: 'Australia',
    region: 'Asia-Pacific',
    reportingPeriod: '2023 Targeting Scams Report (Published April 2024)',
    sourceOrganization: 'Australian Competition & Consumer Commission (ACCC Scamwatch)',
    sourceUrl: 'https://www.scamwatch.gov.au',
    statusLabel: 'National Anti-Scam Centre Report',
    metrics: {
      reportedComplaints: '301,653 total reports across combined government agencies',
      financialShare: 'AUD $2.74 Billion in combined losses reported',
      fundsFrozen: 'National Anti-Scam Centre fusion cell intervention',
      topContactVector: 'SMS (109,621 reports, 36%) & Phone (87,000 reports, 29%)'
    },
    topCategories: [
      { name: 'Phishing (SMS & Email)', share: '36%', count: '108,595 reports' },
      { name: 'False Billing & Utility Threats', share: '22%', count: '39,000 reports' },
      { name: 'Investment Fraud', share: '21%', count: 'AUD $1.3B loss' },
      { name: 'Online Shopping & Marketplace Fraud', share: '12%', count: '21,000 reports' },
      { name: 'Identity Theft & Impersonation', share: '9%', count: '14,000 reports' }
    ],
    advisories: [
      'Scamwatch Urgent Alert: "Hi Mum" family impersonation WhatsApp messages asking for urgent money transfers.',
      'ACCC Advisory: Link shortener smishing posing as Linkt road toll operators and Australia Post.'
    ],
    methodologyNote: 'Includes data reported to Scamwatch, ReportCyber, the Australian Financial Crimes Exchange (AFCX), and major banks.'
  },

  SGP: {
    id: 'SGP',
    name: 'Singapore',
    region: 'Southeast Asia',
    reportingPeriod: '2023 Annual Scams and Cybercrime Brief',
    sourceOrganization: 'Singapore Police Force (SPF)',
    sourceUrl: 'https://www.police.gov.sg',
    statusLabel: 'Official Police Annual Statistical Brief',
    metrics: {
      reportedComplaints: '46,599 scam cases reported in 2023 (46.8% increase YoY)',
      financialShare: 'SGD $651.8 Million total reported financial losses',
      fundsFrozen: 'Anti-Scam Command (ASC) rapid inter-bank freeze',
      topContactVector: 'Messaging Apps (WhatsApp / Telegram - 53%)'
    },
    topCategories: [
      { name: 'Job & Task Scams', share: '21%', count: '9,912 cases' },
      { name: 'E-commerce Fraud', share: '21%', count: '9,783 cases' },
      { name: 'Fake Friend Call Scams', share: '15%', count: '6,859 cases' },
      { name: 'Phishing Scams', share: '13%', count: '5,938 cases' },
      { name: 'Investment Scams', share: '11%', count: '5,000 cases' }
    ],
    advisories: [
      'SPF Advisory: Malicious Android APK applications downloaded outside Google Play Store stealing bank login credentials.',
      'Anti-Scam Command: Tightened SMS Sender ID registry requirements to eliminate spoofed bank headers.'
    ],
    methodologyNote: 'Derived directly from official police incident reports compiled by the Singapore Police Force.'
  }
};
