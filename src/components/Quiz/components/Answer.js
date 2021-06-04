import { Button, Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import { green, red } from '../../../utils/color';

const Answer = (props) => {

    const { card, onCorrect, onIncorrect } = props;

    return (
      <>
          <Text h4 style={{ marginBottom: 20, alignSelf: 'center' }}>{card.answer}</Text>
          <Button title="Correct" onPress={onCorrect} buttonStyle={{ backgroundColor: green, marginBottom: 20 }}/>
          <Button title="Incorrect" onPress={onIncorrect} buttonStyle={{ backgroundColor: red, marginBottom: 20 }}/>
      </>
    );
};

Answer.propTypes = {
    card: PropTypes.object.isRequired,
    onCorrect: PropTypes.func.isRequired,
    onIncorrect: PropTypes.func.isRequired,
};

export default Answer;
