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
