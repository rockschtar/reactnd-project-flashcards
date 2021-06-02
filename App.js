import React, { Component, useEffect } from 'react';
import Home from './src/components/Home';
import AddDeck from './src/components/AddDeck';
import Tabs from './src/components/Tabs';
import Deck from './src/components/Deck';
import AddCard from './src/components/AddCard';
import Quiz from './src/components/Quiz';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { handleReceiveDecks } from './src/actions/decks';
import AppLoading from 'expo-app-loading';
import { scheduleNotification } from './src/utils/notification';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
    return (
      <MainStack.Navigator screenOptions={{
          headerShown: true,
          headerStyle: {
              backgroundColor: '#3F51B5',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center'
      }}>
          <MainStack.Screen name="Home" component={TabNavigator} options={{ headerShown: true}}/>
          <MainStack.Screen name="Deck" component={Deck}/>
          <MainStack.Screen name="AddCard" component={AddCard}/>
          <MainStack.Screen name="Quiz" component={Quiz}/>

      </MainStack.Navigator>
    );
}

function TabNavigator({ navigation, route }) {

    const getHeaderTitle = (route) => {

        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

        switch (routeName) {
            case 'Home':
                return 'Decks';
            case 'AddDeck':
                return 'Add Deck';
        }
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }, [navigation, route]);

    return (
      <Tab.Navigator tabBar={props => <Tabs {...props} />} >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="AddDeck" component={AddDeck}   options={{ title: 'My home' }} />
      </Tab.Navigator>
    );
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    componentDidMount() {

        this.props.handleReceiveDecks();

        scheduleNotification()

    }


    async loadFonts() {
        return Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    }

    render() {

        if (!this.state.isReady) {
            return <AppLoading startAsync={this.loadFonts}
                               onFinish={() => this.setState({ isReady: true })}
                               onError={console.warn}
            />;
        }

        return (
          <NavigationContainer>
              <MainNavigator />
          </NavigationContainer>
        );
    }
}

export default connect(({ appLoading }) => {
    return {
        appLoading,
    };
}, { handleReceiveDecks })(App);
