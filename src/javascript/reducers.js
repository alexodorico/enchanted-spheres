import { UPDATE_LIFE, PLAY_CARD, playCard } from "./actions";

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

      case PLAY_CARD:
        return playCard(state, action);
    
    default:
      return state;
  }
}

function playCard(state, action) {
  switch(action.card) {
    case "COUNTER_ATTACK":
      return counterAttack(state, action);
    case "COUNTER_SPELL":
      return counterSpell(state, action);
    case "BLOCK":
      return block(state, action);
    case "FREEZE":
      return freeze(state, action);
    case "STUTTER":
      return stutter(state, action);
    case "TIME_WARP":
      return timeWarp(state, action);
    case "CONFUSION":
      return confusion(state, action);
    case "SHORTCUT":
      return shortcut(state, action);
  }
}
