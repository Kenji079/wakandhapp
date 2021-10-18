import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, CheckBox, Dimensions, TouchableOpacity, TextInput, AsyncStorage, Alert } from 'react-native';
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
export default class myinformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
        };
    }

    render() {
        const { ischecked } = this.props
        return (
            <View style={styles.container}>

                <View style={{ marginTop: wp('10%'), padding: 30 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: '10%', marginTop: 6 }} onPress={() => this.props.navigation.goBack(null)}>
                                <Image style={styles.back} source={require('./../image/icon/back.png')} />
                            </TouchableOpacity>
                            <View style={{ width: '40%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Image style={styles.logo} source={require('./../image/icon/myinformationtxt.png')} />
                                </View>
                            </View>
                        </View>

                        <Text style={{ marginTop: -20, fontSize: 16 }}>Please choose which information you would like to download.</Text>

                        <View style={{ marginTop: wp('6%'), alignContent: 'center', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity style={styles.block} onPress={() => this.props.navigation.navigate('#')}>
                                        <Image style={styles.icon} source={require('./../image/icon/myinfo.png')} />
                                        <Text style={{ fontSize: 16, padding: 10, marginTop: -30, textAlign: 'center' }}>My Info</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity style={styles.block} onPress={() => this.props.navigation.navigate('#')}>
                                        <Image style={styles.icon} source={require('./../image/icon/posts.png')} />
                                        <Text style={{ fontSize: 16, padding: 10, marginTop: -30, textAlign: 'center' }}>Posts</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity style={styles.block} onPress={() => this.props.navigation.navigate('#')}>
                                        <Image style={styles.icon} source={require('./../image/icon/pages.png')} />
                                        <Text style={{ fontSize: 16, padding: 10, marginTop: -30, textAlign: 'center' }}>Pages</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity style={styles.block} onPress={() => this.props.navigation.navigate('#')}>
                                        <Image style={styles.icon} source={require('./../image/icon/group.png')} />
                                        <Text style={{ fontSize: 16, padding: 10, marginTop: -30, textAlign: 'center' }}>Group</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity style={styles.block} onPress={() => this.props.navigation.navigate('#')}>
                                        <Image style={styles.icon} source={require('./../image/icon/following.png')} />
                                        <Text style={{ fontSize: 16, padding: 10, marginTop: -30, textAlign: 'center' }}>Following</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity style={styles.block} onPress={() => this.props.navigation.navigate('#')}>
                                        <Image style={styles.icon} source={require('./../image/icon/follower.png')} />
                                        <Text style={{ fontSize: 16, padding: 10, marginTop: -30, textAlign: 'center' }}>Follower</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                        <GradientButton
                            style={{ marginVertical: 8., marginTop: 30, alignSelf: 'center' }}
                            text="Download Now!"
                            textStyle={{ fontSize: 17 }}
                            gradientBegin="#00CC33"
                            gradientEnd="#00CC33"
                            gradientDirection="diagonal"
                            height={60}
                            width={280}
                            radius={10}
                            impact
                            impactStyle='Light'
                            onPressAction={() => this.props.navigation.navigate('#')}
                        />

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
        width: 170,
        height: 25,
        marginBottom: wp('10%'),
        marginTop: 5
    },
    back: {
        width: 30,
        height: 30,
        marginBottom: wp('10%')
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
        margin: 10,
        alignSelf: 'center'
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
        padding: 10
    },
    profile: {
        width: 70,
        height: 70,
        marginBottom: wp('10%')
    },
    dot: {
        width: 25,
        height: 10,
        marginTop: wp('2%'),
        marginLeft: 5
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