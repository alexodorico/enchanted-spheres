import Vue from "vue";
import Vuex from "vuex";

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
      updateHealth(state, payload) {
        state.health = state.health + payload.amount;
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
      state[property] = toggle(state[property]);
    },

    startGame(state) {
      state.gameStarted = true;
    },

    endGame(state) {
      state.gameEnded = true;
    },

    logHistory(state, payload) {
      state.history.unshift(payload);
    },

    playSpell(state, payload) {
      state.stack.unshift(payload);
    },

    counterSpell(state, payload) {},

    block(state, payload) {},

    teleport(state, payload) {},

    retreat(state, payload) {},

    stutter(state, payload) {},

    timeWarp(state, payload) {},

    freeze(state, payload) {
      const user = toggle(payload.user);
      state[user].canPlaySpell = false;
    }
  },
  actions: {
    resolveStack({ commit, state }) {
      state.stack.forEach(spell => commit(spell.name, spell));
    },

    attack({ commit }, payload) {
      const user = toggle(payload.user);
      const _payload = { user, amount: -1 };
      commit(`${_payload.user}/updateHealth`, _payload);
    },

    counterAttack({ dispatch }, payload) {
      dispatch("attack", payload);
    },

    checkForWin({ commit, state }) {
      let winners = ["black", "white"].filter(player => {
        state[player].health === 0;
      });

      if (winners) {
        commit("endGame");
      }
    }
  },
  modules: {
    black: Player("black", [0, 0], true),
    white: Player("white", [6, 6], false)
  }
});

function toggle(user) {
  console.log("called");
  return user === "black" ? "white" : "black";
}
