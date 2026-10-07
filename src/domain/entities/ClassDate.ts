export type ClassDate = {
  /** ISO 8601 instant for class start in UTC */
  startAt: string;
  /** Calendar day key in America/Bogota (YYYY-MM-DD) */
  calendarDayKey: string;
  diaOffset: number;
  hora: string;
};
