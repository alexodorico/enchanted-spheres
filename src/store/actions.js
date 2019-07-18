const actions = {
  playerAction({ commit }, payload) {
    commit("removeCardFromHand", payload);
    dispatch("passPriority", payload);
  },

  passPriority({ commit }, payload) {
    commit("updateStack", payload);
    commit("toggle", payload);
    commit("incrementStackPhase");

    if (state.stackPhase === 2) {
      dispatch("resolveStack");
    }
  },

  resolveStack({ commit, dispatch, state }) {
    state.stack.forEach(payload => {
      commit(payload.name, payload);
    });

    commit("resetStackPhase");
    dispatch("checkForWin");
  },

  checkForWin({ commit, state }) {
    let winners = ["black", "white"].filter(
      player => state.health[player] <= 0
    );

    if (winners.length) {
      commit("endGame");
    }
  }
};

export default actions;
