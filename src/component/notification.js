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
export default class Notification extends React.Component {
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
                            <View style={{ width: '85%' }}>
                                <Image style={styles.logo} source={require('./../image/notificationtext.png')} />
                            </View>
                            <View style={{ width: '15%' }}>
                                <TouchableOpacity>
                                    <Image style={styles.search} source={require('./../image/icon/search.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                       <View style={{ marginTop: wp('0%'), alignContent: 'center', alignItems: 'center' }}> 
                            
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <View style={{ width: '27%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Linh Nguyen <Text style={{ fontWeight: '100' }}>posted in</Text> UI & UX Designers</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '20%' }}>
                                            <Image style={styles.commentimg} source={require('./../image/icon/menu3.3.png')} />
                                        </View>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{ marginTop: 3, color: '#8f92a1' }}>a few second ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <TouchableOpacity>
                                        <Image style={styles.dot} source={require('./../image/icon/dots.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <View style={{ width: '27%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Linh Nguyen <Text style={{ fontWeight: '100' }}>posted in</Text> UI & UX Designers</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '20%' }}>
                                            <Image style={styles.commentimg} source={require('./../image/icon/menu3.3.png')} />
                                        </View>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{ marginTop: 3, color: '#8f92a1' }}>a few second ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <TouchableOpacity>
                                        <Image style={styles.dot} source={require('./../image/icon/dots.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <View style={{ width: '27%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Linh Nguyen <Text style={{ fontWeight: '100' }}>posted in</Text> UI & UX Designers</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '20%' }}>
                                            <Image style={styles.commentimg} source={require('./../image/icon/menu3.3.png')} />
                                        </View>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{ marginTop: 3, color: '#8f92a1' }}>a few second ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <TouchableOpacity>
                                        <Image style={styles.dot} source={require('./../image/icon/dots.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <View style={{ width: '27%' }}>
                                    <Image style={styles.profile} source={require('./../image/icon/profileimg.png')} />
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Linh Nguyen <Text style={{ fontWeight: '100' }}>posted in</Text> UI & UX Designers</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '20%' }}>
                                            <Image style={styles.commentimg} source={require('./../image/icon/menu3.3.png')} />
                                        </View>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{ marginTop: 3, color: '#8f92a1' }}>a few second ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <TouchableOpacity>
                                        <Image style={styles.dot} source={require('./../image/icon/dots.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>


                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                text="See all"
                                textStyle={{ fontSize: 17, color:'black' }}
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
        width: 170,
        height: 30,
        marginBottom: wp('10%')
    },
    search: {
        width: 40,
        height: 40,
        marginBottom: wp('10%')
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