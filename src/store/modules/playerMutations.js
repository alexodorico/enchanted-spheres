const mutations = {
  updateHealth(state) {
    state.health = state.health - 1;
  },

  removeCardFromHand(state, payload) {
    state.hand = state.hand.filter(card => card !== payload.name);
  },

  organicMove(state, payload) {
    state.history[payload.user].unshift(payload.coordinates);
    state.position[payload.user] = payload.coordinates;
  },

  moveToPreviousPosition(state) {
    state.position = state.history[1];
  },

  moveToInitialPosition(state) {
    state.position = state.history[-1];
  },

  addConfusion(state) {
    state.confused = true;
  },

  removeConfusion(state) {
    state.confused = false;
  },

  togglePriority(state) {
    state.priority = !state.priority;
  },

  toggleTurn(state) {
    state.turn = !state.turn;
  }
};

export default mutations;
