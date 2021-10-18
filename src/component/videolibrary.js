import React from 'react';
import { StyleSheet, Platform, Text, TextInput, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, Button, AsyncStorage } from 'react-native';
import { totalSize } from 'react-native-dimension';
const { width } = Dimensions.get('window')
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

import GradientButton from 'react-native-gradient-buttons';

const numColumns = 2
var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];

const height = width * 100 / 90;
export default class videolibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                { img: 'https://cdn1-www.superherohype.com/assets/uploads/2019/03/Avengers-Endgame-Chinese-poster-featured.jpg' },
                { img: 'https://c4.wallpaperflare.com/wallpaper/271/434/411/movies-hollywood-movies-wallpaper-preview.jpg' },

            ],
            Collection: [
                { img: require('./../image/oil.png'), name: 'Supreme Banaspati Ghee', price: '2000' },
                { img: require('./../image/oil.png'), name: 'Supreme Banaspati Ghee', price: '2000' },
                { img: require('./../image/oil.png'), name: 'Supreme Banaspati Ghee', price: '2000' },
            ],
            SIMG: [],
            categories: [
                { id: 1, name: 'Cloths', icon: require('./../image/icon/clean-clothes.png') },
                { id: 2, name: 'Mobiles', icon: require('./../image/icon/smartphone.png') },
                { id: 3, name: 'Laptops', icon: require('./../image/icon/laptop.png') },
                { id: 4, name: 'Jobs', icon: require('./../image/icon/suitcase.png') },
                { id: 5, name: 'Furniture', icon: require('./../image/icon/sofa.png') },
                { id: 6, name: 'Services', icon: require('./../image/icon/document.png') },
            ],
            products: [
                { id: 1, name: 'Ford Gt 800', price: '150000', img: 'https://www.teahub.io/photos/full/67-670663_hollywood-movie-poster-hd.jpg' },
                { id: 2, name: 'Ford Gt 9000', price: '300000', img: 'https://images3.alphacoders.com/601/601338.jpg' }
            ],
            shops: [
                { id: 1, name: 'Orange Store', img: 'https://i.ytimg.com/vi/81ZZVemP63k/maxresdefault.jpg' },
                { id: 2, name: 'Levis Store', img: 'https://webneel.net/file/images/11-16/10-enders-game-movie-poster-designs.jpg' }
            ],
            Myshops: [
                { id: 2, name: 'Levis Store', img: 'https://viralkekda.com/wp-content/uploads/2020/04/Black-Window-2020-Marvel-Hollywood-Movie-in-Hindi-Cast-Wiki-Trailer-Poster-Video-Songs-Full-Movie-Watch-Online-Download.jpg' },
                { id: 1, name: 'Orange Store', img: 'https://i.ytimg.com/vi/lWMckY9JdOM/maxresdefault.jpg' }
            ],
            active: 0,
            selectedIndex: 0,
            sliderindex: 0,
            token: '',
            keyword: '',
            loading: true,
            languageCode: 'en'
        };
    }



    timeout = 0;
    componentDidMount = async () => {
        this.timeout = setInterval(() => this.onPressNext(), 4000);
    }

    onPressNext = async () => {
        const { sliderindex } = this.state
        this.setState(prev => ({ sliderindex: prev.sliderindex === this.state.images.length - 1 ? 0 : prev.sliderindex + 1 }),
            () => {
                this.flatListRef.scrollToIndex({ animated: true, index: sliderindex })
            });
        this.setState({
            languageCode: await AsyncStorage.getItem('LANGUAGE'),
        })
    };


    componentWillMount() {
        clearInterval(this.timeout);
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
                <Image style={styles.ads} source={{ uri: item.img }} />
            </View>
        )
    }

    change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }
    }

    renderCategories = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('videodetail')} style={{ padding: 18, }}>
                <Image style={{ width: 52, height: 52, alignSelf: 'center' }} source={item.icon} />
                <Text style={{ color: '#A1A3A4', alignSelf: 'center', fontSize: 12, marginTop: 5 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    renderCollection = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('videodetail')} style={styles.block}>
                <Image style={styles.img} source={{ uri: item.img }} />
            </TouchableOpacity>

        )
    }

    renderShops = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('videodetail')} style={styles.block}>
                <Image style={styles.img} source={{ uri: item.img }} />
            </TouchableOpacity>

        )
    }

    renderMyShops = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('videodetail')} style={styles.block}>
                <Image style={styles.img} source={{ uri: item.img }} />
            </TouchableOpacity>
        )
    }
    renderButton1() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: '100%', marginBottom: 100 }}>
                <ActivityIndicator color="#000000" size={'large'} animating={this.state.loading} />
            </View>
        )
    };

    registerForPushNotificationsAsync = async () => {

        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {

            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('messages', {
                name: "Market360 Notification",
                sound: true,
                vibrate: true
            });
        }
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        if (token) {
            console.log(token);
            this.addToken(token)
        }

        // POST the token to your backend server from where you can retrieve it to send push notifications.
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    <ScrollView>

                        <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: -21 }}>
                            <View style={{ flexDirection: 'row', padding: 20, marginTop: 40, paddingBottom: 0, marginBottom: 20, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }}>

                                <TouchableOpacity style={{ width: '20%', borderBottomColor: '#DDB937', borderBottomWidth: 3 }}>
                                    <Text style={{ fontSize: 16, marginTop: 0, fontWeight: 'bold', paddingBottom: 10, color: '#DDB937', textAlign: 'center' }}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: '20%' }}>
                                    <Text style={{ fontSize: 16, marginTop: 0, paddingBottom: 10, color: '#999999', textAlign: 'center' }}>Movies</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: '20%' }}>
                                    <Text style={{ fontSize: 16, marginTop: 0, paddingBottom: 10, color: '#999999', textAlign: 'center' }}>Shows</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: '20%' }}>
                                    <Text style={{ fontSize: 16, marginTop: 0, paddingBottom: 10, color: '#999999', textAlign: 'center' }}>Kids</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: '20%' }}>
                                    <Text style={{ fontSize: 16, marginTop: 0, paddingBottom: 10, color: '#999999', textAlign: 'center' }}>Sports</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View>

                            <FlatList
                                pagingEnabled
                                horizontal
                                onScroll={this.change}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.images}
                                renderItem={this.renderAds}
                                keyExtractor={item => item.id}
                                ref={ref => {
                                    this.flatListRef = ref;
                                }}
                            />
                            <View style={styles.pagging}>
                                {
                                    this.state.images.map((i, k) => (
                                        <Text style={k == this.state.active ? styles.paggingActiveText : styles.paggingText}>⬤</Text>
                                    ))
                                }
                            </View>

                        </View>


                        <View style={{ paddingRight: 20, paddingLeft: 10, width: '100%', marginLeft: 10 }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 30 }}>Continue Watching for user</Text>

                            <ScrollView style={{ marginRight: 0 }} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.products}
                                    renderItem={this.renderCollection}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>

                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 30 }}>Popular Movies</Text>

                            <ScrollView style={{ marginRight: 0, }} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.shops}
                                    renderItem={this.renderShops}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>

                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 30 }}>Popular TV Shows</Text>

                            <ScrollView style={{ marginRight: 0 }} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.Myshops}
                                    renderItem={this.renderMyShops}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>
                            <View style={{ marginBottom: 50 }}></View>

                        </View>

                    </ScrollView>
                </View >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    Picker: {
        width: wp('30%'),
        marginLeft: wp('40%'),

    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginTop: wp('2%'),
        marginBottom: wp('5%'),

    },
    text: {
        fontSize: 18,
        marginTop: wp('5%'),
        fontWeight: 'bold'
    },
    mainBox: {
        flexDirection: 'row',
        marginHorizontal: wp('6%'),

    },
    box: {
        backgroundColor: '#fff',
        width: wp('40%'),
        height: hp('20%'),
        marginRight: wp('7%'),
        marginBottom: wp('7%'),
    },
    offer: {
        marginHorizontal: wp('5%'),
        marginVertical: hp('3%'),
        color: '#666666',
        fontSize: 12
    },
    number: {
        marginHorizontal: wp('5%'),
        color: '#5f5d70',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        marginTop: hp('5%'),
        alignItems: 'center',
        backgroundColor: '#00cb9c',
        borderRadius: wp('10%'),
        height: 50,
        marginHorizontal: wp('10%')
    },
    buttonText: {

        fontSize: 22,
        color: '#fff',
        marginTop: hp('1.5%')
    },

    userList: {
        padding: 8,
        backgroundColor: '#fff',
        borderBottomColor: '#B9B9B9',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
        marginTop: wp('2%'),
        color: '#000',
    },
    desc: {
        fontSize: 13,
        color: '#B9B9B9',
    }, desc2: {
        fontSize: 13,
        color: '#B9B9B9',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: wp('1%'),
        marginRight: wp('3%'),
        borderRadius: 10,
        marginLeft: wp('1%')
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 55,
        bottom: 10,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
    },
    ads: {
        width: width,
        height: 245,
        alignSelf: 'center',
    },
    pagging: {
        flexDirection: 'row', alignSelf: 'center'
    },
    paggingText: {
        color: '#888', marginTop: -35, margin: 3
    },
    paggingActiveText: {
        color: '#fff', marginTop: -35, margin: 3
    },




    searchInput: {
        width: '100%',
        height: 35,
        backgroundColor: 'white',
        marginTop: hp('4%'),
        borderRadius: 10,
        paddingLeft: 10,
        marginLeft: 0,
        opacity: 0.5
    },

    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
    },

    block: {
        width: 200,
        margin: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 15,

    },
    img: {
        width: '100%',
        height: 130,
        alignSelf: 'center',
        marginTop: wp('0%'),
        borderRadius: 10,
    },

    back: {
        width: 35,
        height: 30,
        marginBottom: wp('10%'),
        marginLeft: 20
    },
    logo: {
        width: 180,
        height: 20,
        marginBottom: wp('10%'),
        marginTop: 12
    },
});