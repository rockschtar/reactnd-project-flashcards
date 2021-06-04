import React from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { styles } from '../../utils/styles';
import Score from './components/Score';
import Question from './components/Question';
import Answer from './components/Answer';
import AddCardButton from '../AddCardButton';
import BackToDeckButton from './components/BackToDeckButton';
import { cancelNotification, scheduleNotification } from '../../utils/notification';

export default class Quiz extends React.Component {
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

    onAnswer = (isCorrect = true) => {
        let { correct, index } = this.state;

        index++;

        if (isCorrect) {
            correct++;
        }

        this.setState({ index, correct, showAnswer: false }, () => {
            if (this.isFinished()) {
                cancelNotification().then(() => scheduleNotification());
            }
        });

    };

    restart = () => {
        this.setState({
            correct: 0,
            index: 0,
            showAnswer: false,
        });
    };

    isFinished = () => {
        const { deck } = this.props.route.params;
        const { index } = this.state;
        return deck.cards.length > 0 && index === deck.cards.length;
    };
    getQuizData = () => {

        const { deck } = this.props.route.params;
        const { showAnswer, index, correct } = this.state;
        const isFinished = this.isFinished();
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
          <View style={styles.container}>
              {noCards ?
                <>
                    <Text style={{ marginBottom: 20 }}>
                        You cannot start the quiz because there are no cards in the deck
                    </Text>
                    <AddCardButton deck={deck} buttonStyle={{ marginBottom: 20 }}/>

                    <BackToDeckButton deck={deck}/>
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
                          <Answer card={card} onCorrect={() => this.onAnswer()}
                                  onIncorrect={() => this.onAnswer(false)}/>}
                    </>
                    }


                </>
              }
          </View>

        );
    }

}
