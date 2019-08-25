<template>
  <div id="app">
    <h1>enchanted stones</h1>
    <router-view @find-game="findGame" :socket="socket" :history="history" />
  </div>
</template>

<script>
import "./main.scss";
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: new Object(),
      history: new Object()
    };
  },

  methods: {
    findGame: function() {
      // fetch("https://tranquil-caverns-50931.herokuapp.com/joingame")
      fetch("http://localhost:3000/joingame")
        .then(response => response.json())
        .then(response => {
          const socket = io(`http://localhost:3000/${response.id}`);
          //const socket = io(`https://tranquil-caverns-50931.herokuapp.com/${response.id}`);

          this.socket = socket;
          this.$store.commit("setPlayerColor", { color: response.color });
          this.$router.push(`/game/${response.id}`);

          if (response.color === "white") {
            this.$store.commit("startGame");
          }

          socket.on("connection", _ => {
            this.$store.commit("startGame");
          });

          socket.on("action", message => {
            this.history = message;
            this.$store.dispatch(message.action, message.payload);
          });

          socket.on("playerLeft", message => {
            this.$store.commit("endGame", { winner: [response.color] });
            socket.disconnect();
            this.$router.push("/");
          });
        });
    }
  }
};
</script>
