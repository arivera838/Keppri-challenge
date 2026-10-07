import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClassListScreen } from '../screens/ClassListScreen';
import { MyBookingsScreen } from '../screens/MyBookingsScreen';
import { colors } from '../theme/colors';

type TabKey = 'classes' | 'bookings';

export function MainTabs() {
  const [tab, setTab] = useState<TabKey>('classes');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, tab === 'classes' && styles.tabActive]}
          onPress={() => setTab('classes')}
        >
          <Text
            style={[styles.tabText, tab === 'classes' && styles.tabTextActive]}
          >
            Clases
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === 'bookings' && styles.tabActive]}
          onPress={() => setTab('bookings')}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'bookings' && styles.tabTextActive,
            ]}
          >
            Mis reservas
          </Text>
        </Pressable>
      </View>
      {tab === 'classes' ? <ClassListScreen /> : <MyBookingsScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: '#fff',
  },
});
