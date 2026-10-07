import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CLASES } from '../data/clases';
import Card from '../components/Card';
import { colors, spacing, radius, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Filtramos las clases con calificación superior a 4.5
  const clasesRecomendadas = CLASES.filter((clase) => clase.rating > 4.5);

  return (
    <View style={[styles.contenedor, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenido}
      >
        {/* Encabezado de bienvenida */}
        <View style={styles.encabezado}>
          <Text style={styles.saludo}>AGREGAR NOMBRE DEL ESTUDIANTE</Text>
          <Text style={styles.subtitulo}>AGREGAR INFO</Text>
        </View>

        {/* Tarjeta informativa / Banner */}
        <View style={styles.banner}>
          <View style={styles.iconoBanner}>
            <Ionicons name="sparkles" size={26} color={colors.primario} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitulo}>Aprende a tu propio ritmo</Text>
            <Text style={styles.bannerTexto}>
              Clases virtuales y presenciales con profesores certificados.
            </Text>
          </View>
        </View>

        {/* Sección de Clases Recomendadas */}
        <View style={styles.seccionHeader}>
          <View>
            <Text style={styles.tituloSeccion}>Clases Recomendadas</Text>
            <Text style={styles.descripcionSeccion}>
              Cursos con calificación superior a 4.5
            </Text>
          </View>
          <View style={styles.badgeContador}>
            <Text style={styles.textoBadge}>{clasesRecomendadas.length} clases</Text>
          </View>
        </View>

        {/* Lista de tarjetas recomendadas */}
        {clasesRecomendadas.map((clase) => (
          <Card
            key={clase.id}
            clase={clase}
            onPress={() => navigation.navigate('DetailClase', { clase })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

