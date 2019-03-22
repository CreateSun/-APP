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
    static getView({item}) {
        return (
            <View style={{backgroundColor: '#fff', paddingLeft: 5,marginTop:10 }}>
                {/*头像，ID，时间，下拉箭头*/}
                <View style={styles.header}>
                    {/*左右布局   左边头像,ID，时间   右边向下箭头*/}
                    <View style={styles.left}>
                        <Image source={{uri: item.picture}} style={styles.head}/>
                        <View style={styles.NameTime}>
                            <Text style={{fontSize: 16,color:'#000'}}>{item.username}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 15}}>{item.time1}:{item.time2}</Text>
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
                    <Text style={{color:'#000',lineHeight: 25}}>{item.txt}</Text>
                </View>
                <View style={styles.icon}>
                    <View style={styles.out}>
                        <TouchableOpacity
                            ActiveOpcity={0.5}
                        >
                            <FontAwesome
                                name={'star-o'}
                                size={20}
                                style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft:4}}>
                            <Text >收藏</Text>
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
                        >
                            <MaterialCommunityIcons
                                name={'comment-processing-outline'}
                                size={20}
                                style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft:4}}>
                            <Text >评论</Text>
                        </View>
                    </View>
                    <View style={styles.out}>
                        <TouchableOpacity
                            ActiveOpcity={0.5}
                        >
                            <FontAwesome
                                name={'thumbs-o-up'}
                                size={20}
                                style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft:4}}>
                            {/*<Text >{item.up}</Text>*/}
                        </View>
              </View>
               </View>
            </View>
        )
    };
    keyExtractor = (item, index) => index.toString();
    //拉取评论列表时的
    ListEmptyComponent = () => {
        return(
            <View style={{
                justifyContent:'center',
                alignItems: 'center',marginTop:0.15*height,
                // marginTop:0.3*height,
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
        flex:1,
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