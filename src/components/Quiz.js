import React from 'react';
import { Body, Text, Button, Container, Content, Header, Subtitle, Title } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Question = (props) => {

    const { card, onShowAnswer } = props;

    return (
      <>
          <Text h4 style={{ marginBottom: 20 }}>{card.question}</Text>

          <Button primary onPress={onShowAnswer} full style={{ marginBottom: 20 }}>
              <Subtitle>Show Answer</Subtitle>
          </Button>
      </>

    );
};

const Answer = (props) => {

    const { card, onCorrect, onIncorrect } = props;

    return (
      <>
          <Text h4 style={{ marginBottom: 20 }}>{card.answer}</Text>
          <Button full success onPress={onCorrect} style={{ marginBottom: 20 }}><Subtitle>Correct</Subtitle></Button>
          <Button full danger onPress={onIncorrect}><Subtitle>Incorrect</Subtitle></Button>
      </>
    );
};

const Score = (props) => {

    const { deck, correct, onRestart } = props;
    const navigation = useNavigation();

    const backToDeck = () => {
        navigation.navigate('Deck', { deck: deck });
    };

    return (

      <>
          <Text h4>Quiz is finished!</Text>
          <Text style={{ textAlign: 'center' }}>You answered {correct} questions correct out
              of {deck.cards.length} questions</Text>
          <Button full success onPress={onRestart} style={{ marginBottom: 20 }}><Subtitle>Start Quiz
              Again</Subtitle></Button>
          <Button full danger onPress={backToDeck}><Subtitle>Back to Deck</Subtitle></Button>
      </>

    );
};

export default class Quiz extends React.Component {
    state = {
        correct: 0,
        index: 0,
        showAnswer: false,
    };

    onShowAnswer = () => {
        this.setState({ showAnswer: true });
    };
    onCorrect = () => {
        let { correct, index } = this.state;

        correct++;
        index++;

        this.setState({ correct, index, showAnswer: false });
    };
    onInCorrect = () => {
        let { index } = this.state;

        index++;

        this.setState({ index, showAnswer: false });
    };

    restart = () => {
        this.setState({
            correct: 0,
            index: 0,
            showAnswer: false,
        });
    };

    getQuizData = () => {

        const { deck } = this.props.route.params;
        const { showAnswer, index, correct } = this.state;
        const isFinished = deck.cards.length > 0 && index === deck.cards.length;
        const card = isFinished || deck.cards.length === 0 ? {} : deck.cards[index];
        const cardsRemaining = (deck.cards.length - index);
        const noCards = deck.cards.length === 0;

        return {
            deck,
            showAnswer,
            index,
            correct,
            isFinished,
            card,
            cardsRemaining,
            noCards,
        };
    };

    render() {

        const { deck, showAnswer, correct, isFinished, card, cardsRemaining, noCards } = this.getQuizData();

        return (
          <Container>
              <Content contentContainerStyle={contentStyle}>
                  {noCards ?
                    <>
                        <Text style={{ marginBottom: 20 }}>
                            You cannot start the quiz beceause there are no cards in the deck
                        </Text>
                        <Button full dark style={{ marginBottom: 20 }}
                                onPress={() => { this.props.navigation.navigate('Home', { screen: 'Home' }); }}>
                            <Subtitle>Back to home</Subtitle>
                        </Button>

                    </>

                    :
                    <>
                        {isFinished && <Score deck={deck} correct={correct} onRestart={this.restart}/>}

                        {!isFinished && !showAnswer &&
                        <Question card={card} onShowAnswer={this.onShowAnswer}/>
                        }

                        {!isFinished && showAnswer &&
                        <Answer card={card} onCorrect={this.onCorrect} onIncorrect={this.onInCorrect}/>
                        }
                    </>
                  }
              </Content>


          </Container>
        );
    }
}

const contentStyle = { justifyContent: 'center', alignItems: 'center', flex: 1, padding: 50 };
