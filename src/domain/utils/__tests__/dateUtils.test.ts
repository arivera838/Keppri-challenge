import {
  calculateClassDateTime,
  canCancelBooking,
  getCalendarDayKey,
  hoursUntilClassStart,
  isClassStarted,
} from '../dateUtils';

describe('dateUtils', () => {
  const base = new Date('2026-03-10T15:00:00.000Z');

  it('calculates class start for diaOffset and hora in Bogota', () => {
    const start = calculateClassDateTime(base, 0, '18:00');
    expect(getCalendarDayKey(start)).toBe(getCalendarDayKey(base));
    expect(start.getTime()).toBeGreaterThan(base.getTime());
  });

  it('detects started classes', () => {
    const past = calculateClassDateTime(base, 0, '06:00');
    expect(isClassStarted(past, base)).toBe(true);
  });

  it('computes hours until start and cancel window (RN-04)', () => {
    const future = new Date(base.getTime() + 3 * 60 * 60 * 1000);
    expect(hoursUntilClassStart(future, base)).toBeCloseTo(3, 1);
    expect(canCancelBooking(future, base)).toBe(true);

    const soon = new Date(base.getTime() + 90 * 60 * 1000);
    expect(canCancelBooking(soon, base)).toBe(false);
  });
});
