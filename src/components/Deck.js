import React from 'react';
import { BackHandler, Text } from 'react-native';

import {
    Button,
    Container,
    Content,
    Spinner,
    Subtitle,

} from 'native-base';
import { handleDeleteDeck } from '../actions/decks';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';


class Deck extends React.Component {

    state = {
        loading: false,
    };

    backAction = () => {
        this.props.navigation.navigate('Home');
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          this.backAction,
        );

        const { deck } = this.props.route.params;

        this.props.navigation.setOptions({ title: deck.name })


    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onDeleteDeck = () => {
        const { deck } = this.props.route.params;
        const { handleDeleteDeck } = this.props;

        this.setState({ loading: true });

        handleDeleteDeck(deck.id).then(() => {
            this.setState({ loading: false }, () => {
                this.props.navigation.navigate('Home', { screen: 'Home' });
            });
        });

    };

    startQuiz = () => {
        const { deck } = this.props.route.params;
        this.props.navigation.navigate('Quiz', { deck });
    };

    render() {

        const { deck } = this.props.route.params;
        const { loading } = this.state;

        return (
          <Container>


              <Overlay isVisible={loading}>
                  <Spinner/>
                  <Text>Deleting Deck...</Text>
              </Overlay>


              <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, padding: 50 }}>
                  <Button primary full style={{ marginBottom: 20 }}
                          onPress={() => this.props.navigation.navigate('AddCard', { deck: deck })}>
                      <Subtitle>Add Card</Subtitle>
                  </Button>

                  <Button transparent bordered dark full onPress={this.startQuiz} style={{ marginBottom: 20 }}>
                      <Text>Start Quiz</Text>
                  </Button>

                  <Button transparent danger full onPress={this.onDeleteDeck}>
                      <Text>Delete Deck</Text>
                  </Button>
              </Content>
          </Container>
        );
    }
}

export default connect(({ decks, isLoading }) => {
      return {
          isLoading,
      };
  }, { handleDeleteDeck },
)(Deck);
