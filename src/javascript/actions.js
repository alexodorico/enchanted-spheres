export const PLAYER_JOINED = "PLAYER_JOINED";
export function playerJoined(name) {
  return {
    type: PLAYER_JOINED,
    name
  }
  
export const PLAYER_LEFT = "PLAYER_LEFT";
export function playerLeft(name) {
  return {
    type: PLAYER_LEFT,
    name
  }
}

export const START_GAME = "START_GAME";
export function startGame(start) {
  return {
    type: START_GAME,
    start
  }
}

export const SHUFFLE_DECK = "SHUFFLE_DECK";
export function shuffleDeck(shuffle) {
  return {
    type: SHUFFLE_DECK,
    shuffle
  }
}

export const DEAL_CARDS = "DEAL_CARDS";
export function dealCards(deal) {
  return {
    type: DEAL_CARDS,
    deal
  }
}

export const ORDER_UP = "ORDER_UP";
export function orderUp(player, card) {
  return {
    type: ORDER_UP,
    player,
    card
  }
}

export const DECLARE_TRUMP = "DECLARE_TRUMP";
export function declareTrump(player, trump) {
  return {
    type: DECLARE_TRUMP,
    player,
    trump
  }
}

export const PASS_TURN = "PASS_TURN";
export function passTurn(player) {
  return {
    type: PASS_TURN,
    player
  }
}

export const PLAY_CARD = "PLAY_CARD";
export function playCard(player, card) {
  return {
    type: PLAY_CARD,
    player,
    card
  }
}

export const UPDATE_SCORE = "UPDATE_SCORE";
export function updateScore(team, amount) {
  return {
    type: UPDATE_SCORE,
    team,
    amount
  }
}

export const END_GAME = "END_GAME";
export function endGame(end) {
  return {
    type: END_GAME,
    end
  }
}
