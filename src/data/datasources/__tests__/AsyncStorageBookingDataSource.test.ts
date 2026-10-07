import AsyncStorage from '@react-native-async-storage/async-storage';
import { BOOKINGS_STORAGE_KEY } from '../../../core/constants/member';
import { AsyncStorageBookingDataSource } from '../AsyncStorageBookingDataSource';

describe('AsyncStorageBookingDataSource', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('persists and hydrates bookings', async () => {
    const ds = new AsyncStorageBookingDataSource();
    await ds.saveAll([
      {
        id: 'B-1',
        classId: 'C-02',
        memberId: 'S-0001',
        diaOffset: 0,
        hora: '18:00',
        className: 'Funcional',
        instructor: 'Camila',
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
      },
    ]);

    const ds2 = new AsyncStorageBookingDataSource();
    await ds2.hydrate();
    const loaded = await ds2.getAll();
    expect(loaded).toHaveLength(1);

    const raw = await AsyncStorage.getItem(BOOKINGS_STORAGE_KEY);
    expect(raw).toContain('B-1');
  });
});
