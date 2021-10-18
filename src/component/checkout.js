import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, ImageBackground, ActivityIndicator, AsyncStorage, Modal, Image, FlatList } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, FontAwesome, FontAwesome5} from '@expo/vector-icons';

var radio_props = [
    { value: 'Online_Payment', label: 'Online Payment' },
    { value: 'Cash_On_Delivery', label: 'Cash On Delivery' },
];
export default class checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            modalvisible: false,
            modalvisible1: false,
            modalvisibleaddress: false,
            modalvisiblemap: false,
            loading: false,

            region: null,
            lon: '',
            lat: '',
            plat: '',
            plon: '',
            coordinates: [],
            marginBottom: 1,

            City: '',
            Country: '',
            Postalcode: '',
            Address: '',
            Title: '',
            coupon: '',

            mAddId: '',
            mCity: '',
            mCountry: '',
            mAddress: '',
            Empty: false,
            paymentType: 'Cash_On_Delivery',
            discount: '',
            myGrandTotal: '0',

            totalCost: this.props.navigation.getParam('TOTAL'),
            shippingCost: this.props.navigation.getParam('SHIPPING'),

            Congo: false,

            USEREMAIL: '',
            Message: false,

            languageCode: 'en'
        };
    }


    componentDidMount = async () => {
  
    }

    getAddress = async () => {
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');

        fetch(`http://market360.pk/demo/api/v1/users/address/${myID}`, {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                console.log(response)
                if (response.addresses[0].address == '' || response.addresses[0].address == null || response.addresses[0].address == 'null') {
                    this.setState({ Empty: true, Message: true });
                    return;
                }
                this.setState({
                    mCity: response.addresses[0].city,
                    mAddId: response.addresses[0].id,
                    mCountry: response.addresses[0].country,
                    mAddress: response.addresses[0].address,
                    Empty: false,
                    fetchAddress: response.addresses
                })
            })
            .catch(e => console.log(e));
    }

    getAddressFetch = async () => {
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');

        fetch(`http://market360.pk/demo/api/v1/users/address/${myID}`, {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                console.log(response)
                if (response.addresses[0].address == '' || response.addresses[0].address == null || response.addresses[0].address == 'null') {
                    this.setState({ Empty: true, Message: true });
                    return;
                }
                this.setState({
                    fetchAddress: response.addresses,
                    Empty: false,
                    modalvisible: false,
                    modalvisibleaddress: true,
                })
            })
            .catch(e => console.log(e));
    }

    deleteAddress = async () => {
        const { mAddId } = this.state;
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');

        fetch(`http://market360.pk/demo/api/v1/address/delete/${mAddId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                console.log(response)
                if (response.message == 'Deleted successfully.') {
                    alert('Address Deleted Successfully');
                    this.getAddress();
                    return;
                }
            })
            .catch(e => console.log(e));
    }

    addAddress = async () => {

        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        let PHONE = await AsyncStorage.getItem('PHONE');
        const { City } = this.state;
        const { Country } = this.state;
        const { Postalcode } = this.state;
        const { Address } = this.state;
        const { Title } = this.state;


        if (this.state.City == '') {
            alert("Please Enter Your City");
            return;
        }
        else if (this.state.Country == '') {
            alert("Please Enter Your Country");
            return;
        }
        else if (this.state.Postalcode == '') {
            alert("Please Enter Your Postal Code");
            return;
        }
        else if (this.state.Address == '') {
            alert("Please Enter Your Address");
            return;
        }
        else if (this.state.Title == '') {
            alert("Please Enter Your Address");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('http://market360.pk/demo/api/v1/address/add', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    user_id: myID,
                    address: Address,
                    city: City,
                    country: Country,
                    postal_code: Postalcode,
                    phone: PHONE,
                    title: Title
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false })
                    console.log(responseJson);
                    if (responseJson.message == 'Address added successfully') {
                        alert('Address added successfully');
                        this.getAddress();
                        this.setState({ modalvisible: false, Title: '', City: '', Country: '', Postalcode: '', Address: '' });
                        this.getAddressFetch();
                        return;
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }
    applyCoupon = async () => {

        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        const { coupon } = this.state;


        if (this.state.coupon == '') {
            alert("Please Enter Your Coupon Code");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('http://market360.pk/demo/api/v1/coupon/apply', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    user_id: myID,
                    code: coupon,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false })
                    console.log(responseJson);
                    if (responseJson.message == 'Invalid coupon.') {
                        alert('Invalid Coupon');
                        return;
                    }
                    if (responseJson.message == 'You already used this coupon!') {
                        alert('You already used this coupon!');
                        return;
                    }
                    if (responseJson.message == 'Coupon has been applied') {
                        this.setState({ discount: responseJson.coupon_discount });
                        if (responseJson.coupon_discount == 0) {
                            alert('This Coupon Has 0 Discount offer');
                            return;
                        }
                        if (responseJson.coupon_discount != 0) {
                            let GRAND = this.state.totalCost - responseJson.coupon_discount;
                            this.setState({ myGrandTotal: GRAND });
                            return;
                        }
                        return;
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }
    orderPlace = async () => {

        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        let NAME = await AsyncStorage.getItem('NAME');
        let EMAIL = await AsyncStorage.getItem('EMAIL');
        let POSTAL = await AsyncStorage.getItem('POSTAL');
        let PHONE = await AsyncStorage.getItem('PHONE');

        const { mAddId } = this.state;
        const { mCity } = this.state;
        const { mCountry } = this.state;
        const { mAddress } = this.state;
        const { coupon } = this.state;
        const { discount } = this.state;

        const { paymentType } = this.state;

        const { totalCost } = this.state;
        const { shippingCost } = this.state;
        let ADDRESS = `{name:${NAME}, email:${EMAIL}, address:${mAddress}, country:${mCountry}, city:${mCity}, postal_code:${POSTAL}, phone: ${PHONE}, checkout_type:"logged"}`;


        const { myGrandTotal } = this.state;

        if (myGrandTotal == 0) {
            let GRAND = totalCost + shippingCost;

            if (mAddress == '') {
                alert('Please Select Your Address');
                return;
            }

            if (paymentType == '') {
                alert('Please Select Payment Type');
                return;
            }

            this.setState({ loading: true })
            fetch('http://market360.pk/demo/api/v1/order/store', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    user_id: myID,
                    shipping_address: mAddId,
                    payment_type: paymentType,
                    payment_status: 'unpaid',
                    grand_total: GRAND,
                    coupon_code: coupon,
                    coupon_discount: discount,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false })
                    console.log(responseJson.sellers[0].fcm_token);


                    if (responseJson.message == 'Your order has been placed successfully') {
                        this.RequestPushMsg(responseJson.sellers[0].fcm_token);
                        return;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (myGrandTotal != 0) {
            let GRAND = myGrandTotal + shippingCost;

            if (mAddress == '') {
                alert('Please Select Your Address');
                return;
            }

            if (paymentType == '') {
                alert('Please Select Payment Type');
                return;
            }


            this.setState({ loading: true })
            fetch('http://market360.pk/demo/api/v1/order/store', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    user_id: myID,
                    shipping_address: mAddId,
                    payment_type: paymentType,
                    payment_status: 'unpaid',
                    grand_total: GRAND,
                    coupon_code: coupon,
                    coupon_discount: discount,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false });
                    // console.log(responseJson.sellers[0].fcm_token);
                    // return;

                    if (responseJson.message == 'Your order has been placed successfully') {
                        this.RequestPushMsg(responseJson.sellers[0].fcm_token);
                        return;
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }
    RequestPushMsg(token) {
        console.log('param=>', token);
        let msg = "You have place a new order";
        let title = "NEW ORDER"
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'host': 'exp.host'
            },
            body: JSON.stringify({
                "to": token,
                "title": title,
                "body": title,
                "data": { "msg": msg, "title": title },
                "priority": "high",
                "sound": "default",
                "channelId": "messages"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ modalvisible1: true });
            })
            .catch((error) => { console.log(error) });
    }
    goto() {
        this.setState({ modalvisible1: false });
        // alert('hi')
        this.props.navigation.navigate('home2');
        return;
    }

    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: 15, marginBottom: -30 }}>
                <ActivityIndicator color="#000000" size={'small'} animating={this.state.loading} />
            </View>
        )
    };

    renderFetchAddress = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.setaddress(item.id, item.title, item.country, item.city, item.address)}>
                <View style={{ padding: 10, width: '100%', backgroundColor: '#fff', marginBottom: 2 }}>
                    <PowerTranslator style={{ color: '#000', padding: 5, fontSize: 16, fontWeight: 'bold' }} text={item.title} />
                    <PowerTranslator style={{ color: '#000', padding: 5, fontSize: 14, }} text={item.country} />
                    <PowerTranslator style={{ color: '#000', padding: 5, fontSize: 13, }} text={item.city} />
                    <PowerTranslator style={{ color: '#000', padding: 5, fontSize: 15, }} text={item.address} />
                </View>
            </TouchableOpacity>
        )
    }

    setaddress(ID, TITLE, COUNTRY, CITY, ADDRESS) {
        console.log('ID: ' + ID, 'TITLE: ' + TITLE, 'COUNTRY: ' + COUNTRY, 'CITY: ' + CITY, 'ADDRESS: ' + ADDRESS);
        this.setState({
            mCity: CITY,
            mAddId: ID,
            mCountry: COUNTRY,
            mAddress: ADDRESS,
            Empty: false,
            modalvisibleaddress: false
        })
    }

    currentLocation() {
        this.setState({ modalvisiblemap: false, modalvisible: true })
        // navigator.geolocation.getCurrentPosition(
        //     position => {
        //         const latitude = JSON.stringify(position.coords.latitude);
        //         const longitude = JSON.stringify(position.coords.longitude);
        //         this.getLocationName(latitude, longitude);
        //     },
        //     {
        //         timeout: 2000,
        //         enableHighAccuracy: true,
        //         maximumAge: 1000,

        //     }
        // );
    }

    getLocationName(latitude, longitude) {

        const lat = latitude;
        const lan = longitude;

        console.log('sLAT :' + lat, 'sLON :' + lan)

        Geocoder.init("AIzaSyCphINKttD-PZWJIMYfXmE9oUsLIgCgMoc");
        Geocoder.from(latitude, longitude)
            .then(json => {
                var address_component = json.results[0].formatted_address;
                var city = json.results[2].address_components[1].long_name;
                var country = json.results[2].address_components[3].long_name;
                console.log(json)
                this.setState({
                    Address: address_component,
                    City: city,
                    Country: country,
                    modalvisiblemap: false,
                    modalvisible: true
                });
            })
            .catch(error => console.warn(error));
    }

    onChangeValue = region => {
        console.log('LAT :' + region.latitude, 'LON :' + region.longitude);

        this.getLocationName(region.latitude, region.longitude);
        this.setState({
            region
        })
    }

    render() {
        const { myGrandTotal, region } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.responsiveBox}>
                        <View>
                            <ImageBackground source={require('./../image/top1.png')} style={{ width: '100%', height: 110 }} resizeMode='stretch'>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ width: '20%' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                            <FontAwesome name="angle-left" size={43} style={{ color: '#fff', marginTop: 20, marginLeft: 20, marginRight: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        {this.state.languageCode == 'en' ?
                                            <Text style={{ color: 'white', fontSize: 18, marginTop: 30 }}>Checkout</Text>
                                            :
                                            <Text style={{ color: 'white', fontSize: 18, marginTop: 30 }}>اس کو دیکھو</Text>
                                        }
                                    </View>
                                </View>

                            </ImageBackground>
                        </View>


                        <View style={{ borderWidth: 1, backgroundColor: '#fff', borderColor: '#fff', margin: 10, borderRadius: 10, padding: 10 }}>
                            <TouchableOpacity onPress={() => this.setState({ modalvisibleaddress: true })} style={{ borderBottomColor: 'red', borderBottomWidth: 1, width: '100%' }}>
                                {this.state.languageCode == 'en' ?
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Address</Text>
                                    :
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>پتہ منتخب کریں</Text>
                                }

                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '8%' }}>
                                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                                        {this.state.Empty == true ?
                                            null
                                            :
                                            null
                                            // <RadioButton
                                            //     value="first"
                                            //     color="white"
                                            //     status={true}
                                            //     onPress={() => this.setState({ first: true })}
                                            // />
                                        }

                                    </View>
                                </View>

                                <View style={{ width: '45%' }}>
                                    {this.state.Empty == true ?
                                        null
                                        :
                                        <View>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>{this.state.mCity}</Text>
                                            <Text style={{ fontSize: 12, color: '#A4A1A1' }}>{this.state.mAddress}</Text>
                                            <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>{this.state.mCountry}</Text>
                                        </View>
                                    }

                                </View>

                                <View style={{ width: '40%' }}>

                                    {this.state.Empty == true ?
                                        null
                                        :
                                        null
                                        // <TouchableOpacity onPress={() => this.deleteAddress()} style={{ backgroundColor: 'red', borderRadius: 10, padding: 10, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                                        //     <Text style={{ color: 'white', textAlign: 'center' }}>Delete Address</Text>
                                        // </TouchableOpacity>
                                    }

                                    {this.state.Empty == false ?
                                        // <TouchableOpacity onPress={() => this.setState({ modalvisible: true })} style={{ backgroundColor: 'red', borderRadius: 10, padding: 10, marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                                        //     <Text style={{ color: 'white', textAlign: 'center' }}>Add Address</Text>
                                        // </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.deleteAddress()} style={{ backgroundColor: 'red', borderRadius: 10, padding: 10, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                                            {this.state.languageCode == 'en' ?
                                                <Text style={{ color: 'white', textAlign: 'center' }}>Delete Address</Text>
                                                :
                                                <Text style={{ color: 'white', textAlign: 'center' }}>پتہ حذف کریں</Text>
                                            }

                                        </TouchableOpacity>
                                        :
                                        // <Text style={{marginTop:10, fontSize:13, color:'#A1A3A4'}}>Please Update Your Address From Profile Setting</Text>
                                        null
                                    }




                                </View>
                            </View>
                        </View>

                        <View style={{ borderWidth: 1, backgroundColor: '#fff', borderColor: '#fff', margin: 10, borderRadius: 10, padding: 10 }}>
                            <View style={{ borderBottomColor: 'red', borderBottomWidth: 1, width: '100%' }}>
                                {this.state.languageCode == 'en' ?
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Payment Option</Text>
                                    :
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>ادائیگی کا اختیار منتخب کریں</Text>
                                }

                            </View>

        
                        </View>

                        <View style={{ borderWidth: 1, backgroundColor: 'red', borderColor: '#fff', margin: 10, borderRadius: 10, padding: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '65%' }}>
                                    <View style={{ borderRadius: 15, borderColor: 'white', borderWidth: 1, padding: 5 }}>
                                        <TextInput
                                            placeholderTextColor='#fff'
                                            style={{ marginLeft: 10, color: '#fff' }}
                                            placeholder={'Enter Voucher Code'}
                                            containerStyle={{ marginVertical: '5%' }}
                                            value={this.state.coupon}
                                            onChangeText={coupon => this.setState({ coupon })}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <TouchableOpacity onPress={() => this.applyCoupon()} style={{ marginLeft: 5, borderRadius: 15, borderWidth: 1, borderColor: 'white' }}>
                                        {this.state.languageCode == 'en' ?
                                            <Text style={{ color: 'white', fontSize: 13, padding: 10, textAlign: 'center' }}>Apply</Text>
                                            :
                                            <Text style={{ color: 'white', fontSize: 13, padding: 10, textAlign: 'center' }}>درخواست دیں</Text>
                                        }

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ width: '100%', backgroundColor: '#fff', height: 65, borderTopColor: 'red', borderTopWidth: 0.5, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '20%', flexDirection: 'row', marginTop: 10, }}>

                        </View>
                        <View style={{ width: '50%', marginTop: 5, marginLeft: -10 }}>
                            {this.state.discount == '' ?
                                null
                                :
                                <View>
                                    <Text style={{ color: '#A4A1A1', textAlign: 'right', fontSize: 14, marginRight: 5 }}>Total: <Text style={{ color: 'red' }}>Rs. {this.state.totalCost}</Text></Text>
                                    <Text style={{ color: '#A4A1A1', textAlign: 'right', fontSize: 12, marginRight: 5 }}>Discount: <Text style={{ color: 'red' }}>Rs. {this.state.discount}</Text></Text>
                                </View>
                            }
                            {this.state.discount == '' ?
                                <View style={{ marginTop: 13 }}>
                                    {this.state.languageCode == 'en' ?
                                        <Text style={{ color: '#000', fontSize: 20, textAlign: 'right' }}>{'Total: Rs. ' + this.state.totalCost}</Text>
                                        :
                                        <Text style={{ color: '#000', fontSize: 20, textAlign: 'right' }}>{'کل : Rs. ' + this.state.totalCost}</Text>
                                    }

                                </View>
                                :
                                <View>
                                    {this.state.languageCode == 'en' ?
                                        <Text style={{ color: '#000', fontSize: 16, textAlign: 'right' }} >{'Grand Total: Rs. ' + myGrandTotal}</Text>
                                        :
                                        <Text style={{ color: '#000', fontSize: 16, textAlign: 'right' }} >{'مجموعی عدد: Rs. ' + myGrandTotal}</Text>
                                    }

                                </View>
                            }

                        </View>
                        <View style={{ width: '30%', marginLeft: 5 }}>
                            <TouchableOpacity onPress={() => this.orderPlace()} style={{ backgroundColor: 'red', borderRadius: 10, padding: 10, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                                {this.state.languageCode == 'en' ?
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Proceed</Text>
                                    :
                                    <Text style={{ color: 'white', textAlign: 'center' }}>آگے بڑھو</Text>
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <Modal visible={this.state.modalvisible1}>

                    <View style={{ paddingTop: 250, paddingLeft: 50, paddingRight: 50 }}>

                        {/* <FontAwesome5 name='check-circle' color='red' size={50} style={{ alignSelf: 'center', marginBottom: 50 }} /> */}
                        <Image style={{ width: 160, height: 120, alignSelf: 'center' }} source={require('./../image/logo.png')} />
                        {this.state.languageCode == 'en' ?
                            <Text style={{ textAlign: 'center', fontSize: 22 }}>Thank You for Your Order!</Text>
                            :
                            <Text style={{ textAlign: 'center', fontSize: 22 }}>آپ کے آرڈر کے لئے آپ کا شکریہ!</Text>
                        }
                        {this.state.languageCode == 'en' ?
                            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 5 }}>A copy of your order summary has been sent to</Text>
                            :
                            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 5 }}>آپ کے آرڈر سمری کی ایک کاپی بھیجی گئی ہے</Text>
                        }
                        <Text style={{ textAlign: 'center' }}> {this.state.USEREMAIL}</Text>
                        <View style={{ marginTop: 30 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.goto()}>
                                {this.state.languageCode == 'en' ?
                                    <Text style={styles.buttonText}>Go To Home</Text>
                                    :
                                    <Text style={styles.buttonText}>گھر جاو</Text>
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>



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


    firstInput: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: '#a1a3a4',
        borderWidth: 1,
        marginHorizontal: 35
    },
    input: {
        width: WIDTH - 55,
        height: 50,
        padding: 10,
        marginBottom: 10,

    },

    firstInputadd: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 20,
        paddingBottom: 5,
        borderColor: '#a1a3a4',
        borderWidth: 1,
        marginHorizontal: 35,
    },
    inputadd: {
        width: WIDTH - 115,
        height: 80,
        padding: 10,
        marginBottom: 10,

    },

    aboutView: {
        backgroundColor: '#fff',
        width: wp('90%'),
        height: hp('40%'),
        marginHorizontal: wp('5%'),
        marginVertical: hp('22%'),
        borderRadius: 5
    },
    text: {
        padding: wp('5%'),
        fontSize: 15,
        color: '#000'
    },
    text1: {
        marginHorizontal: wp('5%'),
        fontSize: 15,
        color: '#000'
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 200,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: '#F74329',
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
    },

});