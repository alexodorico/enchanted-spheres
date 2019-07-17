const state = {
  gameStarted: true,
  gameEnded: false,
  playersJoined: 0,
  stack: new Array(),
  history: {
    black: [[0, 0]],
    white: [[6, 6]]
  },
  turn: "black",
  priority: "black",
  health: {
    black: 3,
    white: 3
  },
  positions: {
    black: [0, 0],
    white: [6, 6]
  },
  hand: {
    black: new Array(),
    white: new Array()
  },
  frozen: {
    black: false,
    white: false
  }
};

export default state;
