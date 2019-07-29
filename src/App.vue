<template>
  <div id="app">
    <router-view @find-game="findGame" :socket="socket"/>
  </div>
</template>
<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: new Object()
    };
  },
  methods: {
    findGame: function(socket) {
      fetch("http://localhost:3000/joingame")
        .then(response => response.json())
        .then(response => {
          const socket = io(`http://localhost:3000/${response.id}`);
          this.socket = socket;

          this.$store.commit("setPlayerColor", { color: response.color });
          this.$router.push(`/game/${response.id}`);

          socket.on("action", message => {
            this.$store.dispatch(message.action, message.payload);
          });
        });
    }
  }
};
</script>
<style lang="scss">
</style>
