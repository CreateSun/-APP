import React , {Component}from 'react'
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation'
import Fresh from './Fresh';
import Hot from './Hot';
import Topic from './Topic';
import {Dimensions} from "react-native";
var {height,width} =  Dimensions.get('window');

const FindTopNavigator = createMaterialTopTabNavigator(
    {
        Fresh: {
            screen: Fresh,
            navigationOptions: {
                title: "新鲜事",
            }
        },
        Topic: {
            screen: Topic,
            navigationOptions: {
                title: "话题",
            }
        },
        Hot: {
            screen: Hot,
            navigationOptions: {
                title: "热点",
            }
        }
    },
    {
        optimizationsEnabled:true,
        initialRouteName:'Fresh',
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
const AppContainer=createAppContainer(FindTopNavigator);

export default class FindNavigator extends Component {
    static Navigator(){
        return AppContainer;
    }
  }

