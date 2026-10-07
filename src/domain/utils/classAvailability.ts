import type { ClassItem } from '../entities/ClassItem';
import type { Booking } from '../entities/Booking';

export function countActiveBookingsForClass(
  classId: string,
  bookings: Booking[],
): number {
  return bookings.filter(
    (b) => b.classId === classId && b.status === 'active',
  ).length;
}

export function getAvailableSpots(
  classItem: ClassItem,
  activeBookingsForClass: number,
): number {
  const taken = classItem.ocupados + activeBookingsForClass;
  return Math.max(0, classItem.cupoTotal - taken);
}
