import { Button } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const AddCardButton = (props) => {

    const { deck, ...rest } = props;

    const navigation = useNavigation();

    return (
      <Button title={'Add Card'}
              {...rest}
              onPress={() => navigation.navigate('AddCard', { deck })}/>
    )
}

AddCardButton.propTypes = {
    deck: PropTypes.object.isRequired
}

export default AddCardButton;
