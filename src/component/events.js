
import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, CheckBox, Dimensions, TouchableOpacity, FlatList, AsyncStorage, Alert } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
var radio_props = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];
export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
            Categories: [
                { id: 1, Name: 'All' },
                { id: 2, Name: 'Today' },
                { id: 3, Name: 'Tomorrow' },
                { id: 4, Name: 'This Week' },
            ],
            ads: [
                { id: 1, Image: 'https://images.unsplash.com/photo-1524156868115-e696b44983db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1046&q=80' },
                { id: 2, Image: 'https://images.unsplash.com/photo-1524156868115-e696b44983db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1046&q=80' },
                { id: 3, Image: 'https://images.unsplash.com/photo-1524156868115-e696b44983db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1046&q=80' },
                { id: 4, Image: 'https://images.unsplash.com/photo-1524156868115-e696b44983db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1046&q=80' },
            ],
            event: [
                { id: 1, Image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80' },
                { id: 2, Image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80' },
                { id: 3, Image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80' },
                { id: 4, Image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80' },
            ],
        };
    }

    renderCategories = ({ item }) => {
        return (

            <TouchableOpacity style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', borderWidth: 1, borderColor: '#000000', color: '#000000', padding: 10, borderRadius: 10 }}>
                    {item.Name}
                </Text>
            </TouchableOpacity>

        )
    }

    renderAds = ({ item }) => {
        return (
            <View>
                <Image style={styles.ads} source={{ uri: item.Image }} />
            </View>
        )
    }

    renderEvent = ({ item }) => {
        return (
            <View>
                <Image style={styles.ads} source={{ uri: item.Image }} />
                <View style={{ backgroundColor: 'white', marginTop: -20, }}>
                    <Text style={{ fontSize: 20, padding: 20 }}>Special Offer Buy Here</Text>
                    <View>
                        <Image style={{ width: 20, height: 24, margin: 5 }} source={require('./../image/icon/locationicon.png')} />
                        <Text style={{ margin: 5, marginLeft: 40, marginTop: -25, color: '#8f92a1F' }}>New York America</Text>
                    </View>
                    <View>
                        <Image style={{ width: 20, height: 24, margin: 5 }} source={require('./../image/icon/calendericon.png')} />
                        <Text style={{ margin: 5, marginLeft: 40, marginTop: -25, color: '#8f92a1' }}>1-02-2021</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { ischecked } = this.props
        return (
            <View style={styles.container}>

                <View style={{ marginTop: wp('10%'), padding: 30 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '60%' }}>
                                <Image style={styles.logo} source={require('./../image/icon/eventtext.png')} />
                            </View>
                            <View style={{ width: '40%', marginLeft: 10, marginRight: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('createevents')}>
                                    <Image style={styles.create} source={require('./../image/icon/create.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ fontSize: 20 }}>Find Events by Date</Text>
                        <View style={{ marginTop: 30, borderBottomColor: '#eaeaea', borderBottomWidth: 1, paddingBottom: 20 }}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.Categories}
                                    renderItem={this.renderCategories}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>
                        </View>

                        <Text style={{ fontSize: 20, marginTop: 20 }}>Suggested For You</Text>

                        <View style={{ backgroundColor: 'white', marginTop: 30 }}>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.ads}
                                    renderItem={this.renderAds}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>

                        </View>

                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 35 }}>Events You May Like</Text>
                        <View style={{ backgroundColor: 'white', marginTop: 15, borderBottomColor: '#eaeaea', borderBottomWidth: 1, paddingBottom: 30 }}>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                <FlatList
                                    pagingEnabled
                                    horizontal
                                    data={this.state.event}
                                    renderItem={this.renderEvent}
                                    keyExtractor={item => item.id}
                                />
                            </ScrollView>

                        </View>

                        <TouchableOpacity style={{ borderBottomColor: '#eaeaea', borderBottomWidth: 1, padding: 10, marginTop: 20 }}>
                            <Text style={{ fontSize: 17, textAlign: 'left', marginTop: -20 }}>See More</Text>
                        </TouchableOpacity>

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
        width: 95,
        height: 30,
        marginBottom: wp('10%'),
        marginTop: 5
    },
    search: {
        width: 40,
        height: 40,
        marginBottom: wp('10%')
    },
    ads: {
        width: 250,
        height: 150,
        alignSelf: 'center',
        marginTop: wp('0%'),
        borderRadius: 15,
        marginRight: 5
    },
    create: {
        width: 110,
        height: 45,
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