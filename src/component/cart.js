import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Dimensions, TouchableOpacity, ImageBackground, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';


var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            first: '',
            last: '',
            email: '',
            cnic: '',
            cnic2: '',
            cnic3: '',
            gender: '',
            phone: this.props.navigation.getParam('PHONE'),
            lat: '',
            lng: '',
            srcImg: '',
            uri: '',
            Image: '',
            loading: false,
            reviews: [
                { ID: 1 },
                { ID: 1 }
            ],
            first: '',
            checked: 'checked',
            cartProducts: [
                { id: 1 },
                { id: 1 },
            ],
            EMPTY: false,
            languageCode: 'en'
        };
    }

    changeQty = async (item1, item2) => {
        return;
        this.setState({ loading: true });
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        let cartid = item1;
        let qty = item2 + 1;

        fetch('http://market360.pk/demo/api/v1/carts/change-quantity', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                id: cartid,
                quantity: qty,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                console.log(responseJson);
                if (responseJson.message == 'Cart updated') {
                    this.getCart();
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    changeQtyminus = async (item1, item2) => {
        return;
        this.setState({ loading: true });
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        if (item2 == 1) {
            this.setState({ loading: false });
            console.log('hello');
            return;
        }
        let cartid = item1;
        let qty = item2 - 1;

        fetch('http://market360.pk/demo/api/v1/carts/change-quantity', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                id: cartid,
                quantity: qty,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                console.log(responseJson);
                if (responseJson.message == 'Cart updated') {
                    this.getCart();
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return() {
        return;
    }

    permissionRemove(ID) {
        return;
        Alert.alert(
            'Are you sure to remove this product from cart?',
            '',
            [
                { text: 'NO', onPress: () => this.return(), style: 'cancel' },
                { text: 'YES', onPress: () => this.deleteCart(ID) },
            ]
        );
    }

    componentDidMount = async () => {
    }

    getCart = async () => {
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');

        fetch(`http://market360.pk/demo/api/v1/carts/${myID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                console.log(response)
                if (response.data == '') {
                    this.setState({
                        EMPTY: true
                    });
                    return;
                }
                this.setState({
                    cartProducts: response.data
                })
            })
            .catch(e => console.log(e));
    }

    deleteCart = async (ID) => {
        let TOKEN = await AsyncStorage.getItem('TOKEN');

        fetch(`http://market360.pk/demo/api/v1/carts/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                console.log(response)
                if (response.message == 'Product is successfully removed from your cart') {
                    this.getCart();
                    this.props.navigation.navigate('home2');
                    this.setState({ cartProducts: [] })
                    return;
                }
                // this.setState({
                //     cartProducts: response.data
                // })
            })
            .catch(e => console.log(e));
    }


    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: 35, marginBottom: 0 }}>
                <ActivityIndicator color="white" size={'small'} animating={this.state.loading} />
            </View>
        )
    };

    renderCartProducts = ({ item }) => {
        return (
            <View style={{ borderWidth: 1, backgroundColor: '#fff', borderColor: '#fff', margin: 10, borderRadius: 10, padding: 10 }}>
                <View style={{ borderBottomColor: '#DDB937', borderBottomWidth: 1, width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '80%', flexDirection: 'row' }}>
                        <View style={{ width: '5%' }}>
                            {/* <Image style={{ width: 30, height: 30, borderRadius: 50 }} source={{ uri: 'http://market360.pk/demo/public/' + item.product.shop.logo }} /> */}
                        </View>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Orange Store</Text>
                    </View>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity onPress={() => this.permissionRemove(item.id)} style={{ alignSelf: 'flex-end' }}>
                            <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/cross.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '35%' }}>
                        <Image style={{ width: 100, height: 100, borderRadius: 10, marginTop: 15 }} source={require('./../image/icon/car.jpg')} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginRight: 20 }}>Ford Gt 2018</Text>
                        {/* <Text style={{ fontSize: 12, color: '#A4A1A1' }}>Sports Shoes in Black</Text> */}
                        <Text style={{ fontSize: 12, color: '#DDB937', fontWeight: 'bold', marginRight: 20 }}>{'Quantity: ' + item.quantity}</Text>
                        <Text style={{ fontSize: 18, color: '#DDB937', fontWeight: 'bold', marginTop: 10 }}>USD 300000</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '10%' }}>
                                <TouchableOpacity onPress={() => this.changeQtyminus(item.id)}><Text style={{ fontSize: 15, backgroundColor: '#DDB937', textAlign: 'center', color: "white", borderRadius: 5 }}>-</Text></TouchableOpacity>
                            </View>
                            <View style={{ width: '15%' }}>
                                <TouchableOpacity><Text style={{ fontSize: 15, backgroundColor: 'white', textAlign: 'center', color: "#a1a3a4", borderRadius: 5 }}>1</Text></TouchableOpacity>
                            </View>
                            <View style={{ width: '10%' }}>
                                <TouchableOpacity onPress={() => this.changeQty(item.id)}><Text style={{ fontSize: 15, backgroundColor: '#DDB937', textAlign: 'center', color: "white", borderRadius: 5 }}>+</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }


    render() {
        const { cartProducts } = this.state;
        let totalPrice = 0;
        let totalQuantity = 0;
        let totalShipping = 0;

        cartProducts.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.price;
            totalShipping += item.quantity * item.shipping_cost;
        })

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.responsiveBox}>

                        <View>
                            <ImageBackground source={require('./../image/top1.png')} style={{ width: '100%', height: 110 }} resizeMode='stretch'>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ color: 'white', fontSize: 18, marginTop: 30, textAlign: 'center' }}>CART</Text>
                                    </View>
                                    <View style={{ width: '20%' }}>
                                        {/* <TouchableOpacity>
                                            <Text style={{ color: 'white', fontSize: 18, marginTop: 30 }}>Delete</Text>
                                        </TouchableOpacity> */}
                                        {this.renderButton()}
                                    </View>
                                </View>

                            </ImageBackground>
                        </View>

                        <FlatList
                            data={this.state.cartProducts}
                            renderItem={this.renderCartProducts}
                            keyExtractor={item => item.id}
                        />


                    </View>
                </ScrollView>

                <View style={{ width: '100%', backgroundColor: '#fff', height: 55, borderTopColor: '#DDB937', borderTopWidth: 0.5, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '20%', flexDirection: 'row', marginTop: 10, }}>
                            {/* <RadioButton
                                value="first"
                                color="white"
                                status={true}
                                onPress={() => this.setState({ first: true })}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 3 }}>All</Text> */}
                        </View>
                        <View style={{ width: '50%', marginTop: 5, marginLeft: -10 }}>
                            <Text style={{ color: '#A4A1A1', textAlign: 'right', fontSize: 12, marginRight: 5 }}>{'Shipping: Rs. ' + '100'}</Text>

                            <Text style={{ color: '#000', fontSize: 20, textAlign: 'right' }}>{'Total: Rs. ' + '600100'}</Text>


                        </View>
                        <View style={{ width: '30%', marginLeft: 5 }}>
                           
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('checkout')} style={{ backgroundColor: '#000000', borderRadius: 10, padding: 10, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Checkout</Text>

                                </TouchableOpacity>
                          

                        </View>
                    </View>
                </View>
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
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        marginLeft: -5
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
    },

});