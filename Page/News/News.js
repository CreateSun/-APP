import React , {Component}from 'react'
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation'


import Letter from './Letter'
import LinkMe from './LinkMe'
import Up from './Up'
import Comment from './Comment'
import {Dimensions, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
var {height,width} =  Dimensions.get('window');

const MainTopNavigator = createMaterialTopTabNavigator(
    {
        LinkMe:{
            screen: LinkMe,
            navigationOptions: {
                title: "@我的",


            }
        },

        Comment:{
            screen:Comment,
            navigationOptions: {
                title: "评论",

            }
        },
        Up: {
            screen: Up,
            navigationOptions: {
                title: "赞",

            }
        },
        Letter: {
            screen: Letter,
            navigationOptions: {
                title: "私信",

            }
        },
    },
    {
        optimizationsEnabled:true,
        lazy:true,
        initialRouteName:'LinkMe',
        tabBarPosition:'top',
        tabBarOptions:{
            showIcon:false,
            activeTintColor:'#ea824b',
            inactiveTintColor:'#000',
            style: {

                height:0.08*height,
                backgroundColor: '#fff',
            },
            indicatorStyle:{
                backgroundColor: '#ea824b'
            },
            labelStyle:{
                fontSize:18,
            }
        }
    }
);
const AppContainer=createAppContainer(MainTopNavigator);

export default class MainNavigator extends Component {
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{height:0.07*height,width:width,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'grey',fontWeight: 'bold',fontSize: 20}}>消息</Text>
                </View>
                < AppContainer/>
        </View>
        )
    }
}

