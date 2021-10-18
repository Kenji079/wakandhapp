
import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ActivityIndicator, Dimensions, TouchableOpacity, TextInput, AsyncStorage, Alert, Picker } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientButton from 'react-native-gradient-buttons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import { URL, SERVER_KEY } from './../route/base_url';
var radio_props = [
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' },
];
export default class createpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Password: '',
            accessToken:'',
            page_name:'',
            page_title:'',
            category:'',
            page_description:'',
            loading:false,
        };
    }
    componentDidMount=async()=>{
        const accessToken=await AsyncStorage.getItem('ACCESSTOKEN')
        this.setState({accessToken:accessToken})
    }
    handleCreatePage=()=>{
        const {
            page_name,
            page_title,
            category,
            page_description,
            accessToken
        } = this.state;
            
        if(page_name==''){
            alert("Page name required!")
        }else if(page_title==''){
            alert("Page title required!")
        }else if(category==''){
            alert("Category required!")
        }else if(page_description==''){
            alert("Description required!")
        }else{
            this.setState({ loading: true })
            const data = new FormData();
            data.append('server_key', SERVER_KEY);
            data.append('page_name', page_name);
                    this.setState({ loading: false })
            data.append('page_title',page_title);
            data.append('page_category', category);
            data.append('page_description', page_description);
            
            
            const url = `${URL}/create-page?access_token=`+accessToken;
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
                    console.log("responseJson", responseJson)
                    this.setState({ loading: false })
                    if(responseJson.api_status == "400"){
                        alert(responseJson.errors.error_text)
                        return;
                    }
                    if(responseJson.api_status == "200")
                    {
                        this.props.navigation.goBack();
                        return;
                    }
                })
        }
    }
    renderLoading() {
        if (this.state.loading) {
            <View>
            </View>
        }
        return (
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <ActivityIndicator 
                    color="#000000" 
                    size={'large'} 
                    animating={this.state.loading} 
                />
            </View>
        )
    };

    render() {
        const { ischecked } = this.props
        return (
            <View style={styles.container}>

                <View style={{ marginTop: wp('10%'), padding: 30 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: '10%', marginTop: 6 }} onPress={() => this.props.navigation.goBack(null)}>
                                <Image style={styles.back} source={require('./../image/icon/back.png')} />
                            </TouchableOpacity>
                            <View style={{ width: '40%', marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Image style={styles.logo} source={require('./../image/icon/createpagetxt.png')} />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: wp('0%'), alignContent: 'center', alignItems: 'center' }}>
                            <KeyboardAvoidingView behavior="padding">

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold' }}>PAGE NAME</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Page Name'}
                                        value={this.state.page_name}
                                        onChangeText={page_name => this.setState({ page_name })}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>PAGE Title</Text>
                                <View style={styles.firstInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Page title'}
                                        value={this.state.page_title}
                                        onChangeText={page_title => this.setState({ page_title })}

                                    />
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: 20 }}>PAGE CATEGORY</Text>
                                <View style={styles.firstInput}>
                                    <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#BFBFBF', marginTop: 0, marginLeft: 10 }}
                                        selectedValue={this.state.category}
                                        onValueChange={(category) =>
                                            this.setState({ category: category })}>
                                        <Picker.Item label="Cars & Vehicle" value="" />
                                        <Picker.Item value="1" label="Category 1" />
                                        <Picker.Item value="2" label="Category 2" />
                                        <Picker.Item value="3" label="Category 3" />
                                    </Picker>
                                </View>

                                <Text style={{ color: "#88888B", fontSize: 15, marginLeft: wp('8%'), fontWeight: 'bold', marginTop: wp('6%') }}>PAGE DESCRIPTION</Text>
                                <View style={styles.firstInput1}>
                                    <TextInput
                                        style={styles.input1}
                                        placeholder={'Text'}
                                        value={this.state.page_description}
                                        onChangeText={page_description => this.setState({ page_description })}
                                       
                                    />
                                </View>
                            </KeyboardAvoidingView>
                            
                            {this.state.loading == false ? null : this.renderLoading()}
                            
                            <GradientButton
                                style={{ marginVertical: 8., marginTop: 20, alignSelf: 'center' }}
                                text="Create Page"
                                textStyle={{ fontSize: 17 }}
                                gradientBegin="#DDB937"
                                gradientEnd="#DDB937"
                                gradientDirection="diagonal"
                                height={60}
                                width={280}
                                radius={10}
                                impact
                                impactStyle='Light'
                                onPressAction={() => this.handleCreatePage()}
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
        width: 160,
        height: 30,
        marginBottom: wp('10%'),
        marginTop: 6
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