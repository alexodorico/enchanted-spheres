import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function Player(color, dimensions, firstTurn) {
  return {
    state: {
      color,
      health: 3,
      hand: new Array(),
      position: dimensions,
      spells: true,
      turn: firstTurn,
      priority: firstTurn
    },
    mutations: {
      updateHealth(state, payload) {
        if (payload.player === state.color) {
          state.health = state.health + payload.amount;
        }
      },
      updatePosition(state, coordinates) {
        state.position = coordinates;
      },
      updateHand(state, cardName, action) {
        if (action === "add") {
          state.hand.push(cardName);
        } else {
          state.hand = state.hand.filter(card => card !== cardName);
        }
      },
      updateSpells(state, value) {
        state.spells = value;
      }
    },
    actions: {},
    getters: {}
  };
}

export default new Vuex.Store({
  state: {
    gameStarted: false,
    gameEnded: false,
    playersJoined: 0,
    stack: new Array(),
    history: new Array()
  },
  getters: {},
  mutations: {
    toggleBoolean(state, property) {
      state[property] = !state[property];
    },
    togglePlayer(state, property) {
      state[property] = state[property] === "black" ? "white" : "black";
    }
  },
  actions: {},
  modules: {
    black: Player("black", [0, 0], true),
    white: Player("white", [6, 6], false)
  }
});
