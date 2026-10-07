import type { ClassItem } from '../../domain/entities/ClassItem';
import type { Booking } from '../../domain/entities/Booking';
import type { ClassDto, BookingStorageDto } from '../models/ClassDataDto';

export function mapClassDtoToDomain(dto: ClassDto): ClassItem {
  return {
    id: dto.id,
    name: dto.nombre,
    instructor: dto.instructor,
    diaOffset: dto.diaOffset,
    hora: dto.hora,
    durationMin: dto.duracionMin,
    cupoTotal: dto.cupoTotal,
    ocupados: dto.ocupados,
  };
}

export function mapBookingToStorage(booking: Booking): BookingStorageDto {
  return { ...booking };
}

export function mapStorageToBooking(dto: BookingStorageDto): Booking {
  return { ...dto };
}
