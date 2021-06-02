import { v4 as uuid } from 'uuid'
import 'react-native-get-random-values'
export default class Deck {

    constructor(id, name, cards = []) {
        this.id = id;
        this.name = name;
        this.cards = [];
    }

    static create(name) {
        return new Deck(uuid(), name);
    }

    toJson = () => {
        return JSON.stringify(this)
    }



}

