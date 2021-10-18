import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, CheckBox, Dimensions, TouchableOpacity, TextInput, AsyncStorage, Alert } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
var radio_props = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];
export default class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
            ads: [
                { id: 1, Image: require('./../image/icon/g1.png') },
                { id: 2, Image: require('./../image/icon/g2.png') },
                { id: 3, Image: require('./../image/icon/g3.png') },
                { id: 4, Image: require('./../image/icon/g1.png') },
                { id: 5, Image: require('./../image/icon/g2.png') },
                { id: 6, Image: require('./../image/icon/g3.png') },

            ],
            reaction: false
        };
    }

    renderAds = ({ item }) => {
        return (
            <View>
                <Image style={styles.ads} source={item.Image} />
            </View>
        )
    }

    render() {
        const { ischecked } = this.props
        return (
            <View style={styles.container}>

                <View style={{ marginTop: wp('10%') }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ flexDirection: 'row', padding: 30 }}>
                            <View style={{ width: '50%' }}>
                                <Image style={styles.logo} source={require('./../image/icon/videotext.png')} />
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('creategroup')}>
                                    <Image style={styles.search} source={require('./../image/icon/plus.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <TouchableOpacity>
                                    <Image style={styles.search} source={require('./../image/icon/setting.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <TouchableOpacity>
                                    <Image style={styles.search} source={require('./../image/icon/search.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 20, marginTop: -40, paddingBottom: 0, marginBottom: 20, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }}>

                            <TouchableOpacity style={{ width: '33%' }}>
                                <Text style={{ fontSize: 17, marginTop: 0, fontWeight: 'bold', paddingBottom: 10, color: '#DDB937' }}>Tous les vidéos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '33%' }}>
                                <Text style={{ fontSize: 17, marginTop: 0, paddingBottom: 10, color: '#999999' }}>Mes vidéos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '33%' }}>
                                <Text style={{ fontSize: 17, marginTop: 0, paddingBottom: 10, color: '#999999' }}>Mes Favoris</Text>
                            </TouchableOpacity>

                        </View>

                        <View>
                            <View style={{ padding: 20, flexDirection: 'row' }}>
                                <View style={{ width: '22%' }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 500 }} source={require('./../image/icon/1.jpeg')} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 7 }}>Kenneth J Lendoye</Text>
                                    <Text style={{ fontSize: 13, color: '#8f92a1' }}>15 mins ago</Text>
                                </View>
                            </View>

                            <Image style={{ width: '100%', height: 230 }} source={require('./../image/icon/postimg.jpg')} />

                            {this.state.reaction == false ?
                                null
                                :
                                <View style={{ backgroundColor: 'white', borderRadius: 50, padding: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={() => this.setState({ reaction: false })} style={{ width: '16.6%' }}>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('./../image/icon/emoji/strong.png')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.setState({ reaction: false })} style={{ width: '16.6%' }}>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('./../image/icon/emoji/heart.gif')} />
                                        </TouchableOpacity>

                                        {/* <TouchableOpacity onPress={() => this.setState({ reaction: false })} style={{ width: '14.2%' }}>
                                    <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('./../image/icon/emoji/like.gif')} />
                                </TouchableOpacity> */}

                                        <TouchableOpacity onPress={() => this.setState({ reaction: false })} style={{ width: '16.6%' }}>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('./../image/icon/emoji/laugh.gif')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.setState({ reaction: false })} style={{ width: '16.6%' }}>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('./../image/icon/emoji/cry.gif')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.setState({ reaction: false })} style={{ width: '16.6%' }}>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('./../image/icon/emoji/angry.gif')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.setState({ reaction: false })} style={{ width: '16.6%' }}>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center' }} source={require('./../image/icon/emoji/amazed.gif')} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            }

                            <View style={{ flexDirection: 'row', padding: 10, paddingLeft: 30, borderTopColor: '#EAEAEA', borderTopWidth: 1, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }}>

                                <TouchableOpacity onPress={() => this.setState({ reaction: true })} style={{ width: '25%', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center' }} source={require('./../image/icon/labelheart.png')} />
                                    <Text style={{ fontSize: 13, color: '#9B9B9B', paddingLeft: 10, paddingTop: 4, alignSelf: 'center' }}>98</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('comments')} style={{ width: '25%', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center' }} source={require('./../image/icon/labelcomment.png')} />
                                    <Text style={{ fontSize: 13, color: '#9B9B9B', paddingLeft: 10, paddingTop: 4, alignSelf: 'center' }}>134</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: '25%', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center' }} source={require('./../image/icon/labelmic.png')} />
                                    <Text style={{ fontSize: 13, color: '#9B9B9B', paddingLeft: 10, paddingTop: 4, alignSelf: 'center' }}>345</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: '25%', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center' }} source={require('./../image/icon/labelshare.png')} />
                                    <Text style={{ fontSize: 13, color: '#9B9B9B', paddingLeft: 10, paddingTop: 4, alignSelf: 'center' }}>523</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={{ backgroundColor: '#E0E0E0', padding: 5 }}></View>

                    </ScrollView>
                </View>


            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    logo: {
        width: 115,
        height: 30,
        marginTop: 5,
        marginBottom: wp('10%')
    },
    ads: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginTop: wp('0%'),
        borderRadius: 15,
        marginRight: 5
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
    search: {
        width: 40,
        height: 40,
        marginBottom: wp('10%')
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: wp('10%'),
        margin: 10
    },
    block: {
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
        borderRadius: 10,

    },
    profile: {
        width: 60,
        height: 60,
        marginBottom: wp('10%'),
        borderRadius: 15
    },
    dot: {
        width: 55,
        height: 35,
        marginTop: wp('3%'),
        marginLeft: -10
    },
    commentimg: {
        width: 30,
        height: 30,
        // marginBottom: wp('10%')
    },
    logintext: {
        width: 300,
        height: 130,
        marginBottom: wp('10%'),
        marginTop: wp('10%'),
    },
    headerText: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
    },
    button: {
        marginTop: hp('3%'),
        alignItems: 'center',
        backgroundColor: '#E0C800',
        borderRadius: wp('2%'),
        height: 40,
        marginHorizontal: wp('13%'),
    },
    buttonText: {

        fontSize: 20,
        color: '#000',
        marginTop: hp('1%'),
    },
    signupView: {
        alignItems: 'center',
        marginTop: hp('35%')
    },
    alresdy: {
        fontSize: hp('2.5%'),
        color: '#666666'
    },
    signupText: {
        fontSize: hp('2.5%'),
        marginTop: hp('1%'),
        color: '#00cb9c',
        fontWeight: 'bold'
    },
    firstInput: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 25,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        padding: 5
    },
    secondInput: {
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 40,
        borderBottomColor: '#EAEAEAEA',
        borderBottomWidth: 1,
        marginHorizontal: 25
    },
    checkboxcontainer: {
        flexDirection: "row",
        marginTop: wp('5%'),
        marginLeft: wp('5%')
    },
    checkbox: {
        alignSelf: "center",
    },
    input: {
        width: WIDTH - 85,
        height: 40,
        padding: 10,
        marginBottom: 0,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 15
    },
});