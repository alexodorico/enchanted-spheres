import { UPDATE_LIFE, PLAY_CARD, PLAY_CARD } from "./actions";

const initialState = {
  gameStarted: false,
  gameEnded: false,
  playersJoined: 0,
  black: {
    lives: 3,
    hand: new Array(),
    position: [0,0],
    spells: true
  },
  white: {
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

    case PLAY_CARD:
      playCard(state, action);
      return state;

    case ATTACK:
      return attack(state, action.player);
    
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

function counterAttack(state, action) {
  let player = toggle(action.player);
  return attack(state, player);
}

// Takes in player who's being attacked
function attack(state, player) {
  return Object.assign({}, state, {
    [player]: {
      ...state[player],
      lives: state[player].lives - 1
    }
  });
}

function counterSpell(state, action) {
  // TODO
}

function block(state, action) {
  // return state;
}

function confusion(state, action) {
  // TODO
}

function stutter(state, action) {
  // TODO
}

function timeWarp(state, action) {
  return Object.assign({}, state, {
    black: {
      ...state.black, position: [0,0]
    },
    white: {
      ...state.white, position: [6,6]
    }
  });
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
