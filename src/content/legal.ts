export interface LegalSection {
  index: string;
  heading: string;
  content: string;
  bullets?: string[];
}

export interface StorageArtifactRow {
  name: string;
  category: 'Essential Security' | 'Essential Session Draft' | 'Optional Analytics';
  storageType: 'Browser localStorage' | 'Browser sessionStorage' | 'HTTP Header / Server Memory' | 'First-Party Cookie (GA4)';
  provider: string;
  purpose: string;
  duration: string;
  controlMechanism: string;
}

export interface LegalFaqItem {
  id: string;
  category: 'Privacy & Data Rights' | 'Confidentiality & NDA' | 'Engagement & MSA' | 'Intellectual Property';
  question: string;
  answer: string;
}

export interface B2BScheduleItem {
  code: string;
  title: string;
  summary: string;
}

export interface ThirdPartySdkRow {
  name: string;
  category: 'Typography & Performance' | 'Consent-Gated Analytics' | 'Scheduling & Booking';
  provider: string;
  source: string;
  dataHandling: string;
  privacyControls: string;
}

export interface BusinessDetails {
  brandName: string;
  operatingEntity: string;
  corePractices: string;
  qualificationScope: string;
  dpoLiaison: string;
  protocolRef: string;
}

export const LEGAL_CONTENT = {
  privacyPolicy: {
    title: 'Privacy Policy & Global Data Protection Notice',
    subtitle:
      'Dual-compliance governance under EU/UK GDPR and U.S. State Privacy Laws (CCPA/CPRA), covering website visitors, executive qualification inquiries, and B2B advisory clients.',
    lastUpdated: 'November 2026',
    protocolRef: 'BM-PRIV-2026 // v4.0 (GDPR & US CCPA)',
    sections: [
      {
        index: '01',
        heading: 'Our Roles: Controller vs. Processor',
        content:
          'BRANDMANIA operates in two distinct capacities depending on our relationship with you. When you visit our website, submit a Strategic Qualification Inquiry, or interact with our executive advisory team, BRANDMANIA acts as an independent "Data Controller" (under EU/UK GDPR) and "Business" (under U.S. privacy laws). When we execute a formal Master Services Agreement (MSA) with an enterprise client ($700,000+ annual revenue) and analyze proprietary customer, CRM, or commercial funnel records on the client’s behalf, we act strictly as a "Data Processor" or "Service Provider" governed by a bilateral Data Processing Addendum (DPA).',
      },
      {
        index: '02',
        heading: 'Qualification Intake & Personal Data We Collect',
        content:
          'We collect only the information necessary to evaluate commercial qualification, secure our infrastructure against automated abuse, and deliver executive advisory services through our qualification intake channel:',
        bullets: [
          'Executive Identification & Contact Coordinates: Full name (clientName), executive role/title (roleTitle), corporate email address (email), optional direct telephone number (phone), and optional VIP clearance code (verificationCode).',
          'Commercial Qualification & Entity Data: Company or brand name (companyName), website URL (website), primary market/country (country), commercial industry vertical (industry), annual commercial revenue band (revenueTier / companyTier), advisory budget allocation (budgetRange), preferred engagement track (FULL_ENGAGEMENT or STRATEGIC_CONSULTANCY), primary strategic discipline needed (services), and diagnostic bottleneck context (message).',
          'Automated Security & Anti-Abuse Telemetry: IP address (derived from x-forwarded-for / x-real-ip for rate-limiting at 60 requests per 60-second window), user-agent string, request correlation ID (x-request-id), idempotency key (Idempotency-Key header retained for 24 hours to prevent duplicate submissions), form submission duration in milliseconds (submissionDurationMs time-lock check), and invisible honeypot verification.',
          'Optional Analytics Data (Consent-Gated): If and only if you explicitly select "Accept Analytics" in our Cookie Consent banner, Google Analytics 4 collects anonymized page view and interaction telemetry (with anonymize_ip enabled).',
          'Strict Age Eligibility & Data Minimization Guard: The platform is exclusively intended for corporate business adults (18+). We never knowingly collect or solicit personal data from children under the age of 18 pursuant to COPPA and GDPR-K regulations. We never collect sensitive consumer personal data such as payment card numbers, national identification numbers, or medical data.',
        ],
      },
      {
        index: '03',
        heading: 'How We Use Information & Legal Bases (GDPR Art. 6)',
        content:
          'Under the European Union and United Kingdom General Data Protection Regulation (GDPR), we process personal data only when a valid legal basis applies:',
        bullets: [
          'Steps Prior to Entering a Contract (Art. 6(1)(b)): Evaluating your Strategic Qualification Inquiry, preparing preliminary perceptual and margin diagnostics, and scheduling executive consultations at your request.',
          'Legitimate Interests (Art. 6(1)(f)): Protecting platform security, enforcing IP rate limits, preventing CSRF/SSRF and automated bot spam, maintaining audit logs, and operating our B2B commercial advisory practice.',
          'Explicit Consent (Art. 6(1)(a)): Initializing optional Google Analytics cookies when you click "Accept Analytics." You may withdraw consent at any time with zero impact on essential site access.',
          'Legal Obligations (Art. 6(1)(c)): Complying with applicable tax, accounting, statutory data-rights requests, and international commercial regulations.',
        ],
      },
      {
        index: '04',
        heading: 'Strict Commercial Confidentiality & Zero Data Sale',
        content:
          'All commercial disclosures, revenue tiers, margin bottlenecks, and corporate coordinates submitted through our Qualification Intake portal are treated as privileged commercial intelligence. BRANDMANIA does NOT sell, rent, lease, or "share" (as defined under the California Consumer Privacy Act / CPRA) your personal or corporate information with third-party data brokers or cross-context behavioral advertisers. Furthermore, we never use confidential client inquiry data to train public or third-party generative AI foundation models.',
      },
      {
        index: '05',
        heading: 'Cookie Governance, Sub-Processors & International Transfers',
        content:
          'We disclose data only to vetted infrastructure sub-processors bound by strict confidentiality and data protection obligations (such as cloud hosting, managed database persistence, security rate-limiting, and—only upon your opt-in consent—Google Analytics). Where personal data is transferred outside the European Economic Area (EEA), the United Kingdom, or Switzerland, we rely on European Commission Standard Contractual Clauses (SCCs), the UK International Data Transfer Addendum, or adequacy decisions.',
      },
      {
        index: '06',
        heading: 'Data Retention & Automated Purge Schedule',
        content:
          'We retain personal data only as long as necessary to fulfill the purposes for which it was collected:',
        bullets: [
          'Unqualified or Exploratory Inquiries: Systematically purged from active repositories within 90 days if the inquiry does not proceed to an active advisory dialogue or formal retainer.',
          'Idempotency & Rate-Limit Keys: Ephemeral server-memory keys expire automatically within 60 seconds (rate-limiter buckets) to 24 hours (idempotency deduplication records).',
          'Browser Session Drafts (brandmania_consultation_draft): Stored locally in your browser sessionStorage and automatically deleted the moment you submit the form or close your browser tab.',
          'Active Client Engagements: Retained for the duration of the Master Services Agreement plus statutory financial and legal audit retention periods.',
        ],
      },
      {
        index: '07',
        heading: 'Your Statutory Privacy Rights (EEA, UK & U.S. States)',
        content:
          'Depending on your jurisdiction (including the EEA, UK, Switzerland, California, Virginia, Colorado, Connecticut, and Texas), you have enforceable rights regarding your personal information:',
        bullets: [
          'Right to Access & Know: Request confirmation of whether we process your personal data and receive a portable copy of the specific pieces of information collected.',
          'Right to Rectification: Request correction of inaccurate or incomplete executive or corporate coordinates.',
          'Right to Erasure ("Right to be Forgotten"): Request immediate deletion of your qualification inquiry record and personal data.',
          'Right to Restrict or Object to Processing: Object to processing based on legitimate interests or restrict processing while a concern is resolved.',
          'Right to Withdraw Consent & Global Privacy Control (GPC): Withdraw analytics consent at any time via our Cookie Notice page. We honor browser Global Privacy Control (GPC) signals as a valid opt-out of optional telemetry.',
          'Non-Discrimination: We will never discriminate against any individual or enterprise for exercising statutory privacy rights.',
        ],
      },
      {
        index: '08',
        heading: 'Sensitive Information & Children’s Privacy',
        content:
          'BRANDMANIA is an executive B2B commercial advisory platform intended exclusively for business professionals aged 18 and older. We do not knowingly collect data from minors under 18, nor do we request sensitive personal data (such as government ID numbers, health/medical records, biometric data, or payment card numbers) through our website intake forms. Please do not submit classified or regulated sensitive personal data through general inquiry fields.',
      },
    ] as LegalSection[],
  },

  termsOfEngagement: {
    title: 'Terms of Engagement & Commercial Governance (Terms of Use)',
    subtitle:
      'Governing website access, intellectual property ownership, AI training restrictions, non-binding diagnostic inquiries, and our B2B Master Services Agreement (MSA) framework.',
    lastUpdated: 'November 2026',
    protocolRef: 'BM-TERMS-2026 // v4.0 (B2B & SITE)',
    sections: [
      {
        index: '01',
        heading: 'Acceptance of Terms & Eligibility',
        content:
          'These Terms of Use ("Terms") govern your access to and use of the BRANDMANIA website, digital dossiers, campaign lookbooks, and executive qualification intake system (collectively, the "Site"). By accessing or using the Site, you confirm that you are at least 18 years old and have the legal authority to bind yourself or the commercial entity you represent. If you do not agree to these Terms, you must not use the Site. The Site is exclusively designed for commercial enterprises and business adults (18+); we do not knowingly solicit or collect data from children under 18 years of age pursuant to COPPA and GDPR-K compliance.',
      },
      {
        index: '02',
        heading: 'Informational Purpose & Non-Binding Advisory Status Through the Site',
        content:
          'The Site is an informational and strategic overview of BRANDMANIA’s capabilities across Brand Direction, Margin Recovery, and Consumer Scope. Nothing on the Site constitutes binding financial, legal, tax, or fiduciary advice, nor does it constitute a binding offer to supply services. Submitting a Strategic Qualification Inquiry, receiving a Reference Dossier ID, or communicating with our team does NOT constitute a binding advisory retainer, agency-client, or fiduciary relationship. A formal engagement commences only when both parties execute a written Master Services Agreement (MSA) and Statement of Work (SOW).',
      },
      {
        index: '03',
        heading: 'Client Qualification Threshold & Engagement Tracks',
        content:
          'BRANDMANIA’s Full Strategic Rebuild & Performance Engagement track is engineered for established commercial enterprises generating $700,000+ in annual revenue and high-ticket international brands. For qualifying organizations requiring diagnostic clarity prior to a full rebuild—or when full-engagement capacity is reached—we offer Strategic Consultancy. BRANDMANIA reserves sole and absolute discretion to accept or decline any inquiry based on commercial fit, category conflict, or capacity.',
      },
      {
        index: '04',
        heading: 'Intellectual Property & Prohibition on AI Training / Scraping',
        content:
          'All content on the Site—including the BRANDMANIA wordmark, the BrandEye geometric insignia, the "Branded for the Best" slogan, visual artboards, campaign lookbooks, typography systems, software code, and proprietary methodologies (Brand Direction, Margin Recovery 6-Stage Audit, Consumer Scope 7 Behavioral Dimensions, Perception Theater audits, and the Continuous Causal System)—is owned by BRANDMANIA and protected by international copyright, trademark, and trade dress laws.',
        bullets: [
          'Permitted Use: You are granted a limited, revocable, non-exclusive, non-transferable license to view the Site for your internal business evaluation of BRANDMANIA’s services.',
          'Prohibited Conduct: You may not copy, reproduce, republish, frame, mirror, reverse-engineer, or create derivative works from any part of the Site or our visual artboards without prior written consent.',
          'AI Training & Automated Scraping Restriction: While public search engine and AI citation crawlers may index our public pages and /llms.txt dossiers for search attribution and citation, you may not scrape, harvest, or extract our proprietary visual artwork, lookbooks, or methodology frameworks to train, fine-tune, or populate competing commercial templates or generative AI image/text models.',
        ],
      },
      {
        index: '05',
        heading: 'Acceptable Use & Platform Security Rules',
        content:
          'When interacting with the Site or our API endpoints (/api/v1/inquiries), you agree not to: (a) bypass or tamper with our IP rate limiters, honeypot fields, submission time-locks, or idempotency keys; (b) submit false, impersonated, or automated spam inquiries; (c) inject malicious scripts (XSS), server-side request forgery payloads (SSRF), or cross-site request forgery (CSRF) requests; or (d) interfere with the security or availability of the Site.',
      },
      {
        index: '06',
        heading: 'Pre-Contract Confidentiality & Unsolicited Feedback',
        content:
          'Information you submit through the Strategic Qualification Form is handled in accordance with our Privacy Policy and our strict internal non-disclosure standards. However, please do not transmit unencrypted trade secrets, source code, or regulated personal data before a formal Mutual Non-Disclosure Agreement (NDA) is executed. Any general suggestions or feedback regarding the Site itself may be used by BRANDMANIA without restriction or compensation.',
      },
      {
        index: '07',
        heading: 'Third-Party Links & Scheduling Services',
        content:
          'The Site may reference or link to third-party services (such as executive calendar scheduling tools or analytics providers). We do not control those third-party services, and your use of them is governed by their respective terms and privacy policies.',
      },
      {
        index: '08',
        heading: 'Disclaimers & No Guaranteed Financial Outcomes',
        content:
          'THE SITE AND ALL PUBLIC CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. Commercial performance, margin recovery, and brand valuation depend on market conditions, product quality, and client execution; therefore, public case studies or methodology descriptions do not guarantee specific financial results.',
      },
      {
        index: '09',
        heading: 'Limitation of Liability & Indemnification',
        content:
          'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BRANDMANIA AND ITS PRINCIPALS, OFFICERS, AND ADVISORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE SITE. OUR AGGREGATE LIABILITY FOR ANY CLAIM RELATING TO THE SITE SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100.00). Liability under an active client retainer is governed exclusively by the executed Master Services Agreement (MSA). You agree to indemnify and hold harmless BRANDMANIA from any third-party claims arising from your breach of these Terms or misuse of the Site.',
      },
      {
        index: '10',
        heading: 'Governing Law, Dispute Resolution & General Terms',
        content:
          'These Terms are governed by the principles of international commercial law without regard to conflict-of-law rules. Any dispute arising from these Terms that cannot be resolved through good-faith executive negotiation within thirty (30) days shall be resolved through confidential binding arbitration. If any provision of these Terms is held unenforceable, the remaining provisions will remain in full force. Sections 02, 04, 06, 08, 09, and 10 survive any termination of your access to the Site.',
      },
      {
        index: '11',
        heading: 'Commercial Retainer, Milestone Billing & Refund Policy',
        content:
          'Our commercial engagements, milestone fee structures, and cancellation/refund policies operate under the following strict standards:',
        bullets: [
          'Complimentary Strategic Evaluation ($0): Preliminary Strategic Qualification Inquiries, initial diagnostic evaluations, and fit assessment consultations conducted through the Site are complimentary ($0) and carry no payment, retainer, or commercial obligation.',
          'Milestone Billing & Retainer Architecture: Paid B2B advisory retainers, diagnostic brand directions, and strategic consultancy engagements are billed according to defined milestone schedules specified in a mutually executed Master Services Agreement (MSA) and Statement of Work (SOW).',
          'Non-Refundable Delivered Intellectual Capital: Because strategic diagnostics, commercial architecture, perception theater reviews, and margin audits involve dedicated senior partner allocation, proprietary analysis, and immediate delivery of valuable commercial tradecraft, fees for completed milestones are non-refundable once delivered.',
          'Retainer Termination & Pro-Rata Unearned Refund: Either party may terminate an ongoing commercial retainer for convenience or material breach in accordance with the written notice periods defined in the executed MSA. In the event of early termination for convenience, any unearned, prepaid retainer fees for milestones not yet commenced will be refunded pro-rata in accordance with the executed MSA.',
        ],
      },
    ] as LegalSection[],
  },

  cookieNotice: {
    title: 'Cookie Notice & Browser Storage Disclosure',
    subtitle:
      'Transparent disclosure of first-party browser storage (localStorage & sessionStorage), anti-abuse security headers, and strictly consent-gated analytics.',
    lastUpdated: 'November 2026',
    protocolRef: 'BM-COOKIES-2026 // v4.0 (ePrivacy & GDPR)',
    intro:
      'BRANDMANIA uses a minimal, privacy-first storage architecture. We distinguish between (1) Essential Security & Session Storage required for form reliability, anti-spam protection, and remembering your privacy preferences, and (2) Optional Analytics Cookies (Google Analytics 4), which are completely disabled by default and only initialize if you explicitly click "Accept Analytics." We do not use third-party advertising pixels or cross-site tracking cookies.',
    storageTable: [
      {
        name: 'brandmania_cookie_consent',
        category: 'Essential Security',
        storageType: 'Browser localStorage',
        provider: 'BRANDMANIA (First-Party)',
        purpose:
          'Records your explicit privacy choice ("GRANTED" or "DENIED") so the consent banner does not repeatedly interrupt your session and ensures analytics remain blocked if declined.',
        duration: 'Persistent (until you reset consent or clear browser storage)',
        controlMechanism: 'Use the "Reset Cookie Preference" button on this page or clear site data in your browser.',
      },
      {
        name: 'brandmania_consultation_draft',
        category: 'Essential Session Draft',
        storageType: 'Browser sessionStorage',
        provider: 'BRANDMANIA (First-Party)',
        purpose:
          'Temporarily preserves your in-progress entries across Steps 01–03 of the Strategic Qualification Form so accidental page refreshes do not erase your work.',
        duration: 'Session only (automatically deleted upon form submission or when the browser tab closes)',
        controlMechanism: 'Automatically purged on submit, or close your browser tab / clear session storage.',
      },
      {
        name: 'Idempotency-Key & Rate-Limit Bucket',
        category: 'Essential Security',
        storageType: 'HTTP Header / Server Memory',
        provider: 'BRANDMANIA Security Layer',
        purpose:
          'Prevents duplicate inquiry submissions on double-click and protects the API against automated DDoS or bot floods (60 requests / 60s window).',
        duration: '60 seconds (rate limit) to 24 hours (idempotency record) in volatile server memory',
        controlMechanism: 'Strictly necessary for platform security; cannot be disabled.',
      },
      {
        name: '_ga, _ga_<CONTAINER_ID>',
        category: 'Optional Analytics',
        storageType: 'First-Party Cookie (GA4)',
        provider: 'Google Analytics 4 (Consent-Gated)',
        purpose:
          'Measures aggregate page views, scroll depth, and funnel drop-off with IP anonymization (anonymize_ip: true) to help us improve site performance.',
        duration: 'Up to 24 months (only if consent is GRANTED)',
        controlMechanism: 'Blocked by default. Click "Essential Only" on the banner or "Withdraw Analytics Consent" on this page.',
      },
    ] as StorageArtifactRow[],
    sections: [
      {
        index: '01',
        heading: 'How Cookies & Browser Web Storage Differ',
        content:
          'Cookies are small text files sent with HTTP requests, whereas HTML5 Web Storage (localStorage and sessionStorage) stays strictly inside your browser and is never automatically transmitted to the server on every page load. We use sessionStorage for your qualification form draft so your draft inputs stay on your device until you explicitly click Submit.',
      },
      {
        index: '02',
        heading: 'Strict Opt-In Gating & Global Privacy Control (GPC)',
        content:
          'In accordance with the EU/UK ePrivacy Directive, GDPR, and U.S. state privacy laws, non-essential analytics scripts (Google Analytics) are never injected into the DOM unless localStorage["brandmania_cookie_consent"] === "GRANTED". Selecting "Essential Only" guarantees zero third-party analytics scripts are loaded.',
      },
      {
        index: '03',
        heading: 'Managing or Withdrawing Your Consent',
        content:
          'You can switch between "Accept Analytics" and "Essential Only" at any time using the interactive preference controls on this page, or by clearing site data in your browser settings. Withdrawing consent immediately stops future analytics collection on subsequent page loads.',
      },
    ] as LegalSection[],
    thirdPartySdks: [
      {
        name: 'Next.js Google Fonts (next/font/google)',
        category: 'Typography & Performance',
        provider: 'Next.js Framework / Vercel',
        source: 'Self-hosted at build time (Instrument Serif, Plus Jakarta Sans, JetBrains Mono)',
        dataHandling: 'Zero runtime browser requests to Google servers; zero IP address leakage to fonts.googleapis.com. Font binary files are downloaded at build time and served strictly as first-party static assets.',
        privacyControls: 'Built-in privacy by architecture; 100% compliant with German Regional Court font rulings.',
      },
      {
        name: 'Google Analytics 4 (googletagmanager.com/gtag/js)',
        category: 'Consent-Gated Analytics',
        provider: 'Google LLC (Consent-Gated)',
        source: 'Optional external script injected dynamically only upon explicit user consent',
        dataHandling: 'Collects aggregate, de-identified telemetry with IP anonymization (anonymize_ip: true), zero cross-site advertising signals, and zero ad personalization.',
        privacyControls: 'Strictly opt-in. Unmounted from DOM and blocked completely if consent is DENIED or PENDING.',
      },
      {
        name: 'Calendly (calendly.com)',
        category: 'Scheduling & Booking',
        provider: 'Calendly, Inc.',
        source: 'iframe embed served from https://calendly.com; no client-side Calendly JavaScript SDK is loaded',
        dataHandling: 'Visitor scheduling data (name, email, selected time slot) is processed by Calendly per its own privacy policy. BRANDMANIA does not receive Calendly session data unless the visitor completes a booking and the appointment is confirmed through the Calendly integration.',
        privacyControls: 'Calendly iframe is loaded on /consultation only. No Calendly cookies or trackers are set on other BRANDMANIA pages. Visitors may use the direct qualification form instead of the calendar if they prefer not to interact with Calendly.',
      },
      {
        name: 'Cal.com (cal.com)',
        category: 'Scheduling & Booking',
        provider: 'Cal.com, Inc.',
        source: 'Inline embed served via @calcom/atoms and cal.com secure iframe',
        dataHandling: 'Executive scheduling data (name, email, notes, selected consultation time slot) is processed by Cal.com per its privacy governance. BRANDMANIA receives booking confirmations directly to schedule the 30-minute private briefing.',
        privacyControls: 'Cal.com embed is mounted on /consultation only. Visitors may alternatively submit the 6-field custom time request form if they prefer direct email scheduling.',
      },
    ] as ThirdPartySdkRow[],
  },

  b2bSchedules: [
    {
      code: 'SCHEDULE A // MUTUAL NDA PROTOCOL',
      title: 'Mutual Non-Disclosure Agreement (NDA) Standard',
      summary:
        'Prior to deep-dive commercial audits, unit-economic reviews, or supply-chain margin diagnostics, BRANDMANIA executes a bilateral Mutual NDA (adapted from General Legal’s Institutional Mutual NDA standard). Both parties commit to: (1) strict purpose limitation (evaluating or performing the advisory engagement); (2) restricting access solely to personnel bound by written confidentiality obligations; (3) protecting trade secrets, financial ledgers, CAC/LTV cohorts, and positioning roadmaps; and (4) prompt return or certified destruction of Confidential Information upon request.',
    },
    {
      code: 'SCHEDULE B // MASTER SERVICES AGREEMENT (MSA)',
      title: 'B2B Master Services Agreement & SOW Architecture',
      summary:
        'All paid engagements (Full Strategic Rebuild & Performance Engagements and Strategic Consultancy) are governed by a written MSA and Statement of Work (SOW). Upon full payment of applicable fees, the Client receives full ownership or exclusive commercial license to bespoke final deliverables created specifically for the Client (Client Deliverables), while BRANDMANIA retains ownership of its pre-existing diagnostic frameworks, analytical tools, and general know-how (Background IP).',
    },
    {
      code: 'SCHEDULE C // DATA PROCESSING ADDENDUM (DPA)',
      title: 'Global & U.S. Data Processing Addendum (DPA)',
      summary:
        'Where BRANDMANIA processes personal data contained within a Client’s CRM, e-commerce platform, or customer support logs during a Margin Recovery or Consumer Scope engagement, our Global & U.S. DPA applies automatically. BRANDMANIA acts strictly as a Processor / Service Provider, processes data solely on documented Client instructions, implements technical and organizational security controls (encryption in transit and at rest, RBAC, and row-level isolation), assists with data subject rights requests, and notifies the Client without undue delay in the event of any confirmed personal data breach.',
    },
  ] as B2BScheduleItem[],

  legalFaqs: [
    {
      id: 'faq-legal-01',
      category: 'Confidentiality & NDA',
      question: 'Is the information I submit in the Strategic Qualification Form kept confidential?',
      answer:
        'Yes. Every Strategic Qualification Inquiry—including your revenue tier, commercial bottleneck notes, and corporate contact coordinates—is treated as confidential commercial intelligence. It is reviewed solely by senior BRANDMANIA leadership to assess mutual fit and is never sold, shared with third-party advertisers, or used to train public AI models.',
    },
    {
      id: 'faq-legal-02',
      category: 'Confidentiality & NDA',
      question: 'Do you sign a formal Mutual Non-Disclosure Agreement (NDA) before auditing our internal numbers?',
      answer:
        'Yes. While preliminary qualification intake does not require sensitive financial attachments, before we conduct a forensic Margin Recovery audit or access your internal unit economics, CRM data, or supplier margins, we execute a formal bilateral Mutual NDA protecting both parties.',
    },
    {
      id: 'faq-legal-03',
      category: 'Engagement & MSA',
      question: 'Does submitting the Qualification Form bind our company to a retainer or fee?',
      answer:
        'No. Submitting the Qualification Form is a non-binding request for an executive diagnostic review. A binding commercial relationship and fee obligation only arise when both parties sign a written Master Services Agreement (MSA) and a specific Statement of Work (SOW).',
    },
    {
      id: 'faq-legal-04',
      category: 'Engagement & MSA',
      question: 'Why does BRANDMANIA specify a $700,000+ annual revenue threshold?',
      answer:
        'Our three flagship disciplines—Brand Direction, Margin Recovery, and Consumer Scope—are engineered to compound pricing power and seal operational leakage across established commercial value chains. Businesses generating $700,000+ in annual revenue (or funded high-ticket international brands) possess the transaction volume and operational infrastructure where these interventions produce meaningful commercial leverage.',
    },
    {
      id: 'faq-legal-05',
      category: 'Engagement & MSA',
      question: 'What is the difference between a Full Engagement and Strategic Consultancy?',
      answer:
        'A Full Strategic Rebuild & Performance Engagement is a comprehensive, multi-disciplinary transformation across Brand Direction, Margin Recovery, and Consumer Scope. Strategic Consultancy is a focused advisory and diagnostic engagement designed for qualifying brands seeking architectural direction prior to a full rebuild or when our full-engagement roster is at capacity.',
    },
    {
      id: 'faq-legal-06',
      category: 'Intellectual Property',
      question: 'Who owns the intellectual property (IP) created during a client engagement?',
      answer:
        'Under our standard Master Services Agreement (MSA), upon full payment of fees, the Client owns the bespoke brand assets, positioning narratives, and custom deliverables created specifically for the Client as defined in the SOW, while BRANDMANIA retains ownership of its pre-existing diagnostic methodologies, frameworks, and analytical templates (Background IP).',
    },
    {
      id: 'faq-legal-07',
      category: 'Intellectual Property',
      question: 'Can third parties use BRANDMANIA’s site artwork or frameworks to train AI models?',
      answer:
        'No. While we provide /llms.txt and /llms-full.txt dossiers so AI search engines (such as ChatGPT Search, Perplexity, and Claude) can accurately cite our agency facts, our Terms of Use strictly prohibit scraping or harvesting our visual artboards, lookbooks, or proprietary frameworks to train generative AI models or create competing templates.',
    },
    {
      id: 'faq-legal-08',
      category: 'Privacy & Data Rights',
      question: 'What happens to my Qualification Form draft if I refresh the page before submitting?',
      answer:
        'To prevent accidental data loss, our form temporarily saves your draft inputs in your browser’s local sessionStorage (under the key brandmania_consultation_draft). This draft stays on your device, is never sent to our servers until you click Submit, and is automatically erased the moment your submission succeeds or when you close your browser tab.',
    },
    {
      id: 'faq-legal-09',
      category: 'Privacy & Data Rights',
      question: 'How long do you retain qualification inquiries if we do not move forward?',
      answer:
        'In accordance with our data minimization and retention policy, inquiry records from organizations that do not proceed to an active advisory dialogue or formal engagement are systematically purged from active repositories within 90 days—or immediately upon your written erasure request.',
    },
    {
      id: 'faq-legal-10',
      category: 'Privacy & Data Rights',
      question: 'Do you load Google Analytics or tracking cookies without my permission?',
      answer:
        'No. Optional analytics cookies (Google Analytics 4) are strictly blocked by default. They only initialize if you explicitly click "Accept Analytics" on our consent banner. If you select "Essential Only" or ignore the banner, zero analytics scripts are loaded.',
    },
    {
      id: 'faq-legal-11',
      category: 'Privacy & Data Rights',
      question: 'How do you handle customer data if you audit our CRM or e-commerce store?',
      answer:
        'When an engagement requires analyzing customer touchpoints or order history, we operate as a Data Processor / Service Provider under our Global & U.S. Data Processing Addendum (DPA). Whenever possible, we work with aggregated or de-identified cohort data, and any personal data is processed strictly under your instructions with enterprise-grade access controls.',
    },
    {
      id: 'faq-legal-12',
      category: 'Privacy & Data Rights',
      question: 'How can I exercise my GDPR, UK DPA, or CCPA right to access or delete my data?',
      answer:
        'You may submit a data access, correction, or immediate erasure request at any time through our official Executive Intake channel by referencing "Data Privacy Request" and the corporate email address used in your submission. We verify and fulfill all statutory requests within applicable legal timeframes without fee or penalty.',
    },
  ] as LegalFaqItem[],

  cookieConsent: {
    bannerTitle: 'Privacy & Telemetry Governance',
    bannerText:
      'We use essential first-party storage to protect intake form security and preserve your session draft. Optional analytics (Google Analytics 4) are strictly disabled unless you opt in.',
    acceptAllLabel: 'Accept Analytics',
    essentialOnlyLabel: 'Essential Only',
    privacyPolicyLabel: 'Privacy Policy',
    cookieNoticeLabel: 'Cookie Notice',
  },

  businessDetails: {
    brandName: 'BRANDMANIA — Strategic Brand & Commercial Advisory',
    operatingEntity: 'BRANDMANIA — Strategic Brand & Commercial Advisory',
    corePractices: 'Brand Direction, Margin Recovery & Consumer Scope',
    qualificationScope: 'B2B Commercial Enterprises ($700,000+ Annual Revenue) & High-Ticket International Brands',
    dpoLiaison: 'Accessible via /contact and /privacy#data-deletion (Protocol Ref: BM-CORP-2026)',
    protocolRef: 'BM-CORP-2026',
  } as BusinessDetails,
};
