
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, CheckBox, Dimensions, TouchableOpacity, Slider, AsyncStorage, Alert, Picker } from 'react-native';
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
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];
export default class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
            access_token: '',
            user_id: '',
            loadin: false,
            userList: {},
        };
    }
    componentDidMount = async () => {
        const access_token = await AsyncStorage.getItem('ACCESSTOKEN');
        let user_id = await AsyncStorage.getItem('UID');
        this.setState({ access_token: access_token, user_id: user_id })
        this.getUserData();
    }
    onValueChange() {
        console.log('#')
    }
    getUserData = () => {
        const {
            user_id,
            access_token
        } = this.state;
        this.setState({ loading: true })
        const data = new FormData();
        data.append('server_key', SERVER_KEY);
        data.append('fetch', 'user_data,followers,following');
        data.append('user_id', user_id);

        const url = `${URL}/get-user-data?access_token=` + access_token;
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
                this.setState({ loading: false })
                if (responseJson.api_status == "400") {
                    alert("No User Found")
                    return;
                }
                if (responseJson.api_status == "200") {
                    this.setState({ userList: responseJson, })
                    return;
                }
            })
    }



    render() {
        const { ischecked } = this.props
        const { userList } = this.state;

        return (
            <View style={styles.container}>

                <View style={{ marginTop: wp('10%'), padding: 0 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ flexDirection: 'row', paddingLeft: 30, marginBottom: -15, marginTop: 5 }}>
                            <TouchableOpacity style={{ width: '10%', marginTop: 6 }} onPress={() => this.props.navigation.goBack(null)}>
                                <Image style={styles.back} source={require('./../image/icon/back.png')} />
                            </TouchableOpacity>
                            <View style={{ width: '40%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    {/* <Image style={styles.logo} source={require('./../image/icon/verificationtext.png')} /> */}
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: wp('0%'), alignContent: 'center', alignItems: 'center' }}>

                            <ImageBackground source={userList.user_data?.cover == '' ? require('./../image/cover.jpg') : { uri: userList.user_data?.cover }} style={{ width: '100%', height: 200, borderRadius: 30 }} >
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <View style={{ width: '30%' }}>
                                        <Image style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 160, marginRight: 8, borderWidth: 3, borderColor: 'white', borderRadius: 300, }} source={require('./../image/icon/profileimg.png')}></Image>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>{userList.user_data?.first_name}</Text>
                                    </View>
                                    <View style={{ width: '30%' }}>
                                        <Image style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 110, borderWidth: 3, borderColor: 'white', borderRadius: 300, }}
                                            source={
                                                userList.user_data?.cover == '' ?
                                                    require('./../image/icon/profileimg.png')
                                                    :
                                                    { uri: userList.user_data?.avatar }
                                            }></Image>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>{userList.user_data?.username}</Text>
                                    </View>
                                    <View style={{ width: '30%' }}>
                                        <Image style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 160, marginLeft: 8, borderWidth: 3, borderColor: 'white', borderRadius: 300, }} source={require('./../image/icon/profileimg.png')}></Image>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>{userList.user_data?.last_name}</Text>

                                    </View>
                                </View>
                            </ImageBackground>


                            <View style={{ padding: 30, marginTop: 100, borderTopColor: '#eaeaea', borderTopWidth: 1 }}>

                                <View style={{ flexDirection: 'row', marginTop: -30 }}>
                                    <View style={{ width: '70%', margin: 10 }}>
                                        <GradientButton
                                            style={{ marginVertical: 8., }}
                                            text="Ajouter"
                                            textStyle={{ fontSize: 17 }}
                                            gradientBegin="#DDB937"
                                            gradientEnd="#DDB937"
                                            gradientDirection="diagonal"
                                            height={40}
                                            width={240}
                                            radius={10}
                                            impact
                                            impactStyle='Light'
                                            onPressAction={() => console.log('Hello')}
                                        />
                                    </View>
                                    <View style={{ width: '22%', margin: 10 }}>
                                        <TouchableOpacity>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 3 }} source={require('./../image/icon/storybutton.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {
                                    userList.user_data?.working !== '' ? (
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ width: '10%' }}>
                                                <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                            </View>
                                            <View style={{ width: '80%' }}>
                                                <Text style={{  textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0, }}>{userList.user_data?.working}</Text>
                                            </View>
                                        </View>
                                    )
                                        :
                                        false
                                }

                                {
                                    userList.user_data?.school !== '' ? (
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ width: '10%' }}>
                                                <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                            </View>
                                            <View style={{ width: '80%' }}>
                                                <Text style={{  textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>
                                                    {userList.user_data?.school}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                        :
                                        false
                                }
                                {
                                    userList.user_data?.address !== '' ? (
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ width: '10%' }}>
                                                <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                            </View>
                                            <View style={{ width: '80%' }}>
                                                <Text style={{textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>
                                                    {userList.user_data?.address}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                        :
                                        false
                                }

                                {userList.followers?.map((item) => {
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ width: '10%' }}>
                                            <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                        </View>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{ alignSelf: 'center', textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>
                                                {"Follwed by " + item.followers_data + " people"}
                                            </Text>
                                        </View>
                                    </View>
                                })
                                }




                                {/* <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', color: '#000000' }}>Pas de publication</Text>
                                <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 15, color: '#8f92a1', marginTop: 10 }}>Ce profil n'a encore rien publie, les publications apparaitront lol.</Text>
                                <View style={{ width: '100%' }}>
                                    <GradientButton
                                        style={{ marginVertical: 8., marginTop: 20 }}
                                        text="Commence a publier!"
                                        textStyle={{ fontSize: 15, fontWeight: '100', }}
                                        gradientBegin="#DDB937"
                                        gradientEnd="#DDB937"
                                        gradientDirection="diagonal"
                                        height={40}
                                        width={280}
                                        radius={10}
                                        impact
                                        impactStyle='Light'
                                        onPressAction={() => this.props.navigation.navigate('#')}
                                    />
                                </View> */}
                            </View>

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
        width: 200,
        height: 25,
        marginBottom: wp('10%'),
        marginTop: 5
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
        width: 80,
        height: 100,
        marginBottom: wp('0%'),
        margin: 10,
        alignSelf: 'center',
        marginTop: 10
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
    firstInput1: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 25,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        padding: 5
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