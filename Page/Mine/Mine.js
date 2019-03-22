import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    TouchableOpcity,
    StatusBar,
    Button,
    Alert
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


import Mydata from "./Mydata";
import Collect from "../Mine/Collect";
import Comment from "../Mine/Comment";
import Praise from "../Mine/Praise";
import Album from "../Mine/Album";
import Login from "../Mine/Login";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DeviceStorage from '../DeviceStorage'
import MaterialCommunityIcons from "../Home/HomeCell";

// import detailPage from "../Home/detailPage";
let {width,height} =  Dimensions.get('window');


export default class Mine extends Component {

    static defaultProps = {
        urlUserModify: "http://47.93.8.69:8080/SimpleWeibo_war_exploded/servlet/UserModify",
        head: "http://hbimg.b0.upaiyun.com/3a71ff0a6d169b7abe260682c74d48fdad4e5fab103b-JAhaNL_fw236",
        // head:"http://pic.51yuansu.com/pic3/cover/00/94/67/58dcd69ac0bf8_610.jpg",
    };

    constructor() {
        super();
        this.state = {
            data: {
                userName: "未登录",
                personality: "还没有签名哦",
            }
        }
    }

    componentWillMount(): void {
                //如果此时的后台数据库中存储的userName仍然为空的话，则将userId赋值给userName，此时的用户名与用户的初始ID相同
        //获取存储的userName
        DeviceStorage.get('userName').then((userName)=>{
                    //如果userName为空
                    if(userName==null||userName===''){
                        //再次获取存储的userId
                        DeviceStorage.get('userId').then((userId) => {
                            //如果userId也为空
                            if (userId == null || userId === ''){
                                console.log('"Mine" has not get userId: null');

                                //什么也不做，userName显示为：未登录
                            } else {
                                //如果有userId，则更新当前的userName
                                console.log('"Mine" has get userId:'+userId);

                                this.setState({
                                    // 获取到从Login保存的userId,并将其更新为Mine页面的userName
                                    data: {...this.state.data, userName: '用户'+userId}
                                });
                                //将userId存储给userName 以便以后调用
                                DeviceStorage.save('userName','用户'+userId);
                            }
                        });
                    }
                    else{
                        console.log('"Mine" has get userName:'+userName);
                        this.setState({
                            data:{...this.state.data,userName:userName}
                        })
                    }


        });
    }

    render() {
        //h获取当前登陆状态
        DeviceStorage.get('Login').then((Login) => {
            if (Login == null || Login === '') {
            } else {
                this.setState({
                    Login: Login,
                });
            }
        });

        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text style={styles.air}> </Text>
                    <Text style={styles.mine}>我的</Text>
                    {/*<Text >&#xe715;</Text>*/}
                    <AntDesign
                        name={'setting'}
                        size={20}
                        style={styles.icon1}
                    />
                </View>
                <View style={styles.personal}>
                    <TouchableOpacity
                        onPress={() => this.state.Login === false ? this.props.navigation.navigate('Login') : this.props.navigation.navigate('Mydata')}>
                        <View style={styles.people}>
                            <View style={styles.pic1}>
                                <Image source={require('../img/no-login.png')}
                                       style={styles.pic1_1}/>
                            </View>
                            <View style={styles.names}>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 16,
                                    marginBottom: 2
                                }}>{this.state.data.userName}</Text>
                                <Text style={{fontSize: 12}}>{this.state.data.personality}</Text>
                            </View>
                            {/*<Text style={styles.icon2}>&#xe625;</Text>*/}
                            <FontAwesome
                                name={'chevron-right'}
                                size={30}
                                style={{alignSelf: 'center'}}
                            />
                        </View>
                    </TouchableOpacity>
                    {/*<View style={styles.wire}> </View>*/}
                    <View style={styles.more}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: '#000'}}>234</Text>
                            <Text style={{fontSize: 12}}>微博</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: '#000'}}>345</Text>
                            <Text style={{fontSize: 12}}>关注</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: '#000'}}>134</Text>
                            <Text style={{fontSize: 12}}>粉丝</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.album}>
                    {/*<Text style={styles.icon3}>&#xe60e;</Text>*/}
                    <AntDesign
                        name={'picture'}
                        size={20}
                        style={styles.icon3}
                    />
                    <Text style={{marginLeft: 10}}>我的相册</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Album',{userId:this.state.userId})}>
                        <FontAwesome
                            name={'angle-right'}
                            size={15}
                            style={styles.icon4}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.aboutme}>
                    {/*<Text style={styles.icon5}>&#xe6a4;</Text>*/}
                    <FontAwesome
                        name={'commenting-o'}
                        size={20}
                        style={styles.icon5}
                    />

                    <Text style={{marginLeft: 10}}>我的评论</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment',{userId:this.state.userId})}>
                        <FontAwesome
                            name={'angle-right'}
                            size={15}
                            style={styles.icon4}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.aboutme}>
                    {/*<Text style={styles.icon6}>&#xe68d;</Text>*/}
                    <FontAwesome
                        name={'star-o'}
                        size={20}
                        style={styles.icon6}
                    />
                    <Text style={{marginLeft: 10}}>我的收藏</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Collect',{userId:this.state.userId})}>
                        <FontAwesome
                            name={'angle-right'}
                            size={15}
                            style={styles.icon4}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.aboutme}>
                    {/*<Text style={styles.icon7}>&#xe7a2;</Text>*/}
                    <FontAwesome
                        name={'thumbs-o-up'}
                        size={20}
                        style={styles.icon7}
                    />
                    <Text style={{marginLeft: 10}}>我的点赞</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Praise',{userId:this.state.userId})}>
                        <FontAwesome
                            name={'angle-right'}
                            size={15}
                            style={styles.icon4}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.album}>

                    <SimpleLineIcons
                        name={'note'}
                        size={20}
                        style={styles.icon8}
                    />
                    <Text style={{marginLeft: 10}}>我的草稿</Text>
                    <FontAwesome
                        name={'angle-right'}
                        size={15}
                        style={styles.icon4}
                    />
                </View>
                <View style={styles.aboutme}>
                    <AntDesign
                        name={'customerservice'}
                        size={20}
                        style={styles.icon9}
                    />
                    <Text style={{marginLeft: 10}}>客服中心</Text>
                    <FontAwesome
                        name={'angle-right'}
                        size={15}
                        style={styles.icon4}
                    />
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f3f3f5',
    },
    navigation:{

        width:width,
        height: 0.08*height,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    air:{
        width:37,
    },
    mine:{
        fontSize:20,
        // color:'#000',
        fontWeight: 'bold'
    },
    icon1:{
        fontFamily:'iconfont',
        color:'#000',
        fontSize: 17,
        marginRight: 10,
    },
    personal:{
        marginTop: 10,
        backgroundColor:'#fff',
        width:width,
        height:130,
    },
    people:{
        width:width,
        height:77,
        flexDirection:'row',
    },
    pic1:{
        // backgroundColor:'#000',
        width:0.2*width,
        height:60,
        marginTop:8,
        marginLeft: 26,
    },
    pic1_1:{
        width:60,
        height:60
    },
    names:{
        width:0.6*width,
        height:77,
        marginLeft: 10,
        justifyContent: 'center'
    },
    icon2:{
        fontFamily:'iconfont',
        fontSize: 26,
        marginLeft:10,
        marginTop: 24,
    },
    wire:{
        backgroundColor:'#000',
        width:0.8*width,
        height:2,
    },
    more:{
        marginTop:4,
        flexDirection:'row',
        height:47,
        justifyContent:'space-around'
    },
    album:{
        marginTop:10,
        marginBottom:10,
        backgroundColor:'#fff',
        height:40,
        flexDirection:'row',
        alignItems: 'center'
    },
    icon3:{
        color:'#a4dd96',
        marginLeft:20,
        fontFamily:'iconfont',
        fontSize: 17,
    },
    icon4:{
        fontSize: 26,
        marginLeft:242,
    },
    aboutme:{
        backgroundColor:'#fff',
        height:40,
        flexDirection:'row',
        alignItems: 'center'
    },
    icon5:{
        color:'#efb669',
        marginLeft:20,
        fontFamily:'iconfont',
        fontSize: 17,
    },
    icon6:{
        color:'#d7b9b1',
        marginLeft:20,
        fontFamily:'iconfont',
        fontSize: 17,
    },
    icon7:{
        color:'#eb9d9c',
        marginLeft:20,
        fontFamily:'iconfont',
        fontSize: 17,
    },
    icon8:{
        color:'#d7b9b1',
        marginLeft:20,
        fontFamily:'iconfont',
        fontSize: 17,
    },
    icon9:{
        color:'#a4dd96',
        marginLeft:20,
        fontFamily:'iconfont',
        fontSize: 17,
    },
});
