/**
 * Credible Public Cybersecurity & Scam Intelligence Data Sources
 * Clearly attributed with methodology notes, update frequencies, and official links.
 */

export const CREDIBLE_SOURCES = [
  {
    id: 'i4c',
    name: 'Indian Cyber Crime Coordination Centre (I4C)',
    country: 'India',
    region: 'South Asia',
    organization: 'Ministry of Home Affairs, Government of India',
    focus: 'National cybercrime reporting, 1930 helpline operations, inter-bank fraud freezing, public advisories',
    coverage: 'All 36 Indian States and Union Territories',
    url: 'https://cybercrime.gov.in',
    frequency: 'Periodic Parliamentary & Ministry releases',
    freshness: 'Official Government Publications & Advisories',
    notes: 'Handles citizen complaint intake via the 1930 helpline and operates Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS).'
  },
  {
    id: 'cert-in',
    name: 'CERT-In (Indian Computer Emergency Response Team)',
    country: 'India',
    region: 'South Asia',
    organization: 'Ministry of Electronics and Information Technology (MeitY)',
    focus: 'Cybersecurity incident response, technical vulnerability advisories, phishing domain alerts',
    coverage: 'National cyber infrastructure and digital citizens',
    url: 'https://www.cert-in.org.in',
    frequency: 'Weekly technical advisories',
    freshness: 'Regular Public Security Advisories',
    notes: 'Issues formal public warnings on Android malware, smishing campaigns, and lookalike government portals.'
  },
  {
    id: 'rbi',
    name: 'Reserve Bank of India (RBI)',
    country: 'India',
    region: 'South Asia',
    organization: 'Central Bank of India',
    focus: 'Banking frauds, unauthorized electronic transactions, consumer awareness publications (BE(A)WARE)',
    coverage: 'Scheduled Commercial Banks, Payment System Operators (UPI/PPI)',
    url: 'https://www.rbi.org.in',
    frequency: 'Annual Report & Periodic Consumer Alerts',
    freshness: 'Annual Banking Ombudsman & Fraud Publications',
    notes: 'Publishes official compendiums of modii operandi in financial frauds to educate banking consumers.'
  },
  {
    id: 'ncrb',
    name: 'National Crime Records Bureau (NCRB)',
    country: 'India',
    region: 'South Asia',
    organization: 'Ministry of Home Affairs',
    focus: 'Formal annual statistical compilation of registered FIRs under IT Act and IPC sections',
    coverage: 'All Indian Police Station Jurisdictions',
    url: 'https://ncrb.gov.in',
    frequency: 'Annual Crime in India report',
    freshness: 'Annual Historical Statistical Dataset',
    notes: 'Measures registered police cases; actual cyber incidents exceed registered FIRs due to reporting disparities.'
  },
  {
    id: 'fbi-ic3',
    name: 'Federal Bureau of Investigation (FBI IC3)',
    country: 'United States',
    region: 'North America',
    organization: 'US Department of Justice',
    focus: 'Internet Crime Complaint Center annual reports, investment fraud, business email compromise (BEC)',
    coverage: 'United States with international victim complaints',
    url: 'https://www.ic3.gov',
    frequency: 'Annual Internet Crime Report',
    freshness: 'Annual Comprehensive Report',
    notes: 'One of the world’s most cited authoritative datasets on cross-border cyber fraud complaints.'
  },
  {
    id: 'ftc',
    name: 'Federal Trade Commission (FTC)',
    country: 'United States',
    region: 'North America',
    organization: 'US Consumer Protection Agency',
    focus: 'Consumer Sentinel Network Data Book, imposter scams, payment fraud trends',
    coverage: 'US Consumer Marketplace',
    url: 'https://www.ftc.gov/exploredata',
    frequency: 'Quarterly & Annual Data Books',
    freshness: 'Periodic Official Dataset',
    notes: 'Aggregates millions of consumer fraud complaints across credit card, wire transfer, and cryptocurrency vectors.'
  },
  {
    id: 'interpol',
    name: 'INTERPOL Global Cybercrime Operations',
    country: 'Global',
    region: 'International',
    organization: 'International Criminal Police Organization',
    focus: 'Transnational organized fraud hubs, call-center operations, Operation First Light',
    coverage: '196 Member Countries',
    url: 'https://www.interpol.int',
    frequency: 'Annual Global Cybercrime Assessment & Operation Releases',
    freshness: 'Official International Assessment',
    notes: 'Monitors international syndicates operating industrial-scale boiler rooms and scam compounds in Southeast Asia.'
  },
  {
    id: 'accc-scamwatch',
    name: 'ACCC Scamwatch',
    country: 'Australia',
    region: 'Asia-Pacific',
    organization: 'Australian Competition & Consumer Commission / National Anti-Scam Centre',
    focus: 'Targeting scams report, SMS phishing, remote access, investment fraud',
    coverage: 'Australia national consumer reporting',
    url: 'https://www.scamwatch.gov.au',
    frequency: 'Monthly updates & Annual Targeting Scams Report',
    freshness: 'Regularly Updated National Data',
    notes: 'Provides detailed statistical breakdowns of victim loss vectors and contact methods.'
  },
  {
    id: 'uk-ncsc-actionfraud',
    name: 'Action Fraud & UK NCSC',
    country: 'United Kingdom',
    region: 'Europe',
    organization: 'City of London Police & National Cyber Security Centre',
    focus: 'UK national fraud and cyber reporting, suspicious email and SMS reporting services',
    coverage: 'England, Wales, and Northern Ireland',
    url: 'https://www.actionfraud.police.uk',
    frequency: 'Periodic Crime in England and Wales statistical bulletin',
    freshness: 'Official National Statistics',
    notes: 'Operates 7726 SMS phishing reporting and the Suspicious Email Reporting Service (SERS).'
  }
];
