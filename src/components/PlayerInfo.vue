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

<style lang="scss" scoped>
.player-info {
  h2 {
    margin-bottom: 0.62em;
  }
}

.marker,
.score {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin: 0 auto 0.95em;
  text-align: center;
}

.marker {
  background-color: #000;
}

.transparent {
  background-color: transparent;
}
</style>
