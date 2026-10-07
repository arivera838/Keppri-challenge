import type { ClassItem } from '../../entities/ClassItem';
import type { Booking } from '../../entities/Booking';
import type { IClassRepository } from '../../repositories/IClassRepository';
import type { IBookingRepository } from '../../repositories/IBookingRepository';

export class InMemoryClassRepository implements IClassRepository {
  constructor(private readonly classes: ClassItem[]) {}

  async getAll(): Promise<ClassItem[]> {
    return [...this.classes];
  }

  async getById(classId: string): Promise<ClassItem | null> {
    return this.classes.find((c) => c.id === classId) ?? null;
  }
}

export class InMemoryBookingRepository implements IBookingRepository {
  private bookings: Booking[] = [];

  constructor(initial: Booking[] = []) {
    this.bookings = [...initial];
  }

  async hydrate(): Promise<void> {}

  async getAllActive(): Promise<Booking[]> {
    return this.bookings.filter((b) => b.status === 'active');
  }

  async getActiveByMember(memberId: string): Promise<Booking[]> {
    return this.bookings.filter(
      (b) => b.memberId === memberId && b.status === 'active',
    );
  }

  async getActiveByClass(classId: string): Promise<Booking[]> {
    return this.bookings.filter(
      (b) => b.classId === classId && b.status === 'active',
    );
  }

  async findActiveByMemberAndClass(
    memberId: string,
    classId: string,
  ): Promise<Booking | null> {
    return (
      this.bookings.find(
        (b) =>
          b.memberId === memberId &&
          b.classId === classId &&
          b.status === 'active',
      ) ?? null
    );
  }

  async save(booking: Booking): Promise<void> {
    this.bookings = [...this.bookings.filter((b) => b.id !== booking.id), booking];
  }

  async remove(bookingId: string): Promise<void> {
    this.bookings = this.bookings.filter((b) => b.id !== bookingId);
  }
}

export const sampleClass: ClassItem = {
  id: 'C-02',
  name: 'Funcional',
  instructor: 'Camila Ospina',
  diaOffset: 0,
  hora: '23:59',
  durationMin: 60,
  cupoTotal: 15,
  ocupados: 9,
};

export const fullClass: ClassItem = {
  id: 'C-03',
  name: 'Yoga',
  instructor: 'Valentina Ríos',
  diaOffset: 0,
  hora: '23:59',
  durationMin: 60,
  cupoTotal: 12,
  ocupados: 12,
};
