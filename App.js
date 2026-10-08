import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ReservaProvider } from './src/context/ReservasContext';
import TabNavigation from './src/navigation/TabNavigation';
import { colors } from './src/theme';

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ReservaProvider>
        <NavigationContainer theme={temaNavegacion}>
          <StatusBar style="dark"/>
          <TabNavigation />
        </NavigationContainer>
      </ReservaProvider>
    </SafeAreaProvider>
  );
}
