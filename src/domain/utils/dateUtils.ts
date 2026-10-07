import type { ClassDate } from '../entities/ClassDate';

export const BOGOTA_TIME_ZONE = 'America/Bogota';

const dateTimeFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: BOGOTA_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function parseHourMinute(hora: string): { hour: number; minute: number } {
  const [hourPart, minutePart] = hora.split(':');
  return {
    hour: Number(hourPart),
    minute: Number(minutePart),
  };
}

/** Returns YYYY-MM-DD for the given instant in Bogota. */
export function getCalendarDayKey(instant: Date): string {
  return instant.toLocaleDateString('en-CA', { timeZone: BOGOTA_TIME_ZONE });
}

/** Adds calendar days in Bogota from the base instant's local Bogota date. */
function addBogotaDays(baseInstant: Date, dayOffset: number): Date {
  const baseKey = getCalendarDayKey(baseInstant);
  const [year, month, day] = baseKey.split('-').map(Number);
  const utcMidnight = Date.UTC(year, month - 1, day + dayOffset, 12, 0, 0);
  return new Date(utcMidnight);
}

/**
 * Builds the class start instant from device "now", diaOffset and HH:mm in Bogota.
 */
export function calculateClassDateTime(
  baseDate: Date,
  diaOffset: number,
  hora: string,
): Date {
  const { hour, minute } = parseHourMinute(hora);
  const targetDay = addBogotaDays(baseDate, diaOffset);
  const dayKey = getCalendarDayKey(targetDay);
  const [year, month, day] = dayKey.split('-').map(Number);

  const probe = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));
  const parts = dateTimeFormatter.formatToParts(probe);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  const bogotaHour = get('hour');
  const bogotaMinute = get('minute');
  const bogotaDay = get('day');
  const bogotaMonth = get('month');
  const bogotaYear = get('year');

  const deltaMinutes =
    (hour - bogotaHour) * 60 + (minute - bogotaMinute) +
    (day - bogotaDay) * 24 * 60;

  return new Date(probe.getTime() + deltaMinutes * 60 * 1000);
}

export function buildClassDate(
  baseDate: Date,
  diaOffset: number,
  hora: string,
): ClassDate {
  const start = calculateClassDateTime(baseDate, diaOffset, hora);
  return {
    startAt: start.toISOString(),
    calendarDayKey: getCalendarDayKey(start),
    diaOffset,
    hora,
  };
}

export function isClassStarted(classStart: Date, now: Date): boolean {
  return classStart.getTime() <= now.getTime();
}

export function hoursUntilClassStart(classStart: Date, now: Date): number {
  return (classStart.getTime() - now.getTime()) / (1000 * 60 * 60);
}

export function canCancelBooking(classStart: Date, now: Date): boolean {
  return hoursUntilClassStart(classStart, now) >= 2;
}
