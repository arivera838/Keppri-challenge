import AsyncStorage from '@react-native-async-storage/async-storage';
import { BOOKINGS_STORAGE_KEY } from '../../../core/constants/member';
import { BookingRepositoryImpl } from '../../repositories/BookingRepositoryImpl';
import { AsyncStorageBookingDataSource } from '../AsyncStorageBookingDataSource';

/**
 * Simulates app restart: new repository instance hydrates from AsyncStorage.
 */
describe('offline persistence (task 4.3)', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('recovers bookings after simulated restart', async () => {
    const repo1 = new BookingRepositoryImpl(new AsyncStorageBookingDataSource());
    await repo1.save({
      id: 'B-restart',
      classId: 'C-07',
      memberId: 'S-0001',
      diaOffset: 1,
      hora: '18:00',
      className: 'Yoga',
      instructor: 'Valentina',
      status: 'active',
      createdAt: new Date().toISOString(),
    });

    const stored = await AsyncStorage.getItem(BOOKINGS_STORAGE_KEY);
    expect(stored).not.toBeNull();

    const repo2 = new BookingRepositoryImpl(new AsyncStorageBookingDataSource());
    await repo2.hydrate();
    const active = await repo2.getAllActive();
    expect(active.some((b) => b.id === 'B-restart')).toBe(true);
  });
});
