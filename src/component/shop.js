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
export default class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                { img: 'https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
                { img: 'https://stylecaster.com/wp-content/uploads/2020/05/Best-site-for-girls-on-a-budget.jpeg' },

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
                { id: 1, name: 'Ford Gt 800', price: '150000', img: require('./../image/icon/car.jpg') },
                { id: 2, name: 'Ford Gt 9000', price: '300000', img: require('./../image/icon/postimg.jpg') }
            ],
            shops: [
                { id: 1, name: 'Orange Store', img: require('./../image/icon/orange.jpg') },
                { id: 2, name: 'Levis Store', img: require('./../image/icon/levis.jpg') }
            ],
            Myshops: [
                { id: 2, name: 'Levis Store', img: require('./../image/icon/levis.jpg') },
                { id: 1, name: 'Orange Store', img: require('./../image/icon/orange.jpg') }
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

    search = async () => {
        const { keyword } = this.state;
        let TOKEN = await AsyncStorage.getItem('TOKEN');

        fetch('http://market360.pk/demo/api/v1/products/search', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                brand_id: '',
                q: keyword,
                seller_id: '',
                min_price: '',
                max_price: '',
                category_id: '',
                subcategory_id: '',
                subsubcategory_id: ''
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                console.log(responseJson)
                if (responseJson.data == '') {
                    alert('Result Not Found');
                    return;
                }
                if (responseJson.data != '') {
                    this.props.navigation.navigate('searchresult', { DATA: responseJson.data });
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
            });


        // this.props.navigation.navigate('searchresult', { KEYWORD: keyword });
        return;
    }

    timeout = 0;
    componentDidMount = async () => {
        this.timeout = setInterval(() => this.onPressNext(), 4000);
    }

    AllCategories = async () => {
        let myID = await AsyncStorage.getItem('ID');
        fetch(`http://market360.pk/demo/api/v1/categories`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        }).then(r => r.json())
            .then(response => {
                this.setState({ categories: response.data });
            })
            .catch(e => console.log(e));
    }

    AllShops = async () => {

        fetch(`http://market360.pk/demo/api/v1/shops`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        }).then(r => r.json())
            .then(response => {
                // console.log(response.data)
                this.setState({ shops: response.data })
            })
            .catch(e => console.log(e));
    }

    AllMyShops = async () => {
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        fetch(`http://market360.pk/demo/api/v1/my-stores/${myID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({ Myshops: response.stores.data })
            })
            .catch(e => console.log(e));
    }

    AllProducts = async () => {
        fetch(`http://market360.pk/demo/api/v1/products/featured`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        }).then(r => r.json())
            .then(response => {
                this.setState({ products: response.data })
            })
            .catch(e => console.log(e));
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

    checkIMG = async () => {
        fetch(`http://market360.pk/demo/api/v1/sliders`)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState({ SIMG: responsejson.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={{ padding: 18, }}>
                <Image style={{ width: 52, height: 52, alignSelf: 'center' }} source={item.icon} />
                <Text style={{ color: '#A1A3A4', alignSelf: 'center', fontSize: 12, marginTop: 5 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    renderCollection = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('productdetails')} style={styles.block}>
                <Image style={styles.img} source={item.img} />
                <Text style={{ fontSize: 18, padding: 10, marginTop: 0, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingTop: 0 }}>{item.price} USD</Text>

            </TouchableOpacity>

        )
    }

    renderShops = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.block}>
                <Image style={styles.img} source={item.img} />
                <Text style={{ fontSize: 18, padding: 10, marginTop: 0, fontWeight: 'bold' }}>{item.name}</Text>
            </TouchableOpacity>

        )
    }

    renderMyShops = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.block}>
                <Image style={styles.img} source={item.img} />
                <Text style={{ fontSize: 18, padding: 10, marginTop: 0, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingTop: 0 }}>{item.price} USD</Text>
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

                        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                            <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()} style={{ width: '10%', marginTop: 50, marginBottom: -20 }}>
                                <Image style={styles.back} source={require('./../image/sidebar-icon.png')} />
                            </TouchableOpacity>
                            <View style={{ width: '60%', marginLeft: 10, marginRight: 10 }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginTop: 45, marginLeft: 50 }}>Kasuwha</Text>
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Image style={{ width: 30, height: 30, marginLeft: 30, marginTop: 45 }} source={require('./../image/icon/cart.png')} />
                                </View>
                            </View>
                        </View>

                        <ImageBackground source={require('./../image/top1.png')} style={{ width: '100%', height: 370, marginBottom: -20 }} >
                            <View>
                                <View style={{ marginTop: hp('-2%'), marginHorizontal: wp('5%'), marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{ width: '100%', flexDirection: 'row' }}>
                                            <View style={{ width: '90%' }}>
                                                <KeyboardAvoidingView behavior={'padding'}>
                                                    <TextInput
                                                        placeholderTextColor='#9e9e9e'
                                                        style={styles.searchInput}
                                                        placeholder={'Search'}
                                                        // containerStyle={{ marginVertical: '5%' }}
                                                        value={this.state.keyword}
                                                        onChangeText={keyword => this.setState({ keyword })}
                                                    />
                                                </KeyboardAvoidingView>
                                            </View>

                                            <Image style={{ width: 25, height: 25, marginLeft: 10, marginTop: 30 }} source={require('./../image/icon/zoom.png')} />

                                        </View>

                                    </View>
                                </View>


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
                        </ImageBackground>

                        <View style={{ paddingRight: 20, paddingLeft: 10, width: '100%', marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Categories</Text>

                            <View style={{ backgroundColor: 'white', borderRadius: 10 }}>

                                <ScrollView style={{ marginRight: 5 }} horizontal>
                                    <FlatList
                                        pagingEnabled
                                        horizontal
                                        data={this.state.categories}
                                        renderItem={this.renderCategories}
                                        keyExtractor={item => item.id}
                                    />
                                </ScrollView>

                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 30 }}>Featured Collection</Text>

                            <ScrollView style={{ marginRight: 0 }} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.products}
                                    renderItem={this.renderCollection}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>

                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 30 }}>Stores</Text>

                            <ScrollView style={{ marginRight: 0, }} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.shops}
                                    renderItem={this.renderShops}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>

                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop: 30 }}>Followed Stores</Text>

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
        backgroundColor: '#e1e1e1',
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
        width: 250,
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
        height: 180,
        alignSelf: 'center',
        marginTop: wp('0%'),
        borderRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
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