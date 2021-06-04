
import { Button, Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import BackToDeckButton from './BackToDeckButton';

const Score = (props) => {

    const { deck, correct, onRestart } = props;

    const percentCorrect = Math.round((correct * 100) / deck.cards.length);

    return (

      <>
          <Text h3 style={{ alignSelf: 'center' }}>Quiz is finished!</Text>
          <Text h4 style={{ textAlign: 'center', marginBottom: 40 }}>You answered {percentCorrect}% ({correct} out
              of {deck.cards.length} questions) correct</Text>

          <Button title={'Start Quiz again'} onPress={onRestart} buttonStyle={{ marginBottom: 20 }}/>

          <BackToDeckButton deck={deck}/>
      </>

    );
};

Score.propTypes = {
    deck: PropTypes.object.isRequired,
    correct: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired,
};

export default Score;
