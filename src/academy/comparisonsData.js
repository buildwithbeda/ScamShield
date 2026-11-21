/**
 * Scam Comparisons Data
 * Explains differences between commonly confused scam vectors and authentic messages.
 */

export const SCAM_COMPARISONS = [
  {
    id: 'phishing-vs-smishing',
    title: 'Phishing vs Smishing',
    subtitle: 'Email Deception vs SMS / Text Vector',
    summary: 'While both aim to harvest sensitive credentials, they utilize fundamentally different communication vectors and psychological timing.',
    points: [
      {
        feature: 'Primary Vector',
        itemA: 'Email (often with forged headers, fake logos, and domain lookalikes)',
        itemB: 'SMS / Text Messages / WhatsApp (shorter, text-only alerts with embedded links)'
      },
      {
        feature: 'Typical Pretext',
        itemA: 'Account security notices, password reset, fake invoices, HR alerts',
        itemB: 'Urgent account blocks, electricity disconnection, OTPs, parcel delivery failures'
      },
      {
        feature: 'Technical Indicator',
        itemA: 'Mismatched sender domain (e.g. `support@sbi-updates.com` vs `sbi.co.in`)',
        itemB: 'Personal 10-digit mobile number sender, shortened URL (`bit.ly`), unencrypted HTTP'
      },
      {
        feature: 'Common Delivery Time',
        itemA: 'Business hours or mass batch distributions',
        itemB: 'Evenings, weekends, or late nights (e.g. "disconnection tonight at 9:30 PM")'
      },
      {
        feature: 'Key Defense',
        itemA: 'Check email sender domain, never download unexpected attachments',
        itemB: 'Never click links in unsolicited SMS; verify exclusively via official apps'
      }
    ]
  },
  {
    id: 'genuine-vs-fake-bank-alert',
    title: 'Genuine Bank Alert vs Fake Bank Alert',
    subtitle: 'How to distinguish official transaction SMS from phishing lures',
    summary: 'Legitimate transactional messages inform you of completed actions, whereas fake alerts demand immediate outward action or credential entry.',
    points: [
      {
        feature: 'Sender Identity',
        itemA: 'Official registered TRAI alphanumeric header (e.g. `VK-SBIINB`, `AD-HDFCBK`)',
        itemB: 'Standard 10-digit mobile number (e.g. `9876543210`) or international country code'
      },
      {
        feature: 'Account Representation',
        itemA: 'Always masked for privacy (e.g. `A/c XX4821`, `Card ending **1234`)',
        itemB: 'Generic greeting without account number, or demands that you input your details'
      },
      {
        feature: 'Link Presence',
        itemA: 'Usually zero links. If present, strictly official domain (`sbi.co.in`)',
        itemB: 'Always includes a link (`.xyz`, `.top`, `.click`, `.support-verify.com`)'
      },
      {
        feature: 'Call to Action',
        itemA: 'Informational: "If not done by you, call 1800-xx-xxxx or visit bank app"',
        itemB: 'Coercive: "Click here to update immediately within 2 hours to avoid block"'
      },
      {
        feature: 'Credential Request',
        itemA: 'Explicitly reminds: "Do not share OTP/password with anyone"',
        itemB: 'Demands login, PAN card, date of birth, or OTP submission'
      }
    ]
  },
  {
    id: 'genuine-delivery-vs-fake-delivery',
    title: 'Genuine Delivery Notice vs Fake Delivery Scam',
    subtitle: 'Postal & courier delivery updates vs advance-fee card traps',
    summary: 'Real couriers communicate directly or leave notes; fraudsters use failed delivery alerts to steal card numbers.',
    points: [
      {
        feature: 'Tracking Context',
        itemA: 'Corresponds to an item you actually ordered from a known e-commerce store',
        itemB: 'Unsolicited notification for a package you never ordered or sent'
      },
      {
        feature: 'Domain Ownership',
        itemA: 'Official government or courier domain (`indiapost.gov.in`, `bluedart.com`)',
        itemB: 'Shorteners (`bit.ly`, `tinyurl`) or deceptive domains (`indiapost-help.top`)'
      },
      {
        feature: 'Payment Demand',
        itemA: 'Delivery charges (COD) paid in cash or standard checkout; zero address update fee',
        itemB: 'Demands small "redelivery fee" (Rs. 10 or Rs. 25) to harvest debit card numbers and OTPs'
      },
      {
        feature: 'Action Required',
        itemA: 'Wait for courier or call official helpline listed in your merchant app',
        itemB: 'Urged to tap link within 12 hours or parcel will be returned'
      }
    ]
  },
  {
    id: 'upi-request-vs-upi-scam',
    title: 'UPI Payment Request vs UPI Collection Scam',
    subtitle: 'Sending money legitimately vs being tricked by fake "Receive Money" requests',
    summary: 'The fundamental rule of UPI: entering a PIN ALWAYS sends money out of your bank account.',
    points: [
      {
        feature: 'Flow Intent',
        itemA: 'YOU are actively buying an item or paying a bill, so you initiate the payment',
        itemB: 'Someone claims they are paying YOU, but asks you to enter your PIN to accept'
      },
      {
        feature: 'Screen Notification',
        itemA: 'Displays merchant name and "Debiting Account"',
        itemB: 'Displays "Collect Request" or "Pay" prompt disguised as a refund voucher'
      },
      {
        feature: 'PIN Requirement',
        itemA: 'Requires UPI PIN to authorize withdrawal of money from your account',
        itemB: 'RECEIVING MONEY REQUIRES ZERO PIN ENTRY. Entering PIN transfers money to scammer'
      },
      {
        feature: 'QR Code Use',
        itemA: 'You scan a merchant QR code at a physical store to pay them',
        itemB: 'Scammer sends you a QR code over WhatsApp claiming scanning it credits your account'
      }
    ]
  }
];
