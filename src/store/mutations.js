const mutations = {
  startGame(state) {
    state.gameStarted = true;
  },

  addActionToStack(state, payload) {
    state.stack.unshift(payload);
  },

  removeActionFromStack(state) {
    state.stack.shift();
  },

  incrementStackPhase(state) {
    state.stackPhase = state.stackPhase + 1;
  },

  incrementTurnPhase(state) {
    state.turnPhase = state.turnPhase + 1;
  },

  resetStackPhase(state) {
    state.stackPhase = 0;
  },

  resetTurnPhase(state) {
    state.turnPhase = 0;
  },

  endGame(state, payload) {
    state.gameEnded = true;
    state.winner = payload.winner;
  }
};

export default mutations;
