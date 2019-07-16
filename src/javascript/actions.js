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

export const START_TURN = "START_TURN";
export function startTurn(start) {
  return {
    type: START_TURN,
    start
  }
}



export const END_GAME = "END_GAME";
export function endGame(end) {
  return {
    type: END_GAME,
    end
  }
}

export const END_TURN = "END_TURN";
export function endTurn(end) {
  return {
    type: END_TURN,
    end
  }
}

export const TOGGLE_TURN = "TOGGLE_TURN";
export function toggleTurn(player) {
  return {
    type: TOGGLE_TURN,
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

export const TOGGLE_PRIORITY = "TOGGLE_PRIORITY";
export function togglePriority(player) {
  return {
    type: TOGGLE_PRIORITY,
    player
  }
}

export const MOVE = "MOVE";
export function move(player, coordinates) {
  return {
    type: MOVE,
    player,
    coordinates
  }
}

export const ATTACK = "ATTACK";
export function attack(player) {
  return {
    type: ATTACK,
    player
  }
}

const CONFUSION = "CONFUSION";
const COUNTER_ATTACK = "COUNTER_ATTACK";
const COUNTER_SPELL = "COUNTER_SPELL";
const BLOCK = "BLOCK";
const STUTTER = "STUTTER";
const TIME_WARP = "TIME_WARP";
const RETREAT = "RETREAT";
const TELEPORT = "TELEPORT";
