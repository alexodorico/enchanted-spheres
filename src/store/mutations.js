import { toggle } from "./store";

const mutations = {
  startGame(state) {
    state.gameStarted = true;
  },

  endGame(state) {
    state.gameEnded = true;
  },

  updateStack(state, payload) {
    state.stack.unshift(payload);
  },

  updatePosition(state, payload) {
    state.position[payload.user] = payload.coordinates;
  },

  logHistory(state, payload) {
    state.history.unshift(payload);
  },

  toggle(state, payload) {
    const property = payload.property;
    state[property] = toggle(state[property]);
  },

  attack(state, payload) {
    const user = toggle(payload.user);
    state.health[user] = state.health[user] - 1;
  },

  removeCardFromHand(state, payload) {
    const user = payload.user;
    state.hand[user] = state.hand[user].filter(card => card !== payload.name);
  },

  counterAttack(state, payload) {
    const user = toggle(payload.user);
    state.health[user] = state.health[user] - 1;
  },

  counterSpell(state) {
    state.stack.shift();
  },

  removeFrozen(state, payload) {
    state.frozen[payload.player] = false;
  },

  freeze(state, payload) {
    const user = toggle(payload.user);
    state.frozen[user] = true;
  },

  block(state, payload) {
    state.stack.shift();
  },

  teleport(state, payload) {},

  retreat(state, payload) {},

  stutter(state, payload) {},

  timeWarp(state, payload) {}
};

export default mutations;
