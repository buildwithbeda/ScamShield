import { describe, it, expect } from 'vitest';
import { analyzeScamMessage } from './scamAnalyzer.js';
import { extractAndAnalyzeAllUrls, deconstructDomain } from './urlParser.js';
import { PRESET_MESSAGES } from '../data/presets.js';

describe('ScamShield Core Detection Engine & Heuristics', () => {
  // Preset 1: Fake Bank KYC SMS
  it('detects Preset 1 (Fake Bank KYC SMS) as CRITICAL RISK (score >= 75)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'sbi-kyc');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.verdict).toBe('CRITICAL RISK');
    expect(result.verdictColor).toBe('red');
    expect(result.impersonatedBrand).toContain('SBI');
    expect(result.urls.length).toBeGreaterThanOrEqual(1);
    expect(result.matchedPhrases.length).toBeGreaterThan(0);
    expect(result.analysisMethod).toBe('Offline Deterministic Heuristic Engine');

    const parsedUrl = result.urls[0];
    expect(parsedUrl.isRiskyTld).toBe(true);
    expect(parsedUrl.brandSpoofing.isSpoofed).toBe(true);
  });

  // Preset 2: Fake India Post Courier WhatsApp
  it('detects Preset 2 (India Post Delivery Scam) as HIGH or CRITICAL RISK (score >= 50)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'india-post');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(['HIGH RISK', 'CRITICAL RISK']).toContain(result.verdict);
    expect(result.impersonatedBrand).toContain('India Post');
    expect(result.urls.length).toBe(1);
    expect(result.urls[0].isShortener).toBe(true);
  });

  // Preset 3: Fake Electricity Disconnection Alert
  it('detects Preset 3 (Electricity Disconnection Threat) as HIGH or CRITICAL RISK (score >= 50)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'electricity-cutoff');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(['HIGH RISK', 'CRITICAL RISK']).toContain(result.verdict);
    expect(result.impersonatedBrand).toContain('Electricity');
    expect(result.phoneNumbers.personalMobile).toBe('9876543210');
    expect(result.tactics.some(t => t.id === 'personal-mobile-officer-trap')).toBe(true);
  });

  // Preset 4: Fake Government Subsidy
  it('detects Preset 4 (Fake Government Subsidy) as CRITICAL RISK (score >= 75)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'pm-subsidy');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.verdict).toBe('CRITICAL RISK');
    expect(result.scamCategories).toContain('Government Impersonation');
  });

  // Preset 5: UPI Refund Scam
  it('detects Preset 5 (UPI Refund Scam) as HIGH or CRITICAL RISK (score >= 50)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'upi-refund');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.scamCategories).toContain('Payment & Financial');
  });

  // Preset 6: Suspicious Job Offer
  it('detects Preset 6 (Suspicious Job Offer) as CAUTION (score >= 25)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'job-offer');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeGreaterThanOrEqual(25);
    expect(result.verdict).toBe('CAUTION');
    expect(result.scamCategories).toContain('Employment & Task Scam');
  });

  // Preset 7: Lottery Scam
  it('detects Preset 7 (Lottery Scam) as HIGH or CRITICAL RISK (score >= 50)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'lottery-prize');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.scamCategories).toContain('Lottery & Advance Fee');
  });

  // Preset 8: Genuine Bank Transaction Alert
  it('detects Preset 8 (Genuine Bank Transaction Alert) as LOW RISK (score <= 24)', () => {
    const preset = PRESET_MESSAGES.find(p => p.id === 'genuine-bank');
    expect(preset).toBeDefined();

    const result = analyzeScamMessage(preset.text);
    expect(result.score).toBeLessThanOrEqual(24);
    expect(result.verdict).toBe('LOW RISK');
    expect(result.verdictColor).toBe('green');
    expect(result.phoneNumbers.tollFree).toBe('1800-11-2211');
    expect(result.urls.length).toBe(0);
  });

  // Edge cases
  it('handles empty or whitespace-only messages safely with empty baseline', () => {
    const emptyResult = analyzeScamMessage('');
    expect(emptyResult.score).toBe(0);
    expect(emptyResult.verdict).toBe('LOW RISK');
    expect(emptyResult.urls).toEqual([]);

    const spacesResult = analyzeScamMessage('    ');
    expect(spacesResult.score).toBe(0);
    expect(spacesResult.verdict).toBe('LOW RISK');
  });

  it('detects standalone phishing URL directly', () => {
    const result = analyzeScamMessage('http://sbi-login-verify.xyz');
    expect(result.score).toBeGreaterThanOrEqual(35);
    expect(result.urls.length).toBe(1);
    expect(result.urls[0].isHttpOnly).toBe(true);
    expect(result.urls[0].isRiskyTld).toBe(true);
    expect(result.urls[0].brandSpoofing.isSpoofed).toBe(true);
  });

  it('handles innocent casual messages safely', () => {
    const result = analyzeScamMessage('Hey Mom, are we still meeting for lunch at 1 PM today? Let me know!');
    expect(result.score).toBeLessThanOrEqual(20);
    expect(result.verdict).toBe('LOW RISK');
  });

  // URL Parser utilities
  describe('urlParser utilities', () => {
    it('deconstructs multi-part Indian TLDs properly', () => {
      const { rootDomain, subdomain, tld } = deconstructDomain('portal.incometax.gov.in');
      expect(rootDomain).toBe('incometax.gov.in');
      expect(subdomain).toBe('portal');
      expect(tld).toBe('.gov.in');
    });

    it('extracts and flags shortened URLs', () => {
      const urls = extractAndAnalyzeAllUrls('Check this link out: https://bit.ly/my-special-link');
      expect(urls.length).toBe(1);
      expect(urls[0].isShortener).toBe(true);
      expect(urls[0].rootDomain).toBe('bit.ly');
    });

    it('flags unencrypted HTTP protocol', () => {
      const urls = extractAndAnalyzeAllUrls('http://unencrypted-portal.com');
      expect(urls.length).toBe(1);
      expect(urls[0].isHttpOnly).toBe(true);
    });
  });
});
