/**
 * Booking Provider Port
 *
 * Defines the contract for scheduling and consultation booking integrations.
 * Allows switching between Calendly, custom modal, Google Calendar, or other providers
 * without affecting application use cases or domain entities.
 */

export interface BookingContext {
  inquiryId?: string;
  clientName: string;
  email: string;
  companyName: string;
  industry?: string;
  revenueTier?: string;
}

export interface IBookingProvider {
  /**
   * Generates a direct, authenticated, or pre-filled booking URL.
   */
  generateBookingUrl(context: BookingContext): Promise<string>;

  /**
   * Returns provider metadata for diagnostic logs and UI rendering.
   */
  getProviderName(): string;
}
