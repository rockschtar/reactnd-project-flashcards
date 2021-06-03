import { Button, Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import { purpleLight } from '../../../utils/color';

const Question = (props) => {

    const { card, onShowAnswer } = props;

    return (
      <>
          <Text h4 style={{ marginBottom: 20, alignSelf: 'center' }}>{card.question}</Text>
          <Button title={'Show Answer'}
                  buttonStyle={{ backgroundColor: purpleLight, marginBottom: 20 }}
                  onPress={onShowAnswer}/>

      </>

    );
};

Question.propTypes = {
    card: PropTypes.object.isRequired,
    onShowAnswer: PropTypes.func.isRequired,
};

export default Question;
