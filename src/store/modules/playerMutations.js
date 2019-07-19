const mutations = {
  updateHealth(state) {
    state.health = state.health - 1;
  },

  removeCardFromHand(state, payload) {
    state.hand = state.hand.filter(card => card.name !== payload.name);
  },

  organicMove(state, payload) {
    state.history.unshift(payload.coordinates);
    state.position = payload.coordinates;
  },

  moveToPreviousPosition(state) {
    if (state.history.length > 1) {
      state.position = state.history[1];
    }
  },

  moveToInitialPosition(state) {
    state.position = state.history[state.history.length - 1];
  },

  addConfusion(state) {
    state.confused = true;
  },

  removeConfusion(state) {
    state.confused = false;
  }
};

export default mutations;
