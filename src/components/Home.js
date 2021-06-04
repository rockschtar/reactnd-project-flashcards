import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from '../utils/styles';
import { Text, Button } from 'react-native-elements';
import DeckItem from './DeckItem';

const Home = (props) => {

    const navigation = useNavigation();

    const decks = props.decks ?? [];

    return (
      <View style={styles.container}>

          {decks.length === 0 &&
          <>
              <Text h4 style={{ marginBottom: 20, alignSelf: 'center' }}>
                  You don't have any Decks
              </Text>

              <Button title="Add Deck" onPress={() => navigation.navigate('AddDeck')}/>

          </>

          }

          <FlatList data={decks}
                    renderItem={({ item }) =>
                      <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Deck', { deck: item })}>

                          <DeckItem deck={item}/>

                      </TouchableOpacity>

                    }
          />
      </View>
    );
};

export default connect(({ decks }) => {
    return {
        decks: Object.values(decks),
    };
})(Home);
