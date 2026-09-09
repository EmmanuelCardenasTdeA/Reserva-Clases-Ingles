import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, coloresPorNivel } from '../theme';

export default function LabelLevel({ level }) {
  const color = (coloresPorNivel && coloresPorNivel[level]) || colors.primario;

  return (
    <View style={[styles.container, { borderColor: color, backgroundColor: color + '15' }]}>
      <Text style={[styles.text, { color }]}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});