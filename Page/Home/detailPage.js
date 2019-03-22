import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    ToastAndroid,
    Image,
    TouchableOpacity,
    Text,
    View, Dimensions,
    Alert,
    TextInput,
    Button,
    TouchableNativeFeedback,
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DeviceStorage from "../DeviceStorage";
// import FontAwesome from "react-native-vector-icons/FontAwesome"
let {height,width} =  Dimensions.get('window');

class DetailRenderItem extends Component{
    constructor(props){
        super(props);
        this.state={
            up:this.props.up,
        }
    }

    up=()=>{
      if(this.state.up===true){
          ToastAndroid.show('请勿重复点赞',ToastAndroid.SHORT);

      }
      else if(this.state.up===false){
          this.setState({
              up:true
          });
          ToastAndroid.show('点赞成功',ToastAndroid.SHORT)
      }

    };

    render(){
        return(
            <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:10}}>
                {/*//头像显示*/}
                <View style={{alignSelf: 'flex-start',marginLeft:10,marginTop:10,}}>
                    <Image source={{uri:this.props.headSculpture}} style={{borderRadius:100,height:45, width:45, }}/>
                </View>
                {/*左右布局*/}
                <View style={{flexDirection:'column',width:0.7*width}}>
                    {/*上部分是ID  加   发布时间，下一个VIEW是  发布内容*/}
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                        {/*ID的显示*/}
                        <View>
                            <Text>
                                {this.props.nickName}
                            </Text>
                        </View>
                        {/*评论时间的显示*/}
                        <View>
                            <Text>
                                {this.props.time1}:{this.props.time2}
                            </Text>
                        </View>
                    </View>
                    <View >
                        <Text>
                            {this.props.content}
                        </Text>
                    </View>
                </View>
                {/*点赞图标*/}
                <TouchableOpacity
                    style={{alignSelf:'center',}}
                    ActiveOpcity={0.5}
                    onPress={()=>this.up()}
                >
                    <FontAwesome
                        name={this.state.up===true?'thumbs-up':'thumbs-o-up'}
                        size={20}
                        style={{color:'#ea824b', justifyContent:'center',alignSelf: 'center'}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default class detailPage extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            refreshing: false,//当前的刷新状态
        }
    };

    static defaultProps={
        url:'http://rap2api.taobao.org/app/mock/149021/comment',
    };

    render(){
        return(
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
        )
    };

    keyExtractor=(item,index) => index.toString();
    //提交评论
    submitComment=()=>{
        let params = {
            action: "addComment",
            comment: {
                //获取当前的用户ID
                "u_id": this.state.u_id,
                "userName": this.state.userName,
                "id": this.props.id,
                "comment": this.state.text,
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
        else if(this.state.Login==="false"){
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
    //头部样式 也就是详情页的样式
    header=()=>{
        const { navigation } = this.props;
        const head=JSON.stringify(this.props.navigation.state.params.head);
        const strhead=head.substring(1,(head.length-1));
        //这里返回的就是每个Item
        return (
            <View style={{backgroundColor: '#eef0f2', paddingLeft: 5,
                borderBottomColor:'#dadcde',borderBottomWidth: 1}}>
                {/*头像，ID，时间，下拉箭头*/}
                <View style={styles.header}>
                    {/*左右布局   左边头像,ID，时间   右边向下箭头*/}
                    <View style={styles.left}>
                        <Image source={{uri:strhead}} style={styles.head}/>
                        <View style={styles.NameTime}>
                            {/*ID，时间*/}
                            <Text style={{fontSize: 18,color:'#000'}}>{JSON.stringify(this.props.navigation.state.params.name)}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 15}}>{JSON.stringify(this.props.navigation.state.params.time1)}</Text>
                                <Text style={{fontSize: 15}}>:</Text>
                                <Text style={{fontSize: 15}}>{JSON.stringify(this.props.navigation.state.params.time2)}</Text>
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
                <View style={styles.txt}>
                    <Text style={{color:'#000',lineHeight: 25}}>{JSON.stringify(this.props.navigation.state.params.txt)}</Text>
                </View>
                {/*评论写入*/}
                <View style={{flexDirection:'row',justifyContent:'space-between',borderTopColor:'#d6d8da',borderTopWidth: 1.5,paddingBottom:5,paddingTop:5}}>
                     <TouchableOpacity
                    activeOpacity = {1}
                    style = {styles.inputContainer}
                    onPress = {() => this.TextInput.focus()}
                >
                    <TextInput
                        placeholder={'写点什么吧'}
                        placeholderTextColor={'#C0C0C0'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=>this.setState({text})}
                        ref = {textInput => this.TextInput = textInput}
                        onContentSizeChange = {e => this.cauculateHeight(e)}
                        value={this.state.text}
                        style = {{paddingVertical: 0, paddingLeft: 5, fontSize: 13,maxHeight: 0.2*height,height: this.state.height}}
                    />
                </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.submitComment()}
                        style={{alignSelf:'center',width:50,height:30,borderRadius:5,backgroundColor:'#EA824B',marginRight: 10,alignItems:'center',justifyContent:'center'}}
                        activeOpcity={0.5}
                    >
                        <Text>提交</Text>
                    </TouchableOpacity>
                </View>
                {/*图片上传先放着不会写*/}
                {/*<View style={styles.pic}>*/}
                {/*</View>*/}
                {/*点赞  转发一系列按钮*/}
                {/*四个图标*/}
            </View>
        )
    };
    // 评论栏的显示
    cauculateHeight(e) {
        const height = e.nativeEvent.contentSize.height > 20 ? e.nativeEvent.contentSize.height : this.state.height;
        this.setState({height});
    }
    //评论之间的灰色线条
    ItemDivideComponent = () => {
        return(
            <View style={{backgroundColor:'#d6d6d6',height:1,width:width}}/>
        )
    };
    //拉取评论列表时的
    ListEmptyComponent = () => {
        return(
            <View style={{
                justifyContent:'center',
                alignItems: 'center',
                // marginTop:0.3*height,
            }}>
                <Text style={{color:'#757374',fontSize:20,textAlign: 'center'}}>
                    正在拉取评论~
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
    //JSON 数据实体类
    ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
    }
    //renderItem
    _renderItem=({item,index})=>{
        return <DetailRenderItem nickName={item.nickName}
                                 headSculpture={item.headSculpture}
                                 content={item.content}
                                 up={item.up}
                                 time1={item.time1}
                                 time2={item.time2}
        />
    };
    //获取数据
    getMainData(){
        fetch(this.props.url)
            .then((response) => response.json())
            .then((response) => {
                //解析json数据
                let json = response['item'];
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
        //渲染完成过后获取当前用户的u_id   也就是MIne页面中的userName
        DeviceStorage.get('userId').then((userId) => {
            if (userId == null || userId === '') {
            } else {
                this.setState({
                    u_id:userId
                });
                this.fetchData(this.state.userName);
            }
        });
    }
}

const styles=StyleSheet.create({
    header: {
        justifyContent:'space-between',
        flexDirection:'row',
        padding:10,
    },
    inputContainer:{
        // alignItems:'center',
        alignSelf:'center',
        borderWidth:1,
        borderColor:'#b8babc',
        width:0.8*width,
        height:50,
        borderRadius:5,
    },
    head:{
        height:50,
        width:50,
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
        flexDirection:'column',
        alignSelf:'flex-start',
        paddingLeft:10,
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
        borderBottomWidth:0.5,
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