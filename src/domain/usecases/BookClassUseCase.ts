import type { Booking } from '../entities/Booking';
import {
  BusinessError,
  BusinessErrorCode,
  type Result,
} from '../errors/BusinessError';
import type { IClassRepository } from '../repositories/IClassRepository';
import type { IBookingRepository } from '../repositories/IBookingRepository';
import type { IDateProvider } from '../services/IDateProvider';
import { SystemDateProvider } from '../services/IDateProvider';
import {
  countActiveBookingsForClass,
  getAvailableSpots,
} from '../utils/classAvailability';

export type BookClassInput = {
  classId: string;
  memberId: string;
};

export class BookClassUseCase {
  constructor(
    private readonly classRepository: IClassRepository,
    private readonly bookingRepository: IBookingRepository,
    private readonly dateProvider: IDateProvider = new SystemDateProvider(),
  ) {}

  async execute(input: BookClassInput): Promise<Result<Booking>> {
    const classItem = await this.classRepository.getById(input.classId);
    if (!classItem) {
      return {
        success: false,
        error: new BusinessError(BusinessErrorCode.CLASS_NOT_FOUND),
      };
    }

    const now = this.dateProvider.now();

    const [activeBookings, existing] = await Promise.all([
      this.bookingRepository.getAllActive(),
      this.bookingRepository.findActiveByMemberAndClass(
        input.memberId,
        input.classId,
      ),
    ]);

    if (existing) {
      return {
        success: false,
        error: new BusinessError(BusinessErrorCode.DUPLICATE_BOOKING),
      };
    }

    const localForClass = countActiveBookingsForClass(
      input.classId,
      activeBookings,
    );
    const available = getAvailableSpots(classItem, localForClass);
    if (available <= 0) {
      return {
        success: false,
        error: new BusinessError(BusinessErrorCode.NO_SPOTS),
      };
    }

    const memberDayBookings = activeBookings.filter(
      (b) =>
        b.memberId === input.memberId &&
        b.status === 'active' &&
        b.diaOffset === classItem.diaOffset,
    );
    if (memberDayBookings.length >= 2) {
      return {
        success: false,
        error: new BusinessError(BusinessErrorCode.MAX_DAILY_BOOKINGS),
      };
    }

    const booking: Booking = {
      id: `B-${input.classId}-${Date.now()}`,
      classId: classItem.id,
      memberId: input.memberId,
      diaOffset: classItem.diaOffset,
      hora: classItem.hora,
      className: classItem.name,
      instructor: classItem.instructor,
      status: 'active',
      createdAt: now.toISOString(),
    };

    await this.bookingRepository.save(booking);

    return { success: true, data: booking };
  }
}
