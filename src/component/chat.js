
import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, CheckBox, Dimensions, TouchableOpacity, TextInput, AsyncStorage, Alert, Picker } from 'react-native';
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
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' },
];
export default class chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
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
                            <View style={{ width: '70%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Image style={styles.logo} source={require('./../image/icon/friendtext.png')} />
                                </View>
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#DDB937', marginTop: 6 }}>4</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: wp('0%'), alignContent: 'center', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '30%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Ali Awais Nadeem</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ marginTop: 0, color: '#8f92a1', marginLeft: 5 }}>2 mutual friends</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Confirm"
                                                        textStyle={{ fontSize: 17, color: 'white' }}
                                                        gradientBegin="#DDB937"
                                                        gradientEnd="#DDB937"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Delete"
                                                        textStyle={{ fontSize: 17, color: 'black' }}
                                                        gradientBegin="#f3f3f3"
                                                        gradientEnd="#f3f3f3"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '30%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Ali Awais Nadeem</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ marginTop: 0, color: '#8f92a1', marginLeft: 5 }}>2 mutual friends</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Confirm"
                                                        textStyle={{ fontSize: 17, color: 'white' }}
                                                        gradientBegin="#DDB937"
                                                        gradientEnd="#DDB937"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Delete"
                                                        textStyle={{ fontSize: 17, color: 'black' }}
                                                        gradientBegin="#f3f3f3"
                                                        gradientEnd="#f3f3f3"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '30%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Ali Awais Nadeem</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ marginTop: 0, color: '#8f92a1', marginLeft: 5 }}>2 mutual friends</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Confirm"
                                                        textStyle={{ fontSize: 17, color: 'white' }}
                                                        gradientBegin="#DDB937"
                                                        gradientEnd="#DDB937"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Delete"
                                                        textStyle={{ fontSize: 17, color: 'black' }}
                                                        gradientBegin="#f3f3f3"
                                                        gradientEnd="#f3f3f3"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '30%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Ali Awais Nadeem</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ marginTop: 0, color: '#8f92a1', marginLeft: 5 }}>2 mutual friends</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Confirm"
                                                        textStyle={{ fontSize: 17, color: 'white' }}
                                                        gradientBegin="#DDB937"
                                                        gradientEnd="#DDB937"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <GradientButton
                                                        style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                                        text="Delete"
                                                        textStyle={{ fontSize: 17, color: 'black' }}
                                                        gradientBegin="#f3f3f3"
                                                        gradientEnd="#f3f3f3"
                                                        gradientDirection="diagonal"
                                                        height={40}
                                                        width={100}
                                                        radius={10}
                                                        impact
                                                        impactStyle='Light'
                                                        onPressAction={() => this.props.navigation.navigate('#')}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>





                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                text="See all"
                                textStyle={{ fontSize: 17, color: 'black' }}
                                gradientBegin="#f3f3f3"
                                gradientEnd="#f3f3f3"
                                gradientDirection="diagonal"
                                height={60}
                                width={280}
                                radius={10}
                                impact
                                impactStyle='Light'
                                onPressAction={() => this.props.navigation.navigate('#')}
                            />


                        </View>

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
        width: 180,
        height: 20,
        marginBottom: wp('10%'),
        marginTop: 12
    },
    imgpicker: {
        width: 290,
        height: 130,
        alignSelf: 'center',
        marginTop: 20
    },
    search: {
        width: 40,
        height: 40,
        marginBottom: wp('10%')
    },
    back: {
        width: 30,
        height: 30,
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
        padding: 10
    },
    profile: {
        width: 75,
        height: 75,
        marginBottom: wp('10%'),
        marginTop: 10
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
    firstInput1: {
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
    input1: {
        width: WIDTH - 85,
        height: 120,
        padding: 10,
        marginBottom: 0,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 15
    },
});