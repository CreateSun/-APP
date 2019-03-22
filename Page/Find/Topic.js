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

    ListEmptyComponent = () => {
        return(
            <View style={{
                justifyContent:'center',
                alignItems: 'center',
                marginTop:0.1*height,

            }}>
                <Text style={{color:'#757374',fontSize:15,textAlign: 'center'}}>
                    稍等稍等正在路上
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

    static getView({item}) {
        return (

            <View style={styles.topic}>
                <View style={styles.headline}>
                    <Text style={styles.title}>#{item.title}#</Text>
                    <Text style={styles.number}>{item.number}</Text>
                    <Text style={styles.discuss}>讨论</Text>
                    <Entypo
                        name={'chevron-thin-right'}
                        size={14}
                        style={styles.arrow}
                        color={'grey'}
                    />
                </View>
                <View style={styles.substance}>
                    <Text style={styles.words}>{item.txt}</Text>
                    <Image source={{uri: item.picture}}
                           style={styles.pic1}/>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.username}>@{item.username}</Text>
                    <Text style={styles.number}>{item.number}</Text>
                    <Text style={styles.discuss}>转发</Text>
                    <Text style={styles.number}>{item.number}</Text>
                    <Text style={styles.discuss}>小时前</Text>
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
    },
    topic:{
        width:0.9*width,
        height:140,
        backgroundColor:'#fff',
        borderTopColor:'#cfcfcf',
        borderBottomColor:'transparent',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        borderWidth: 1,
    },
    headline:{
        flexDirection: 'row',
        marginBottom: 10
    },
    title:{
        flex:16,
        fontSize:13,
        color:'#000',
        marginTop:10,
    },
    number:{
        marginTop:10,
        fontSize:11,
        textAlign: 'right',
        flex: 2,
    },
    discuss:{
        marginTop:10,
        flex:2,
        fontSize:11,
    },
    arrow:{
        marginTop:10
    },
    substance:{
        flexDirection: 'row',
    },
    words:{
        fontSize:12,
        flex:4
    },
    pic1:{
        width:90,
        height:70,
        flex:2
    },
    footer:{
        flexDirection: 'row',
        marginBottom: 10
    },
    username:{
        fontSize:11,
        marginTop:10,
        flex:12
    },

});

