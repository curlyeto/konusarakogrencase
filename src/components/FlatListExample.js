	import React, {Component} from 'react';
	import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
	import PropTypes from 'prop-types';
	// import data from '../../data';

	export default class FlatListExample extends Component {
		state = {
				resultList:null,
		};
		renderContactsItem = ({ item, index }) => {
			return(
				<TouchableOpacity style={styles.itemContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.name}>{item.name}</Text>
						<Text>{item.air_date}</Text>
						<Text>{item.episode}</Text>
					</View>
				</TouchableOpacity>
			)
		};

		render() {
			 const {resultList} = this.state;
			console.log(this.props.text);
			resultList=this.props.text;
			return (
				<SafeAreaView style={styles.container}>
					<FlatList
						renderItem={this.renderContactsItem}
						keyExtractor={item => item.id}
						data={resultList} />
				</SafeAreaView>
			);
		}
	}



	const styles = StyleSheet.create({
		container: {
			flex: 1
		},
		itemContainer: {
			flex: 1,
			flexDirection: 'row',
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#eee'
		},
		avatar: {
			width: 80,
			height: 80,
			borderRadius: 25,
			marginHorizontal: 10
		},
		textContainer: {
			justifyContent: 'space-around'
		},
		name: {
			fontSize: 16
		}
	});