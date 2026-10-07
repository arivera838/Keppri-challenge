import type { Booking } from '../../domain/entities/Booking';
import type { IBookingRepository } from '../../domain/repositories/IBookingRepository';
import { AsyncStorageBookingDataSource } from '../datasources/AsyncStorageBookingDataSource';
import { mapBookingToStorage, mapStorageToBooking } from '../mappers/ClassMapper';

export class BookingRepositoryImpl implements IBookingRepository {
  constructor(
    private readonly dataSource: AsyncStorageBookingDataSource = new AsyncStorageBookingDataSource(),
  ) {}

  async hydrate(): Promise<void> {
    await this.dataSource.hydrate();
  }

  private async readActive(): Promise<Booking[]> {
    const stored = await this.dataSource.getAll();
    return stored
      .filter((b) => b.status === 'active')
      .map(mapStorageToBooking);
  }

  async getAllActive(): Promise<Booking[]> {
    return this.readActive();
  }

  async getActiveByMember(memberId: string): Promise<Booking[]> {
    const active = await this.readActive();
    return active.filter((b) => b.memberId === memberId);
  }

  async getActiveByClass(classId: string): Promise<Booking[]> {
    const active = await this.readActive();
    return active.filter((b) => b.classId === classId);
  }

  async findActiveByMemberAndClass(
    memberId: string,
    classId: string,
  ): Promise<Booking | null> {
    const active = await this.readActive();
    return (
      active.find(
        (b) => b.memberId === memberId && b.classId === classId,
      ) ?? null
    );
  }

  async save(booking: Booking): Promise<void> {
    const all = await this.dataSource.getAll();
    const next = [...all.filter((b) => b.id !== booking.id), mapBookingToStorage(booking)];
    await this.dataSource.saveAll(next);
  }

  async remove(bookingId: string): Promise<void> {
    const all = await this.dataSource.getAll();
    const next = all.filter((b) => b.id !== bookingId);
    await this.dataSource.saveAll(next);
  }
}
