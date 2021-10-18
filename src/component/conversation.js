import React from 'react';
import { StyleSheet, TextInput, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
import { Ionicons, SimpleLineIcons, FontAwesome, Feather, FontAwesome5, AntDesign, EvilIcons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window')
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class chat extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            message: '',
            loading: false,
            MYID: '1',
            USERID: '2',
            chat: [
                { id: 1, sender_id: 2, message: 'Hello' },
                { id: 1, sender_id: 1, message: 'Hi' },
            ]
        };
    }


    getData = async () => {
        return;
        console.log('on hai abhi bhe...')
        this.setState({ loading: true });
        this.setState({
            MYID: await AsyncStorage.getItem('ID'),
            USERID: this.props.navigation.getParam('USERID')
        })
        let myID = await AsyncStorage.getItem('ID');
        let USERID = this.props.navigation.getParam('USERID');
        fetch(`http://marriage.aajo.in/public/api/fetchmessage/${myID}/${USERID}`)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState({ loading: false })
                this.setState({
                    chat: responsejson.list
                })
            })
            .catch((error) => {
                Alert.alert(error)
            })
    }

    timeout = 0;
    Back() {
        clearInterval(this.timeout);
        this.props.navigation.goBack(null)
    }


    componentDidMount = async () => {
        // this.timeout = setInterval(()=> this.getData(), 3000)

        // this.getData();
        // this.setState({
        //     UID: this.props.navigation.getParam('uid'),
        //     MYID: await AsyncStorage.getItem('ID'),
        //     USERID: this.props.navigation.getParam('USERID'),
        // });

    }

    register = async () => {
        return;

        let myID = await AsyncStorage.getItem('ID');
        let USERID = this.props.navigation.getParam('USERID');
        const { message } = this.state;

        if (this.state.message === '') {
            alert("Please Type Your Message");
            return;
        }
        else {
            this.setState({ loading: true })
            fetch(`http://marriage.aajo.in/public/api/sendmessage/${myID}/${USERID}`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    message: message
                })
            }).then((response) => response.json())
                .then((responseJson) => {

                    this.setState({ loading: false })

                    if (responseJson.message == 'Chat submitted') {
                        this.setState({ message: '' });
                        this.getData();
                    }

                })
                .catch((error) => {
                    alert(error);
                });
        }
    }


    renderDayRow = ({ item }) => {
        if (item.sender_id == this.state.USERID) {
            return (
                <View>

                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: '25%' }}>
                            <Image style={styles.profile} source={require('./../image/icon/1.jpeg')} />
                        </View>

                        <View style={{ width: '70%', padding: 10 }}>
                            <Text style={{
                                backgroundColor: '#fff', shadowColor: "#000",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 3,

                                padding: 10,
                                borderBottomRightRadius: 10,
                                borderTopRightRadius: 10,
                                borderBottomLeftRadius: 10
                            }}>
                                {item.message}
                            </Text>
                        </View>

                    </View>


                </View>
            )
        }
        else {
            return (
                <View style={{marginTop:20}}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ width: '70%', padding: 10, }}>
                            <Text style={{marginRight:-15,marginLeft:10, color: 'white', backgroundColor: '#C43379', padding: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>
                                {item.message}
                            </Text>
                        </View>
                        <View style={{ width: '20%' }}>
                            <Image style={styles.profile} source={require('./../image/icon/2.jpeg')} />
                        </View>

                    </View>
                </View>
            )

        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', borderBottomColor: '#E8E8E8', borderBottomWidth: 1, marginTop: 30 }}>
                    <View style={{ width: '15%' }}>
                        <TouchableOpacity style={{ marginTop: 6 }} onPress={() => this.props.navigation.goBack(null)}>
                            <Image style={styles.back} source={require('./../image/icon/back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '53%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('conversation')} style={{ marginTop: wp('7%'), alignContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15, borderBottomColor: '#EAEAEA', borderBottomWidth: 1, paddingBottom: 10 }}>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '25%' }}>
                                    <Image style={{
                                        width: 45,
                                        height: 45,
                                        marginTop: 0,
                                        marginLeft: 0,
                                        borderRadius: 300
                                    }} source={require('./../image/icon/2.jpeg')} />
                                </View>
                                <View style={{ width: '75%', marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ fontSize: 13, color: '#DDB937', fontWeight: 'bold' }}>Kenneth J Lendoye</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ marginTop: 0, color: '#8f92a1', marginLeft: 5, fontSize: 11 }}>Active Now</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '10%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')}>
                            <Image style={styles.search} source={require('./../image/icon/videocall.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '10%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')}>
                            <Image style={styles.search} source={require('./../image/icon/call.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '10%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('#')}>
                            <Image style={styles.search} source={require('./../image/icon/cdot.png')} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ marginTop: 20 }}></View>

                <ScrollView>
                    <FlatList
                        pagingEnabled
                        data={this.state.chat}
                        renderItem={this.renderDayRow}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>

                <View style={{ marginTop: wp('5%'), alignContent: 'center', alignItems: 'center' }}>
                    <KeyboardAvoidingView behavior="padding">

                        <View style={styles.firstInput}>
                            <TouchableOpacity style={{ width: '15%' }}>
                                <Image style={{ width: 28, height: 28, marginLeft: 10, marginTop: 5 }} source={require('./../image/icon/emoji.png')} />
                            </TouchableOpacity>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Write a comment'}
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}
                                    multiline={true}
                                />
                            </View>
                            <TouchableOpacity style={{ width: '15%' }}>
                                <Image style={{ width: 25, height: 25, marginTop: 5, alignSelf: 'center' }} source={require('./../image/icon/labelmic.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '15%' }}>
                                <Image style={{ width: 25, height: 25, marginTop: 5, alignSelf: 'center' }} source={require('./../image/icon/camera.png')} />
                            </TouchableOpacity>

                        </View>

                    </KeyboardAvoidingView>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        backgroundColor: '#7C0003',
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row'
    },
    headerText: {
        color: 'white'
    },
    userList: {
        padding: 8,
        backgroundColor: 'white',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5
    },
    country: {
        fontSize: 14
    },
    login: {
        fontSize: 11,
        color: 'gray'
    },
    profile: {
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 12,
        color: '#7c0003'
    },
    image: {
        width: 55,
        height: 55,
        marginRight: 15,
        borderRadius: 50,
        marginTop: -5
    },
    flag: {
        fontWeight: 'bold',
        width: 23,
        height: 23,
        color: 'white',
        backgroundColor: '#7C0003',
        borderRadius: 50,
        paddingLeft: 7,
        paddingTop: 1,
        marginLeft: wp('30%'),
        marginTop: wp('3%')
    },
    input: {
        width: 150,
        height: 40,
        padding: 10,
        marginBottom: 0,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 15
    },
    back: {
        width: 20,
        height: 20,
        marginBottom: wp('5%'),
        marginLeft: 20,
        marginTop: 30
    },
    firstInput: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 25,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        padding: 5,
        width: '100%'
    },
    profile: {
        width: 65,
        height: 65,
        marginTop: 0,
        marginLeft: 20,
        borderRadius: 300
    },
    search: {
        width: 30,
        height: 30,
        marginTop: 35
    },
});