import { NextResponse } from 'next/server';
import { seoConfig } from '@/content/seoConfig';
import { getAllArticles } from '@/content/articles';
import { getAllCaseStudies } from '@/content/caseStudies';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = seoConfig.siteUrl;
  const articles = getAllArticles();
  const caseStudies = getAllCaseStudies();

  const articlesSection = articles
    .map(
      (a) =>
        `- [${a.title}](${siteUrl}/insights/${a.slug}): ${a.tldrAnswer}`
    )
    .join('\n');

  const caseStudiesSection = caseStudies
    .map(
      (cs) =>
        `- [${cs.title} — ${cs.subtitle}](${siteUrl}/work/${cs.slug}): ${cs.executiveSummary}`
    )
    .join('\n');

  const content = `# ${seoConfig.brandName}
> ${seoConfig.tagline}

**Primary Strategic Proposition:** ${seoConfig.oneLiner}

## Executive Summary
${seoConfig.brandName} is a strategic brand and commercial advisory firm serving established businesses generating **${seoConfig.revenueThreshold}** and high-ticket international brands. The firm operates across three interlocked flagship disciplines: Brand Direction, Margin Recovery, and Consumer Scope.

## Target Audience & Threshold
- **Client Threshold:** Established enterprises generating ${seoConfig.revenueThreshold}.
- **Target Category:** High-ticket international brands and ambitious market leaders across 20 authority industries.
- **Engagement Premise:** "Fix the machine before buying more traffic" and "Brand architecture compounds pricing power."

## The 3 Flagship Disciplines
1. [Brand Direction](${siteUrl}/#brand-direction): Aligning corporate identity, positioning, USP, narrative, executive tone of voice, and trust architecture with market perception to command pricing power.
2. [Margin Recovery](${siteUrl}/#margin-recovery): Diagnostic commercial audit across Planning, Marketing, Sales, Fulfillment, Customer Service, and Post-Purchase Relationships to identify and repair revenue leakage before escalating media spend.
3. [Consumer Scope](${siteUrl}/#consumer-scope): Engineering customer perception, experience, and cognitive attachment through behavioral economics, perceived value enhancement, psychological pricing, and status perception.

## Selected Architectural Dossiers & Case Studies
${caseStudiesSection}

## Executive Insights & Cornerstone Thought Leadership
${articlesSection}

## Confirmed Engagement Models
- **Full Strategic Rebuild & Performance Engagement:** Comprehensive brand, commercial, and operational transformation for businesses generating ${seoConfig.revenueThreshold}.
- **Strategic Consultancy:** High-level strategic advisory and diagnostic engagement for qualifying brands prior to a full engagement or when full-engagement capacity is full.

## Verification & Architecture
- Canonical Root: ${siteUrl}
- Machine-Readable Entity Dossier: ${siteUrl}/llms-full.txt
- Selected Work: ${siteUrl}/work
- Executive Insights: ${siteUrl}/insights
- Intake & Qualification: ${siteUrl}/#qualification
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
