import { swap } from "./store";

const mutations = {
  startGame(state) {
    state.gameStarted = true;
  },

  endGame(state, payload) {
    state.gameEnded = true;
    state.winner = payload.winner;
  },

  updateStack(state, payload) {
    state.stack.unshift(payload);
  },

  organicMove(state, payload) {
    state.history[payload.user].unshift(payload.coordinates);
    state.turnPhase = 2;
    state.position[payload.user] = payload.coordinates;
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

  goToTurnPhaseOne(state) {
    state.turnPhase = 1;
  },

  toggle(state, payload) {
    const property = payload.property;
    state[property] = swap(state[property]);
  },

  attack(state, payload) {
    const user = swap(payload.user);
    state.health[user] = state.health[user] - 1;
  },

  removeCardFromHand(state, payload) {
    const user = payload.user;
    state.hand[user] = state.hand[user].filter(card => card !== payload.name);
  },

  counterAttack(state, payload) {
    const user = swap(payload.user);
    state.health[user] = state.health[user] - 1;
  },

  counterSpell(state) {
    state.stack.shift();
  },

  removeFrozen(state, payload) {
    state.frozen[payload.player] = false;
  },

  freeze(state, payload) {
    const user = swap(payload.user);
    state.frozen[user] = true;
  },

  block(state) {
    state.stack.shift();
  },

  teleport(state, payload) {
    state.history[payload.user].unshift(payload.coordinates);
    state.position[payload.user] = payload.coordinates;
  },

  retreat(state, payload) {
    state.positions[payload.user] = state.history[payload.user][1];
  },

  stutter(state) {
    state.positions.black = state.history.black[1];
    state.positions.white = state.history.white[1];
  },

  timeWarp(state) {
    state.positions.black = [0, 0];
    state.positions.white = [6, 6];
  }
};

export default mutations;
