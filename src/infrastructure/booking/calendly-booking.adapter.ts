import { IBookingProvider, BookingContext } from '@/application/ports/booking.port';

export class CalendlyBookingAdapter implements IBookingProvider {
  constructor(private readonly baseUrl: string = 'https://calendly.com/brandmania/executive-briefing') {}

  public async generateBookingUrl(context: BookingContext): Promise<string> {
    const params = new URLSearchParams();
    if (context.clientName) params.set('name', context.clientName);
    if (context.email) params.set('email', context.email);
    if (context.companyName) params.set('a1', context.companyName);
    if (context.inquiryId) params.set('a2', context.inquiryId);

    const queryString = params.toString();
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }

  public getProviderName(): string {
    return 'Calendly';
  }
}
