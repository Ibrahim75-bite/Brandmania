import { CompanyTier } from '../value-objects/company-tier.vo';
import { BudgetRange } from '../value-objects/budget-range.vo';
import { BusinessRuleViolationError } from '../errors/domain.error';

export class InquirySubmissionRules {
  /**
   * High-ticket enterprise rule: If client represents Haute Luxury,
   * the minimum budget tier must meet high-ticket standards.
   */
  public static validateHighTicketAlignment(tier: CompanyTier, budget: BudgetRange): void {
    if (tier.value === 'HAUTE_LUXURY' && budget.getMinimumBudgetUsd() < 100000) {
      throw new BusinessRuleViolationError(
        'Haute Luxury engagements require a minimum budget allocation of $100,000+'
      );
    }
  }

  /**
   * Determine priority routing score for incoming inquiries based on tier and scope.
   */
  public static calculatePriorityScore(tier: CompanyTier, budget: BudgetRange, serviceCount: number): number {
    let score = 0;
    if (tier.value === 'HAUTE_LUXURY') score += 50;
    else if (tier.value === 'GLOBAL_ENTERPRISE') score += 40;
    else if (tier.value === 'MID_MARKET') score += 20;
    else score += 10;

    score += Math.min(budget.getMinimumBudgetUsd() / 10000, 40);
    score += serviceCount * 5;
    return score;
  }
}
