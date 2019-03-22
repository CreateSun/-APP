import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    ScrollView,
    AsyncStorage,
    StatusBar, TouchableOpacity, Button,

} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
let {width,height} =  Dimensions.get('window');
export default class Album extends Component{
    static navigationOptions = {
        headerTitle:'相册',
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
                    <View style={styles.aboutme}>
                        <View style={styles.photo}>
                            {/*<Image source={require('./img/people.png')}*/}
                                   {/*style={styles.pic1_1}/>*/}
                            <Text style={{fontSize:10}}>历史头像</Text>
                        </View>
                        <View style={styles.photo}>
                            {/*<Image source={require('./img/people.png')}*/}
                                   {/*style={styles.pic1_1}/>*/}
                            <Text style={{fontSize:10}}>赞过的图</Text>
                        </View>
                    </View>
                    <View style={styles.picture}>
                        <Text>
                            这里面都是图片
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )}}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        height:height,
        flexDirection: 'column',
        backgroundColor: '#f3f3f5',
    },
    aboutme:{
        marginTop:10,
        width:width,
        height:120,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems: 'center',

        justifyContent: 'space-around'
    },
    photo:{
        width:60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pic1_1: {
        height:60,
        width:60
    },
    picture:{
        marginTop:10,
    }
});