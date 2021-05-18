import React, {Component} from 'react';
import {Dimensions,StatusBar, StyleSheet, View, Text, SafeAreaView, VirtualizedList,FlatList, Image, TouchableOpacity,ActivityIndicator,TextInput,ScrollView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import IconFont from 'react-native-vector-icons/FontAwesome';
export default class DetailPage extends Component {
    state = {
    	data:null,
        resultList:null,
        loading: true,
        chacterList:[],
        enableScrollViewScroll:true,
	};
  
    
 componentDidMount() {
        var listCharacterId=[];
        console.log(Dimensions.get('window').height)
		fetch('https://rickandmortyapi.com/api/episode/'+this.props.route.params.id)
		.then((response)=>response.json())
		.then((responsejson)=>{
             responsejson.characters.forEach(function(item) {
                        var arrVars = item.split("/");
                        var lastVar = arrVars.pop();
                        listCharacterId.push(lastVar);
                       
                });
            fetch("https://rickandmortyapi.com/api/character/"+listCharacterId,)
                        .then((response1)=>response1.json())
                        .then((responsejson1)=>{
                             this.setState({	
                                data:responsejson,
                                loading: false,
                                chacterList:responsejson1,
                            });
            })   
		});
       
	}
    goToCharacterPage(id){
        const pushAction = StackActions.push('Characters',{id:id});
        this.props.navigation.dispatch(pushAction);
     }   

    renderChaterItem = ({ item, index }) => {
			return(
                <TouchableOpacity
                 style={styles.chacterItemStyle} 
                 onPress={() => this.goToCharacterPage(item.id)}
                >
                   <Image
                            style={styles.chaterImage}
                            source={{uri: item.image}}
                        />
                        <Text stlye={styles.chaterNameText}>{item.name}</Text>
                </TouchableOpacity>
				 
			)
		};

  render() {
       const {data,resultList,loading,chacterList,enableScrollViewScroll} = this.state;
       	if(loading){
			return (
				<SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="red" />
					<View>
						<ActivityIndicator color="red"></ActivityIndicator>
					</View>
				</SafeAreaView>
			);	
		}else{
              
            return ( 
                    
                    <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="red" />
                            <View style={styles.detailbody}>
                            <View style={{flexDirection: "row",justifyContent: 'space-between',}}>
                                <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center',}}>
                                    <IconFont name="play-circle" size={30} color="red"/>
                                    <View style={{'marginLeft':10}}>
                                        <Text style={styles.name}>{data.name}</Text>
                                        <Text style={{'fontSize':18}}>{data.episode}</Text>
                                    </View>
                                </View>
                                <View >
                                    <Text style={{fontSize:18,}}>{data.air_date}</Text>
                                </View>
                                
                            </View>
                          <Text style={styles.charactersText}>Episode Characters</Text>
                           
                                <FlatList
                                style={{'height':Dimensions.get('window').height/1.38}}  
                                data={chacterList}
                                renderItem={this.renderChaterItem}
                                numColumns={3}
                                keyExtractor={item => item.id}
                             />
                            </View>
                           
                    </SafeAreaView>
                    
                    
                );
        }
 
	}
}

const styles = StyleSheet.create({
		container: {
            flex:1,
			backgroundColor:'#d7d9d7'
		},
        detailbody:{
            flexDirection: 'column',
            margin:20,
        },
        name: {
			fontSize: 16,
			fontWeight:'bold',
		},
        chacterItemStyle:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 1
        },
        charactersText:{
            fontSize: 18,
			fontWeight:'bold',
            marginTop:10,
            marginBottom:10,
        },
        chaterImage: {
            height: 70,
            width:70,
            borderRadius: 35,
        },
        chaterNameText:{
            fontSize:18,
        }
});