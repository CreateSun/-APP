import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    ScrollView,
    AsyncStorage,
    StatusBar,

} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
let {width,height} =  Dimensions.get('window');
export default class Comment extends Component{
    static navigationOptions = {
        headerTitle:'我的评论',
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
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.air}>
                    </View>
                    <View style={styles.picture}>
                        <Text style={{marginTop: 10,marginBottom: 10,fontSize: 12,color:'#000'}}>"里面是评论的内容"</Text>
                        <View style={styles.main}><Text numberOfLines={1} ellipsizeMode={'tail'} style={{marginLeft:10}}>x-x xx：xx评论了xxx的微博:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text></View>
                    </View>
                    <View style={styles.picture}>
                        <Text style={{marginTop: 10,marginBottom: 10,fontSize: 12,color:'#000'}}>"里面是评论的内容"</Text>
                        <View style={styles.main}><Text numberOfLines={1} ellipsizeMode={'tail'} style={{marginLeft:10}}>x-x xx：xx评论了xxx的微博:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text></View>
                    </View>
                    <View style={styles.picture}>
                        <Text style={{marginTop: 10,marginBottom: 10,fontSize: 12,color:'#000'}}>"里面是评论的内容"</Text>
                        <View style={styles.main}><Text numberOfLines={1} ellipsizeMode={'tail'} style={{marginLeft:10}}>x-x xx：xx评论了xxx的微博:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text></View>
                    </View>
                    <View style={styles.picture}>
                        <Text style={{marginTop: 10,marginBottom: 10,fontSize: 12,color:'#000'}}>"里面是评论的内容"</Text>
                        <View style={styles.main}><Text numberOfLines={1} ellipsizeMode={'tail'} style={{marginLeft:10}}>x-x xx：xx评论了xxx的微博:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text></View>
                    </View>
                    <View style={styles.picture}>
                        <Text style={{marginTop: 10,marginBottom: 10,fontSize: 12,color:'#000'}}>"里面是评论的内容"</Text>
                        <View style={styles.main}><Text numberOfLines={1} ellipsizeMode={'tail'} style={{marginLeft:10}}>x-x xx：xx评论了xxx的微博:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text></View>
                    </View>
                </View>
            </ScrollView>
        )}}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        height:height,
        backgroundColor: '#fff',
    },
   air:{
        height:10,
       backgroundColor: '#f3f3f5',
   },
    picture:{
        width:0.9*width,
        marginLeft: 20,
    },
    main:{
        width:0.9*width,
        height:30,
        fontSize:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f3f3f5',
        marginBottom: 10
    }
});