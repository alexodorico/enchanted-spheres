export const PLAYER_JOINED = "PLAYER_JOINED";
export function playerJoined(name) {
  return {
    type: PLAYER_JOINED,
    name
  }
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

export const PLAY_CARD = "PLAY_CARD";
export function playCard(player, card) {
  return {
    type: PLAY_CARD,
    player,
    card
  }
}

export const MOVE_PLAYER = "MOVE_PLAYER";
export function movePlayer(player, card) {
  return {
    type: MOVE_PLAYER,
    player,
    card
  }
}

export const UPDATE_LIFE = "UPDATE_SCORE";
export function updateLife(team, amount) {
  return {
    type: UPDATE_LIFE,
    player,
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
