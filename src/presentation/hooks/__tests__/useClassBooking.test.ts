import { renderHook, waitFor } from '@testing-library/react-native';
import { useClassBooking } from '../useClassBooking';
import { container } from '../../../di/container';

jest.mock('../../../di/container', () => ({
  container: {
    init: jest.fn().mockResolvedValue(undefined),
    getGetUpcomingClassesUseCase: jest.fn(),
    getBookClassUseCase: jest.fn(),
  },
}));

describe('useClassBooking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads upcoming classes', async () => {
    (container.getGetUpcomingClassesUseCase as jest.Mock).mockReturnValue({
      execute: jest.fn().mockResolvedValue([
        {
          id: 'C-02',
          name: 'Funcional',
          instructor: 'Camila',
          diaOffset: 0,
          hora: '18:00',
          durationMin: 60,
          cupoTotal: 15,
          ocupados: 9,
          schedule: {
            startAt: '2026-01-01T23:00:00.000Z',
            calendarDayKey: '2026-01-01',
            diaOffset: 0,
            hora: '18:00',
          },
          availableSpots: 6,
          isFull: false,
        },
      ]),
    });

    const { result } = await renderHook(() => useClassBooking());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.classes).toHaveLength(1);
  });
});
