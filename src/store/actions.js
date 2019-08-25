import { swap, checkForAttack } from "./store";

const actions = {

  /*
    1.These two need to increment stack phase only if 
      stack phase = 0.
    2.Stack phase will always be 1 if there's
      a card on the stack
  */
  async spellIntent({ commit, dispatch }, payload) {
    // Need to take into account users can play spells
    // when it's not their turn
    await dispatch("manageStackPhase", payload);
    await commit(`${payload.user}/removeCardFromHand`, payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority");
  },

  // Moves can turn into attacks
  // This will always increment stack phase as
  // users can only move on their turn
  // and cannot move in response to a spell
  async moveOrAttackIntent({ commit, dispatch }, payload) {
    await dispatch("manageStackPhase", payload);
    await commit("addActionToStack", payload);
    await commit("togglePriority", payload);
  },

  // -Need to check on every move or spell declared
  // -If an action is on the stack, it doesn't
  // matter who's turn it is, it doesn't increment.
  // -Stack phase of 1 means that an action was declared
  // -Only passes can move stack phase from 1 -> 2
  manageStackPhase({ commit, state }) {
    if (state.stackPhase === 0) {
      commit("incrementStackPhase");
    }
  },

  // Passing priority is basically telling the stack to resolve
  // If it's not your turn, and three actions haven't been played
  // yet, pass it back
  async passPriority({ commit, dispatch, state }, payload) {

    if (state[payload.user].turn) {
      if (state.turnPhase > 2) {
        commit("togglePriority")
      }
    } else {
      if (state.turnPhase !== 3) {
        commit("togglePriority");
      }
    }

    await dispatch("resolveStack");
  },

  // When the stack resolves, that means
  // priority was passed twice in a row.
  async resolveStack({ commit, dispatch, state }) {
    for (let action of state.stack) {
      await dispatch(action.name, action);
    }

    await commit("clearStack");
    await commit("resetStackPhase");
    await commit("incrementTurnPhase");

    if (state.turnPhase >= 3) {
      // Users turn is done
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


  // This happens at the end of each attack
  checkForWin({ commit, state }) {
    const winner = ["black", "white"].filter(
      player => state[player].health <= 0
    );

    if (winner.length) {
      commit("endGame", { winner });
    }
  },

  // Combine move and attack?
  async moveOrAttack({ commit, state, dispatch }, payload) {
    const attack = await checkForAttack(state, payload);

    if (attack) {
      const user = swap(payload.user);
      await commit(`${user}/updateHealth`);
      await dispatch("checkForWin");
    } else {
      commit(`${payload.user}/organicMove`, payload);
    }
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
