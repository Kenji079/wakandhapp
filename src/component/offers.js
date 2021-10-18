import React from 'react';
import { StyleSheet, Picker, Text, View, ImageBackground, Dimensions, TouchableOpacity, TextInput, Image, FlatList, KeyboardAvoidingView } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo, Icon } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: [
                { id: 1, Image: require('../image/ad1.jpg') },
                { id: 2, Image: require('../image/ad2.jpg') },
                { id: 3, Image: require('../image/ad3.jpg') },
                { id: 3, Image: require('../image/ad4.jpg') },
            ],
            txtsearch: '',
        };
    }

    render() {
        const swipeSetting = {

            autoClose: true,
            onClose: (secId, rowId, direction) => {

            },
            onOpen: (secId, rowId, direction) => {

            },
            right: [
                {
                    onPress: () => {

                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index
        }
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <AntDesign
                name='home'
                type='font-awesome'
                size={24}
                style={{ color: tintColor }}
                containerStyle={{ width: width(10) }}
            />
        )
    }

    renderAds = ({ item }) => {
        return (
            <View>
                <Image style={styles.ads} source={item.Image} />
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./../image/searchhome.png')} style={{ width: '100%', height: '100%', marginTop: hp('0%') }} >
                    <ScrollView>

                        <View style={{ marginTop: wp('15%') }}>
                            <KeyboardAvoidingView behavior={'padding'}>
                                <View style={{ flex: 1, flexDirection: 'row', borderRadius: 50, width: '80%', height: 40, borderColor: '#fff', borderWidth: 1, alignSelf: 'center' }}>
                                    <TextInput
                                        placeholderTextColor='#fff'
                                        style={styles.searchInput}
                                        placeholder={'Search Salon by name'}
                                        value={this.state.txtsearch}
                                        onChangeText={txtsearch => this.setState({ txtsearch })}
                                    />
                                    <TouchableOpacity>
                                        <Image style={{ width: 20, height: 20, margin: 8, marginLeft: 25 }} source={require('./../image/icon/search.png')} />
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>

                            <View style={{ marginBottom: wp('7%') }}>
                                <Text style={styles.headerText}>Hi Peter !</Text>
                                <Text style={styles.headerText2}>Lets Search a Salon</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.card1}>
                                    <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('../image/searchbyregionicon.png')} />
                                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>Search by Region</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.card1}>
                                    <Image style={{ width: 100, height: 50, alignSelf: 'center' }} source={require('../image/searchtoptrendicon.png')} />
                                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>Search by Top Rated</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.card1}>
                                    <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('../image/customizedsearchbutton.png')} />
                                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>Customized Search</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('#')} style={styles.card1}>
                                    <Image style={{ width: 65, height: 50, alignSelf: 'center' }} source={require('../image/nearbysearchbutton.png')} />
                                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>Search Nearby</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.headerText3}>Featured Salons</Text>
                            <ScrollView horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.ads}
                                    renderItem={this.renderAds}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        paddingTop: wp('15%'),
        paddingLeft: wp('12%'),
    },
    headerText2: {
        fontSize: 20,
        color: 'white',
        paddingLeft: wp('12%'),
    },
    headerText3: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        padding: 10,
        marginTop: wp('5%')
    },
    card1: {
        backgroundColor: '#a12d98',
        paddingTop: 16,
        paddingBottom: 16,
        marginRight: 1,
        marginBottom: 1,
        width: '50%'
    },
    card2: {
        backgroundColor: '#a12d98',
        paddingTop: 16,
        paddingBottom: 16,
        marginRight: 1,
        marginBottom: 1,
        width: '50%'
    },
    searchInput: {
        margin: 4,
        fontSize: 15,
        marginLeft: 20,
        width: '100%',
        marginRight: -80,
        color: '#fff'
    },
    ads: {
        width: 250,
        height: 150,
        alignSelf: 'center',
        marginTop: wp('1%'),
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5
    }
});