import { describe, it, expect } from 'vitest';
import { getFunnelBySlug, getAllFunnelSlugs } from '@/content/funnels';

describe('Funnel Configuration Registry', () => {
  it('successfully retrieves the default cold outreach funnel', () => {
    const funnel = getFunnelBySlug('default');
    expect(funnel).not.toBeNull();
    expect(funnel?.hero.headline).toBe('Attention Does Not Equal Revenue');
    expect(funnel?.painPoints.length).toBe(3);
    expect(funnel?.mechanism.stages.length).toBe(6);
  });

  it('successfully retrieves vertical funnels', () => {
    const marginFunnel = getFunnelBySlug('margin-recovery');
    expect(marginFunnel).not.toBeNull();
    expect(marginFunnel?.meta.slug).toBe('margin-recovery');

    const jewelryFunnel = getFunnelBySlug('jewelry');
    expect(jewelryFunnel).not.toBeNull();
    expect(jewelryFunnel?.meta.slug).toBe('jewelry');
  });

  it('returns null for non-existent funnels', () => {
    const missing = getFunnelBySlug('non-existent-campaign-slug');
    expect(missing).toBeNull();
  });

  it('returns all registered funnel slugs', () => {
    const slugs = getAllFunnelSlugs();
    expect(slugs).toContain('default');
    expect(slugs).toContain('margin-recovery');
    expect(slugs).toContain('brand-direction');
    expect(slugs).toContain('consumer-scope');
    expect(slugs).toContain('jewelry');
    expect(slugs).toContain('designer-boutiques');
  });
});
