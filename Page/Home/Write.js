import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
} from 'react-native';
import DeviceStorage from "../DeviceStorage";
var {height,width} =  Dimensions.get('window');
export default class Write extends Component {
    static navigationOptions={
        tabBarVisible:null,
    };

    static defaultProps={
        urlSubmitData:"http://192.168.43.107:8081/SimpleWeibo_war_exploded/servlet/BlogServlet",
    };

    componentDidMount(): void {
        DeviceStorage.get('Login').then((Login)=>{
            if(Login ===false || Login === ''){
                ToastAndroid.show('用户未登陆',ToastAndroid.SHORT);
                console.log('LoginState is false')
            } else {
                this.setState({
                    Login:true,
                });
                DeviceStorage.get('userId').then((userId)=>{
                    if(userId == null || userId === ''){
                        console.log('getUserId False');
                    }
                     else {
                        this.setState({
                            userId:userId,
                        });
                    }
                });
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            text:'',
        };
    }

    cauculateHeight(e) {
        const height = e.nativeEvent.contentSize.height > 30 ? e.nativeEvent.contentSize.height : this.state.height;
        this.setState({height});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {/*//文本输入框*/}
                <TouchableOpacity
                    activeOpacity = {1}
                    style = {styles.inputContainer}
                    onPress = {() => this.TextInput.focus()}
                >
                        <TextInput
                            placeholder={'写点什么吧'}
                            placeholderTextColor={'#C0C0C0'}
                            underlineColorAndroid={'transparent'}
                            multiline={true}
                            onChangeText={(text)=>this.setState({text})}
                            ref = {textInput => this.TextInput = textInput}
                            onContentSizeChange = {e => this.cauculateHeight(e)}
                            style = {{paddingVertical: 0, paddingLeft: 5, fontSize: 16,maxHeight: 0.2*height,height: this.state.height}}
                        />
                </TouchableOpacity>
                <View style={styles.upload}>
                    <TouchableOpacity
                        ActiveOpcity={0.5}
                    >
                        <Image source={require('../img/add.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.submit}
                        ActiveOpacity={0.5}
                        onPress={()=>{this.submitText()}}
                    >
                        <Text style={{fontSize:20}}>提交</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    submitText=()=> {
        let params = {
            "action":"addBlog",
            "blog":{
                "content":this.state.text,
                "userName":this.props.nickName,
                // 昵称就是用户名ｕｓｅｒＮａｍｅ
                "orgin":this.state.userId,
                "u_id":this.state.userId,
                "image":["#"],
                "title":this.state.text.substring(1,6)
            }
        };
        // let state=this.props.state;
        if (this.state.text === ''){
            Alert.alert(
                '提交错误',
                '文本框不能为空',
                [
                    {text: '知错了'},
                ],
            )
        }
        else if(this.state.Login!==true){
            Alert.alert(
                '提交错误',
                '请先登陆您的账号',
                [
                    {text: '知错了'},
                    {text: '前往登陆',onPress:()=>this.props.navigation.navigate('Login')}
                ],
            );
        }
        else{
            // 提交输入的文字以及图片
            this.submitData(params);
        }
    };

    submitData(params){
        // let url='http://192.168.43.74:8080/SimpleWeibo_war_exploded/servlet/Register';
        fetch(this.props.urlSubmitData,{
            method: "POST",
            mode: "cors",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded"
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(function (res) {
            if(res.ok){
                ToastAndroid.show("提交成功",ToastAndroid.SHORT)
            }
            else{
                Alert.alert('提示','请求失败',[{text: '确定'},]);
            }
        }).catch(function (e) {
            Alert.alert('提示','请求超时',[{text: '确定'},]);
        });
    }

}


const styles = StyleSheet.create({
    inputContainer:{
        // alignItems:'center',
        alignSelf:'center',
        borderWidth:1,
        borderColor:'#b8babc',
        width:0.98*width,
        height:0.2*height,
        borderRadius:5,
    },
    upload:{
      paddingTop:20,
      paddingLeft:10,
      paddingRight:10,
      justifyContent:'space-between',

    },
    submit:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ea824b',
        width:0.2*width,
        height:35,
        textAlign:'center',
        borderRadius:5,
    }

});