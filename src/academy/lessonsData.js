/**
 * ScamShield Academy Comprehensive Lesson Curriculum
 * Every lesson follows the mandatory defensive pedagogical structure across all 12 elements:
 * 1. Title & Metadata
 * 2. What is this scam? (whatIsThis)
 * 3. How does it typically work? (howItWorks)
 * 4. Common warning signs (warningSigns)
 * 5. Realistic educational demonstration (realisticExample)
 * 6. Why people fall for it (whyPeopleFallForIt)
 * 7. How to protect yourself (howToProtect)
 * 8. What to do if affected (whatToDoIfAffected - 1930 / cybercrime.gov.in)
 * 9. Frequently Asked Questions (faqs)
 * 10. Knowledge check (quiz)
 * 11. Related lessons (relatedLessons)
 * 12. Official Regulatory Advisories & Citations (officialAdvisories)
 */

export const ACADEMY_LESSONS = [
  {
    id: 'fake-kyc',
    title: 'Fake Bank KYC & Account Suspension Scam',
    category: 'banking-financial',
    categoryName: 'Banking & Financial',
    readingTime: '5 mins',
    level: 'Beginner',
    summary: 'Fraudsters impersonate banks claiming your account will be blocked within hours unless you immediately update PAN or KYC through an unverified link.',
    
    whatIsThis: 'In a Fake KYC scam, cyber fraudsters send alarming SMS or WhatsApp messages claiming your bank account, credit card, or digital wallet is frozen or about to be suspended due to pending Know Your Customer (KYC) or PAN verification. The message contains an unverified website link or a phone number urging you to submit your credentials immediately.',
    
    howItWorks: [
      'The victim receives an unsolicited SMS pretending to be from a well-known bank (e.g. SBI, HDFC, PNB).',
      'The message creates acute fear and urgency by declaring that the account will be permanently blocked within 2 hours.',
      'The victim is instructed to click an attached link or call an unofficial phone number to "update" their PAN or KYC.',
      'The link opens a phishing website disguised to look identical to the bank’s official net banking portal.',
      'When the victim enters their username, password, date of birth, PAN, and subsequent OTP, the fraudster captures these credentials and instantly siphons funds.'
    ],

    warningSigns: [
      'Severe urgency language: "Blocked within 2 hours", "Immediate action required", "Account suspended today".',
      'Unofficial web addresses: Using disposable domains such as .xyz, .top, .click, or .support-verify.com instead of verified bank domains.',
      'Lookalike brand names in subdomains (e.g., sbi-kyc-portal.attacker-domain.xyz).',
      'Sender address is a standard 10-digit mobile number rather than an official registered header ID (such as VK-SBIINB or AD-HDFCBK).',
      'Requests for secret banking passwords, MPIN, or transaction OTPs under the guise of "verification".'
    ],

    realisticExample: {
      message: 'URGENT: Dear SBI User, your YONO account will be suspended within 2 hours due to incomplete PAN KYC. Update immediately at http://sbi-kyc-update.support-verify.xyz to avoid block.',
      annotations: [
        { phrase: 'URGENT:', note: 'Artificial urgency designed to cause panic and bypass careful thinking.' },
        { phrase: 'within 2 hours', note: 'Artificial deadline to force immediate action without verifying with the bank.' },
        { phrase: 'PAN KYC', note: 'Banks never conduct KYC updates over SMS links.' },
        { phrase: 'http://sbi-kyc-update.support-verify.xyz', note: 'Unencrypted HTTP link on an untrusted .xyz domain. The real bank domain is sbi.co.in.' }
      ]
    },

    whyPeopleFallForIt: 'Fear and authority bias. The prospect of having one’s bank account blocked right before paydays or emergencies triggers intense anxiety. Fraudsters exploit this emotional panic so victims act impulsively before consulting family or contacting their branch.',

    howToProtect: [
      'Remember the Golden Rule: Banks in India never send SMS links to update KYC or PAN.',
      'Always use official banking mobile applications downloaded exclusively from Google Play Store or Apple App Store.',
      'Check the official sender header: Legitimate banks use registered alphanumeric sender IDs (e.g., AX-SBIINB, BZ-HDFCBK), never personal 10-digit phone numbers.',
      'If in doubt, independently visit your nearest home branch or call the official toll-free helpline printed on the back of your debit card.'
    ],

    whatToDoIfAffected: [
      'Immediately contact your bank’s 24/7 fraud helpline and request an urgent block on your net banking access, debit card, and UPI services.',
      'Dial the National Cyber Crime Helpline: 1930 immediately. Golden Hour reporting maximizes the chance of freezing siphoned funds.',
      'File an official incident complaint on the National Cyber Crime Reporting Portal: https://cybercrime.gov.in.',
      'Change all passwords, MPINs, and UPI PINs from an uncompromised, secure device.',
      'Keep screenshots of the phishing SMS, destination website, and debit SMS as evidence for the police complaint.'
    ],

    faqs: [
      {
        question: 'Can my bank freeze my account if my KYC has legitimately lapsed?',
        answer: 'Under Reserve Bank of India (RBI) guidelines, banks may place operational restrictions on un-updated accounts, but they ALWAYS issue advance physical notices by post or official secure in-app alerts weeks in advance. Banks NEVER send SMS messages with links threatening closure within 2 hours.'
      },
      {
        question: 'What should I do if I already clicked the link and entered my PAN number?',
        answer: 'If you only entered your PAN without entering passwords, debit card numbers, or OTPs, your money is not immediately compromised, but monitor your account and check your credit report (CIBIL/Experian) periodically for unauthorized loans. If you entered passwords or OTPs, call your bank immediately to freeze your accounts.'
      },
      {
        question: 'How can I safely update my bank KYC without falling for scams?',
        answer: 'You can update your KYC safely through two channels only: 1) In-person at your official home branch with self-attested physical documents, or 2) Inside your official, pre-installed bank mobile app using RBI-approved Video KYC.'
      }
    ],

    quiz: {
      question: 'Your bank sends an SMS saying your account will be blocked in 2 hours unless you click a link to update PAN KYC. What should you do?',
      options: [
        'Click the link immediately to prevent your account from being frozen.',
        'Ignore the link, do not enter any information, and verify directly through your official banking app or branch.',
        'Forward the link to your friends to check if it works for them too.',
        'Reply to the SMS with your PAN card number and date of birth.'
      ],
      correctIndex: 1,
      explanation: 'Banks never conduct KYC updates via SMS links. Any message threatening account suspension within hours with a link is a phishing attempt. Always verify through the official bank app or branch.'
    },

    relatedLessons: ['otp-theft', 'sms-phishing', 'fake-customer-care'],

    officialAdvisories: [
      {
        agency: 'Reserve Bank of India (RBI)',
        title: 'BE(A)WARE: Booklet on Modus Operandi of Financial Frauds (Section: Fake KYC Frauds)',
        refCode: 'RBI-BEAWARE-KYC-01',
        url: 'https://www.rbi.org.in'
      },
      {
        agency: 'CERT-In',
        title: 'Advisory on Smishing Campaigns Impersonating Leading Public and Private Sector Banks',
        refCode: 'CIAD-2023-0042',
        url: 'https://www.cert-in.org.in'
      },
      {
        agency: 'I4C (Ministry of Home Affairs)',
        title: 'Public Warning on Unofficial APKs and Phishing URLs Used in Bank KYC Frauds',
        refCode: 'I4C-PUB-2024-KYC',
        url: 'https://cybercrime.gov.in'
      }
    ]
  },

  {
    id: 'otp-theft',
    title: 'OTP, MPIN & Credential Phishing Scam',
    category: 'banking-financial',
    categoryName: 'Banking & Financial',
    readingTime: '4 mins',
    level: 'Beginner',
    summary: 'How fraudsters deceive users into revealing One-Time Passwords (OTPs) and MPINs through fake verification, rewards, or technical support calls.',

    whatIsThis: 'One-Time Passwords (OTPs) and MPINs are the ultimate security gates protecting your bank accounts and UPI wallets. In credential theft scams, fraudsters manipulate victims into reading out or typing their OTPs under false pretexts like cancelling a fraudulent charge, updating KYC, claiming rewards, or unblocking an account.',

    howItWorks: [
      'The fraudster obtains the victim’s phone number and initiates an unauthorized transaction or login on the bank’s website.',
      'The bank’s server generates an authentic OTP and sends it directly to the victim’s phone.',
      'Simultaneously, the scammer calls or messages the victim posing as a Bank Manager, Security Officer, or Customer Care Agent.',
      'The scammer warns that an unauthorized charge of Rs. 25,000 was just attempted and asks the victim to "share the verification code to cancel the transaction".',
      'If the victim reads out the OTP, the fraudster enters it into the bank portal, authorizing the illicit transfer.'
    ],

    warningSigns: [
      'Anyone asking you to read out or forward an OTP, even if they claim to be a bank manager or police officer.',
      'The OTP SMS clearly says: "DO NOT SHARE THIS OTP WITH ANYONE... for transaction of Rs. X".',
      'Caller sounds highly authoritative, speaks rapidly, and refuses to let you disconnect.',
      'Caller knows your name and partial account details (which are often leaked from public data breaches).'
    ],

    realisticExample: {
      message: 'SBI ALERT: 492018 is your OTP for purchase of Rs. 14,999 at FLIPKART. Do not share with anyone. If not done by you, share this OTP with officer on call to cancel.',
      annotations: [
        { phrase: '492018 is your OTP for purchase', note: 'This OTP is authorizing a debit, not a cancellation!' },
        { phrase: 'share this OTP with officer on call to cancel', note: 'Banks NEVER ask for OTPs to cancel transactions. Sharing it completes the theft.' }
      ]
    },

    whyPeopleFallForIt: 'Confusion and false relief. When told that a large unauthorized transaction is currently happening, the victim feels intense relief when the caller offers to "cancel" it. In their panic, victims do not read the text of the OTP message carefully.',

    howToProtect: [
      'Memorize this absolute rule: OTP is a personal digital signature. NO bank employee, police officer, or telecom executive is ever authorized to ask for your OTP.',
      'Always read the full text of every OTP SMS carefully. Look at the transaction amount and merchant name before doing anything.',
      'Never enter your UPI PIN on your phone unless YOU are actively intending to pay money out of your account.'
    ],

    whatToDoIfAffected: [
      'Immediately inform your bank’s fraud reporting division and block all net banking channels.',
      'Dial 1930 (National Cyber Crime Helpline) without any delay.',
      'Register an online complaint on cybercrime.gov.in.',
      'Change all banking and email passwords immediately.'
    ],

    faqs: [
      {
        question: 'Will a bank manager ever need my OTP to reverse an accidental transfer?',
        answer: 'NEVER. Bank employees operate internal core banking systems (CBS) to reverse errors. Bank systems never ask staff to collect customer OTPs for reversals. Any caller asking for an OTP is a fraudster.'
      },
      {
        question: 'Why does the scammer know my mother’s name and account number?',
        answer: 'Cybercriminal syndicates purchase leaked databases from scraped e-commerce sites, unsecured job portals, and dark web dumps. Knowing basic demographic details does NOT mean the caller is genuine.'
      }
    ],

    quiz: {
      question: 'A caller claiming to be from your bank customer care says: "An unauthorized charge of Rs. 10,000 has been made. I have sent an OTP to cancel it; please read it to me." What is happening?',
      options: [
        'The caller is genuinely helping you cancel the charge.',
        'This is a scam; sharing the OTP will actually authorize the fraudster to steal the money.',
        'You should only share the OTP if the caller correctly tells you your date of birth.',
        'You should share only the last two digits of the OTP.'
      ],
      correctIndex: 1,
      explanation: 'Banks never ask for OTPs to cancel charges. The caller initiated the debit themselves, and reading the OTP to them authorizes the withdrawal.'
    },

    relatedLessons: ['fake-kyc', 'upi-refund-scam', 'fake-customer-care'],

    officialAdvisories: [
      {
        agency: 'Reserve Bank of India (RBI)',
        title: 'Consumer Education Series: Protecting Your OTP & Authentication Factors',
        refCode: 'RBI-OTP-SEC-2023',
        url: 'https://www.rbi.org.in'
      },
      {
        agency: 'I4C (Ministry of Home Affairs)',
        title: 'Advisory on Social Engineering Traps Aimed at Stealing One-Time Passwords',
        refCode: 'I4C-ADVISORY-OTP-02',
        url: 'https://cybercrime.gov.in'
      }
    ]
  },

  {
    id: 'upi-refund-scam',
    title: 'UPI Cash Refund & Payment Collection Fraud',
    category: 'banking-financial',
    categoryName: 'Banking & Financial',
    readingTime: '5 mins',
    level: 'Intermediate',
    summary: 'Scammers exploit fundamental misunderstandings of UPI mechanics by claiming you must enter your UPI PIN to "receive" cashbacks, refunds, or OLX payments.',

    whatIsThis: 'UPI (Unified Payments Interface) is designed so that receiving money requires ZERO authentication from the recipient. Fraudsters exploit the fact that many users do not know this, sending "Collect Requests" or fake refund links and instructing victims to enter their UPI PIN to "accept" the money.',

    howItWorks: [
      'The victim receives a message or call claiming they have an unclaimed cashback (e.g. Google Pay / PhonePe) or a refund from an e-commerce order.',
      'The scammer sends a payment request link or opens a UPI "Collect Request" for Rs. 5,000.',
      'The scammer tells the victim: "Click Pay and enter your UPI PIN to credit the money into your bank account."',
      'The victim believes entering the PIN is an identity check to receive funds.',
      'As soon as the victim enters their UPI PIN, Rs. 5,000 is debited from their account and transferred to the fraudster.'
    ],

    warningSigns: [
      'Any claim that you must "Enter your UPI PIN to receive money".',
      'Receiving a UPI notification that says "Pay" or "Collect Request" from an unknown VPA (Virtual Payment Address).',
      'Messages with links promising cash rewards, refunds, or lottery bonuses via UPI.',
      'Buyers on platforms like OLX or Quikr who insist on paying via a QR code or UPI link instead of normal payment methods.'
    ],

    realisticExample: {
      message: 'Paytm Alert: You have received a cash refund of Rs. 2,999 from Merchant Services. Click to receive in bank account: https://tinyurl.com/paytm-cash-refund. Enter UPI PIN to accept money.',
      annotations: [
        { phrase: 'received a cash refund of Rs. 2,999', note: 'Bait lure with unexpected free money.' },
        { phrase: 'https://tinyurl.com/paytm-cash-refund', note: 'Obfuscated shortener link hiding a malicious phishing page.' },
        { phrase: 'Enter UPI PIN to accept money', note: 'FATAL RED FLAG: UPI PIN is NEVER required to receive money!' }
      ]
    },

    whyPeopleFallForIt: 'Technical misunderstanding. Many users assume that entering a PIN is standard protocol for receiving funds, akin to signing a receipt. Fraudsters exploit this misconception with convincing terminology.',

    howToProtect: [
      'MEMORIZE THIS UNIVERSAL RULE: UPI PIN IS ONLY REQUIRED TO SEND MONEY. YOU NEVER ENTER A PIN TO RECEIVE MONEY.',
      'If someone sends you a QR code or payment link saying "scan and enter PIN to receive payment", it is 100% a scam.',
      'Decline any unexpected "Collect Requests" on PhonePe, Google Pay, Paytm, or BHIM.',
      'Check your balance directly inside your UPI app without clicking external links.'
    ],

    whatToDoIfAffected: [
      'Open your UPI app immediately, navigate to the transaction history, and report the transaction as fraud.',
      'Contact your bank immediately to block the UPI ID linked to your account.',
      'Dial 1930 (National Cyber Crime Helpline) within minutes.',
      'Lodge a formal complaint at cybercrime.gov.in.'
    ],

    faqs: [
      {
        question: 'Is there ANY situation where I need my UPI PIN to receive money?',
        answer: 'NO. There is literally ZERO technical scenario where receiving a payment via UPI requires entering a UPI PIN. Receiving money happens automatically in the background using your VPA or phone number.'
      },
      {
        question: 'Can someone pull money from my bank simply by knowing my UPI ID or phone number?',
        answer: 'No. Knowing your UPI ID or phone number only allows someone to send money to you, or send a Collect Request. Money CANNOT leave your account unless you explicitly click "Pay" and enter your secret UPI PIN.'
      }
    ],

    quiz: {
      question: 'When receiving money through UPI (Google Pay, PhonePe, Paytm, BHIM), when do you need to enter your UPI PIN?',
      options: [
        'Always, to confirm identity.',
        'Only if the amount is greater than Rs. 2,000.',
        'NEVER. Entering a UPI PIN is strictly for sending money out of your account.',
        'Only when receiving funds from a merchant.'
      ],
      correctIndex: 2,
      explanation: 'You NEVER enter a UPI PIN to receive money. Entering a UPI PIN always authorizes a debit from your bank account.'
    },

    relatedLessons: ['qr-code-fraud', 'otp-theft', 'fake-kyc'],

    officialAdvisories: [
      {
        agency: 'NPCI (National Payments Corporation of India)',
        title: 'UPI Safety Guidelines: PIN is Only for Sending Money',
        refCode: 'NPCI-UPI-SAFETY-01',
        url: 'https://www.npci.org.in'
      },
      {
        agency: 'RBI',
        title: 'Advisory on Fraudulent Collect Requests on UPI Platforms',
        refCode: 'RBI-BEAWARE-UPI-03',
        url: 'https://www.rbi.org.in'
      }
    ]
  },

  {
    id: 'qr-code-fraud',
    title: 'QR Code "Receive Money" Scam',
    category: 'banking-financial',
    categoryName: 'Banking & Financial',
    readingTime: '4 mins',
    level: 'Intermediate',
    summary: 'How scammers trick sellers on marketplace apps like OLX into scanning a QR code and typing their PIN under the pretext of getting an advance payment.',

    whatIsThis: 'A QR code scam is a variation of UPI fraud where a scammer posing as a buyer sends an image of a QR code to a seller, claiming that scanning the code will deposit money directly into the seller’s bank account.',

    howItWorks: [
      'A seller lists an item for sale on an online marketplace (OLX, Facebook Marketplace, Quikr).',
      'A scammer contacts the seller, agrees to the full asking price without bargaining, and offers to pay an advance immediately.',
      'The scammer sends a QR code image via WhatsApp, saying: "Scan this QR code with your Google Pay/PhonePe and you will get the money."',
      'When the seller scans the QR code, the app opens a "Pay to Merchant" screen rather than a credit confirmation.',
      'The scammer pressures the seller: "Just enter your PIN, it is a bank verification code." Once entered, the money leaves the seller’s account.'
    ],

    warningSigns: [
      'Buyer offers immediate advance payment without inspecting or bargaining for the item.',
      'Buyer insists on sending a QR code to transfer payment.',
      'The QR code screen says "Paying" or shows a "Pay" button on your mobile screen.',
      'Buyer gives conflicting explanations like "This is a special merchant barcode to transfer funds".'
    ],

    realisticExample: {
      message: 'OLX Buyer Message: "Sir, I have agreed to buy your sofa for Rs. 15,000. I am sending this official Army Store QR code. Open Google Pay, scan this QR code and enter PIN to receive Rs. 15,000 instantly in your account."',
      annotations: [
        { phrase: 'agreed to buy your sofa for Rs. 15,000', note: 'No bargaining or in-person inspection requested.' },
        { phrase: 'official Army Store QR code', note: 'Fraudsters frequently impersonate Indian Army personnel to exploit respect and trust.' },
        { phrase: 'scan this QR code and enter PIN to receive', note: 'Scanning a QR code is ONLY for paying someone, never for receiving.' }
      ]
    },

    whyPeopleFallForIt: 'Excitement over a quick sale and impersonation of respected institutions (such as Army personnel or CISF officers). The seller is focused on closing the deal and overlooks the visual "Pay" button on their phone.',

    howToProtect: [
      'Remember: Scanning a QR code ALWAYS sends money from your account. You NEVER scan a QR code to receive money.',
      'If a buyer insists on sending a QR code, immediately terminate communication and report their profile.',
      'Insist on in-person inspection and physical cash or direct bank transfer before releasing goods.'
    ],

    whatToDoIfAffected: [
      'Immediately take screenshots of the chat, phone number, and QR code image.',
      'Contact your bank immediately to dispute the debit.',
      'Call 1930 and register a complaint on cybercrime.gov.in.'
    ],

    faqs: [
      {
        question: 'Can a merchant QR code ever credit money into my account?',
        answer: 'No. QR codes in UPI are designed strictly to encapsulate destination payment addresses. Scanning a QR code with a camera only points your app to pay that address. It cannot push money into your account.'
      }
    ],

    quiz: {
      question: 'A buyer on OLX sends you a QR code and asks you to scan it with your PhonePe app to receive a Rs. 5,000 advance. What should you do?',
      options: [
        'Scan it and enter your PIN to claim the advance.',
        'Refuse and block the buyer immediately because QR codes cannot be scanned to receive money.',
        'Scan it on another phone to see if it works there first.',
        'Ask the buyer to send two smaller QR codes instead.'
      ],
      correctIndex: 1,
      explanation: 'Scanning a QR code always initiates an outgoing payment. You can never receive money by scanning a QR code and entering your PIN.'
    },

    relatedLessons: ['upi-refund-scam', 'otp-theft', 'sms-phishing'],

    officialAdvisories: [
      {
        agency: 'NPCI',
        title: 'Safety Bulletin: Beware of QR Code Scams on Marketplace Platforms',
        refCode: 'NPCI-QR-ALERT-2023',
        url: 'https://www.npci.org.in'
      }
    ]
  },

  {
    id: 'sms-phishing',
    title: 'Smishing (SMS Phishing) & Malicious Links',
    category: 'digital-technology',
    categoryName: 'Digital & Technology',
    readingTime: '5 mins',
    level: 'Beginner',
    summary: 'Deconstruct how attackers craft convincing SMS messages with deceptive sender IDs and short links to steal passwords and financial data.',

    whatIsThis: 'Smishing (SMS Phishing) is the use of deceptive text messages to trick recipients into revealing sensitive personal data, net banking credentials, or installing malware. Attackers spoof company names and exploit mobile screen constraints where full URLs are truncated.',

    howItWorks: [
      'Attackers send bulk SMS messages using alphanumeric sender IDs or automated VoIP gateways.',
      'The message uses psychological triggers—fear of account closure, excitement of a prize, or stress of an unpaid utility bill.',
      'The message contains a shortened or lookalike URL (e.g., bit.ly, sbi.co.in.attacker.xyz).',
      'The victim clicks the link and is taken to a cloned login page designed to capture keystrokes in real time.',
      'The captured credentials are sent directly to the attacker’s command-and-control server.'
    ],

    warningSigns: [
      'SMS received from an unknown 10-digit mobile number claiming to be an official corporate or government entity.',
      'Links utilizing public shorteners (bit.ly, tinyurl, is.gd) or unusual TLDs (.xyz, .top, .club, .online).',
      'Grammatical errors, awkward phrasing, or unusual character substitutions (e.g. "Paytm" spelled "Pay-tm").',
      'Messages requesting that you "click to cancel" an unfamiliar subscription or invoice.'
    ],

    realisticExample: {
      message: 'Dear User, your Netflix subscription has expired. Update your billing card within 24 hours to prevent account cancellation: https://is.gd/netflix-billing-update',
      annotations: [
        { phrase: 'Netflix subscription has expired', note: 'Generic bait sent to thousands of numbers.' },
        { phrase: 'within 24 hours', note: 'Pressure tactic to induce immediate action.' },
        { phrase: 'https://is.gd/netflix-billing-update', note: 'is.gd URL shortener obfuscating a rogue card harvesting webpage.' }
      ]
    },

    whyPeopleFallForIt: 'Familiarity and mobile screen ergonomics. Users trust SMS more than email, and on mobile phones, address bars are narrow, making it difficult to spot domain spoofing and URL parameters.',

    howToProtect: [
      'Never tap on links received via unsolicited SMS or WhatsApp messages.',
      'If an alert claims an account issue, close the SMS, open your browser, and independently type the official website address.',
      'Look at sender headers: Legitimate Indian companies use registered DLT headers with service provider prefixes (e.g., VM-NETFLX, AD-AIRTEL).'
    ],

    whatToDoIfAffected: [
      'If you submitted card details, immediately block the card via your banking app or hotline.',
      'If you submitted passwords, change your password on the official website immediately and enable two-factor authentication (2FA).',
      'Forward the spam SMS to 1909 (TRAI Spam Reporting) or report it on cybercrime.gov.in.'
    ],

    faqs: [
      {
        question: 'Can clicking a link alone compromise my phone?',
        answer: 'Modern mobile browsers have strong sandboxing, so simply clicking a link rarely compromises a patched phone unless you download and install an APK file, or manually enter sensitive passwords and card numbers on the opened page.'
      }
    ],

    quiz: {
      question: 'You receive an SMS from a standard 10-digit mobile number claiming to be your telecom provider asking you to update your SIM card via a bit.ly link. What is the safest course of action?',
      options: [
        'Click the link to ensure your phone connectivity is not disconnected.',
        'Delete the SMS and check your account status directly inside your telecom provider’s official mobile app.',
        'Reply to the SMS asking for the agent’s name and employee ID.',
        'Call the 10-digit number back to confirm.'
      ],
      correctIndex: 1,
      explanation: 'Telecom operators in India use registered sender headers (like VM-JIO or AX-AIRTEL), never personal 10-digit phone numbers. Always verify inside the official app.'
    },

    relatedLessons: ['fake-kyc', 'delivery-scams', 'remote-access-apps'],

    officialAdvisories: [
      {
        agency: 'TRAI (Telecom Regulatory Authority of India)',
        title: 'Directions on Implementation of Distributed Ledger Technology (DLT) for SMS Headers',
        refCode: 'TRAI-DLT-REG-2023',
        url: 'https://www.trai.gov.in'
      },
      {
        agency: 'CERT-In',
        title: 'Advisory on Smishing and Phishing Web Kits Targeting Indian Mobile Users',
        refCode: 'CIAD-SMISH-2024-01',
        url: 'https://www.cert-in.org.in'
      }
    ]
  },

  {
    id: 'delivery-scams',
    title: 'Fake Delivery & Courier Address Update Scam',
    category: 'delivery-courier',
    categoryName: 'Delivery & Courier',
    readingTime: '4 mins',
    level: 'Beginner',
    summary: 'Phishing texts impersonating India Post, BlueDart, or DHL claiming delivery failed due to incomplete address, demanding small payment.',

    whatIsThis: 'Delivery smishing is an attack where fraudsters send fake delivery failure alerts impersonating postal services like India Post, DTDC, BlueDart, or FedEx. The message claims a parcel cannot be delivered due to an incorrect postal address or a tiny unpaid redelivery fee (Rs. 5 to Rs. 25).',

    howItWorks: [
      'The victim receives an SMS claiming an inbound parcel is stuck at the local distribution depot.',
      'The SMS contains a link instructing the victim to update their street address and pay a token fee of Rs. 10.',
      'The link leads to a forged postal service website that prompts for full name, address, and credit/debit card details.',
      'Once the victim enters their card details and subsequent OTP to pay Rs. 10, the scammer uses the card to make an unauthorized international transaction for thousands of rupees.'
    ],

    warningSigns: [
      'Message claiming package undelivered when you have not ordered anything, or arrives without a valid consignment tracking number.',
      'The link domain ends in .top, .xyz, or .site rather than indiapost.gov.in.',
      'The SMS arrives from a random personal 10-digit mobile number or international number (+63, +84).',
      'Urgent ultimatum: "Update within 12 hours or package will be returned to sender".'
    ],

    realisticExample: {
      message: 'India Post: Your package IN849201 could not be delivered due to incomplete street address. Please update your address within 12 hours or item returns: https://bit.ly/indpost-address-help',
      annotations: [
        { phrase: 'Your package IN849201 could not be delivered', note: 'Fabricated consignment number designed to pique curiosity.' },
        { phrase: 'within 12 hours or item returns', note: 'Artificial rush designed to prevent careful checking.' },
        { phrase: 'https://bit.ly/indpost-address-help', note: 'Shortened link hiding a fake payment portal. Real domain is indiapost.gov.in.' }
      ]
    },

    whyPeopleFallForIt: 'High e-commerce shopping frequency. With millions of people regularly ordering from Amazon, Flipkart, and Swiggy, recipients often assume the message corresponds to an expected package or a family member’s order.',

    howToProtect: [
      'Never click links in delivery SMS messages.',
      'If you are expecting a parcel, visit the official courier website (e.g. indiapost.gov.in) and enter the tracking number directly into their official tracking tool.',
      'India Post NEVER charges an online fee to correct addresses or redeliver domestic parcels.'
    ],

    whatToDoIfAffected: [
      'Immediately block the debit or credit card used on the fraudulent portal.',
      'Call your bank’s emergency card hotline to report unauthorized transaction attempts.',
      'Dial 1930 to report the fraud to cyber police.'
    ],

    faqs: [
      {
        question: 'Does India Post ever charge a fee via SMS link to update an address?',
        answer: 'NEVER. India Post has officially clarified that they never send SMS links asking citizens to pay redelivery fees or update address details online.'
      }
    ],

    quiz: {
      question: 'You receive an SMS from India Post saying parcel IN99281 failed delivery due to wrong house number, with a link to pay Rs. 20 redelivery fee. What is the safest response?',
      options: [
        'Pay the Rs. 20 fee quickly since it is such a small amount.',
        'Copy the tracking number and check it directly on the official indiapost.gov.in website without clicking the SMS link.',
        'Forward the link to your delivery agent.',
        'Call the number from which the SMS was received.'
      ],
      correctIndex: 1,
      explanation: 'Never click links in delivery SMS messages. Real tracking numbers can be verified safely on indiapost.gov.in.'
    },

    relatedLessons: ['sms-phishing', 'fake-kyc', 'fake-customer-care'],

    officialAdvisories: [
      {
        agency: 'Department of Posts (India Post)',
        title: 'Public Clarification Regarding Fake SMS Messages with Links for Address Updation',
        refCode: 'INDIA-POST-ADV-2023',
        url: 'https://www.indiapost.gov.in'
      },
      {
        agency: 'CERT-In',
        title: 'Advisory on Phishing Campaigns Targeting Postal & Courier Customers',
        refCode: 'CIAD-POSTAL-2024',
        url: 'https://www.cert-in.org.in'
      }
    ]
  },

  {
    id: 'digital-arrest',
    title: 'Digital Arrest & Law Enforcement Coercion Scam',
    category: 'identity-impersonation',
    categoryName: 'Identity & Impersonation',
    readingTime: '6 mins',
    level: 'Advanced',
    summary: 'Scammers pose as Police, CBI, ED, or Customs officers over video calls, placing victims under fake "Digital Arrest" to extort large sums.',

    whatIsThis: '"Digital Arrest" is a severe psychological extortion fraud where cyber syndicates impersonate law enforcement authorities (CBI, Customs, Narcotics Control Bureau, ED, State Police). They accuse the victim of serious crimes (narcotics trafficking, money laundering) and coerce them into staying on video calls for hours while transferring savings for "verification".',

    howItWorks: [
      'The victim receives an automated call claiming a parcel sent in their name containing drugs, fake passports, or illegal contraband was intercepted at Customs.',
      'The call is transferred to a fake "Police Officer" or "CBI Inspector" on Skype or WhatsApp Video.',
      'The scammer appears in authentic-looking police uniform with simulated police station backdrops, logos, and forged arrest warrants.',
      'The scammer tells the victim they are under "Digital Arrest" and cannot disconnect the call or talk to family.',
      'Under intense intimidation, the victim is instructed to transfer their entire savings to a "Reserve Bank of India Secret Supervisory Account" to verify that the funds are clean.'
    ],

    warningSigns: [
      'There is NO SUCH THING under Indian law as "Digital Arrest". Indian law enforcement does not arrest or question people over Skype/WhatsApp video calls.',
      'Calls demanding immediate secrecy from family, lawyers, or local police.',
      'Officials demanding that you transfer funds to a private bank account for "clearance" or "verification".',
      'Threats of immediate home raids by police unless you remain on continuous video call.'
    ],

    realisticExample: {
      message: 'Urgent Police Notice: A parcel containing illegal narcotics sent from Mumbai to Cambodia in your name has been seized. Arrest warrant issued under NDPS Act. Connect to CBI Officer on WhatsApp Video immediately at 9876543210 to avoid physical raid.',
      annotations: [
        { phrase: 'parcel containing illegal narcotics', note: 'Extreme shock-value accusation designed to induce terror.' },
        { phrase: 'Connect to CBI Officer on WhatsApp Video', note: 'CBI and police NEVER conduct official legal proceedings over WhatsApp.' },
        { phrase: 'avoid physical raid', note: 'Coercive extortion threat.' }
      ]
    },

    whyPeopleFallForIt: 'Terror and social stigma. Law-abiding citizens are terrified of police, imprisonment, and social humiliation. The sophisticated theatrical staging—uniforms, fake court seals, official jargon—overwhelms victims.',

    howToProtect: [
      'KNOW THE LAW: Indian police, CBI, ED, and courts NEVER conduct interrogations or place citizens under arrest over video calls.',
      'No government agency will ever ask you to transfer money to a bank account for "fund verification".',
      'If you receive such a call, immediately hang up and walk into your nearest local police station or call 1930.'
    ],

    whatToDoIfAffected: [
      'Disconnect the video call immediately. Do not transfer any money.',
      'Immediately dial 1930 (National Cyber Crime Helpline) and inform your local police station.',
      'If funds were transferred, notify your bank immediately to attempt an urgent inter-bank freeze.'
    ],

    faqs: [
      {
        question: 'Does the concept of "Digital Arrest" exist anywhere in Indian law?',
        answer: 'NO. The Prime Minister of India and Ministry of Home Affairs have explicitly clarified: There is NO provision for "Digital Arrest" in the Code of Criminal Procedure or Indian law. Any video call threatening digital arrest is 100% fraud.'
      },
      {
        question: 'What if the caller shows me an official CBI badge and arrest warrant with my name?',
        answer: 'All such documents are easily forged using graphic templates and publicly available police seals. Police conduct investigations in person, by serving physical notices under Section 41A CrPC, never via WhatsApp.'
      }
    ],

    quiz: {
      question: 'A person wearing a police uniform calls you on Skype, claims a parcel with narcotics was found in your name, and says you are placed under "Digital Arrest" and must transfer Rs. 3 Lakhs to verify your money. What is the truth?',
      options: [
        'Follow instructions to avoid going to jail.',
        'Indian law has NO provision for "Digital Arrest". It is an extortion scam; hang up immediately and dial 1930.',
        'Negotiate to pay half the money now and half later.',
        'Ask to speak to the judge on the video call.'
      ],
      correctIndex: 1,
      explanation: 'Indian law has no provision for "Digital Arrest". Police never investigate or arrest people over video calls, nor do they ask for funds for "verification".'
    },

    relatedLessons: ['fake-customer-care', 'sms-phishing', 'otp-theft'],

    officialAdvisories: [
      {
        agency: 'I4C (Ministry of Home Affairs)',
        title: 'National Citizen Advisory: Beware of Extortion Scams Involving Fake Digital Arrest',
        refCode: 'I4C-MHA-DIGITAL-ARREST-2024',
        url: 'https://cybercrime.gov.in'
      },
      {
        agency: 'Prime Minister’s Office (Mann Ki Baat)',
        title: 'Public Address on Recognizing Digital Arrest Scams: Stop, Think, and Take Action',
        refCode: 'PMO-MKB-OCT-2024',
        url: 'https://www.pmindia.gov.in'
      }
    ]
  },

  {
    id: 'gov-subsidy-fraud',
    title: 'Government Subsidy & PM Yojana Phishing',
    category: 'identity-impersonation',
    categoryName: 'Identity & Impersonation',
    readingTime: '5 mins',
    level: 'Beginner',
    summary: 'False promises of free solar panels, education grants, or cash distributions under fake government schemes to steal Aadhaar, PAN, and banking credentials.',

    whatIsThis: 'Government subsidy scams prey on citizens looking for welfare support by fabricating fake schemes in the name of the Prime Minister, central ministries, or state welfare boards. Attackers promise free laptops, solar subsidies, or monthly stipends in exchange for submitting identity cards or paying a "file processing fee".',

    howItWorks: [
      'Attackers circulate viral WhatsApp forwards and Facebook posts announcing a new "PM Relief Fund" or "Free Solar Subsidy".',
      'The message includes a link to a cloned government portal using lookalike domain extensions (e.g., pm-yojana-apply.in or gov-subsidy.online).',
      'The portal requests Aadhaar numbers, PAN cards, bank account details, and phone numbers.',
      'Victims are then prompted to pay a Rs. 499 "registration fee" or forward the message to 10 WhatsApp groups to "activate" the benefit.',
      'The fraudsters monetize the captured identity documents for SIM card fraud and steal the registration fee.'
    ],

    warningSigns: [
      'Official Indian government websites ALWAYS end in `.gov.in` or `.nic.in`. Any portal ending in `.com`, `.in`, `.org`, or `.online` is unofficial.',
      'Demands to forward messages to WhatsApp groups to qualify for welfare schemes.',
      'Requirement to pay "processing fees" or "registration charges" via UPI for a free government subsidy.',
      'Low-resolution national emblems and sensational promises of free cash or gadgets.'
    ],

    realisticExample: {
      message: 'PM Kanya Ashirwad Yojana 2026: Under this scheme, all female students will receive Rs. 15,000 cash grant and free laptop. Apply before 30th November: http://pm-yojana-portal.online/apply',
      annotations: [
        { phrase: 'all female students will receive Rs. 15,000', note: 'Sensational free benefit lure.' },
        { phrase: 'http://pm-yojana-portal.online/apply', note: 'Unofficial .online domain. Real government portals strictly use .gov.in.' }
      ]
    },

    whyPeopleFallForIt: 'Economic aspiration and trust in government welfare programs. Vulnerable citizens hoping for financial relief forward the message in good faith to help friends and relatives.',

    howToProtect: [
      'Check the domain: Authentic Government of India websites exclusively end in `.gov.in` or `.nic.in`.',
      'Cross-check welfare schemes on the official Press Information Bureau Fact Check portal (pib.gov.in or @PIBFactCheck on X).',
      'Never pay money to apply for government welfare schemes.'
    ],

    whatToDoIfAffected: [
      'Report the fake website URL to CERT-In (incident@cert-in.org.in).',
      'If you shared your Aadhaar number, lock your Aadhaar biometrics immediately using the official mAadhaar app or UIDAI portal.',
      'Report financial theft to 1930.'
    ],

    faqs: [
      {
        question: 'How can I instantly tell if a government website is genuine?',
        answer: 'Look at the root domain in your browser’s address bar. Genuine central and state government portals in India strictly end in `.gov.in` or `.nic.in` (e.g., india.gov.in, pmmodiyojana.gov.in). If it ends in .com, .net, or .online, it is fake.'
      }
    ],

    quiz: {
      question: 'You receive a WhatsApp message promising a free government laptop under a PM scheme, linking to `http://pradhanmantri-laptop-free.com`. Is this authentic?',
      options: [
        'Yes, because it mentions the Prime Minister’s name.',
        'No. Authentic Indian government websites exclusively end in `.gov.in` or `.nic.in`.',
        'Yes, provided it has a picture of the national emblem.',
        'Yes, if you forward it to 5 friends first.'
      ],
      correctIndex: 1,
      explanation: 'All genuine Indian government websites use `.gov.in` or `.nic.in` domains. Any scheme hosted on .com, .net, or .online is fraudulent.'
    },

    relatedLessons: ['sms-phishing', 'fake-kyc', 'part-time-job-scams'],

    officialAdvisories: [
      {
        agency: 'PIB Fact Check (Government of India)',
        title: 'Fact Check Warning: Fraudulent Websites Impersonating PM Welfare Schemes',
        refCode: 'PIB-FACTCHECK-2024-03',
        url: 'https://factcheck.pib.gov.in'
      }
    ]
  },

  {
    id: 'part-time-job-scams',
    title: 'Part-Time Task & YouTube "Like" Job Scam',
    category: 'other-frauds',
    categoryName: 'Lottery, Jobs & Advance Fee',
    readingTime: '5 mins',
    level: 'Intermediate',
    summary: 'Offers of earning Rs. 3,000–5,000 daily for liking YouTube videos or rating hotels, which escalate into crypto investment traps.',

    whatIsThis: 'Part-time task scams lure victims with promises of high daily earnings for doing simple remote tasks like "liking YouTube videos", "subscribing to channels", or "rating hotels on Google Maps". Once trust is built with small payouts, victims are ensnared in high-stakes fake crypto or stock investment schemes.',

    howItWorks: [
      'Victims receive unsolicited WhatsApp or Telegram messages offering work-from-home jobs paying Rs. 3,000 to Rs. 8,000 daily.',
      'The victim is asked to complete a trial task: like 3 YouTube videos and send screenshots.',
      'The scammer transfers an authentic small payment (e.g. Rs. 150 to Rs. 500) via UPI to prove legitimacy and build trust.',
      'The victim is added to a VIP Telegram group where other members (paid accomplices or bots) post screenshots of massive earnings.',
      'The victim is offered "Prepaid Tasks": invest Rs. 5,000 to get Rs. 7,000 in return.',
      'Amounts escalate to lakhs of rupees; when the victim attempts to withdraw, the scammers freeze the account and demand "tax payments".'
    ],

    warningSigns: [
      'Unsolicited job offers sent via WhatsApp or Telegram from unknown international numbers (+62, +84, +234).',
      'Astronomical payouts for trivial tasks: earning Rs. 5,000 a day simply for liking YouTube videos.',
      'Job requiring you to deposit your own money to unlock tasks or "recharge" your working balance.',
      'Communication strictly restricted to Telegram channels with anonymous administrators.'
    ],

    realisticExample: {
      message: 'Hello! I am Sarah from HR Global. We are hiring remote assistants for YouTube optimization. Earn Rs. 2,000 to Rs. 5,000 daily by liking 5 videos per day. Work 30 mins from phone. Interested? Reply YES to start earning.',
      annotations: [
        { phrase: 'Sarah from HR Global', note: 'Generic fake recruiter persona.' },
        { phrase: 'Earn Rs. 2,000 to Rs. 5,000 daily by liking 5 videos', note: 'Absurd payout ratio designed as bait.' },
        { phrase: 'Work 30 mins from phone', note: 'Exploiting desire for effortless passive income.' }
      ]
    },

    whyPeopleFallForIt: 'The "sweetener" psychological trap. Because the scammers actually pay Rs. 200–500 in the first phase, victims believe the job is real. Greed and sunk-cost fallacy compel them to keep investing.',

    howToProtect: [
      'Universal Truth: NO legitimate company pays thousands of rupees for simply liking videos or rating products.',
      'ANY job that requires YOU to pay money to earn money is a 100% scam.',
      'Block and report unsolicited recruiters on WhatsApp and Telegram.'
    ],

    whatToDoIfAffected: [
      'Stop sending money immediately regardless of what the Telegram admins claim.',
      'Dial 1930 immediately to freeze bank accounts where payments were sent.',
      'Gather all Telegram chats, transaction UTR numbers, and beneficiary account details for your cybercrime report.'
    ],

    faqs: [
      {
        question: 'Why did the scammers actually pay me Rs. 300 at the beginning?',
        answer: 'This is called the "sweetener" technique. Scammers happily sacrifice Rs. 300 of previously stolen money to earn your trust, knowing they will steal Rs. 50,000 or Rs. 5 Lakhs from you in the next phase.'
      }
    ],

    quiz: {
      question: 'A company contacts you on WhatsApp offering Rs. 4,000/day for liking YouTube videos. They pay you Rs. 200 for trial tasks, then ask you to deposit Rs. 5,000 into an account to unlock "VIP earnings". What should you do?',
      options: [
        'Deposit the Rs. 5,000 since they already proved they pay by transferring Rs. 200.',
        'Keep the Rs. 200, block the contact immediately, and do not deposit any money because it is a task fraud scam.',
        'Borrow money from friends to unlock the highest VIP tier.',
        'Ask for a company identity card before depositing the Rs. 5,000.'
      ],
      correctIndex: 1,
      explanation: 'Paying a small trial amount is the classic bait used in task scams to build trust before stealing thousands. Any job requiring you to deposit money is a fraud.'
    },

    relatedLessons: ['lottery-kbc-scams', 'upi-refund-scam', 'sms-phishing'],

    officialAdvisories: [
      {
        agency: 'I4C (Ministry of Home Affairs)',
        title: 'Public Caution on Work-From-Home Task Frauds and Illegal Telegram Channels',
        refCode: 'I4C-WFH-TASK-2023',
        url: 'https://cybercrime.gov.in'
      }
    ]
  },

  {
    id: 'remote-access-apps',
    title: 'Malicious APK & Screen-Sharing App Takeover',
    category: 'digital-technology',
    categoryName: 'Digital & Technology',
    readingTime: '5 mins',
    level: 'Advanced',
    summary: 'Callers claiming to fix bank errors or KYC who trick victims into installing AnyDesk, TeamViewer, or unverified APKs, taking total control of the device.',

    whatIsThis: 'Remote access fraud occurs when scammers persuade victims to install screen-sharing software (AnyDesk, TeamViewer, QuickSupport, RustDesk) or unverified Android APK packages from outside the Google Play Store. This allows the attacker to see the victim’s phone screen in real time, intercept OTPs, and take control of banking apps.',

    howItWorks: [
      'The scammer calls posing as customer support from a bank, telecom operator, or utility board resolving a failed payment.',
      'The caller claims they need to run a "quick technical diagnostic" on the victim’s phone.',
      'The victim is told to install a "verification utility" from a link or install AnyDesk from the Play Store.',
      'The victim is asked to read out the 9-digit remote access code displayed on the screen.',
      'Once connected, the fraudster instructs the victim to open their net banking app and enter their password, while the fraudster records the screen and credentials.',
      'The fraudster transfers funds while watching incoming OTPs directly on the shared screen.'
    ],

    warningSigns: [
      'Any caller asking you to download AnyDesk, TeamViewer, QuickSupport, or RustDesk to solve a banking or account issue.',
      'Instructions to read out a 9-digit or 10-digit connection code from your phone screen.',
      'Callers sending Android APK installation files via WhatsApp.',
      'Warnings on your phone saying "This application will have access to everything displayed on your screen".'
    ],

    realisticExample: {
      message: 'Bank Tech Support: Your mobile banking app requires mandatory security patch v4.2 to prevent unauthorized access. Download and install update APK: http://secure-bank-update.in/patch.apk',
      annotations: [
        { phrase: 'mandatory security patch v4.2', note: 'Pretext exploiting fear of insecurity.' },
        { phrase: 'Download and install update APK', note: 'FATAL RISK: Legitimate banking updates are only distributed via Google Play Store / Apple App Store.' }
      ]
    },

    whyPeopleFallForIt: 'Lack of technical familiarity with remote desktop software. Victims assume "AnyDesk" is an internal diagnostic tool made by the bank, rather than a universal screen-sharing utility.',

    howToProtect: [
      'NEVER install screen-sharing apps (AnyDesk, TeamViewer) at the request of anyone on a phone call.',
      'NEVER install APK files sent via WhatsApp, SMS, or third-party websites. Only install apps from the Google Play Store or Apple App Store.',
      'No legitimate bank executive will ever ask to view your personal smartphone screen.'
    ],

    whatToDoIfAffected: [
      'Immediately switch your phone to Airplane Mode or turn off Wi-Fi/Mobile Data to break the connection.',
      'Uninstall the remote access app or malicious APK immediately.',
      'From a separate device, log in to your bank and freeze your net banking, cards, and UPI.',
      'Dial 1930 to report the theft.'
    ],

    faqs: [
      {
        question: 'Can someone access my bank account just by me sharing my AnyDesk code?',
        answer: 'Yes. Once connected, they can see your entire screen, monitor incoming SMS OTPs in real-time, and view passwords as you type them. Never share remote connection codes.'
      }
    ],

    quiz: {
      question: 'A customer care executive calls to resolve a failed electricity bill payment and asks you to install AnyDesk and share the 9-digit code displayed on your screen. What should you do?',
      options: [
        'Share the code so they can fix the technical glitch.',
        'Refuse, disconnect the call immediately, and do not install the app. Legitimate customer care never requests remote phone access.',
        'Share the code, but hide your banking app.',
        'Install the app on a tablet instead.'
      ],
      correctIndex: 1,
      explanation: 'No authentic customer care or banking support will ever ask you to install remote-access software or share screen codes.'
    },

    relatedLessons: ['fake-customer-care', 'fake-kyc', 'otp-theft'],

    officialAdvisories: [
      {
        agency: 'RBI',
        title: 'Advisory on Fraudulent Transactions Using Remote Access Screen Sharing Apps',
        refCode: 'RBI-BEAWARE-REMOTE-04',
        url: 'https://www.rbi.org.in'
      },
      {
        agency: 'CERT-In',
        title: 'Technical Advisory on Malicious Android APKs Masquerading as Banking Updates',
        refCode: 'CIAD-APK-MALWARE-2024',
        url: 'https://www.cert-in.org.in'
      }
    ]
  },

  {
    id: 'fake-customer-care',
    title: 'Fake Helpline & Customer Care Search Scam',
    category: 'identity-impersonation',
    categoryName: 'Identity & Impersonation',
    readingTime: '4 mins',
    level: 'Beginner',
    summary: 'Search engine poisoning where scammers post fake customer service numbers on Google Maps and search ads for banks, airlines, and courier companies.',

    whatIsThis: 'Search engine poisoning fraud occurs when cyber syndicates plant fake customer care phone numbers on Google search results, Google Maps listings, and social media. When customers search for helplines for banks, airlines, or delivery services, they end up calling scammers who siphon their funds.',

    howItWorks: [
      'A customer has an issue with a courier delivery, airline refund, or food delivery app.',
      'Instead of looking inside the app, the customer searches "XYZ Courier Customer Care Number" on Google.',
      'The top result is an ad or manipulated Google Maps contact number planted by scammers.',
      'The customer dials the number; the scammer answers professionally using the company’s name.',
      'The scammer instructs the customer to pay a "refund verification charge" of Rs. 10 via a UPI link, or download AnyDesk, stealing thousands.'
    ],

    warningSigns: [
      'Customer care number is a personal 10-digit mobile number starting with 9, 8, 7, or 6, rather than an official toll-free 1800 number.',
      'The representative asks you to install remote-access apps (AnyDesk) or transfer a nominal charge (Rs. 5) via UPI to verify your account.',
      'The representative asks for your full debit card number, expiry date, and CVV.',
      'The phone rings like a personal mobile phone rather than an automated IVR (Interactive Voice Response) system.'
    ],

    realisticExample: {
      message: 'Google Search Result: "BlueDart Express Courier Official Helpline Number: 9876543210 (24x7 Support for Delivery Issues & Address Change)".',
      annotations: [
        { phrase: '9876543210', note: 'Standard personal 10-digit mobile number pretending to be a national courier customer care.' },
        { phrase: '24x7 Support for Delivery Issues', note: 'Search engine listing planted by fraudsters to intercept stranded customers.' }
      ]
    },

    whyPeopleFallForIt: 'Immediacy and trust in search results. When experiencing customer service issues, people are in a hurry and assume the top Google search result must be official and verified.',

    howToProtect: [
      'NEVER search for customer care numbers on Google or social media.',
      'Always find official support contacts directly inside the company’s verified mobile application or official website.',
      'Legitimate national banks and enterprises operate toll-free helplines starting with 1800 (e.g. 1800-11-2211), not personal mobile numbers.'
    ],

    whatToDoIfAffected: [
      'If you shared card details or installed AnyDesk, immediately disconnect the call and block your cards through your banking app.',
      'Call your bank’s verified emergency fraud helpline.',
      'Report the fake number on Google Maps as fraud, and file a report with 1930 / cybercrime.gov.in.'
    ],

    faqs: [
      {
        question: 'Why does Google display fake numbers at the top of search results?',
        answer: 'Scammers pay for Google Ads targeting keywords like "bank customer care", or manipulate crowdsourced Google Maps business listings. Search algorithms do not manually verify phone ownership.'
      }
    ],

    quiz: {
      question: 'You want to contact customer care for a food delivery app. Where should you look for their official contact details?',
      options: [
        'Search Google for their customer care phone number and call the top result.',
        'Inside the official app itself under the "Help" or "Support" tab.',
        'In comments on public Twitter posts.',
        'In random WhatsApp forwarded contact cards.'
      ],
      correctIndex: 1,
      explanation: 'Always use the "Help" or "Support" section directly inside the verified app. Search engine results are frequently poisoned by scammers with fake numbers.'
    },

    relatedLessons: ['remote-access-apps', 'upi-refund-scam', 'delivery-scams'],

    officialAdvisories: [
      {
        agency: 'RBI',
        title: 'Consumer Awareness: Risks of Searching Customer Care Numbers on Internet Search Engines',
        refCode: 'RBI-BEAWARE-HELPLINE-05',
        url: 'https://www.rbi.org.in'
      }
    ]
  },

  {
    id: 'lottery-kbc-scams',
    title: 'KBC & National Lottery Advance-Fee Scam',
    category: 'other-frauds',
    categoryName: 'Lottery, Jobs & Advance Fee',
    readingTime: '4 mins',
    level: 'Beginner',
    summary: 'Deceptive letters and voice notes claiming you won Rs. 25 Lakhs in Kaun Banega Crorepati or a telecom lucky draw, demanding advance tax payments.',

    whatIsThis: 'Advance-fee lottery scams inform victims that their phone number has won a colossal cash prize (typically Rs. 25 Lakhs to Rs. 1 Crore) in a lucky draw associated with popular TV shows like KBC (Kaun Banega Crorepati) or telecom operators. To claim the money, victims are coerced into paying endless "clearance fees".',

    howItWorks: [
      'The victim receives a WhatsApp message containing a forged certificate featuring pictures of Amitabh Bachchan, the KBC logo, and government seals.',
      'An accompanying Hindi/English voice note congratulates the victim and provides a "Lottery Manager" phone number.',
      'When the victim calls, the manager congratulates them and says the cheque is ready, but a "GST Registration Fee" of Rs. 12,500 must be paid first.',
      'After the victim pays, the scammer invents new charges: "Bank Processing Fee" (Rs. 25,000), "Income Tax Clearance" (Rs. 50,000), etc.',
      'The payments continue until the victim realizes no prize money exists.'
    ],

    warningSigns: [
      'You are declared a winner in a contest or lottery you never bought a ticket for.',
      'Message arrives via WhatsApp from an unverified mobile number, often displaying an international country code (e.g. +92, +63, +1).',
      'Requirement to pay "registration fees", "customs duties", or "taxes" in advance to receive prize money.',
      'Amateurish certificates with mismatched logos, spelling mistakes, and fake signatures.'
    ],

    realisticExample: {
      message: 'Dear Customer, your mobile number has won Rs. 25,00,000 in KBC All India Sim Card Lucky Draw 2026. To claim lottery amount, contact Lottery Manager Mr. Rana Pratap at 9871234567 immediately.',
      annotations: [
        { phrase: 'won Rs. 25,00,000 in KBC All India Sim Card Lucky Draw', note: 'Classic advance-fee lure. KBC has explicitly stated no such sim card draws exist.' },
        { phrase: 'contact Lottery Manager Mr. Rana Pratap at 9871234567', note: 'Directing victims to a personal scammer line.' }
      ]
    },

    whyPeopleFallForIt: 'Wishful thinking and life-changing hope. The allure of a life-changing amount of money (Rs. 25 Lakhs) leads people to suspend their disbelief and risk smaller amounts like Rs. 12,000 in hopes of receiving the windfall.',

    howToProtect: [
      'Remember the Universal Rule of Lotteries: You CANNOT win a lottery you never entered or purchased a ticket for.',
      'Neither KBC, Sony TV, nor telecom operators ever conduct "SIM card lucky draws" or ask winners to pay upfront fees.',
      'In genuine prize distributions, any applicable taxes (TDS) are deducted by the payer before disbursal; you NEVER pay tax directly via UPI to an individual.'
    ],

    whatToDoIfAffected: [
      'Cease all communication and stop paying immediately. No money will ever be released.',
      'Dial 1930 to report the scam and file an online complaint at cybercrime.gov.in.',
      'Provide police with the bank accounts, UPI IDs, and WhatsApp phone numbers used by the scammers.'
    ],

    faqs: [
      {
        question: 'Does Kaun Banega Crorepati (KBC) ever organize lucky draws for SIM card numbers?',
        answer: 'NEVER. Sony Entertainment Television and KBC have repeatedly issued public advisories stating they NEVER conduct SIM card lucky draws, nor do they ever request upfront fee deposits to claim winnings.'
      }
    ],

    quiz: {
      question: 'You receive a WhatsApp message with a KBC certificate stating your SIM card won Rs. 25,00,000, and you must transfer Rs. 15,000 for government tax clearance. What is the truth?',
      options: [
        'Pay the Rs. 15,000 tax since the prize is Rs. 25 Lakhs.',
        'This is 100% a fake lottery scam. KBC does not conduct SIM card draws, and real taxes are never paid via UPI to individual accounts.',
        'Negotiate to pay the tax after the Rs. 25 Lakhs is credited to your bank.',
        'Forward the certificate to 10 friends to verify it.'
      ],
      correctIndex: 1,
      explanation: 'This is a classic advance-fee lottery fraud. You cannot win a lottery you never entered, and legitimate taxes are never paid upfront to personal phone numbers.'
    },

    relatedLessons: ['part-time-job-scams', 'upi-refund-scam', 'sms-phishing'],

    officialAdvisories: [
      {
        agency: 'Sony Pictures Networks India',
        title: 'Public Notice on Fraudulent Lottery Schemes and SIM Card Draws Using KBC Name',
        refCode: 'KBC-PUBLIC-NOTICE-2023',
        url: 'https://www.sonyliv.com'
      },
      {
        agency: 'I4C (Ministry of Home Affairs)',
        title: 'Advisory on Advance-Fee Lottery and Lucky Draw Cyber Scams',
        refCode: 'I4C-LOTTERY-ADV-01',
        url: 'https://cybercrime.gov.in'
      }
    ]
  }
];
