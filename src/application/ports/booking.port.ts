
export interface BookingContext {
  inquiryId?: string;
  clientName: string;
  email: string;
  companyName: string;
  industry?: string;
  revenueTier?: string;
}

export interface IBookingProvider {

  generateBookingUrl(context: BookingContext): Promise<string>;

  getProviderName(): string;
}
