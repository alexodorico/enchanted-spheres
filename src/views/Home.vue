<template>
  <div>
    <!-- <h1>Enchanted Stones</h1> -->
    <button @click="findGame">Find Game</button>
    <button>
      <router-link to="/instructions">Instructions</router-link>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    findGame: function() {
      this.$emit("find-game");
    }
  }
};
</script>

<style>
</style>
