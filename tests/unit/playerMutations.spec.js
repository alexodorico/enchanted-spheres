import mutations from "../../src/store/modules/playerMutations";

describe("updateHealth", () => {
  it("should decrease health by one", () => {
    const state = { health: 3 };
    mutations.updateHealth(state);
    expect(state.health).toBe(2);
  });
});
