import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Dimensions, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, Modal, BackHandler, KeyboardAvoidingView } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width: WIDTH } = Dimensions.get('window');
const numColumns = 2
export default class productdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adImages: [],
            images: [
                { img: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
                { img: "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80" },
                { img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
                { img: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" },
                { img: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }
            ],
            forYou: [
                { id: 2, name: 'Ford GT 2018', img: require('./../image/icon/car.jpg') },
                { id: 1, name: 'Ford GT 2019', img: require('./../image/icon/postimg.jpg') },
                { id: 1, name: 'Ford GT 2019', img: require('./../image/icon/postimg.jpg') },
                { id: 2, name: 'Ford GT 2018', img: require('./../image/icon/car.jpg') },
            ],
            reviews: [
                { id: 1 },
                { id: 2 },
            ],
            imagecount: '',
            mod: false,
            ADIMG: '',
            PID: '',

            Image: '',
            Price: '',
            Description: '',
            rating: '',
            shippingcost: '',
            shipping: '',
            shopID: '',
            modalvisible: false,
            Default_Rating: 1,
            Max_Rating: 5,
            txtreview: '',
            wish: '0',
            loading: false,
            languageCode: 'en'
        };
        this.Star = 'https://i.ibb.co/kxX9pQ1/star2.png';
        this.Star_With_Border = 'https://i.ibb.co/FqGYR6z/star.png';
    }

    componentDidMount = async () => {

    }

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }


    getProduct = async () => {
        let ProductID = this.props.navigation.getParam('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        console.log('PRODUCT ID: ' + ProductID);
        this.setState({ loading: true });
        fetch(`http://market360.pk/demo/api/v1/products/${ProductID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                // console.log(response);
                this.setState({
                    PID: response.data[0].id,
                    Image: response.data[0].thumbnail_image,
                    Price: response.data[0].price_higher,
                    Description: response.data[0].description,
                    wish: response.data[0].isWishlistItem,
                    rating: response.data[0].rating,
                    shippingcost: response.data[0].shipping_cost,
                    shopID: response.data[0].user.shop_id,
                    loading: false
                })
            })
            .catch(e => console.log(e));
    }

    getForYou = async () => {
        let ProductID = this.props.navigation.getParam('ID');
        console.log('PRODUCT ID: ' + ProductID)
        this.setState({ loading: true });
        fetch(`http://market360.pk/demo/api/v1/products/related/${ProductID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        }).then(r => r.json())
            .then(response => {
                this.setState({
                    forYou: response.data,
                    loading: false
                })
            })
            .catch(e => console.log(e));
    }

    getReview = async () => {
        let ProductID = this.props.navigation.getParam('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        console.log('PRODUCT ID: ' + ProductID)
        this.setState({ loading: true });
        fetch(`http://market360.pk/demo/api/v1/reviews/product/${ProductID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    reviews: response.data,
                    loading: false
                })
            })
            .catch(e => console.log(e));
    }

    addReview = async () => {
        return;
        let myID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        let ProductID = this.props.navigation.getParam('ID');
        const { Default_Rating } = this.state;
        const { txtreview } = this.state;
        let PID = `${ProductID}`;


        if (this.state.txtreview == '') {
            alert("Please Write Your Review");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch('http://market360.pk/demo/api/v1/reviews', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    user_id: myID,
                    product_id: PID,
                    rating: Default_Rating,
                    comment: txtreview,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false })
                    console.log(responseJson);
                    if (responseJson.message == 'Product already rated.') {
                        this.setState({ modalvisible: false });
                        alert('Product already rated.');
                        return;
                    }
                    if (responseJson.message == 'Review has been submitted successfully') {
                        this.setState({ modalvisible: false });
                        alert('Review has been submitted successfully');
                        this.getReview();
                        this.setState({ modalvisible: false, txtreview: '', Default_Rating: 1 });
                        return;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    addwishlist = async () => {
        return;
        const { PID } = this.state;
        let UserID = await AsyncStorage.getItem('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        this.setState({ loading: true })
        fetch('http://market360.pk/demo/api/v1/wishlists', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                user_id: UserID,
                product_id: PID,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                console.log(responseJson)
                if (responseJson.message == 'Product is successfully added to your wishlist') {
                    this.getProduct();
                    return;
                }
                // if (responseJson.message == 'Unfollowed successfully.') {
                //     alert('Unfollowed successfully.');
                //     return;
                // }
            })
            .catch((error) => {
                alert(error);
            });
    }

    addToCart = async () => {
        this.props.navigation.navigate('cart');
        return;
        console.log('start...')
        let myID = await AsyncStorage.getItem('ID');
        let ProductID = this.props.navigation.getParam('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        this.setState({ loading: true })
        fetch(`http://market360.pk/demo/api/v1/carts/add`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                user_id: myID,
                id: ProductID,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                // console.log(responseJson)
                if (responseJson.message == 'Product added to cart successfully') {
                    alert('Product added to cart successfully');
                    return;
                }

            })
            .catch((error) => {
                alert(error);
            });
    }

    buyNow = async () => {
        return;
        console.log('start...')
        let myID = await AsyncStorage.getItem('ID');
        let ProductID = this.props.navigation.getParam('ID');
        let TOKEN = await AsyncStorage.getItem('TOKEN');
        this.setState({ loading: true })
        fetch(`http://market360.pk/demo/api/v1/carts/add`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                user_id: myID,
                id: ProductID,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                // console.log(responseJson)
                if (responseJson.message == 'Product added to cart successfully') {
                    alert('Product added to cart successfully');
                    this.props.navigation.navigate('mycart');
                    return;
                }

            })
            .catch((error) => {
                alert(error);
            });
    }

    renderImages = ({ item }) => {
        console.log(item)
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({ ADIMG: item, mod: true })}>
                    <Image style={styles.ads} source={{ uri: `https://humarapakistanonline.com/images/${item}` }} />
                </TouchableOpacity>
            </View>
        )
    }

    renderForYou = ({ item }) => {
        return (

            <View style={{ width: '48%', marginLeft: 9, marginRight: -10 }}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('productdetails')} style={styles.block}>
                    <Image style={styles.img} source={item.img} />
                    <Text style={{ fontSize: 15, padding: 10, marginTop: 0 }}>{item.name}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('productdetail', { ID: item.id })} style={{ backgroundColor: 'white', borderRadius: 15, padding: 10 }}>
                <Image style={{ width: 100, height: 100, alignSelf: 'center' }} source={{ uri: 'http://market360.pk/demo/public/' + item.thumbnail_image }} />
                <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center', padding: 10, marginTop: 10 }}>{item.name}</Text>
            </TouchableOpacity> */}
            </View>
        )

    }

    renderReviews = ({ item }) => {
        return (

            <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, backgroundColor: 'white', marginTop: 5 }}>
                <View style={{ width: '30%' }}>
                    <Image style={{ width: 50, height: 50, marginTop: 10 }} source={require('./../image/icon/profileimg.png')} />
                </View>
                <View style={{ width: '70%', marginBottom: 0 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '70%' }}>
                            <Text style={{ fontSize: 13, color: "#DDB937" }}>Kenneth</Text>
                        </View>
                        <View style={{ width: '30%', flexDirection: 'row', }}>
                            <Text style={{ alignSelf: 'center', marginRight: 5, textAlign: 'right', color: '#A4A1A1', }}>5</Text>
                            <Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={require('./../image/icon/star.png')} />
                        </View>
                    </View>

                    <Text style={{ fontSize: 10, color: '#a1a3a4' }}>6 Min ago</Text>
                    <Text style={{ fontSize: 15 }}>This product is wonderfull</Text>
                </View>
            </View>
        )

    }

    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: '100%', marginBottom: 0 }}>
                <ActivityIndicator color="#000000" size={'large'} animating={this.state.loading} />
            </View>
        )
    };

    render() {
        let React_Native_Rating_Bar = [];

        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }
        if (this.state.loading == true) {
            return (

                this.renderButton()
            )
        } else {

            return (
                <View style={styles.container} >
                    <ScrollView >

                        <View>
                            <Image style={styles.ads} source={require('./../image/icon/car.jpg')} />

                            <View style={{ marginTop: 30, position: 'absolute', flex: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={{ marginLeft: 20, width: '40%' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                        <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={require('./../image/icon/backnull.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'white', marginBottom: 5, padding: 20, marginTop: 0 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '75%' }}>
                                    <Text style={{ fontSize: 20, color: 'black' }}>Ford GT 2018 9000</Text>
                                    <Text style={{ fontSize: 20, color: 'black', marginTop: 5 }}>RS 300000</Text>
                                </View>
                                <View style={{ width: '12%' }}>
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('#')}>
                                    <Image style={{ width: 30, height: 30 }} source={require('./../image/images/addetailshare.png')} />
                                </TouchableOpacity> */}
                                </View>
                                <View style={{ width: '12%' }}>
                                    <TouchableOpacity onPress={() => this.addwishlist()}>
                                        {this.state.wish == '0' ?
                                            <Image style={{ width: 30, height: 30 }} source={require('./../image/icon/addetailheart.png')} />
                                            :
                                            <Image style={{ width: 30, height: 30 }} source={require('./../image/icon/filladdetailheart.png')} />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ marginTop: 10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                            <View style={{ width: '25%', flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ alignSelf: 'center', marginRight: 5, textAlign: 'right', color: '#A4A1A1', }}>5</Text>
                                <Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={require('./../image/icon/star.png')} />
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#ebebeb', margin: 10, borderRadius: 10, padding: 10 }}>

                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: 20 }}>Just For You</Text>
                            <FlatList
                                pagingEnabled
                                data={this.state.forYou}
                                renderItem={this.renderForYou}
                                keyExtractor={item => item.id}
                                numColumns={numColumns}
                            />

                        </View>

                        <View style={{ backgroundColor: '#ebebeb', margin: 10, borderRadius: 10, padding: 10 }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: 10 }}>Reviews</Text>

                            <FlatList
                                pagingEnabled
                                data={this.state.reviews}
                                renderItem={this.renderReviews}
                                keyExtractor={item => item.id}
                            />


                        </View>


                    </ScrollView>

                    <View style={{ width: '100%', backgroundColor: '#fff', height: 55, borderTopColor: '#DDB937', borderTopWidth: 0.5, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
                        <View style={styles.responsiveBox}>
                            <View style={{ flexDirection: 'row' }}>
                                
                               
                                <View style={{ width: '95%' }}>
                                    <TouchableOpacity onPress={() => this.addToCart()} style={{  backgroundColor: '#DDB937', borderRadius: 10, padding: 10, marginTop: 10, marginLeft:25 }}>
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Add To Cart</Text>

                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                    </View>

                </View >
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1e1e1',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    mainTextView: {
        // flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 20
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 20,
        marginTop: 10
    },
    link: {
        fontSize: 15,
        color: '#000',

        marginTop: 10
    },
    locationView: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 20
    },
    city: {
        fontSize: 15,
        marginTop: 5,
        color: '#000'
    },
    border: {
        borderBottomColor: '#e9e9e9',
        borderBottomWidth: 2,
        marginTop: 20,
    },
    contact1: {
        fontSize: 15,
        marginRight: 34
    },
    contact: {
        fontSize: 15,
        marginRight: 20
    },
    detailView: {
        marginHorizontal: 20,
        marginTop: 20
    },
    detailText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        height: 50,
        fontSize: 20,
        color: '#fff',
        textAlignVertical: 'center',
        textAlign: 'center',
        width: WIDTH - 40,
        backgroundColor: '#26ae61',
        borderRadius: 5,
    },
    adsCity2: {
        marginTop: 5,
        marginLeft: 0,
        color: '#000'
    },
    ads: {
        width: WIDTH,
        height: 350,
        alignSelf: 'center',
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

    MainContainer: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        marginBottom: 20
    },
    StarImage: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        marginRight: 5
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
    },
    block: {
        width: 145,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'center'

    },
    img: {
        width: '100%',
        height: 130,
        alignSelf: 'center',
        marginTop: wp('0%'),
        borderRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
});