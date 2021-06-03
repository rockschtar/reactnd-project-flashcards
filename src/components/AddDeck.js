import React from 'react';
import { Text, Alert, View } from 'react-native';
import { handleAddDeck } from '../actions/decks';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import 'react-native-get-random-values';
import ActivityOverlay from './ActivityOverlay';
import { styles } from '../utils/styles';
import { Button, Input } from 'react-native-elements';

class AddDeck extends React.Component {

    state = {
        name: '',
        errorMessage: '',
        loading: false,
    };
    onChangeText = (name) => {
        this.setState({ name: name });
    };

    deckExists = (name) => {
        const { decks } = this.props;
        return decks.find((deck) => { return deck.name === name;});
    };

    onSubmit = () => {
        const { name } = this.state;

        if (name.trim() === '') {
            this.setState({ errorMessage: 'Please enter a Deck name' })
            return;
        }

        if (this.deckExists(name)) {
            this.setState({ errorMessage: `Deck with name "${name}" already exists` })
            return;
        }

        this.setState({ loading: true, errorMessage : '' })
        const { handleAddDeck } = this.props;

        const deck = { id: uuid(), name: name, cards: [] };
        handleAddDeck(deck).then(() => {
            this.setState({ loading: false, name: '' }, () => {
                this.props.navigation.navigate('Deck', { deck: deck });
            })
        })
    };

    render() {
        const { name, loading, errorMessage } = this.state;

        return (

          <View style={styles.container}>

              <ActivityOverlay isVisible={loading}>
                  <Text>Adding Deck...</Text>
              </ActivityOverlay>

              <Input onChangeText={this.onChangeText}
                     value={name}
                     disabled={loading}
                     errorMessage={errorMessage}
                     placeholder="Deck name"/>

              <Button title={'Create Deck'}
                      disabled={loading}
                      buttonStyle={{ marginBottom: 20 }}
                      onPress={this.onSubmit}/>

          </View>
        );
    }
}

export default connect(
  ({ decks, isLoading }) => {
      return {
          decks: Object.values(decks),
          isLoading,
      };
  },
  { handleAddDeck })(AddDeck);
