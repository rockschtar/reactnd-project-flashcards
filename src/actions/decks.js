import { hideLoading, showLoading } from 'react-redux-loading';
import { appLoading, isLoading } from './loading';
import api from '../utils/api';
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}
 function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId,
    }
}

export function addCard(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card
    }
}

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function handleDeleteDeck(deckId) {
    return dispatch => {

        dispatch(isLoading())

        return api.deleteDeck(deckId).then(
          deckId => {
              dispatch(deleteDeck(deckId))
              dispatch(isLoading(false))
          }

        )
    }
}

export function handleAddDeck(deck) {

    return dispatch => {

        dispatch(isLoading())

        return api.saveDeck(deck).then(
          deck => {
              dispatch(addDeck(deck))
              dispatch(isLoading(false))
              return deck;
          }

        )
    }
}

export function handleReceiveDecks() {

    return dispatch => {

        dispatch(appLoading())

        return api.getDecks().then(
          decks => {
              dispatch(receiveDecks(decks))
              dispatch(appLoading(false))
          }

        )
    }
}


