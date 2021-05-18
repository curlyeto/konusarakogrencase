import React, {Component} from 'react';
import {StatusBar, Dimensions,StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity,ActivityIndicator,TextInput,ScrollView  } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import IconFont from 'react-native-vector-icons/FontAwesome';
export default class CharacterPage extends Component {
 state = {
        loading: true,
        chacter:{},
	};


componentDidMount() {
		fetch("https://rickandmortyapi.com/api/character/"+this.props.route.params.id,)
        .then((response1)=>response1.json())
        .then((responsejson1)=>{
            this.setState({
                loading: false,
                chacter:responsejson1,
            });
        }) 
       
}

render() {
       const {loading,chacter} = this.state;
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
                    <ScrollView>
                        <View style={styles.pagestyle}>
                        <Image
                            style={styles.chaterImage}
                            source={{uri: chacter.image}}
                         />
                        <Text style={styles.chacterName}>{chacter.name}</Text>  
                    </View>
                    <View style={styles.pagestylebody}>
                        <View style={styles.bodyitem}>
                            <Icon name="arrows-out" size={20} color="red" />
                            <View style={{'flexDirection':'column','marginLeft':10,}}>
                             <Text style={{fontWeight:'bold',}}>Status</Text>
                             <Text>{chacter.status}</Text>   
                            </View>
                        </View>
                         <View style={styles.bodyitem}>
                            <IconFont name="paw" size={20} color="red" />
                            <View style={{'flexDirection':'column','marginLeft':10,}}>
                             <Text style={{fontWeight:'bold',}}>Species</Text>
                             <Text>{chacter.species}</Text>   
                            </View>
                        </View>
                         <View style={styles.bodyitem}>
                            <Icon name="torso" size={20} color="red" />
                            <View style={{'flexDirection':'column','marginLeft':10,}}>
                             <Text style={{fontWeight:'bold',}}>Type</Text>
                             <Text>{chacter.type}</Text>   
                            </View>
                        </View>
                        <View style={styles.bodyitem}>
                            <Icon name="torsos" size={20} color="red" />
                            <View style={{'flexDirection':'column','marginLeft':10,}}>
                             <Text style={{fontWeight:'bold',}}>Gender</Text>
                             <Text>{chacter.gender}</Text>   
                            </View>
                        </View>
                        <View style={styles.bodyitem}>
                            <Icon name="web" size={20} color="red" />
                            <View style={{'flexDirection':'column','marginLeft':10,}}>
                             <Text style={{fontWeight:'bold',}}>Origin</Text>
                             <Text>{chacter.origin.name}</Text>   
                            </View>
                        </View>
                         <View style={styles.bodyitem}>
                            <Icon name="marker" size={20} color="red" />
                            <View style={{'flexDirection':'column','marginLeft':10,}}>
                             <Text style={{fontWeight:'bold',}}>Location</Text>
                             <Text>{chacter.location.name}</Text>   
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                      
                    </SafeAreaView>
                );
        }
 
	}
}
const styles = StyleSheet.create({
		container: {
            flex:1,
			backgroundColor:'#d7d9d7',
            height: Dimensions.get('window').height*2,
		},
        pagestyle:{
            margin:10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        chaterImage: {
            height: 200,
            width:Dimensions.get('window').width/2,
            borderRadius:50
        },
        chacterName:{
            marginTop:10,
            fontSize:16
        },
        pagestylebody:{
            marginLeft:20,
            flexDirection: 'column',
        },
        bodyitem:{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom:20, 
        }
        
});