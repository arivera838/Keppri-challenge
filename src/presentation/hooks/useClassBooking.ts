import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_MEMBER } from '../../core/constants/member';
import type { ClassWithAvailability } from '../../domain/entities/ClassWithAvailability';
import { BusinessError } from '../../domain/errors/BusinessError';
import { container } from '../../di/container';

export function useClassBooking() {
  const [classes, setClasses] = useState<ClassWithAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingClassId, setPendingClassId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await container.init();
      const useCase = container.getGetUpcomingClassesUseCase();
      const result = await useCase.execute();
      setClasses(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar clases');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const requestReserve = useCallback((classId: string) => {
    setSuccessMessage(null);
    setError(null);
    setPendingClassId(classId);
  }, []);

  const cancelReserveRequest = useCallback(() => {
    setPendingClassId(null);
  }, []);

  const confirmReserve = useCallback(async () => {
    if (!pendingClassId) {
      return;
    }
    setError(null);
    setSuccessMessage(null);
    try {
      const useCase = container.getBookClassUseCase();
      const result = await useCase.execute({
        classId: pendingClassId,
        memberId: DEFAULT_MEMBER.id,
      });
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      setSuccessMessage('¡Listo! Tu cupo está reservado');
      setPendingClassId(null);
      await refresh();
    } catch (e) {
      setError(
        e instanceof BusinessError
          ? e.message
          : e instanceof Error
            ? e.message
            : 'No se pudo reservar',
      );
    }
  }, [pendingClassId, refresh]);

  const pendingClass = classes.find((c) => c.id === pendingClassId) ?? null;

  return {
    classes,
    loading,
    error,
    successMessage,
    pendingClass,
    requestReserve,
    cancelReserveRequest,
    confirmReserve,
    refresh,
  };
}
