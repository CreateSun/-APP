import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    ToastAndroid,
    Image,
    TouchableOpacity,
    Text,
    View, Dimensions,
    TouchableNativeFeedback, ScrollView,
} from 'react-native';
let {height,width} =  Dimensions.get('window');
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
export default class HomeCell extends Component {
    static defaultProps = {
        url: 'http://rap2api.taobao.org/app/mock/149021/example/1551785690831',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],//存储列表使用的数据
            refreshing: false,//当前的刷新状态
        };
        // this.props=HomeCell.getView.props.navigation.bind(this)
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={HomeCell.getView}
                    ListHeaderComponent={this.header}
                    ListEmptyComponent={this.ListEmptyComponent}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                />
            </View>
        );
    }

    //拉取评论列表时的
    ListEmptyComponent = () => {
        return(
            <View style={{
                justifyContent:'center',
                alignItems: 'center',
                marginTop:0.15*height,
            }}>
                <Text style={{color:'#757374',fontSize:20,textAlign: 'center'}}>
                    正在拉取数据~
                </Text>
            </View>
        )
    };
    //下拉刷新新
    count = 0;//下拉刷新的次数
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

    static getView({item}) {
        return (
            <View style={styles.NewComment}>
                <View style={styles.picture1}>
                    <Image style={styles.pic1} source={{uri:item.picture}}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.people}>
                        <Text style={styles.name}>{item.username}  </Text>
                        <Text style={styles.time}>{item.time1}:{item.time2}</Text>
                    </View>
                    <Text style={styles.reply}>回复：{item.txt}</Text>
                    <Text style={styles.dynamic} numberOfLines={1} ellipsizeMode={'tail'}>@{item.username}:{item.txt}</Text>
                </View>
                <View style={styles.picture2}>
                    <Image style={styles.pic2} source={{uri:item.picture}}/>
                    <View style={styles.answer}>
                        <AntDesign
                            name={'message1'}
                            style={styles.message}
                        />
                        <Text style={styles.reflex}>回复</Text>
                    </View>
                </View>
            </View>
        )
    };
    keyExtractor = (item, index) => index.toString();
    // count = 0;//下拉刷新的次数
    getMainData(){
        fetch(this.props.url)
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
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        alignItems:'center',
        marginTop:10,
    },
    NewComment:{
        width:0.9*width,
        height:100,
        backgroundColor:'#fff',
        borderTopColor:'transparent',
        borderBottomColor:'#cfcfcf',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        borderWidth: 1,
        flexDirection: 'row'
    },
    picture1:{
        flex: 1,
    },
    pic1:{
        width: 55,
        height: 55,
        borderRadius: 30,
        marginTop:12,
        overlayColor: '#ffffff'
    },
    content:{
        flex:3,
    },
    people:{
        marginTop:12,
        flexDirection: 'row'
    },
    name:{
        fontSize: 14,
        color:'#000',
    },
    time:{
        fontSize:13,
    },
    reply:{
        marginTop:11,
        fontSize:12,
        color:'#000'
    },
    dynamic:{
        fontSize:11,
        marginTop:11
    },
    picture2:{
        flex:1,
    },
    pic2:{
        width:60,
        height:60,
        marginTop:12,

    },
    left:{
        width:0.2*width,
        marginTop: 12
    },
    right:{
        width:0.8*width,
        height:60,
        marginTop:14,
    },
    title:{
        fontSize:14,
        color:'#000'
    },
    answer:{
        flexDirection:'row'
    },
    message:{
        color:'#fca223',
        fontSize:13,
        marginTop:7,
        marginLeft: 14,
    },
    reflex:{
        fontSize:13,
        color:'#fca223',
        marginTop:3,
        marginLeft:6,
    },


});