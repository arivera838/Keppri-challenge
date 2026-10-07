import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BookingCard } from '../components/BookingCard';
import { ConfirmModal } from '../components/ConfirmModal';
import { useMemberBookings } from '../hooks/useMemberBookings';
import { colors } from '../theme/colors';

export function MyBookingsScreen() {
  const {
    bookings,
    loading,
    error,
    pendingBooking,
    requestCancel,
    dismissCancel,
    confirmCancel,
  } = useMemberBookings();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mis reservas</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingCard booking={item} onCancel={requestCancel} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aún no tienes reservas.</Text>
        }
        contentContainerStyle={styles.list}
      />
      <ConfirmModal
        visible={pendingBooking !== null}
        title="Cancelar reserva"
        message={
          pendingBooking
            ? `¿Cancelar tu cupo en ${pendingBooking.className}?`
            : ''
        }
        confirmLabel="Sí, cancelar"
        onCancel={dismissCancel}
        onConfirm={() => void confirmCancel()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  error: {
    color: colors.danger,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 32,
  },
});
