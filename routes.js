import React from 'react';
import { Index } from './index';
import { createStackNavigator } from '@react-navigation/stack';
// import { Profile } from './pages/Profile';
// import { BemVindo } from './pagina';
import { Alimentos } from './ongsAlimentos';
import { Dinheiro } from './ongsDinheiro';
import { Roupas } from './ongsRoupas';



const Stack = createStackNavigator();

export function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Index"
                component={Index}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Alimentos"
                component={Alimentos}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Dinheiro"
                component={Dinheiro}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Roupas"
                component={Roupas}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
