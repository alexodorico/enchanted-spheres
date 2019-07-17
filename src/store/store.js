import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createLogger()]
});

export function toggle(user) {
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
