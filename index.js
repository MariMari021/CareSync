import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

SplashScreen.preventAutoHideAsync();

const { width: screenWidth } = Dimensions.get('window');

const img1 = require('./assets/img1.png');
const img2 = require('./assets/img2.png');
const img3 = require('./assets/img3.png');

const data = [
    { source: img1 },
    { source: img2 },
    { source: img3 },
];

export function Index({ navigation }) {
    const [fontsLoaded] = useFonts({
        'regular': require('./assets/fonts/DMSans_24pt-Regular.ttf'),
        'bold': require('./assets/fonts/DMSans_18pt-Bold.ttf'),
        'medium': require('./assets/fonts/DMSans_36pt-Medium.ttf'),
    });

    const [location, setLocation] = useState(null);
    const [institutions, setInstitutions] = useState([]);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const requestLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Permissão de localização é necessária para buscar instituições próximas.');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        fetchNearbyInstitutions(location.coords.latitude, location.coords.longitude);
    };

    const fetchNearbyInstitutions = (latitude, longitude) => {
        const mockInstitutions = [
            { id: 1, name: 'APAE', distance: '1,983.6 km' },
            { id: 2, name: 'CEI ESPERANÇA DE SIÃO', distance: '1.1 km' },
        ];
        setInstitutions(mockInstitutions);
    };

    if (!fontsLoaded) {
        return null;
    }



    return (
            <ScrollView style={styles.ScrollView} onLayout={onLayoutRootView}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={[styles.titulo, { color: '#FDAA5D' }]}>Boas
                            <Text style={{ color: '#4AB7B6' }}> vindas</Text>
                        </Text>

                        <TouchableOpacity style={styles.notificacao}>
                            <Image style={styles.logo} source={require('./assets/logos.png')} />
                        </TouchableOpacity>
                    </View>

                    {/* Localização */}
                    <View style={styles.boxLocal}>
                        <View style={styles.iconeLocal}>
                            <Ionicons name="location-outline" size={35} color="#FFFFFF" />
                        </View>

                        <TouchableOpacity onPress={requestLocation}>
                            <Text style={styles.textPermitir}>Permitir localização?</Text>
                        </TouchableOpacity>
                    </View>

                    {location && (
                        <View style={styles.local}>
                            <Text style={styles.textInst}>Instituições próximas:</Text>
                            {institutions.map(inst => (
                                <Text style={styles.textInstuicao} key={inst.id}>{inst.name} - {inst.distance}</Text>
                            ))}
                        </View>
                    )}

                    {/* Swiper de Imagens */}

                    <View style={styles.carouselContainer}>
                        <Swiper
                            autoplay
                            autoplayTimeout={6}
                            loop
                            style={styles.swiper}
                        >
                            {data.map((item, index) => (
                                <View style={styles.carouselItem} key={index}>
                                    <Image source={item.source} style={styles.image} resizeMode="cover" />
                                </View>
                            ))}
                        </Swiper>
                    </View>

                    {/* categoria */}
                    <View style={styles.boxCategoria}>
                        <Text style={styles.tituloCat}>Categorias</Text>
                        <View style={styles.categoria}>
                            <TouchableOpacity style={[styles.categ, { backgroundColor: '#4AB7B6' }]} onPress={() => navigation.navigate('Alimentos')}>
                                <Image style={styles.iconeCat} source={require('./assets/alimentos.png')} />
                                <Text style={styles.textCat}>Alimentos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.categ, { backgroundColor: '#4B9DCB' }]} onPress={() => navigation.navigate('Dinheiro')}>
                                <Image style={styles.iconeCatDin} source={require('./assets/dinheiro.png')} />
                                <Text style={styles.textCat}>Dinheiro</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.categ, { backgroundColor: '#AF558B' }]} onPress={() => navigation.navigate('Roupas')}>
                                <Image style={styles.iconeCat} source={require('./assets/roupas.png')} />
                                <Text style={styles.textCat}>Roupas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* organização */}
                    <View style={styles.boxOrganizacao}>
                        <Text style={styles.tituloOrg}>Organizações mais doadas</Text>

                        <View style={styles.organizacao}>
                            <Image style={styles.imgOrg} source={require('./assets/org1.png')} />

                            <Image style={styles.imgOrg} source={require('./assets/org2.png')} />

                            <Image style={styles.imgOrg} source={require('./assets/org3.png')} />
                        </View>

                        <View style={[styles.organizacao, { marginTop: 20 }]}>
                            <Image style={styles.imgOrg} source={require('./assets/org4.png')} />

                            <Image style={styles.imgOrg} source={require('./assets/org5.png')} />

                            <Image style={styles.imgOrg} source={require('./assets/org6.png')} />
                        </View>
                    </View>

                    {/* nos somos */}
                    <View style={styles.boxNoSomos}>
                        <Text style={styles.tituloSomos}>Quem somos nós?</Text>

                        <View style={styles.doacao}>
                            <View>
                                <Image source={require('./assets/imgDoacao.png')} style={styles.imgDoacao} />
                            </View>
                            <View style={styles.infosDoacao}>
                                <Text style={styles.tituloDoacao}>Ajude a fazer o bem</Text>
                                <Text style={styles.descricao}>
                                    Facilitamos suas doações para transformar vidas.                             </Text>
                                <TouchableOpacity onPress={toggleModal} style={styles.botaoDoacao}>
                                    <Text style={styles.textBotao}>Doar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={isModalVisible}>

                        <View style={styles.modalContent}>


                            <Image source={require('./assets/logomodal.png')} style={styles.logoModal} />
                            <Text style={styles.modalText}>Escolha uma das categorias:</Text>
                            <TouchableOpacity style={styles.botaoModal} onPress={() => navigation.navigate('Alimentos')}>
                                <Image source={require('./assets/modal1.png')} style={styles.botaoModal} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botaoModal} onPress={() => navigation.navigate('Dinheiro')}>
                                <Image source={require('./assets/modal2.png')} style={styles.botaoModal} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botaoModal} onPress={() => navigation.navigate('Roupas')}>
                                <Image source={require('./assets/modal3.png')} style={styles.botaoModal} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={toggleModal} style={styles.botaoModal}>
                            <Image source={require('./assets/cancel.png')} style={styles.botaoModal} />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <StatusBar backgroundColor="#73C5C5" barStyle="light-content" />
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        minHeight:100,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        margin: 30,
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
    notificacao: {
        backgroundColor: '#E4E4E4',
        width: 40,
        height: 40,
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
    },
    boxLocal: {
        flexDirection: 'row',
        marginTop: 20,
    },
    iconeLocal: {
        backgroundColor: '#4AB7B6',
        width: 55,
        height: 55,
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        marginRight: 10,
    },
    textPermitir: {
        fontFamily: 'regular',
        fontSize: 16,
        color: '#293041',
        marginTop: 5,
    },
    local: {
        marginLeft: 66,
        marginTop: -25,
    },
    textInst: {
        fontFamily: 'medium',
        color: '#33363E',
    },
    textInstuicao: {
        fontFamily: 'regular',
        color: '#565961',
    },
    boxBarraPesquisa: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    barraPesquisa: {
        color: '#7D8FAB',
        fontFamily: 'regular',
        paddingLeft: 5,
        flex: 1, // Ensure it takes available space
    },
    carouselContainer: {

        paddingStart: 10,
        paddingEnd: 10,
        marginTop: 20, // Adjust this to control the spacing
        height: 200,
    },
    swiper: {
        height: 200,
    },
    carouselItem: {
        width: screenWidth - 20, // Adjust width to fit screen with some padding
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 100,
    },
    image: {
        width: '100%', // Set width to 100% to fit the container
        height: '100%', // Ensure it takes the full height of the container
    },
    tituloCat: {
        fontFamily: 'bold',
        color: '#303733',
        fontSize: 18,
        marginVertical: 20, // Adjust this to control the spacing
    },
    categoria: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categ: {
        width: 100,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconeCat: {
        width: 40,
        height: 35,
        marginBottom: 10
    },
    iconeCatDin: {
        width: 30,
        height: 35,
        marginBottom: 10
    },
    textCat: {
        fontFamily: 'medium',
        color: '#FFFFFF',
        fontSize: 16
    },
    tituloOrg: {
        fontFamily: 'bold',
        color: '#303733',
        fontSize: 18,
        marginVertical: 20, // Adjust this to control the spacing
    },
    organizacao: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imgOrg: {
        width: 100,
        height: 110
    },
    tituloSomos: {
        fontFamily: 'bold',
        color: '#303733',
        fontSize: 18,
        marginVertical: 20, // Adjust this to control the spacing
    },
    doacao: {
        flexDirection: 'row',
        backgroundColor: '#C8EDD9',
        padding: 20,
        borderRadius: 20,
        justifyContent: 'cen',
        alignItems: 'center',
        paddingEnd: 25,
        marginBottom: 45
    },
    imgDoacao: {
        width: 80,
        height: 70,
        marginRight: 15
    },
    tituloDoacao: {
        color: '#303733',
        fontFamily: 'medium',
        fontSize: 17
    },
    descricao: {
        fontFamily: 'regular',
        width: 190,
        marginTop: 10
    },
    botaoDoacao: {
        backgroundColor: '#14AB87',
        marginTop: 10,
        padding: 5,
        width: 80,
        alignItems: 'center',
        borderRadius: 20
    },
    textBotao: {
        fontFamily: 'bold',
        color: '#FFFFFF'
    },
    modalContent: {
        backgroundColor: 'white',
        width: 325,
        height: 463,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalText: {
        marginTop:20,
        fontSize: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },

    text: {
        fontSize: 16,
        paddingTop:50,
        paddingBottom:15
    },
    logo: {
        width: 90,
        height: 90,
        paddingRight: 25
    },
    botaoModal: {
        marginTop: 15,
        width: 261,
        height: 48
    },
    logoModal: {
        width: 110,
        height: 60
    },
});


