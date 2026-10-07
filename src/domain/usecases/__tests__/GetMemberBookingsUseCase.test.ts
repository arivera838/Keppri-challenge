import { GetMemberBookingsUseCase } from '../GetMemberBookingsUseCase';
import type { Booking } from '../../entities/Booking';
import type { IDateProvider } from '../../services/IDateProvider';
import { InMemoryBookingRepository } from './useCaseTestDoubles';

class FixedDateProvider implements IDateProvider {
  now(): Date {
    return new Date('2026-03-10T12:00:00.000Z');
  }
}

describe('GetMemberBookingsUseCase', () => {
  it('returns bookings sorted by start time', async () => {
    const bookings: Booking[] = [
      {
        id: 'B-2',
        classId: 'C-05',
        memberId: 'S-0001',
        diaOffset: 1,
        hora: '18:00',
        className: 'Spinning',
        instructor: 'Andrés',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'B-1',
        classId: 'C-02',
        memberId: 'S-0001',
        diaOffset: 0,
        hora: '23:00',
        className: 'Funcional',
        instructor: 'Camila',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];
    const useCase = new GetMemberBookingsUseCase(
      new InMemoryBookingRepository(bookings),
      new FixedDateProvider(),
    );
    const result = await useCase.execute('S-0001');
    expect(result.map((b) => b.id)).toEqual(['B-1', 'B-2']);
  });
});
