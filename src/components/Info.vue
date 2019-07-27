<template>
  <div>
    <div id="info-wrapper">
      <div class="player-info">
        <h2>Black</h2>
        <div class="score">{{ this.$store.state.black.health }}</div>
        <div :class="this.$store.state.black.turn ? 'marker' : 'transparent marker'"></div>
        <div :class="this.$store.state.black.priority ? 'marker' : 'transparent marker'"></div>
      </div>
      <div class="game-info">
        <h3>Health</h3>
        <h3>Turn</h3>
        <h3>Priority</h3>
      </div>
      <div class="player-info">
        <h2>White</h2>
        <div class="score">{{ this.$store.state.white.health }}</div>
        <div :class="this.$store.state.white.turn ? 'marker' : 'transparent marker'"></div>
        <div :class="this.$store.state.white.priority ? 'marker' : 'transparent marker'"></div>
      </div>
    </div>
  <div>You are {{this.user}} </div>
    <PassButton :user="this.$store.state.black.priority ? 'black' : 'white'"/>
    <div id="spell-wrapper">
      <SpellList :user="user"/>
    </div>
  </div>
</template>

<script>
import SpellList from "./SpellList";
import PassButton from "./PassButton";

export default {
  components: {
    SpellList,
    PassButton
  },
  props: {
    user: String
  }
};
</script>

<style lang="scss" scoped>
#info-wrapper {
  display: flex;
  justify-content: center;
  padding: 1em;
  border: 1px solid #ddd;
  margin-left: 2em;
}

.game-info {
  padding: 2.5em 0.5em 0;
  text-align: center;

  h3 {
    margin-bottom: 0.5em;
  }
}

.player-info {
  h2 {
    margin-bottom: 0.62em;
  }
}

.marker,
.score {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin: 0 auto 0.95em;
  text-align: center;
}

.marker {
  background-color: #000;
}

.transparent {
  background-color: transparent;
}
</style>


