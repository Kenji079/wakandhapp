import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { height } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';


export default class sideMenuDesign extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#D49C0F' }}>
        <View style={{ backgroundColor: '#D49C0F', padding: 10, borderBottomColor: '#ffc000', borderBottomWidth: 1, marginTop: 50 }}>
          {/* <Image style={{width:100, height:100, alignSelf:'center', marginTop:35, marginBottom:20}} source={require('../image/pic.png')} /> */}
          <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white', marginBottom: 10 }}>HI KENNETH</Text>
        </View>
        <ScrollView style={{ marginTop: 0 }}>

          <View style={{ borderBottomColor: '#ffc000', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('#') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Catégories</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#ffc000', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('#') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Commandes</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#ffc000', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('#') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Téléchargements</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#ffc000', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('#') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Liste de souhaits</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#ffc000', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('#') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Moyens de paiement</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#ffc000', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('#') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Notifications</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomColor: '#ffc000', borderBottomWidth: 1, }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('#') }} style={{ padding: 5, marginLeft: 5, flexDirection: 'row', marginVertical: height(2), }}>
              <View style={{ marginLeft: 15, marginTop: 1, }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Paramètres</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }
}


