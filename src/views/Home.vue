<template>
  <div>
    <h1>Enchanted Stones</h1>
    <button @click="findGame">Find Game</button>
    <button><router-link to="/instructions">Instructions</router-link></button>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: "",
      gameId: 0,
    }
  },
  methods: {
    findGame: function() {
      fetch("http://localhost:3000/joingame")
        .then(response => response.json())
        .then(response => {
          let socket = io(`http://localhost:3000/${response.id}`);
          console.log(socket);

          this.$emit("socket-connection", socket);
          this.gameId = response.id;
          this.$store.commit("setPlayerColor", {color: response.color});
          this.$router.push(`/game/${response.id}`);

          socket.on("action", function(msg) {
            console.log(msg);
          });
        });
    }
  }
}
</script>

<style>

</style>
