  /*This is an example of React Native App Intro Slider */
import React, { Component } from 'react';
//import react in project
import { Dimensions, StyleSheet, ImageBackground, View, Text, Image } from 'react-native';
//import all the required component
import AppIntroSlider from 'react-native-app-intro-slider';
import { Button } from 'react-native-paper';
import { width, height, totalSize } from 'react-native-dimension';
const { width: WIDTH } = Dimensions.get('window');

//import AppIntroSlider to use it

import Login from '../component/login';
import { widthPercentageToDP } from 'react-native-responsive-screen';


export default class slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text
          style={styles.text}
          color="#fff"

        >Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <Button style={{ backgroundColor: '#DDB937', width: 200, marginRight: 60, marginTop: 0, borderRadius: 25 }}>
        <Text style={{ color: '#ffffff' }}>Commencer</Text>
      </Button>
    );
  };
  _renderPreviousButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text
          style={styles.text}
          color="rgba(255, 255, 255, .9)"
        >Previous</Text>
      </View>
    );
  };
  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: false });
  };
  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <ImageBackground source={item.image} style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginTop: widthPercentageToDP('65%') }}>
            {/* <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title2}>{item.title2}</Text>
          <Text style={styles.text}>{item.text}</Text>
          <Text style={styles.text}>{item.text2}</Text>
          <Text style={styles.text}>{item.text3}</Text> */}
          </View>
        </ImageBackground>
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    if (this.state.showRealApp) {
      return (
        <Login navigation={navigation}></Login>
      )
    } else {
      return (
        <AppIntroSlider
          data={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          activeDotStyle={{ backgroundColor: '#000000', width: 9, height: 9 }}
          dotStyle={{ backgroundColor: '#424242', width: 8, height: 8 }}
          showSkipButton={false}
          showPrevButton={false}
          showNextButton={false}
          renderDoneButton={this._renderDoneButton}
        />
      );
    }
  }
}
const dimension = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 15,
    color: '#494949',
    textAlign: 'center',
  },
  title: {
    fontSize: 17,
    color: '#494949',
    textAlign: 'center',
  },
  title2: {
    fontSize: 28,
    color: '#494949',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

const slides = [
  {
    key: 's1',
    title: 'Easy way to',
    title2: 'Find and Book a Salon',
    text: 'EaseSolotto is an easy way to find and',
    text2: 'book an appointment to Salon & Spa',
    text3: 'with pick & drop facilities',
    image: require('./../image/GetStarted1.png'),
  },
  {
    key: 's2',
    title: 'Easy way to',
    title2: 'Find and Book a Salon',
    text: 'With EaseSolotto you can find and book',
    text2: 'an appointment to a specific Salon or',
    text3: 'Hairdresser you want',
    image: require('./../image/GetStarted2.png'),

  },


];