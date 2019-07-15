const START_GAME = "START_GAME";
function startGame(start) {
  return {
    type: START_GAME,
    start
  }
}

const SHUFFLE_DECK = "SHUFFLE_DECK";
function shuffleDeck(shuffle) {
  return {
    type: SHUFFLE_DECK,
    shuffle
  }
}

const DEAL_CARDS = "DEAL_CARDS";
function dealCards(deal) {
  return {
    type: DEAL_CARDS,
    deal
  }
}

const ORDER_UP = "ORDER_UP";
function orderUp(player, card) {
  return {
    type: ORDER_UP,
    player,
    card
  }
}

const DECLARE_TRUMP = "DECLARE_TRUMP";
function declareTrump(player, trump) {
  return {
    type: DECLARE_TRUMP,
    player,
    trump
  }
}

const PASS_TURN = "PASS_TURN";
function passTurn(player) {
  return {
    type: PASS_TURN,
    player
  }
}

const PLAY_CARD = "PLAY_CARD";
function playCard(player, card) {
  return {
    type: PLAY_CARD,
    player,
    card
  }
}

const UPDATE_SCORE = "UPDATE_SCORE";
function updateScore(team, amount) {
  return {
    type: UPDATE_SCORE,
    team,
    amount
  }
}

const END_GAME = "END_GAME";
function endGame(end) {
  return {
    type: END_GAME,
    end
  }
}