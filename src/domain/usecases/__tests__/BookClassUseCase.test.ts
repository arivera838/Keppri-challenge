import { BookClassUseCase } from '../BookClassUseCase';
import { BusinessErrorCode } from '../../errors/BusinessError';
import type { Booking } from '../../entities/Booking';
import type { IDateProvider } from '../../services/IDateProvider';
import {
  InMemoryBookingRepository,
  InMemoryClassRepository,
  fullClass,
  sampleClass,
} from './useCaseTestDoubles';

class FixedDateProvider implements IDateProvider {
  now(): Date {
    return new Date('2026-03-10T15:00:00.000Z');
  }
}

const memberId = 'S-0001';

function booking(classId: string, diaOffset: number): Booking {
  return {
    id: `B-${classId}`,
    classId,
    memberId,
    diaOffset,
    hora: '23:59',
    className: 'Test',
    instructor: 'Inst',
    status: 'active',
    createdAt: new Date().toISOString(),
  };
}

describe('BookClassUseCase', () => {
  it('rejects when class is full (RN-01)', async () => {
    const useCase = new BookClassUseCase(
      new InMemoryClassRepository([fullClass]),
      new InMemoryBookingRepository(),
      new FixedDateProvider(),
    );
    const result = await useCase.execute({ classId: 'C-03', memberId });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe(BusinessErrorCode.NO_SPOTS);
    }
  });

  it('rejects duplicate booking (RN-02)', async () => {
    const useCase = new BookClassUseCase(
      new InMemoryClassRepository([sampleClass]),
      new InMemoryBookingRepository([booking('C-02', 0)]),
      new FixedDateProvider(),
    );
    const result = await useCase.execute({ classId: 'C-02', memberId });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe(BusinessErrorCode.DUPLICATE_BOOKING);
    }
  });

  it('rejects third booking same day (RN-03)', async () => {
    const useCase = new BookClassUseCase(
      new InMemoryClassRepository([sampleClass]),
      new InMemoryBookingRepository([
        booking('C-01', 0),
        booking('C-04', 0),
      ]),
      new FixedDateProvider(),
    );
    const result = await useCase.execute({ classId: 'C-02', memberId });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe(BusinessErrorCode.MAX_DAILY_BOOKINGS);
    }
  });

  it('books successfully when rules pass', async () => {
    const bookingRepo = new InMemoryBookingRepository();
    const useCase = new BookClassUseCase(
      new InMemoryClassRepository([sampleClass]),
      bookingRepo,
      new FixedDateProvider(),
    );
    const result = await useCase.execute({ classId: 'C-02', memberId });
    expect(result.success).toBe(true);
    const active = await bookingRepo.getAllActive();
    expect(active).toHaveLength(1);
  });
});
