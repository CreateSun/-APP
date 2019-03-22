import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, Text, Image, View, Alert, TouchableOpacity, ToastAndroid} from 'react-native';
import {Dimensions} from 'react-native'
import DeviceStorage from "../DeviceStorage";
var {height,width} =  Dimensions.get('window');

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }

    static defaultProps={
        // let url='http://192.168.43.74:8080/SimpleWeibo_war_exploded/servlet/GetIdentifyingCode';
        urlLogin:"http://192.168.43.107:8081/SimpleWeibo_war_exploded/servlet/IsLogIn",
    };

    render(){
        return (
                <View style={{ flexDirection: 'column',}}>
                     <View style={styles.header}>
                         <TouchableOpacity
                         onPress={()=>this.props.navigation.goBack()}
                         >
                             <Text style={{fontSize:40,marginTop:-15,}}>×</Text>
                         </TouchableOpacity>
                         <Text style={{fontSize:20,fontWeight: '700',}}>登陆</Text>
                         <TouchableOpacity
                             activeOpcity={0.5}
                             onPress={()=>this.props.navigation.navigate('Register')}
                         >
                            <Text style={{fontSize:20,fontWeight: '700'}}>注册</Text>
                         </TouchableOpacity>
                     </View>
                     <View style={{
                         paddingTop:20,
                         alignSelf:'center', }}>
                          <Image source={require('../img/WB.jpg')}/>
                     </View>
                     <View style={styles.main}>
                        {/*用户邮箱文本框*/}
                            <TextInput style={styles.email}
                                // keyboardType={'number-pad'
                                clearButtonMode={'while-editing'}
                                placeholder={'用户邮箱'}
                                enablesReturnKeyAutomatically={true}
                                placeholderTextColor={'#C0C0C0'}
                                autoComplete={'off'}
                                       onChangeText={(email)=>this.setState({email})}
                                       value={this.state.email}
                                    />
                         {/*密码文本框*/}
                            <TextInput style={styles.password}
                                clearButtonMode={'while-editing'}
                                placeholder={'请输入密码'}
                                placeholderTextColor={'#C0C0C0'}
                                enablesReturnKeyAutomatically={true}
                                secureTextEntry={true}     //输入密码以原点方式显示
                                       onChangeText={(password)=>this.setState({password})}
                                       value={this.state.password}
                                 />
                                <TouchableOpacity
                                    style={styles.button}
                                    activeOpacity={0.5}
                                    onPress={() => this.submit()}>
                                    <Text style={{ color:'white',fontSize: 15, fontWeight:'bold', textAlign: 'center'}}>
                                            登录
                                    </Text>
                                </TouchableOpacity>
                        </View>
                    <View style={styles.txt}>
                            <Text>Copyright © 2018 Powered By 云顶书院 测试项目</Text>
                    </View>
                </View>
        );
    }

    submit=()=>{
        if (this.state.password===''||this.state.email===''){
            ToastAndroid.show('请确认您输入了正确的信息', ToastAndroid.SHORT);
        }
        // this.fetchData();
        ToastAndroid.show('正在核对信息，请稍后',ToastAndroid.SHORT);
        let params={"email":this.state.email,"password":this.state.password};
        this.submitData(params,this.props.navigation);
    };

    submitData=(params,navigation)=>{
        fetch(this.props.urlLogin, {
            method: "POST",
            mode: "cors",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded"
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(function (res) {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then(function (json) {
                    console.log(res+'JSON：'+json+'json.status:'+json.status+'json.userID'+json['userId']);
                    const status=json.status;
                    // const u_id=json.u_id;
                    const userId=json['userId'];
                    if(status==='1'){
                        DeviceStorage.update("Login",true);
                        // DeviceStorage.save("email",this.state.email);
                        // 存储用户ID
                        DeviceStorage.update('userId',userId);
                        Alert.alert(
                            '提示',
                            '登陆成功：用户ID为：'+userId+',返回值：'+status,
                            //点击返回到个人界面
                            [{text: '确定',onPress:()=>navigation.navigate('Mine')}]);
                    }
                    else if(status==='-1'){
                        Alert.alert(
                            '登陆失败：',
                            '没有此用户，请检查信息重试。返回值：'+status,
                            [{text: '确定'}]);
                    }
                    else if(status==='0'){
                        Alert.alert(
                            '登陆失败：',
                            '未知错误，返回值：'+status,
                            [{text: '确定'}]);
                    }
                    else{
                        Alert.alert(
                            '未知错误：',
                            '请联系管理员尝试登陆，value：'+status,
                            [{text: '确定'}]);
                    }
                });
            }
            else{
                Alert.alert('提示','请求失败',[{text: '确定'}]);
            }
        }).catch(function (e) {
            console.log("fetch fail");
            Alert.alert('提示','请求超时',[{text: '确定',},]);
        });
    }
}
const styles=StyleSheet.create({
    header:{
        alignSelf:'center',
        width:width-30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:10,
    },
    main:{
        alignSelf: 'center',
        height: 0.5*height ,
        width:width-80 ,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    email: {
        marginTop: 20,
        height: 0.1 * height,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: 'grey',
    },
    password:{
        marginTop:-50,
        height:0.1*height,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderWidth: 1,
        borderBottomColor:'grey',
    },
    button:{
        borderRadius:5,
        // alignItems: 'center',
        backgroundColor: '#ea824b',
        padding: 10,
        width:width-80 ,
        // alignSelf:'center',
    },
    txt:{
        marginTop:0.25*height,
        alignSelf:'center',
        flexDirection:'column-reverse',
        alignItems: 'flex-end'
    },


});