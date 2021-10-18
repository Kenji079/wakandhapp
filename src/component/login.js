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
import { URL, SERVER_KEY } from './../route/base_url';

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false
        };
    }

    componentDidMount() {

    }

    userData = (UID, ACCESSTOKEN) => {



        this.setState({ loading: true })
        console.log('FILE UPLOAD PROCESSING....');
        const data = new FormData();


        data.append('server_key', SERVER_KEY);
        data.append('fetch', 'user_data');
        data.append('user_id', UID);



        const url = `${URL}/get-user-data?access_token=${ACCESSTOKEN}`;
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
            },
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ loading: false })


                if (responseJson.api_status == "400") {
                    alert('Incorrect Username Or Password');
                    return;
                }
                if (responseJson.api_status == "200") {

                    console.log(responseJson.user_data.avatar);

                    let USERNAME = `${responseJson.user_data.name}`;
                    AsyncStorage.setItem('USERNAME', USERNAME);

                    let USEREMAIL = `${responseJson.user_data.email}`;
                    AsyncStorage.setItem('USEREMAIL', USEREMAIL);

                    let USERIMG = `${responseJson.user_data.avatar}`;
                    AsyncStorage.setItem('USERIMG', USERIMG);
                    
                    this.props.navigation.navigate('home2');

                    return;
                }
            })


    }

    login = () => {

        const { username } = this.state;
        const { password } = this.state;


        if (username == '') {

            alert("Please Enter Your Username");
            return;
        }
        else if (password == '') {
            alert("Please Enter Your Password");
            return;
        }
        // else if (password.length < 6) {

        //     alert("Please Enter Your Password atleast 6 characters");
        //     return;
        // }
        else {

            this.setState({ loading: true })
            console.log('FILE UPLOAD PROCESSING....');
            const data = new FormData();


            data.append('server_key', SERVER_KEY);
            // data.append('email', username);
            // data.append('password', password);
            // const url = `${URL}/auth`;
            const url = `${URL}/users/login`;
            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email:username,password:password })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({ loading: false })
                    if (responseJson.api_status == "200" || responseJson.isEmail==true) {
                        alert("Hellow")
                        let ACCESSTOKEN = `${responseJson.token}`;   
                        console.log("Access Token :- ",ACCESSTOKEN," responseJson.user_id :- ",responseJson._id)
                        AsyncStorage.setItem('ACCESSTOKEN', ACCESSTOKEN);

                        AsyncStorage.setItem('ACCESSTOKEN', ACCESSTOKEN);
                        AsyncStorage.setItem('UID', responseJson._id);
                        // this.userData(UID, ACCESSTOKEN);
                        this.props.navigation.navigate('home2');

                        return;
                    }else{
                        alert('Incorrect Username Or Password');
                        return;
                    }
                })

        }
    }

    renderButton() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: -10, marginBottom: 10 }}>
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

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold' }}>EMAIL</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Username'}
                                        value={this.state.username}
                                        onChangeText={username => this.setState({ username })}
                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>Mot de passe</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Password'}
                                        value={this.state.password}
                                        onChangeText={password => this.setState({ password })}
                                        secureTextEntry={true}
                                    />
                                </View>

                            </KeyboardAvoidingView>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('resetPassword')}>
                                <Text style={{ color: 'black', marginTop: wp('5%'), marginBottom: wp('10%'), alignSelf: 'flex-end', marginLeft: wp('40%'), fontSize: 15 }}>Mot de passe oublié?</Text>
                            </TouchableOpacity>

                            {this.state.loading == false ? null : this.renderButton()}

                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
                                text="Se connecter "
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

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')}>
                                <Text style={{ color: 'black', alignSelf: 'center', fontSize: 13, marginTop: wp('5%') }}>Vous n'avez pas encore de compte ? <Text style={{ color: '#DDB937', fontWeight: 'bold' }}>Inscription</Text></Text>
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