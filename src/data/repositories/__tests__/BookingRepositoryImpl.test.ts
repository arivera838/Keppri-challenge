import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageBookingDataSource } from '../../datasources/AsyncStorageBookingDataSource';
import { BookingRepositoryImpl } from '../BookingRepositoryImpl';

describe('BookingRepositoryImpl', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('saves and removes active bookings', async () => {
    const repo = new BookingRepositoryImpl(new AsyncStorageBookingDataSource());
    await repo.save({
      id: 'B-99',
      classId: 'C-02',
      memberId: 'S-0001',
      diaOffset: 0,
      hora: '18:00',
      className: 'Funcional',
      instructor: 'Camila',
      status: 'active',
      createdAt: new Date().toISOString(),
    });
    expect(await repo.getAllActive()).toHaveLength(1);
    await repo.remove('B-99');
    expect(await repo.getAllActive()).toHaveLength(0);
  });
});
