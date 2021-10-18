import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Picker, Dimensions, TouchableOpacity, Modal, AsyncStorage, Alert } from 'react-native';
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
export default class advancesearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
        };
    }

    render() {
        const { ischecked } = this.props
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 20 }}>

                    <ScrollView>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '75%', marginTop: 20, marginLeft: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 5 }}>Search</Text>
                            </View>

                            <View style={{ width: '10%', marginRight: 10, marginTop: 22, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                    <Image style={styles.search} source={require('./../image/icon/btncross.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ marginTop: -20 }}>

                            <View style={{ borderTopWidth: 1, borderTopColor: '#EAEAEA', borderBottomWidth: 1, borderBottomColor: '#EAEAEA', paddingBottom: 20 }}>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>LOCATION</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Location'}
                                        value={this.state.pro}
                                        onChangeText={pro => this.setState({ pro })}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>SEARCH</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Search'}
                                        value={this.state.search}
                                        onChangeText={search => this.setState({ search })}

                                    />
                                </View>

                                <Text style={{ color: '#DDB937', fontSize: 21, fontWeight: 'bold', paddingTop: 20, paddingLeft: 25 }}>Advance Search</Text>
                            </View>


                            <View style={{ borderTopWidth: 1, borderTopColor: '#EAEAEA', borderBottomWidth: 1, borderBottomColor: '#EAEAEA', paddingBottom: 20 }}>

                                <Text style={{ color: "#000000", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Location</Text>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.con}
                                        onValueChange={(itemValue) =>
                                            this.setState({ con: itemValue })}>
                                        <Picker.Item label="All Contries" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.state}
                                        onValueChange={(itemValue) =>
                                            this.setState({ state: itemValue })}>
                                        <Picker.Item label="All State" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.state1}
                                        onValueChange={(itemValue) =>
                                            this.setState({ state1: itemValue })}>
                                        <Picker.Item label="All State" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#000000", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Category</Text>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.cat}
                                        onValueChange={(itemValue) =>
                                            this.setState({ cat: itemValue })}>
                                        <Picker.Item label="All Categories" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.subcat}
                                        onValueChange={(itemValue) =>
                                            this.setState({ subcat: itemValue })}>
                                        <Picker.Item label="All Subcategories" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.subcat1}
                                        onValueChange={(itemValue) =>
                                            this.setState({ subcat1: itemValue })}>
                                        <Picker.Item label="All Sub Subcategories" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#000000", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Price</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Price'}
                                        value={this.state.pr}
                                        onChangeText={pr => this.setState({ pr })}
                                        keyboardType={'phone-pad'}

                                    />
                                </View>

                                <Text style={{ color: "#000000", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>Post Language</Text>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.contries}
                                        onValueChange={(itemValue) =>
                                            this.setState({ contries: itemValue })}>
                                        <Picker.Item label="All Contries" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                            </View>

                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center', marginTop: 15, marginBottom: 20 }}
                                text="Search"
                                textStyle={{ fontSize: 17 }}
                                gradientBegin="#DDB937"
                                gradientEnd="#DDB937"
                                gradientDirection="diagonal"
                                height={60}
                                width={310}
                                radius={10}
                                impact
                                impactStyle='Light'
                                onPressAction={() => console.log('#')}
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
    logo1: {
        width: 130,
        height: 20,
        marginTop: wp('2%')
    },
    logo: {
        width: 90,
        height: 25,
        marginTop: wp('2%')
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
    thumbicon: {
        width: 22,
        height: 20,
        marginLeft: 8
    },
    filter: {
        width: 120,
        height: 40,
    },
    imgpicker: {
        width: 300,
        height: 130,
        alignSelf: 'center',
        marginTop: 20
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
        marginTop: 20

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