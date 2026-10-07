import { render, fireEvent } from '@testing-library/react-native';
import { Badge } from '../Badge';
import { ClassCard } from '../ClassCard';
import { BookingCard } from '../BookingCard';
import { ConfirmModal } from '../ConfirmModal';

describe('presentation components', () => {
  it('renders Badge', async () => {
    const { getByText } = await render(<Badge label="Llena" variant="full" />);
    expect(getByText('Llena')).toBeTruthy();
  });

  it('renders ClassCard and triggers reserve', async () => {
    const onReserve = jest.fn();
    const { getByText } = await render(
      <ClassCard
        classItem={{
          id: 'C-02',
          name: 'Funcional',
          instructor: 'Camila',
          diaOffset: 0,
          hora: '18:00',
          durationMin: 60,
          cupoTotal: 15,
          ocupados: 9,
          schedule: {
            startAt: '2026-01-01T23:00:00.000Z',
            calendarDayKey: '2026-01-01',
            diaOffset: 0,
            hora: '18:00',
          },
          availableSpots: 6,
          isFull: false,
        }}
        onReserve={onReserve}
      />,
    );
    fireEvent.press(getByText('Reservar'));
    expect(onReserve).toHaveBeenCalledWith('C-02');
  });

  it('renders BookingCard', async () => {
    const { getByText } = await render(
      <BookingCard
        booking={{
          id: 'B-1',
          classId: 'C-02',
          memberId: 'S-0001',
          diaOffset: 0,
          hora: '18:00',
          className: 'Funcional',
          instructor: 'Camila',
          status: 'active',
          createdAt: '2026-01-01T00:00:00.000Z',
          startAt: '2026-01-01T23:00:00.000Z',
        }}
        onCancel={jest.fn()}
      />,
    );
    expect(getByText('Funcional')).toBeTruthy();
  });

  it('renders ConfirmModal actions', async () => {
    const onConfirm = jest.fn();
    const { getAllByText } = await render(
      <ConfirmModal
        visible
        title="Confirmar acción"
        message="¿Seguro?"
        confirmLabel="Aceptar"
        onConfirm={onConfirm}
        onCancel={jest.fn()}
      />,
    );
    fireEvent.press(getAllByText('Aceptar')[0]);
    expect(onConfirm).toHaveBeenCalled();
  });
});
