import mutations from "../../src/store/modules/playerMutations";

describe("playerMutations", () => {
  it("updateHealth", () => {
    const state = { health: 3 };
    mutations.updateHealth(state);
    expect(state.health).toBe(2);
  });

  it("removeCardFromHand", () => {
    const state = { hand: ["counterAttack", "teleport", "confusion"] };
    const payload = { name: "teleport" };

    mutations.removeCardFromHand(state, payload);

    expect(state.hand).toHaveLength(2);
    expect(state.hand).toContain("confusion");
    expect(state.hand).not.toContain("teleport");
  });

  it("organicMove", () => {
    const state = { history: [[0, 0]], position: [0, 0] };
    const payload = { coordinates: [0, 1], user: "black" };

    mutations.organicMove(state, payload);

    expect(state.history).toHaveLength(2);
    expect(state.position[0]).toBe(0);
    expect(state.position[1]).toBe(1);
  });

  it("moveToPreviousPosition", () => {
    const state = { position: [2, 2], history: [[2, 2], [2, 1]] };

    mutations.moveToPreviousPosition(state);

    expect(state.position[0]).toBe(2);
    expect(state.position[1]).toBe(1);
  });

  it("moveToInitalPosition", () => {
    const state = { position: [1, 1], history: [[1, 1], [0, 1], [0, 0]] };

    mutations.moveToInitialPosition(state);

    expect(state.position[0]).toBe(0);
    expect(state.position[1]).toBe(0);
  });

  it("addConfusion", () => {
    const state = { confused: false };
    mutations.addConfusion(state);
    expect(state.confused).toBe(true);
  });

  it("removeConfusion", () => {
    const state = { confused: true };
    mutations.removeConfusion(state);
    expect(state.confused).toBe(false);
  });

  it("togglePriority", () => {
    const state = { priority: false };
    mutations.togglePriority(state);
    expect(state.priority).toBe(true);
  });

  it("toggleTurn", () => {
    const state = { turn: false };
    mutations.toggleTurn(state);
    expect(state.turn).toBe(true);
  });
});
