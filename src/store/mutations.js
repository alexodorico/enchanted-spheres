const mutations = {
  setPlayerColor(state, payload) {
    state.player = payload.color;
  },

  startGame(state) {
    state.gameStarted = true;
  },

  addActionToStack(state, payload) {
    state.stack.unshift(payload);
  },

  removeActionFromStack(state) {
    state.stack.shift();
  },

  clearStack(state) {
    state.stack = new Array();
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
    state.winner = payload.winner[0];
  },

  togglePriority(state) {
    state.black.priority = !state.black.priority;
    state.white.priority = !state.white.priority;
  },

  toggleTurn(state) {
    state.black.turn = !state.black.turn;
    state.white.turn = !state.white.turn;

    if (state.black.turn) {
      state.black.priority = true;
      state.white.priority = false;
    } else {
      state.black.priority = false;
      state.white.priority = true;
    }
  }
};

export default mutations;
