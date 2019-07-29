<template>
  <div>
    <div id="info-wrapper">
      <PlayerInfo color="black"/>
      <div class="game-info">
        <h3>Health</h3>
        <h3>Turn</h3>
        <h3>Priority</h3>
      </div>
      <PlayerInfo color="white"/>
    </div>
    <div>You are {{this.user}}</div>
    <PassButton
      v-if="this.$store.state[this.$store.state.player].priority"
      :user="this.$store.state.black.priority ? 'black' : 'white'"
      :socket="socket"
    />
    <div id="spell-wrapper">
      <SpellList :user="user" :socket="socket"/>
    </div>
  </div>
</template>

<script>
import PlayerInfo from "./PlayerInfo";
import SpellList from "./SpellList";
import PassButton from "./PassButton";

export default {
  components: {
    PlayerInfo,
    SpellList,
    PassButton
  },
  props: {
    user: String,
    socket: Object
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
</style>
