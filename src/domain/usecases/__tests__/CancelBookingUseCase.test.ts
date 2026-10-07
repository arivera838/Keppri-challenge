import { CancelBookingUseCase } from '../CancelBookingUseCase';
import { BusinessErrorCode } from '../../errors/BusinessError';
import type { Booking } from '../../entities/Booking';
import type { IDateProvider } from '../../services/IDateProvider';
import { InMemoryBookingRepository } from './useCaseTestDoubles';

class FixedDateProvider implements IDateProvider {
  constructor(private readonly fixed: Date) {}
  now(): Date {
    return this.fixed;
  }
}

const memberId = 'S-0001';

describe('CancelBookingUseCase', () => {
  const booking: Booking = {
    id: 'B-1',
    classId: 'C-02',
    memberId,
    diaOffset: 0,
    hora: '18:00',
    className: 'Funcional',
    instructor: 'Camila',
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  it('blocks cancel within 2 hours (RN-04)', async () => {
    const repo = new InMemoryBookingRepository([booking]);
    const useCase = new CancelBookingUseCase(
      repo,
      new FixedDateProvider(new Date('2026-03-10T22:00:00.000Z')),
    );
    const result = await useCase.execute({ bookingId: 'B-1', memberId });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe(BusinessErrorCode.CANCEL_TOO_LATE);
    }
  });

  it('cancels when more than 2 hours remain', async () => {
    const repo = new InMemoryBookingRepository([booking]);
    const useCase = new CancelBookingUseCase(
      repo,
      new FixedDateProvider(new Date('2026-03-10T10:00:00.000Z')),
    );
    const result = await useCase.execute({ bookingId: 'B-1', memberId });
    expect(result.success).toBe(true);
    expect(await repo.getAllActive()).toHaveLength(0);
  });
});
