import React, {Component} from 'react';
import {StatusBar, StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity,ActivityIndicator,TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native';
import IconFont from 'react-native-vector-icons/FontAwesome';
export default class HomePage extends Component {

 state = {
		name: '',
		surname: '',
    	resultList:null,
		searchList:null,
		loading: true,
		text:'',
	};

     gotoDetail(id){
        const pushAction = StackActions.push('Detail',{id:id});
        this.props.navigation.dispatch(pushAction);
     }
  componentDidMount() {
		fetch('https://rickandmortyapi.com/api/episode')
		.then((response)=>response.json())
		.then((responsejson)=>{
     		this.setState({
					resultList:responsejson.results,
					searchList:responsejson.results,
					loading: false
        	}); 
		})
	}

  	renderContactsItem = ({ item, index }) => {
			return(
				<TouchableOpacity 
                 style={styles.itemContainer}
                 onPress={() => this.gotoDetail(item.id)}
                >
					
					<View style={styles.textContainer}>
						<IconFont name="play-circle" size={30} color="red"/>
						<View style={{'marginLeft':10}}>
							<Text style={styles.name}>{item.name}</Text>
							<Text>{item.episode}</Text>
						</View>
					</View>
					<View style={styles.airdate}>
						<Text>{item.air_date}</Text>
					</View>
				</TouchableOpacity>
			)
		};

	renderHeader = () => {
		const {text} = this.state;
		return (
			<TextInput
					onChangeText={text => {
						this.setState({text,});
						this.searchFilter(text);
					}}
					value={text}
					placeholder="Search Episodes..."
					style={styles.searchInput}/>
		)
	};	
	searchFilter=(text1) => {
		const {resultList,searchList,text} = this.state;
		const newData = resultList.filter(item => {
			const listItem = `${item.name.toLowerCase()} ${item.episode.toLowerCase()}}`;

			return listItem.indexOf(text.toLowerCase()) > -1;
		});
		this.setState({
			searchList: newData,
		});
	};

	render() {
   const {name,surname,loading,resultList,searchList,text} = this.state;
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
			if(text!=""){
				return (
					<SafeAreaView style={styles.container}>
					<StatusBar barStyle="light-content" backgroundColor="red" />
						<View>
							<FlatList
								ListHeaderComponent={this.renderHeader()}
								renderItem={this.renderContactsItem}
								keyExtractor={item => item.id}
								data={searchList} />
						
						</View>
					</SafeAreaView>
				);
			}else{
				return (
					<SafeAreaView style={styles.container}>
					<StatusBar barStyle="light-content" backgroundColor="red" />
						<View>
							<FlatList
								ListHeaderComponent={this.renderHeader()}
								renderItem={this.renderContactsItem}
								keyExtractor={item => item.id}
								data={resultList} />
						
						</View>
					</SafeAreaView>
				);
			}
		
	
		}
		
	}
}



const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor:'#d7d9d7'
		},
		itemContainer: {
			flex: 1,
			flexDirection: 'row',
			paddingVertical: 10,
			paddingHorizontal: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#eee'
		},
		avatar: {
			width: 80,
			height: 80,
			borderRadius: 25,
			marginHorizontal: 10
		},
	
		name: {
			fontSize: 16,
			fontWeight:'bold',
		},
		searchInput: {
			fontSize: 16,
			backgroundColor: '#f9f9f9',
			padding: 10,
			margin:10,
			borderColor:'#d7d9d7',
			borderWidth: 2,
			borderRadius: 20 ,
			backgroundColor : "#FFFFFF"
		},
		textContainer: {
			flex:2,
			flexDirection: 'row',
		},
		airdate:{
			flex:1	
		}
});