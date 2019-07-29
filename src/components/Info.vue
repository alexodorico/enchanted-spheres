<template>
  <div>
    <div>You are playing as {{this.user}}</div>
    <div id="info-wrapper">
      <PlayerInfo color="black"/>
      <div class="game-info">
        <h3>Health</h3>
        <h3>Turn</h3>
        <h3>Priority</h3>
      </div>
      <PlayerInfo color="white"/>
    </div>
    <div v-if="this.$store.state[this.$store.state.player].priority">
      <PassButton :user="this.$store.state.black.priority ? 'black' : 'white'" :socket="socket"/>
      <div id="spell-wrapper">
        <SpellList :user="user" :socket="socket"/>
      </div>
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
