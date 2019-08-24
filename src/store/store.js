import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import { Player } from "./modules/playerStore";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    black: new Player([0, 0], true),
    white: new Player([4, 4], false)
  },
  plugins: [createLogger()]
});

export function swap(user) {
  return user === "black" ? "white" : "black";
}

export function checkForAttack(state, payload) {
  const r = [payload.coordinates[0], payload.coordinates[1]]; // requested position

  // going to have to change this to this.user === black ? "white" : "black"
  const opponent = state.black.turn ? "white" : "black";

  if (
    r[0] === state[opponent].position[0] &&
    r[1] === state[opponent].position[1]
  ) {
    return true;
  }

  return false;
}
