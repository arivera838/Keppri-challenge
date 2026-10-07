import type { Booking } from '../entities/Booking';

export interface IBookingRepository {
  getAllActive(): Promise<Booking[]>;
  getActiveByMember(memberId: string): Promise<Booking[]>;
  getActiveByClass(classId: string): Promise<Booking[]>;
  findActiveByMemberAndClass(
    memberId: string,
    classId: string,
  ): Promise<Booking | null>;
  save(booking: Booking): Promise<void>;
  remove(bookingId: string): Promise<void>;
  hydrate(): Promise<void>;
}
