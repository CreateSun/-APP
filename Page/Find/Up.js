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
let {width} =  Dimensions.get('window');
export default class HomeCell extends Component {


    componentWillMount(): void {
        this.getData();
    }

    getData=()=>{
        let params={
            "action": "share"
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
        }).then((res)=>{
            if(res.ok){
                ToastAndroid.show('获取成功',ToastAndroid.SHORT)
            }
        }).then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    data:res
                })
            })
            .catch((error)=>{
                ToastAndroid.show('超时，获取失败:'+error,ToastAndroid.SHORT)
            })

    };


    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.freshen}>
                        <Text>整点刷新，统计上一个小时的转发数</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.number}>Top</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[0].content}</Text>
                            <Text style={styles.figure}>{this.state.data[0].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>1</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[1].content}</Text>
                            <Text style={styles.figure}>{this.state.data[1].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>2</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[2].content}</Text>
                            <Text style={styles.figure}>{this.state.data[2].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>3</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[3].content}</Text>
                            <Text style={styles.figure}>{this.state.data[3].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>4</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[4].content}</Text>
                            <Text style={styles.figure}>{this.state.data[4].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>5</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[5].content}</Text>
                            <Text style={styles.figure}>{this.state.data[5].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.number}>6</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[6].content}</Text>
                            <Text style={styles.figure}>{this.state.data[6].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>7</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[7].content}</Text>
                            <Text style={styles.figure}>{this.state.data[7].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>8</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[8].content}</Text>
                            <Text style={styles.figure}>{this.state.data[8].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>9</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[9].content}</Text>
                            <Text style={styles.figure}>{this.state.data[9].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>10</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[10].content}</Text>
                            <Text style={styles.figure}>{this.state.data[10].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>11</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[11].content}</Text>
                            <Text style={styles.figure}>{this.state.data[11].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.number}>12</Text>
                        <View style={styles.content}>
                            <Text style={styles.words}>{this.state.data[12].content}</Text>
                            <Text style={styles.figure}>{this.state.data[12].great}</Text>
                        </View>
                        <View style={styles.block}><Text>热</Text></View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#f1f1f1'
    },
    freshen:{
        width:width,
        height:40,
        alignItems:'center',
        justifyContent:'center'
    },
    box:{
        height:50,
        width:width,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    number:{
        flex: 1,
        marginLeft: 10
    },
    content:{
        flex:8,
        flexDirection:'row',
        alignItems: 'center'
    },
    words: {marginLeft:10},
    figure:{marginLeft: 10},
    block:{
        flex:0.8,
        width:20,
        height: 30,
        marginRight:10,
        backgroundColor:'#a4dd96',
        justifyContent: 'center',
        alignItems:'center'
    }
});