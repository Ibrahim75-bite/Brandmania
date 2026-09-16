/**
 * Legal & Compliance Placeholders
 *
 * Provides structured placeholders for Privacy Policy, Terms of Engagement,
 * and Cookie Consent texts without inventing binding legal prose.
 */

export const LEGAL_CONTENT = {
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'September 2026',
    notice:
      '[OWNER NOTICE — This document is a structured legal placeholder awaiting final counsel review.]',
    sections: [
      {
        heading: '1. Information We Collect',
        content:
          'When you request a diagnostic audit, strategic consultation, or engage with our services, we collect executive contact coordinates (name, corporate email, brand domain, geographic region, and self-reported commercial tiers). We strictly minimize data collection to what is necessary to evaluate strategic fit.',
      },
      {
        heading: '2. Commercial & Financial Data Handling',
        content:
          'Any operational, financial, or margin information submitted through diagnostic questionnaires or intake forms is treated with strict corporate confidentiality. Data is never sold, shared with third-party advertisers, or retained longer than necessary.',
      },
      {
        heading: '3. International Privacy Rights (GDPR / UK DPA)',
        content:
          'Residents of the United Kingdom and the European Union possess statutory rights under the GDPR, including rights of access, rectification, erasure, and objection to processing. Contact our privacy officer to exercise these rights.',
      },
    ],
  },
  termsOfEngagement: {
    title: 'Terms of Engagement',
    lastUpdated: 'September 2026',
    notice:
      '[OWNER NOTICE — Standard commercial terms placeholder. Specific contract terms are established individually per engagement.]',
    sections: [
      {
        heading: '1. Diagnostic Consultations',
        content:
          'Initial preliminary consultations are provided for qualification and strategic assessment. Preliminary briefings do not constitute a binding operational agreement or formal audit deliverable until an engagement scope is formally executed.',
      },
      {
        heading: '2. Confidentiality & Non-Disclosure',
        content:
          'Both parties agree to treat all exchanged commercial metrics, operational methodologies, and diagnostic insights as proprietary trade secrets.',
      },
    ],
  },
  cookieConsent: {
    bannerTitle: 'Privacy & Strategic Intelligence',
    bannerText:
      'We utilize essential security cookies to protect form integrity and, with your consent, analytical telemetry to evaluate website performance.',
    acceptAllLabel: 'Accept All',
    essentialOnlyLabel: 'Essential Only',
    preferencesLabel: 'Preferences',
  },
};
