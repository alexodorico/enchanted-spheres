const initialState = {
  gameStarted: false,
  gameEnded: false,
  players: {
    first: {
      id: 1,
      name: new String(),
      team: "black"
    },
    second: {
      id: 2,
      name: new String(),
      team: "red"
    },
    third: {
      id: 3,
      name: new String(),
      team: "black"
    },
    fourth: {
      id: 4,
      name: new String(),
      team: "red"
    }
  },
  matchScore: {
    black: 0,
    red: 0
  },
  roundNumber: 0,
  roundScore: {
    black: 0,
    red: 0
  },
  deckOfCards: new Array(),
  dealer: new String(),
  hands: {
    first: new Array(),
    second: new Array(),
    third: new Array(),
    fourth: new Array()
  },
  trump: new String(),
  goingAlone: undefined,
  playersTurn: undefined,
  cardLed: new Object(),
  cardPlayed: {
    card: new Object(),
    player: new String()
  }
}
