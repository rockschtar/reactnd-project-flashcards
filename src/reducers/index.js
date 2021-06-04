import { combineReducers } from 'redux';

import decks from './decks';
import { appLoading, isLoading } from './loading';

export default combineReducers({
    decks,
    isLoading,
    appLoading,
});
