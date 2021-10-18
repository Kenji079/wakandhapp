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
import Slider from '@react-native-community/slider';
var radio_props = [
    { value: 'Used Car for Sale', label: 'Used Car for Sale' },
    { value: 'Motorcycles', label: 'Motorcycles' },
    { value: 'Auto Accessories & Parts', label: 'Auto Accessories & Parts' },
];
export default class automotive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            ischecked: false,
            visible: false,
            fromValue: '0',
            toValue: '',
            add1: false,
            add2: false,
            add3: false,
            add4: false,

        };
    }

    renderAds = ({ item }) => {
        return (
            <View>
                <Image style={styles.ads} source={item.Image} />
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
                            <View style={{ width: '50%' }}>
                                <Image style={styles.logo1} source={require('./../image/icon/automotivetext.png')} />
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <TouchableOpacity onPress={() => this.setState({ add1: true })}>
                                    <Image style={styles.search} source={require('./../image/icon/plus.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <TouchableOpacity>
                                    <Image style={styles.search} source={require('./../image/icon/setting.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('advancesearch')}>
                                    <Image style={styles.search} source={require('./../image/icon/search.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '30%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 7 }}>285 All</Text>
                            </View>
                            <View style={{ width: '30%' }}></View>
                            <View style={{ width: '40%' }}>
                                <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                                    <Image style={styles.filter} source={require('./../image/icon/btnfilter.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ margin: 10 }}></View>

                        <View style={styles.block}>
                            <Image style={styles.img} source={{ uri: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80' }} />

                            <View style={{ padding: 10, borderBottomColor: '#EAEAEA', borderBottomWidth: 1, paddingBottom: 20 }}>
                                <Text style={{ fontSize: 18, padding: 10, marginTop: 0, fontWeight: 'bold' }}>MG 360 Used Car in Dubai</Text>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '15%' }}>
                                        <Image style={styles.thumbicon} source={require('./../image/icon/timegrey.png')} />
                                    </View>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingTop: 0 }}>06th December, 2020</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '15%' }}>
                                        <Image style={styles.thumbicon} source={require('./../image/icon/locationgrey.png')} />
                                    </View>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingTop: 0 }}>United Arab Emirates</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <View style={{ width: '70%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 0, color: '#00CC33', marginLeft: 12 }}>$34125</Text>
                                    </View>
                                    <View style={{ width: '15%' }}>
                                        <TouchableOpacity>
                                            <Image style={styles.thumbicon} source={require('./../image/icon/heartgrey.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '15%' }}>
                                        <TouchableOpacity>
                                            <Image style={styles.thumbicon} source={require('./../image/icon/flaggrey.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 20, marginBottom: 20, marginLeft: 20 }}
                                text="Used"
                                textStyle={{ fontSize: 17, color: 'black' }}
                                gradientBegin="#f3f3f3"
                                gradientEnd="#f3f3f3"
                                gradientDirection="diagonal"
                                height={50}
                                width={80}
                                radius={10}
                                impact
                                impactStyle='Light'
                                onPressAction={() => this.props.navigation.navigate('#')}
                            />

                            <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingBottom: 20, paddingLeft: 20 }}>Category: Used Cars for Sale</Text>
                        </View>

                        <View style={styles.block}>
                            <Image style={styles.img} source={{ uri: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80' }} />

                            <View style={{ padding: 10, borderBottomColor: '#EAEAEA', borderBottomWidth: 1, paddingBottom: 20 }}>
                                <Text style={{ fontSize: 18, padding: 10, marginTop: 0, fontWeight: 'bold' }}>MG 360 Used Car in Dubai</Text>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '15%' }}>
                                        <Image style={styles.thumbicon} source={require('./../image/icon/timegrey.png')} />
                                    </View>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingTop: 0 }}>06th December, 2020</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '15%' }}>
                                        <Image style={styles.thumbicon} source={require('./../image/icon/locationgrey.png')} />
                                    </View>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingTop: 0 }}>United Arab Emirates</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <View style={{ width: '70%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 0, color: '#00CC33', marginLeft: 12 }}>$34125</Text>
                                    </View>
                                    <View style={{ width: '15%' }}>
                                        <TouchableOpacity>
                                            <Image style={styles.thumbicon} source={require('./../image/icon/heartgrey.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '15%' }}>
                                        <TouchableOpacity>
                                            <Image style={styles.thumbicon} source={require('./../image/icon/flaggrey.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 20, marginBottom: 20, marginLeft: 20 }}
                                text="Used"
                                textStyle={{ fontSize: 17, color: 'black' }}
                                gradientBegin="#f3f3f3"
                                gradientEnd="#f3f3f3"
                                gradientDirection="diagonal"
                                height={50}
                                width={80}
                                radius={10}
                                impact
                                impactStyle='Light'
                                onPressAction={() => this.props.navigation.navigate('#')}
                            />

                            <Text style={{ fontSize: 14, padding: 10, color: '#8f92a1', paddingBottom: 20, paddingLeft: 20 }}>Category: Used Cars for Sale</Text>
                        </View>

                    </ScrollView>
                </View>

                <Modal visible={this.state.visible}>

                    <View>

                        <ScrollView>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%', marginTop: 20, marginLeft: 20 }}>
                                    <Image style={styles.logo} source={require('./../image/icon/filtertext.png')} />
                                </View>
                                <View style={{ width: '10%', marginLeft: 10, marginRight: 10 }}>

                                </View>
                                <View style={{ width: '5%', marginLeft: 10, marginRight: 10 }}>

                                </View>
                                <View style={{ width: '15%', marginRight: 10, marginTop: 22, }}>
                                    <TouchableOpacity onPress={() => this.setState({ visible: false })}>
                                        <Image style={styles.search} source={require('./../image/icon/btncross.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ borderTopWidth: 1, borderTopColor: '#EAEAEA', marginTop: -15, padding: 20 }}>
                                <View style={{ width: '90%', marginLeft: 0, marginTop: wp('5%') }}>
                                    <RadioForm
                                        radio_props={radio_props}
                                        initial={0}
                                        formHorizontal={false}
                                        labelHorizontal={true}
                                        onPress={(value) => this.setState({ paymentType: value })}
                                        buttonSize={0}
                                        buttonOuterSize={20}
                                        style={{ padding: 0, marginTop: 10 }}
                                        selectedButtonColor={'#01CC34'}
                                        selectedLabelColor={'#01CC34'}
                                        labelStyle={{ marginRight: 10, fontSize: 18, marginTop: 0 }}
                                    />
                                </View>

                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>Price Range</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '70%' }}>
                                        <Slider
                                            style={{ width: 250, height: 40 }}
                                            minimumValue={0}
                                            maximumValue={2000}
                                            minimumTrackTintColor="#01cc34"
                                            maximumTrackTintColor="#01cc34"
                                            thumbTintColor="#01cc34"
                                            onValueChange={value => this.setState({ fromValue: value })}
                                        />
                                    </View>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20, marginTop: 7 }}>${this.state.fromValue}</Text>

                                    </View>
                                </View>
                            </View>

                            <View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Used Cars for Sale" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Motorcycles" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Boats" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Auto Accessories & Parts" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Number Plates" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Heavy Vehicles" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <GradientButton
                                    style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center', marginTop: 15, marginBottom: 20 }}
                                    text="Apply Filter"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#00CC33"
                                    gradientEnd="#00CC33"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={310}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.props.navigation.navigate('#')}
                                />

                            </View>

                        </ScrollView>
                    </View>


                </Modal>


                <Modal visible={this.state.add1}>

                    <View>

                        <ScrollView>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '75%', marginTop: 20, marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 5 }}>Condition and Types</Text>
                                </View>

                                <View style={{ width: '10%', marginRight: 10, marginTop: 22, }}>
                                    <TouchableOpacity onPress={() => this.setState({ add1: false })}>
                                        <Image style={styles.search} source={require('./../image/icon/btncross.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{ marginTop: -20 }}>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>BODY CONDITION</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Perfet inside and out" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>PERFECT INSIDE AND OUT</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Perfet inside and out" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>YEAR</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="2021" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>BODY TYPE</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Coupe" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>COLOR</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Black" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>TRANSMISSION TYPE</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Manual Transmission" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>REGIONAL SPECS</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="European Specs" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>NO. OF CYLINDERS</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="3" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>DOORS</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="2" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>HORSEPOWER</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Less Than 150 HP" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>WARRANTY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Yes" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>FUEL TYPE</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Yes" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>DESCRIPTION</Text>
                                <View style={styles.firstInput1}>
                                    <TextInput
                                        style={styles.input1}
                                        placeholder={'Text'}
                                        value={this.state.about}
                                        onChangeText={about => this.setState({ about })}

                                    />
                                </View>

                                <TouchableOpacity>
                                    <Image style={styles.imgpicker} source={require('./../image/icon/imgplace.png')} />
                                </TouchableOpacity>

                                <GradientButton
                                    style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center', marginTop: 15, marginBottom: 20 }}
                                    text="Next"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#00CC33"
                                    gradientEnd="#00CC33"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={310}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.setState({ add1: false, add2: true })}
                                />

                            </View>

                        </ScrollView>
                    </View>
                </Modal>

                <Modal visible={this.state.add2}>

                    <View>

                        <ScrollView>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '75%', marginTop: 20, marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 5 }}>Currency & info</Text>
                                </View>

                                <View style={{ width: '10%', marginRight: 10, marginTop: 22, }}>
                                    <TouchableOpacity onPress={() => this.setState({ add2: false })}>
                                        <Image style={styles.search} source={require('./../image/icon/btncross.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{ marginTop: -20 }}>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>CURRENCY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="USD ($)" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>PRICE</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Price'}
                                        value={this.state.email}
                                        onChangeText={email => this.setState({ email })}
                                        keyboardType={'phone-pad'}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>TYPE</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="New" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>QUANTITY OF PRODUCTS</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Quantity'}
                                        value={this.state.qty}
                                        onChangeText={qty => this.setState({ qty })}
                                        keyboardType={'phone-pad'}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>EMAIL</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Email'}
                                        value={this.state.em}
                                        onChangeText={em => this.setState({ em })}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>MOBILE</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'+93'}
                                        value={this.state.mob}
                                        onChangeText={mob => this.setState({ mob })}
                                        keyboardType={'phone-pad'}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>KILOMETERS</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Kilometers'}
                                        value={this.state.mob}
                                        onChangeText={mob => this.setState({ mob })}
                                        keyboardType={'phone-pad'}

                                    />
                                </View>

                                <GradientButton
                                    style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center', marginTop: 15, marginBottom: 20 }}
                                    text="Next"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#00CC33"
                                    gradientEnd="#00CC33"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={310}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.setState({ add2: false, add3: true })}
                                />

                            </View>

                        </ScrollView>
                    </View>
                </Modal>

                <Modal visible={this.state.add3}>

                    <View>

                        <ScrollView>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '75%', marginTop: 20, marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 5 }}>Add Product</Text>
                                </View>

                                <View style={{ width: '10%', marginRight: 10, marginTop: 22, }}>
                                    <TouchableOpacity onPress={() => this.setState({ add1: false })}>
                                        <Image style={styles.search} source={require('./../image/icon/btncross.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{ marginTop: -20 }}>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>PRODUCT NAME</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Product Name'}
                                        value={this.state.pro}
                                        onChangeText={pro => this.setState({ pro })}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>CAREGORY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Used Cars for Sale" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>SUBCATEGORY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Audi" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>SUB SUBCATEGORY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Audi A1" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>LANGUAGE</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Audi A1" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>COUNTRY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Afghanistan" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>STATE</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Badakhshan" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>CITY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue) =>
                                            this.setState({ gender: itemValue })}>
                                        <Picker.Item label="Eshkashem" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="1" label="Category 2" />
                                        <Picker.Item value="1" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>LOCATION</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Location'}
                                        value={this.state.loc}
                                        onChangeText={loc => this.setState({ loc })}

                                    />
                                </View>

                                <GradientButton
                                    style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center', marginTop: 15, marginBottom: 20 }}
                                    text="Next"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#00CC33"
                                    gradientEnd="#00CC33"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={310}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.setState({ add3: false, add4: true })}
                                />

                            </View>

                        </ScrollView>
                    </View>
                </Modal>

                <Modal visible={this.state.add4}>

                    <View>

                        <ScrollView>



                            <View style={{ marginTop: 20 }}>

                                <Image style={{ width: 270, height: 250, alignSelf: 'center' }} source={require('./../image/icon/safe.png')} />
                                <Image style={{ width: 270, height: 250, alignSelf: 'center', marginTop: 20, marginBottom: 20 }} source={require('./../image/icon/safe2.png')} />

                                <GradientButton
                                    style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center', marginTop: 15, marginBottom: 20 }}
                                    text="Yes, I agree!"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#00CC33"
                                    gradientEnd="#00CC33"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={310}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.setState({ add4: false })}
                                />

                                <TouchableOpacity onPress={() => this.setState({ add4: false })}>
                                    <Text style={{ alignSelf: 'center', color: '#00CC33', fontWeight: 'bold', fontSize: 18 }}>Cancel</Text>
                                </TouchableOpacity>

                            </View>

                        </ScrollView>
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