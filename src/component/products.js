import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, BackHandler } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
const { width: WIDTH } = Dimensions.get('window');
const numColumns = 2
export default class Products extends React.Component {
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
                { id: 2, name: 'Ford Gt 2018', img: require('./../image/icon/car.jpg') },
                { id: 1, name: 'Ford Gt 2019', img: require('./../image/icon/postimg.jpg') },
                { id: 1, name: 'Ford Gt 2019', img: require('./../image/icon/postimg.jpg') },
                { id: 2, name: 'Ford Gt 2018', img: require('./../image/icon/car.jpg') },
                { id: 2, name: 'Ford Gt 2019', img: require('./../image/icon/car.jpg') },
                { id: 1, name: 'Ford Gt 2018', img: require('./../image/icon/postimg.jpg') },
                { id: 1, name: 'Ford Gt 2019', img: require('./../image/icon/postimg.jpg') },
                { id: 2, name: 'Ford Gt 2018', img: require('./../image/icon/car.jpg') },
            ],
            CatName: this.props.navigation.getParam('NAME'),
            loading: true,
            languageCode: 'en'

        };
    }


    componentDidMount = async () => {
    }


    renderForYou = ({ item }) => {
        return (

            <View style={{ width: '48%', marginLeft: 9, marginRight:-10 }}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('productdetails')} style={styles.block}>
                    <Image style={styles.img} source={item.img} />
                    <Text style={{ fontSize: 15, padding: 10, marginTop: 0, }}>{item.name}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('productdetail', { ID: item.id })} style={{ backgroundColor: 'white', borderRadius: 15, padding: 10 }}>
                    <Image style={{ width: 100, height: 100, alignSelf: 'center' }} source={{ uri: 'http://market360.pk/demo/public/' + item.thumbnail_image }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center', padding: 10, marginTop: 10 }}>{item.name}</Text>
                </TouchableOpacity> */}
            </View>
        )

    }

  
    render() {
        return (
            <View style={styles.container} >
                <ScrollView >

                    <View style={{ backgroundColor: '#ebebeb', margin: 0, borderRadius: 0, padding: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 35, marginBottom: 10 }}>PRODUCTS</Text>
                    </View>

                    <View style={{ marginLeft: 5, margin:10, borderRadius: 10, padding: 0, width: '100%' }}>

                        <View style={{ marginTop: 5 }}>
                            <FlatList
                                pagingEnabled
                                data={this.state.forYou}
                                renderItem={this.renderForYou}
                                keyExtractor={item => item.id}
                                numColumns={numColumns}
                            />
                        </View>

                    </View>

                </ScrollView>
            </View >
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
        height: 450,
        alignSelf: 'center',
    },

    block: {
        width: 165,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf:'center'

    },
    img: {
        width: '100%',
        height: 150,
        alignSelf: 'center',
        marginTop: wp('0%'),
        borderRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },

});