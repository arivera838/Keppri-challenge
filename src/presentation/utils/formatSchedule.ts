import { BOGOTA_TIME_ZONE } from '../../domain/utils/dateUtils';

const dayLabels = ['Hoy', 'Mañana', 'Pasado mañana'];

export function formatClassDayLabel(diaOffset: number): string {
  return dayLabels[diaOffset] ?? `En ${diaOffset} días`;
}

export function formatClassSchedule(diaOffset: number, hora: string): string {
  return `${formatClassDayLabel(diaOffset)} · ${hora}`;
}

export function formatBookingDate(startAt: string): string {
  return new Date(startAt).toLocaleString('es-CO', {
    timeZone: BOGOTA_TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
