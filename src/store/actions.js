import { swap } from "./store";

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


  // passing priority doesn't always resolve the stack
  // If it's a user's turn and doesn't take an action and passes instead,
  // Priority is swapped
  // If a user passes when it's their turn and no card on stack,
  // Increment turn phase and no response can be played by opponent
  async passPriority({ commit, dispatch, state }, payload) {
    // this is wrong
    // if it's a user turn and they pass,
    // the stack phase will be either zero or one
    // If it's zero, an opponent cannot play a spell in response
    // And the turn phase is increment
    // If it's 1 and they pass, the stack resolves
    // and turn phase is incremented
    if (payload.user && state[payload.user].turn) {
      if (state.stackPhase === 0) {
        // If users turn and stack phase is zero
        // it means no actions are declared
        // and opponent can't play spell in response.
        // So passing is considered an action I guess.
        // Priority isn't toggled here; it will still
        // be the users priority because they're
        // just moving to the next turn phase
        await commit("incrementTurnPhase");
      } else {
        // if stack phase is one, it's in a response to a spell
        // and stack resolves
        await dispatch("resolveStack");
      }
    } else {
      // if it's your opponents turn and they pass,
      // the stack resolves because stack phase will 
      // *always* be 1 when it's opponents priority
      // during your turn
      await dispatch("resolveStack");
      await commit("togglePriority", payload);
    }
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
  moveOrAttack({ commit, state }, payload) {
    const attack = checkForAttack(state, payload);

    if (attack) {
      const user = swap(payload.user);
      await commit(`${user}/updateHealth`);
      await dispatch("checkForWin");
    } else {
      commit(`${payload.user}/organicMove`, payload);
    }
  },

  // check to see if attack is valid
  // before updating health
  // async attack({ commit, dispatch }, payload) {
  // },

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
