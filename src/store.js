import Vue from "vue";
import Vuex from "vuex";
import { isContext } from "vm";

Vue.use(Vuex);

function Player(color, dimensions) {
  return {
    namespaced: true,
    state: {
      color,
      health: 3,
      hand: new Array(),
      position: dimensions,
      canPlaySpell: true
    },
    mutations: {
      updateHealth(state, amount) {
        state.health = state.health + amount;
      },
      updatePosition(state, coordinates) {
        // Current position
        const c = state.position;

        // Requested position
        const r = coordinates;

        // Distance requested
        const d = [Math.abs(c[0] - r[0]), Math.abs(c[1] - r[1])];

        // Within the 7x7 grid
        const onBoard = r[0] <= 6 && r[1] <= 6 && (r[0] >= 0 && r[1] >= 0);

        // Not moving diagonal and not more than one space
        const validMove = (d[0] == 1 && d[1] == 0) || (d[0] == 0 && d[1] == 1);

        if (onBoard && validMove) {
          state.position = coordinates;
          console.log("valid move");
        } else {
          console.log("Please make a valid move");
        }
      },
      updateHand(state, payload) {
        if (payload.action === "add") {
          state.hand.push(payload.name);
        } else {
          state.hand = state.hand.filter(card => card !== payload.name);
        }
      },
      updateSpells(state, value) {
        state.canPlaySpell = value;
      }
    },
    actions: {},
    getters: {}
  };
}
import createLogger from "vuex/dist/logger";
export default new Vuex.Store({
  plugins: [createLogger()],
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
    },
    startGame(state) {
      state.gameStarted = true;
    },
    endGame(state) {
      state.gameEnded = true;
    },
    playSpell(state, payload) {
      state.stack.unshift(payload);
    },
    logHistory(state, payload) {
      state.history.unshift(payload);
    },
    resolveStack(state) {
      state.stack.forEach(spell => activate[spell]);
    },
    attack(state, payload) {}
  },
  actions: {},
  modules: {
    black: Player("black", [0, 0], true),
    white: Player("white", [6, 6], false)
  }
});

function createSpellBook() {
  const spells = (_ => {
    return {
      teleport: (payload => {
        return {
          activate: function() {
            console.log("activate fired");
            console.log(payload);
          },
          setPayload: function(values) {
            payload = values;
          }
        };
      })()
    };
  })();

  return spells;
}
