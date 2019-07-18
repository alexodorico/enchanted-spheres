import { expect } from "chai";
import mutations from "../../src/store/mutations";
const {
  startGame,
  endGame,
  updateStack,
  organicMove,
  toggle,
  attack,
  removeCardFromHand,
  counterAttack,
  counterSpell,
  removeFrozen,
  freeze,
  block,
  // teleport,
  retreat,
  stutter,
  timeWarp
} = mutations;

describe("mutations", () => {
  it("startGame", () => {
    const state = { gameStarted: false };
    startGame(state);
    expect(state.gameStarted).to.equal(true);
  });

  it("endGame", () => {
    const state = { gameEnded: false, winner: false };
    const payload = { winner: "black" };
    endGame(state, payload);
    expect(state.gameEnded).to.equal(true);
  });

  it("updateStack", () => {
    const state = { stack: new Array() };
    let payload = { user: "black", name: "freeze" };

    // First item added to stack
    updateStack(state, payload);
    expect(state.stack).to.have.lengthOf(1);
    expect(state.stack).to.include(payload);
    expect(state.stack[0]).to.be.an("object");

    // Second item added to stack
    payload = { user: "white", name: "teleport" };
    updateStack(state, payload);
    expect(state.stack).to.have.lengthOf(2);
    expect(state.stack).to.include(payload);
    expect(state.stack[0]).to.be.an("object");
  });

  it("organicMove", () => {
    const state = { position: { black: [0, 0] }, history: { black: [[0, 0]] } };
    const payload = { user: "black", coordinates: [0, 1] };
    organicMove(state, payload);
    expect(state.position.black).to.be.an("array");
    expect(state.position.black).to.have.lengthOf(2);
    expect(state.position.black[0]).to.equal(0);
    expect(state.position.black[1]).to.equal(1);
    expect(state.history.black).to.be.an("array");
    expect(state.history.black).to.have.lengthOf(2);
  });

  it("toggle", () => {
    const state = { turn: "black" };
    const payload = { property: "turn" };
    toggle(state, payload);
    expect(state.turn).to.be.a("string");
    expect(state.turn).to.equal("white");
  });

  it("attack", () => {
    const state = { health: { black: 3 } };
    const payload = { user: "white" };
    attack(state, payload);
    expect(state.health.black).to.be.a("number");
    expect(state.health.black).to.equal(2);
  });

  it("counterAttack", () => {
    const state = { health: { black: 3 } };
    const payload = { user: "white" };
    counterAttack(state, payload);
    expect(state.health.black).to.be.a("number");
    expect(state.health.black).to.equal(2);
  });

  it("removeCardFromHand", () => {
    const state = { hand: { black: ["freeze", "teleport", "retreat"] } };
    const payload = { user: "black", name: "teleport" };
    removeCardFromHand(state, payload);
    expect(state.hand.black).to.have.lengthOf(2);
    expect(state.hand.black[0]).to.equal("freeze");
    expect(state.hand.black[1]).to.equal("retreat");
  });

  it("counterSpell", () => {
    const state = {
      stack: [
        { user: "black", name: "freeze" },
        { user: "white", name: "attack" }
      ]
    };
    counterSpell(state);
    expect(state.stack).to.have.lengthOf(1);
    expect(state.stack[0].name).to.equal("attack");
  });

  it("removeFrozen", () => {
    const state = { frozen: { black: true } };
    const payload = { player: "black" };
    removeFrozen(state, payload);
    expect(state.frozen.black).to.equal(false);
    removeFrozen(state, payload);
    expect(state.frozen.black).to.equal(false);
  });

  it("freeze", () => {
    const state = { frozen: { black: false } };
    const payload = { user: "white" };
    freeze(state, payload);
    expect(state.frozen.black).to.equal(true);
  });

  it("block", () => {
    const state = {
      stack: [
        { user: "black", name: "freeze" },
        { user: "white", name: "attack" }
      ]
    };
    block(state);
    expect(state.stack).to.have.lengthOf(1);
    expect(state.stack[0].name).to.equal("attack");
  });

  it("timeWarp", () => {
    const state = { positions: { black: [2, 2], white: [5, 5] } };
    timeWarp(state);
    expect(state.positions.black[0]).to.equal(0);
    expect(state.positions.black[1]).to.equal(0);
    expect(state.positions.white[0]).to.equal(6);
    expect(state.positions.white[1]).to.equal(6);
  });

  it("stutter", () => {
    const state = {
      positions: {
        black: [3, 3],
        white: [4, 3]
      },
      history: {
        black: [[3, 3], [2, 3], [2, 2]],
        white: [[4, 3], [3, 3], [3, 2]]
      }
    };

    stutter(state);
    expect(state.positions.black[0]).to.equal(2);
    expect(state.positions.black[1]).to.equal(3);
    expect(state.positions.white[0]).to.equal(3);
    expect(state.positions.white[1]).to.equal(3);
  });

  it("retreat", () => {
    const state = {
      positions: {
        black: [3, 2],
        white: [2, 1]
      },
      history: {
        black: [[3, 2], [2, 2], [2, 1]],
        white: [[2, 1], [1, 1], [0, 1]]
      }
    };

    const payload = { user: "black" };

    retreat(state, payload);
    expect(state.positions.black[0]).to.equal(2);
    expect(state.positions.black[1]).to.equal(2);
    expect(state.positions.white[0]).to.equal(2);
    expect(state.positions.white[1]).to.equal(1);
  });

  it("teleport", () => {
    const state = { position: { black: [0, 0] }, history: { black: [[0, 0]] } };
    const payload = { user: "black", coordinates: [1, 1] };
    updatePosition(state, payload);
    expect(state.position.black).to.be.an("array");
    expect(state.position.black).to.have.lengthOf(2);
    expect(state.position.black[0]).to.equal(1);
    expect(state.position.black[1]).to.equal(1);
    expect(state.history.black).to.be.an("array");
    expect(state.history.black).to.have.lengthOf(2);
  });
});
