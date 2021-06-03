import React from 'react';
import { Alert, Text, View } from 'react-native';
import { handleDeleteDeck } from '../actions/decks';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { purpleLight, red, turquoise } from '../utils/color';
import { styles } from '../utils/styles';
import ActivityOverlay from './ActivityOverlay';
import AddCardButton from './AddCardButton';
import DeckItem from './DeckItem';
import { StackActions } from '@react-navigation/native';

class Deck extends React.Component {

    state = {
        loading: false,
    };

    componentDidMount() {

        const { deck } = this.props.route.params;

        const { navigation } = this.props;

        navigation.setOptions({
            headerTitle: deck.name
        });

        this._unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            const pushAction = StackActions.push('Home');
            navigation.dispatch(pushAction);
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    deleteDeck = () => {
        const { deck } = this.props.route.params;
        const { handleDeleteDeck } = this.props;

        this.setState({ loading: true });

        handleDeleteDeck(deck.id).then(() => {
            this.setState({ loading: false }, () => {
                this.props.navigation.navigate('Home', { screen: 'Home' });
            });
        });
    }
    onDeleteDeck = () => {

        Alert.alert(
          "Confirm",
          "Are you sure to delete this deck?",
          [
              {
                  text: "Yes",
                  onPress: this.deleteDeck,
                  style: "default",
              },
              {
                  text: "Cancel",
                  style: "cancel",
              },
          ],
          {
              cancelable: true
          }
        );
    };

    startQuiz = () => {
        const { deck } = this.props.route.params;
        this.props.navigation.navigate('Quiz', { deck });
    };

    render() {

        const { deck } = this.props.route.params;
        const { loading } = this.state;

        return (
          <View style={styles.container}>


              <ActivityOverlay isVisible={loading}>
                  <Text>Deleting Deck...</Text>
              </ActivityOverlay>

              <DeckItem deck={deck} containerStyle={{ marginBottom: 100}} />

              <AddCardButton deck={deck} buttonStyle={{ marginBottom: 20 }} />

              <Button title={'Start Quiz'}
                      buttonStyle={{ backgroundColor: turquoise, marginBottom: 20 }}
                      onPress={this.startQuiz} style={{ marginBottom: 20 }}/>

              <Button title={'Delete Deck'}
                      type={'outline'}
                      buttonStyle={{ borderColor: red }}
                      titleStyle={{ color: red}}
                      onPress={this.onDeleteDeck} style={{ marginBottom: 20 }}/>


          </View>
        );
    }
}

export default connect(({ decks, isLoading }) => {
      return {
          isLoading,
      };
  }, { handleDeleteDeck },
)(Deck);
