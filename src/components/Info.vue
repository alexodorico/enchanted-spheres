<template>
  <div id="info-wrapper">
    <div class="turn-info">
      <PlayerInfo color="black"/>
      <div class="game-info">
        <h3>Health</h3>
        <h3>Turn</h3>
        <h3>Priority</h3>
      </div>
      <PlayerInfo color="white"/>
    </div>
    <div id="reminder">You are playing as {{this.user}}</div>
    <History :history="history"/>
    <div v-if="this.$store.state[this.$store.state.player].priority">
      <PassButton :user="this.$store.state.black.priority ? 'black' : 'white'" :socket="socket"/>
    </div>
  </div>
</template>

<script>
import PlayerInfo from "./PlayerInfo";
import PassButton from "./PassButton";
import History from "./History";

export default {
  components: {
    PlayerInfo,
    PassButton,
    History
  },
  props: {
    user: String,
    socket: Object,
    history: Object
  }
};
</script>
