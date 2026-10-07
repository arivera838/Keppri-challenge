import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ClassWithAvailability } from '../../domain/entities/ClassWithAvailability';
import { Badge } from './Badge';
import { formatClassSchedule } from '../utils/formatSchedule';
import { colors } from '../theme/colors';

type ClassCardProps = {
  classItem: ClassWithAvailability;
  onReserve: (classId: string) => void;
};

export function ClassCard({ classItem, onReserve }: ClassCardProps) {
  const spotsLabel = classItem.isFull
    ? 'Llena'
    : `${classItem.availableSpots} de ${classItem.cupoTotal} cupos`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{classItem.name}</Text>
        <Badge
          label={spotsLabel}
          variant={classItem.isFull ? 'full' : 'open'}
        />
      </View>
      <Text style={styles.meta}>
        {formatClassSchedule(classItem.diaOffset, classItem.hora)}
      </Text>
      <Text style={styles.instructor}>Instructor: {classItem.instructor}</Text>
      <Pressable
        style={[styles.button, classItem.isFull && styles.buttonDisabled]}
        disabled={classItem.isFull}
        onPress={() => onReserve(classItem.id)}
      >
        <Text style={styles.buttonText}>
          {classItem.isFull ? 'Sin cupos' : 'Reservar'}
        </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  meta: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 14,
  },
  instructor: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 14,
  },
  button: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
