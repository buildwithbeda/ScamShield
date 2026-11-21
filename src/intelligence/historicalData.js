/**
 * Historical Cyber Fraud Reporting Trends
 * Derived from NCRB Crime in India publications, RBI annual reports, and FBI IC3 records.
 */

export const HISTORICAL_TRENDS = [
  {
    year: '2020',
    indiaReportedCases: '50,035 registered FIRs (NCRB)',
    indiaFinancialShare: '62% financial cyber fraud',
    usReportedComplaints: '791,790 complaints (FBI IC3)',
    usTotalLoss: '$4.2 Billion',
    dominantVector: 'COVID-19 relief masquerade, basic lottery SMS'
  },
  {
    year: '2021',
    indiaReportedCases: '52,974 registered FIRs (NCRB)',
    indiaFinancialShare: '67% financial cyber fraud',
    usReportedComplaints: '847,376 complaints (FBI IC3)',
    usTotalLoss: '$6.9 Billion',
    dominantVector: 'KYC suspension SMS, QR code marketplace fraud'
  },
  {
    year: '2022',
    indiaReportedCases: '65,893 registered FIRs (NCRB) / 950k+ portal complaints',
    indiaFinancialShare: '71% financial cyber fraud',
    usReportedComplaints: '800,944 complaints (FBI IC3)',
    usTotalLoss: '$10.3 Billion',
    dominantVector: 'Electricity bill cutoff SMS, loan app extortion'
  },
  {
    year: '2023',
    indiaReportedCases: '1,556,000+ complaints received on National Portal',
    indiaFinancialShare: '73% financial cyber fraud',
    usReportedComplaints: '880,418 complaints (FBI IC3)',
    usTotalLoss: '$12.56 Billion',
    dominantVector: 'Digital arrest video extortion, part-time task scams, crypto pig-butchering'
  }
];

export const CATEGORY_DISTRIBUTION = [
  { category: 'UPI & Banking Credentials Theft', share: 36, color: '#0B5CAD', description: 'Fake KYC, OTP theft, and unauthorized UPI transfers' },
  { category: 'Impersonation & Digital Arrest', share: 22, color: '#123B64', description: 'Fake police, customs, and government department coercion' },
  { category: 'Task-Based & Work-From-Home', share: 18, color: '#D97706', description: 'YouTube liking, hotel review, and prepaid task schemes' },
  { category: 'Smishing (Electricity / Courier)', share: 14, color: '#DC2626', description: 'Incomplete address redelivery and utility disconnection threats' },
  { category: 'Lottery & Investment Schemes', share: 10, color: '#15803D', description: 'KBC draws, fake crypto trading, and advance-fee loans' }
];
