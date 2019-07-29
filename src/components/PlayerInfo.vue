<template>
  <div class="player-info">
    <h2>{{ this.color.toUpperCase() }}</h2>
    <div class="score">{{ this.$store.state[this.color].health }}</div>
    <div :class="this.$store.state[this.color].turn ? 'marker' : 'transparent marker'"></div>
    <div :class="this.$store.state[this.color].priority ? 'marker' : 'transparent marker'"></div>
  </div>
</template>

<script>
export default {
  props: {
    color: String
  }
};
</script>
