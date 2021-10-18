import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  CheckBox,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground,
  Slider,
} from "react-native";
const { width, height } = Dimensions.get('window');
import { ScrollView } from "react-native-gesture-handler";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GetSocialUI, InvitesView } from "getsocial-react-native-sdk";
import GradientButton from "react-native-gradient-buttons";
import moment from "moment";
import ReadMore from "react-native-read-more-text";
import HTMLView from 'react-native-htmlview';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import { Audio, Video } from 'expo-av';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import SoundPlayer from 'react-native-sound-player'
import { URL, SERVER_KEY } from './../route/base_url';

var radio_props = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
const reactionIcons = [
  require("./../image/icon/emoji/strong.png"),
  require("./../image/icon/emoji/heart.gif"),
  require("./../image/icon/emoji/laugh.gif"),
  require("./../image/icon/emoji/cry.gif"),
  require("./../image/icon/emoji/angry.gif"),
  require("./../image/icon/emoji/amazed.gif"),
];
class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_RECORD_BUTTON = new Icon(require('../../assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('../../assets/images/record_icon.png'), 20, 14);

const ICON_PLAY_BUTTON = new Icon(require('./../image/icon/play-button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('./../image/icon/pause.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('./../image/icon/stop-button.png'), 22, 22);

const ICON_MUTED_BUTTON = new Icon(require('../../assets/images/muted_button.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new Icon(require('../../assets/images/unmuted_button.png'), 67, 58);

const ICON_TRACK_1 = new Icon(require('../../assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('../../assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('../../assets/images/thumb_2.png'), 15, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      phone: "",
      Password: "",
      ischecked: false,
      pages: [],
      group: [],
      story: [
        { id: 1, Image: require("./../image/icon/g1.png") },
        { id: 2, Image: require("./../image/icon/g2.png") },
        { id: 3, Image: require("./../image/icon/g3.png") },
        { id: 4, Image: require("./../image/icon/g1.png") },
        { id: 5, Image: require("./../image/icon/g2.png") },
        { id: 6, Image: require("./../image/icon/g3.png") },
        { id: 7, Image: require("./../image/icon/g1.png") },
        { id: 8, Image: require("./../image/icon/g2.png") },
        { id: 9, Image: require("./../image/icon/g3.png") },
        { id: 10, Image: require("./../image/icon/g1.png") },
      ],
      background: [
        { id: 3, Image: 'https://wakandha.com/upload/photos/2021/09/dlhHrLWhkfeIvme5FAbN_02_156a5a2b77e498c06218eec6735e1365_image.jpg' },
        { id: 4, Image: 'https://wakandha.com/upload/photos/2021/09/L4P3Uv3UCrEGoh1HIBOH_02_bafdd3023a8187fe975905e5cb3fcdbe_image.jpg' },
        { id: 5, Image: 'https://wakandha.com/upload/photos/2021/09/YjYRbqpFZFRCKo4sqmq4_02_763341c216f9a80a18580bf1bf8b3c88_image.jpg' },
        { id: 6, Image: 'https://wakandha.com/upload/photos/2021/09/nPjqU26eTCybmvWRGNNu_02_66af23170b2a5b5b36a11b9bbfa4d771_image.jpg' },
        { id: 7, Image: 'https://wakandha.com/upload/photos/2021/09/Z5ylAifK7OOnUc5RG1ct_02_64f93997a9af28678f01d4df1760dda0_image.jpg' },
      ],
      BG: 'https://color-hex.org/colors/ddb937.png',
      BGG: [],
      BGID: '',
      BG2: '',
      showMeBG: false,
      showMe: false,
      going: "",
      name: "",
      UID: "",
      PASS: "",
      posts: [],
      postlimit: 1,
      reaction: false,
      height: 80,
      itemList: [],
      loading: true,
      USERNAME: '',
      USEREMAIL: '',
      USERIMG: '',
      uri: '',
      filename: '',
      filetype: '',
      uricreatepost: '',
      uricreatepostVideos: '',
      uricreatepostVideosname: '',
      uricreatepostAudio: '',
      uricreatepostAudioname: '',

      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      voiceuri: '',

      playbackObj: null,
      soundobj: null,
      currentAudio: {},
      isPlayingAudio: false,
      abs: '',
      loading: false
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
  }

  componentDidMount = async () => {

    const USERNAME = await AsyncStorage.getItem("USERNAME");
    const USEREMAIL = await AsyncStorage.getItem("USEREMAIL");
    const USERIMG = await AsyncStorage.getItem("USERIMG");

    console.log(USERIMG)

    this.setState({
      USERNAME: USERNAME,
      USEREMAIL: USEREMAIL,
      USERIMG: USERIMG,
    })

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getPosts();
    });

    this.getPosts();
    this.getPermissionAsync();
    this.getAllPagesData();
    this.getAllGroupData();
    this._askForPermissions();
    this.getBG();
  };

  getBG() {
    let url = `${URL}/v2/abs.php?type=get_colors`;
    fetch(url)
      .then(r => r.json())
      .then(response => {
        console.log(response)
        this.setState({
          BGG: response
        })
      })
      .catch(e => console.log(e))
  }

  //  ================== audio start =====================


  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async crossrecord() {

    if (this.sound !== null) {
      await this.sound.unloadAsync();

      this.sound = null;
    }

    this.setState({ voiceuri: '' })
    // if (this.recording !== null) {
    //   this.recording.setOnRecordingStatusUpdate(null);
    //   this.recording = null;
    // }
  }

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    this.setState({ voiceuri: info })
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }


  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.sound != null) {
      this.sound.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.sound != null) {
      try {
        await this.sound.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }


  //  ================== audio end =====================

  getAllGroupData = async () => {

    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    const data = new FormData();
    data.append('server_key', SERVER_KEY);
    data.append('type', 'my_groups');

    const url = `${URL}/get-my-groups?access_token=` + ACCESSTOKEN;
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

        // console.log(responseJson);

        this.setState({
          group: responseJson.data
        })
      })
  }

  getAllPagesData = async () => {

    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    const data = new FormData();
    data.append('server_key', SERVER_KEY);
    data.append('limit', 100);
    data.append('offset', 0);
    data.append('type', 'my_pages');

    const url = `${URL}/get-my-pages?access_token=` + ACCESSTOKEN;
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

        this.setState({
          pages: responseJson.data
        })
      })

  }

  getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImageCreatePost = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        console.log(result)
        this.setState({
          uricreatepost: result.uri,
        });
      }

    } catch (E) {
      console.log(E);
    }
  };

  _pickVideoCreatePost = async () => {

    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.cancelled) {
      console.log(result)
      this.setState({
        uricreatepostVideos: result.uri,
        uricreatepostVideosname: result.name,
      });
    }

  };

  _pickAudioCreatePost = async () => {

    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.cancelled) {
      console.log(result)
      this.setState({
        uricreatepostAudio: result.uri,
        uricreatepostAudioname: result.name,
      });
    }

  };

  createPost = async () => {

    this.setState({showMeBG: false, BG: require("./../image/bg/plain.png") })

    const { going } = this.state;
    const { uricreatepost } = this.state;
    const { uricreatepostVideos } = this.state;
    const { uricreatepostAudio } = this.state;
    const { voiceuri } = this.state;
    const { BGID } = this.state;

    // console.log(voiceuri)



    // console.log(uricreatepostAudio)

    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

    this.setState({ loading: true })
    console.log('FILE UPLOAD PROCESSING....');
    const data = new FormData();

    data.append('server_key', SERVER_KEY);
    data.append('postText', going);

    BGID == '' ?
      null
      :
      data.append('post_color', BGID);

    uricreatepost == '' ?
      null
      :
      data.append('postFile', {
        uri: uricreatepost,
        type: 'image/jpg',
        name: 'createPostImg.jpg',
      });

    uricreatepostVideos == '' ?
      null
      :
      data.append('postVideo', {
        uri: uricreatepostVideos,
        type: 'video/mp4',
        name: 'createPostVideo.mp4',
      });

    uricreatepostAudio == '' ?
      null
      :
      data.append('postMusic', {
        uri: uricreatepostAudio,
        type: 'audio/mp3',
        name: 'createPostMusic.mp3',
      });



    const url = `${URL}/new_post?access_token=${ACCESSTOKEN}`;
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


        if (responseJson.api_status == "200") {
          this.setState({
            going: '',
            uricreatepost: '',
            uricreatepostVideos: '',
            uricreatepostAudio: '',
          })
          this.getPosts();
          return;
        }
      })

  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });
      if (!result.cancelled) {
        console.log(result)
        this.setState({
          uri: result.uri,
        });
      }

    } catch (E) {
      console.log(E);
    }
  };

  createStory = async () => {


    const { uri } = this.state;

    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

 
    console.log('FILE UPLOAD PROCESSING....');
    const data = new FormData();

    data.append('server_key', SERVER_KEY);
    data.append('file_type', 'image');
    data.append('file', {
      uri: uri,
      type: 'image/jpg',
      name: 'storyimg.jpg',
    });
    data.append('story_title', 'from app story demo title');
    data.append('story_description ', 'from app story demo Description');



    const url = `${URL}/create-story?access_token=${ACCESSTOKEN}`;
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
        return;

        if (responseJson.api_status == "400") {
          alert('Incorrect Username Or Password');
          return;
        }
        if (responseJson.api_status == "200") {

          let ACCESSTOKEN = `${responseJson.access_token}`;
          AsyncStorage.setItem('ACCESSTOKEN', ACCESSTOKEN);

          let UID = `${responseJson.user_id}`;
          AsyncStorage.setItem('UID', UID);

          this.userData(UID, ACCESSTOKEN);


          return;
        }
      })

  }

  renderGroup = ({ item }) => {

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('groupdetail',
        { group_id: item.group_id, cover: item.cover, group_name: item.group_name, members: item.members })}>
        <Image style={styles.ads} source={{ uri: item.avatar }} />
      </TouchableOpacity>
    );
  };

  renderPage = ({ item }) => {
    console.log(item)
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('pagedetail', {
        page_id: item.page_id,
        page_name: item.page_name,
        cover: item.cover,
      })}>
        <Image style={styles.ads} source={{ uri: item.avatar }} />
      </TouchableOpacity>
    );
  };

  renderStory = ({ item }) => {
    return (
      <TouchableOpacity>
        <Image style={styles.story} source={item.Image} />
      </TouchableOpacity>
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

  renderPosts = ({ item, index }) => {
    const showReactions = this.state["reaction_" + item.id];

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

          {item.file_type == "audio" ?

            <View style={{ margin: 20, marginBottom: 20, marginTop: 5, backgroundColor: '#DDB937', borderRadius: 100, padding: 10, flexDirection: 'row' }}>
              <View style={{ width: '20%' }}>
                <TouchableOpacity onPress={() => this.handleaudioplaytimeline(item.postFile)}>
                  {this.state.isPlayingAudio == false ?
                    <Image
                      style={{ width: 35, height: 35, alignSelf: 'flex-start', backgroundColor: 'white', borderRadius: 100 }}
                      source={require('./../image/icon/play-button.png')}
                    />
                    :
                    <Image
                      style={{ width: 35, height: 35, alignSelf: 'flex-start', backgroundColor: 'white', borderRadius: 100 }}
                      source={require('./../image/icon/pause.png')}
                    />
                  }
                </TouchableOpacity>
              </View>
              <View style={{ width: '80%' }}>
                <Text numberOfLines={1} style={{ color: '#ffffff', marginTop: 6 }}>{item.postFileName}</Text>
              </View>
            </View>

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
                0
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
                0
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: "#E0E0E0", padding: 5 }}></View>
      </View>
    );
  };

  close() {
    this.setState({ showMe: false });
  }

  handleLoadMore = async () => {

    this.setState({
      postlimit: this.state.postlimit + 1
    });
    this.getPosts();
  }

  renderFooter = () => {
    return (
      <View style={{ marginTop: 0, marginBottom: 0 }}>
        <ActivityIndicator color="#000000" size={'small'} animating={this.state.loading} />
      </View>
    )
  }

  getPosts = async () => {

    const { postlimit } = this.state;
    const UID = await AsyncStorage.getItem("UID");
    const ACCESSTOKEN = await AsyncStorage.getItem("ACCESSTOKEN");

   
    // console.log("FILE UPLOAD PROCESSING....");
    const data = new FormData();

    data.append("server_key", SERVER_KEY);
    data.append("type", "get_news_feed");
    data.append("id", UID);
    // data.append("limit", postlimit);

    const url = `${URL}/posts?access_token=${ACCESSTOKEN}`;
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
        // console.log(responseJson);


        this.setState({
          loading: false,
          posts: responseJson.data,
        });
      });
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

  updateSize = (height) => {
    this.setState({
      height,
    });
  };

  handleaudioplaytimeline = async audio => {
    console.log(audio);


    // Play Audio
    if (this.state.soundobj === null) {
      const playbackObj = new Audio.Sound();
      const status = await playbackObj.loadAsync(
        { uri: audio },
        { shouldPlay: true }
      );

      return this.setState({ ...this.state, currentAudio: audio, playbackObj: playbackObj, soundobj: status, isPlayingAudio: status.isPlaying })
    }

    // Pause Audio
    if (this.state.soundobj.isLoaded && this.state.soundobj.isPlaying) {


      const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false });

      return this.setState({ ...this.state, soundobj: status, isPlayingAudio: status.isPlaying })


    }

    // Resume Audio
    if (this.state.soundobj.isLoaded && !this.state.soundobj.isPlaying && this.state.currentAudio == audio) {
      const status = await this.state.playbackObj.playAsync();

      return this.setState({ ...this.state, soundobj: status, isPlayingAudio: status.isPlaying })
    }

  }

  changeBG(BG, ID) {
    this.setState({ BGID: ID, BG2: BG })
  }

  renderButton() {
    if (this.state.loading) {
      <View>
      </View>
    }
    return (
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <ActivityIndicator color="#000000" size={'small'} animating={this.state.loading} />
      </View>
    )
  };


  render() {
    let items = this.state.posts;
    let itemList = [];
    return (


      <View style={styles.container}>
        <View style={{ marginTop: wp("10%") }}>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{ flexDirection: "row", padding: 30, paddingBottom: 30 }}
            >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={{ width: "20%" }}>
                <Image
                  style={styles.profile}
                  source={{ uri: this.state.USERIMG }}
                />
              </TouchableOpacity>
              <View style={{ width: "40%", marginLeft: 10, marginRight: 10 }}>
                <Image
                  style={{
                    width: 130,
                    height: 30,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={require("./../image/name.png")}
                />
              </View>
              <View style={{ width: "12%", marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity>
                  <Image
                    style={styles.search}
                    source={require("./../image/icon/search.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "20%", marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("chatlist")}
                >
                  <Image
                    style={styles.search}
                    source={require("./../image/icon/logo.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingTop: 0,
                marginTop: -50,
                marginBottom: 20,

                borderRadius: 10,
                margin: 10,
              }}
            >
              <ImageBackground source={{ uri: this.state.BG2 == '' ? this.state.BG : this.state.BG2 }} style={{ width: '100%', height: '100%' }} imageStyle={{ borderRadius: 5 }} resizeMode='stretch'>

                <View style={{
                  flexDirection: "row",
                  paddingTop: 30,
                  paddingBottom: 30,
                  borderRadius: 10,
                  margin: 10,
                  width: '100%'
                }}>

                  {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={{ width: "25%" }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 500,
                        marginTop: 18,
                        marginLeft:10,
                        borderWidth: 2,
                        borderColor: "#ffffff",

                      }}
                      source={{ uri: this.state.USERIMG }}
                    />
                  </TouchableOpacity> */}

                  <View
                    style={{
                      width: "90%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 15,
                    }}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder={"Allez! Raconte 😌🙃😁"}
                      placeholderTextColor={"#ffffff"}
                      value={this.state.going}
                      onChangeText={(going) => this.setState({ going })}
                      multiline={true}
                      onContentSizeChange={(e) =>
                        this.updateSize(e.nativeEvent.contentSize.height)
                      }
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>



            {this.state.uricreatepostVideos == '' ?
              null
              :
              <View style={{ margin: 20, marginTop: 5, backgroundColor: '#DDB937', borderRadius: 100, padding: 10, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <Text style={{ color: '#ffffff', marginTop: 2 }}>{this.state.uricreatepostVideosname}</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <TouchableOpacity onPress={() => this.setState({ uricreatepostVideos: '' })}>
                    <Image
                      style={{ width: 25, height: 25, alignSelf: 'flex-end' }}
                      source={require('./../image/icon/btncross.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }

            {this.state.uricreatepostAudio == '' ?
              null
              :
              <View style={{ margin: 20, marginTop: 5, backgroundColor: '#DDB937', borderRadius: 100, padding: 10, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <Text style={{ color: '#ffffff', marginTop: 2 }}>{this.state.uricreatepostAudioname}</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <TouchableOpacity onPress={() => this.setState({ uricreatepostAudio: '' })}>
                    <Image
                      style={{ width: 25, height: 25, alignSelf: 'flex-end' }}
                      source={require('./../image/icon/btncross.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }

            {this.state.uricreatepost == '' ?
              null
              :
              <View>

                <Image
                  style={{ width: '95%', height: 200, marginRight: 10, marginLeft: 10, marginTop: 0, marginBottom: 20, borderRadius: 10 }}
                  source={{ uri: this.state.uricreatepost }}
                />
                <TouchableOpacity style={{ marginBottom: 40, marginTop: -60 }} onPress={() => this.setState({ uricreatepost: '' })}>
                  <Image
                    style={{ width: 30, height: 30, marginRight: 20, alignSelf: 'flex-end' }}
                    source={require('./../image/icon/btncross.png')}
                  />
                </TouchableOpacity>

              </View>
            }

            {this.state.loading == false ? null : this.renderButton()}

            {this.state.going == "" ? null : (
              <GradientButton
                style={{
                  marginVertical: 8,
                  marginTop: -15,
                  marginBottom: 20,
                  alignSelf: "center",
                }}
                text="Post Now"
                textStyle={{ fontSize: 17, fontWeight: "100" }}
                gradientBegin="#DDB937"
                gradientEnd="#DDB937"
                gradientDirection="diagonal"
                height={40}
                width={"90%"}
                radius={50}
                impact
                impactStyle="Light"
                onPressAction={() => this.createPost()}
              />
            )}

            {this.state.voiceuri ?
              /* ========== Stop & Pause & Audio Slider Button START ========== */

              <View>
                < View style={styles.playbackContainer}>
                  <Slider
                    style={[styles.playbackSlider, { marginBottom: 20 }]}
                    trackImage={ICON_TRACK_1.module}
                    thumbImage={ICON_THUMB_1.module}
                    value={this._getSeekSliderPosition()}
                    onValueChange={this._onSeekSliderValueChange}
                    onSlidingComplete={this._onSeekSliderSlidingComplete}
                    disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
                  />
                  <Text style={[styles.playbackTimestamp, {}]}>
                    {this._getPlaybackTimestamp()}
                  </Text>
                </View>

                <View style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow, { marginTop: 0, marginBottom: 20, marginLeft: 20 }]}>
                  <View style={styles.playStopContainer}>
                    <TouchableOpacity
                      underlayColor={BACKGROUND_COLOR}
                      style={styles.wrapper}
                      onPress={this._onPlayPausePressed}
                      disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                      <Image
                        style={{ width: 30, height: 30, margin: 5 }}
                        source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      underlayColor={BACKGROUND_COLOR}
                      style={styles.wrapper}
                      onPress={this._onStopPressed}
                      disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                      <Image style={{ width: 30, height: 30, margin: 5 }} source={ICON_STOP_BUTTON.module} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      underlayColor={BACKGROUND_COLOR}
                      style={styles.wrapper}
                      onPress={() => this.crossrecord()}>
                      <Image style={{ width: 30, height: 30, margin: 5 }} source={require('./../image/icon/btncross.png')} />
                    </TouchableOpacity>

                  </View>
                  <View />
                </View>
              </View>
              /* ========== Stop & Pause & Audio Slider Button END ========== */
              :
              null
            }


            {/* ========== Audio Timelap START ========== */}

            {this.state.isRecording ?
              <View style={{ marginBottom: 10, width: '100%', backgroundColor: '#DDB937', padding: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  style={{ width: 15, height: 15, marginRight: 5, marginTop: 2, opacity: this.state.isRecording ? 1.0 : 0.0 }}
                  source={require('./../image/icon/record.png')}
                />
                <Text style={{ color: 'white' }}>{this._getRecordingTimestamp()}</Text>
              </View>
              :
              null
            }

            {/* ========== Audio Timelap END ========== */}

            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <TouchableOpacity
                onPress={this._onRecordPressed}
                disabled={this.state.isLoading}
                style={{
                  width: "20%",
                  borderRightColor: "#EAEAEA",
                  borderRightWidth: 1,
                }}
              >
                <Image
                  style={{ width: 25, height: 25, alignSelf: "center" }}
                  source={require("./../image/icon/mic.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this._pickAudioCreatePost()}
                style={{
                  width: "20%",
                  borderRightColor: "#EAEAEA",
                  borderRightWidth: 1,
                }}
              >
                <Image
                  style={{ width: 25, height: 25, alignSelf: "center" }}
                  source={require("./../image/icon/music.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this._pickVideoCreatePost()}
                style={{
                  width: "20%",
                  borderRightColor: "#EAEAEA",
                  borderRightWidth: 1,
                }}
              >
                <Image
                  style={{ width: 30, height: 20, alignSelf: "center" }}
                  source={require("./../image/icon/btnlive.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this._pickImageCreatePost()}
                style={{
                  width: "20%",
                  borderRightColor: "#EAEAEA",
                  borderRightWidth: 1,
                }}
              >
                <Image
                  style={{ width: 30, height: 20, alignSelf: "center" }}
                  source={require("./../image/icon/btnphoto.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ showMeBG: true })}
                style={{ width: "20%" }}
              >
                <Image
                  style={{ width: 25, height: 25, alignSelf: "center" }}
                  source={require("./../image/icon/changebg.png")}
                />
              </TouchableOpacity>
            </View>

            {this.state.showMeBG == true ?
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>

                <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>
                  <FlatList
                    pagingEnabled
                    horizontal
                    data={this.state.background}
                    renderItem={({ item }) =>

                      <View>
                        <TouchableOpacity
                          onPress={() => this.changeBG(item.Image, item.id)}
                          style={{ padding: 15, alignSelf: 'center' }}
                        >
                          <Image
                            style={{ width: 25, height: 25, alignSelf: "center", borderRadius: 100 }}
                            source={{ uri: item.Image }}
                          />
                        </TouchableOpacity>
                      </View>


                    }
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </ScrollView>
              :
              null}

            <View style={{ backgroundColor: "#E0E0E0", padding: 5 }}></View>

            <View
              style={{
                backgroundColor: "white",
                marginTop: 0,
                paddingTop: 20,
                paddingBottom: 20,
                flexDirection: "row",
              }}
            >
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('createpage')} style={{ alignSelf: "center" }}>
                  <Image
                    style={{
                      width: 120,
                      height: 50,
                      alignSelf: "center",
                      marginRight: 20,
                      marginLeft: 20,
                    }}
                    source={require("./../image/icon/btncreategroup.png")}
                  />
                </TouchableOpacity>

                <FlatList
                  pagingEnabled
                  horizontal
                  data={this.state.pages}
                  renderItem={this.renderPage}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>
            </View>

            <View style={{ backgroundColor: "#E0E0E0", padding: 5 }}></View>

            <View
              style={{
                backgroundColor: "white",
                marginTop: 0,
                paddingTop: 20,
                paddingBottom: 20,
                flexDirection: "row",
              }}
            >
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('creategroup')} style={{ alignSelf: "center" }}>
                  <Image
                    style={{
                      width: 120,
                      height: 50,
                      alignSelf: "center",
                      marginRight: 20,
                      marginLeft: 20,
                    }}
                    source={require("./../image/icon/btncreategroup2.png")}
                  />
                </TouchableOpacity>

                <FlatList
                  pagingEnabled
                  horizontal
                  data={this.state.group}
                  renderItem={this.renderGroup}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>
            </View>

            <View style={{ backgroundColor: "#E0E0E0", padding: 5 }}></View>

            <View
              style={{
                backgroundColor: "white",
                marginTop: 0,
                paddingTop: 20,
                paddingBottom: 20,
                flexDirection: "row",
              }}
            >
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <TouchableOpacity
                  style={{ alignSelf: "center", marginTop: -3 }}
                >
                  <View style={styles.createStory}>
                    <Image
                      style={styles.imgStory}
                      source={require("./../image/ad2.jpg")}
                    />
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        borderWidth: 2,
                        borderColor: "#ffffff",
                        alignSelf: "center",
                        marginTop: -20,
                        borderRadius: 250,
                      }}
                      source={require("./../image/icon/btnadd.png")}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 10,
                        marginTop: -10,
                        alignSelf: "center",
                      }}
                    >
                      Créer Wak's
                    </Text>
                  </View>
                </TouchableOpacity>

                <FlatList
                  pagingEnabled
                  horizontal
                  data={this.state.story}
                  renderItem={this.renderStory}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>
            </View>

            <View style={{ backgroundColor: "#E0E0E0", padding: 5 }}></View>

            <FlatList
              data={this.state.posts}
              renderItem={this.renderPosts}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </View>

        <Modal
          transparent={true}
          visible={this.state.showMe}
          onRequestClose={() => this.setState({ showMe: false })}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ showMe: false })}
              style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "30%" }}
            ></TouchableOpacity>
            <View style={{ backgroundColor: "#fff", height: "70%" }}>
              <View style={{ padding: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>
                      Photo/ Vidéos{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>
                      Identifier amis{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>
                      Humeur et activités{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>Lieux </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>
                      Couleurs de fond
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>
                      Camerium
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>Live</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>Gifs</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>Musique</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#EAEAEA",
                    borderBottomWidth: 1,
                    padding: 13,
                    paddingLeft: 0,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Image
                      style={{ width: 20, height: 20, alignSelf: "center" }}
                      source={require("./../image/icon/labelshare.png")}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#000", fontSize: 15 }}>
                      Note vocale
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    marginTop: -20,
  },
  ads: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginTop: wp("0%"),
    borderRadius: 250,
    marginRight: 5,
  },
  story: {
    width: 130,
    height: 170,
    alignSelf: "center",
    marginTop: wp("0%"),
    borderRadius: 20,
    marginRight: 10,
  },
  img: {
    width: "100%",
    height: 180,
    alignSelf: "center",
    marginTop: 0,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  imgStory: {
    width: 140,
    height: 120,
    alignSelf: "center",
    marginTop: wp("0%"),
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  search: {
    width: 50,
    height: 50,
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
  },
  createStory: {
    margin: 5,
    backgroundColor: "white",
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 20,
  },
  profile: {
    width: 50,
    height: 50,
    marginBottom: wp("10%"),
    borderRadius: 500
  },
  dot: {
    width: 55,
    height: 35,
    marginTop: wp("3%"),
    marginLeft: -10,
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
    marginHorizontal: 25,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 5,
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
    width: '100%',
    padding: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 22,
    marginTop: 20,
    textAlign: 'center'
  },



  // ===== audio start ======

  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },

  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {},
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: DEVICE_HEIGHT / 2.0,
    maxHeight: DEVICE_HEIGHT / 2.0,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
    minWidth: ICON_RECORD_BUTTON.width * 3.0,
    maxWidth: ICON_RECORD_BUTTON.width * 3.0,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORDING.height,
    maxHeight: ICON_RECORDING.height,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  liveText: {
    color: LIVE_COLOR,
  },
  recordingTimestamp: {
    paddingLeft: 20,
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
  },
  textButton: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 10,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
    maxWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },

  // ===== audio end ========
});
