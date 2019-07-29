<template>
  <div id="game-wrapper">
    <div>
      <Row v-for="i in 7" :key="i - 1" :user="user" :indexY="i - 1" :socket="socket"/>
    </div>
    <Info :user="user" :socket="socket"/>
  </div>
</template>

<script>
import Row from "@/components/Row";
import Info from "@/components/Info";

export default {
  components: {
    Row,
    Info
  },
  props: {
    socket: Object
  },
  computed: {
    user: function() {
      return this.$store.state.player;
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

#game-wrapper {
  display: flex;
  justify-content: center;
  padding: 2em;
}
</style>
