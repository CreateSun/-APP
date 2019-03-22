/**
在tabbar文件中被调用     这个是首页的头部以及每一个帖子板块的样式

 http://192.168.43.74:8080/SimpleWeibo_war_exploded/servlet/GetIdentifyingCode
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    ToastAndroid,
    Image,
    TouchableOpacity,
    Text,
    View, Dimensions,
    TouchableNativeFeedback, Alert,
} from 'react-native';
let {height,width} =  Dimensions.get('window');
import Write from './Write'

import detailPage from './detailPage'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import {withNavigation} from "react-navigation";
import DeviceStorage from "../DeviceStorage";

export class _renderItem extends  Component{

    static defaultProps={
        urlAddGreat:"http://192.168.43.107:8081/SimpleWeibo_war_exploded/servlet/BlogServlet",
        urlTransmit:"http://192.168.43.107:8081/SimpleWeibo_war_exploded/servlet/Transmit",
    };

    constructor(props){
        super(props);
        this.state={
            upState:this.props.upState,
            up:this.props.up,
            collect:this.props.collect,
            id:this.props.id,
        }
    }

    up=(upState,up)=>{
        if(upState===false){
            //更改状态值
            this.setState({
                up:up+1,
                upState:true,
            });
            ToastAndroid.show('点赞成功',ToastAndroid.SHORT);
            console.log('success');
            let params={
                "action": "addGreat",
                "blog": {
                    "id":this.state.id ,
                }
            };
            fetch(this.props.urlAddGreat,{
                method: "POST",
                mode: "cors",
                headers: {
                    // "Content-Type": "application/x-www-form-urlencoded"
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }).then(function (res) {
                if(res.ok){
                    ToastAndroid.show('提交点赞数据成功',ToastAndroid.SHORT);
                    console.log('submitUpSuccess');
                }
                else{
                   ToastAndroid.show('提交失败',ToastAndroid.SHORT);
                    console.log('submitUpError');
                }
            }).catch(function (e){
                ToastAndroid.show('请求超时',ToastAndroid.SHORT);
                console.log('submitUpTimeOut');
            });
        }
        else{
            ToastAndroid.show('请勿重复点赞',ToastAndroid.SHORT)
        }
    };

    collect=(collect)=>{
      if(collect===true){
          this.setState({
              collect:false
          });
          ToastAndroid.show('取消收藏成功',ToastAndroid.SHORT)
      }
      else if(collect===false){
          this.setState({
              collect:true
          });
          DeviceStorage.get('userId').then((userId)=>{
                  if(userId==null||userId===''){
                  }
                  else{
                      this.setState({
                          userId:userId,
                      })
                  }
              }
          );
          let params={
              "action": "addFavorite",
              "blog": {
                  "u_id":this.state.userId,
                  "id": this.state.id,
              }};
          fetch(this.props.urlAddGreat, {
              method: "POST",
              mode: "cors",
              headers: {
                  // "Content-Type": "application/x-www-form-urlencoded"
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(params)
          }).then(function (res) {
              if(res.ok){
                  ToastAndroid.show('收藏成功',ToastAndroid.SHORT);
                  console.log('submitCollectSuccess');
              }
              else{
                  ToastAndroid.show('提交失败',ToastAndroid.SHORT);
                  console.log('submitCollectError');
              }
          }).catch(function (e){
              ToastAndroid.show('请求超时',ToastAndroid.SHORT);
              console.log('submitCollectTimeOut');
          });
      }
    };

    share=()=>{
        DeviceStorage.get('userId').then((userId)=>{
                if(userId==null||userId===''){
                }
                else{
                    this.setState({
                        userId:userId,
                    })
                }
            }
        );
        let params={
            "users": {
                "id": this.state.userId,
                "userName": this.state.userName,
            },
            "blog": {
                "id": this.props.id,
            }
        };
        fetch(this.props.urlTransmit, {
            method: "POST",
            mode: "cors",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded"
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }).then(function (res) {
            if(res.ok){
                let status=res.status;
                ToastAndroid.show('转发成功,'+status,ToastAndroid.SHORT);
                console.log('submitShareSuccess');
            }
            else{
                ToastAndroid.show('转发失败',ToastAndroid.SHORT);
                console.log('submitShareError');
            }
        }).catch(function (e){
            ToastAndroid.show('请求超时',ToastAndroid.SHORT);
            console.log('submitShareTimeOut');
        });
    };

    render(){
        return(
            <View style={{backgroundColor: '#fff', paddingLeft: 5}}>
                {/*头像，ID，时间，下拉箭头*/}
                <View style={styles.header}>
                    {/*左右布局   左边头像,ID，时间   右边向下箭头*/}
                    <View style={styles.left}>
                        <View style={{height:40,width:40,borderRadius:30,}}>
                            <Image source={{uri: this.props.head}} style={styles.head}/>
                        </View>
                        <View style={styles.NameTime}>
                            {/*ID，时间*/}
                            <Text style={{fontSize: 18,color:'#000'}}>{this.props.name}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 15}}>{this.props.time1}:{this.props.time2}</Text>
                            </View>
                        </View>
                    </View>
                    {/*向下箭头*/}
                    <View style={{paddingTop: 10}}>
                        <TouchableOpacity>
                            <Image source={require('../img/down.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*文案主体部分*/}
                <TouchableOpacity
                    onPress={()=>this.props.navigation('detail',{
                        name:this.props.name,
                        userID:this.props.userID,
                        txt:this.props.txt,
                        time1:this.props.time1,
                        time2:this.props.time2,
                        head:this.props.head,
                    })}
                >
                    <View style={styles.txt}>
                        <Text style={{color:'#000',lineHeight: 25}}>{this.props.txt}</Text>
                    </View>
                </TouchableOpacity>
                {/*图片上传先放着不会写*/}
                {/*点赞  转发一系列按钮*/}
                <View style={styles.icon}>
                    <View style={styles.out}>
                        <TouchableOpacity
                            ActiveOpcity={0.5}
                            onPress={()=>this.collect(this.state.collect)}
                        >
                            <FontAwesome
                                name={this.state.collect===true?'star':'star-o'}
                                size={20}
                                style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft:4}}>
                            <Text >{this.state.collect===true?'已收藏':'收藏'}</Text>
                        </View>
                    </View>
                    <View style={styles.in}>
                        <TouchableOpacity
                            ActiveOpcity={0.5}
                        >
                            <EvilIcons
                                name={'share-apple'}
                                size={30}
                                style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft:4}}>
                            <Text >分享</Text>
                        </View>
                    </View>
                    <View style={styles.in}>
                        <TouchableOpacity
                            ActiveOpcity={0.5}
                            onPress={()=>this.props.navigation('detail',{
                                name:this.props.name,
                                userID:this.props.userID,
                                txt:this.props.txt,
                                time1:this.props.time1,
                                time2:this.props.time2,
                                head:this.props.head,
                            })}
                        >
                            <MaterialCommunityIcons
                                name={'comment-processing-outline'}
                                size={20}
                                style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft:4}}>
                            <Text
                                onPress={()=>this.props.navigation('detail',{
                                    name:this.props.name,
                                    userID:this.props.userID,
                                    txt:this.props.txt,
                                    time1:this.props.time1,
                                    time2:this.props.time2,
                                    head:this.props.head,
                                })}
                            >评论</Text>
                        </View>
                    </View>
                    <View style={styles.out}>
                        <TouchableOpacity
                            ActiveOpcity={0.5}
                            //将item中的初始状态传入up()
                            onPress={()=>this.up(this.state.upState,this.state.up)}
                        >
                            <FontAwesome
                                //判断图标显示样式
                                name={this.state.upState===true?'thumbs-up':'thumbs-o-up'}
                                size={20}
                                style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft:4}}>
                            {/*//从state中获取点赞数量*/}
                            <Text>{this.state.up}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default class HomeCell extends Component{

    static defaultProps = {
        BlogServlet: 'http://rap2api.taobao.org/app/mock/149021/example/1551180790031',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],//存储列表使用的数据
            refreshing: false,//当前的刷新状态
            //初始化状态值

        };
        // this.state=HomeCell.getView.up.bind(this)
    }
    static navigationOptions = {
       header:null
        };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={(item,index)=>this._renderItem(item)}
                    ListHeaderComponent={this.header}
                    ItemSeparatorComponent={this.ItemDivideComponent}
                    ListEmptyComponent={this.ListEmptyComponent}
                    //指定为GridView效果，需要下面两个属性同时设置，且numColumns必须大于1
                    // numColumns={2}
                    // columnWrHomeCellerStyle={{borderWidth: 2, borderColor: 'black'}}
                    //下拉刷新，必须设置refreshing状态
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    //上拉加载
                    // onEndReachedThreshold={0}
                    // onEndReached={this.onEndReached}
                />
            </View>
        );
    }


    _renderItem=({item,index})=>{
        return <_renderItem navigation={this.props.navigation.navigate}
                            item={item}
                            collect={item.collect}
                            txt={item.txt}
                            time1={item.time1}
                            time2={item.time2}
                            head={item.head}
                            up={item.up}
                            upState={item.upState}
                            name={item.name}
                            id={item.id}
        />
        };
    /**
     * 给列表设置id
     * @param item
     * @param index
     */
    // keyExtractor = (item, index) => item.id;
    keyExtractor=(item,index) => index.toString();
    /**
     * 头布局
     */
    header = () => {
        return(
            <View>
                <View style={{
                    padding:10,
                    height: 0.08*height,
                    width: width,
                    backgroundColor:'#fff',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                }}>
                    <Image source={require('../img/white(38.38).png')}  />
                    <Text style={{fontSize:20,fontWeight: 'bold'}}>全部</Text>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={() => this.props.navigation.navigate('Write')}
                    >
                        <Image source={require('../img/add.png')}  />
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#d6d6d6',height:0.015*height}}/>
            </View>
        )
    };
    /*每一个item容器之间的间隔*/
    ItemDivideComponent = () => {
        return(
                <View style={{backgroundColor:'#d6d6d6',height:0.015*height}}/>
        )
    };

    ListEmptyComponent = () => {
        return(
            <View style={{
                justifyContent:'center',
                alignItems: 'center',
                marginTop:0.3*height,

            }}>
                <Text style={{color:'#757374',fontSize:25,textAlign: 'center'}}>
                   稍等稍等正在路上
                </Text>
                <Text style={{color:'#757374',fontSize:30,textAlign: 'center'}}>
                    ( ´･･)ﾉ(._.`)
                </Text>
            </View>
        )
    };
    count = 0;//下拉刷新的次数
    /**
     * 下拉刷新属性
     */
    onRefresh = () => {
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
        });
        //延时加载
        const timer = setTimeout(() => {
            clearTimeout(timer);
            //往数组的第一位插入数据，模拟数据新增 , unshift()会返回数组的长度
            //this.state.data.unshift(new this.ItemData('https://pic2.zhimg.com/v2-8f11b41f995ca5340510c1def1c003d1.jpg',
            //'下拉刷新添加的数据——————' + this.count, 300));
            //重新调用加载函数
                this.getMainData();
            ToastAndroid.show('刷新成功', ToastAndroid.SHORT);
            this.count++;
            this.setState({
                refreshing: false,
            });
        }, 2000);
    };
    /**
     * 上拉加载
     * 2017.10.23 11:03 还有一些问题
     */
    // onEndReached = (info: { distanceFromEnd: number }) => {
    //     ToastAndroid.show('正在加载中...', ToastAndroid.SHORT);
    // };

    /**
     * json 数据实体类
     */
      ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
    }
//fetch "get"方法 获取数据
    getMainData(){
        fetch(this.props.BlogServlet)
            .then((response) => response.json())
            .then((response) => {
                //解析json数据
                let json = response['stories'];
                //更新状态机
                this.setState({
                    data: json,
                });
            })
            .catch((error) => {
                if (error) {
                    //网络错误处理
                    console.log('error', error);
                }
            });
    }

    //渲染完成，请求网络数据
    componentDidMount() {
        this.getMainData();
        DeviceStorage.get('userId').then((userId)=>{
            if(userId===''||userId==null){
            }
            else{
                this.setState({
                    userId:userId,
                })
            }
        })
    }
}

const styles=StyleSheet.create({
     header: {
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        padding:10,
    },
    head:{
        height:40,
        width:40,
       marginRight: 10,
        borderRadius: 100,
    },
    left:{
        width:0.4*width,
        alignItems:'center',
        // justifyContent:'space-between',
        flexDirection:'row',
    },
    NameTime: {
         paddingLeft:10,
        flexDirection:'column',
        alignSelf:'flex-start',
    },
    txt: {
        lineHeight:20,
        paddingTop:20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight:10,
    },
    icon: {
        height:0.075*height,
        flexDirection:'row',
        width:width,
        justifyContent:'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: 'grey',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopWidth: 0.5,
        borderBottomColor:'grey'
    },
    in:{
         flexDirection:'row',
        justifyContent:'center',
        flexWrap:'nowrap',
        alignItems:'center',
        height:0.04*height,
        width:0.25*width,
        borderTopColor: 'transparent',
        borderLeftColor: 'grey',
        borderRightColor: 'grey',
        borderWidth: 0.5,
        borderBottomColor:'transparent'
    },
    out: {
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'nowrap',
        alignItems:'center',
        width:0.25*width,
        height:0.04*height,
        borderColor:'transparent',
    },
});
