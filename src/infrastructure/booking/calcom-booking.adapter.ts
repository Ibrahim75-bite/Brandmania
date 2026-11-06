import { IBookingProvider, BookingContext } from '@/application/ports/booking.port';

export class CalcomBookingAdapter implements IBookingProvider {
  constructor(private readonly baseUrl: string = process.env.NEXT_PUBLIC_BOOKING_URL || '') {}

  public async generateBookingUrl(context: BookingContext): Promise<string> {
    const url = this.baseUrl || 'https://cal.com/brandmaina-consultation';
    const params = new URLSearchParams();
    if (context.clientName) params.set('name', context.clientName);
    if (context.email) params.set('email', context.email);
    if (context.companyName) params.set('notes', context.companyName);

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  public getProviderName(): string {
    return 'Calcom';
  }
}

