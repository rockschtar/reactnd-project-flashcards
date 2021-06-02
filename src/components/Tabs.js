import { Button, Footer, FooterTab, Icon } from 'native-base';
import { Text } from 'react-native';
import React from 'react';
import { white } from '../utils/color';

export default function Tabs({ state, descriptors, navigation }) {
    return (
      <Footer>
          <FooterTab>
              <Button vertical onPress={() => navigation.navigate('Home')}>
                  <Icon name="home" style={{ color: white}} active={false} />
                  <Text style={{ color: white}}>Home</Text>
              </Button>
              <Button vertical onPress={() => navigation.navigate('AddDeck')}>
                  <Icon name="add" style={{ color: white}} />
                  <Text style={{ color: white}}>Add Deck</Text>
              </Button>
          </FooterTab>
      </Footer>
    );
}
