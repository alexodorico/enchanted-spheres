<template>
  <div class="home">
    <Test/>
    <button @click="updatePosition">update position</button>
    <button @click="castFreeze">Cast Freeze</button>
    <button @click="resolveStack">Resolve Stack</button>
    <button @click="attack">Attack</button>
    <button @click="checkForWinner">win condition?</button>
    <button @click="counterAttack">counter attack</button>
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
    toggleTurn: function() {
      this.$store.commit("toggle", "turn");
    },
    togglePriority: function() {
      this.$store.commit("toggle", "priority");
    },
    updateHealth: function() {
      this.$store.commit("black/updateHealth", -1);
    },
    castFreeze: function() {
      this.$store.dispatch("playSpell", { user: "black", name: "freeze" });
    },
    resolveStack: function() {
      this.$store.dispatch("resolveStack");
    },
    attack: function() {
      // who is attacking
      this.$store.dispatch("attack", {user: "black"});
    },

    updatePosition: function() {
      console.log('yo');
    },

    checkForWinner: function() {
      this.$store.dispatch("checkForWin");
    },

    counterAttack: function() {
      this.$store.dispatch("counterAttack", {user: "black"});
    }
  }
};
</script>
