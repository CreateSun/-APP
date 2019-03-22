import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';

var {height,width} =  Dimensions.get('window');
export default class Register extends Component {
    static defaultProps={
        //服务器端口
        // "http://47.93.8.69:8080/SimpleWeibo_war_exploded/servlet/Register"

        //个人端口
        // let url='';
        // http://47.93.8.69:8080/SimpleWeibo_war_exploded/servlet/GetIdentifyingCode
        urlRegister:'http://192.168.43.107:8081/SimpleWeibo_war_exploded/servlet/Register',
        urlGetIdentifyingCode:'http://192.168.43.107:8081/SimpleWeibo_war_exploded/servlet/GetIdentifyingCode'
};
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            code:'',
            nextPassword:'',
        };
    }
    render() {
        return (
            <View>
                {/*顶部样式*/}
                <View style={styles.Top}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>this.props.navigation.goBack()}
                    >
                        <Image source={require('../img/left.png')}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20,color:'#000',}}>注册</Text>
                    <Image source={require('../img/white(38.38).png')}  />
                </View>
                {/*注册文本框*/}
                <View style={styles.container}>
                    {/*发送验证码按钮*/}
                <View style={styles.form1}>
                    {/*这是手机号码*/}
                    <TextInput style={styles.Email}
                        // onChangeText={(text) => this.setState({text})}
                               placeholder={'请输入电子邮箱'}
                               placeholderTextColor={'#C0C0C0'}
                               onChangeText={(email)=>this.setState({email})}
                               value={this.state.email}
                    />
                    {/*这是发送邮箱验证码按钮*/}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{paddingBottom:10,height:35,width:90,alignItems:'center',flexDirection:'column-reverse'}}
                        onPress={()=>this.verify()}
                    >
                        <Text style={{fontSize:13,color:'#ea824b',}}> 发送验证码 </Text>
                    </TouchableOpacity>
                </View>
                {/*验证码输入框*/}
                <TextInput  style={styles.input}
                            placeholder={'请输入邮箱验证码'}
                            placeholderTextColor={'#C0C0C0'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(code)=>this.setState({code})}
                            value={this.state.code}
                />
                {/*这是密码输入框*/}
                <TextInput
                            style={styles.input}
                            placeholder={'请输入密码'}
                            placeholderTextColor={'#C0C0C0'}
                            secureTextEntry={true}//隐藏输入内容
                            underlineColorAndroid={'transparent'}
                            onChangeText={(password)=>this.setState({password})}
                            value={this.state.password}
                />
                {/*密码确认*/}
                    <TextInput
                        style={styles.input}
                        placeholder={'请再次输入以确定密码'}
                        placeholderTextColor={'#C0C0C0'}
                        secureTextEntry={true}//隐藏输入内容
                        underlineColorAndroid={'transparent'}
                        onChangeText={(nextPassword)=>this.setState({nextPassword})}
                        value={this.state.nextPassword}
                    />
                   {/*定义按钮的属性以及样式*/}
                    {/*定义按钮属性 如果输入的 文本框有任何一个为空 则弹出警告*/}
                    {/*定义提交信息*/}
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.button}
                    onPress={()=>this.submit()}
                >
                    <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}> 注册 </Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
    //全部数据的提交
    submit(){
        if (this.state.password!==this.state.nextPassword){
            ToastAndroid.show('请确认您两次输入的密码相同！', ToastAndroid.SHORT);
        }
        else if(this.state.password===''||this.state.nextPassword===''){
            ToastAndroid.show('密码栏不呢为空！', ToastAndroid.SHORT);
        }
        else{
            ToastAndroid.show('提交中，请稍后！', ToastAndroid.SHORT);
            let params={
                "action": "register",
                "code": this.state.code,
                "users": {
                    "password": this.state.password,
                    "email": this.state.email,
                }
            };
            this.submitData(params);
        }
        // this.fetchData();

    }
    submitData(params){
        fetch(this.props.urlRegister, {
            method: "POST",
            mode: "cors",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded"
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }).then(function (res) {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then(function (json) {
                    const status=json.status;
                    console.info(json);
                    //
                    if(status==='1'){
                        Alert.alert(
                            '提示',
                            '注册成功,点击返回注册界面，返回值：'+status,
                            [{text: '确定',onPress:this.props.navigation.goBack()}]);
                    }
                    else if(status==='-1'){
                        Alert.alert(
                            '注册失败：',
                            '邮箱已经注册，返回值：'+status,
                            [{text: '确定'}]);
                    }
                    else if(status==='0'){
                        Alert.alert(
                            '注册失败：',
                            '验证码错误，返回值：'+status,
                            [{text: '确定'}]);
                    }
                    else{
                        Alert.alert(
                            '未知错误：',
                            '请联系管理员尝试注册，value：'+status,
                            [{text: '确定'}]);
                    }
                    });
                }
            else{
                Alert.alert('提示','请求失败',[{text: '确定', onPress: () => console.log('OK Pressed!')},]);
            }
        }).catch(function (e) {

            Alert.alert('提示','请求超时',[{text: '确定', onPress: () => console.log('OK Pressed!')},]);
        });
    }
    //验证码请求函数
    verify(){
        if (this.state.email==='') {
            ToastAndroid.show('请确认已经输入了正确的信息', ToastAndroid.SHORT);
        }
        // 调用网络请求
        let params={"email":this.state.email};
        this.fetchData(params);
    }
    fetchData(params) {
        // let url='http://47.93.8.69:8080/SimpleWeibo_war_exploded/servlet/GetIdentifyingCode';
        fetch(this.props.urlGetIdentifyingCode, {
        //fetch("", {
            method: "POST",
            mode: "cors",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded"
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(function (res) {
            ToastAndroid.show("fetch request "+JSON.stringify(res.ok),ToastAndroid.SHORT);
            if(res.ok){
                Alert.alert(
                    '提示',
                    '发送成功！',
                    [{text: '确定', onPress: () => console.log('OK Pressed!')},]);
            }else{
                Alert.alert('提示','请求失败',[{text: '确定'}]);
            }
        }).catch(function (e) {
            console.log("fetch fail");
            Alert.alert('提示','系统错误',[{text: '确定'},]);
        });
    };

}


const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        flexDirection: 'column',
        // justifyContent: 'center'
    },
    form1:{
        flexDirection: 'row',
    },
    Top: {
        padding:10,
        height: 0.08*height,
        width: width,
        backgroundColor:'#fff',
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ea824b',
        padding: 10,
        width:300,
        marginTop: 10,
        borderRadius: 5,
        alignSelf:'center',
    },
    iconStyle: {
        marginTop:6,
        marginLeft:6,
        color: '#666666',
        fontFamily:'iconfont',
        fontSize: 20,
    },
    input: {
        width: 300,
        padding:0,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderColor: '#dadada',
        borderWidth: 1,
        fontSize:13,
        alignSelf:'center',
        marginBottom: 20,
    },
    Email:{
        width: 200,
        padding:0,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderColor: '#dadada',
        borderWidth: 1,
        fontSize:13,
        marginLeft:44,
        marginBottom: 20,
    },
    verify:{
        alignItems: 'center',
        width:100,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderColor: '#dadada',
        borderWidth: 1,
        marginBottom: 20,
    },
});
