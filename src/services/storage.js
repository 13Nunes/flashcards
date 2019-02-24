// Basic
import { AsyncStorage } from 'react-native';
import uuid from "uuid";

// import { connect } from 'react-redux'
import { addDeck } from '../store/actions/decks';

// Set key
export const DECKS_STORAGE_KEY = 'Flashcards::decks';

export function getDecks() {
  return AsyncStorage
    .getItem(DECKS_STORAGE_KEY)
    .then((decks) => JSON.parse(decks))
}

export function saveDeck(title) {
  const id = uuid.v4().replace(/-/g, "");

  getDecks()
    .then((decks) => {
      return {
        ...decks,
        [id]: {
          title,
          cards: [],
        }
      }
    })
    .then((decksUpdated) => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksUpdated));
      this.props.dispatch(addDeck(decksUpdated));
    });
}