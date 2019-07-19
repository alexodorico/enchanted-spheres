import { swap } from "./store";
import { cpus } from "os";

const actions = {
  async spellIntent({ commit, dispatch }, payload) {
    await dispatch("managePhases", payload);
    await commit(`${payload.user}/removeCardFromHand`, payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority");
  },

  async moveIntent({ commit, dispatch }, payload) {
    await dispatch("managePhases", payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority", payload);
  },

  async attackIntent({ commit, dispatch }, payload) {
    await dispatch("managePhases", payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority", payload);
  },

  managePhases({ commit, state }) {
    commit("incrementTurnPhase");

    if (state.stackPhase === 0) {
      commit("incrementStackPhase");
    }
  },

  async passPriority({ commit, dispatch, state }, payload) {
    if (payload.user && state[payload.user].turn) {
      await commit("incrementTurnPhase");
    }

    await commit("togglePriority", payload);
    await dispatch("resolveStack");
  },

  async resolveStack({ commit, dispatch, state }) {
    for (let action of state.stack) {
      await dispatch(action.name, action);
    }

    await commit("clearStack");
    await commit("resetStackPhase");

    if (state.turnPhase >= 3) {
      await commit("resetTurnPhase");
      await dispatch("checkForConfusion");
      await commit("toggleTurn");
    }
  },

  checkForConfusion({ commit, state }) {
    if (state.black.turn) {
      commit("black/removeConfusion");
    } else {
      commit("white/removeConfusion");
    }
  },

  checkForWin({ commit, state }) {
    const winner = ["black", "white"].filter(
      player => state[player].health <= 0
    );

    if (winner.length) {
      commit("endGame", { winner });
    }
  },

  move({ commit }, payload) {
    commit(`${payload.user}/organicMove`, payload);
  },

  async attack({ commit, dispatch }, payload) {
    const user = swap(payload.user);
    await commit(`${user}/updateHealth`);
    await dispatch("checkForWin");
  },

  /*
    Card Actions
  */
  async counterAttack({ commit, dispatch }, payload) {
    const user = swap(payload.user);
    await commit(`${user}/updateHealth`);
    await dispatch("checkForWin");
  },

  counterSpell({ commit }) {
    commit("removeActionFromStack");
  },

  confusion({ commit }, payload) {
    const user = swap(payload.user);
    commit(`${user}/addConfusion`);
  },

  block({ commit }) {
    commit("removeActionFromStack");
  },

  teleport({ commit }, payload) {
    const user = swap(payload.user);
    commit(`${user}/moveToPreviousPosition`, payload);
  },

  retreat({ commit }, payload) {
    commit(`${payload.user}/moveToPreviousPosition`);
  },

  stutter({ commit }) {
    commit("black/moveToPreviousPosition");
    commit("white/moveToPreviousPosition");
  },

  timeWarp({ commit }) {
    commit("black/moveToInitialPosition");
    commit("white/moveToInitialPosition");
  }
};

export default actions;
