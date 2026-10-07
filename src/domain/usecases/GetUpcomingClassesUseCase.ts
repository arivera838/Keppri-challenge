import type { ClassWithAvailability } from '../entities/ClassWithAvailability';
import type { IClassRepository } from '../repositories/IClassRepository';
import type { IBookingRepository } from '../repositories/IBookingRepository';
import type { IDateProvider } from '../services/IDateProvider';
import { SystemDateProvider } from '../services/IDateProvider';
import {
  buildClassDate,
  calculateClassDateTime,
  isClassStarted,
} from '../utils/dateUtils';
import {
  countActiveBookingsForClass,
  getAvailableSpots,
} from '../utils/classAvailability';

export class GetUpcomingClassesUseCase {
  constructor(
    private readonly classRepository: IClassRepository,
    private readonly bookingRepository: IBookingRepository,
    private readonly dateProvider: IDateProvider = new SystemDateProvider(),
  ) {}

  async execute(): Promise<ClassWithAvailability[]> {
    const now = this.dateProvider.now();
    const [classes, activeBookings] = await Promise.all([
      this.classRepository.getAll(),
      this.bookingRepository.getAllActive(),
    ]);

    const upcoming = classes
      .map((classItem) => {
        const start = calculateClassDateTime(
          now,
          classItem.diaOffset,
          classItem.hora,
        );
        if (isClassStarted(start, now)) {
          return null;
        }
        const localBookings = countActiveBookingsForClass(
          classItem.id,
          activeBookings,
        );
        const availableSpots = getAvailableSpots(classItem, localBookings);
        return {
          ...classItem,
          schedule: buildClassDate(now, classItem.diaOffset, classItem.hora),
          availableSpots,
          isFull: availableSpots === 0,
        };
      })
      .filter((item): item is ClassWithAvailability => item !== null);

    return upcoming.sort(
      (a, b) =>
        new Date(a.schedule.startAt).getTime() -
        new Date(b.schedule.startAt).getTime(),
    );
  }
}
