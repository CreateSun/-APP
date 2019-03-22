import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput, ToastAndroid, Alert,
} from 'react-native';
import AntDesign from "./Mine";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import DeviceStorage from "../DeviceStorage";
let {width,height} =  Dimensions.get('window');


export default class Mydata extends Component{

    static defaultProps={
        urlSubmitData:"http://192.168.43.107:8081/SimpleWeibo_war_exploded/servlet/UserModify",
    };

    componentDidMount(): void {
        //yemian页面加载阶段，获取用户的ID   命名为u_id
        DeviceStorage.get('userId').then((userId)=>{
            if(userId == null || userId === ''){
                console.log('Mydata has not get userId: null');
            } else {
                console.log('Mydata has get userId:'+userId);
                this.setState({
                    userId:userId,
                });
                //使用u_id去获取用户的信息
                this.getData();
            }
        });

    }

    constructor(props){
        super(props);
        this.state={
            edit:false,
            data:{
                userName:'暂无',
                nickName:'暂无',
                sex:'暂无',
                place:'暂无',
                birthday:'暂无',
                personality:'暂无',
                date:'暂无',
                email:'暂无',
                qq:'暂无',
                tags:['暂无'],
                school:'暂无',
            },
        }
    }

    edit=()=>{
        if(this.state.edit===false){
            this.setState({edit:true})
        }
        else if(this.state.edit===true){
            this.setState({edit:false});
            let params={
                "image":'',
                "id":this.state.u_id,
                "nickName":this.state.data.nickName,
                "sex":this.state.data.sex,
                "place":this.state.data.place,
                "birthday":this.state.data.birthday,
                "autograph":this.state.data.personality,
                "date":this.state.data.date,
                "email":this.state.data.email,
                "qq":this.state.data.qq,
                "tags":this.state.data.tags,
                "graduateFrom":this.state.data.school,
            };
            this.submit(params);
        }
    };

    submit=(params)=>{
        fetch(this.props.urlSubmitData, {
            method: "POST",
            mode: "cors",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded"
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(function (response) {
            if(response.ok){
                console.log('SubmitMydata is success!')
            }
        }).catch(function (error) {
            console.log('submitMydata is false! The error is'+error)
        })
    };

    getData=()=>{
        let id=this.state.userId;
        fetch(this.props.urlSubmitData, {
            method: "POST",
            mode: "cors",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded"
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }).then( (response)=>response.json())
            .then((response)=>{
                if(response){
                    let nickName=    response['nickName'];
                    let autograph=   response['autograph'];
                    let email=       response['email'];
                    let graduateFrom=response['graduateFrom'];
                    let image=       response['image'];
                    let place=       response['place'];
                    let qq=          response['qq'];
                    let sex=         response['sex'];
                    let tags=        response['tags'];
                    let birthday=    response['birthday'];
                    this.setState({
                        nickName:nickName,
                        personality:autograph,
                        email:email,
                        school:graduateFrom,
                        image:image,
                        palce:place,
                        qq:qq,
                        sex:sex,
                        tags:tags,
                        birthday:birthday,
                    });
                    this.setState({

                    });
                    ToastAndroid.show('获取成功/'+response,ToastAndroid.SHORT);
                }
            })
            .catch(function (error) {
            ToastAndroid.show('网络错误/'+error,ToastAndroid.SHORT)
        })
    };

    // changePersonality=()=>{
    //
    // };
    render() {
        // const navigate=this.props.navigation;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={{
                    padding:10,
                    height: 0.08*height,
                    width: width,
                    backgroundColor:'#fff',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                }}>
                    <View>
                        <TouchableOpacity
                            style={{alignSelf:'center'}}
                            onPress={()=>this.props.navigation.goBack()}
                        >
                            <Feather
                                name={'arrow-left'}
                                size={30}
                                style={{fontWeight:'bold',alignSelf:'center'}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={{fontSize:20,fontWeight: 'bold',}}>我的资料</Text>
                    </View>
                    <View >
                        <TouchableOpacity
                            // style={{alignSelf:'center',fontSize:20}}
                            onPress={()=>this.edit()}
                        >
                            <Text style={{fontSize:20,fontWeight: 'bold',}}>{this.state.edit===true?'提交':'编辑'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                     <View style={styles.dates}>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>头像</Text>
                            <Image source={require('../img/photo.jpg')}
                                   style={styles.pic1}
                            />

                        </View>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>昵称</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(nickName)=>this.setState({data:{...this.state.data,nickName}})}
                                       value={this.state.data.nickName}
                                       editable={this.state.edit !== false}
                            />

                        </View>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>姓名</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(userName)=>this.setState({data:{...this.state.data,userName}})}
                                       value={this.state.data.userName}
                                       editable={this.state.edit !== false}
                            />
                        </View>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>性别</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(sex)=>this.setState({data:{...this.state.data,sex}})}
                                       value={this.state.data.sex}
                                       editable={this.state.edit !== false}
                            />

                        </View>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>所在地</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(place)=>this.setState({data:{...this.state.data,place}})}
                                       value={this.state.data.place}
                                       editable={this.state.edit !== false}
                            />
                        </View>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>生日</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(birthday)=>this.setState({data:{...this.state.data,birthday}})}
                                       value={this.state.data.birthday}
                                       editable={this.state.edit !== false}
                            />

                        </View>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>签名</Text>
                            <TextInput
                                onChangeText={(personality)=>this.setState({data:{...this.state.data,personality}})}
                                style={{width:230,marginLeft:70,fontSize:14,textAlign: 'right'}}
                                editable={this.state.edit !== false}
                                value={this.state.data.personality}


                            />
                            {/*<MaterialCommunityIcons*/}
                                {/*name={this.state.edit===true?'pencil':'pencil-lock'}*/}
                                {/*size={20}*/}
                                {/*style={{paddingVertical:3,color:this.state.edit===true?'#EA824B':'#aaacae'}}*/}
                                {/*// onPress={()=>this.changePersonality()}*/}
                            {/*/>*/}
                        </View>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>注册时间</Text>
                            <Text style={{width:290,fontSize:14,textAlign: 'right'}}>{this.state.data.date}</Text>
                        </View>
                    </View>
                    <View style={styles.contact}>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>邮箱</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(email)=>this.setState({data:{...this.state.data,email}})}
                                       value={this.state.data.email}
                                       editable={this.state.edit !== false}
                            />

                        </View>
                        <View style={styles.date}>
                        <Text style={{color:'#000',fontSize:14}}>QQ</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(qq)=>this.setState({data:{...this.state.data,qq}})}
                                       value={this.state.data.qq}
                                       editable={this.state.edit !== false}
                            />
                    </View>
                    </View>
                    <View style={styles.contact}>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>本科</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(school)=>this.setState({data:{...this.state.data,school}})}
                                       value={this.state.data.school}
                                       editable={this.state.edit !== false}
                            />
                        </View>
                    </View>
                    <View style={styles.contact}>
                        <View style={styles.date}>
                            <Text style={{color:'#000',fontSize:14}}>标签</Text>
                            <TextInput style={{width:300,fontSize:14,textAlign: 'right'}}
                                       onChangeText={(tags)=>this.setState({data:{...this.state.data,tags}})}
                                       value={this.state.data.tags}
                                       editable={this.state.edit !== false}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f3f3f5',
    },
    navigation: {
        width: width,
        height: 36,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon1:{
        marginLeft:10,
        fontFamily:'iconfont',
        fontSize: 16,
    },
    myDate:{
        fontSize: 20,
    },
    dates:{
        width:width,
        height:400,
        backgroundColor:'#fff',
        marginTop: 10,
    },
    date:{
        width:0.9*width,
        height:50,
        borderBottomColor:'#f3f3f5',
        flexDirection:'row',
        alignItems: 'center',
        marginLeft: 20,
        color: '#f3f3f5',
        borderWidth: 1,
        borderTopColor:'transparent',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
    },
    pic1:{
        width:40,
        height:40,
        marginLeft:260
    },
    icon2:{
        marginLeft:4,
        fontSize:24,
    },
    contact:{
        width:width,
        backgroundColor:'#fff',
        marginTop: 10,
    }
});
