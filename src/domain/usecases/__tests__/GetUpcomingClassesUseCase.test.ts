import { GetUpcomingClassesUseCase } from '../GetUpcomingClassesUseCase';
import type { IDateProvider } from '../../services/IDateProvider';
import {
  InMemoryBookingRepository,
  InMemoryClassRepository,
  sampleClass,
  fullClass,
} from './useCaseTestDoubles';

class FixedDateProvider implements IDateProvider {
  constructor(private readonly fixed: Date) {}
  now(): Date {
    return this.fixed;
  }
}

describe('GetUpcomingClassesUseCase', () => {
  it('filters past classes and computes availability', async () => {
    const pastClass = { ...sampleClass, id: 'C-PAST', hora: '06:00' };
    const classRepo = new InMemoryClassRepository([
      pastClass,
      sampleClass,
      fullClass,
    ]);
    const bookingRepo = new InMemoryBookingRepository();
    const useCase = new GetUpcomingClassesUseCase(
      classRepo,
      bookingRepo,
      new FixedDateProvider(new Date('2026-03-10T15:00:00.000Z')),
    );

    const result = await useCase.execute();
    expect(result.map((c) => c.id)).toEqual(['C-02', 'C-03']);
    const funcional = result.find((c) => c.id === 'C-02');
    expect(funcional?.availableSpots).toBe(6);
    const yoga = result.find((c) => c.id === 'C-03');
    expect(yoga?.isFull).toBe(true);
  });
});
