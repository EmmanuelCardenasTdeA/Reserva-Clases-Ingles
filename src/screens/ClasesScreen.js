import React,{useState, useEffect} from 'react'
import {View, Text, Image, Pressable, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import {LabelLevel} from './LabelLevel'
import {colors, radius, spacing, typography} from '../theme'
import {formatearPrecio} from '../data/clases'
import {CLASES} from '../data/clases';

export default function ClasesScreen({ navigation }){
    const [nivel, setNivel] = useState()
    const [search, setSearch] = useState()

    return(
        <View>
            <Text>Aplicación para clases de ingles</Text>
            <Ionicons name="search" size={18} color={colors.textoSuave}/>
            <TextInput 
            placeholder="Buscar por nivel"
            Value={nivel}
            onChangeText = {setNivel}
            autoCorrect={false}
            />
            {
                search > 0 && (
                <Ionicons 
                name='close-circle' 
                size={18} 
                color={colors.textoSuave} 
                onPress = {() => setSearch('')}/>)
            }
        </View>
    )
}