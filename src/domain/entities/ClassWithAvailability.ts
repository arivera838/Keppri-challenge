import type { ClassItem } from './ClassItem';
import type { ClassDate } from './ClassDate';

export type ClassWithAvailability = ClassItem & {
  schedule: ClassDate;
  availableSpots: number;
  isFull: boolean;
};
