import React, {Component} from 'react';
import { StyleSheet} from 'react-native';
import HomePage from './src/homepage.js';
import DetailPage from './src/detailpage.js';
import CharacterPage from './src/characterpage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export default class App extends Component {
 
	render() {
		const Stack = createStackNavigator();
		return (
			<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Episodes" component={HomePage}  options={{
          title: 'Rick And Morty Episodes',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
				<Stack.Screen name="Detail" component={DetailPage} options={{
          title: 'Episode Detail',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
				<Stack.Screen name="Characters" component={CharacterPage} options={{
          title: 'Episode Characters',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
			</Stack.Navigator>
			</NavigationContainer>
		);
	}
}



const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor:'#d7d9d7'
		}
});