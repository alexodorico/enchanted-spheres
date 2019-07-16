import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function Player(dimensions, firstTurn) {
  return {
    state: {
      health: 3,
      hand: new Array(),
      position: dimensions,
      spells: true,
      turn: firstTurn,
      priority: firstTurn
    },
    mutations: {
      toggle(state, property) {
        state[property] = !state[property];
      },
      updateHealth(state, amount) {
        state.health = state.health + amount;
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
    black: Player([0, 0], true),
    white: Player([6, 6], false),
    stack: new Array(),
    history: new Array()
  },
  getters: {},
  mutations: {},
  actions: {}
});
