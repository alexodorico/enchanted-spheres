import actions from "../../src/store/actions";

describe("actions", () => {
  it("spellIntent", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const payload = {
      user: "black",
      action: "move"
    };

    actions.spellIntent({ commit, dispatch }, payload);

    expect(dispatch).toHaveBeenCalledWith("managePhases", payload);
    expect(commit).toHaveBeenCalledWith("black/removeCardFromHand", payload);
    expect(commit).toHaveBeenCalledWith("addActionToStack", payload);
    expect(commit).toHaveBeenCalledWith("togglePriority", payload);
  });

  it("moveIntent", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const payload = {
      user: "black",
      action: "move"
    };

    actions.moveIntent({ commit, dispatch }, payload);

    expect(dispatch).toHaveBeenCalledWith("managePhases", payload);
    expect(commit).toHaveBeenCalledWith("addActionToStack", payload);
    expect(commit).toHaveBeenCalledWith("togglePriority", payload);
  });

  it("attackIntent", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const payload = {
      user: "black",
      action: "move"
    };

    actions.attackIntent({ commit, dispatch }, payload);

    expect(dispatch).toHaveBeenCalledWith("managePhases", payload);
    expect(commit).toHaveBeenCalledWith("addActionToStack", payload);
    expect(commit).toHaveBeenCalledWith("togglePriority", payload);
  });

  it("managePhases: Black plays on their turn, stack phase 0", () => {
    const state = {
      stackPhase: 0,
      black: {
        turn: true
      }
    };

    const payload = {
      user: "black",
      action: "move"
    };

    const commit = jest.fn();

    actions.managePhases({ commit, state }, payload);

    expect(commit).toHaveBeenCalledWith("incrementTurnPhase");
  });

  it("managePhases: White plays in response to black, stack phase 1", () => {
    const state = {
      stackPhase: 1,
      white: {
        turn: false
      }
    };

    const payload = {
      user: "white",
      action: "freeze"
    };

    const commit = jest.fn();

    actions.managePhases({ commit, state }, payload);

    expect(commit).not.toHaveBeenCalled();
  });

  it("managePhases: Black plays in response to white's response on black's turn, stack phase 1", () => {
    const state = {
      stackPhase: 1,
      black: {
        turn: true
      }
    };

    const payload = {
      user: "black",
      action: "freeze"
    };

    const commit = jest.fn();

    actions.managePhases({ commit, state }, payload);

    expect(commit).not.toHaveBeenCalled();
  });

  it("passPriority", () => {
    const payload = {
      user: "black",
      action: "freeze"
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.passPriority({ commit, dispatch }, payload);

    expect(commit).toHaveBeenCalledWith("togglePriority", payload);
    expect(dispatch).toHaveBeenCalledWith("resolveStack");
  });

  it("resolveStack: dispatches for each spell on stack, and doesn't toggle turn when it's not the right time", () => {
    const state = {
      stack: [
        { name: "freeze", player: "black" },
        { name: "teleport", player: "white" },
        { name: "timeWarp", player: "black" }
      ],
      turnPhase: 0
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.resolveStack({ commit, dispatch, state });

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith("freeze", {
      name: "freeze",
      player: "black"
    });

    expect(dispatch).toHaveBeenCalledWith("teleport", {
      name: "teleport",
      player: "white"
    });

    expect(dispatch).toHaveBeenCalledWith("timeWarp", {
      name: "timeWarp",
      player: "black"
    });

    expect(commit).toHaveBeenCalledWith("resetStackPhase");
    expect(commit).toHaveBeenCalledWith("incrementTurnPhase");
    expect(commit).not.toHaveBeenCalledWith("resetTurnPhase");
    expect(commit).not.toHaveBeenCalledWith("togglePriority");
    expect(commit).not.toHaveBeenCalledWith("toggleTurn");
  });

  it("resolveStack: triggers proper commits when turn phase is 3", () => {
    const state = {
      stack: [
        { name: "freeze", player: "black" },
        { name: "teleport", player: "white" },
        { name: "timeWarp", player: "black" }
      ],
      turnPhase: 3
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.resolveStack({ commit, dispatch, state });

    expect(commit).toHaveBeenCalledWith("resetTurnPhase");
    expect(commit).toHaveBeenCalledWith("togglePriority");
    expect(commit).toHaveBeenCalledWith("toggleTurn");
  });

  it("checkForConfusion", () => {
    const state = {
      black: {
        turn: true
      },
      white: {
        turn: false
      }
    };

    const commit = jest.fn();

    actions.checkForConfusion({ commit, state });

    expect(commit).toHaveBeenCalledWith("black/removeConfusion");
    expect(commit).not.toHaveBeenCalledWith("white/removeConfusion");
  });

  it("checkForWin: when there's a winner", () => {
    const state = {
      black: {
        health: 2
      },
      white: {
        health: 0
      }
    };

    const commit = jest.fn();

    actions.checkForWin({ commit, state });

    expect(commit).toHaveBeenCalledWith("endGame", { winner: ["white"] });
  });

  it("checkForWin: when there's no winner", () => {
    const state = {
      black: {
        health: 2
      },
      white: {
        health: 1
      }
    };

    const commit = jest.fn();

    actions.checkForWin({ commit, state });

    expect(commit).not.toHaveBeenCalledWith("endGame");
  });

  it("move", () => {
    const payload = {
      user: "black",
      coordinates: [0, 1]
    };

    const commit = jest.fn();

    actions.move({ commit }, payload);

    expect(commit).toHaveBeenCalledWith("black/organicMove", payload);
    expect(commit).toHaveBeenCalledWith("incrementTurnPhase");
  });

  it("attack", () => {
    const payload = {
      user: "black"
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.attack({ commit, dispatch }, payload);

    expect(commit).toHaveBeenCalledWith("white/updateHealth");
    expect(dispatch).toHaveBeenCalledWith("checkForWin");
    expect(commit).toHaveBeenCalledWith("incrementTurnPhase");
  });

  it("counterAttack", () => {
    const payload = {
      user: "black"
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.counterAttack({ commit, dispatch }, payload);

    expect(commit).toHaveBeenCalledWith("white/updateHealth");
    expect(dispatch).toHaveBeenCalledWith("checkForWin");
  });

  it("counterSpell", () => {
    const commit = jest.fn();

    actions.counterSpell({ commit });

    expect(commit).toHaveBeenCalledWith("removeActionFromStack");
  });

  it("confusion", () => {
    const payload = {
      user: "white"
    };

    const commit = jest.fn();

    actions.confusion({ commit }, payload);
    expect(commit).toHaveBeenCalledWith("black/addConfusion");
  });

  it("block", () => {
    const commit = jest.fn();

    actions.block({ commit });

    expect(commit).toHaveBeenCalledWith("removeActionFromStack");
  });

  it("teleport", () => {
    const payload = {
      user: "black",
      coordinate: [0, 1]
    };

    const commit = jest.fn();
    actions.teleport({ commit }, payload);
    expect(commit).toHaveBeenCalledWith("black/organicMove", payload);
    expect(commit).toHaveBeenCalledWith("incrementTurnPhase");
  });

  it("retreat", () => {
    const payload = {
      user: "black"
    };

    const commit = jest.fn();
    actions.retreat({ commit }, payload);
    expect(commit).toHaveBeenCalledWith("black/moveToPreviousPosition");
  });

  it("stutter", () => {
    const commit = jest.fn();
    actions.stutter({ commit });
    expect(commit).toHaveBeenCalledWith("moveToPreviousPosition");
  });

  it("timeWarp", () => {
    const commit = jest.fn();
    actions.timeWarp({ commit });
    expect(commit).toHaveBeenCalledWith("moveToInitialPosition");
  });
});
