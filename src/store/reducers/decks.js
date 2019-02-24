import {
  GET_DECKS, ADD_DECK, REMOVE_DECK,
  ADD_CARD, REMOVE_CARD,
} from '../actions/decks';

const initialState = {
  loading: true,
  list: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        loading: false,
        list: action.decks
      };

    case ADD_DECK:
      return {
        loading: false,
        list: action.decks
      }

    case ADD_CARD:
      return {
        loading: false,
        list: action.decks
      }

    case REMOVE_DECK:
      return {
        loading: false,
        list: action.decks
      }

    case REMOVE_CARD:
      return {
        loading: false,
        list: action.decks
      }

    default:
      return state;
  }
}