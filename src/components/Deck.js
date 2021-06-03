import React from 'react';
import { Text, View } from 'react-native';
import { handleDeleteDeck } from '../actions/decks';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { purpleLight, turquoise } from '../utils/color';
import { styles } from '../utils/styles';
import ActivityOverlay from './ActivityOverlay';
import DeckItem from './DeckItem';
import AddCardButton from './AddCardButton';

class Deck extends React.Component {

    state = {
        loading: false,
    };

    componentDidMount() {

        const { deck } = this.props.route.params;

        this.props.navigation.setOptions({
            headerTitle: deck.name
        });
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
          <View style={styles.container}>


              <ActivityOverlay isVisible={loading}>
                  <Text>Deleting Deck...</Text>
              </ActivityOverlay>

              <AddCardButton deck={deck} buttonStyle={{ marginBottom: 20 }} />

              <Button title={'Start Quiz'}
                      buttonStyle={{ backgroundColor: turquoise, marginBottom: 20 }}
                      onPress={this.startQuiz} style={{ marginBottom: 20 }}/>

              <Button title={'Delete Deck'}
                      type={'outline'}
                      buttonStyle={{ borderColor: purpleLight }}
                      onPress={this.onDeleteDeck} style={{ marginBottom: 20 }}/>


          </View>
        );
    }
}

export default connect(({ decks, isLoading }) => {
      return {
          isLoading,
      };
  }, { handleDeleteDeck },
)(Deck);
