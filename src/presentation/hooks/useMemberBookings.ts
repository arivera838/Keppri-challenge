import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_MEMBER } from '../../core/constants/member';
import type { MemberBookingView } from '../../domain/usecases/GetMemberBookingsUseCase';
import { BusinessError } from '../../domain/errors/BusinessError';
import { container } from '../../di/container';

export function useMemberBookings() {
  const [bookings, setBookings] = useState<MemberBookingView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingCancelId, setPendingCancelId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await container.init();
      const useCase = container.getGetMemberBookingsUseCase();
      const result = await useCase.execute(DEFAULT_MEMBER.id);
      setBookings(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const requestCancel = useCallback((bookingId: string) => {
    setError(null);
    setPendingCancelId(bookingId);
  }, []);

  const dismissCancel = useCallback(() => {
    setPendingCancelId(null);
  }, []);

  const confirmCancel = useCallback(async () => {
    if (!pendingCancelId) {
      return;
    }
    setError(null);
    try {
      const useCase = container.getCancelBookingUseCase();
      const result = await useCase.execute({
        bookingId: pendingCancelId,
        memberId: DEFAULT_MEMBER.id,
      });
      if (!result.success) {
        setError(result.error.message);
        setPendingCancelId(null);
        return;
      }
      setPendingCancelId(null);
      await refresh();
    } catch (e) {
      setError(
        e instanceof BusinessError
          ? e.message
          : e instanceof Error
            ? e.message
            : 'No se pudo cancelar',
      );
      setPendingCancelId(null);
    }
  }, [pendingCancelId, refresh]);

  const pendingBooking =
    bookings.find((b) => b.id === pendingCancelId) ?? null;

  return {
    bookings,
    loading,
    error,
    pendingBooking,
    requestCancel,
    dismissCancel,
    confirmCancel,
    refresh,
  };
}
