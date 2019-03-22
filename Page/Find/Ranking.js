import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    ScrollView, TouchableOpacity,
} from 'react-native';
import RankingNavigate from './RankingNavigator';
const RankingNavigator =RankingNavigate.Navigator();
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
// import RankingNavigator from "./RankingNavigator";
let {width,height} =  Dimensions.get('window');
export default class Ranking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // selectedTab:'Topic'
        };
    }
    static navigationOptions = {
        headerTitle:'排行榜',
        headerTitleStyle: {
            marginLeft:116,
            marginTop:8,
            width:width,
            height:20,
            backgroundColor: '#fff',
            flexDirection: 'row',
            fontSize:14,
        }};
    render() {
        return (
            <RankingNavigator/>
        )}}
const styles = StyleSheet.create({
    // container:{
    //     flex: 1,
    //     height:height,
    //     flexDirection: 'column',
    //     backgroundColor: '#f3f3f5',
    // },
});