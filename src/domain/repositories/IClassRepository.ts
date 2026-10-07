import type { ClassItem } from '../entities/ClassItem';

export interface IClassRepository {
  getAll(): Promise<ClassItem[]>;
  getById(classId: string): Promise<ClassItem | null>;
}
