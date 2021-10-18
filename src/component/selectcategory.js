import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableRipple, Button } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
Geocoder.init("AIzaSyCphINKttD-PZWJIMYfXmE9oUsLIgCgMoc");
import Geocoder from 'react-native-geocoding';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';

export default class selectcategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            Phone: '',

            region: null,
            lon: '',
            lat: '',
            plat: '',
            plon: '',
            coordinates: [],
        };
    }

    componentDidMount = async () => {

        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                this.setState({
                    lat: latitude,
                    lon: longitude,
                    fromlocation: address,
                    location,
                    region:
                    {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                });
            },
            () => { },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
    }

    render() {
        const { region } = this.state;
        return (
            <View style={styles.container}>

                <View style={{ marginTop: hp('0%'), backgroundColor: '#EAAA00' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '15%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <Image style={{ width: 30, height: 25, marginTop: hp('5%'), margin: 10 }} source={require('./../image/icon/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '70%' }}>

                        </View>
                        <View style={{ width: '15%' }}>
                            <TouchableOpacity onPress={() => console.log('#')}>
                                <Image style={{ width: 35, height: 25, marginTop: hp('5%'), margin: 10 }} source={require('./../image/icon/notification.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <MapView
                    style={{ flex: 1, marginBottom: this.state.marginBottom }}
                    initialRegion={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled
                    onMapReady={() => this.setState({ marginBottom: 0 })}
                    onRegionChangeComplete={this.onChangeValue}
                >
                    <View style={{ top: '50%', left: '50%', marginLeft: -24, marginTop: -48, position: 'absolute' }}>
                        <Image style={{ width: 48, height: 48 }} source={require('./../image/icon/location.png')} />
                    </View>
                </MapView>

                <View style={{ backgroundColor: '#EBEBEB', padding:20 }}>
                    <GradientButton
                        style={{ marginVertical: 8., marginTop: 0, marginBottom:10, alignSelf: 'center' }}
                        text="CONFIRM LOCATION"
                        textStyle={{ fontSize: 17 }}
                        gradientBegin="#000000"
                        gradientEnd="#000000"
                        gradientDirection="diagonal"
                        height={50}
                        width={280}
                        radius={10}
                        impact
                        impactStyle='Light'
                        onPressAction={() => this.props.navigation.navigate('servicedescription')}
                    />
                     <GradientButton
                        style={{ marginVertical: 8., marginTop: 0, marginBottom:10, alignSelf: 'center' }}
                        text="CANCEL"
                        textStyle={{ fontSize: 17 }}
                        gradientBegin="#EAAA00"
                        gradientEnd="#EAAA00"
                        gradientDirection="diagonal"
                        height={50}
                        width={280}
                        radius={10}
                        impact
                        impactStyle='Light'
                        onPressAction={() => this.props.navigation.navigate('#')}
                    />
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
    },
    headerText2: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
        marginTop: wp('10%'),
        fontWeight: 'bold'
    },
    card: {
        marginTop: wp('3%'),
        marginRight: wp('1.5%'),
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },
    card2: {
        marginTop: wp('-2%'),
        marginRight: wp('1%'),
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },
    logo: {
        width: 150,
        height: 100,
        alignSelf: 'center'
    },
});