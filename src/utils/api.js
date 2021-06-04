import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = (function() {

    const STORAGE_KEY = 'UdacityFlashcards:Decks';

    const getDecks = async () => {
        return AsyncStorage.getItem(STORAGE_KEY).then((decksString) => {
            return JSON.parse(decksString) || {};
        });
    };

    const saveDeck = async (deck) => {
        let decks = await getDecks();
        decks = JSON.stringify({ ...decks, [deck.id]: { ...deck } });
        return AsyncStorage.setItem(STORAGE_KEY, decks).then(() => { return deck;});
    };

    const deleteDeck = async (deckId) => {
        let decks = await getDecks();
        decks[deckId] = undefined;
        delete decks[deckId];
        return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks)).then(() => {return deckId; });

    };

    return {
        saveDeck,
        getDecks,
        deleteDeck,
    };

})();

export default api;
