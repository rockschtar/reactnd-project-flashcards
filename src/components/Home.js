import React from 'react';
import { Body, Button, Card, CardItem, Container, Content, Header, List, ListItem, Text, Title } from 'native-base';
import { connect } from 'react-redux';
import { white } from '../utils/color';
import { useNavigation } from '@react-navigation/native';

const Home = (props) => {

    const navigation = useNavigation();

    const decks = props.decks ?? [];

    return (
      <Container>

          {decks.length === 0 &&
          <Content contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ marginBottom: 20 }}>
                  You don't have any Decks
              </Text>
              <Button full title="Add Deck"
                      onPress={() => navigation.navigate('AddDeck')}>
                  <Text color={white} uppercase={false}>Add Deck</Text>
              </Button>
          </Content>
          }


          <List contentContainerStyle={{ alignItems: 'center' }}
                dataArray={decks}
                renderRow={deck =>
                  <ListItem key={deck.id} onPress={() => navigation.navigate('Deck', { deck: deck })}>

                      <Card style={{ alignItems: 'center', width: '100%' }}>
                          <CardItem header>
                              <Text h4>{deck.name}</Text>
                          </CardItem>

                          <CardItem footer>
                              <Text>Cards: {deck.cards.length}</Text>
                          </CardItem>
                      </Card>


                  </ListItem>
                }/>
      </Container>
    );
};

export default connect(({ decks }) => {
      return {
          decks: Object.values(decks),
      };
  },
)(Home);
