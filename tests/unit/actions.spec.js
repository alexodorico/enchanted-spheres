import actions from "../../src/store/actions";

describe("spellIntent", () => {
  it("dispatched managePhases", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const user = "black";
    const action = "timeWarp";

    actions.spellIntent({ commit, dispatch }, { user, action });

    expect(dispatch).toHaveBeenCalledWith("managePhases", { user, action });
  });
});
