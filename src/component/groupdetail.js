
import React from 'react';
import { StyleSheet, Text, View, Image, Modal, FlatList, Dimensions, TouchableOpacity, TextInput, AsyncStorage, Alert, ImageBackground } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import ReadMore from 'react-native-read-more-text';
import HTMLView from 'react-native-htmlview';
import { URL, SERVER_KEY } from './../route/base_url';
var radio_props = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];
export default class groupdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
            Categories: [
                { id: 1, Name: 'Watch party' },
                { id: 2, Name: 'About' },
                { id: 3, Name: 'Photos' },
                { id: 4, Name: 'Posts' },
                { id: 5, Name: 'Videos' },
                { id: 6, Name: 'Events' },
            ],
            phone: '',
            Password: '',
            ischecked: false,
            group: [
                { id: 1, Image: require('./../image/ad1.jpg') },
                { id: 2, Image: require('./../image/ad2.jpg') },
                { id: 3, Image: require('./../image/ad3.jpg') },
                { id: 4, Image: require('./../image/ad4.jpg') },
                { id: 5, Image: require('./../image/ad1.jpg') },
                { id: 6, Image: require('./../image/ad2.jpg') },
                { id: 7, Image: require('./../image/ad3.jpg') },
                { id: 8, Image: require('./../image/ad4.jpg') },
                { id: 9, Image: require('./../image/ad1.jpg') },
                { id: 10, Image: require('./../image/ad2.jpg') },
            ],
            story: [
                { id: 1, Image: require('./../image/icon/g1.png') },
                { id: 2, Image: require('./../image/icon/g2.png') },
                { id: 3, Image: require('./../image/icon/g3.png') },
                { id: 4, Image: require('./../image/icon/g1.png') },
                { id: 5, Image: require('./../image/icon/g2.png') },
                { id: 6, Image: require('./../image/icon/g3.png') },
                { id: 7, Image: require('./../image/icon/g1.png') },
                { id: 8, Image: require('./../image/icon/g2.png') },
                { id: 9, Image: require('./../image/icon/g3.png') },
                { id: 10, Image: require('./../image/icon/g1.png') },
            ],
            showMe: false,
            going: '',
            name: '',
            UID: '',
            PASS: '',
            posts: [],
            reaction: false,
            height: 80,
            itemList: [],
            group_id: '',
            access_token: '',
            groupDetailList: [],
            cover: '',
            group_name: '',
            members: ''
        };
    }
    renderCategories = ({ item }) => {
        return (
            <TouchableOpacity style={{ padding: 10, paddingRight: 4, paddingLeft: 4 }}>
                <Text style={{ fontSize: 16, backgroundColor: '#c3c2c8', color: '#fff', padding: 10, borderRadius: 20 }}>
                    {item.Name}
                </Text>
            </TouchableOpacity>
        )
    }
    componentDidMount = async () => {
        let group_id = this.props.navigation.getParam('group_id');
        let cover = this.props.navigation.getParam('cover');
        let group_name = this.props.navigation.getParam('group_name');
        let members = this.props.navigation.getParam('members');
        const access_token = await AsyncStorage.getItem('ACCESSTOKEN')
        this.setState({
            group_id: group_id,
            access_token: access_token,
            cover: cover,
            group_name: group_name,
            members: members
        })
        this.getGroupDetail()
    }
    getGroupDetail = () => {
        const {
            access_token,
            group_id,

        } = this.state;
        const data = new FormData();
        data.append('server_key', SERVER_KEY);
        data.append('type', 'get_group_posts');
        data.append('id', group_id);
        // console.log("group_id", group_id, cover, group_name, members)

        const url = `${URL}/posts?access_token=` + access_token;
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
                if (responseJson.api_status == "400") {
                    alert("No Post Found !")
                    return;
                }
                if (responseJson.api_status == "200") {
                    this.setState({ groupDetailList: responseJson.data })
                    return;
                }
            })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#cc9900', fontWeight: 'bold', marginTop: 5 }} onPress={handlePress}>
                Read more
          </Text>
        );
    }
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: 'cc9900', fontWeight: 'bold', marginTop: 5 }} onPress={handlePress}>
                Show less
          </Text>
        );
    }
    _handleTextReady = () => {
        // ...
    }
    renderPosts = ({ item }) => {
        return (
            <View>
                <View>
                    <View style={{ padding: 20, flexDirection: 'row' }}>
                        <View style={{ width: '22%' }}>
                            {item.publisher.verified == 0 ?
                                <Image
                                    style={{ width: 55, height: 55, borderRadius: 500, }}
                                    source={{ uri: item.publisher.avatar }}
                                />
                                :
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 55, height: 55, borderRadius: 500, borderWidth: 2, borderColor: '#199DE9' }}
                                        source={{ uri: item.publisher.avatar }}
                                    />
                                    <Image
                                        style={{ width: 20, height: 20, marginTop: 30, marginLeft: -10 }}
                                        source={require('./../image/icon/correct.png')}
                                    />
                                </View>
                            }
                            {/* <Image style={{ width: 55, height: 55, borderRadius: 500 }} source={{ uri: item.publisher.avatar }} /> */}
                        </View>
                        <View style={{ width: '70%', marginTop: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 7 }}>{item.publisher.name}</Text>
                            <Text style={{ fontSize: 13, color: '#8f92a1' }}>{item.post_time}</Text>
                        </View>
                    </View>

                    <View style={{ margin: 15, marginTop: -5 }}>
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={this._renderTruncatedFooter}
                            renderRevealedFooter={this._renderRevealedFooter}
                            onReady={this._handleTextReady}>

                            <View style={{ width: 300 }}>
                                <HTMLView
                                    value={item.postText}
                                    stylesheet={styles}
                                />
                            </View>

                        </ReadMore>
                    </View>


                    {item.postFile == "" ?
                        null
                        :
                        <Image style={{ width: '100%', height: 360 }} source={{ uri: item.postFile }} />
                    }

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
            </View>
        )
    }

    render() {
        const { ischecked } = this.props
        const {
            cover,
            group_name,
            members
        } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: wp('0%'), padding: 30, paddingBottom: 0 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: '10%', marginTop: 6 }} onPress={() => this.props.navigation.goBack(null)}>
                                <Image style={styles.back} source={require('./../image/icon/back.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ImageBackground source={{ uri: cover }} style={{ width: '100%', height: 200, borderRadius: 30, marginTop: -20 }} >
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <View style={{ width: '25%' }}>
                                <Image style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 160, marginRight: -70, borderWidth: 2, borderColor: 'white', borderRadius: 300, }} source={require('./../image/icon/1.jpeg')}></Image>
                                {/* <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>Bae</Text> */}
                            </View>
                            <View style={{ width: '25%' }}>
                                <Image style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 160, marginRight: -20, borderWidth: 2, borderColor: 'white', borderRadius: 300, }} source={require('./../image/icon/2.jpeg')}></Image>
                                {/* <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>Himmi pant</Text> */}
                            </View>
                            <View style={{ width: '25%' }}>
                                <Image style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 160, marginLeft: -30, borderWidth: 2, borderColor: 'white', borderRadius: 300, }} source={require('./../image/ad2.jpg')}></Image>
                                {/* <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>My Best</Text> */}

                            </View>
                            <View style={{ width: '25%' }}>
                                <Image style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 160, marginLeft: -80, borderWidth: 2, borderColor: 'white', borderRadius: 300, }} source={require('./../image/ad2.jpg')}></Image>
                                {/* <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>My Best</Text> */}

                            </View>
                        </View>
                    </ImageBackground>
                    <View style={{ padding: 20, marginTop: 35 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000000', alignSelf: 'center' }}>{group_name}</Text>
                        <Text style={{ fontSize: 15, color: '#8f92a1', marginTop: 5, alignSelf: 'center' }}>Private group. {members} Member</Text>
                        <View style={{ width: '100%' }}>
                            <GradientButton
                                style={{ marginTop: 20, marginLeft: 10, alignSelf: 'center' }}
                                text="+Invite"
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
                        </View>
                    </View>
                    <View style={{ paddingLeft: 10, marginTop: 10, paddingBottom: 10, borderBottomColor: '#f3f3f3', borderBottomWidth: 1 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            <FlatList
                                pagingEnabled
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={this.state.Categories}
                                renderItem={this.renderCategories}
                                keyExtractor={item => item.id}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.container}>
                        <View style={{ marginTop: wp('10%') }}>
                            <FlatList
                                data={this.state.groupDetailList}
                                renderItem={this.renderPosts}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    logo: {
        width: 80,
        height: 35,
        marginBottom: wp('10%'),
        marginTop: 5
    },
    back: {
        width: 20,
        height: 20,
        marginBottom: wp('10%')
    },

    block1: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        marginTop: -70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    search: {
        width: 40,
        height: 40,
        marginBottom: wp('10%')
    },
    create: {
        width: 110,
        height: 45,
        marginBottom: wp('10%')
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 7,
        marginTop: 3
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
        marginTop: 0,
        marginHorizontal: 10,
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
        height: 30,
        marginBottom: 0,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
        marginTop: 19
    },
    logo: {
        width: 110,
        height: 35,
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