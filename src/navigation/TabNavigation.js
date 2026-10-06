import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//Importamos las 3 pantallas
import ClasesScreen from "../screens/ClasesScreen";
import UserScreen from "../screens/UserScreen";

//Importamos Stack de clases
import ClasesStack from "./ClasesStack";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return(
        <Tab.Navigator
            screenOptions = {({route}) =>({
                tabBarActiveTintColor: colors.primario,
                tabBarInactiveTintColor: colors.textoSuave,
                tabBarStyle: {
                    backgroundColor: colors.superficie,
                    paddingBottom: spacing.xs,
                    borderTopWidth: 1,
                    borderTopColor: colors.borde,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: typography.fuente,
                },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    switch (route.name) {
                        case 'HomeTab':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'ClasesTab':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                        case 'ReservasTab':
                            iconName = focused ? 'calendar' : 'calendar-outline';
                            break;
                        case 'UserTab':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            


        </Tab.Navigator>
        
    )
}


