import { renderHook, waitFor } from '@testing-library/react-native';
import { useMemberBookings } from '../useMemberBookings';
import { container } from '../../../di/container';

jest.mock('../../../di/container', () => ({
  container: {
    init: jest.fn().mockResolvedValue(undefined),
    getGetMemberBookingsUseCase: jest.fn(),
    getCancelBookingUseCase: jest.fn(),
  },
}));

describe('useMemberBookings', () => {
  it('loads member bookings', async () => {
    (container.getGetMemberBookingsUseCase as jest.Mock).mockReturnValue({
      execute: jest.fn().mockResolvedValue([]),
    });

    const { result } = await renderHook(() => useMemberBookings());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.bookings).toEqual([]);
  });
});
