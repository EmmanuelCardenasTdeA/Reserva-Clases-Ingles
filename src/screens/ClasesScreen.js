import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LabelLevel from '../components/LabelLevel';
import Card from '../components/Card'
import LevelChip from '../components/LevelChip';
import useResponsive from '../hooks/useResponsive';
import EmptyState from '../components/EmptyState';
import { colors, radius, spacing, typography } from '../theme';
import { CLASES, formatearPrecio, NIVELES } from '../data/clases';

export default function ClasesScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const {columns, paddingHorizontal} = useResponsive();
    const [nivel, setNivel] = useState();
    const [search, setSearch] = useState('')

    const results = useMemo(() =>{
        const textSearch = search.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const sameNivel = nivel === 'Todos' || clase.nivel === nivel
            const sameText = textSearch || 
            clase.titulo.toLocaleLowerCase().includes(textSearch) ||
            clase.profesor.nombre.toLocaleLowerCase.includes(textSearch);
            return sameNivel && sameText
        });
    }, [nivel, search] )
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={typography.titulo}>Aplicación para clases de inglés</Text>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={18} color={colors.textoSuave}/>
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Buscar por nivel"
                        value={search}
                        onChangeText={setSearch}
                        autoCorrect={false}
                    />
                    {search.length > 0 && (
                        <Ionicons 
                            name='close-circle' 
                            size={18} 
                            color={colors.textoSuave} 
                            onPress={() => setSearch('')}
                        />
                    )}
                </View>
            </View>
            <ScrollView
                style={{ flexGrow: 0 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsContent}
            >
                {NIVELES.map((item) => (
                    <LevelChip 
                        key={item}
                        label={item}
                        active={nivel === item}
                        onPress={() => setNivel(item)}
                    />
                ))}
            </ScrollView>
            <FlatList 
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    <Card 
                        clase={item}
                        onPress={() => navigation.navigate('DetailClase', {clase:item})}
                    />
                }}
                showsVerticalScrollIndicator = {false}
                contentContainerStyle={{
                    paddingHorizontal,
                    flexGrow: 1
                }}
                numColumns={ columns }
                ListEmptyComponent={
                    <EmptyState 
                        icono="search-outline"
                        titulo="No encontramos resultados"
                        mensaje="La combinación de busqueda no tiene resultados"
                        onAction={()=>{
                            setNivel('Todos');
                            setSearch('');
                        }}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.fondo,
        paddingHorizontal: spacing.lg,
    },
    header: {
        marginVertical: spacing.md,
        gap: spacing.sm,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borde,
        gap: spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: colors.texto,
    },
    chipsContent: {
        paddingVertical: spacing.sm,
    },
});