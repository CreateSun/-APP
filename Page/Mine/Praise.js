import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    TouchableOpacity,
    FlatList, ToastAndroid,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
let {width,height} =  Dimensions.get('window');
export default class HomeCell extends Component{
    static defaultProps = {
        url: 'http://47.93.8.69:8080/SimpleWeibo_war_exploded/servlet/BlogServlet',
        head:'head: "http://hbimg.b0.upaiyun.com/3a71ff0a6d169b7abe260682c74d48fdad4e5fab103b-JAhaNL_fw236",'
    };
    constructor(props) {
        super(props);
        this.state = {
            data: [],//存储列表使用的数据
            refreshing: false,//当前的刷新状态
        };
    }
    static navigationOptions = {
        headerTitle:'我的点赞',
        headerTitleStyle: {
            marginLeft:120,
            marginTop:10,
            width:width,
            height:20,
            backgroundColor: '#fff',
            flexDirection: 'row',
            fontSize:14,
        }};
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={()=>this.getView()}
                    ListHeaderComponent={this.header}
                    ListEmptyComponent={()=>this.ListEmptyComponent()}
                    onRefresh={()=>this.onRefresh()}
                    refreshing={this.state.refreshing}
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                />
            </View>
        );
    }
    getView({item}) {
        return (
            <View style={{backgroundColor: '#fff', paddingLeft: 5,marginTop:10}}>
                {/*头像，ID，时间，下拉箭头*/}
                <View style={styles.header}>
                    {/*左右布局   左边头像,ID，时间   右边向下箭头*/}
                    <View style={styles.left}>
                        <Image source={{uri: this.props.head}} style={styles.head}/>
                        <View style={styles.NameTime}>
                            <Text style={{fontSize: 16,color:'#000'}}>{item.userName}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 15}}>{item.blogTime}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingTop: 10}}>
                        <TouchableOpacity>
                            <Image source={require('../img/down.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.txt}>
                    <Text style={{color:'#000',lineHeight: 25}}>{item.content}</Text>
                </View>
            </View>
        )}
    keyExtractor = (item, index) => index.toString();
    ListEmptyComponent=()=>{
        return(
            <View style={{
                justifyContent:'center',
                alignItems: 'center',
                marginTop:0.15*height,
            }}>
                <Text style={{color:'#757374',fontSize:20,textAlign: 'center'}}>
                    对不起，
                    你还没有点过赞呢
                </Text>
                <Text style={{color:'#757374',fontSize:20,textAlign: 'center'}}>
                    〒▽〒
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
    // count = 0;//下拉刷新的次数
    getMainData(){
        let params={
            "action": "searchSharedBlog",
            "blog": {
                "u_id": this.props.userId
            }
        };
       fetch(this.props.url,{
           method: "POST",
           mode: "cors",
           headers: {
               // "Content-Type": "application/x-www-form-urlencoded"
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(params)

       })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                //更新状态机
                this.setState({
                    data: response,
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
const styles = StyleSheet.create({
    container:{
        flex: 1,
        height:height,
        backgroundColor:'#f1f1f1'
    },
    header: {
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        padding:10,

    },
    head:{
        height:30,
        width:30,
        marginRight: 10,
        borderRadius: 30,
    },
    left:{
        width:0.4*width,
        alignItems:'center',
        // justifyContent:'space-between',
        flexDirection:'row',
    },
    NameTime: {
        flexDirection:'column',
        alignSelf:'flex-start',
    },
    txt: {
        lineHeight:20,
        marginTop:10,
        marginBottom: 20,
        marginLeft: 10,
        marginRight:10,
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