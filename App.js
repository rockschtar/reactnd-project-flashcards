import React, { Component, useEffect } from 'react';
import Home from './src/components/Home';
import AddDeck from './src/components/AddDeck';
import Deck from './src/components/Deck';
import AddCard from './src/components/AddCard';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { handleReceiveDecks } from './src/actions/decks';
import AppLoading from 'expo-app-loading';
import { scheduleNotification } from './src/utils/notification';
import { ThemeProvider } from 'react-native-elements';
import { purple, turquoise, white } from './src/utils/color';
import { StatusBar } from 'expo-status-bar';
import { theme } from './src/utils/theme';
import Quiz from './src/components/Quiz';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
    return (
      <MainStack.Navigator screenOptions={{
          headerShown: true,

          headerStyle: {
              backgroundColor: purple,
          },
          headerTintColor: white,
          headerTitleAlign: 'center',
      }}>

          <MainStack.Screen name="Home" component={TabNavigator} options={{ headerShown: true }}/>
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
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }, [navigation, route]);

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                      ? 'home-outline'
                      : 'home';
                }
                else if (route.name === 'AddDeck') {
                    iconName = focused ? 'add-outline' : 'add';
                }

                return <Ionicons name={iconName} color={color} size={20}/>;
            },
        })}
        tabBarOptions={{
            activeTintColor: turquoise,
            inactiveTintColor: white,
            labelStyle: {
                fontSize: 13,
            },
            style: {
                backgroundColor: purple,

            },

        }}
      >
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="AddDeck" component={AddDeck} options={{ title: 'Add Deck' }}/>
      </Tab.Navigator>
    );
}

class App extends Component {

    state = {
        isReady: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    componentDidMount() {

        this.props.handleReceiveDecks().then( () => {
            this.setState({ isReady : true })
        });

        scheduleNotification();

    }

    render() {

        if (!this.state.isReady) {
            return <AppLoading />
        }

        return (
          <ThemeProvider theme={theme}>
              <NavigationContainer>
                  <StatusBar style="light"/>
                  <MainNavigator/>
              </NavigationContainer>
          </ThemeProvider>
        );
    }
}

export default connect(({ appLoading }) => {
    return {
        appLoading,
    };
}, { handleReceiveDecks })(App);
