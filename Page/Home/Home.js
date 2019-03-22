import React ,{Component}from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import Topic from '../Find/Topic';
import HomeCell from './HomeCell';
import Navigator from '../Tab/Tabbar';
import Register from '../Mine/Register';
import Login from '../Mine/Login';
import {_renderItem} from './HomeCell';
import {detailRenderItem} from './detailPage'

const MainNavigator =Navigator.Navigator();
import  Write from './Write';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import detailPage from "./detailPage";
import Mine from "../Mine/Mine";
import Mydata from "../Mine/Mydata";
import Album from "../Mine/Album";
import Comment from "../Mine/Comment";
import Collect from "../Mine/Collect";
import Praise from "../Mine/Praise";
import DeviceStorage from "../DeviceStorage";
import Ranking from "../Find/Ranking";
// import Navigator from "../Tab/Tabbar";

export default class App extends Component<Props> {
    render() {
        return (
            <AppContainer />
        );
    }
    // 首先定义登陆状态为false
    componentDidMount(){
        DeviceStorage.save("Login",false);
        DeviceStorage.save("userId",'');
    }
}
const AppNavigator = createStackNavigator({
        Home: {
            screen:MainNavigator,
            navigationOptions:()=>(
                {
                    header:null,
                }
            )
        },
        HomeCell:{
            screen:HomeCell
        },
        _renderItem:{
            screen:_renderItem
        },
        // detailRenderItem:{
        //         //     screen:detailRenderItem
        //         // },
        Write: {
            screen:Write
        },
        detail: {
            screen: detailPage
        },
        Mine:{
            screen:Mine
        },
        Mydate: {
            screen:Mydata
        },
        Album: {
            screen:Album
        },
        Comment:{
            screen:Comment
        },
        Collect:{
            screen:Collect
        },
        Praise:{
            screen:Praise
        },
        Login:{
            screen:Login,
            navigationOptions:()=>(
                {
                    header:null,
                }
            )
        },
        Register:{
            screen:Register,
            navigationOptions:()=>(
                {
                    header:null,
                }
            )
        },
        Mydata:{
            screen:Mydata,
            navigationOptions:()=>(
                {
                    header:null,
                }
            )

        },
        Ranking:{
            screen:Ranking,
        },
},
    );

const AppContainer = createAppContainer(AppNavigator);


