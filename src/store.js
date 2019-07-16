import Vue from "vue";
import Vuex from "vuex";
import { isContext } from "vm";

Vue.use(Vuex);

function Player(color, dimensions, firstTurn) {
  return {
    namespaced: true,
    state: {
      color,
      health: 3,
      hand: new Array(),
      position: dimensions,
      spells: true
    },
    mutations: {
      updateHealth(state, amount) {
        state.health = state.health + amount;
      },
      updatePosition(state, coordinates) {
        state.position = coordinates;
      },
      updateHand(state, payload) {
        if (payload.action === "add") {
          state.hand.push(payload.name);
        } else {
          state.hand = state.hand.filter(card => card !== payload.name);
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
    history: new Array(),
    turn: "black",
    priority: "black"
  },
  getters: {},
  mutations: {
    toggle(state, property) {
      state[property] = state[property] === "black" ? "white" : "black";
    }
  },
  actions: {},
  modules: {
    black: Player("black", [0, 0], true),
    white: Player("white", [6, 6], false)
  }
});
