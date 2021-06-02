import React from 'react';
import { Text, Alert } from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    Left,
    Right,
    Subtitle,
    Title,
} from 'native-base';
import Deck from '../models/Deck';
import { handleAddDeck } from '../actions/decks';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import 'react-native-get-random-values';

class AddCard extends React.Component {

    state = {
        question: '',
        answer: '',
    };
    onChangeQuestion = (question) => {
        this.setState({ question });
    };

    onChangeAnswer = (answer) => {
        this.setState({ answer });
    };

    deckExists = (name) => {

        const { decks } = this.props;
        return decks.find((deck) => { return deck.name === name;});

    };

    onSubmit = () => {

        const { deck } = this.props.route.params;
        const { question, answer } = this.state;

        if(question.trim() === '') {
            Alert.alert('Error', 'Please enter a question');
            return;
        }

        if(answer.trim() === '') {
            Alert.alert('Error', 'Please enter a answer');
            return;
        }

        deck.cards.push({ question, answer });
        const { handleAddDeck } = this.props;
        handleAddDeck(deck);
        this.setState({ question: '', answer: '' });
        this.props.navigation.navigate('Deck', { deck: deck });

    };

    render() {
        const { question, answer } = this.state;

        const { isLoading } = this.props;

        return (

          <Container>
              <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, padding: 50 }}>
                  <Form style={{ marginBottom: 20 }}>
                      <Item last>
                          <Input onChangeText={this.onChangeQuestion} value={question} placeholder="Question"/>
                      </Item>
                      <Item last>
                          <Input onChangeText={this.onChangeAnswer} value={answer} placeholder="Answer"/>
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
  { handleAddDeck })(AddCard);
