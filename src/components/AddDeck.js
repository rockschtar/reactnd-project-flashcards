import React from 'react';
import { Text, Alert } from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header, Icon,
    Input,
    Item, Left, Right,
    Spinner,
    Subtitle,
    Title,
} from 'native-base';

import { handleAddDeck } from '../actions/decks';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import 'react-native-get-random-values';
import { Overlay } from 'react-native-elements';

class AddDeck extends React.Component {

    state = {
        name: '',
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
            Alert.alert('Error', 'Please enter a Deck name');
            return;
        }

        if (this.deckExists(name)) {
            Alert.alert('Error', `Deck with name "${name}" already exists`);
            return;
        }

        this.setState({ loading: true })
        const { handleAddDeck } = this.props;

        const deck = { id: uuid(), name: name, cards: [] };
        handleAddDeck(deck).then(() => {
            this.setState({ loading: false, name: '' }, () => {
                this.props.navigation.navigate('Deck', { deck: deck });
            })
        })
    };

    render() {
        const { name, loading } = this.state;

        return (

          <Container>
              <Overlay isVisible={loading}>
                  <Spinner/>
                  <Text>Adding Deck...</Text>
              </Overlay>

              <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, padding: 50 }}>
                  <Form style={{ marginBottom: 20 }}>
                      <Item last>
                          <Input onChangeText={this.onChangeText} value={name} placeholder="Deck name"/>
                      </Item>
                  </Form>
                  <Button primary full onPress={this.onSubmit}>
                      <Subtitle>Submit</Subtitle>
                  </Button>
              </Content>

          </Container>
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
