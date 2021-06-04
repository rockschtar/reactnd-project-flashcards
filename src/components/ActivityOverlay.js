import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { purple } from '../utils/color';
import React from 'react';
import PropTypes from 'prop-types';

const ActivityOverlay = (props) => {

    const isVisible = props.isVisible ?? false;

    return (

      <Overlay isVisible={isVisible}>
          <ActivityIndicator size="large" animating={true} color={purple}/>
          {props.children}
      </Overlay>
    );

};

ActivityOverlay.propTypes = {
    isVisible: PropTypes.bool,
};

export default ActivityOverlay;
