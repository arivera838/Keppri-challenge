import type { ClassItem } from '../../domain/entities/ClassItem';
import type { IClassRepository } from '../../domain/repositories/IClassRepository';
import { MockClassDataSource } from '../datasources/MockClassDataSource';
import { mapClassDtoToDomain } from '../mappers/ClassMapper';

export class ClassRepositoryImpl implements IClassRepository {
  private classes: ClassItem[] | null = null;

  constructor(
    private readonly dataSource: MockClassDataSource = new MockClassDataSource(),
  ) {}

  private async ensureLoaded(): Promise<ClassItem[]> {
    if (this.classes) {
      return this.classes;
    }
    const file = await this.dataSource.load();
    this.classes = file.clases.map(mapClassDtoToDomain);
    return this.classes;
  }

  async getAll(): Promise<ClassItem[]> {
    return [...(await this.ensureLoaded())];
  }

  async getById(classId: string): Promise<ClassItem | null> {
    const classes = await this.ensureLoaded();
    return classes.find((c) => c.id === classId) ?? null;
  }
}
