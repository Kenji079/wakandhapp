import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import { StreamApp } from 'expo-activity-feed';

export default class login2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            loading: false
        };
    }

    componentDidMount() {

    }

    login = () => {

        const { otp } = this.state;
        const phone = this.props.navigation.getParam('PHONE');


        if (otp == '') {

            alert("Please Enter Your OTP Code");
            return;

        } else if (phone == '') {

            alert("Please Enter Your Phone Number");
            return;

        }
        else {

            this.setState({ loading: true });

            var myHeaders = new Headers();
            // myHeaders.append("api_token", "4E/udJsISHSXa5z7Zi871SaOuZ3/6ENptOMnqJDqqA445zt7UyZCD61sl23S4YepbHsb8UDaR+So8IduAXO90A==");
            // myHeaders.append("api_secret", "eEO4sxR+Q5uRsRdjdP4snjFWZ0Bu/0cRnXeQjEdJOhSrUol9ffROQ6SifJsDaFK4FFa6/CqkTyuJJORlvpVw5IkcNDzhGk5PlAt72GQyvc2R+qiCuDxMj6qJnXI05D1sGttaz3H/R5KLgdovgfoO5swsNGa8ZEL7lkVWUp/4qPI1XkH0gtNAergUYGw0Uy9O");
            myHeaders.append("X-Ahtapot-Domain", "octo-sandbox");
            myHeaders.append("X-Ahtapot-Timezone", "Europe/Istanbul");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "credentials":
                {
                    "phone_number": phone,
                    "password": otp
                }
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.ahtapotapp.com/iam/user/passphrase", requestOptions)
                .then(response => response.text())
                .then((responseJson) => {

                    const obj = JSON.parse(responseJson);

                    if (obj.errors) {
                        alert('Your OTP code is incorrect!');
                        this.setState({ loading: false, phone: '' })
                        return;
                    }

                    if (obj.passphrase) {
                      
                        let UID = `${obj.passphrase.user_id}`;
                        AsyncStorage.setItem('UID', UID);

                        let PASS = `${obj.passphrase.passphrase}`;
                        AsyncStorage.setItem('PASS', PASS);
                        
                        this.setState({ loading: false, otp: '' })

                        this.props.navigation.navigate('home2')

                        return;
                    }


                    console.log(obj)

                    this.setState({ loading: false })
                })
                .catch(error => console.log('error', error));
        }
    }

    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: 15, marginBottom: -15 }}>
                <ActivityIndicator color="#000000" size={'large'} animating={this.state.loading} />
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={{ marginTop: wp('10%'), padding: 30 }}>
                    <ScrollView>

                        <Image style={styles.logo} source={require('./../image/logo.png')} />

                        <Image style={styles.logintext} source={require('./../image/logintext.jpg')} />

                        <View style={{ marginTop: wp('0%'), alignContent: 'center', alignItems: 'center' }}>
                            <KeyboardAvoidingView behavior="padding">

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), marginTop: 30, fontWeight: 'bold' }}>PLEASE ENTER OTP CODE</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Enter OTP Code'}
                                        value={this.state.otp}
                                        onChangeText={otp => this.setState({ otp })}
                                        keyboardType={'phone-pad'}
                                        maxLength={4}
                                    />
                                </View>

                            </KeyboardAvoidingView>

                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('resetPassword')}>
                                <Text style={{ color: 'black', marginTop: wp('5%'), marginBottom: wp('10%'), alignSelf: 'flex-end', marginLeft: wp('40%'), fontSize: 15 }}>Forgot password?</Text>
                            </TouchableOpacity> */}

                            {this.state.loading == false ? null : this.renderButton()}

                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 30, alignSelf: 'center' }}
                                text="Login"
                                textStyle={{ fontSize: 17 }}
                                gradientBegin="#DDB937"
                                gradientEnd="#DDB937"
                                gradientDirection="diagonal"
                                height={60}
                                width={280}
                                radius={10}
                                impact
                                impactStyle='Light'
                                onPressAction={() => this.login()}
                            />

                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <Text style={{ color: '#DDB937', fontWeight: 'bold', marginTop: 20 }}>Back To Login Page</Text>
                            </TouchableOpacity>


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
        width: 150,
        height: 70,
        marginBottom: wp('10%')
    },
    logintext: {
        width: 300,
        height: 130,
        marginBottom: wp('10%'),
        marginTop: wp('0%'),
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