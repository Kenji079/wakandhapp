
// import React from 'react';
// import { StyleSheet, Text, View, Image, KeyboardAvoidingView, CheckBox, Dimensions, TouchableOpacity, FlatList, AsyncStorage, Alert, Picker } from 'react-native';
// const { width: WIDTH } = Dimensions.get('window')
// // import { CheckBox } from 'react-native-elements'
// import { ScrollView } from 'react-native-gesture-handler';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import GradientButton from 'react-native-gradient-buttons';
// import * as Facebook from 'expo-facebook';
// import * as Google from 'expo-google-app-auth';
// import * as AppAuth from 'expo-app-auth';
// var radio_props = [
//     { value: 'Public', label: 'Public' },
//     { value: 'Private', label: 'Private' },
// ];
// export default class chatlist extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             phone: '',
//             Password: '',
//             chat: [
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//                 { id: 1 },
//             ]
//         };
//     }

//     renderChat = ({ item }) => {
//         return (
//             <TouchableOpacity onPress={()=> this.props.navigation.navigate('conversation')} style={{ marginTop: wp('7%'), alignContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15, borderBottomColor:'#EAEAEA', borderBottomWidth:1, paddingBottom:10 }}>

//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ width: '25%' }}>
//                         <Image style={styles.profile} source={require('./../image/icon/1.jpeg')} />
//                     </View>
//                     <View style={{ width: '60%', marginLeft: 10, }}>
//                         <Text style={{ fontSize: 15, color:'#DDB937', fontWeight:'bold' }}>Kenneth J Lendoye</Text>
//                         <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: -5 }}>
//                             <View style={{ width: '100%' }}>
//                                 <Text style={{ marginTop: 0, color: '#8f92a1', marginLeft: 5 }}>Lorem ipsum dolor</Text>
//                             </View>
//                         </View>
//                     </View>
//                     <View style={{ width: '20%' }}>
//                         <Text style={{ fontSize: 12, marginTop:25 }}>18:12 PM</Text>
//                     </View>
//                 </View>

//             </TouchableOpacity>
//         )
//     }

//     render() {
//         const { ischecked } = this.props
//         return (
//             <View style={styles.container}>

//                 <View style={{ marginTop: wp('10%') }}>
//                     <ScrollView showsVerticalScrollIndicator={false}>

//                     <View style={{ flexDirection: 'row', padding: 30 }}>
//                             <View style={{ width: '50%' }}>
//                                 <Text style={{fontSize:30, fontWeight:"bold"}}>Chat</Text>
//                             </View>
//                             <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
//                                 <TouchableOpacity onPress={() => this.props.navigation.navigate('creategroup')}>
//                                     <Image style={styles.search} source={require('./../image/icon/plus.png')} />
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
//                                 <TouchableOpacity>
//                                     <Image style={styles.search} source={require('./../image/icon/setting.png')} />
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
//                                 <TouchableOpacity>
//                                     <Image style={styles.search} source={require('./../image/icon/search.png')} />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <View style={{ flexDirection: 'row', padding: 20, marginTop: -40, paddingBottom: 0, marginBottom: 20, borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }}>

//                             <TouchableOpacity style={{ width: '33%' }}>
//                                 <Text style={{ alignSelf:'center', fontSize: 17, marginTop: 0, fontWeight: 'bold', paddingBottom: 10, color: '#DDB937' }}>CHATS</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={{ width: '33%' }}>
//                                 <Text style={{ alignSelf:'center', fontSize: 17, marginTop: 0, paddingBottom: 10, color: '#999999' }}>WAK'S</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={{ width: '33%' }}>
//                                 <Text style={{ alignSelf:'center', fontSize: 17, marginTop: 0, paddingBottom: 10, color: '#999999' }}>CALLS</Text>
//                             </TouchableOpacity>

//                         </View>


//                         <FlatList
//                             data={this.state.chat}
//                             renderItem={this.renderChat}
//                             keyExtractor={item => item.id}
//                         />



//                     </ScrollView>
//                 </View>


//             </View >
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//     },
//     logo: {
//         width: 180,
//         height: 20,
//         marginBottom: wp('10%'),
//         marginTop: 12
//     },
//     imgpicker: {
//         width: 290,
//         height: 130,
//         alignSelf: 'center',
//         marginTop: 20
//     },
//     search: {
//         width: 40,
//         height: 40,
//         marginBottom: wp('10%')
//     },
//     back: {
//         width: 30,
//         height: 30,
//         marginBottom: wp('5%'),
//         marginLeft: 20,
//         marginTop: 10
//     },
//     icon: {
//         width: 40,
//         height: 40,
//         marginBottom: wp('10%'),
//         margin: 10
//     },
//     block: {
//         margin: 5,
//         backgroundColor: 'white',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.27,
//         shadowRadius: 4.65,

//         elevation: 6,
//         borderRadius: 10,
//         padding: 10
//     },
//     profile: {
//         width: 65,
//         height: 65,
//         marginTop: 0,
//         marginLeft:20,
//         borderRadius:300
//     },
//     dot: {
//         width: 25,
//         height: 10,
//         marginTop: wp('2%'),
//         marginLeft: 5
//     },
//     commentimg: {
//         width: 30,
//         height: 30,
//         // marginBottom: wp('10%')
//     },
//     logintext: {
//         width: 300,
//         height: 130,
//         marginBottom: wp('10%'),
//         marginTop: wp('10%'),
//     },
//     headerText: {
//         fontSize: 30,
//         color: 'white',
//         alignSelf: 'center',
//     },
//     button: {
//         marginTop: hp('3%'),
//         alignItems: 'center',
//         backgroundColor: '#E0C800',
//         borderRadius: wp('2%'),
//         height: 40,
//         marginHorizontal: wp('13%'),
//     },
//     buttonText: {

//         fontSize: 20,
//         color: '#000',
//         marginTop: hp('1%'),
//     },
//     signupView: {
//         alignItems: 'center',
//         marginTop: hp('35%')
//     },
//     alresdy: {
//         fontSize: hp('2.5%'),
//         color: '#666666'
//     },
//     signupText: {
//         fontSize: hp('2.5%'),
//         marginTop: hp('1%'),
//         color: '#00cb9c',
//         fontWeight: 'bold'
//     },
//     firstInput: {
//         flexDirection: 'row',
//         marginTop: 10,
//         marginHorizontal: 25,
//         backgroundColor: '#f4f4f4',
//         borderRadius: 10,
//         padding: 5
//     },
//     firstInput1: {
//         flexDirection: 'row',
//         marginTop: 10,
//         marginHorizontal: 25,
//         backgroundColor: '#f4f4f4',
//         borderRadius: 10,
//         padding: 5
//     },
//     secondInput: {
//         flexDirection: 'row',
//         marginBottom: 30,
//         marginTop: 40,
//         borderBottomColor: '#EAEAEAEA',
//         borderBottomWidth: 1,
//         marginHorizontal: 25
//     },
//     checkboxcontainer: {
//         flexDirection: "row",
//         marginTop: wp('5%'),
//         marginLeft: wp('5%')
//     },
//     checkbox: {
//         alignSelf: "center",
//     },
//     input: {
//         width: WIDTH - 85,
//         height: 40,
//         padding: 10,
//         marginBottom: 0,
//         backgroundColor: 'transparent',
//         color: 'black',
//         fontSize: 15
//     },
//     input1: {
//         width: WIDTH - 85,
//         height: 120,
//         padding: 10,
//         marginBottom: 0,
//         backgroundColor: 'transparent',
//         color: 'black',
//         fontSize: 15
//     },
// });




import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { StreamApp, FlatFeed, Activity, LikeButton, AggregatedFeed, ReactionIcon, StatusUpdateForm } from 'expo-activity-feed';
// import {
//   SinglePost,
//   CommentBox,
//   BackButton,
//   CommentList,
//   CommentItem,
//   LikeList
// } from "expo-activity-feed";
// import ReplyIcon from "./images/icons/reply.png";

const CustomActivity = (props) => {
  { console.log("Props Data :- ", props.activity," feedgroup :- ",props.feedGroup) }
  return <Activity {...props}
  
    // Header={
    //   <View>
    //   </View>
    // }
    Footer={
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <LikeButton reactionKind="heart" {...props} />

        <ReactionIcon
          icon={ReplyIcon}
          labelSingle="comment"
          labelPlural="comments"
          counts={props.activity.reaction_counts}
          kind="comment"
        /> */}
      </View>
    }


  // Footer={<LikeButton {...props} />}
  />;
};

const App = (props) => {
  const [token, setToken] = useState(null);
  const [user_id, setUserId] = useState();
  useEffect(() => {
    callApi();
  }, [])
  async function callApi() {
    const url = `https://wakandakeys.herokuapp.com/stream/connectStream`;
    console.log("Url :- ", url);
    fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setToken(responseJson.token);
        console.log("Response :- ", responseJson.token);
      })
  }
  return (

    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
      {console.log("Fetch Token :- ", token)}
      {token &&
        <StreamApp
          apiKey='sjhjfzrbedur' appId='1146629'
          token={token}
          defaultUserData={{
            name: "Batman",
            url: "batsignal.com",
            desc: "Smart, violent and brutally tough solutions to crime.",
            profileImage:
              "https://i.kinja-img.com/gawker-media/image/upload/s--PUQWGzrn--/c_scale,f_auto,fl_progressive,q_80,w_800/yktaqmkm7ninzswgkirs.jpg",
            coverImage:
              "https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1"
          }}
        >
          <FlatFeed Activity={CustomActivity} />
          {/* <SinglePost
          activity={props.activity}
          feedGroup={props.feedGroup}
          userId={props.userId}
          options={{ withOwnChildren: true }}
          navigation={this.props.navigation}
          Activity={props => (
            <React.Fragment>
              <Activity
                {...props}
                Footer={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <LikeButton reactionKind="heart" {...props} />

                    <ReactionIcon
                      icon={ReplyIcon}
                      labelSingle="comment"
                      labelPlural="comments"
                      counts={props.activity.reaction_counts}
                      kind="comment"
                    />
                  </View>
                }
              />
              <View style={styles.likesContainer}>
                <LikeList activityId={props.activity.id} reactionKind="heart" />
              </View>
              <RepostList activityId={props.activity.id} />
              <CommentList
                activityId={props.activity.id}
                infiniteScroll
                reverseOrder
                CommentItem={({ comment }) => (
                  <React.Fragment>
                    <CommentItem
                      comment={comment}
                      Footer={<LikeButton reaction={comment} {...props} />}
                    />
                  </React.Fragment>
                )}
              />

              <View style={styles.sectionHeader} />
            </React.Fragment>
          )}
          Footer={props => (
            <CommentBox
              activity={activity}
              onAddReaction={props.onAddReaction}
              // avatarProps={{
              //   source: (userData: UserResponse) => userData.data.profileImage
              // }}
              styles={{ container: { height: 78 } }}
            />
          )}
        /> */}
          <StatusUpdateForm feedGroup='timeline' />

        </StreamApp>
      }
    </SafeAreaView>

  );
};

export default App;
