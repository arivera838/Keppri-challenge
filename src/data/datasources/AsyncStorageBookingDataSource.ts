import AsyncStorage from '@react-native-async-storage/async-storage';
import { BOOKINGS_STORAGE_KEY } from '../../core/constants/member';
import type { BookingStorageDto } from '../models/ClassDataDto';

export class AsyncStorageBookingDataSource {
  private cache: BookingStorageDto[] | null = null;

  async hydrate(): Promise<void> {
    if (this.cache !== null) {
      return;
    }
    const raw = await AsyncStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) {
      this.cache = [];
      return;
    }
    this.cache = JSON.parse(raw) as BookingStorageDto[];
  }

  async getAll(): Promise<BookingStorageDto[]> {
    await this.hydrate();
    return [...(this.cache ?? [])];
  }

  async saveAll(bookings: BookingStorageDto[]): Promise<void> {
    this.cache = [...bookings];
    await AsyncStorage.setItem(
      BOOKINGS_STORAGE_KEY,
      JSON.stringify(this.cache),
    );
  }

  resetCacheForTests(): void {
    this.cache = null;
  }
}
