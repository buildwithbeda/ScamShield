/**
 * URL Security Checker & Structural Anatomy Deconstructor for ScamShield.
 * Extracts URLs, parses domains/subdomains/TLDs, and identifies deceptive indicators.
 * NOTE: Operates offline purely through structural and heuristic analysis.
 * Local structural analysis cannot establish the live reputation of a website.
 */

// Popular URL Shortening Services commonly abused in SMS/WhatsApp phishing
const KNOWN_SHORTENERS = new Set([
  'bit.ly',
  'tinyurl.com',
  't.co',
  'rb.gy',
  'is.gd',
  'cutt.ly',
  'ow.ly',
  'goo.gl',
  'qr.ae',
  'rebrand.ly',
  't.ly',
  'shorturl.at',
  'v.gd',
  'bl.ink',
  'clck.ru'
]);

// Generic/Cheap TLDs frequently utilized for disposable phishing infrastructure
const RISKY_TLDS = new Set([
  'xyz',
  'top',
  'click',
  'info',
  'tk',
  'buzz',
  'club',
  'work',
  'rest',
  'icu',
  'lat',
  'fit',
  'online',
  'site',
  'vip',
  'monster',
  'gq',
  'ml',
  'cf',
  'ga',
  'cam',
  'live',
  'support'
]);

// Verified official domains for major Indian institutions targeted by phishing
const BRAND_WHITELISTS = {
  sbi: ['sbi.co.in', 'onlinesbi.sbi', 'onlinesbi.com', 'statebankofindia.com'],
  yono: ['sbi.co.in', 'onlinesbi.sbi', 'onlinesbi.com'],
  hdfc: ['hdfcbank.com', 'hdfc.com'],
  icici: ['icicibank.com'],
  pnb: ['pnbindia.in'],
  axis: ['axisbank.com'],
  indiapost: ['indiapost.gov.in', 'ippbonline.com'],
  indpost: ['indiapost.gov.in', 'ippbonline.com'],
  post: ['indiapost.gov.in'],
  paytm: ['paytm.com'],
  uidai: ['uidai.gov.in'],
  aadhaar: ['uidai.gov.in'],
  incometax: ['incometax.gov.in', 'pan.utiitsl.com', 'protean-tin.com'],
  pan: ['incometax.gov.in', 'pan.utiitsl.com', 'protean-tin.com'],
  bescom: ['bescom.karnataka.gov.in'],
  electricity: ['gov.in'],
  gov: ['gov.in', 'nic.in'],
  yojana: ['gov.in', 'nic.in'],
  bsnl: ['bsnl.co.in'],
  jio: ['jio.com'],
  airtel: ['airtel.in']
};

// Multi-segment TLDs for accurate root domain extraction
const MULTI_PART_TLDS = [
  'co.in', 'gov.in', 'nic.in', 'ac.in', 'org.in', 'net.in', 'res.in', 'gen.in',
  'co.uk', 'gov.uk', 'org.uk', 'com.au', 'net.au', 'org.au', 'co.nz'
];

/**
 * Extracts all URLs from raw message text.
 * Matches explicit schemes (http://, https://) as well as common naked domains / shorteners.
 */
export function extractUrls(text) {
  if (!text || typeof text !== 'string') return [];

  // Match http/https URLs or naked shorteners/domains
  const urlPattern = /(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`]+|(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|xyz|top|click|info|tk|buzz|ly|co|me|io|live)[^\s<>"'{}|\\^`]*/gi;
  const matches = text.match(urlPattern) || [];

  // Deduplicate and clean trailing punctuation like periods or commas
  const cleaned = matches.map(url => {
    return url.replace(/[.,;:!?)]+$/, '');
  });

  return [...new Set(cleaned)];
}

/**
 * Deconstructs a hostname into { subdomain, domainName, rootDomain, tld }
 */
export function deconstructDomain(hostname) {
  if (!hostname) {
    return { subdomain: '', domainName: '', rootDomain: '', tld: '' };
  }

  const cleanHost = hostname.toLowerCase();

  // Check multi-segment TLDs first
  for (const multiTld of MULTI_PART_TLDS) {
    if (cleanHost.endsWith('.' + multiTld)) {
      const parts = cleanHost.slice(0, -(multiTld.length + 1)).split('.');
      const domainName = parts.pop() || '';
      const subdomain = parts.join('.');
      const rootDomain = `${domainName}.${multiTld}`;
      return { subdomain, domainName, rootDomain, tld: '.' + multiTld };
    }
  }

  // Single-part TLD
  const parts = cleanHost.split('.');
  if (parts.length === 1) {
    return { subdomain: '', domainName: parts[0], rootDomain: parts[0], tld: '' };
  }

  const tldName = parts.pop();
  const domainName = parts.pop() || '';
  const subdomain = parts.join('.');
  const rootDomain = `${domainName}.${tldName}`;
  const tld = '.' + tldName;

  return { subdomain, domainName, rootDomain, tld };
}

/**
 * Checks if a hostname or subdomain impersonates a protected brand.
 */
export function detectBrandSpoofing(hostname, rootDomain) {
  if (!hostname) return { isSpoofed: false, brand: null, explanation: '', simpleExplanation: '' };

  const lowerHost = hostname.toLowerCase();
  const lowerRoot = (rootDomain || '').toLowerCase();

  for (const [brand, officialDomains] of Object.entries(BRAND_WHITELISTS)) {
    // Check if the brand name is present anywhere in the hostname
    const brandRegex = new RegExp(`(^|[-._])${brand}([-._]|$)`, 'i');
    const simpleInclude = lowerHost.includes(brand);

    if (brandRegex.test(lowerHost) || simpleInclude) {
      // If the root domain is officially whitelisted, it's NOT spoofing
      const isOfficial = officialDomains.some(official => lowerRoot === official || lowerRoot.endsWith('.' + official));
      if (!isOfficial) {
        const brandUpper = brand.toUpperCase();
        return {
          isSpoofed: true,
          brand: brandUpper,
          explanation: `URL hostname includes "${brandUpper}", but the actual registered root domain is "${lowerRoot}" instead of the official domain (${officialDomains[0]}).`,
          simpleExplanation: `This link pretends to be ${brandUpper}, but the web address actually goes to a different, untrusted website.`
        };
      }
    }
  }

  return { isSpoofed: false, brand: null, explanation: '', simpleExplanation: '' };
}

/**
 * Parses and thoroughly analyzes an individual URL for scam indicators.
 */
export function parseAndAnalyzeUrl(rawUrl) {
  let urlObj;
  let formattedUrl = (rawUrl || '').trim();
  let protocol = 'none';

  if (!formattedUrl) {
    return null;
  }

  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = 'https://' + formattedUrl;
  }

  try {
    urlObj = new URL(formattedUrl);
    protocol = rawUrl.toLowerCase().startsWith('http://') ? 'http' : (rawUrl.toLowerCase().startsWith('https://') ? 'https' : 'inferred-https');
  } catch {
    return {
      rawUrl,
      protocol: 'unknown',
      hostname: rawUrl,
      subdomain: '',
      rootDomain: rawUrl,
      domainName: rawUrl,
      tld: '',
      path: '',
      isShortener: false,
      isIpAddress: false,
      isHttpOnly: false,
      hasAtRedirect: false,
      isRiskyTld: false,
      brandSpoofing: { isSpoofed: false, brand: null },
      assessment: 'Malformed URL structure',
      flags: [{
        type: 'MALFORMED',
        label: 'Malformed URL Syntax',
        severity: 'warning',
        description: 'URL syntax could not be cleanly validated or parsed.',
        simpleDescription: 'This link address appears broken or abnormal.'
      }]
    };
  }

  const hostname = urlObj.hostname;
  const { subdomain, domainName, rootDomain, tld } = deconstructDomain(hostname);
  const cleanTld = tld.replace(/^\./, '').toLowerCase();

  // Flag tests
  const isShortener = KNOWN_SHORTENERS.has(hostname.toLowerCase()) || KNOWN_SHORTENERS.has(rootDomain.toLowerCase());
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  const isHttpOnly = protocol === 'http';
  const hasAtRedirect = rawUrl.includes('@');
  const isRiskyTld = RISKY_TLDS.has(cleanTld);
  const brandSpoofing = detectBrandSpoofing(hostname, rootDomain);

  const flags = [];

  if (brandSpoofing.isSpoofed) {
    flags.push({
      type: 'BRAND_SPOOF',
      label: `Brand Impersonation (${brandSpoofing.brand})`,
      severity: 'critical',
      description: brandSpoofing.explanation,
      simpleDescription: brandSpoofing.simpleExplanation
    });
  }

  if (isShortener) {
    flags.push({
      type: 'URL_SHORTENER',
      label: 'Obfuscated Link Shortener',
      severity: 'critical',
      description: `Uses a URL shortener (${hostname}) to conceal the destination server from the recipient.`,
      simpleDescription: 'This link is shortened to hide where it really sends you.'
    });
  }

  if (isRiskyTld) {
    flags.push({
      type: 'RISKY_TLD',
      label: `High-Risk TLD (${tld})`,
      severity: 'warning',
      description: `Registered on top-level domain (${tld}) commonly utilized for disposable phishing kits.`,
      simpleDescription: `The website ending (${tld}) is commonly used by cyber scammers.`
    });
  }

  if (isHttpOnly) {
    flags.push({
      type: 'INSECURE_HTTP',
      label: 'Unencrypted Connection (Plain HTTP)',
      severity: 'warning',
      description: 'Lacks TLS/SSL encryption (operates over plain http://). Authentic financial portals never use unencrypted HTTP.',
      simpleDescription: 'This connection is not secure (no padlock). Banks always use secure connections.'
    });
  }

  if (isIpAddress) {
    flags.push({
      type: 'RAW_IP',
      label: 'Raw Numerical IP Host',
      severity: 'critical',
      description: 'Points directly to a raw numerical IP address instead of an authenticated domain name.',
      simpleDescription: 'This link uses raw computer numbers instead of a real business website name.'
    });
  }

  if (hasAtRedirect) {
    flags.push({
      type: 'AT_SYMBOL_TRICK',
      label: '@ Redirect Deception',
      severity: 'critical',
      description: 'Uses an "@" symbol in the URL to deceive users into misidentifying the true destination host.',
      simpleDescription: 'This link uses a trick with "@" to fool you into visiting a dangerous site.'
    });
  }

  // Derive structural assessment
  let assessment = 'Neutral Structural Profile';
  if (flags.some(f => f.severity === 'critical')) {
    assessment = 'High-Risk Structural Markers Detected';
  } else if (flags.length > 0) {
    assessment = 'Suspicious Structural Markers Detected';
  } else if (protocol === 'https') {
    assessment = 'Standard Encrypted Structural Profile (Live reputation not evaluated)';
  }

  return {
    rawUrl,
    protocol,
    hostname,
    subdomain,
    domainName,
    rootDomain,
    tld,
    path: urlObj.pathname + urlObj.search,
    isShortener,
    isIpAddress,
    isHttpOnly,
    hasAtRedirect,
    isRiskyTld,
    brandSpoofing,
    flags,
    assessment
  };
}

/**
 * Extracts and parses all URLs found in the text.
 */
export function extractAndAnalyzeAllUrls(text) {
  const urls = extractUrls(text);
  return urls.map(parseAndAnalyzeUrl).filter(Boolean);
}
