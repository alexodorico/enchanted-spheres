const actions = {
  moveIntent({ commit }, payload) {
    const validMove = checkForValidMove(state, payload.coordinates);
    if (validMove) {
      commit("updateStack", payload);
      commit("toggle", payload);
    }
  },

  attackIntent({ commit }, payload) {
    commit("updateStack", payload);
    commit("toggle", payload);
  },

  playSpell({ commit }, payload) {
    commit("removeCardFromHand", payload);
    commit("updateStack", payload);
    commit("toggle", payload);
  },

  pass({ commit }, payload) {
    commit("toggle", payload);
  },

  resolveStack({ commit, dispatch, state }) {
    state.stack.forEach(actions => {
      commit(actions.name, actions);
    });

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
