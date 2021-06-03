import React from 'react';
import { Text, Alert, View } from 'react-native';
import Deck from '../models/Deck';
import { handleAddDeck } from '../actions/decks';
import { connect } from 'react-redux';
import 'react-native-get-random-values';
import { styles } from '../utils/styles';
import { Button, Input } from 'react-native-elements';
import ActivityOverlay from './ActivityOverlay';

class AddCard extends React.Component {

    state = {
        question: '',
        answer: '',
        errorMessageQuestion : '',
        errorMessageAnswer : ''
    };
    onChangeQuestion = (question) => {
        const errorMessageQuestion = question.trim() === '' ? 'Please enter a question' : ''
        this.setState({ question, errorMessageQuestion });
    };

    onChangeAnswer = (answer) => {
        const errorMessageAnswer = answer.trim() === '' ? 'Please enter a answer' : ''
        this.setState({ answer, errorMessageAnswer });
    };

    onSubmit = () => {
        const { question, answer } = this.state;

        if(question.trim() === '' || answer.trim() === '') {
            return;
        }

        this.setState({ errorMessageQuestion: '', errorMessageAnswer: '' });

        const { deck } = this.props.route.params;

        deck.cards.push({ question, answer });
        const { handleAddDeck } = this.props;
        handleAddDeck(deck).then((deck) => {
            this.setState({ question: '', answer: '' });
            this.props.navigation.navigate('Deck', { deck });
        } )
    };

    render() {
        const { question, answer, errorMessageAnswer, errorMessageQuestion } = this.state;

        const { isLoading } = this.props;
        const isError  = errorMessageAnswer !== '' || errorMessageQuestion !== ''
        const disabled = isLoading || isError || question === '' || answer === '';

        return (

          <View style={styles.container}>

              <ActivityOverlay isVisible={isLoading}>
                  <Text>Adding card to deck...</Text>
              </ActivityOverlay>

              <Input onChangeText={this.onChangeQuestion}
                     value={question}
                     disabled={isLoading}
                     errorMessage={errorMessageQuestion}
                     placeholder="Question"/>

              <Input onChangeText={this.onChangeAnswer}
                     value={answer}
                     disabled={isLoading}
                     errorMessage={errorMessageAnswer}
                     placeholder="Answer"/>

              <Button title={'Submit'}
                      disabled={disabled}
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
  { handleAddDeck })(AddCard);
