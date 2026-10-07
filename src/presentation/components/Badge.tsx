import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type BadgeProps = {
  label: string;
  variant?: 'full' | 'open' | 'neutral';
};

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const palette =
    variant === 'full'
      ? { bg: '#FEE2E2', text: colors.badgeFull }
      : variant === 'open'
        ? { bg: '#D1FAE5', text: colors.badgeOpen }
        : { bg: colors.border, text: colors.textMuted };

  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }]}>
      <Text style={[styles.text, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
