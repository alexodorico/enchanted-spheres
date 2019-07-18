import mutations from "../../src/store/mutations";
import { exportAllDeclaration } from "@babel/types";

describe("startGame", () => {
  it("changes gameStarted to true", () => {
    const state = { gameStarted: false };
    mutations.startGame(state);
    expect(state.gameStarted).toBe(true);
  });
});
