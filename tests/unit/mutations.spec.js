import mutations from "../../src/store/mutations";

describe("mutations", () => {
  it("startGame", () => {
    const state = { gameStarted: false };
    mutations.startGame(state);
    expect(state.gameStarted).toBe(true);
  });

  it("addActionToStack", () => {
    const state = { stack: ["confusion", "teleport"] };
    const payload = { name: "counterAttack", player: "black" };
    mutations.addActionToStack(state, payload);
    expect(state.stack).toHaveLength(3);
  });

  it("removeActionFromStack", () => {
    const state = { stack: ["teleport", "counterAttack"] };
    mutations.removeActionFromStack(state);
    expect(state.stack).toHaveLength(1);
  });

  it("incrementStackPhase", () => {
    const state = { stackPhase: 0 };
    mutations.incrementStackPhase(state);
    expect(state.stackPhase).toBe(1);
  });

  it("incrementTurnPhase", () => {
    const state = { turnPhase: 0 };
    mutations.incrementTurnPhase(state);
    expect(state.turnPhase).toBe(1);
  });

  it("resetStackPhase", () => {
    const state = { stackPhase: 2 };
    mutations.resetStackPhase(state);
    expect(state.stackPhase).toBe(0);
  });

  it("endGame", () => {
    const payload = { winner: ["white"] };
    const state = { gameEnded: false, winner: false };
    mutations.endGame(state, payload);
    expect(state.gameEnded).toBe(true);
    expect(state.winner).toBe("white");
  });
});
