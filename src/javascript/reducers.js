import { UPDATE_LIFE, PLAY_CARD } from "./actions";

const initialState = {
  gameStarted: false,
  gameEnded: false,
  playersJoined: 0,
  black: {
    name: new String(),
    lives: 3,
    hand: new Array(),
    position: [0,0],
    spells: true
  },
  white: {
    name: new String(),
    lives: 3,
    hand: new Array(),
    position: [6,6],
    spells: true
  },
  turn: new String(),
  cardPlayed: {
    card: new Object(),
    player: new String()
  },
  history: new Array()
}

function endgame(state = initialState, action) {
  switch (action.type) {
    case PLAYER_JOINED:
      if (state.playersJoined > 2) {
        return Object.assign({}, state, {
          //
        });
      }
      return state;

    case UPDATE_LIFE:
      return Object.assign({}, state, {
        [action.player]: {
          ...state[player],
          lives: state[player].lives + action.amount
        }
      });
    
    default:
      return state;
  }
}
