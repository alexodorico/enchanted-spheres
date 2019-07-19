const state = (dimensions, firstTurn) => {
  return {
    health: 3,
    hand: [
      { name: "teleport", pretty: "Teleport" },
      { name: "confusion", pretty: "Confusion" },
      { name: "retreat", pretty: "Retreat" },
      { name: "block", pretty: "Block" },
      { name: "counterSpell", pretty: "Counter Spell" },
      { name: "stutter", pretty: "Stutter" },
      { name: "timeWarp", pretty: "Time Warp" },
      { name: "counterAttack", pretty: "Counter Attack" }
    ],
    position: dimensions,
    confused: false,
    turn: firstTurn,
    priority: firstTurn,
    history: [dimensions]
  };
};

export default state;
