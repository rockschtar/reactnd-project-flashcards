import { ADD_CARD, ADD_DECK, DELETE_DECK, RECEIVE_DECKS } from '../actions/decks';

export default function decks (state = {}, action) {
    switch (action.type) {

        case RECEIVE_DECKS:
            const { decks } = action

            return {
                ...state,
                ...decks
            }
        case ADD_DECK:
            const { deck } = action
            return {
                ...state,
                [deck.id]: deck
            }

        case DELETE_DECK:
            const { deckId } = action
            const next = state;
            delete next[deckId];

            return {
                ...next
            }

        case ADD_CARD:
            const newDecks = state.decks.map((deck) => {
                const cards = deck.cards
                return (deck.id === action.deckId) ?
                  {
                      ...deck,
                      "cards": cards.concat(action.card)
                  } :
                  deck
            })
            return {
                ...state,
                "decks": newDecks

            }
        default:
            return state
    }
}
