import { UPDATE_LIFE, PLAY_CARD, PLAY_CARD } from "./actions";

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

  // array of player and card objects
  stack: new Array(),
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
    
    case TOGGLE_TURN:
      return Object.assign({}, state, {
        turn: toggle(state.turn)
      });

    case UPDATE_LIFE:
      return Object.assign({}, state, {
        [action.player]: {
          ...state[player],
          lives: state[player].lives + action.amount
        }
      });

      case PLAY_CARD:
        playCard(state, action);
        return state;

      case ATTACK:
        attack(state, action);
        return state;
    
    default:
      return state;
  }
}

function playCard(state, action) {
  switch(action.card) {
    case "COUNTER_ATTACK":
      return attack(state, action);
    case "COUNTER_SPELL":
      return counterSpell(state, action);
    case "BLOCK":
      return block(state, action);
    case "CONFUSION":
      return confusion(state, action);
    case "STUTTER":
      return stutter(state, action);
    case "TIME_WARP":
      return timeWarp(state, action);
    case "RETREAT":
      return retreat(state, action);
    case "TELEPORT":
      return teleport(state, action);
  }
}

// Action from attacking player that opponents life by one
function attack(state, action) {
  let player = toggle(action.player);
  return store.dispatch(updateLife(player, -1));
}

function counterSpell(state, action) {
  // TODO
}

function block(state, action) {
  // TODO
}

function confusion(state, action) {
  // TODO
}

function stutter(state, action) {
  // TODO
}

function timeWarp(state, action) {
  // TODO
}

function retreat(state, action) {
  // TODO
}

function teleport(state, action) {
  // TODO
}

function toggle(player) {
  return player === "black" ? "white" : "black";
}
