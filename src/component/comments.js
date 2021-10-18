import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  CheckBox,
  Dimensions,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Alert,
  Picker,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { URL, SERVER_KEY } from './../route/base_url';
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import GradientButton from "react-native-gradient-buttons";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as AppAuth from "expo-app-auth";
var radio_props = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
export default class comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      Password: "",
      ischecked: false,
      height: 40,
      loading: false,
      post_comments: [],
      showDeleteButton: false,
      edit_comment: false,
      edit_replycomment: false,
      edit_commentID: "",
      reply: "",
      comment_id: "",
      replyComment: "",
      repliesOnComments: [],
      edit_replyID: "",
      showAllReplies: false,
      tempObj: "",
    };
  }
  componentDidMount = async () => {

    this.getPostComments();
  };

  _editComment = async () => {
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "edit");
    data.append("comment_id", this.state.edit_commentID);
    data.append("text", this.state.name);

    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ loading: false, edit_comment: false, name: false });

        if (responseJson.api_status == "400") {
          alert("Incorrect Username Or Password");
          return;
        }
        if (responseJson.api_status == "200") {
          this.getPostComments();
          return;
        }
      });
  };

  _likeComment = async (item) => {
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "comment_like");
    data.append("comment_id", item.id);

    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ loading: false });

        if (responseJson.api_status == "400") {
          alert("Incorrect Username Or Password");
          return;
        }
        if (responseJson.api_status == "200") {
          this.getPostComments();
          return;
        }
      });
  };

  _disLikeComment = async (item) => {
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "comment_dislike");
    data.append("comment_id", item.id);

    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ loading: false });

        if (responseJson.api_status == "400") {
          alert("Incorrect Username Or Password");
          return;
        }
        if (responseJson.api_status == "200") {
          this.getPostComments();
          return;
        }
      });
  };

  getPostComments = async () => {
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE COMMENTS PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "fetch_comments");
    data.append("post_id", this.props.navigation.state.params.data.post_id);

    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("postcomments", responseJson);
        this.setState({
          loading: false,
          post_comments: responseJson.data,
        });
      });
  };

  getPostCommentReplies = async (item) => {
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "fetch_comments_reply");
    data.append("comment_id", item.id);

    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("postcomments", responseJson);
        this.setState({
          loading: false,
          repliesOnComments: responseJson.data,
          reply: false,
        });
      });
  };

  updateSize = (height) => {
    this.setState({
      height,
    });
  };

  _delete = async (item) => {
    console.log("item", item);
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "delete");
    data.append("comment_id", item.id);

    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ loading: false });

        if (responseJson.api_status == "400") {
          alert("Incorrect Username Or Password");
          return;
        }
        if (responseJson.api_status == "200") {
          this.getPostComments();
          return;
        }
      });
  };

  _deleteReplyComment = async (item) => {
    console.log("item", item);
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "delete_reply");
    data.append("reply_id", item.id);

    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ loading: false, reply: false });

        if (responseJson.api_status == "400") {
          alert("Incorrect Username Or Password");
          return;
        }
        if (responseJson.api_status == "200") {
          this.getPostCommentReplies(item);
          return;
        }
      });
  };

  _onPost = async () => {
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");
    const { name } = this.state;

    if (name == "") {
      alert("Please Enter Comment to Proceed");
      return;
    } else {
      this.setState({ loading: true });
      console.log("FILE UPLOAD PROCESSING....");
      const data = new FormData();

      data.append("server_key", SERVER_KEY);
      data.append("type", "create");
      data.append("text", name);
      data.append("post_id", this.props.navigation.state.params.data.post_id);

      const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
      fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "multipart/form-data",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({ loading: false, name: false });

          if (responseJson.api_status == "400") {
            alert("Incorrect Username Or Password");
            return;
          }
          if (responseJson.api_status == "200") {
            this.getPostComments();
            return;
          }
        });
    }
  };

  _editReplyComment = async () => {
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true });
    console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "edit_reply");
    data.append("reply_id", this.state.edit_replyID);
    data.append("text", this.state.replyComment);
    const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loading: false,
          reply: false,
          replyComment: "",
          edit_replycomment: false,
        });

        if (responseJson.api_status == "400") {
          alert("Incorrect Username Or Password");
          return;
        }
        if (responseJson.api_status == "200") {
          this.getPostCommentReplies(this.state.tempObj);
          return;
        }
      });
  };

  _onReply = async (item) => {
    console.log("item", item);
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");
    const { replyComment } = this.state;

    if (replyComment == "") {
      alert("Please Enter Comment to Proceed");
      return;
    } else {
      this.setState({ loading: true });
      console.log("FILE UPLOAD PROCESSING....");
      const data = new FormData();

      data.append("server_key", SERVER_KEY);
      data.append("type", "create_reply");
      data.append("text", replyComment);
      data.append("comment_id", item.id);

      const url = `${URL}/comments?access_token=${ACCESSTOKEN}`;
      fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "multipart/form-data",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({ loading: false, reply: false });

          if (responseJson.api_status == "400") {
            alert("Incorrect Username Or Password");
            return;
          }
          if (responseJson.api_status == "200") {
            this.getPostCommentReplies(item);
            return;
          }
        });
    }
  };

  render() {
    const { ischecked } = this.props;
    return (
      <View style={styles.container}>


        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp(5) }}
        >
          <View style={{ marginTop: wp("5%"), padding: 30 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ width: "10%", marginTop: 6 }}
                onPress={() => this.props.navigation.goBack(null)}
              >
                <Image
                  style={styles.back}
                  source={require("./../image/icon/back.png")}
                />
              </TouchableOpacity>
              <View style={{ width: "45%", marginLeft: 10, marginRight: 10 }}>
                <View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 0 }}
                  >
                    Comments
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              {this.state.post_comments.map((i) => {
                return (
                  <TouchableOpacity
                    style={{ marginTop: 25 }}
                    onPress={() => {
                      Alert.alert(
                        "Warning!",
                        "Do you want to Delete this comment?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                            onPress: () => console.log("Ask me later pressed"),
                          },
                          {
                            text: "Edit",
                            onPress: () =>
                              this.setState({
                                edit_comment: true,
                                name: i.text,
                                edit_commentID: i.id,
                              }),
                          },
                          { text: "Delete", onPress: () => this._delete(i) },

                        ]
                      );
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        backgroundColor: "#EAEAEA",
                        padding: 10,
                        borderRadius: 10,
                      }}

                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "80%" }}>
                          <TouchableOpacity>
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                marginTop: -40,
                                borderWidth: 1,
                                borderColor: "#DDB937",
                                borderRadius: 500,
                              }}
                              source={{ uri: `${i.publisher.avatar}` }}
                            />
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          style={{
                            width: "20%",
                            flexDirection: "row",
                            backgroundColor: "#434248",
                            marginTop: -20,
                            height: 26,
                            borderRadius: 15,
                            padding: 5,
                            borderWidth: 1,
                            borderColor: "red",
                            zIndex: 100,
                          }}
                          onPress={async () => {
                            await this.getPostCommentReplies(i);
                          }}
                        >
                          <Image
                            style={{ width: 15, height: 15 }}
                            source={require("./../image/icon/emoji/strong.png")}
                          />
                          <Text
                            style={{
                              color: "white",
                              fontSize: 12,
                              marginLeft: 5,
                            }}
                          >
                            {i.replies_count}
                          </Text>
                        </TouchableOpacity>

                      </View>

                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        {i.publisher.name}
                      </Text>
                      <Text style={{ marginTop: 10 }}>{i.text}</Text>
                    </View>

                    <View style={{ flexDirection: "row", padding: 10 }}>
                      <View style={{ width: "40%" }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#9B9B9B",
                            paddingLeft: 10,
                            paddingTop: 4,
                            fontWeight: "bold",
                            marginBottom: 30
                          }}
                        >
                          {/* {moment(i.lastseen_unix_time).fromNow()} */}
                          {/* {moment(Number(i.lastseen_unix_time)).startOf("hour").fromNow()} */}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          if (i.is_comment_liked === true) {
                            this._disLikeComment(i);
                          } else {
                            this._likeComment(i);
                          }
                        }}
                        style={{ width: "20%" }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color:
                              i.is_comment_liked === false ? "#9B9B9B" : "blue",
                            paddingLeft: 10,
                            paddingTop: 4,
                            fontWeight: "bold",
                          }}
                        >
                          {i.is_comment_liked === false ? "Like" : "Liked"}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ width: "20%" }}
                        onPress={async () =>
                          await this.setState({
                            reply: true,
                            comment_id: i.id,
                          })
                        }
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#9B9B9B",
                            paddingLeft: 10,
                            paddingTop: 4,
                            fontWeight: "bold",
                          }}
                        >
                          Reply
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {this.state.reply === true ? (
                      i.id === this.state.comment_id ? (
                        <View
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {this.state.repliesOnComments.length !== 0
                            ? this.state.repliesOnComments.map((j) => {
                              return (
                                <TouchableOpacity
                                  style={{ marginTop: 25 }}
                                  onPress={() => {
                                    Alert.alert(
                                      "Warning!",
                                      "Do you want to Delete this comment?",
                                      [
                                        {
                                          text: "Cancel",
                                          style: "cancel",
                                          onPress: () =>
                                            console.log(
                                              "Ask me later pressed"
                                            ),
                                        },
                                        {
                                          text: "Edit",
                                          onPress: () =>
                                            this.setState({
                                              edit_replycomment: true,
                                              replyComment: j.text,
                                              edit_replyID: j.id,
                                              tempObj: j,
                                            }),
                                        },
                                        {
                                          text: "Delete",
                                          onPress: () =>
                                            this._deleteReplyComment(j),
                                        },
                                      ]
                                    );
                                  }}
                                >
                                  <View
                                    style={{
                                      width: "90%",
                                      backgroundColor: "#EAEAEA",
                                      padding: 10,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <View style={{ flexDirection: "row" }}>
                                      <View style={{ width: "80%" }}>
                                        <Image
                                          style={{
                                            width: 50,
                                            height: 50,
                                            marginTop: -40,
                                            borderWidth: 1,
                                            borderColor: "#DDB937",
                                            borderRadius: 500,
                                          }}
                                          source={{
                                            uri: `${j.publisher.avatar}`,
                                          }}
                                        />
                                      </View>
                                      <TouchableOpacity
                                        style={{
                                          width: "20%",
                                          flexDirection: "row",
                                          backgroundColor: "#434248",
                                          marginTop: -20,
                                          height: 26,
                                          borderRadius: 15,
                                          padding: 5,
                                          borderWidth: 1,
                                          borderColor: "red",
                                          zIndex: 100,
                                        }}
                                        onPress={async () => {
                                          this.setState({
                                            reply: true,
                                          });
                                          await this.getPostCommentReplies(j);
                                        }}
                                      >
                                        <Image
                                          style={{ width: 15, height: 15 }}
                                          source={require("./../image/icon/emoji/strong.png")}
                                        />
                                        <Text
                                          style={{
                                            color: "white",
                                            fontSize: 12,
                                            marginLeft: 5,
                                          }}
                                        >
                                          {j.replies_count}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                    <Text
                                      style={{
                                        marginTop: 10,
                                        fontWeight: "bold",
                                        fontSize: 15,
                                      }}
                                    >
                                      {j.publisher.username}
                                    </Text>
                                    <Text style={{ marginTop: 10 }}>
                                      {j.text}
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      flexDirection: "row",
                                      padding: 10,
                                    }}
                                  >
                                    <View style={{ width: "20%" }}>
                                      <Text
                                        style={{
                                          fontSize: 13,
                                          color: "#9B9B9B",
                                          paddingLeft: 10,
                                          paddingTop: 4,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {moment(Number(j.time))
                                          .startOf("hour")
                                          .fromNow()}
                                      </Text>
                                    </View>

                                    <TouchableOpacity
                                      onPress={() => {
                                        if (j.is_comment_liked === true) {
                                          this._disLikeComment(j);
                                        } else {
                                          this._likeComment(j);
                                        }
                                      }}
                                      style={{ width: "20%" }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 13,
                                          color:
                                            j.is_comment_liked === false
                                              ? "#9B9B9B"
                                              : "blue",
                                          paddingLeft: 10,
                                          paddingTop: 4,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {j.is_comment_liked === false
                                          ? "Like"
                                          : "Liked"}
                                      </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      style={{ width: "20%" }}
                                      onPress={async () =>
                                        await this.setState({
                                          reply: true,
                                          comment_id: j.id,
                                        })
                                      }
                                    >
                                      <Text
                                        style={{
                                          fontSize: 13,
                                          color: "#9B9B9B",
                                          paddingLeft: 10,
                                          paddingTop: 4,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Reply
                                        </Text>
                                    </TouchableOpacity>
                                  </View>
                                </TouchableOpacity>
                              );
                            })
                            : null}
                          <KeyboardAvoidingView behavior="padding">
                            <View style={styles.firstInput}>
                              <TouchableOpacity style={{ width: "15%" }}>
                                <Image
                                  style={{
                                    width: 28,
                                    height: 28,
                                    marginLeft: 10,
                                    marginTop: 5,
                                  }}
                                  source={require("./../image/icon/emoji.png")}
                                />
                              </TouchableOpacity>
                              <View style={{ width: "50%" }}>
                                <TextInput
                                  style={styles.input}
                                  placeholder={"Reply to comment"}
                                  value={this.state.replyComment}
                                  onChangeText={(replyComment) =>
                                    this.setState({
                                      replyComment,
                                    })
                                  }
                                  multiline={true}
                                  onContentSizeChange={(e) =>
                                    this.updateSize(
                                      e.nativeEvent.contentSize.height
                                    )
                                  }
                                />
                              </View>
                              <TouchableOpacity style={{ width: "8%" }}>
                                <Image
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginTop: 15,
                                    alignSelf: "center",
                                  }}
                                  source={require("./../image/icon/labelmic.png")}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity style={{ width: "8%" }}>
                                <Image
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginTop: 15,
                                    alignSelf: "center",
                                  }}
                                  source={require("./../image/icon/camera.png")}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  width: "10%",
                                  // backgroundColor: "lightblue",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onPress={() => {
                                  if (this.state.edit_replycomment !== true) {
                                    this._onReply(i);
                                  } else {
                                    this._editReplyComment();
                                  }
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: "blue",
                                  }}
                                >
                                  {this.state.edit_replycomment !== true
                                    ? "Reply"
                                    : "Update"}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </KeyboardAvoidingView>
                          <View style={{ height: "2%" }}></View>
                        </View>
                      ) : null
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>




        {this.state.reply !== true ? (
          <View
            style={{
              position: "absolute",
              bottom: 10,
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.firstInput}>
                <TouchableOpacity style={{ width: "15%" }}>
                  <Image
                    style={{
                      width: 28,
                      height: 28,
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                    source={require("./../image/icon/emoji.png")}
                  />
                </TouchableOpacity>
                <View style={{ width: "45%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Write a comment"}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    multiline={true}
                    onContentSizeChange={(e) =>
                      this.updateSize(e.nativeEvent.contentSize.height)
                    }
                  />
                </View>
                <TouchableOpacity style={{ width: "8%" }}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 15,
                      alignSelf: "center",
                    }}
                    source={require("./../image/icon/labelmic.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "8%" }}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 15,
                      alignSelf: "center",
                    }}
                    source={require("./../image/icon/camera.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "15%",
                    // backgroundColor: "lightblue",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    if (this.state.edit_comment !== true) {
                      this._onPost();
                    } else {
                      this._editComment();
                    }
                  }}
                >
                  {/* <Image style={{ width: 25, height: 25, marginTop: 5, alignSelf: 'center' }} source={require('./../image/icon/camera.png')} /> */}
                  <Text
                    style={{
                      fontSize: 12,
                      margin: 10,
                      color: "blue",
                    }}
                  >
                    {this.state.edit_comment !== true ? "Post" : "Update"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        ) : null}
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
    width: 160,
    height: 35,
    marginBottom: wp("10%"),
    marginTop: 5,
  },
  imgpicker: {
    width: 290,
    height: 130,
    alignSelf: "center",
    marginTop: 20,
  },
  search: {
    width: 40,
    height: 40,
    marginBottom: wp("10%"),
  },
  back: {
    width: 20,
    height: 20,
    marginBottom: wp("10%"),
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: wp("10%"),
    margin: 10,
  },
  block: {
    margin: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 10,
    padding: 10,
  },
  profile: {
    width: 70,
    height: 70,
    marginBottom: wp("10%"),
  },
  dot: {
    width: 25,
    height: 10,
    marginTop: wp("2%"),
    marginLeft: 5,
  },
  commentimg: {
    width: 30,
    height: 30,
    // marginBottom: wp('10%')
  },
  logintext: {
    width: 300,
    height: 130,
    marginBottom: wp("10%"),
    marginTop: wp("10%"),
  },
  headerText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  button: {
    marginTop: hp("3%"),
    alignItems: "center",
    backgroundColor: "#E0C800",
    borderRadius: wp("2%"),
    height: 40,
    marginHorizontal: wp("13%"),
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
    marginTop: hp("1%"),
  },
  signupView: {
    alignItems: "center",
    marginTop: hp("35%"),
  },
  alresdy: {
    fontSize: hp("2.5%"),
    color: "#666666",
  },
  signupText: {
    fontSize: hp("2.5%"),
    marginTop: hp("1%"),
    color: "#00cb9c",
    fontWeight: "bold",
  },
  firstInput: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 5,
    width: "100%",
  },
  secondInput: {
    flexDirection: "row",
    marginBottom: 30,
    marginTop: 40,
    borderBottomColor: "#EAEAEAEA",
    borderBottomWidth: 1,
    marginHorizontal: 25,
  },
  checkboxcontainer: {
    flexDirection: "row",
    marginTop: wp("5%"),
    marginLeft: wp("5%"),
  },
  checkbox: {
    alignSelf: "center",
  },
  input: {
    width: 150,
    padding: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: "black",
    fontSize: 15,
  },
});
