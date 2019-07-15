const initialState = {
  gameStarted: false,
  gameEnded: false,
  playersJoined: 0,
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

function euchre(state = initialState, action) {
  switch (action.type) {
    case PLAYER_JOINED:
      if (state.playersJoined <= 3) {
        return Object.assign({}, state, {
          playersJoined: playersJoined++
        });
      }
    case PLAYER_LEFT: 
      return Object.assign({}, state, {
        playersJoined: playersJoined--
      });
    default:
      return state;
  }
}
