import { Button } from 'react-native-elements';
import { turquoise } from '../../../utils/color';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import AddCardButton from '../../AddCardButton';

const BackToDeckButton = (props) => {

    const { deck, ...rest } = props;

    const navigation = useNavigation();

    return (
      <Button title={'Back to Deck'}
              {...rest}
              buttonStyle={{ backgroundColor: turquoise }}
              onPress={() => navigation.navigate('Deck', { deck })}/>
    );
};

BackToDeckButton.propTypes = {
    deck: PropTypes.object.isRequired,
};

export default BackToDeckButton;

