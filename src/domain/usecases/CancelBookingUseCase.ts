import {
  BusinessError,
  BusinessErrorCode,
  type Result,
} from '../errors/BusinessError';
import type { IBookingRepository } from '../repositories/IBookingRepository';
import type { IDateProvider } from '../services/IDateProvider';
import { SystemDateProvider } from '../services/IDateProvider';
import { calculateClassDateTime, canCancelBooking } from '../utils/dateUtils';

export type CancelBookingInput = {
  bookingId: string;
  memberId: string;
};

export class CancelBookingUseCase {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly dateProvider: IDateProvider = new SystemDateProvider(),
  ) {}

  async execute(input: CancelBookingInput): Promise<Result<void>> {
    const bookings = await this.bookingRepository.getActiveByMember(
      input.memberId,
    );
    const booking = bookings.find((b) => b.id === input.bookingId);

    if (!booking) {
      return {
        success: false,
        error: new BusinessError(BusinessErrorCode.BOOKING_NOT_FOUND),
      };
    }

    const now = this.dateProvider.now();
    const classStart = calculateClassDateTime(
      now,
      booking.diaOffset,
      booking.hora,
    );

    if (!canCancelBooking(classStart, now)) {
      return {
        success: false,
        error: new BusinessError(BusinessErrorCode.CANCEL_TOO_LATE),
      };
    }

    await this.bookingRepository.remove(booking.id);
    return { success: true, data: undefined };
  }
}
