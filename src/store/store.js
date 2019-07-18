import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import { Player } from "./state";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameStarted: true,
    gameEnded: false,
    playersJoined: 0,
    stack: new Array(),
    stackPhase: 0,
    turnPhase: 0,
    winner: false
  },
  mutations,
  actions,
  modules: {
    black: new Player([0, 0], true),
    white: new Player([6, 6], false)
  },
  plugins: [createLogger()]
});

export function swap(user) {
  return user === "black" ? "white" : "black";
}

export function checkForValidMove(state, coordinates) {
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
    return true;
  }

  return false;
}
