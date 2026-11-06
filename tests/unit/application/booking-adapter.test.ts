import { describe, it, expect } from 'vitest';
import { CalendlyBookingAdapter } from '@/infrastructure/booking/calendly-booking.adapter';
import { CalcomBookingAdapter } from '@/infrastructure/booking/calcom-booking.adapter';
import { DevBookingAdapter } from '@/infrastructure/booking/dev-booking.adapter';

describe('Booking Provider Infrastructure Adapters', () => {
  it('CalendlyBookingAdapter formats URL with client parameters', async () => {
    const adapter = new CalendlyBookingAdapter('https://calendly.com/brandmania/test');
    const url = await adapter.generateBookingUrl({
      clientName: 'Julian Sterling',
      email: 'julian@sterling.co.uk',
      companyName: 'Sterling Haute Horlogerie',
      inquiryId: 'inq_12345',
    });

    expect(url).toContain('https://calendly.com/brandmania/test?');
    expect(url).toContain('name=Julian+Sterling');
    expect(url).toContain('email=julian%40sterling.co.uk');
    expect(url).toContain('a1=Sterling+Haute+Horlogerie');
    expect(url).toContain('a2=inq_12345');
    expect(adapter.getProviderName()).toBe('Calendly');
  });

  it('CalcomBookingAdapter formats Cal.com URL with parameters', async () => {
    const adapter = new CalcomBookingAdapter('https://cal.com/brandmaina-consultation');
    const url = await adapter.generateBookingUrl({
      clientName: 'Julian Sterling',
      email: 'julian@sterling.co.uk',
      companyName: 'Sterling Haute Horlogerie',
      inquiryId: 'inq_12345',
    });

    expect(url).toContain('https://cal.com/brandmaina-consultation?');
    expect(url).toContain('name=Julian+Sterling');
    expect(url).toContain('email=julian%40sterling.co.uk');
    expect(url).toContain('notes=Sterling+Haute+Horlogerie');
    expect(adapter.getProviderName()).toBe('Calcom');
  });

  it('DevBookingAdapter produces internal verification URL', async () => {
    const adapter = new DevBookingAdapter();
    const url = await adapter.generateBookingUrl({
      clientName: 'Alexander Vance',
      email: 'alexander@vance.ch',
      companyName: 'Vance Co',
      inquiryId: 'inq_999',
    });

    expect(url).toBe('/dev/foundation?booking_inquiry=inq_999');
    expect(adapter.getProviderName()).toBe('DevBooking');
  });
});
