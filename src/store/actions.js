import { swap } from "./store";

const actions = {

  /*
    -These three need to increment stack phase if 
    stack phase = 0.
    -Also need to increment turn phase if stack phase = 0
  */
  async spellIntent({ commit, dispatch }, payload) {
    await dispatch("manageStackPhase", payload);
    await commit(`${payload.user}/removeCardFromHand`, payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority");
  },

  async moveIntent({ commit, dispatch }, payload) {
    await dispatch("manageStackPhase", payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority", payload);
  },

  async attackIntent({ commit, dispatch }, payload) {
    await dispatch("manageStackPhase", payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority", payload);
  },

  // -Need to check on every action
  // -If an action is on the stack, it doesn't
  // matter who's turn it is, it doesn't increment
  // -Only passes can move stack phase from 1 - 2
  manageStackPhase({ commit, state }) {
    commit("incrementTurnPhase");

    if (state.stackPhase === 0) {
      commit("incrementStackPhase");
    }
  },


  // passing priority doesn't always resolve the stack
  // If it's a user's turn and doesn't take an action and passes instead,
  // Priority is swapped
  // If a user passes when it's their turn and no card on stack,
  // Increment turn phase and no response can be played by opponent
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
