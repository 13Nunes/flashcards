// Basic
import { AsyncStorage } from 'react-native';
import uuid from "uuid";

// Constants
export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_DECK = 'REMOVE_DECK';
export const REMOVE_CARD = 'REMOVE_CARD';

// Set storage key
export const DECKS_STORAGE_KEY = 'Flashcards::decks';

//
function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}
export function handleGetDecks() {
  return dispatch => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks => {
      dispatch(getDecks(JSON.parse(decks)));
    });
  };
}
//
function addDeck(decks) {
  return {
    type: ADD_DECK,
    decks,
  }
}
export function handleAddDeck(title) {
  return dispatch => {
    const id = uuid.v4().replace(/-/g, "");
    return AsyncStorage
      .getItem(DECKS_STORAGE_KEY)
      .then((decks) => JSON.parse(decks))
      .then((decks) => {
        return {
          ...decks,
          [id]: {
            id,
            title,
            cards: [],
          }
        }
      })
      .then((decksUpdated) => {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksUpdated));
        dispatch(addDeck(decksUpdated));
        return decksUpdated;
      }).then((decksUpdated) => {
        return decksUpdated[id];
      });
  };
}
//
function addCard(decks) {
  return {
    type: ADD_CARD,
    decks
  }
}
export function handleAddCard(deck, card) {
  return dispatch => {
    const cardId = uuid.v4().replace(/-/g, "");
    card.id = cardId;
    return AsyncStorage
      .getItem(DECKS_STORAGE_KEY)
      .then((decks) => JSON.parse(decks))
      .then((decks) => {
        return {
          ...decks,
          [deck.id]: {
            ...decks[deck.id],
            cards: decks[deck.id].cards.concat([card]),
          }
        }
      })
      .then((decksUpdated) => {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksUpdated));
        dispatch(addCard(decksUpdated));
      });
  };
}
//
function removeDeck(decks) {
  return {
    type: REMOVE_DECK,
    decks,
  }
}
export function handleRemoveDeck(deckId) {
  return dispatch => {
    return AsyncStorage
      .getItem(DECKS_STORAGE_KEY)
      .then((decks) => JSON.parse(decks))
      .then((decks) => {
        const newDeck = { ...decks };
        delete newDeck[deckId];
        return newDeck
      })
      .then((decksUpdated) => {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksUpdated));
        dispatch(removeDeck(decksUpdated));
      });
  };
}
//
function removeCard(decks) {
  return {
    type: REMOVE_CARD,
    decks,
  }
}
export function handleRemoveCard(deckId, cardId) {
  return dispatch => {
    return AsyncStorage
      .getItem(DECKS_STORAGE_KEY)
      .then((decks) => JSON.parse(decks))
      .then((decks) => {
        const newDeck = { ...decks };
        newDeck[deckId].cards = newDeck[deckId].cards.filter((e) => e.id !== cardId);
        return newDeck;
      })
      .then((decksUpdated) => {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksUpdated));
        dispatch(removeCard(decksUpdated));
      });
  };
}