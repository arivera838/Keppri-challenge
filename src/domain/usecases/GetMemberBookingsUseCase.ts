import type { Booking } from '../entities/Booking';
import type { IBookingRepository } from '../repositories/IBookingRepository';
import type { IDateProvider } from '../services/IDateProvider';
import { SystemDateProvider } from '../services/IDateProvider';
import { calculateClassDateTime } from '../utils/dateUtils';

export type MemberBookingView = Booking & {
  startAt: string;
};

export class GetMemberBookingsUseCase {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly dateProvider: IDateProvider = new SystemDateProvider(),
  ) {}

  async execute(memberId: string): Promise<MemberBookingView[]> {
    const now = this.dateProvider.now();
    const bookings = await this.bookingRepository.getActiveByMember(memberId);

    return bookings
      .map((booking) => ({
        ...booking,
        startAt: calculateClassDateTime(
          now,
          booking.diaOffset,
          booking.hora,
        ).toISOString(),
      }))
      .sort(
        (a, b) =>
          new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
      );
  }
}
