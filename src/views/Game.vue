<template>
  <div id="game-wrapper">
    <div>
      <Row v-for="i in 5" :key="i - 1" :user="user" :indexY="i - 1" :socket="socket"/>
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
