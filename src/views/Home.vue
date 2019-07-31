<template>
  <div id="home">
    <button @click="findGame">Find Game</button>
    <button @click="viewInstructions">Instructions</button>
  </div>
</template>

<script>
export default {
  methods: {
    findGame: function() {
      this.$emit("find-game");
    },
    viewInstructions: function() {
      this.$router.push("/instructions");
    }
  }
};
</script>
