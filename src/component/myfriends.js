
import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, FlatList, Dimensions, TouchableOpacity, TextInput, AsyncStorage, Alert, Picker } from 'react-native';
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
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' },
];
export default class myfriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            count: ''
        };
    }

    componentDidMount() {

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.requests();
        });

        this.requests();
    }

    requests = async () => {


        const UID = await AsyncStorage.getItem('UID');
        const ACCESSTOKEN = await AsyncStorage.getItem('ACCESSTOKEN');


        this.setState({ loading: true })
        console.log('FILE UPLOAD PROCESSING....');
        const data = new FormData();


        data.append('server_key', SERVER_KEY);
        data.append('user_id', UID);
        data.append('type', 'get_user_data');
        data.append('fetch', 'followers');

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


                this.setState({
                    requests: responseJson.followers,
                    // count: responseJson.new_friend_requests_count
                })

            })
    }



    renderRequests = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                <View style={{ width: '30%' }}>
                    <Image style={styles.profile} source={{ uri: item.avatar }} />
                </View>
                <View style={{ width: '70%', marginLeft: 20, }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20 }}>{item.name}</Text>
                    <Text style={{ marginTop: 0, color: '#8f92a1', }}>{item.details.mutual_friends_count} mutual friends</Text>
                </View>
            </View>
        );
    };

    render() {
        const { ischecked } = this.props
        return (
            <View style={styles.container}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: wp('10%'), padding: 30 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: '10%', marginTop: 6 }} onPress={() => this.props.navigation.goBack(null)}>
                                <Image style={styles.back} source={require('./../image/icon/back.png')} />
                            </TouchableOpacity>
                            <View style={{ width: '70%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Friends</Text>
                                </View>
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#DDB937', marginTop: 6 }}>{this.state.count}</Text>
                                </View>
                            </View>
                        </View>



                    </View>

                    <View style={{marginTop:-20}}>
                        <FlatList
                            pagingEnabled
                            horizontal
                            data={this.state.requests}
                            renderItem={this.renderRequests}
                            keyExtractor={(item) => item.id}
                        />
                    </View>

                </ScrollView>


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
        marginTop: 10,
        borderRadius: 500
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