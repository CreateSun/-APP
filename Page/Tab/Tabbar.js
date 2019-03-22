import React , {Component}from 'react'
import {
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation'

import Find from '../Find/Find'
import Mine from '../Mine/Mine'
import News from '../News/News'
// import HomeNavigate from '../Home/Home'
import Home from '../Home/HomeCell'
// const Home =HomeNavigate.Navigator();
import {Dimensions, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
var {height,width} =  Dimensions.get('window');

const MainBottomNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: "首页",
                tabBarIcon: ({tintColor}) => (
                    <Ionicons
                        name={'md-home'}
                        size={26}
                        style={{color: tintColor}}
                    />),
            }
        },
        Find:{
            screen: Find,
            navigationOptions: {
                title: "发现",
                tabBarIcon: ({tintColor}) => (
                    <Ionicons
                        name={'md-compass'}
                        size={26}
                        style={{color: tintColor}}
                    />),

            }
        },
        News: {
            screen: News,
            navigationOptions: {
                title: "消息",
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name={'envelope'}
                        size={25}
                        style={{color: tintColor}}
                    />),
            }
        },
        Mine:{
            screen:Mine,
            navigationOptions: {
                title: "我的",
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name={'user'}
                        size={26}
                        style={{color: tintColor}}
                    />),
            }
        }
    },
    {
        optimizationsEnabled:true,
        lazy:true,
        initialRouteName:'Home',
        tabBarPosition:'bottom',
        tabBarOptions:{
            showIcon:true,
            activeTintColor:'#ea824b',
            inactiveTintColor:'#000',
            style: {
                borderTopColor:'#aaacae',
                borderTopWidth:1,
                height:0.11*height,
                backgroundColor: '#fff',
            },
            indicatorStyle:{
                backgroundColor: '#fff'
            },
            labelStyle:{
                fontSize:16,
            }
        }
    }
);
const AppContainer=createAppContainer(MainBottomNavigator);

export default class MainNavigator extends Component {
    // render(){
    //     return AppContainer;
    // }
    static Navigator(){
        return AppContainer;
    }
}

