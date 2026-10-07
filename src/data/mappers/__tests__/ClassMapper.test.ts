import { mapClassDtoToDomain, mapBookingToStorage } from '../ClassMapper';

describe('ClassMapper', () => {
  it('maps class dto to domain entity', () => {
    const domain = mapClassDtoToDomain({
      id: 'C-01',
      nombre: 'Spinning',
      instructor: 'Andrés',
      diaOffset: 0,
      hora: '06:00',
      duracionMin: 45,
      cupoTotal: 20,
      ocupados: 18,
    });
    expect(domain.name).toBe('Spinning');
    expect(domain.cupoTotal).toBe(20);
  });

  it('maps booking to storage dto', () => {
    const stored = mapBookingToStorage({
      id: 'B-1',
      classId: 'C-01',
      memberId: 'S-0001',
      diaOffset: 0,
      hora: '06:00',
      className: 'Spinning',
      instructor: 'Andrés',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
    });
    expect(stored.status).toBe('active');
  });
});
