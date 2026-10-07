import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainTabs } from './src/presentation/navigation/MainTabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainTabs />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
