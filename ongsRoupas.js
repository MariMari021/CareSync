import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

SplashScreen.preventAutoHideAsync();

export function Roupas({ navigation }) {
    const [fontsLoaded] = useFonts({
        'regular': require('./assets/fonts/DMSans_24pt-Regular.ttf'),
        'bold': require('./assets/fonts/DMSans_18pt-Bold.ttf'),
        'medium': require('./assets/fonts/DMSans_36pt-Medium.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);


    return (

        <ScrollView style={styles.ScrollView}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.titulo, { color: '#FDAA5D' }]}>Doação de
                        <Text style={{ color: '#4AB7B6' }}> roupas</Text>
                    </Text>


                    <TouchableOpacity style={styles.notificacao}>
                        <Image style={styles.logo} source={require('./assets/logos.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.boxBarraPesquisa} onPress={() => navigation.navigate('Index')}>
                    <Text style={styles.retornar}>Retornar para o início</Text>
                    <Ionicons name="remove" size={30} color="#CFCECE" style={{ transform: [{ rotate: '90deg' }] }} />
                    <Ionicons name="chevron-forward" size={30} color="#73C5C5" style={{ marginLeft: -10 }} />
                </TouchableOpacity>
                <View style={styles.ongs}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.cruzvermelha.org.br')}>
                        <Image style={styles.caixaOng} source={require('./assets/roupa1.png')} />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.fadc.org.br')}>
                        <Image style={styles.caixaOng} source={require('./assets/roupa2.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image style={styles.caixaOng} source={require('./assets/roupa3.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.caritas.org.br')}>
                        <Image style={styles.caixaOng} source={require('./assets/roupa4.png')} />
                    </TouchableOpacity>

                </View>

                <StatusBar backgroundColor="#73C5C5" barStyle="light-content" />
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    boxBarraPesquisa: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    header: {
        paddingTop:'8%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: '6%'
    },
    titulo: {
        fontFamily: 'bold',
        fontSize: 22,
    },
    retornar: {
        color: '#7D8FAB',
        fontFamily: 'regular',
        paddingLeft: 5,
    },
    notificacao: {
        backgroundColor: '#E4E4E4',
        width: 40,
        height: 40,
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
    },
    caixaOng: {
        borderColor: '#73C5C5',
        borderWidth: 1,
        borderRadius: 20,
        width: 330,
        height: 120,
        marginTop: 25
    },
    ongs: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 90,
        height: 90,
        paddingRight: 25
    },
    ScrollView: {
        backgroundColor: '#fff'
    },

});
