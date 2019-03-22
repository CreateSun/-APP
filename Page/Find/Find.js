import React, {Component} from 'react';
import {Dimensions, Image, Platform, TouchableOpacity, StyleSheet, Text, View, TextInput} from 'react-native';
var {height,width} =  Dimensions.get('window');

import Navigator from './FindNavigator';
const FindNavigator =Navigator.Navigator();
export default class Home extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            // selectedTab:'Topic'
        };
    }


    render() {
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View style={styles.top}>
                    <Text  style={{fontSize:20,fontWeight: 'bold'}}>发现</Text>
                </View>
                <View style={styles.search}>
                    <TextInput style={{
                        backgroundColor:'#EAEAEA',
                        marginTop: 2,
                        marginBottom:2,
                    }}
                               clearButtonMode={'while-editing'}
                               placeholder={'请输入想搜素的内容                                     🔍'}
                               placeholderTextColor={'#b8babc'}
                               enablesReturnKeyAutomatically={true}
                    />
                </View>

                <TouchableOpacity
                    style={styles.rank}
                    onPress={()=>this.props.navigation.navigate('Ranking')}
                >
                    <View style={{
                        flexDirection: 'row',
                        paddingLeft:10,
                        alignSelf:'center',
                        alignItems:'center',
                        justifyContent:'space-between',
                    }}>
                        <Image source={require('../img/rank.png')}  style={{marginRight:10}}/>
                        <Text style={{fontSize:20}}>排行榜</Text>
                    </View>
                    <View
                        style={{
                            paddingRight:10,
                            alignSelf:'center',
                            alignItems:'center',
                            justifyContent:'center',
                        }}

                    >
                        <Image source={require('../img/right.png')} />
                    </View>
                </TouchableOpacity>
                {/*//引入滑动标签栏*/}
              <FindNavigator/>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    top: {
        padding:10,
        height: 0.08*height,
        width: width,
        backgroundColor:'#fff',
        flexDirection: 'row',
        justifyContent:'center',
    },
    search:{
        marginTop:0.01*height,
        flexDirection: 'row',
        justifyContent:'center',
        width:width,
        backgroundColor: '#fff',
        height:0.06*height,
    },
    rank:{
        marginBottom:0.01*height,
        marginTop:0.01*height,
        flexDirection: 'row',
        justifyContent:'space-between',
        width:width,
        backgroundColor: '#fff',
        height:0.13*height,
        borderTopColor:'#d6d8da',
        borderTopWidth:1,
        borderBottomColor:'#d6d8da',
        borderBottomWidth:1,
    }
});

