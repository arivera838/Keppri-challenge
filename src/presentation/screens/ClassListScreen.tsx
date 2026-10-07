import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ClassCard } from '../components/ClassCard';
import { ConfirmModal } from '../components/ConfirmModal';
import { useClassBooking } from '../hooks/useClassBooking';
import { colors } from '../theme/colors';

export function ClassListScreen() {
  const {
    classes,
    loading,
    error,
    successMessage,
    pendingClass,
    requestReserve,
    cancelReserveRequest,
    confirmReserve,
  } = useClassBooking();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Próximas clases</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? (
        <Text style={styles.success}>{successMessage}</Text>
      ) : null}
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard classItem={item} onReserve={requestReserve} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay clases disponibles por ahora.</Text>
        }
        contentContainerStyle={styles.list}
      />
      <ConfirmModal
        visible={pendingClass !== null}
        title="Confirmar reserva"
        message={
          pendingClass
            ? `¿Reservar ${pendingClass.name} (${pendingClass.hora})?`
            : ''
        }
        onCancel={cancelReserveRequest}
        onConfirm={() => void confirmReserve()}
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
  success: {
    color: colors.success,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 32,
  },
});
