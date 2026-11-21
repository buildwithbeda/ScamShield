/**
 * Realistic Indian test cases for ScamShield demonstration and judging.
 * Clearly identified as educational examples covering major digital threat vectors.
 */

export const PRESET_MESSAGES = [
  {
    id: 'sbi-kyc',
    title: 'Fake Bank KYC SMS',
    subtitle: 'SBI / YONO PAN Suspension Threat',
    category: 'Banking & Financial',
    tag: 'Critical Risk',
    tagColor: 'red',
    icon: 'AlertTriangle',
    text: 'URGENT: Dear SBI User, your YONO account will be suspended within 2 hours due to incomplete PAN KYC. Update immediately at http://sbi-kyc-update.support-verify.xyz to avoid block.',
    expectedVerdict: 'CRITICAL RISK',
    description: 'Demonstration example of banking phishing exploiting urgent account block fears to harvest PAN and banking credentials via a spoofed subdomain on an untrusted .xyz domain.'
  },
  {
    id: 'india-post',
    title: 'India Post Delivery Scam',
    subtitle: 'Parcel Undelivered Address Update',
    category: 'Delivery & Courier',
    tag: 'High Risk',
    tagColor: 'red',
    icon: 'Package',
    text: 'India Post: Your parcel IN849201 could not be delivered due to incomplete address. Update your address within 12 hrs or package returns: https://bit.ly/indpost-track-help',
    expectedVerdict: 'HIGH RISK',
    description: 'Demonstration example impersonating national postal services with false delivery failure urgency and obfuscated bit.ly link to steal card details via fake redelivery fees.'
  },
  {
    id: 'electricity-cutoff',
    title: 'Electricity Disconnection Threat',
    subtitle: 'Tonight 9:30 PM Cutoff Intimidation',
    category: 'Intimidation & Extortion',
    tag: 'High Risk',
    tagColor: 'red',
    icon: 'Zap',
    text: 'Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Immediately call our Electricity Officer 9876543210.',
    expectedVerdict: 'HIGH RISK',
    description: 'Demonstration example preying on fear of immediate power disconnection, directing victims to call a scammer’s personal 10-digit mobile number pretending to be an official officer.'
  },
  {
    id: 'pm-subsidy',
    title: 'Fake Government Subsidy',
    subtitle: 'PM Kanya / Yojana Cash Grant Scam',
    category: 'Government Impersonation',
    tag: 'Critical Risk',
    tagColor: 'red',
    icon: 'Award',
    text: 'Pradhan Mantri Welfare Yojana: Your application for Rs. 50,000 direct bank transfer has been approved. Claim your cash benefit before midnight by registering at http://pm-yojana-grant.claim-gov.top',
    expectedVerdict: 'CRITICAL RISK',
    description: 'Demonstration example of government welfare impersonation promising unrequested financial grants to harvest Aadhaar, bank details and processing fees.'
  },
  {
    id: 'upi-refund',
    title: 'UPI Cash Refund Scam',
    subtitle: 'Pending Cash Voucher & PIN Phishing',
    category: 'Payment & UPI',
    tag: 'High Risk',
    tagColor: 'red',
    icon: 'CreditCard',
    text: 'Paytm Alert: You have received a cash refund of Rs. 2,999 from Merchant Services. Click to receive in bank account: https://tinyurl.com/paytm-cash-refund. Enter UPI PIN to accept money.',
    expectedVerdict: 'HIGH RISK',
    description: 'Demonstration example exploiting UPI misunderstanding; scammers ask victims to enter UPI PIN to "receive" money, which actually debits funds from the victim’s account.'
  },
  {
    id: 'job-offer',
    title: 'Suspicious Job Offer',
    subtitle: 'Part-time YouTube / Review Work Scam',
    category: 'Employment & Task',
    tag: 'Caution',
    tagColor: 'amber',
    icon: 'Briefcase',
    text: 'Congratulations! Selected for part-time online job. Earn Rs. 3000 to Rs. 8000 daily just by liking YouTube videos and rating hotels on Google Maps. No experience needed. Contact WhatsApp: +919123456789 to start.',
    expectedVerdict: 'CAUTION',
    description: 'Demonstration example of a classic task-based financial trap lure promising high daily earnings for minimal effort, which escalates into prepaid investment fraud.'
  },
  {
    id: 'lottery-prize',
    title: 'Lottery & Lucky Draw Message',
    subtitle: 'KBC 25 Lakh Prize Scam',
    category: 'Lottery & Prize',
    tag: 'High Risk',
    tagColor: 'red',
    icon: 'Gift',
    text: 'Dear Customer, your mobile number has won Rs. 25,00,000 in KBC All India Sim Card Lucky Draw 2026. To claim lottery amount, contact Lottery Manager Mr. Rana Pratap at 9871234567 immediately.',
    expectedVerdict: 'HIGH RISK',
    description: 'Demonstration example of lottery advance-fee fraud asking victims to pay "registration fees" or "GST" to claim non-existent prize money.'
  },
  {
    id: 'genuine-bank',
    title: 'Genuine Bank Transaction Alert',
    subtitle: 'Official Masked Account UPI Debit Alert',
    category: 'Authentic Alert',
    tag: 'Low Risk',
    tagColor: 'green',
    icon: 'ShieldCheck',
    text: 'Rs. 1,450.00 debited from A/c XX4821 on 21-11-26 via UPI Ref 632519847210. If not done by you, call 1800-11-2211 or visit official bank app. Do not share OTP with anyone.',
    expectedVerdict: 'LOW RISK',
    description: 'Demonstration example of an authentic transactional SMS with masked account number, official 1800 toll-free helpline, anti-phishing OTP advisory, and zero suspicious external links.'
  }
];
