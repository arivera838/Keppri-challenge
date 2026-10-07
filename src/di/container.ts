import { AsyncStorageBookingDataSource } from '../data/datasources/AsyncStorageBookingDataSource';
import { MockClassDataSource } from '../data/datasources/MockClassDataSource';
import { BookingRepositoryImpl } from '../data/repositories/BookingRepositoryImpl';
import { ClassRepositoryImpl } from '../data/repositories/ClassRepositoryImpl';
import { BookClassUseCase } from '../domain/usecases/BookClassUseCase';
import { CancelBookingUseCase } from '../domain/usecases/CancelBookingUseCase';
import { GetMemberBookingsUseCase } from '../domain/usecases/GetMemberBookingsUseCase';
import { GetUpcomingClassesUseCase } from '../domain/usecases/GetUpcomingClassesUseCase';

class ServiceLocator {
  private classDataSource = new MockClassDataSource();
  private bookingDataSource = new AsyncStorageBookingDataSource();

  private classRepository = new ClassRepositoryImpl(this.classDataSource);
  private bookingRepository = new BookingRepositoryImpl(this.bookingDataSource);

  private hydrated = false;

  async init(): Promise<void> {
    if (this.hydrated) {
      return;
    }
    await this.bookingRepository.hydrate();
    this.hydrated = true;
  }

  getGetUpcomingClassesUseCase(): GetUpcomingClassesUseCase {
    return new GetUpcomingClassesUseCase(
      this.classRepository,
      this.bookingRepository,
    );
  }

  getBookClassUseCase(): BookClassUseCase {
    return new BookClassUseCase(this.classRepository, this.bookingRepository);
  }

  getCancelBookingUseCase(): CancelBookingUseCase {
    return new CancelBookingUseCase(this.bookingRepository);
  }

  getGetMemberBookingsUseCase(): GetMemberBookingsUseCase {
    return new GetMemberBookingsUseCase(this.bookingRepository);
  }

  getBookingRepository(): BookingRepositoryImpl {
    return this.bookingRepository;
  }

  /** Test-only reset */
  resetForTests(): void {
    this.hydrated = false;
    this.bookingDataSource.resetCacheForTests();
  }
}

export const container = new ServiceLocator();
