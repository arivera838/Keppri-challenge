import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { MemberBookingView } from '../../domain/usecases/GetMemberBookingsUseCase';
import { formatBookingDate } from '../utils/formatSchedule';
import { colors } from '../theme/colors';

type BookingCardProps = {
  booking: MemberBookingView;
  onCancel: (bookingId: string) => void;
};

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{booking.className}</Text>
      <Text style={styles.meta}>{formatBookingDate(booking.startAt)}</Text>
      <Text style={styles.instructor}>Instructor: {booking.instructor}</Text>
      <Pressable style={styles.button} onPress={() => onCancel(booking.id)}>
        <Text style={styles.buttonText}>Cancelar reserva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    marginTop: 8,
    color: colors.textMuted,
  },
  instructor: {
    marginTop: 4,
    color: colors.textMuted,
  },
  button: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.danger,
    fontWeight: '700',
  },
});
