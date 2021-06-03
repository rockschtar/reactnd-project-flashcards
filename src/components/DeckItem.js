import { Card, Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';

const DeckItem = (props) => {

    const { deck, ...rest } = props;

    return (
      <Card {...rest}>
          <Card.Title>{deck.name}</Card.Title>
          <Card.Divider/>
          <Text style={{ alignSelf: 'center' }}>Cards: {deck.cards.length}</Text>
      </Card>
    )

}

DeckItem.propTypes = {
    deck: PropTypes.object.isRequired
}

export default DeckItem
