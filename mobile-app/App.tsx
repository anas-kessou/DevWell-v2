import React from 'react';
import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RemoteProbe from './components/RemoteProbe';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <RemoteProbe />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
