import { swap } from "./store";

const actions = {
  spellIntent({ commit, dispatch }, payload) {
    dispatch("managePhases", payload);
    commit(`${payload.user}/removeCardFromHand`, payload);
    commit("addActionToStack", payload);
    commit("togglePriority", payload);
  },

  moveIntent({ commit, dispatch }, payload) {
    dispatch("managePhases", payload);
    commit("addActionToStack", payload);
    commit("togglePriority", payload);
  },

  attackIntent({ commit, dispatch }, payload) {
    dispatch("managePhases", payload);
    commit("addActionToStack", payload);
    commit("togglePriority", payload);
  },

  managePhases({ commit, state }, payload) {
    if (state[payload.user].turn && state.stackPhase === 0) {
      commit("incrementTurnPhase");
    }

    if (state.stackPhase === 0) {
      commit("incrementStackPhase");
    }
  },

  passPriority({ commit, dispatch }, payload) {
    dispatch("resolveStack");
    commit("togglePriority", payload);
  },

  resolveStack({ commit, dispatch, state }) {
    state.stack.forEach(payload => {
      dispatch(payload.name, payload);
    });

    commit("resetStackPhase");
    commit("incrementTurnPhase");

    if (state.turnPhase === 3) {
      commit("resetTurnPhase");
      commit("togglePriority");
      commit("toggleTurn");
      dispatch("checkForConfusion");
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
    commit("incrementTurnPhase");
  },

  attack({ commit, dispatch }, payload) {
    const user = swap(payload.user);
    commit(`${user}/updateHealth`);
    dispatch("checkForWin");
    commit("incrementTurnPhase");
  },

  counterAttack({ commit, dispatch }, payload) {
    const user = swap(payload.user);
    commit(`${user}/updateHealth`);
    dispatch("checkForWin");
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
    commit(`${payload.user}/organicMove`, payload);
    commit("incrementTurnPhase");
  },

  retreat({ commit }, payload) {
    commit(`${payload.user}/moveToPreviousPosition`);
  },

  stutter({ commit }) {
    commit("moveToPreviousPosition");
  },

  timeWarp({ commit }) {
    commit("moveToInitialPosition");
  }
};

export default actions;
