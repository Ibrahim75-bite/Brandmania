import { IBookingProvider, BookingContext } from '@/application/ports/booking.port';

export class DevBookingAdapter implements IBookingProvider {
  public async generateBookingUrl(context: BookingContext): Promise<string> {
    const id = context.inquiryId || `dev_${Date.now()}`;
    return `/dev/foundation?booking_inquiry=${encodeURIComponent(id)}`;
  }

  public getProviderName(): string {
    return 'DevBooking';
  }
}
