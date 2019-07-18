const state = (dimensions, firstTurn) => {
  return {
    health: 3,
    hand: new Array(),
    position: dimensions,
    confused: false,
    turn: firstTurn,
    priority: firstTurn,
    history: [dimensions]
  };
};

export default state;
