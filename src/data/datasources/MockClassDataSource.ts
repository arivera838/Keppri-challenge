import type { ClassesFileDto } from '../models/ClassDataDto';
import classesFile from '../../../mock-data/clases.json';

export class MockClassDataSource {
  async load(): Promise<ClassesFileDto> {
    return classesFile as ClassesFileDto;
  }
}
