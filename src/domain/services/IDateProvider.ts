export interface IDateProvider {
  now(): Date;
}

export class SystemDateProvider implements IDateProvider {
  now(): Date {
    return new Date();
  }
}
