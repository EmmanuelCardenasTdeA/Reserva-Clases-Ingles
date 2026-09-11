import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClasesScreen from '../screens/ClasesScreen';
import DetailClaseScreen from '../screens/DetailClaseScreen'

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={ClasesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name = "DetailClase"
        component={DetailClaseScreen}
        options={{title: 'Detail', headerBackTitle: 'Back'}}
      />
    </Stack.Navigator>
  );
}