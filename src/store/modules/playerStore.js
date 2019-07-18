import state from "./playerState";
import mutations from "./playerMutations";

export function Player(dimensions, firstTurn) {
  return {
    namespaced: true,
    state: state(dimensions, firstTurn),
    mutations
  };
}
