import React , {Component}from 'react'
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation'
import Transmit from './Transmit';
import Up from "./Up";
import {Dimensions} from "react-native";
let {height,width} =  Dimensions.get('window');
const RankingTopNavigator = createMaterialTopTabNavigator(
    {
        Up: {
            screen: Up,
            navigationOptions: {
                title: '点赞榜',
            }
        },
        Transmit: {
            screen: Transmit,
            navigationOptions: {
                title: '转发榜',
            }
        },
    },
    {
        optimizationsEnabled:true,
        initialRouteName:'Up',
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#ea824b',
            inactiveTintColor:'#000',
            style: {
                height:0.09*height,
                backgroundColor: '#fff',
            },
            indicatorStyle:{
                backgroundColor: '#ea824b'
            },
            labelStyle:{
                fontSize:16,
            }
        }
    }
);
const AppContainer=createAppContainer(RankingTopNavigator);

export default class RankingNavigator extends Component {
    static Navigator(){
        return AppContainer;
    }
}

