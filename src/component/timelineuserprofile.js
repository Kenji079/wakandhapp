
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Dimensions, TouchableOpacity, Slider, AsyncStorage, Alert, Picker } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import ReadMore from "react-native-read-more-text";
import HTMLView from 'react-native-htmlview';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import { URL, SERVER_KEY } from './../route/base_url';
import { Audio, Video } from 'expo-av';
var radio_props = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];
const reactionIcons = [
    require("./../image/icon/emoji/strong.png"),
    require("./../image/icon/emoji/heart.gif"),
    require("./../image/icon/emoji/laugh.gif"),
    require("./../image/icon/emoji/cry.gif"),
    require("./../image/icon/emoji/angry.gif"),
    require("./../image/icon/emoji/amazed.gif"),
];
export default class timelineuserprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
            posts: [],
            uri: '',
            filename: '',
            filetype: '',
            uricreatepost: '',
            uricreatepostVideos: '',
            uricreatepostVideosname: '',
            uricreatepostAudio: '',
            uricreatepostAudioname: '',
        };
    }
    onValueChange() {
        console.log('#')
    }

    componentDidMount() {
        this.userData();
    }

    _followUser = async (id) => {

        const UID = await AsyncStorage.getItem('UID');
        const ACCESSTOKEN = await AsyncStorage.getItem('ACCESSTOKEN');
        const data = new FormData();


        // data.append('access_token', ACCESSTOKEN);
        data.append('server_key', '0976d0f8e8c113d608e5aa7d01f180a8');
        data.append('user_id', id);
        // data.append('recipient_id', id);



        const url = `http://wakhandaapi.sjhm0708.odns.fr/api/follow-user?access_token=${ACCESSTOKEN}`;
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
                this.setState({ loading: false });

                if (responseJson.follow_status == "unfollowed") {
                    alert('Un Send Friend Request');
                    return;
                }
                if (responseJson.follow_status == "followed") {
                    alert('Request Sended');
                    return;
                }

            })
    }

    userData = async () => {

        const UID = await AsyncStorage.getItem('UID');
        const ACCESSTOKEN = await AsyncStorage.getItem('ACCESSTOKEN');


        this.setState({ loading: true })
        console.log('FILE UPLOAD PROCESSING....');
        const data = new FormData();


        data.append('server_key', SERVER_KEY);
        data.append('fetch', 'posts');
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
                // console.log(responseJson.posts)
                this.setState({
                    loading: false,
                    posts: responseJson.posts
                })
                return;


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

    renderPosts = ({ item, index }) => {
        const showReactions = this.state["reaction_" + item.id];
        // console.log(item.get_post_comments);
        return (
            <View>
                <View>
                    <View style={{ padding: 20, flexDirection: "row" }}>
                        <View style={{ width: "22%" }}>

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

                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('timelineuserprofile', { item })} style={{ width: "70%", marginTop: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 7 }}>
                                {item.publisher.name}
                            </Text>
                            <Text style={{ fontSize: 13, color: "#8f92a1" }}>
                                {item.post_time}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 15, marginTop: -5 }}>
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={this._renderTruncatedFooter}
                            renderRevealedFooter={this._renderRevealedFooter}
                            onReady={this._handleTextReady}
                        >
                            <View style={{ width: 300 }}>
                                <HTMLView
                                    value={item.postText}
                                    stylesheet={styles}
                                />
                            </View>
                        </ReadMore>


                    </View>

                    {item.file_type == "image" ?
                        <Image
                            style={{ width: '100%', height: 360 }}
                            source={{ uri: item.postFile }}
                        />
                        :
                        null
                    }

                    {item.file_type == "video" ?
                        <Video
                            source={{ uri: item.postFile }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            useNativeControls
                            style={{ width: width, height: height / 3 }}
                        />
                        :
                        null
                    }


                    {/* {this.state.reaction == false ? null : ( */}
                    {showReactions != true ? null : (
                        <View
                            style={{
                                backgroundColor: "white",
                                borderRadius: 50,
                                padding: 10,
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => this.postReaction(index, 1)}
                                    style={{ width: "16.6%" }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, alignSelf: "center" }}
                                        source={require("./../image/icon/emoji/strong.png")}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.postReaction(index, 2)}
                                    style={{ width: "16.6%" }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, alignSelf: "center" }}
                                        source={require("./../image/icon/emoji/heart.gif")}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.postReaction(index, 3)}
                                    style={{ width: "16.6%" }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, alignSelf: "center" }}
                                        source={require("./../image/icon/emoji/laugh.gif")}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.postReaction(index, 4)}
                                    style={{ width: "16.6%" }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, alignSelf: "center" }}
                                        source={require("./../image/icon/emoji/cry.gif")}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.postReaction(index, 5)}
                                    style={{ width: "16.6%" }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, alignSelf: "center" }}
                                        source={require("./../image/icon/emoji/angry.gif")}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.postReaction(index, 6)}
                                    style={{ width: "16.6%" }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, alignSelf: "center" }}
                                        source={require("./../image/icon/emoji/amazed.gif")}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            padding: 10,
                            paddingLeft: 30,
                            borderTopColor: "#EAEAEA",
                            borderTopWidth: 1,
                            borderBottomColor: "#EAEAEA",
                            borderBottomWidth: 1,
                        }}
                    >
                        <TouchableOpacity
                            // onPress={() => this.setState({ reaction: true })}
                            onPress={() => this.handleHeartClick(index)}
                            style={{ width: "25%", flexDirection: "row" }}
                        >
                            <Image
                                style={{ width: 25, height: 25, alignSelf: "center" }}
                                source={
                                    item.reaction?.is_reacted
                                        ? reactionIcons[parseInt(item.reaction?.type) - 1]
                                        : require("./../image/icon/labelheart.png")
                                }
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#9B9B9B",
                                    paddingLeft: 10,
                                    paddingTop: 4,
                                    alignSelf: "center",
                                }}
                            >
                                {item?.reaction?.count || 0}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("comments", { data: item })}
                            style={{ width: "25%", flexDirection: "row" }}
                        >
                            <Image
                                style={{ width: 25, height: 25, alignSelf: "center" }}
                                source={require("./../image/icon/labelcomment.png")}
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#9B9B9B",
                                    paddingLeft: 10,
                                    paddingTop: 4,
                                    alignSelf: "center",
                                }}
                            >
                                {item.post_comments}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: "25%", flexDirection: "row" }}>
                            <Image
                                style={{ width: 25, height: 25, alignSelf: "center" }}
                                source={require("./../image/icon/labelmic.png")}
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#9B9B9B",
                                    paddingLeft: 10,
                                    paddingTop: 4,
                                    alignSelf: "center",
                                }}
                            >
                                345
                  </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: "25%", flexDirection: "row" }}>
                            <Image
                                style={{ width: 25, height: 25, alignSelf: "center" }}
                                source={require("./../image/icon/labelshare.png")}
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#9B9B9B",
                                    paddingLeft: 10,
                                    paddingTop: 4,
                                    alignSelf: "center",
                                }}
                            >
                                523
                  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: "#E0E0E0", padding: 5 }}></View>
            </View>
        );
    };

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text
                style={{ color: "#cc9900", fontWeight: "bold", marginTop: 5 }}
                onPress={handlePress}
            >
                Read more
          </Text>
        );
    };

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text
                style={{ color: "cc9900", fontWeight: "bold", marginTop: 5 }}
                onPress={handlePress}
            >
                Show less
          </Text>
        );
    };

    _handleTextReady = () => {
        // ...
    };

    handleHeartClick = (index) => {
        const allPosts = this.state.posts;
        const thisPost = allPosts[index];

        if (thisPost.reaction?.is_reacted) {
            this.postReaction(index, "")
        }
        else {
            this.setState({ ["reaction_" + thisPost.id]: true })
        }
    }

    postReaction = async (index, reaction) => {
        const allPosts = this.state.posts;
        const thisPost = allPosts[index];
        const action = thisPost.reaction?.is_reacted ? 'dislike' : 'reaction'

        this.setState({ ["reaction_" + thisPost.id]: false });
        allPosts[index] = {
            ...thisPost,
            reaction: {
                ...thisPost.reaction,
                count: thisPost.reaction?.is_reacted ? thisPost.reaction.count - 1 : thisPost.reaction.count + 1,
                is_reacted: !thisPost.reaction?.is_reacted,
                type: reaction, // will be "" for dislike
            },
        };
        this.setState({
            // reaction: false,
            posts: allPosts,
        });
        // const UID = await AsyncStorage.getItem('UID');
        const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

        // this.setState({ loading: true });
        const data = new FormData();

        data.append("server_key", SERVER_KEY);
        data.append("action", action);

        data.append("reaction", reaction);
        data.append("post_id", thisPost.post_id);

        const url = `${URL}/post-actions?access_token=${ACCESSTOKEN}`;
        fetch(url, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "multipart/form-data",
            },
            body: data,
        })
            //   .then((response) => response.json())
            .then((responseJson) => {
                console.log("reaction-response", responseJson);

                // this.setState({
                //     loading: false,
                //     posts: responseJson.data
                // })
            });
    };

    render() {
        const { navigation } = this.props
        console.warn('navigation', navigation.state.params.item)
        const user = navigation.state.params?.item
        console.log('SCHOOL: ' + user.publisher.school)
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


                            <ImageBackground source={{ uri: user?.publisher?.cover }} style={{ width: '100%', height: 200, borderRadius: 30 }} >
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    {/* <View style={{ width: '30%' }}>
                                        <Image style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 160, marginRight: 8, borderWidth: 3, borderColor: 'white', borderRadius: 300, }} source={require('./../image/icon/profileimg.png')}></Image>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>Bae</Text>
                                    </View> */}
                                    <View style={{ width: '30%' }}>
                                        <Image style={{ width: 125, height: 125, alignSelf: 'center', marginTop: 130, borderWidth: 3, borderColor: 'white', borderRadius: 300, }} source={{ uri: user?.publisher?.avatar }}></Image>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>{user?.publisher?.username}</Text>
                                    </View>
                                    {/* <View style={{ width: '30%' }}>
                                        <Image style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 160, marginLeft: 8, borderWidth: 3, borderColor: 'white', borderRadius: 300, }} source={require('./../image/icon/profileimg.png')}></Image>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#8f92a1' }}>My Best</Text>
                                    </View> */}
                                </View>
                            </ImageBackground>



                            <View style={{ padding: 30, marginTop: 100, borderTopColor: '#eaeaea', borderTopWidth: 1 }}>

                                <View style={{ flexDirection: 'row', marginTop: -30 }}>
                                    <View style={{ width: '70%', margin: 10 }}>
                                        <GradientButton
                                            style={{ marginVertical: 8., }}
                                            text="Send Friend Request"
                                            textStyle={{ fontSize: 17 }}
                                            gradientBegin="#DDB937"
                                            gradientEnd="#DDB937"
                                            gradientDirection="diagonal"
                                            height={40}
                                            width={240}
                                            radius={10}
                                            impact
                                            impactStyle='Light'
                                            onPressAction={() => this._followUser(user?.user_id)}
                                        />
                                    </View>
                                    <View style={{ width: '22%', margin: 10 }}>
                                        <TouchableOpacity>
                                            <Image style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 3 }} source={require('./../image/icon/storybutton.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {user.publisher.about == '' || user.publisher.about == 'null' || user.publisher.about == null ?
                                    null
                                    :
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ width: '10%' }}>
                                            <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                        </View>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{ alignSelf: 'center', textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>{user.publisher.about}</Text>
                                        </View>
                                    </View>
                                }

                                {user.publisher.school == '' ?
                                    null
                                    :
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ width: '10%' }}>
                                            <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                        </View>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{ alignSelf: 'center', textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>{user.school}</Text>
                                        </View>
                                    </View>
                                }

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '10%' }}>
                                        <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ alignSelf: 'center', textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>Etudes : Le droit international a Universite de Sorbon a Paris</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '10%' }}>
                                        <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ alignSelf: 'center', textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>A etudie a Universite de Sorbonne du Front</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '10%' }}>
                                        <Image style={{ width: 20, height: 20 }} source={require('./../image/icon/briefcase.png')} />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ alignSelf: 'center', textAlign: 'left', fontSize: 15, color: '#8f92a1', marginTop: 0 }}>A etudie a College Liberman - Douala Cameroon</Text>
                                    </View>
                                </View>


                            </View>

                            <FlatList
                                data={this.state.posts}
                                renderItem={this.renderPosts}
                                keyExtractor={(item) => item.id}
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