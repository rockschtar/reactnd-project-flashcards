import React from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { styles } from '../../utils/styles';
import Score from './components/Score';
import Question from './components/Question';
import Answer from './components/Answer';
import AddCardButton from '../AddCardButton';
import BackToDeckButton from './components/BackToDeckButton';

export default class Quiz extends React.Component
{
    state = {
        correct: 0,
        index: 0,
        showAnswer: false,
    };

    componentDidMount() {

    }

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
        const cardsRemaining = (deck.cards.length - index) - 1;
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
          <View style={styles.container}>
              {noCards ?
                <>
                    <Text style={{ marginBottom: 20 }}>
                        You cannot start the quiz because there are no cards in the deck
                    </Text>
                    <AddCardButton deck={deck} buttonStyle={{ marginBottom: 20 }} />

                    <BackToDeckButton deck={deck} />
                </>
                :
                <>
                    {isFinished && <Score deck={deck} correct={correct} onRestart={this.restart}/>}

                    {!isFinished &&
                    <>
                        <Text style={{ alignSelf: 'center' }}>Cards
                            Remaining: {cardsRemaining} / {deck.cards.length}</Text>
                        {!showAnswer ?
                          <Question card={card} onShowAnswer={this.onShowAnswer}/>
                          :
                          <Answer card={card} onCorrect={this.onCorrect} onIncorrect={this.onInCorrect}/>}
                    </>
                    }


                </>
              }
          </View>

        );
    }

}
