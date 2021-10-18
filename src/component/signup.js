import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, CheckBox, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import { URL, SERVER_KEY } from './../route/base_url';

var radio_props = [
    { value: 'Homme', label: 'Homme' },
    { value: 'Femme ', label: 'Femme ' },
];
export default class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            cpassword: '',
            gender: '',
            ischecked: false,
            loading: false
        };
    }


    register = () => {
        const { name } = this.state;
        const { username } = this.state;
        const { email } = this.state;
        const { phone } = this.state;
        const { countryCode } = this.state;
        const { password } = this.state;
        const { cpassword } = this.state;


        if (username == '') {

            alert("Please Enter Your Username");
            return;
        }
        else if (name == '') {
            alert("Please Enter Your Name");
            return;
        }
        else if (email == '') {
            alert("Please Enter Your Email");
            return;
        }
        else if (phone == '') {
            alert("Please Enter Your Phone");
            return;
        }
        else if (countryCode == '') {
            alert("Please Enter Your Country Code");
            return;
        }
        else if (password == '') {
            alert("Please Enter Your Password");
            return;
        }else if (password.length < 6) {

            alert("Please Enter Your Password atleast 6 characters");
            return;
        }else if (cpassword.length < 6) {

            alert("Please Enter Your Confirm Password atleast 6 characters");
            return;
        }else if (password !== cpassword) {

            alert("Password and Confirm Password not match");
            return;
        }
        else {

            this.setState({ loading: true })
            console.log('FILE UPLOAD PROCESSING....');
            // const data = new FormData();
            // data.append('server_key', "0976d0f8e8c113d608e5aa7d01f180a8");
            // data.append('name', name);
            // data.append('username', username);
            // data.append('password', password);
            // data.append('confirm_password', cpassword);
            // data.append('email', email);
            // data.append('phone', phone);
            // data.append('countryCode', countryCode);
            
 

            // const url = `${URL}/create-account`;
            const url = `${URL}/users/`
            alert("Checking :- "+url)
            const data = JSON.stringify({firstName:name,username:username,password:password,confirm_password:cpassword,email:email,phone:phone,countryCode:countryCode});
            console.log("Data Check :- ",data)
            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: data

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({ loading: false })
                    
                    if(responseJson.api_status == "400")
                    {
                        alert('E-mail Or Username is already taken');
                        return;
                    }
                    if(responseJson.api_status == "200")
                    {
                        alert('Account has been created successfully.');
                        this.props.navigation.goBack(null);
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
            <View style={{ marginTop: 18, marginBottom: -15 }}>
                <ActivityIndicator color="#000000" size={'large'} animating={this.state.loading} />
            </View>
        )
    };

    render() {
        const { ischecked } = this.props
        return (
            <View style={styles.container}>

                <View style={{ marginTop: wp('15%'), padding: 30 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Image style={styles.logo} source={require('./../image/signuptext.png')} />

                        <View style={{ marginTop: wp('0%'), alignContent: 'center', alignItems: 'center' }}>
                            <KeyboardAvoidingView behavior="padding">

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold' }}>Prénom</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={"Nom d'utilisateur"}
                                        value={this.state.username}
                                        onChangeText={username => this.setState({ username })}
                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Name</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Name'}
                                        value={this.state.name}
                                        onChangeText={name => this.setState({ name })}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>EMAIL</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'example@email.com'}
                                        value={this.state.email}
                                        onChangeText={email => this.setState({ email })}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Phone No.</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'PhoneNumber'}
                                        value={this.state.phone}
                                        onChangeText={phone => this.setState({ phone })}
                                        secureTextEntry={false}
                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Country Code</Text> 
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Country Code'}
                                        value={this.state.countryCode}
                                        onChangeText={countryCode => this.setState({ countryCode })}
                                        secureTextEntry={false}
                                    />
                                </View>


                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Mot de passe</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Mot de passe'}
                                        value={this.state.password}
                                        onChangeText={password => this.setState({ password })}
                                        secureTextEntry={true}
                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Confirm Password</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Confirm Password'}
                                        value={this.state.cpassword}
                                        onChangeText={cpassword => this.setState({ cpassword })}
                                        secureTextEntry={true}
                                    />
                                </View>

                                {/* <View style={{ width: '60%', marginLeft: 20, marginTop: wp('5%') }}>
                                    <RadioForm
                                        radio_props={radio_props}
                                        initial={0}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        onPress={(value) => this.setState({ gender: value })}
                                        buttonSize={0}
                                        buttonOuterSize={20}
                                        style={{ padding: 10 }}
                                        selectedButtonColor={'#DDB937'}
                                        selectedLabelColor={'#DDB937'}
                                        labelStyle={{ marginRight: 10, fontSize: 18 }}
                                    />
                                </View> */}

                            </KeyboardAvoidingView>


                            {this.state.loading == false ? null : this.renderButton()}

                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 30, alignSelf: 'center' }}
                                text="Créer un compte"
                                textStyle={{ fontSize: 17 }}
                                gradientBegin="#DDB937"
                                gradientEnd="#DDB937"
                                gradientDirection="diagonal"
                                height={60}
                                width={280}
                                radius={10}
                                impact
                                impactStyle='Light'
                                onPressAction={() => this.register()}
                            />


                        </View>
                    </ScrollView>
                </View>



                {/* </ImageBackground> */}



                <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')}>
                    <Text style={{ color: 'black', alignSelf: 'center', fontSize: 16, margin: 20 }}>Vous avez déjà un compte ?  <Text style={{ color: '#EAAA00' }}>Connexion</Text></Text>
                </TouchableOpacity>
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
        width: 90,
        height: 30,
        marginBottom: wp('10%')
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