<template>
  <div class="home">
    <Test/>
    <button @click="startGame">Start Game</button>
    <button @click="toggleTurn">Toggle turn</button>
    <button @click="togglePriority">Toggle priority</button>
    <button @click="updateHealth">update health</button>
    <button>Add card</button>
    <button>Remove card</button>
    <button>Attack</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Test from "@/components/Test.vue";

export default {
  name: "game",
  components: {
    Test
  },
  methods: {
    startGame: function() {
      this.$store.commit("toggleBoolean", "gameStarted");
    },
    toggleTurn: function() {
      this.$store.commit("togglePlayer", "turn");
    },
    togglePriority: function() {
      this.$store.commit("togglePlayer", "priority");
    },
    updateHealth: function() {
      this.$store.commit("updateHealth", { player: "white", amount: -1 });
    }
  }
};
</script>
